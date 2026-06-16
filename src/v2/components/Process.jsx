import { motion } from "framer-motion";
import { FiSearch, FiPenTool, FiCpu, FiTrendingUp } from "react-icons/fi";

// "Cómo trabajamos" — el proceso de Kaimind en 4 pasos.
// Alineado al manifiesto: no entregamos respuestas, construimos criterio.
const STEPS = [
  {
    n: "01",
    icon: FiSearch,
    code: "diagnóstico_",
    title: "Entendemos tu reto",
    text: "Escuchamos tu operación y tus datos. Antes de proponer nada, ordenamos el problema y definimos qué decisión necesitas tomar.",
  },
  {
    n: "02",
    icon: FiPenTool,
    code: "diseño_",
    title: "Diseñamos la solución",
    text: "Trazamos la ruta que conecta tus datos con tu estrategia: qué construir, con qué herramientas y con qué entregables claros.",
  },
  {
    n: "03",
    icon: FiCpu,
    code: "implementación_",
    title: "Implementamos",
    text: "Desarrollamos e integramos la solución —software, pipelines o modelos— con estándares de calidad y transparencia en cada paso.",
  },
  {
    n: "04",
    icon: FiTrendingUp,
    code: "acompañamiento_",
    title: "Acompañamos",
    text: "No desaparecemos al entregar. Te acompañamos a interpretar resultados y a evolucionar la solución con tu negocio.",
  },
];

const Process = () => {
  return (
    <section
      id="proceso"
      className="relative w-full overflow-hidden bg-black py-24 md:py-32"
    >
      <div className="relative z-10 max-w-6xl mx-auto px-6 md:px-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true, margin: "-80px" }}
          className="max-w-3xl mb-14 md:mb-20"
        >
          <p className="k-eyebrow mb-4">// cómo trabajamos_</p>
          <h2 className="font-display text-4xl md:text-6xl text-white leading-tight">
            De los datos <span className="text-kgreen">a las decisiones.</span>
          </h2>
          <p className="text-white/65 text-base md:text-lg mt-5 font-poppins leading-relaxed">
            No entregamos respuestas inmediatas: construimos criterio, estrategia
            e impacto real. Así es trabajar con nosotros.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {STEPS.map((step, i) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={step.n}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                viewport={{ once: true, margin: "-40px" }}
                className="relative p-6 rounded-2xl bg-black/70 border border-white/10 hover:border-kgreen/60 transition-colors duration-300 group"
              >
                {/* Número grande de fondo */}
                <span className="absolute top-4 right-5 font-display text-5xl text-white/5 group-hover:text-kgreen/15 transition-colors duration-300">
                  {step.n}
                </span>

                <span className="grid place-items-center w-12 h-12 rounded-xl bg-kgreen/15 text-kgreen group-hover:bg-kgreen group-hover:text-black transition-colors duration-300 mb-5">
                  <Icon className="w-6 h-6" />
                </span>

                <p className="font-code text-xs text-kturquoise tracking-widest mb-2">
                  {step.code}
                </p>
                <h3 className="font-display text-xl text-white mb-2.5">
                  {step.title}
                </h3>
                <p className="text-white/60 text-sm leading-relaxed font-poppins">
                  {step.text}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Process;
