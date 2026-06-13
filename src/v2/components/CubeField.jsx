import { useMemo, useRef, useEffect, Suspense } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

// Paleta oficial Kaimind — la formación arranca en Data Green (look original)
// y va transicionando muy lento por el resto de la paleta
const PALETTE = ["#4CAE7E", "#7FD7C3", "#465DA9", "#635DC2", "#1F2AA5"].map(
  (c) => new THREE.Color(c)
);

// Textura de cara: fondo negro + marco redondeado blanco con glow + speckles.
// El marco se tiñe con el color emissive del material (verde por defecto),
// recreando el look de los cubos originales de Spline.
function createFaceTexture() {
  const S = 256;
  const canvas = document.createElement("canvas");
  canvas.width = canvas.height = S;
  const ctx = canvas.getContext("2d");

  ctx.fillStyle = "#000000";
  ctx.fillRect(0, 0, S, S);

  // Speckles tipo "datos" en el interior
  for (let i = 0; i < 140; i++) {
    const a = Math.random() * 0.5;
    ctx.fillStyle = `rgba(255,255,255,${a * 0.35})`;
    ctx.fillRect(
      24 + Math.random() * (S - 48),
      24 + Math.random() * (S - 48),
      Math.random() < 0.2 ? 2 : 1,
      Math.random() < 0.2 ? 2 : 1
    );
  }

  // Marco redondeado con doble pasada de glow
  const r = 34;
  const pad = 10;
  ctx.lineJoin = "round";
  ctx.shadowColor = "rgba(255,255,255,0.9)";
  ctx.shadowBlur = 22;
  ctx.strokeStyle = "rgba(255,255,255,0.95)";
  ctx.lineWidth = 10;
  ctx.beginPath();
  ctx.roundRect(pad, pad, S - pad * 2, S - pad * 2, r);
  ctx.stroke();
  ctx.shadowBlur = 8;
  ctx.lineWidth = 5;
  ctx.stroke();

  const tex = new THREE.CanvasTexture(canvas);
  tex.anisotropy = 4;
  return tex;
}

// Formación: cuadrícula compacta 4x4x3 (con huecos) + cubos sueltos alrededor,
// igual que la escena original
function makeCubes() {
  const cubes = [];
  const size = 0.62;
  const gap = 0.7;
  const jitter = () => (Math.random() - 0.5) * 0.04;

  for (let x = 0; x < 4; x++) {
    for (let y = 0; y < 4; y++) {
      for (let z = 0; z < 3; z++) {
        // Algunos huecos para que respire
        if (Math.random() < 0.12) continue;
        cubes.push({
          home: new THREE.Vector3(
            (x - 1.5) * gap + jitter(),
            (y - 1.5) * gap + jitter(),
            (z - 1) * gap + jitter()
          ),
          size,
          floatAmp: 0.025,
          floatSpeed: 0.4 + Math.random() * 0.3,
          stray: false,
        });
      }
    }
  }

  // Cubos sueltos, separados de la formación
  const strays = [
    [2.9, 0.55, 0.2, 0.5],
    [-2.6, -0.9, 0.5, 0.42],
    [2.3, -1.7, -0.3, 0.34],
    [-2.2, 1.6, -0.4, 0.3],
  ];
  strays.forEach(([x, y, z, s]) => {
    cubes.push({
      home: new THREE.Vector3(x, y, z),
      size: s,
      floatAmp: 0.12,
      floatSpeed: 0.5 + Math.random() * 0.4,
      stray: true,
    });
  });

  return cubes;
}

function Cluster() {
  const group = useRef();
  const cubes = useMemo(() => makeCubes(), []);
  const meshRefs = useRef([]);
  const { gl, camera } = useThree();
  const faceTexture = useMemo(() => createFaceTexture(), []);

  // Física por cubo: posición y velocidad propias (en coordenadas del grupo)
  const phys = useMemo(
    () =>
      cubes.map((c) => ({
        pos: c.home.clone(),
        vel: new THREE.Vector3(),
      })),
    [cubes]
  );

  // Agarre individual de un cubo (idéntico a la interacción original)
  const grab = useRef({
    index: -1,
    plane: new THREE.Plane(),
    targetWorld: new THREE.Vector3(),
    hasTarget: false,
  });

  // Arrastre del fondo: rota toda la formación
  const rotDrag = useRef({ active: false, lastX: 0, lastY: 0, velX: 0, velY: 0 });

  const raycaster = useMemo(() => new THREE.Raycaster(), []);
  const ndc = useMemo(() => new THREE.Vector2(), []);
  const tmpColor = useMemo(() => new THREE.Color(), []);
  const tmpVec = useMemo(() => new THREE.Vector3(), []);

  const setNdcFromEvent = (e) => {
    const rect = gl.domElement.getBoundingClientRect();
    ndc.set(
      ((e.clientX - rect.left) / rect.width) * 2 - 1,
      -((e.clientY - rect.top) / rect.height) * 2 + 1
    );
  };

  const onCubeDown = (e, i) => {
    e.stopPropagation();
    grab.current.index = i;
    grab.current.hasTarget = false;
    const worldPos = tmpVec.clone();
    meshRefs.current[i].getWorldPosition(worldPos);
    const normal = new THREE.Vector3();
    camera.getWorldDirection(normal);
    grab.current.plane.setFromNormalAndCoplanarPoint(normal, worldPos);
    gl.domElement.style.cursor = "grabbing";
  };

  const onBackgroundDown = (e) => {
    rotDrag.current.active = true;
    rotDrag.current.lastX = e.clientX;
    rotDrag.current.lastY = e.clientY;
  };

  useEffect(() => {
    const move = (e) => {
      if (grab.current.index >= 0) {
        setNdcFromEvent(e);
        raycaster.setFromCamera(ndc, camera);
        if (raycaster.ray.intersectPlane(grab.current.plane, grab.current.targetWorld)) {
          grab.current.hasTarget = true;
        }
      } else if (rotDrag.current.active && group.current) {
        const dx = e.clientX - rotDrag.current.lastX;
        const dy = e.clientY - rotDrag.current.lastY;
        rotDrag.current.lastX = e.clientX;
        rotDrag.current.lastY = e.clientY;
        group.current.rotation.y += dx * 0.009;
        group.current.rotation.x += dy * 0.006;
        rotDrag.current.velX = dx * 0.009;
        rotDrag.current.velY = dy * 0.006;
      }
    };
    const up = () => {
      grab.current.index = -1;
      grab.current.hasTarget = false;
      rotDrag.current.active = false;
      gl.domElement.style.cursor = "";
    };
    window.addEventListener("pointermove", move);
    window.addEventListener("pointerup", up);
    window.addEventListener("pointercancel", up);
    return () => {
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerup", up);
      window.removeEventListener("pointercancel", up);
    };
  }, [gl, camera, raycaster, ndc]);

  useFrame((state, delta) => {
    const dt = Math.min(delta, 0.05);
    const t = state.clock.elapsedTime;
    const grabbing = grab.current.index >= 0;

    if (group.current && !rotDrag.current.active) {
      group.current.rotation.y +=
        rotDrag.current.velX + (grabbing ? 0 : dt * 0.07);
      group.current.rotation.x += rotDrag.current.velY;
      rotDrag.current.velX *= 0.94;
      rotDrag.current.velY *= 0.94;
      group.current.rotation.x = THREE.MathUtils.lerp(
        group.current.rotation.x,
        -0.12,
        0.015
      );
    }

    // Color de la formación: arranca verde y recorre la paleta muy lento
    const phase = (t * 0.035) % PALETTE.length;
    const idx = Math.floor(phase);
    tmpColor.lerpColors(
      PALETTE[idx],
      PALETTE[(idx + 1) % PALETTE.length],
      phase - idx
    );

    meshRefs.current.forEach((mesh, i) => {
      if (!mesh) return;
      const c = cubes[i];
      const p = phys[i];

      if (grab.current.index === i && grab.current.hasTarget && group.current) {
        // El cubo sigue la mano al instante (en espacio local del grupo)
        const targetLocal = tmpVec.copy(grab.current.targetWorld);
        group.current.worldToLocal(targetLocal);
        const prevX = p.pos.x, prevY = p.pos.y, prevZ = p.pos.z;
        p.pos.lerp(targetLocal, 0.55);
        p.vel.set(
          ((p.pos.x - prevX) / dt) * 0.5,
          ((p.pos.y - prevY) / dt) * 0.5,
          ((p.pos.z - prevZ) / dt) * 0.5
        );
      } else {
        // Resorte suave de regreso a su sitio en la formación
        const homeY = c.home.y + Math.sin(t * c.floatSpeed + i) * c.floatAmp;
        p.vel.x += (c.home.x - p.pos.x) * 2.2 * dt;
        p.vel.y += (homeY - p.pos.y) * 2.2 * dt;
        p.vel.z += (c.home.z - p.pos.z) * 2.2 * dt;
        const damp = Math.max(0, 1 - 2.4 * dt);
        p.vel.multiplyScalar(damp);
        p.pos.addScaledVector(p.vel, dt);
      }

      mesh.position.copy(p.pos);
      // Los cubos de la cuadrícula mantienen su orientación alineada;
      // los sueltos giran despacio
      if (c.stray) {
        mesh.rotation.x += dt * 0.18;
        mesh.rotation.y += dt * 0.12;
      }

      mesh.material.emissive.copy(tmpColor);
    });
  });

  return (
    <>
      {/* Plano invisible que captura el arrastre del fondo (rotar formación) */}
      <mesh position={[0, 0, -4]} onPointerDown={onBackgroundDown}>
        <planeGeometry args={[60, 60]} />
        <meshBasicMaterial visible={false} />
      </mesh>

      <group ref={group} rotation={[-0.12, 0.5, 0.06]}>
        {cubes.map((c, i) => (
          <mesh
            key={i}
            ref={(el) => (meshRefs.current[i] = el)}
            position={c.home}
            onPointerDown={(e) => onCubeDown(e, i)}
            onPointerOver={() => {
              if (grab.current.index < 0) gl.domElement.style.cursor = "grab";
            }}
            onPointerOut={() => {
              if (grab.current.index < 0) gl.domElement.style.cursor = "";
            }}
          >
            <boxGeometry args={[c.size, c.size, c.size]} />
            <meshStandardMaterial
              color="#0b0b0b"
              roughness={0.35}
              metalness={0.5}
              emissive="#4CAE7E"
              emissiveMap={faceTexture}
              emissiveIntensity={1.7}
            />
          </mesh>
        ))}
      </group>
    </>
  );
}

const CubeField = () => {
  return (
    <Canvas
      dpr={[1, 1.75]}
      camera={{ position: [0, 0, 8.6], fov: 42 }}
      gl={{ antialias: true, alpha: true }}
      style={{ touchAction: "pan-y" }}
    >
      <Suspense fallback={null}>
        <ambientLight intensity={0.35} />
        <directionalLight position={[4, 6, 5]} intensity={0.8} />
        <pointLight position={[-5, -2, 4]} intensity={14} color="#4CAE7E" />
        <pointLight position={[5, 3, -4]} intensity={10} color="#7FD7C3" />
        <Cluster />
      </Suspense>
    </Canvas>
  );
};

export default CubeField;
