import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiGithub, FiInstagram, FiLinkedin, FiMenu, FiX } from "react-icons/fi";
import isotipo from "../assets/isotipo-white.svg";

const NAV = [
  { label: "Inicio", href: "#inicio" },
  { label: "Soluciones", href: "#soluciones" },
  { label: "Contacto", href: "#contacto" },
];

const SOCIALS = [
  { icon: FiGithub, href: "https://github.com/kaimind-consulting" },
  { icon: FiInstagram, href: "https://www.instagram.com/kaimind.data?igsh=MXZsaDE0YTdxbG9pZA==" },
  { icon: FiLinkedin, href: "https://www.linkedin.com/company/kaimind/posts/?feedView=all" },
];

export const ContactModal = ({ open, onClose }) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    const data = new FormData(e.target);
    const subject = encodeURIComponent(
      `Contacto web — ${data.get("name") || "Sin nombre"}`
    );
    const body = encodeURIComponent(
      `Nombre: ${data.get("name")}\nEmail: ${data.get("email")}\n\n${data.get("message")}`
    );
    window.location.href = `mailto:kaimindconsulting@gmail.com?subject=${subject}&body=${body}`;
    onClose();
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 bg-black/70 backdrop-blur-sm z-[90] flex items-center justify-center p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.92, opacity: 0, y: 24 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.92, opacity: 0, y: 24 }}
            transition={{ type: "spring", damping: 26, stiffness: 240 }}
            className="bg-black border border-white/15 rounded-2xl shadow-2xl shadow-kgreen/10 w-full max-w-md p-7"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-start mb-1">
              <div>
                <p className="k-eyebrow mb-2">// hablemos_</p>
                <h2 className="text-3xl text-white font-display">Contáctanos</h2>
              </div>
              <button
                onClick={onClose}
                aria-label="Cerrar"
                className="text-white/60 hover:text-kturquoise transition-colors"
              >
                <FiX className="w-6 h-6" />
              </button>
            </div>
            <p className="text-white/50 text-sm mb-6 font-poppins">
              Cuéntanos qué necesitas y te respondemos pronto.
            </p>

            <form className="space-y-4 font-poppins" onSubmit={handleSubmit}>
              <div>
                <label htmlFor="v2-name" className="block text-xs font-code tracking-widest text-kturquoise mb-1.5 uppercase">
                  Nombre
                </label>
                <input
                  id="v2-name"
                  name="name"
                  type="text"
                  required
                  placeholder="Tu nombre"
                  className="w-full px-4 py-2.5 rounded-lg bg-white/5 border border-white/15 text-white placeholder:text-white/30 focus:outline-none focus:border-kgreen focus:ring-1 focus:ring-kgreen transition-colors"
                />
              </div>
              <div>
                <label htmlFor="v2-email" className="block text-xs font-code tracking-widest text-kturquoise mb-1.5 uppercase">
                  Email
                </label>
                <input
                  id="v2-email"
                  name="email"
                  type="email"
                  required
                  placeholder="tu@correo.com"
                  className="w-full px-4 py-2.5 rounded-lg bg-white/5 border border-white/15 text-white placeholder:text-white/30 focus:outline-none focus:border-kgreen focus:ring-1 focus:ring-kgreen transition-colors"
                />
              </div>
              <div>
                <label htmlFor="v2-message" className="block text-xs font-code tracking-widest text-kturquoise mb-1.5 uppercase">
                  Mensaje
                </label>
                <textarea
                  id="v2-message"
                  name="message"
                  rows="4"
                  required
                  placeholder="¿Cómo podemos ayudarte?"
                  className="w-full px-4 py-2.5 rounded-lg bg-white/5 border border-white/15 text-white placeholder:text-white/30 focus:outline-none focus:border-kgreen focus:ring-1 focus:ring-kgreen transition-colors resize-none"
                />
              </div>
              <motion.button
                type="submit"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full px-4 py-3 rounded-lg bg-kgreen text-black font-semibold hover:bg-kturquoise transition-colors duration-300"
              >
                Enviar mensaje
              </motion.button>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

const Header = ({ onContact }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="fixed top-0 w-full z-50 bg-black/55 backdrop-blur-md border-b border-white/5">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 flex items-center justify-between h-16 md:h-[72px]">
        {/* Logo de marca: isotipo + logotipo + tagline */}
        <motion.a
          href="#inicio"
          initial={{ opacity: 0, x: -24 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7 }}
          className="flex items-center gap-3 group"
        >
          <span className="grid place-items-center w-10 h-10 rounded-[10px] bg-kgreen group-hover:bg-kturquoise transition-colors duration-300">
            <img src={isotipo} alt="" className="w-6 h-6" />
          </span>
          <span className="leading-none">
            <span className="block text-white text-xl font-display tracking-wide">
              KAIMIND
            </span>
            <span className="block font-code text-[0.6rem] tracking-[0.45em] text-kturquoise mt-1">
              DATA INSIGHT_
            </span>
          </span>
        </motion.a>

        {/* Nav escritorio */}
        <nav className="lg:flex hidden items-center gap-8 font-poppins font-medium text-sm">
          {NAV.map((item, i) => (
            <motion.a
              key={item.label}
              href={item.href}
              initial={{ opacity: 0, y: -12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25 + i * 0.1 }}
              className="relative text-white/80 hover:text-white transition-colors duration-300 group"
            >
              {item.label}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-kgreen group-hover:w-full transition-all duration-300" />
            </motion.a>
          ))}
        </nav>

        {/* Redes + CTA escritorio */}
        <div className="md:flex hidden items-center gap-4">
          {SOCIALS.map(({ icon: Icon, href }, i) => (
            <motion.a
              key={href}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, scale: 0.6 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.55 + i * 0.08 }}
              className="text-white/70 hover:text-kturquoise transition-colors duration-300"
            >
              <Icon className="w-5 h-5" />
            </motion.a>
          ))}
          <motion.button
            onClick={onContact}
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.8, type: "spring", stiffness: 140, damping: 16 }}
            className="ml-2 px-5 py-2 rounded-xl border border-kturquoise/60 text-kturquoise font-poppins font-medium text-sm hover:bg-kgreen hover:border-kgreen hover:text-black transition-all duration-300"
          >
            Contáctanos
          </motion.button>
        </div>

        {/* Botón menú móvil */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Menú"
          className="md:hidden text-white/90"
        >
          {isOpen ? <FiX className="h-6 w-6" /> : <FiMenu className="h-6 w-6" />}
        </button>
      </div>

      {/* Menú móvil */}
      <motion.div
        initial={false}
        animate={{ height: isOpen ? "auto" : 0, opacity: isOpen ? 1 : 0 }}
        transition={{ duration: 0.35 }}
        className="md:hidden overflow-hidden bg-black border-t border-white/10"
      >
        <nav className="flex flex-col px-6 py-5 gap-4 font-poppins">
          {NAV.map((item) => (
            <a
              key={item.label}
              href={item.href}
              onClick={() => setIsOpen(false)}
              className="text-white/85 font-medium py-1"
            >
              {item.label}
            </a>
          ))}
          <div className="flex gap-5 pt-3 border-t border-white/10">
            {SOCIALS.map(({ icon: Icon, href }) => (
              <a key={href} href={href} target="_blank" rel="noopener noreferrer">
                <Icon className="h-5 w-5 text-white/80" />
              </a>
            ))}
          </div>
          <button
            onClick={() => {
              setIsOpen(false);
              onContact();
            }}
            className="mt-1 w-full px-4 py-2.5 rounded-xl bg-kgreen text-black font-semibold"
          >
            Contáctanos
          </button>
        </nav>
      </motion.div>
    </header>
  );
};

export default Header;
