import { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FaArrowLeft, FaArrowRight, FaExternalLinkAlt } from "react-icons/fa";
import FloatingCubes from "./FloatingCubes";

const PANELS = [
  {
    id: 0,
    title: "KaiHealth",
    tag: "14 días gratis",
    description:
      "Software de gestión clínica para psicólogos: pacientes, agenda con recordatorios, historias clínicas, tests, cuestionarios (PHQ-9, GAD-7) y planes de tratamiento con IA. Todo en un solo lugar.",
    buttonText: "Empieza tu prueba",
    buttonLink: "/kaihealth.html",
    page: true,
    code: "salud/clinica_",
  },
  {
    id: 1,
    title: "CV Match",
    tag: "New",
    description:
      "Sube tu CV, pega la vacante o ingresa el cargo — la IA analiza tu compatibilidad, detecta keywords ATS y te dice exactamente qué cambiar.",
    buttonText: "Prueba tu compatibilidad",
    buttonLink: "https://cvmatch.kaimindconsulting.com",
    external: true,
    code: "ia/match_",
  },
  {
    id: 2,
    title: "Consultoría Analítica",
    description:
      "Auditamos tus datos y procesos para convertir métricas sueltas en decisiones con criterio. Claridad por encima de la complejidad.",
    buttonText: "Conoce el servicio",
    buttonLink: "#contacto",
    code: "data/insight_",
  },
  {
    id: 3,
    title: "Pipelines & Automatización",
    description:
      "Diseñamos flujos de datos que se mantienen solos: ingesta, limpieza y disponibilidad en tiempo real para todo tu equipo.",
    buttonText: "Automatiza tu flujo",
    buttonLink: "#contacto",
    code: "etl/auto_",
  },
  {
    id: 4,
    title: "Machine & Deep Learning",
    description:
      "Modelos a la medida de tu negocio para entender qué está pasando hoy y predecir lo que pasará mañana.",
    buttonText: "Predice con nosotros",
    buttonLink: "#contacto",
    code: "ml/predict_",
  },
];

// Capacidades completas de Kaimind (según su documento de servicios)
const CAPABILITIES = [
  "Software a medida",
  "Dashboards & BI",
  "Análisis de datos",
  "Geolocalización",
  "Computer Vision",
  "Automatización de procesos",
  "Consultoría en IA",
  "Soluciones SaaS",
];

const Solutions = () => {
  const carouselRef = useRef(null);
  const [showLeft, setShowLeft] = useState(false);
  const [showRight, setShowRight] = useState(true);

  const updateArrows = () => {
    const el = carouselRef.current;
    if (!el) return;
    const max = el.scrollWidth - el.clientWidth;
    setShowLeft(el.scrollLeft > 10);
    setShowRight(el.scrollLeft < max - 10);
  };

  useEffect(() => {
    updateArrows();
    window.addEventListener("resize", updateArrows);
    return () => window.removeEventListener("resize", updateArrows);
  }, []);

  const scroll = (dir) => {
    const el = carouselRef.current;
    if (!el) return;
    el.scrollBy({
      left: dir === "left" ? -el.clientWidth * 0.8 : el.clientWidth * 0.8,
      behavior: "smooth",
    });
  };

  const open = (panel) => {
    if (panel.page) {
      window.location.href = panel.buttonLink;
    } else if (panel.external) {
      window.open(panel.buttonLink, "_blank", "noopener,noreferrer");
    } else {
      document.querySelector(panel.buttonLink)?.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      id="soluciones"
      className="relative w-full min-h-screen overflow-hidden bg-black py-24 md:py-32"
    >
      {/* Cubitos sueltos en lugar de pepitas */}
      <FloatingCubes />

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true, margin: "-80px" }}
          className="text-center max-w-4xl mx-auto mb-14 md:mb-20"
        >
          <p className="k-eyebrow mb-4">// soluciones_</p>
          {/* Todo en minúscula salvo la V inicial; PODER en mayúscula y verde */}
          <h2 className="font-display text-4xl md:text-6xl lg:text-7xl text-white leading-tight">
            Visualiza el <span className="text-kgreen">PODER</span>
            <br />
            de tus datos.
          </h2>
        </motion.div>

        {/* Carrusel */}
        <div className="relative">
          {showLeft && (
            <button
              onClick={() => scroll("left")}
              aria-label="Anterior"
              className="absolute -left-3 md:-left-6 top-1/2 -translate-y-1/2 z-20 bg-black/80 border border-white/15 hover:border-kgreen text-white hover:text-kgreen p-3 rounded-full backdrop-blur-sm transition-all duration-300"
            >
              <FaArrowLeft size={18} />
            </button>
          )}
          {showRight && (
            <button
              onClick={() => scroll("right")}
              aria-label="Siguiente"
              className="absolute -right-3 md:-right-6 top-1/2 -translate-y-1/2 z-20 bg-black/80 border border-white/15 hover:border-kgreen text-white hover:text-kgreen p-3 rounded-full backdrop-blur-sm transition-all duration-300"
            >
              <FaArrowRight size={18} />
            </button>
          )}

          <div
            ref={carouselRef}
            onScroll={updateArrows}
            className="flex overflow-x-auto scrollbar-hide gap-4 md:gap-6 pb-6 pt-2 px-1 snap-x"
          >
            {PANELS.map((panel, i) => (
              <motion.article
                key={panel.id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                viewport={{ once: true, margin: "-40px" }}
                className="flex-shrink-0 w-[280px] md:w-[350px] lg:w-[390px] snap-start
                  bg-black/70 backdrop-blur-md rounded-2xl border border-white/10
                  hover:border-kgreen/60 hover:shadow-lg hover:shadow-kgreen/10
                  transition-all duration-300 group"
              >
                <div className="p-6 md:p-8 flex flex-col h-full">
                  <div className="flex items-center justify-between mb-4">
                    <span className="font-code text-xs text-kturquoise tracking-widest">
                      {panel.code}
                    </span>
                    {panel.tag && (
                      <span className="px-3 py-1 text-xs font-semibold bg-kgreen text-black rounded-full">
                        {panel.tag}
                      </span>
                    )}
                  </div>

                  <h3 className="font-display text-2xl md:text-[1.7rem] text-white mb-3">
                    {panel.title}
                  </h3>

                  <p className="text-white/65 text-sm md:text-[0.95rem] mb-7 leading-relaxed font-poppins flex-1">
                    {panel.description}
                  </p>

                  <button
                    onClick={() => open(panel)}
                    className="w-full px-4 py-2.5 rounded-lg border border-kgreen/50 text-kgreen
                      group-hover:bg-kgreen group-hover:text-black
                      font-poppins font-semibold text-sm transition-all duration-300
                      flex items-center justify-center gap-2"
                  >
                    {panel.buttonText}
                    {panel.external && <FaExternalLinkAlt size={12} />}
                  </button>
                </div>
              </motion.article>
            ))}
          </div>
        </div>

        {/* Franja de capacidades — toda la amplitud de Kaimind */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true, margin: "-40px" }}
          className="mt-16 md:mt-20 max-w-5xl mx-auto text-center"
        >
          <p className="k-eyebrow mb-6">// también desarrollamos_</p>
          <div className="flex flex-wrap justify-center gap-3">
            {CAPABILITIES.map((cap) => (
              <span
                key={cap}
                className="px-4 py-2 rounded-full border border-white/12 text-white/70 text-sm font-poppins hover:border-kgreen/60 hover:text-white transition-colors duration-300"
              >
                {cap}
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Solutions;
