// ============================================================
//  CONFIGURACIÓN DEL FORMULARIO DE CONTACTO  (Web3Forms)
// ============================================================
//  Para que los mensajes lleguen al correo de Kaimind:
//  1. Entra a  https://web3forms.com  (gratis, sin crear cuenta).
//  2. Escribe el correo donde quieres recibir los mensajes
//     (kaimindconsulting@gmail.com) y te envían un "Access Key".
//  3. Pega ese código aquí abajo, reemplazando el texto.
//  Eso es todo: el formulario empezará a enviar de verdad.
// ============================================================
export const WEB3FORMS_ACCESS_KEY = "PEGA-AQUI-TU-ACCESS-KEY";

export const CONTACT = {
  whatsappNumber: "584120745686",
  whatsappText:
    "¡Hola Kaimind! Me gustaría conocer más sobre sus soluciones.",
  email: "kaimindconsulting@gmail.com",
};

export const whatsappLink = `https://wa.me/${CONTACT.whatsappNumber}?text=${encodeURIComponent(
  CONTACT.whatsappText
)}`;

// Envía el formulario a Web3Forms. Devuelve { ok, message }.
export async function sendContact({ name, email, message, origen = "Web Kaimind" }) {
  if (!WEB3FORMS_ACCESS_KEY || WEB3FORMS_ACCESS_KEY.startsWith("PEGA-AQUI")) {
    // Aún no configuraron el Access Key → no intentamos enviar.
    return {
      ok: false,
      message:
        "El formulario aún no está conectado. Mientras tanto, escríbenos por WhatsApp o correo.",
    };
  }
  try {
    const res = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify({
        access_key: WEB3FORMS_ACCESS_KEY,
        subject: `Nuevo contacto desde la web — ${name}`,
        from_name: "Kaimind Web",
        name,
        email,
        message,
        origen,
      }),
    });
    const data = await res.json();
    return data.success
      ? { ok: true, message: "¡Mensaje enviado! Te responderemos pronto." }
      : {
          ok: false,
          message: "No se pudo enviar. Intenta de nuevo o escríbenos por WhatsApp.",
        };
  } catch {
    return {
      ok: false,
      message: "Hubo un problema de conexión. Escríbenos por WhatsApp o correo.",
    };
  }
}
