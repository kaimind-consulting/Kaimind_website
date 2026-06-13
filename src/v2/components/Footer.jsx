import { FiGithub, FiInstagram, FiLinkedin, FiMail } from "react-icons/fi";
import isotipo from "../assets/isotipo-white.svg";
import FloatingCubes from "./FloatingCubes";
import BrandPattern from "./BrandPattern";
import CornerGlow from "./CornerGlow";

const SOCIALS = [
  { icon: FiGithub, href: "https://github.com/kaimind-consulting", label: "GitHub" },
  { icon: FiInstagram, href: "https://www.instagram.com/kaimind.data?igsh=MXZsaDE0YTdxbG9pZA==", label: "Instagram" },
  { icon: FiLinkedin, href: "https://www.linkedin.com/company/kaimind/posts/?feedView=all", label: "LinkedIn" },
];

const Footer = ({ onContact }) => {
  return (
    <footer className="relative overflow-hidden bg-black border-t border-white/10">
      <BrandPattern tile={150} opacity={0.05} fade="linear-gradient(to bottom, transparent, black 55%)" />
      {/* Acento del gradient de marca en la esquina inferior derecha (cierre) */}
      <CornerGlow corner="bottom-right" opacity={0.4} />
      <FloatingCubes />
      <div className="relative z-10 max-w-6xl mx-auto px-6 py-16">
        <div className="flex flex-col md:flex-row justify-between gap-10">
          {/* Marca */}
          <div>
            <a href="#inicio" className="flex items-center gap-3 mb-4">
              <span className="grid place-items-center w-10 h-10 rounded-[10px] bg-kgreen">
                <img src={isotipo} alt="" className="w-6 h-6" />
              </span>
              <span className="leading-none">
                <span className="block text-white text-xl font-display tracking-wide">KAIMIND</span>
                <span className="block font-code text-[0.6rem] tracking-[0.45em] text-kturquoise mt-1">
                  DATA INSIGHT_
                </span>
              </span>
            </a>
            <p className="font-code text-sm text-kturquoise">
              "Transformamos datos en progreso."
            </p>
          </div>

          {/* Contacto + redes */}
          <div className="flex flex-col gap-4">
            <h3 className="font-poppins font-semibold text-white">Conecta con nosotros</h3>
            <a
              href="mailto:kaimindconsulting@gmail.com"
              className="flex items-center gap-2 text-white/70 hover:text-kturquoise transition-colors text-sm font-poppins"
            >
              <FiMail className="w-4 h-4" />
              kaimindconsulting@gmail.com
            </a>
            <div className="flex gap-4">
              {SOCIALS.map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="p-2.5 rounded-lg border border-white/10 text-white/80 hover:text-kgreen hover:border-kgreen/60 transition-all duration-300"
                >
                  <Icon className="w-5 h-5" />
                </a>
              ))}
            </div>
            <button
              onClick={onContact}
              className="self-start px-6 py-2.5 rounded-xl bg-kgreen text-black font-poppins font-semibold text-sm hover:bg-kturquoise transition-colors duration-300"
            >
              Contáctanos
            </button>
          </div>
        </div>

        <div className="border-t border-white/10 mt-12 pt-7 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-white/45 text-sm font-poppins">
            © {new Date().getFullYear()} Kaimind. Todos los derechos reservados.
          </p>
          <div className="flex gap-6">
            <a href="#" className="text-white/45 hover:text-white/80 text-sm font-poppins transition-colors">
              Política de Privacidad
            </a>
            <a href="#" className="text-white/45 hover:text-white/80 text-sm font-poppins transition-colors">
              Términos de servicio
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
