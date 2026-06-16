// ============================================================
//  Captación de leads de KaiHealth → correo de Kaimind
//  Reutiliza la misma cuenta de Web3Forms del formulario de
//  contacto del sitio (src/v2/lib/contact.js). Los datos llegan
//  a kaimindconsulting@gmail.com.
// ============================================================
import { WEB3FORMS_ACCESS_KEY, CONTACT } from "../../v2/lib/contact.js";

export { CONTACT };

// Enlace de WhatsApp de soporte para KaiHealth
export const supportWhatsappLink = `https://wa.me/${CONTACT.whatsappNumber}?text=${encodeURIComponent(
  "¡Hola Kaimind! Tengo una consulta sobre KaiHealth."
)}`;

/**
 * Envía los datos de una psicóloga interesada a Web3Forms.
 * Devuelve { ok, message }.
 */
export async function sendLead({ nombre, apellido, telefono, email, perfil, mensaje }) {
  if (!WEB3FORMS_ACCESS_KEY || WEB3FORMS_ACCESS_KEY.startsWith("PEGA-AQUI")) {
    return {
      ok: false,
      message:
        "El formulario aún no está conectado. Escríbenos por WhatsApp o al correo de Kaimind.",
    };
  }
  try {
    const res = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify({
        access_key: WEB3FORMS_ACCESS_KEY,
        subject: `🩺 Nuevo interesado en KaiHealth — ${nombre} ${apellido}`,
        from_name: "KaiHealth Landing",
        nombre,
        apellido,
        telefono,
        email,
        perfil_profesional: perfil,
        mensaje: mensaje?.trim() || "(sin mensaje)",
        origen: "Landing KaiHealth",
      }),
    });
    const data = await res.json();
    return data.success
      ? { ok: true, message: "¡Datos recibidos!" }
      : { ok: false, message: "No se pudo enviar. Intenta de nuevo o escríbenos por WhatsApp." };
  } catch {
    return {
      ok: false,
      message: "Hubo un problema de conexión. Escríbenos por WhatsApp o correo.",
    };
  }
}
