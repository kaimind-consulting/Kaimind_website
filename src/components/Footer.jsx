import { FiGithub, FiInstagram, FiLinkedin} from "react-icons/fi";
import Spline from "@splinetool/react-spline";


const Footer = () => {
  return (
    <footer className="relative text-white py-16 px-6 mt-40 
    bg-gradient-to-neutral from-neutral-700 to-neutral-600">

        <div className="max-w-6xl mx-auto">
            <div className="flex justify-between items-center">

                {/* Logo y descripcion */}
                <h2 className="text-3xl font-bold bg-white 
                bg-clip-text text-transparent">
                    Kaimind
                </h2>

                {/* Scroll links */}
                <div>
                    <h3 className="text-xl font-semibold mb-4
                    text-white">
                        Nuestra Redes Sociales
                    </h3>
                    <div className="flex space-x-4">
                        <a className="text-white hover:text-blue-600
                        dark:hover:text-blue-400 transition-colors duration-300" href="https://github.com/kaimind-consulting">
                            <FiGithub  className="w-5 h-5"/>
                        </a>

                        <a className="text-white hover:text-blue-600
                        dark:hover:text-blue-400 transition-colors duration-300" href="https://www.instagram.com/kaimind.data?igsh=MXZsaDE0YTdxbG9pZA==">
                            <FiInstagram  className="w-5 h-5"/>
                        </a>

                        <a className="text-white hover:text-blue-600
                        dark:hover:text-blue-400 transition-colors duration-300" href="https://www.linkedin.com/company/kaimind/posts/?feedView=all">
                            <FiLinkedin  className="w-5 h-5"/>
                        </a>
                    </div>
                </div>
            </div>

            <div className="border-t border-gray-700 mt-12 pt-8 flex
            flex-col md:flex-row justify-between items-center">

                <p className="text-white twxt-sm">
                    @ 2025 Kaimind. Todos los derechos reservados.
                </p>

                <div className="flex space-x-6 mt-4 md:mt-0">
                    <a href="#" className="text-white text-sm transition-colors">
                        Politica de Privacidad
                    </a>
                    <a href="#" className="text-white text-sm transition-colors">
                        Terminos de servicio
                    </a>
                    <a href="#" className="text-white text-sm transition-colors">
                        Politica de Cookies
                    </a>
                </div>

            </div>
        </div>
    </footer>
  )
}

export default Footer