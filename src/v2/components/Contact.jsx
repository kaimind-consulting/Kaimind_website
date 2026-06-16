import { useState } from "react";
import { motion } from "framer-motion";
import { FaWhatsapp } from "react-icons/fa";
import { FiMail, FiArrowRight, FiCheckCircle, FiAlertCircle, FiLoader } from "react-icons/fi";
import GridBackdrop from "./GridBackdrop";
import FloatingCubes from "./FloatingCubes";
import { CONTACT, whatsappLink, sendContact } from "../lib/contact";

const EMAIL = CONTACT.email;

const CHANNELS = [
  {
    icon: FaWhatsapp,
    label: "Escríbenos por WhatsApp",
    sub: "+58 412-0745686 · respuesta rápida",
    href: whatsappLink,
  },
  {
    icon: FiMail,
    label: "Envíanos un correo",
    sub: EMAIL,
    href: `mailto:${EMAIL}`,
  },
];

const Contact = () => {
  // idle | sending | success | error
  const [status, setStatus] = useState("idle");
  const [feedback, setFeedback] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const data = new FormData(form);
    // Honeypot anti-spam: si viene relleno, ignoramos en silencio.
    if (data.get("website")) return;

    setStatus("sending");
    const res = await sendContact({
      name: data.get("name"),
      email: data.get("email"),
      message: data.get("message"),
      origen: "Sección Contacto",
    });
    setFeedback(res.message);
    if (res.ok) {
      setStatus("success");
      form.reset();
    } else {
      setStatus("error");
    }
  };

  return (
    <section
      id="contacto"
      className="relative w-full overflow-hidden bg-black py-24 md:py-32"
    >
      <GridBackdrop />
      <FloatingCubes />

      <div className="relative z-10 max-w-6xl mx-auto px-6 md:px-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true, margin: "-80px" }}
          className="max-w-3xl mb-14 md:mb-16"
        >
          <p className="k-eyebrow mb-4">// hablemos_</p>
          <h2 className="font-display text-4xl md:text-6xl text-white leading-tight">
            Hablemos de <span className="text-kgreen">tu proyecto.</span>
          </h2>
          <p className="text-white/65 text-base md:text-lg mt-5 font-poppins leading-relaxed">
            Cuéntanos qué necesitas y te respondemos pronto. Sin formalismos:
            elige el canal que más cómodo te quede.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6 md:gap-10 items-start">
          {/* Canales directos */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
            className="flex flex-col gap-4"
          >
            {CHANNELS.map(({ icon: Icon, label, sub, href }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 p-5 rounded-2xl bg-black/70 border border-white/10 hover:border-kgreen/60 hover:shadow-lg hover:shadow-kgreen/10 transition-all duration-300 group"
              >
                <span className="grid place-items-center w-12 h-12 rounded-xl bg-kgreen/15 text-kgreen group-hover:bg-kgreen group-hover:text-black transition-colors duration-300 shrink-0">
                  <Icon className="w-6 h-6" />
                </span>
                <span className="flex-1 leading-tight">
                  <span className="block text-white font-poppins font-semibold">
                    {label}
                  </span>
                  <span className="block text-white/50 text-sm font-poppins mt-0.5">
                    {sub}
                  </span>
                </span>
                <FiArrowRight className="w-5 h-5 text-white/30 group-hover:text-kgreen group-hover:translate-x-1 transition-all duration-300" />
              </a>
            ))}

            <div className="mt-2 p-5 rounded-2xl border border-dashed border-white/10">
              <p className="font-code text-xs text-kturquoise tracking-widest uppercase mb-2">
                horario_
              </p>
              <p className="text-white/55 text-sm font-poppins leading-relaxed">
                Respondemos de lunes a viernes. Por WhatsApp solemos contestar el
                mismo día.
              </p>
            </div>
          </motion.div>

          {/* Formulario */}
          <motion.form
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            onSubmit={handleSubmit}
            className="p-6 md:p-8 rounded-2xl bg-black/70 border border-white/10 space-y-4 font-poppins"
          >
            {/* Honeypot anti-spam (oculto para humanos) */}
            <input
              type="text"
              name="website"
              tabIndex="-1"
              autoComplete="off"
              className="hidden"
              aria-hidden="true"
            />
            <div>
              <label htmlFor="c-name" className="block text-xs font-code tracking-widest text-kturquoise mb-1.5 uppercase">
                Nombre
              </label>
              <input
                id="c-name"
                name="name"
                type="text"
                required
                placeholder="Tu nombre"
                className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/15 text-white placeholder:text-white/30 focus:outline-none focus:border-kgreen focus:ring-1 focus:ring-kgreen transition-colors"
              />
            </div>
            <div>
              <label htmlFor="c-email" className="block text-xs font-code tracking-widest text-kturquoise mb-1.5 uppercase">
                Email
              </label>
              <input
                id="c-email"
                name="email"
                type="email"
                required
                placeholder="tu@correo.com"
                className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/15 text-white placeholder:text-white/30 focus:outline-none focus:border-kgreen focus:ring-1 focus:ring-kgreen transition-colors"
              />
            </div>
            <div>
              <label htmlFor="c-message" className="block text-xs font-code tracking-widest text-kturquoise mb-1.5 uppercase">
                ¿Qué necesitas?
              </label>
              <textarea
                id="c-message"
                name="message"
                rows="4"
                required
                placeholder="Cuéntanos sobre tu proyecto o reto con datos…"
                className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/15 text-white placeholder:text-white/30 focus:outline-none focus:border-kgreen focus:ring-1 focus:ring-kgreen transition-colors resize-none"
              />
            </div>
            <motion.button
              type="submit"
              disabled={status === "sending"}
              whileHover={status === "sending" ? {} : { scale: 1.02 }}
              whileTap={status === "sending" ? {} : { scale: 0.98 }}
              className="w-full px-4 py-3 rounded-lg bg-kgreen text-black font-semibold hover:bg-kturquoise transition-colors duration-300 flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {status === "sending" ? (
                <>
                  <FiLoader className="w-5 h-5 animate-spin" />
                  Enviando…
                </>
              ) : (
                <>
                  Enviar mensaje
                  <FiArrowRight className="w-5 h-5" />
                </>
              )}
            </motion.button>

            {/* Feedback de envío */}
            {status === "success" && (
              <p className="flex items-center gap-2 text-sm text-kgreen">
                <FiCheckCircle className="w-5 h-5 shrink-0" />
                {feedback}
              </p>
            )}
            {status === "error" && (
              <p className="flex items-center gap-2 text-sm text-red-400">
                <FiAlertCircle className="w-5 h-5 shrink-0" />
                {feedback}
              </p>
            )}
          </motion.form>
        </div>
      </div>
    </section>
  );
};

export default Contact;
