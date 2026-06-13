import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaWhatsapp } from "react-icons/fa";
import { FiX, FiMail, FiMessageCircle } from "react-icons/fi";

// Datos oficiales (brandbook Kaimind)
const WHATSAPP = "584120745686";
const WHATSAPP_MSG = encodeURIComponent(
  "¡Hola Kaimind! Me gustaría conocer más sobre sus soluciones."
);
const EMAIL = "kaimindconsulting@gmail.com";

// Botón flotante de contacto cómodo (estilo Vikua / Grupo NW):
// siempre visible, abre canales directos sin que el usuario llene nada.
const FloatingContact = () => {
  const [open, setOpen] = useState(false);
  const [showHint, setShowHint] = useState(false);

  // Aparece una burbuja-invitación a los 4s, una sola vez
  useEffect(() => {
    const t = setTimeout(() => setShowHint(true), 4000);
    const t2 = setTimeout(() => setShowHint(false), 11000);
    return () => {
      clearTimeout(t);
      clearTimeout(t2);
    };
  }, []);

  const channels = [
    {
      icon: FaWhatsapp,
      label: "WhatsApp",
      sub: "Respuesta rápida",
      href: `https://wa.me/${WHATSAPP}?text=${WHATSAPP_MSG}`,
      color: "#25D366",
    },
    {
      icon: FiMail,
      label: "Correo",
      sub: EMAIL,
      href: `mailto:${EMAIL}`,
      color: "#4CAE7E",
    },
  ];

  return (
    <div className="fixed bottom-5 right-5 z-[80] flex flex-col items-end gap-3">
      {/* Canales desplegados */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 12, scale: 0.92 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.92 }}
            transition={{ type: "spring", damping: 22, stiffness: 280 }}
            className="flex flex-col gap-2.5 mb-1"
          >
            {channels.map(({ icon: Icon, label, sub, href, color }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 pl-3 pr-5 py-2.5 rounded-2xl bg-black border border-white/12 hover:border-white/30 shadow-xl transition-colors group"
              >
                <span
                  className="grid place-items-center w-9 h-9 rounded-xl shrink-0"
                  style={{ backgroundColor: color }}
                >
                  <Icon className="w-5 h-5 text-black" />
                </span>
                <span className="leading-tight">
                  <span className="block text-white text-sm font-poppins font-semibold">
                    {label}
                  </span>
                  <span className="block text-white/45 text-xs font-poppins">
                    {sub}
                  </span>
                </span>
              </a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Burbuja-invitación */}
      <AnimatePresence>
        {showHint && !open && (
          <motion.button
            onClick={() => {
              setOpen(true);
              setShowHint(false);
            }}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            className="absolute bottom-1 right-16 whitespace-nowrap px-4 py-2.5 rounded-2xl rounded-br-sm bg-white text-black text-sm font-poppins font-medium shadow-xl"
          >
            ¿Hablamos? 👋
          </motion.button>
        )}
      </AnimatePresence>

      {/* Botón principal */}
      <button
        onClick={() => setOpen(!open)}
        aria-label={open ? "Cerrar contacto" : "Abrir contacto"}
        className="relative grid place-items-center w-14 h-14 rounded-full bg-kgreen text-black shadow-2xl shadow-kgreen/30 hover:bg-kturquoise transition-colors duration-300"
      >
        {/* Pulso */}
        {!open && (
          <span className="absolute inset-0 rounded-full bg-kgreen animate-ping opacity-40" />
        )}
        <span className="relative">
          {open ? (
            <FiX className="w-6 h-6" />
          ) : (
            <FiMessageCircle className="w-6 h-6" />
          )}
        </span>
      </button>
    </div>
  );
};

export default FloatingContact;
