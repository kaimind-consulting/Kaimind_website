import { motion } from "framer-motion";
import Spline from "@splinetool/react-spline";

const HeroSection = () => {
  return (
    <section className="relative h-screen w-full overflow-hidden bg-gradient-to-b from-black to-neutral-900">


      <div className="absolute inset-0 z-0 lg:left-[0%] lg:w-[110%] w-full h-full">
        <Spline className="w-full h-full"
        scene="https://prod.spline.design/LnpnD9BbEdIrt3IV/scene.splinecode" 
        />

      </div>
       
      {/* Seccion Izquierda diseño 3D */}
      <div className="absolute inset-0 z-0 lg:left-[40%] lg:w-[70%] w-full h-full">
        <Spline 
          className="w-full h-full"
          scene="https://prod.spline.design/GqHF8DhByevkxM9B/scene.splinecode" 
        />
        <div className="absolute inset-0 bg-black/40 lg:hidden pointer-events-none"></div>
      </div>

      {/* Seccion Derecha */}
      <div className="relative z-100 h-full max-w-7xl mx-auto px-6 md:px-12 lg:px-24 flex flex-col justify-center lg:justify-center pointer-events-none">
        
        <div className="w-full lg:w-1/2 flex flex-col gap-6 pointer-events-auto mt-20 lg:mt-0">
          
          <motion.h1
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              type: "spring",
              damping: 25,
              stiffness: 100,
              delay: 0.5, 
              duration: 1
            }}
            className="text-4xl md:text-6xl lg:text-7xl font-bold text-white leading-tight"
          >
            Construimos El Futuro <br className="hidden md:block" />
            <span className="text-blue-500">Sobre Datos</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              type: "spring",
              damping: 25,
              stiffness: 100,
              delay: 0.8,
              duration: 1
            }}
            className="text-base md:text-0.5lg lg:text-0.5xl text-gray-300 max-w-xl leading-relaxed font-bold"
          >
            Somos especialistas en transformar la complejidad operativa en 
            soluciones digitales claras e intuitivas. Diseñamos e implementamos 
            ecosistemas de software a medida que no solo gestionan tus procesos, 
            sino que los optimizan. Nuestro valor diferencial radica en convertir 
            tus datos en activos estratégicos mediante: consultoría analítica, 
            automatizaciones de flujos de datos(pipelines) y modelos de Machine Learning o 
            Deep Learning, te ayudamos a entender qué está pasando en tu empresa y 
            a predecir lo que pasará mañana.
          </motion.p>
        </div>
      </div>
      
    </section>
  );
};

export default HeroSection;