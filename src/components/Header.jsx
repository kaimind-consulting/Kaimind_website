import { motion, AnimatePresence } from "framer-motion"
import { FiGithub, FiInstagram, FiLinkedin, FiMenu, FiX} from "react-icons/fi"
import { useState } from "react"


const Header = () => {
  // Desplegable del Menu
  const [isOpen, setIsOpen] = useState(false);
  const toggleMenu = () => setIsOpen(!isOpen);

  //Estado para chequear si el formulario esta abierto o no
  const [ contactFormOpen, setContactFormOpen ] = useState(false);

  const openContactForm = () => setContactFormOpen(true);
  const closeContactForm = () => setContactFormOpen(false);

  return (
    <header className="absolute w-full z-50 transition-all duration-300">

        <div className="container mx-auto px-4 sm:px-6 
        lg:px-8 flex items-center justify-between h-16 
        md:h-20">

            {/* logo/Name */}
            <motion.div
            initial={{ opacity: 0, x: -100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{
                type: "spring",
                stiffness: 100,
                damping: 25,
                delay: 0.3,
                duration: 1.2,
            }}
            className="flex items-center">

                <div className="h-10 w-10 rounded-xl 
                bg-gradient-to-r from-gray-500 to-gray-100 
                flex items-center justify-center text-blue-600 
                font-bold text-xl mr-3">
                    K
                </div>

                <span className="text-xl font-bold bg-gradient-to-r 
                from-gray-300 to-gray-100 bg-clip-text text-transparent">
                    Kaimind
                </span>

            </motion.div>

            {/* Barra de navegacion para escritorio*/}
            <nav className="lg:flex hidden space-x-8 font-bold">
                {["Inicio", "Nosotros", "Proyectos", "Experiencia", "Siguenos"].map((item, 
                index) => ( 
                    <motion.a
                    key={item}
                    initial={{ opacity:0 , y: -20 }}
                    animate={{ opacity:1 , y: 0 }}
                    transition={{
                        type: "spring",
                        stiffness: 100,
                        damping: 20,
                        delay: 0.7 + index * 0.2,
                    }}
                    className="relative text-white-800 dark:text-white-200 
                    hover:white-600 dark:hover:text-white-400 font-medium
                    transition-colors duration-300 group"
                    href="#">
                        {item}
                        <span className="absolute bottom-0 left-0 w-0 h-0.5
                        bg-blue-600 group-hover:w-full transition-all 
                        duration-300"></span>
                    </motion.a>
                ))}
            </nav>

            {/*Redes Sociales iconos para escritorio*/}
            <div className="md:flex hidden items-center space-x-4">

                <motion.a 
                initial={{ opacity:0, scale: 0.5}}
                animate={{ opacity:1, scale: 1}}
                transition={{
                    delay:1.3,
                    duration:0.8
                }}
                
                className="text-white-700 dark:text-white-900 hover:text-blue-600
                dark:hover:text-blue-400 transition-colors duration-300" href="https://github.com/kaimind-consulting">
                    <FiGithub className="w-5 h-5"/>
                    
                </motion.a>

                <motion.a 
                initial={{ opacity:0, scale: 0.5}}
                animate={{ opacity:1, scale: 1}}
                transition={{
                    delay:1.3,
                    duration:0.8
                }}
                
                className="text-white-700 dark:text-white-900 hover:text-blue-600
                dark:hover:text-blue-400 transition-colors duration-300" href="https://www.instagram.com/kaimind.data?igsh=MXZsaDE0YTdxbG9pZA==">
                    <FiInstagram className="w-5 h-5"/>
                    
                </motion.a>

                <motion.a 
                initial={{ opacity:0, scale: 0.5}}
                animate={{ opacity:1, scale: 1}}
                transition={{
                    delay:1.3,
                    duration:0.8
                }}
                
                className="text-white-700 dark:text-white-900 hover:text-blue-600
                dark:hover:text-blue-400 transition-colors duration-300" href="https://www.linkedin.com/company/kaimind/posts/?feedView=all">
                    <FiLinkedin className="w-5 h-5"/>
                    
                </motion.a>

                {/* Boton de contratame*/}
                <motion.button
                onClick={openContactForm}
                initial= {{ opacity: 0, scale: 0.8 }}
                animate= {{ opacity: 1, scale: 1 }}
                transition={{
                    delay: 1.6,
                    duration: 0.8,
                    type: "spring",
                    stiffness: 100,
                    damping: 15,
                }}
                className="ml-4 px-4 py-2 rounded-xl bg-gradient-to-r from-gray-400
                to-gray-100 text-blue-700 font-bold hover:from-blue-700
                hover:to-blue-900 hover:text-white transition-all duration-500">
                    Contactanos!
                </motion.button>
            </div>

            {/* Boton del Menu para moviles*/}
            <div className="md:hidden flex items-center">
                <motion.button
                whileTap={{scale: 0.7}}
                onClick={toggleMenu}
                className="text-gray-300">

                    { isOpen ? <FiX  className="h-6 w-6" /> : <FiMenu className="h-6 w-6"/>}

                </motion.button>
            </div>
        </div>

        {/* Menu para moviles*/}
        <motion.div
        initial= {{ opacity: 0, height: 0}}
        animate= {{
            opacity: isOpen ? 1:0,
            height: isOpen ? "auto": 0,
         }}
         transition={{ duration: 0.5}}
        className="md:hidden overflow-hidden bg-gray-900 dark:bg-gray-300 shadow-lg
        px-4 py-5 space-y-5">

            <nav className="flex flex-col space-y-3">
                {["Inicio", "Nosotros", "Proyectos", "Experiencia", "Siguenos"].map((item) =>
                (

                    <a onClick={toggleMenu} className="text-white-900 font-medium py-2 font-bold"
                    key={item} href="#">
                        {item}
                    </a>

                ))}
            </nav>

            <div className="pt-4 border-t border-white-200
            dark:border-white-700">
                
                <div className="flex space-x-5">
                    <motion.a href="https://github.com/kaimind-consulting">
                        <FiGithub className="h-5 w-5 text-white"/>
                    </motion.a>

                    <motion.a href="https://www.instagram.com/kaimind.data?igsh=MXZsaDE0YTdxbG9pZA==">
                        <FiInstagram className="h-5 w-5 text-white"/>
                    </motion.a>

                    <motion.a href="https://www.linkedin.com/company/kaimind/posts/?feedView=all">
                        <FiLinkedin className="h-5 w-5 text-white"/>
                    </motion.a>
                </div>
                

                <button 
                onClick={() =>{
                    toggleMenu()
                    openContactForm()
                }}
                className="mt-4 block w-full px-4 py-2 rounded-lg
                bg-gradient-to-r from-gray-400 to-gray-100 text-blue-700 font-bold
                hover:to-blue-900 hover:text-white transition-all duration-500">
                    Contactanos
                </button>
            </div>
        </motion.div>

        {/* Formulario para que nos contacten*/}
        <AnimatePresence>
            {contactFormOpen && (
                <motion.div
                initial={{ opacity: 0}}
                animate={{ opacity: 1}}
                exit={{ opacity: 0}}
                transition={{ duration: 0.5}}
                className="fixed inset-0 bg-black/50 background-blur-sm z-50 flex
                items-center justify-center p-4"
                >

                    <motion.div
                        initial={{ scale: 0.8, opacity: 0, y: 30}}
                        animate={{ scale: 1, opacity: 1, y: 0}}
                        exit={{ scale: 0.8, opacity: 0, y: 30}}
                        transition={{
                            type: "spring",
                            damping: 30,
                            stiffness: 200,
                            duration: 0.8
                        }}
                        className="bg-gray-900 dark:bg-gray-300 rounded-xl
                        shadow-lg w-full max-w-md p-6"
                    >
                        <div className="flex justify-between items-center
                        mb-4">
                            <h1 className="text-2xl font-bold
                            text-gray-100">
                                ¡Contactanos!
                            </h1>

                            <button onClick={closeContactForm}>
                                <FiX className="w-5 h-5 text-gray-100 
                                font-extrabold"/>

                            </button>
                        </div>

                        {/* Formulario de contacto*/}
                        <form className="space-y-4">
                            <div>
                                <label htmlFor="name" className="block
                                text-sm font-medium text-gray-300 mb-1">
                                    Nombre
                                </label>
                                <input 
                                    type="text"
                                    id="name"
                                    placeholder="Tu Nombre"
                                    className="w-full px-4 py-2 border 
                                    border-gray-600 rounded-lg focus:ring-2
                                    focus:ring-violet-500
                                    focus:border-violet-500 bg-gray-700"
                                />
                            </div>

                            <div>
                                <label htmlFor="email" className="block
                                text-sm font-medium text-gray-300 mb-1">
                                    Email
                                </label>
                                <input 
                                    type="email"
                                    id="email"
                                    placeholder="Tu correo electronico"
                                    className="w-full px-4 py-2 border 
                                    border-gray-600 rounded-lg focus:ring-2
                                    focus:ring-violet-500
                                    focus:border-violet-500 bg-gray-700"
                                />
                            </div>

                            <div>
                                <label htmlFor="message" className="block
                                text-sm font-medium text-gray-300 mb-1">
                                    Mensaje
                                </label>
                                <textarea
                                    rows="4"
                                    id="message"
                                    placeholder="¿Como podemos ayudarte?"
                                    className="w-full px-4 py-2 border 
                                    border-gray-600 rounded-lg focus:ring-2
                                    focus:ring-violet-500
                                    focus:border-violet-500 bg-gray-700"
                                />
                            </div>

                            <motion.button
                                type="submit"
                                whileHover={{ scale: 1.03 }}
                                whileTap={{ scale: 0.97 }}
                                className="w-full px-4 py-2
                                bg-gradient-to-r from-violet-600 to-violet-400
                                hover:from-violet-700 hover:to-purple-700
                                transition-all duration-300 rounded-lg shadow-md
                                hover:shadow-lg hover:shadow-violet-600/50">
                                Enviar Mensaje
                            </motion.button>
                        </form>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    </header>
  )
}

export default Header