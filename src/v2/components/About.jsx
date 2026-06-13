import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import FloatingCubes from "./FloatingCubes";
import personImg from "../../assets/person.png";

const PROFILES = [
  {
    name: "Jeremy",
    surname: "Uzcategui",
    role: "Cofundador · Estadística & ML",
    image: personImg,
    description:
      "Mi enfoque combina la rigurosidad matemática con la creatividad de la programación. Como fundador, mi objetivo es transformar datos abstractos en soluciones tangibles y estrategias claras. Me apasiona encontrar patrones donde otros solo ven ruido, y convertir líneas de código en resultados de valor. Creo firmemente en el trabajo con propósito: mi meta a largo plazo es construir un legado que financie mi gran sueño personal — un refugio para animales. Esa es la energía que imprimo en cada proyecto.",
  },
  {
    name: "Daniel",
    surname: "Camacho",
    role: "Cofundador",
    image: personImg,
    description:
      "Próximamente: la historia de Daniel y cómo impulsa la cultura de datos en cada proyecto de Kaimind.",
  },
  {
    name: "Roberto",
    surname: "Schaefer",
    role: "CEO · Cofundador",
    image: personImg,
    description:
      "Como fundador y líder estratégico de Kaimind, mi misión es movilizar el talento técnico de nuestro equipo hacia objetivos de alto impacto: trazar la ruta que conecta los datos con la estrategia de negocio, impulsando desarrollos escalables, ambiciosos y disruptivos.\n\nCreemos en un liderazgo dinámico que transforma la complejidad técnica en claridad estratégica. Proyectamos a Kaimind como el socio que las organizaciones necesitan para capturar oportunidades donde otros no ven nada.\n\nMi compromiso es construir más que una consultora: dejar un legado de innovación que trascienda y evolucione con el tiempo.",
  },
];

const About = () => {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(1);

  const change = (dir) => {
    setDirection(dir);
    setIndex((prev) => (prev + dir + PROFILES.length) % PROFILES.length);
  };

  const profile = PROFILES[index];

  return (
    <section
      id="nosotros"
      className="relative min-h-screen overflow-hidden bg-black flex flex-col justify-center py-24"
    >
      <FloatingCubes />

      <div className="relative z-10 max-w-6xl mx-auto px-6 w-full">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true, margin: "-80px" }}
          className="text-center mb-12 md:mb-16"
        >
          <p className="k-eyebrow mb-4">// el equipo_</p>
          <h2 className="font-display text-4xl md:text-6xl text-white">
            Acerca de <span className="text-kgreen">nosotros</span>
          </h2>
        </motion.div>

        <div className="flex flex-col-reverse md:flex-row items-center gap-10 md:gap-6">
          {/* Texto */}
          <div className="md:w-1/2 text-center md:text-left min-h-[260px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={index}
                initial={{ opacity: 0, x: 40 * direction }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -40 * direction }}
                transition={{ duration: 0.35 }}
              >
                <h3 className="font-display text-3xl md:text-4xl text-white mb-2">
                  {profile.name}{" "}
                  <span className="text-kgreen">{profile.surname}</span>
                </h3>
                <p className="font-code text-xs tracking-[0.3em] text-kturquoise uppercase mb-6">
                  {profile.role}
                </p>
                <p className="text-white/70 text-sm md:text-base leading-relaxed font-poppins md:pr-8 whitespace-pre-line">
                  {profile.description}
                </p>
              </motion.div>
            </AnimatePresence>

            {/* Indicadores */}
            <div className="flex gap-2 justify-center md:justify-start mt-8">
              {PROFILES.map((_, i) => (
                <button
                  key={i}
                  onClick={() => {
                    setDirection(i > index ? 1 : -1);
                    setIndex(i);
                  }}
                  aria-label={`Perfil ${i + 1}`}
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    i === index ? "w-8 bg-kgreen" : "w-3 bg-white/25 hover:bg-white/50"
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Imagen con flechas */}
          <div className="md:w-1/2 flex items-center justify-center relative">
            <button
              onClick={() => change(-1)}
              aria-label="Perfil anterior"
              className="absolute left-0 md:left-6 z-20 p-3 rounded-full border border-white/15 bg-black/60 hover:border-kgreen hover:text-kgreen text-white backdrop-blur-sm transition-all duration-300"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-5 h-5 md:w-6 md:h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
              </svg>
            </button>

            <AnimatePresence mode="wait">
              <motion.img
                key={index}
                src={profile.image}
                alt={`${profile.name} ${profile.surname}`}
                initial={{ opacity: 0, scale: 0.85, rotate: 6 * direction }}
                animate={{ opacity: 1, scale: 1, rotate: 0 }}
                exit={{ opacity: 0, scale: 0.85, rotate: -6 * direction }}
                transition={{ duration: 0.35 }}
                className="h-[16rem] md:h-[28rem] object-contain drop-shadow-2xl"
              />
            </AnimatePresence>

            <button
              onClick={() => change(1)}
              aria-label="Perfil siguiente"
              className="absolute right-0 md:right-6 z-20 p-3 rounded-full border border-white/15 bg-black/60 hover:border-kgreen hover:text-kgreen text-white backdrop-blur-sm transition-all duration-300"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-5 h-5 md:w-6 md:h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
