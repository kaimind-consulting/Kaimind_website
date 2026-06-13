// Grano de película global — capa fija casi invisible sobre el negro.
// Aporta profundidad/textura premium sin meter color ni recargar.
// SVG feTurbulence: vectorial, pesa nada, no bloquea clics.
const GrainOverlay = () => (
  <div
    aria-hidden="true"
    className="pointer-events-none fixed inset-0 z-[60] opacity-[0.045]"
  >
    <svg className="w-full h-full">
      <filter id="k-grain">
        <feTurbulence
          type="fractalNoise"
          baseFrequency="0.82"
          numOctaves="2"
          stitchTiles="stitch"
        />
        <feColorMatrix type="saturate" values="0" />
      </filter>
      <rect width="100%" height="100%" filter="url(#k-grain)" />
    </svg>
  </div>
);

export default GrainOverlay;
