import gradient from "../assets/gradient.webp";

// Acento del gradient de marca en una esquina — apenas perceptible.
// Enmarca la página (arriba-izq / abajo-der) con la aurora Kaimind,
// difuminado y enmascarado para que se funda con el negro sin recargar.
const CornerGlow = ({ corner = "top-left", className = "", opacity = 0.4 }) => {
  const isTL = corner === "top-left";
  const fade = isTL
    ? "radial-gradient(ellipse at top left, black 0%, transparent 68%)"
    : "radial-gradient(ellipse at bottom right, black 0%, transparent 68%)";
  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none absolute z-0 w-[62vw] max-w-[660px] aspect-[16/9] ${
        isTL ? "top-0 left-0" : "bottom-0 right-0"
      } ${className}`}
      style={{
        backgroundImage: `url(${gradient})`,
        backgroundSize: "cover",
        backgroundPosition: isTL ? "left top" : "right bottom",
        opacity,
        filter: "blur(10px)",
        maskImage: fade,
        WebkitMaskImage: fade,
      }}
    />
  );
};

export default CornerGlow;
