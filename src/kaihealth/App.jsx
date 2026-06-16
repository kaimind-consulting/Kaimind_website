import { useState } from "react";
import { motion } from "framer-motion";
import {
  FaWhatsapp, FaArrowRight, FaCheck, FaRegCalendarCheck, FaUserInjured,
  FaNotesMedical, FaBrain, FaClipboardList, FaRobot, FaBell, FaChartLine,
  FaArrowLeft, FaEnvelope,
} from "react-icons/fa";
import gradient from "../v2/assets/gradient.webp";
import { sendLead, CONTACT, supportWhatsappLink } from "./lib/lead.js";

const APP_URL = "https://app.kaimindconsulting.com";

const FEATURES = [
  { icon: FaUserInjured,      title: "Pacientes",            desc: "Fichas completas, seguras y siempre a mano." },
  { icon: FaRegCalendarCheck, title: "Agenda",               desc: "Programa citas y consulta tu día de un vistazo." },
  { icon: FaNotesMedical,     title: "Historia clínica",     desc: "Antecedentes y evolución clínica en formato SOAP." },
  { icon: FaBrain,            title: "Tests psicológicos",   desc: "Bender, Raven, Wartegg, HTP y más, con apoyo de IA." },
  { icon: FaClipboardList,    title: "Cuestionarios",        desc: "PHQ-9, GAD-7 y escalas con puntaje automático." },
  { icon: FaRobot,            title: "Plan de tratamiento IA", desc: "Propuestas de plan generadas con inteligencia artificial." },
  { icon: FaBell,             title: "Recordatorios",        desc: "Avisos a tus pacientes por WhatsApp y correo." },
  { icon: FaChartLine,        title: "Reportes",             desc: "Resumen mensual de sesiones, ingresos y asistencia." },
];

const PLANS = [
  { name: "Mensual",    price: 10, period: "/mes",     note: "Flexible, sin compromiso.",          highlight: false, cta: "Empezar gratis",      action: "form" },
  { name: "Trimestral", price: 25, period: "/3 meses", note: "Ahorra frente al mensual.",          highlight: true,  badge: "Más elegido",  cta: "Hablar con un asesor", action: "whatsapp" },
  { name: "Anual",      price: 80, period: "/año",      note: "El mejor valor para tu consulta.",  highlight: false, badge: "Mejor precio", cta: "Hablar con un asesor", action: "whatsapp" },
];

// Enlace de WhatsApp pre-rellenado según el plan que le interese a la psicóloga
const planWhatsappLink = (planName) =>
  `https://wa.me/${CONTACT.whatsappNumber}?text=${encodeURIComponent(
    `¡Hola Kaimind! Me interesa el Plan ${planName} de KaiHealth y quiero hablar con un asesor.`
  )}`;

const PERFILES = [
  "Psicólogo/a clínico/a",
  "Psicólogo/a social",
  "Psicólogo/a organizacional",
  "Psicólogo/a educativo/a",
  "Neuropsicólogo/a",
  "Psicólogo/a infantil",
  "Otro",
];

const PLAN_FEATURES = [
  "Pacientes ilimitados",
  "Agenda con recordatorios",
  "Historia clínica y notas de sesión",
  "Tests y cuestionarios clínicos",
  "Plan de tratamiento con IA",
  "Reportes mensuales",
  "Soporte por WhatsApp",
];

// ─── Barra superior ───────────────────────────────────────────────────────────
function TopBar() {
  return (
    <header className="fixed top-0 inset-x-0 z-40 backdrop-blur-md bg-black/60 border-b border-white/10">
      <div className="max-w-7xl mx-auto px-6 md:px-10 h-16 flex items-center justify-between">
        <a href="/" className="flex items-center gap-2 text-white hover:text-kgreen transition-colors">
          <FaArrowLeft size={13} />
          <span className="font-display text-xl">Kaimind</span>
          <span className="font-mono-k text-xs text-kturquoise tracking-widest hidden sm:inline">/ KaiHealth_</span>
        </a>
        <a
          href={APP_URL}
          className="px-4 py-2 rounded-lg bg-kgreen text-black font-poppins font-semibold text-sm hover:brightness-110 transition"
        >
          Entrar a la app
        </a>
      </div>
    </header>
  );
}

// ─── Hero ───────────────────────────────────────────────────────────────────────
function Hero({ onCta }) {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden pt-16">
      <img src={gradient} alt="" className="absolute inset-0 w-full h-full object-cover opacity-50" />
      <div className="absolute inset-0 bg-gradient-to-br from-black/60 via-black/80 to-black" />
      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-10 py-20 grid lg:grid-cols-2 gap-12 items-center">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <p className="k-eyebrow mb-5">// kaihealth_</p>
          <h1 className="font-display text-4xl md:text-6xl lg:text-[4.2rem] leading-[1.05] text-white">
            Gestión clínica con <span className="text-kgreen">foco</span>, datos y criterio.
          </h1>
          <p className="mt-6 text-white/70 text-base md:text-lg leading-relaxed max-w-xl font-poppins">
            KaiHealth es el software que ordena tu consulta: pacientes, agenda,
            historias clínicas, tests, cuestionarios y planes de tratamiento con IA —
            todo en un solo lugar, pensado para psicólogos.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <span className="flex items-center gap-2 px-4 py-2 rounded-full border border-kgreen/40 text-kgreen text-sm font-poppins">
              <FaCheck size={11} /> 14 días gratis
            </span>
            <span className="flex items-center gap-2 px-4 py-2 rounded-full border border-white/15 text-white/70 text-sm font-poppins">
              <FaCheck size={11} /> Sin tarjeta de crédito
            </span>
            <span className="flex items-center gap-2 px-4 py-2 rounded-full border border-white/15 text-white/70 text-sm font-poppins">
              <FaCheck size={11} /> En la nube, desde cualquier dispositivo
            </span>
          </div>

          <div className="mt-10 flex flex-wrap gap-4">
            <button
              onClick={onCta}
              className="px-7 py-3.5 rounded-xl bg-kgreen text-black font-poppins font-semibold hover:brightness-110 transition flex items-center gap-2"
            >
              Empieza tu prueba gratis <FaArrowRight size={14} />
            </button>
            <a
              href={APP_URL}
              className="px-7 py-3.5 rounded-xl border border-white/20 text-white font-poppins font-semibold hover:border-kgreen hover:text-kgreen transition"
            >
              Ya tengo cuenta
            </a>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.15 }}
          className="hidden lg:block"
        >
          <div className="rounded-3xl border border-white/10 bg-black/50 backdrop-blur-md p-8">
            <p className="font-mono-k text-xs text-kturquoise tracking-widest mb-6">// tu consulta, ordenada_</p>
            <div className="space-y-3">
              {["Pacientes", "Agenda de hoy", "Historia clínica", "Plan de tratamiento IA"].map((t, i) => (
                <div key={t} className="flex items-center gap-3 p-3 rounded-xl bg-white/5 border border-white/10">
                  <span className="w-8 h-8 rounded-lg bg-kgreen/15 text-kgreen flex items-center justify-center text-sm">
                    {i === 3 ? "✦" : "◎"}
                  </span>
                  <span className="text-white/85 font-poppins text-sm">{t}</span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

// ─── Características ───────────────────────────────────────────────────────────
function Features() {
  return (
    <section className="relative py-24 md:py-32 bg-black">
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <p className="k-eyebrow mb-4">// qué incluye_</p>
          <h2 className="font-display text-3xl md:text-5xl text-white leading-tight">
            Todo lo que tu consulta necesita
          </h2>
          <p className="mt-5 text-white/60 font-poppins">
            Una sola herramienta para la gestión clínica y administrativa de tu práctica.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {FEATURES.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 22 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: (i % 4) * 0.06 }}
              viewport={{ once: true, margin: "-40px" }}
              className="p-6 rounded-2xl bg-white/[0.03] border border-white/10 hover:border-kgreen/50 transition-colors group"
            >
              <span className="inline-flex w-11 h-11 rounded-xl bg-kgreen/12 text-kgreen items-center justify-center mb-4 group-hover:bg-kgreen group-hover:text-black transition-colors">
                <f.icon size={18} />
              </span>
              <h3 className="font-poppins font-semibold text-white mb-1.5">{f.title}</h3>
              <p className="text-white/55 text-sm font-poppins leading-relaxed">{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Planes ─────────────────────────────────────────────────────────────────────
function Plans({ onCta }) {
  return (
    <section className="relative py-24 md:py-32 bg-black border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <p className="k-eyebrow mb-4">// planes_</p>
          <h2 className="font-display text-3xl md:text-5xl text-white leading-tight">
            Empieza con <span className="text-kgreen">14 días gratis</span>
          </h2>
          <p className="mt-5 text-white/60 font-poppins">
            Prueba KaiHealth sin costo durante 14 días. Si te gusta, eliges el plan que
            mejor se adapte a tu consulta. Precios en dólares (USD).
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {PLANS.map((p) => (
            <div
              key={p.name}
              className={`relative rounded-2xl p-7 border flex flex-col ${
                p.highlight
                  ? "border-kgreen bg-kgreen/[0.06]"
                  : "border-white/10 bg-white/[0.03]"
              }`}
            >
              {p.badge && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-kgreen text-black text-xs font-semibold whitespace-nowrap">
                  {p.badge}
                </span>
              )}
              <h3 className="font-poppins font-semibold text-white text-lg">{p.name}</h3>
              <div className="mt-3 flex items-end gap-1">
                <span className="font-display text-5xl text-white">${p.price}</span>
                <span className="text-white/50 text-sm mb-2 font-poppins">{p.period}</span>
              </div>
              <p className="mt-2 text-white/55 text-sm font-poppins">{p.note}</p>
              {(() => {
                const cls = `mt-6 w-full py-3 rounded-xl font-poppins font-semibold text-sm transition flex items-center justify-center gap-2 ${
                  p.highlight
                    ? "bg-kgreen text-black hover:brightness-110"
                    : "border border-kgreen/50 text-kgreen hover:bg-kgreen hover:text-black"
                }`;
                return p.action === "whatsapp" ? (
                  <a href={planWhatsappLink(p.name)} target="_blank" rel="noopener noreferrer" className={cls}>
                    <FaWhatsapp size={15} /> {p.cta}
                  </a>
                ) : (
                  <button onClick={onCta} className={cls}>{p.cta}</button>
                );
              })()}
            </div>
          ))}
        </div>

        <div className="mt-12 max-w-2xl mx-auto">
          <ul className="grid sm:grid-cols-2 gap-x-8 gap-y-3">
            {PLAN_FEATURES.map((f) => (
              <li key={f} className="flex items-center gap-3 text-white/70 text-sm font-poppins">
                <FaCheck className="text-kgreen flex-shrink-0" size={12} /> {f}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

// ─── Formulario de captación ──────────────────────────────────────────────────
function LeadForm({ onSuccess, formRef }) {
  const [form, setForm] = useState({
    nombre: "", apellido: "", telefono: "", email: "", perfil: "", mensaje: "",
  });
  const [sending, setSending] = useState(false);
  const [error, setError] = useState("");

  const set = (k) => (e) => setForm({ ...form, [k]: e.target.value });

  const submit = async (e) => {
    e.preventDefault();
    if (!form.nombre || !form.apellido || !form.telefono || !form.email || !form.perfil) {
      setError("Por favor completa todos los campos.");
      return;
    }
    setSending(true);
    setError("");
    const res = await sendLead(form);
    setSending(false);
    if (res.ok) onSuccess(form.nombre);
    else setError(res.message);
  };

  return (
    <section ref={formRef} id="empezar" className="relative py-24 md:py-32 bg-black border-t border-white/5">
      <div className="max-w-3xl mx-auto px-6 md:px-10">
        <div className="text-center mb-10">
          <p className="k-eyebrow mb-4">// empieza ahora_</p>
          <h2 className="font-display text-3xl md:text-5xl text-white leading-tight">
            Activa tu prueba de 14 días
          </h2>
          <p className="mt-5 text-white/60 font-poppins">
            Déjanos tus datos y comienza a usar KaiHealth hoy mismo. Sin tarjeta, sin compromiso.
          </p>
        </div>

        <form
          onSubmit={submit}
          className="rounded-2xl border border-white/10 bg-white/[0.03] p-7 md:p-9 space-y-5"
        >
          <div className="grid sm:grid-cols-2 gap-5">
            <Field label="Nombre" value={form.nombre} onChange={set("nombre")} placeholder="María" />
            <Field label="Apellido" value={form.apellido} onChange={set("apellido")} placeholder="Ramírez" />
          </div>
          <div className="grid sm:grid-cols-2 gap-5">
            <Field label="Teléfono / WhatsApp" value={form.telefono} onChange={set("telefono")} placeholder="+58 412 0000000" />
            <Field label="Correo electrónico" type="email" value={form.email} onChange={set("email")} placeholder="tu@correo.com" />
          </div>

          <div>
            <label className="block text-sm font-poppins font-medium text-white/80 mb-2">Perfil profesional</label>
            <select
              value={form.perfil}
              onChange={set("perfil")}
              className="w-full px-4 py-3 rounded-xl bg-black/40 border border-white/15 text-white font-poppins text-sm focus:border-kgreen outline-none"
            >
              <option value="" disabled>Selecciona tu especialidad…</option>
              {PERFILES.map((p) => (
                <option key={p} value={p} className="bg-black">{p}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-poppins font-medium text-white/80 mb-2">
              Mensaje <span className="text-white/40">(opcional)</span>
            </label>
            <textarea
              value={form.mensaje}
              onChange={set("mensaje")}
              rows={3}
              placeholder="Cuéntanos sobre tu consulta o cualquier duda…"
              className="w-full px-4 py-3 rounded-xl bg-black/40 border border-white/15 text-white font-poppins text-sm focus:border-kgreen outline-none resize-none"
            />
          </div>

          {error && (
            <p className="text-sm text-red-400 font-poppins bg-red-500/10 rounded-lg px-4 py-3">{error}</p>
          )}

          <button
            type="submit"
            disabled={sending}
            className="w-full py-3.5 rounded-xl bg-kgreen text-black font-poppins font-semibold hover:brightness-110 transition disabled:opacity-60 flex items-center justify-center gap-2"
          >
            {sending ? "Enviando…" : <>Activar mi prueba gratis <FaArrowRight size={14} /></>}
          </button>
          <p className="text-center text-white/40 text-xs font-poppins">
            Al enviar, un asesor de Kaimind te acompañará en tu primer ingreso.
          </p>
        </form>
      </div>
    </section>
  );
}

function Field({ label, value, onChange, placeholder, type = "text" }) {
  return (
    <div>
      <label className="block text-sm font-poppins font-medium text-white/80 mb-2">{label}</label>
      <input
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="w-full px-4 py-3 rounded-xl bg-black/40 border border-white/15 text-white font-poppins text-sm placeholder:text-white/30 focus:border-kgreen outline-none"
      />
    </div>
  );
}

// ─── Vista de agradecimiento / cómo empezar ─────────────────────────────────────
const STEPS = [
  { n: 1, title: "Entra y regístrate", desc: "Crea tu cuenta en la app con tu correo. Tu prueba de 14 días se activa al instante." },
  { n: 2, title: "Carga tus pacientes", desc: "Registra a tus pacientes y sus datos básicos en segundos." },
  { n: 3, title: "Agenda y atiende", desc: "Programa citas con recordatorios por WhatsApp y correo, y registra tus sesiones." },
  { n: 4, title: "Usa tus herramientas clínicas", desc: "Historia clínica, tests, cuestionarios y planes de tratamiento con IA." },
];

function ThankYou({ nombre }) {
  return (
    <section className="relative min-h-screen flex items-center pt-16 overflow-hidden">
      <img src={gradient} alt="" className="absolute inset-0 w-full h-full object-cover opacity-40" />
      <div className="absolute inset-0 bg-gradient-to-b from-black/70 to-black" />
      <div className="relative z-10 max-w-3xl mx-auto px-6 md:px-10 py-24 text-center">
        <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <p className="k-eyebrow mb-4">// bienvenida_</p>
          <h1 className="font-display text-4xl md:text-6xl text-white leading-tight">
            ¡Listo{nombre ? `, ${nombre}` : ""}! 🎉
          </h1>
          <p className="mt-5 text-white/70 font-poppins text-lg">
            Tu prueba gratuita de <span className="text-kgreen font-semibold">14 días</span> te espera.
            Así de fácil empiezas:
          </p>
        </motion.div>

        <div className="mt-12 space-y-4 text-left">
          {STEPS.map((s) => (
            <div key={s.n} className="flex gap-4 p-5 rounded-2xl bg-white/[0.04] border border-white/10">
              <span className="flex-shrink-0 w-9 h-9 rounded-full bg-kgreen text-black font-bold flex items-center justify-center font-poppins">
                {s.n}
              </span>
              <div>
                <h3 className="font-poppins font-semibold text-white">{s.title}</h3>
                <p className="text-white/60 text-sm font-poppins mt-0.5">{s.desc}</p>
              </div>
            </div>
          ))}
        </div>

        <a
          href={APP_URL}
          className="mt-10 inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-kgreen text-black font-poppins font-semibold text-lg hover:brightness-110 transition"
        >
          Entrar a KaiHealth <FaArrowRight size={16} />
        </a>

        <p className="mt-8 text-white/50 font-poppins text-sm">
          ¿Dudas o algún problema? Escríbenos:
        </p>
        <div className="mt-3 flex flex-wrap justify-center gap-3">
          <a href={supportWhatsappLink} target="_blank" rel="noopener noreferrer"
            className="flex items-center gap-2 px-5 py-2.5 rounded-lg border border-kgreen/40 text-kgreen font-poppins text-sm hover:bg-kgreen hover:text-black transition">
            <FaWhatsapp /> Soporte por WhatsApp
          </a>
          <a href={`mailto:${CONTACT.email}`}
            className="flex items-center gap-2 px-5 py-2.5 rounded-lg border border-white/20 text-white/80 font-poppins text-sm hover:border-kgreen hover:text-kgreen transition">
            <FaEnvelope /> {CONTACT.email}
          </a>
        </div>
      </div>
    </section>
  );
}

// ─── Soporte / Footer ───────────────────────────────────────────────────────────
function Footer() {
  return (
    <footer className="bg-black border-t border-white/10 py-12">
      <div className="max-w-7xl mx-auto px-6 md:px-10 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="text-center md:text-left">
          <p className="font-display text-2xl text-white">Kaimind</p>
          <p className="text-white/50 text-sm font-poppins mt-1">
            KaiHealth — Gestión clínica con foco, datos y criterio.
          </p>
        </div>
        <div className="flex flex-wrap items-center justify-center gap-4">
          <a href={supportWhatsappLink} target="_blank" rel="noopener noreferrer"
            className="flex items-center gap-2 text-white/70 hover:text-kgreen font-poppins text-sm transition">
            <FaWhatsapp /> WhatsApp
          </a>
          <a href={`mailto:${CONTACT.email}`} className="flex items-center gap-2 text-white/70 hover:text-kgreen font-poppins text-sm transition">
            <FaEnvelope /> {CONTACT.email}
          </a>
          <a href="/" className="text-white/70 hover:text-kgreen font-poppins text-sm transition">
            ← Volver a Kaimind
          </a>
        </div>
      </div>
    </footer>
  );
}

// ─── Botón flotante de WhatsApp ─────────────────────────────────────────────────
function FloatingWhatsApp() {
  return (
    <a
      href={supportWhatsappLink}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Soporte por WhatsApp"
      className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-kgreen text-black flex items-center justify-center shadow-lg shadow-kgreen/30 hover:brightness-110 transition"
    >
      <FaWhatsapp size={26} />
    </a>
  );
}

// ─── App ─────────────────────────────────────────────────────────────────────────
export default function App() {
  const [submittedName, setSubmittedName] = useState(null);

  const scrollToForm = () => {
    document.getElementById("empezar")?.scrollIntoView({ behavior: "smooth" });
  };

  if (submittedName !== null) {
    return (
      <>
        <TopBar />
        <ThankYou nombre={submittedName} />
        <Footer />
        <FloatingWhatsApp />
      </>
    );
  }

  return (
    <>
      <TopBar />
      <main>
        <Hero onCta={scrollToForm} />
        <Features />
        <Plans onCta={scrollToForm} />
        <LeadForm onSuccess={(name) => { setSubmittedName(name); window.scrollTo({ top: 0, behavior: "smooth" }); }} />
      </main>
      <Footer />
      <FloatingWhatsApp />
    </>
  );
}
