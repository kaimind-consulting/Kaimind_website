import { AnimatePresence, motion } from "framer-motion";
import { FiX } from "react-icons/fi";

// Términos y Condiciones — texto oficial de Kaimind (documento de marca).
const TERMS = {
  title: "Términos y Condiciones",
  intro:
    "Estos Términos y Condiciones regulan el acceso, uso y contratación de los servicios, plataformas, soluciones y productos ofrecidos por Kaimind (en adelante, “la Empresa”). Al acceder o utilizar nuestros servicios, el Cliente declara haber leído, comprendido y aceptado íntegramente los presentes términos.",
  sections: [
    {
      h: "1. Sobre nosotros",
      p: "Kaimind ofrece soluciones tecnológicas y de datos para convertir información en decisiones estratégicas.",
    },
    {
      h: "2. Servicios",
      p: "Kaimind ofrece, entre otros: desarrollo de software a medida; dashboards e inteligencia de negocios; análisis avanzado de datos y geolocalización; consultoría tecnológica en Inteligencia Artificial; automatización de procesos; y soluciones SaaS y Computer Vision. Los alcances, entregables y condiciones específicas de cada servicio serán definidos en el acuerdo individual con el Cliente.",
    },
    {
      h: "3. Uso del servicio",
      p: "El Cliente se compromete a utilizar los servicios de Kaimind exclusivamente de forma legal y ética, absteniéndose de acceder a sistemas sin autorización, interferir con el funcionamiento de las plataformas o utilizarlas para fines que contravengan la normativa aplicable.",
    },
    {
      h: "4. Propiedad intelectual",
      p: "Todo el software, algoritmos, modelos de inteligencia artificial, código fuente, metodologías y tecnología desarrollados por Kaimind son propiedad exclusiva de Kaimind, salvo acuerdo expreso por escrito en contrario. El Cliente no podrá reproducir, distribuir ni modificar dichos activos sin autorización previa.",
    },
    {
      h: "5. Datos y privacidad",
      p: "Kaimind se compromete a proteger los datos del Cliente con estándares de seguridad adecuados, utilizándolos únicamente para la prestación de los servicios contratados y en cumplimiento de la normativa de protección de datos vigente.",
    },
    {
      h: "6. Confidencialidad",
      p: "Toda la información técnica, comercial o estratégica compartida entre las partes durante la relación contractual será tratada con estricta confidencialidad. Esta obligación se mantendrá vigente incluso tras la finalización del contrato.",
    },
    {
      h: "7. Disponibilidad del servicio",
      p: "Kaimind realizará todos los esfuerzos razonables para garantizar la disponibilidad continua de sus servicios y plataformas. Sin embargo, no garantiza disponibilidad ininterrumpida ni libre de errores, y podrá realizar mantenimientos programados con previo aviso al Cliente.",
    },
    {
      h: "8. Limitación de responsabilidad",
      p: "Kaimind no será responsable por daños indirectos, incidentales o derivados del uso o la imposibilidad de uso de sus servicios, más allá de lo expresamente acordado con el Cliente.",
    },
    {
      h: "9. Pagos y facturación",
      p: "Las condiciones de pago, montos, plazos y modalidades serán definidos en cada acuerdo individual con el Cliente. El incumplimiento en los pagos podrá resultar en la suspensión temporal o definitiva del servicio contratado.",
    },
    {
      h: "10. Terminación del servicio",
      p: "Kaimind se reserva el derecho de suspender o terminar la prestación del servicio ante el incumplimiento de estos Términos y Condiciones o del acuerdo individual suscrito con el Cliente, previa notificación formal por los medios acordados.",
    },
    {
      h: "11. Seguridad",
      p: "Kaimind implementa medidas técnicas y organizativas razonables para proteger la integridad y confidencialidad de los sistemas y datos. No obstante, no garantiza seguridad absoluta frente a amenazas externas fuera de su control.",
    },
    {
      h: "12. Uso de Inteligencia Artificial",
      p: "Los resultados generados por los sistemas de IA de Kaimind son de carácter probabilístico y estadístico. Deben utilizarse como herramienta de apoyo a la toma de decisiones y no como determinantes únicos de acciones críticas. Kaimind no se responsabiliza por decisiones finales tomadas exclusivamente sobre dichos resultados.",
    },
    {
      h: "13. Modificaciones",
      p: "Kaimind podrá actualizar o modificar estos Términos y Condiciones en cualquier momento. Las modificaciones serán notificadas al Cliente por los medios disponibles y entrarán en vigor a partir de su comunicación formal. Contáctanos para cualquier consulta, reclamo o comunicación relacionada con estos Términos y Condiciones.",
    },
  ],
};

// Política de Privacidad — redactada para el sitio web, alineada con el
// documento de Datos y Privacidad de Kaimind.
const PRIVACY = {
  title: "Política de Privacidad",
  intro:
    "En Kaimind respetamos tu privacidad. Esta política explica qué datos recogemos a través de este sitio web, con qué fin y cómo los protegemos.",
  sections: [
    {
      h: "1. Datos que recopilamos",
      p: "A través de nuestro formulario de contacto recogemos únicamente los datos que tú nos proporcionas: nombre, correo electrónico y el mensaje que escribes. Si nos contactas por WhatsApp o correo, recibimos los datos que decidas compartir en esa conversación.",
    },
    {
      h: "2. Finalidad",
      p: "Usamos estos datos exclusivamente para responder tu consulta, darte seguimiento y, si así lo solicitas, presentarte nuestros servicios. No los usamos para otros fines sin tu consentimiento.",
    },
    {
      h: "3. Conservación y no divulgación",
      p: "No vendemos, alquilamos ni compartimos tus datos con terceros con fines comerciales. Conservamos tu información solo durante el tiempo necesario para atender tu solicitud.",
    },
    {
      h: "4. Seguridad",
      p: "Aplicamos medidas técnicas y organizativas razonables para proteger tus datos. No obstante, ningún medio de transmisión por internet es 100% seguro, por lo que no podemos garantizar seguridad absoluta frente a amenazas externas fuera de nuestro control.",
    },
    {
      h: "5. Tus derechos",
      p: "Puedes solicitar en cualquier momento acceder, corregir o eliminar los datos que nos hayas facilitado, escribiéndonos a kaimindconsulting@gmail.com.",
    },
    {
      h: "6. Cambios en esta política",
      p: "Podemos actualizar esta Política de Privacidad cuando sea necesario. La versión vigente siempre estará disponible en este sitio.",
    },
  ],
};

const DOCS = { terms: TERMS, privacy: PRIVACY };

const LegalModal = ({ doc, onClose }) => {
  const content = doc ? DOCS[doc] : null;
  return (
    <AnimatePresence>
      {content && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 bg-black/70 backdrop-blur-sm z-[95] flex items-center justify-center p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.94, opacity: 0, y: 24 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.94, opacity: 0, y: 24 }}
            transition={{ type: "spring", damping: 26, stiffness: 240 }}
            className="bg-black border border-white/15 rounded-2xl shadow-2xl shadow-kgreen/10 w-full max-w-2xl max-h-[85vh] flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Cabecera fija */}
            <div className="flex justify-between items-start p-6 md:p-7 border-b border-white/10">
              <div>
                <p className="k-eyebrow mb-2">// legal_</p>
                <h2 className="text-2xl md:text-3xl text-white font-display">
                  {content.title}
                </h2>
              </div>
              <button
                onClick={onClose}
                aria-label="Cerrar"
                className="text-white/60 hover:text-kturquoise transition-colors shrink-0"
              >
                <FiX className="w-6 h-6" />
              </button>
            </div>

            {/* Contenido con scroll */}
            <div className="overflow-y-auto p-6 md:p-7 font-poppins">
              <p className="text-white/70 text-sm leading-relaxed mb-6">
                {content.intro}
              </p>
              <div className="space-y-5">
                {content.sections.map((s) => (
                  <div key={s.h}>
                    <h3 className="text-kgreen font-semibold text-sm mb-1.5">
                      {s.h}
                    </h3>
                    <p className="text-white/60 text-sm leading-relaxed">{s.p}</p>
                  </div>
                ))}
              </div>
              <p className="text-white/35 text-xs mt-8 font-code">
                Última actualización: junio 2026 · kaimindconsulting@gmail.com
              </p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default LegalModal;
