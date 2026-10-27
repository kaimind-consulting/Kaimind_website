import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FiDatabase, FiExternalLink, FiGithub } from "react-icons/fi";

// "Open source" — Venezuela en datos abiertos, el proyecto abierto de Kaimind.
// Las cifras se leen de la API pública del proyecto (nunca se escriben a mano):
// si la API no responde, la sección se muestra sin cifras.
const DATOS = "https://geopendatos.kaimindconsulting.com";
const REPO = "https://github.com/Kaimind-Technologies/venezuela-datos-abiertos";

const fmt = (n) => new Intl.NumberFormat("es-VE").format(n);

export default function OpenSource() {
  const [cifras, setCifras] = useState(null);

  useEffect(() => {
    fetch(`${DATOS}/api/v0/indicadores.json`)
      .then((r) => (r.ok ? r.json() : Promise.reject()))
      .then((ind) => {
        const i = Object.fromEntries(ind.map((x) => [x.id, x]));
        const [a, b] = i.crecimiento_pegado_a_lo_urbano_pct.rango;
        setCifras([
          [fmt(i.construcciones_total.valor), "construcciones en Venezuela, contadas con imágenes satelitales y mapas abiertos"],
          [`${a}–${b} %`, "del crecimiento urbano 2000-2015 apareció pegado a zonas que ya eran urbanas"],
          [fmt(ind.length), "indicadores verificados en una API abierta, cada uno con su método y su licencia"],
        ]);
      })
      .catch(() => setCifras(null));
  }, []);

  const botones = [
    { label: "Explorar los datos", href: DATOS, icon: FiExternalLink, primario: true },
    { label: "Usar la API", href: `${DATOS}/#datos`, icon: FiDatabase },
    { label: "Ver en GitHub", href: REPO, icon: FiGithub },
  ];

  return (
    <section id="open-source" className="relative w-full overflow-hidden bg-black py-24 md:py-32">
      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true, margin: "-80px" }}
          className="max-w-4xl"
        >
          <p className="k-eyebrow mb-4">// open source_</p>
          <h2 className="font-display text-4xl md:text-6xl text-white leading-tight">
            Datos <span className="text-kgreen">abiertos</span>
            <br />
            donde el censo no llega.
          </h2>
          <p className="mt-6 text-white/65 text-base md:text-lg leading-relaxed font-poppins max-w-3xl">
            <span className="text-white">Venezuela en datos abiertos</span> es nuestro proyecto open source. Venezuela no
            tiene cifras oficiales actualizadas, así que construimos métricas proxy con imágenes satelitales, IA y
            análisis geoespacial: cada cifra se contrasta con una segunda fuente y se publica con su código, sus datos y
            lo que descartamos.
          </p>
        </motion.div>

        {cifras && (
          <div className="mt-12 grid gap-4 md:grid-cols-3">
            {cifras.map(([valor, texto], i) => (
              <motion.div
                key={texto}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                viewport={{ once: true, margin: "-40px" }}
                className="bg-black/70 backdrop-blur-md rounded-2xl border border-white/10 p-6 md:p-8"
              >
                <span className="block font-display text-3xl md:text-4xl text-white">{valor}</span>
                <span className="mt-3 block h-0.5 w-8 rounded-full bg-kgreen" aria-hidden="true" />
                <span className="mt-3 block text-sm text-white/65 font-poppins leading-relaxed">{texto}</span>
              </motion.div>
            ))}
          </div>
        )}

        <div className="mt-10 flex flex-wrap gap-3">
          {botones.map(({ label, href, icon: Icon, primario }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className={`inline-flex items-center gap-2 rounded-lg px-5 py-3 font-poppins font-semibold text-sm transition-all duration-300 ${
                primario
                  ? "bg-kgreen text-black hover:bg-kturquoise"
                  : "border border-kgreen/50 text-kgreen hover:bg-kgreen hover:text-black"
              }`}
            >
              <Icon size={14} />
              {label}
            </a>
          ))}
        </div>

        <p className="mt-8 font-code text-xs text-kturquoise tracking-widest">geo/opendata_ · código MIT · datos ODbL y CC BY 4.0</p>
      </div>
    </section>
  );
}
