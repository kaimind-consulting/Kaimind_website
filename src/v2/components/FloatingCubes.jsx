// Cubitos sueltos en CSS 3D — reemplazan las "pepitas" flotantes.
// Pocos y discretos, los mismos cubos del hero pero en versión ligera.
const CUBES = [
  { size: 26, top: "12%", left: "6%", tone: "", delay: "0s", dur: "16s" },
  { size: 16, top: "70%", left: "10%", tone: "purple", delay: "-4s", dur: "20s" },
  { size: 34, top: "22%", left: "88%", tone: "blue", delay: "-8s", dur: "18s" },
  { size: 14, top: "82%", left: "82%", tone: "", delay: "-12s", dur: "14s" },
  { size: 20, top: "48%", left: "94%", tone: "purple", delay: "-6s", dur: "22s" },
];

const Cube3D = ({ size, top, left, tone, delay, dur }) => {
  const half = size / 2;
  const faces = [
    `rotateY(0deg) translateZ(${half}px)`,
    `rotateY(90deg) translateZ(${half}px)`,
    `rotateY(180deg) translateZ(${half}px)`,
    `rotateY(-90deg) translateZ(${half}px)`,
    `rotateX(90deg) translateZ(${half}px)`,
    `rotateX(-90deg) translateZ(${half}px)`,
  ];
  return (
    <div
      className={`k-cube ${tone}`}
      style={{
        width: size,
        height: size,
        top,
        left,
        animationDelay: `${delay}, ${delay}`,
        animationDuration: `14s, ${dur}`,
      }}
    >
      {faces.map((t, i) => (
        <div key={i} className="face" style={{ transform: t }} />
      ))}
    </div>
  );
};

const FloatingCubes = () => (
  <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
    {CUBES.map((c, i) => (
      <Cube3D key={i} {...c} />
    ))}
  </div>
);

export default FloatingCubes;
