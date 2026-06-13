import { lazy, Suspense } from "react";
import { motion } from "framer-motion";
import GridBackdrop from "./GridBackdrop";
import CornerGlow from "./CornerGlow";

// Los cubos originales: la misma escena Spline de la v1, idéntica
// (visual, física e interacción por cubo individual)
const Spline = lazy(() => import("@splinetool/react-spline"));

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 36 },
  animate: { opacity: 1, y: 0 },
  transition: { type: "spring", damping: 24, stiffness: 110, delay },
});

const Hero = ({ onContact }) => {
  return (
    <section
      id="inicio"
      className="relative min-h-screen w-full overflow-hidden bg-black"
    >
      {/* Trama geométrica de marca, desvanecida hacia el negro */}
      <GridBackdrop />

      {/* Acento del gradient de marca en la esquina superior izquierda */}
      <CornerGlow corner="top-left" opacity={0.4} />

      {/* Glow del gradient de marca — aura suave de color tras los cubos.
          Toque del degradado insignia sin recargar el fondo negro. */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(circle at 72% 42%, rgba(76,174,126,0.16), transparent 52%), radial-gradient(circle at 88% 72%, rgba(99,93,194,0.14), transparent 48%), radial-gradient(circle at 60% 80%, rgba(127,215,195,0.08), transparent 45%)",
        }}
      />

      {/* Cubos 3D interactivos — la escena original, protagonista a la derecha */}
      <div className="absolute inset-0 lg:left-[40%] lg:w-[70%] w-full h-full opacity-80 lg:opacity-100">
        <Suspense fallback={null}>
          <Spline
            className="w-full h-full"
            scene="https://prod.spline.design/GqHF8DhByevkxM9B/scene.splinecode"
          />
        </Suspense>
      </div>

      {/* Overlay de legibilidad: degradado negro→transparente bajo el texto */}
      <div className="absolute inset-y-0 left-0 w-full lg:w-[62%] bg-gradient-to-r from-black via-black/85 to-transparent pointer-events-none" />

      {/* Contenido */}
      <div className="relative z-10 min-h-screen max-w-7xl mx-auto px-6 md:px-12 flex items-center pointer-events-none">
        <div className="w-full lg:w-[55%] flex flex-col gap-7 pt-28 pb-16 lg:py-0 pointer-events-auto">
          <motion.p {...fadeUp(0.15)} className="k-eyebrow">
            // transformamos datos en progreso_
          </motion.p>

          {/* Título en tres líneas: "el" acompaña a "futuro" */}
          <motion.h1
            {...fadeUp(0.3)}
            className="font-display text-[2.9rem] leading-[1.04] md:text-7xl lg:text-[5.2rem] text-white"
          >
            Construimos
            <br />
            el futuro
            <br />
            <span className="text-kgreen">sobre datos.</span>
          </motion.h1>

          <motion.p
            {...fadeUp(0.5)}
            className="text-[0.95rem] md:text-base text-white/75 max-w-xl leading-relaxed font-poppins"
          >
            Somos especialistas en transformar la complejidad operativa en
            soluciones digitales claras e intuitivas. Convertimos tus datos en
            activos estratégicos con{" "}
            <span className="text-kturquoise">consultoría analítica</span>,{" "}
            <span className="text-kturquoise">pipelines de datos</span> y modelos
            de <span className="text-kturquoise">Machine&nbsp;Learning</span>:
            entiende qué está pasando en tu empresa hoy y predice lo que pasará
            mañana.
          </motion.p>

          <motion.div {...fadeUp(0.65)} className="flex flex-wrap gap-4 mt-2">
            <a
              href="#soluciones"
              className="px-7 py-3 rounded-xl bg-kgreen text-black font-poppins font-semibold hover:bg-kturquoise transition-colors duration-300"
            >
              Explora nuestras soluciones
            </a>
            <button
              onClick={onContact}
              className="px-7 py-3 rounded-xl border border-kturquoise/60 text-kturquoise font-poppins font-medium hover:bg-kturquoise hover:text-black transition-colors duration-300"
            >
              Hablemos
            </button>
          </motion.div>

          <motion.p
            {...fadeUp(0.8)}
            className="font-code text-xs text-white/35 tracking-[0.25em] mt-4 hidden md:block"
          >
            [ AGARRA UN CUBO Y LÁNZALO → ]
          </motion.p>
        </div>
      </div>

      {/* Cierre limpio hacia el negro (sin saltos de tono) */}
      <div className="absolute bottom-0 inset-x-0 h-28 bg-gradient-to-t from-black to-transparent pointer-events-none" />
    </section>
  );
};

export default Hero;
