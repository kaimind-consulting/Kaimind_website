// Trama geométrica de marca: cuadrícula en perspectiva (estilo "GRIDE" del
// brandbook) que se desvanece de negro a transparente para no recargar.
const GridBackdrop = ({ flip = false, className = "" }) => {
  const lines = [];
  // Líneas "verticales" en perspectiva (convergen hacia un punto de fuga)
  for (let i = 0; i <= 24; i++) {
    const x = (i / 24) * 1600;
    const xVanish = 800 + (x - 800) * 0.25;
    lines.push(
      <line key={`v${i}`} x1={x} y1={900} x2={xVanish} y2={0} />
    );
  }
  // Líneas horizontales con espaciado en perspectiva
  for (let i = 0; i <= 14; i++) {
    const t = i / 14;
    const y = 900 - 900 * t * t; // se comprimen hacia el horizonte
    const inset = 800 * 0.75 * (1 - Math.sqrt(1 - t * t * 0.9));
    lines.push(
      <line key={`h${i}`} x1={-inset} y1={y} x2={1600 + inset} y2={y} />
    );
  }

  return (
    <div
      className={`absolute inset-0 pointer-events-none overflow-hidden ${className}`}
      style={{
        // Degradado de negro a transparente: la trama solo se insinúa
        maskImage:
          "radial-gradient(ellipse 75% 70% at 70% 45%, black 0%, transparent 78%)",
        WebkitMaskImage:
          "radial-gradient(ellipse 75% 70% at 70% 45%, black 0%, transparent 78%)",
      }}
    >
      <svg
        viewBox="0 0 1600 900"
        preserveAspectRatio="xMidYMid slice"
        className="w-full h-full"
        style={{ transform: flip ? "scaleY(-1)" : undefined }}
      >
        <g stroke="rgba(127, 215, 195, 0.14)" strokeWidth="1" fill="none">
          {lines}
        </g>
      </svg>
    </div>
  );
};

export default GridBackdrop;
