// Marca de agua del isotipo Kaimind (patrón de marca del brandbook).
// SVG <pattern> inline: tono sobre tono, muy tenue, con máscara que lo
// desvanece para que nunca compita con el contenido. Refuerza identidad.
const ISOTIPO_PATH =
  "M314.87,232.79c4.68,1.55,1,15.65,0,19.53a116.29,116.29,0,0,1-4,12c-.61,1.54-3.2,5.76-2.24,7.44,1.93,3.37,10.61-1,17.48-5.87,9.43-6.73,15.74-17.34,19-28.44.85-2.88.95-5.17,3.8-5.52,3.23-.41,12.1-.13,15.17-.11,7.31,0,14.62.1,21.94.11.87,0,1.57,1.18,1.57,2.05v12.31c0,10.76-.82,17.26-6.75,26.5-18.93,29.53-63.07,26.95-63.07,26.95-4.51-.18-9-.38-13.51-1a103.94,103.94,0,0,1-11.5-1.81.08.08,0,0,0,0,.14c4.53,2.26,38.78,18.35,91.92,15.06a2.2,2.2,0,0,1,2.34,2c.1,1.36.2,2.71.29,4.07.46,6.62.47,12.35.47,19.11,0,4.75.88,12.36-2.23,16-4,4.74-12.82,3.47-17.56,2.32A186.51,186.51,0,0,1,348.37,350c-11-4-26.06-10.92-35-18.5a2,2,0,0,0-3.32,1.66c.3,6.69,6,19,2.95,22-3.38,3.38-14.35,2.43-19.29,2.43-9.92,0-19.85-.8-29.78-.8V302.57c0-3.53-.05-7.07,0-10.6a7.67,7.67,0,0,1,.16-2.53,1.88,1.88,0,0,1-.16-.73V231.89c13.21,0,26.41.19,39.62.16C303.51,232.05,311.51,231.67,314.87,232.79Z";

let _id = 0;

const BrandPattern = ({
  className = "",
  tile = 130,
  scale = 0.62,
  opacity = 0.05,
  color = "#ffffff",
  fade = "radial-gradient(ellipse 80% 80% at 50% 50%, black 0%, transparent 75%)",
}) => {
  const id = `kpat-${_id++}`;
  return (
    <div
      aria-hidden="true"
      className={`absolute inset-0 pointer-events-none ${className}`}
      style={{ opacity, maskImage: fade, WebkitMaskImage: fade }}
    >
      <svg className="w-full h-full">
        <defs>
          <pattern
            id={id}
            width={tile}
            height={tile}
            patternUnits="userSpaceOnUse"
          >
            {/* El path del isotipo ocupa ~x:262-408, y:230-360.
                Lo llevamos al origen y lo escalamos para que entre en el tile. */}
            <path
              transform={`scale(${scale}) translate(-258 -226)`}
              fill={color}
              d={ISOTIPO_PATH}
            />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill={`url(#${id})`} />
      </svg>
    </div>
  );
};

export default BrandPattern;
