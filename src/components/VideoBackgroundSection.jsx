import { useRef, useEffect, useState } from 'react';
import { motion } from "framer-motion";
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { FaArrowLeft, FaArrowRight, FaExternalLinkAlt } from 'react-icons/fa';
import BlackholeVid from '../assets/Vídeo_Generado_en_HD.mp4';

const VideoSection = () => {
  const sectionRef = useRef(null);
  const videoRef = useRef(null);
  const contentRef = useRef(null);
  const carouselRef = useRef(null);
  const [scrollPosition, setScrollPosition] = useState(0);
  const [maxScroll, setMaxScroll] = useState(0);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true);

  // Configuración de tamaños
  const cardSizes = {
    mobile: "w-[280px]",
    tablet: "md:w-[350px]",
    desktop: "lg:w-[390px]",
    gap: "gap-2 md:gap-4"
  };

  // Datos de los paneles con colores grises
  const panels = [
    {
      id: 1,
      title: "CV Match",
      description: "Sube tu CV, pega la vacante o ingresa el cargo — la IA analiza tu compatibilidad, detecta keywords ATS y te dice exactamente qué cambiar.",
      buttonText: "Prueba tu compatibilidad",
      buttonLink: "https://cvmatch.kaimindconsulting.com",
      tag: "New",
      icon: "",
      target: "_blank"
    },
    {
      id: 2,
      title: "CV Match",
      description: "Sube tu CV, pega la vacante o ingresa el cargo — la IA analiza tu compatibilidad, detecta keywords ATS y te dice exactamente qué cambiar.",
      buttonText: "Prueba tu compatibilidad",
      buttonLink: "https://cvmatch.kaimindconsulting.com",
      tag: "New",
      icon: "",
      target: "_blank"
    },
    {
      id: 3,
      title: "CV Match",
      description: "Sube tu CV, pega la vacante o ingresa el cargo — la IA analiza tu compatibilidad, detecta keywords ATS y te dice exactamente qué cambiar.",
      buttonText: "Prueba tu compatibilidad",
      buttonLink: "https://cvmatch.kaimindconsulting.com",
      tag: "New",
      icon: "",
      target: "_blank"
    },
    {
      id: 4,
      title: "CV Match",
      description: "Sube tu CV, pega la vacante o ingresa el cargo — la IA analiza tu compatibilidad, detecta keywords ATS y te dice exactamente qué cambiar.",
      buttonText: "Prueba tu compatibilidad",
      buttonLink: "https://cvmatch.kaimindconsulting.com",
      tag: "New",
      icon: "",
      target: "_blank"
    }
  ];

  useEffect(() => {
    gsap.fromTo(
      contentRef.current,
      {
        y: 50,
        opacity: 0,
      },
      {
        y: 0,
        opacity: 1,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          toggleActions: "play none none reverse"
        }
      }
    );

    gsap.to(sectionRef.current, {
      backgroundPosition: "50% 100%",
      ease: "none",
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top bottom",
        end: "bottom top",
        scrub: 1,
      }
    });

    const calculateMaxScroll = () => {
      if (carouselRef.current) {
        const maxScrollValue = carouselRef.current.scrollWidth - carouselRef.current.clientWidth;
        setMaxScroll(maxScrollValue);
        updateArrows();
      }
    };

    calculateMaxScroll();
    window.addEventListener('resize', calculateMaxScroll);
    
    return () => window.removeEventListener('resize', calculateMaxScroll);
  }, []);

  const handleScroll = () => {
    if (carouselRef.current) {
      const newPosition = carouselRef.current.scrollLeft;
      setScrollPosition(newPosition);
      updateArrows();
    }
  };

  const updateArrows = () => {
    if (carouselRef.current) {
      const currentScroll = carouselRef.current.scrollLeft;
      const maxScrollValue = carouselRef.current.scrollWidth - carouselRef.current.clientWidth;
      
      setShowLeftArrow(currentScroll > 10);
      setShowRightArrow(currentScroll < maxScrollValue - 10);
    }
  };

  const scroll = (direction) => {
    if (carouselRef.current) {
      const scrollAmount = carouselRef.current.clientWidth * 0.8;
      const newScrollLeft = direction === 'left' 
        ? carouselRef.current.scrollLeft - scrollAmount 
        : carouselRef.current.scrollLeft + scrollAmount;
      
      carouselRef.current.scrollTo({
        left: newScrollLeft,
        behavior: 'smooth'
      });
    }
  };

  const handleButtonClick = (link, target) => {
    if (target === '_blank') {
      window.open(link, '_blank', 'noopener,noreferrer');
    } else if (link.startsWith('/')) {
      window.location.href = link;
    } else {
      window.location.href = link;
    }
  };

  return (
    <section 
      ref={sectionRef}
      className="relative w-full min-h-screen overflow-hidden"
    >
      {/* Video de fondo */}
      <div className="absolute inset-0 w-full h-full">
        <video
          ref={videoRef}
          autoPlay
          loop
          muted
          playsInline
          className="absolute top-1/2 left-1/2 min-w-full min-h-full w-auto h-auto object-cover transform -translate-x-1/2 -translate-y-1/2"
        >
          <source src={BlackholeVid} type="video/mp4" />
          <div className="absolute inset-0 bg-gradient-to-br from-purple-900 to-blue-900"></div>
        </video>
        
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/80"></div>
      </div>

      {/* Difuminado superior */}
      <div className="absolute inset-x-0 top-0 z-10 h-64 bg-gradient-to-b from-[#4CAE7E] via-black/0 pointer-events-none"></div>

      {/* Contenido */}
      <div className="relative z-10 h-full flex flex-col items-center justify-start px-4 pt-20 md:pt-24 lg:pt-32">
        <motion.div
          ref={contentRef}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          viewport={{ once: true }}
          className="text-center text-white max-w-4xl mx-auto mb-12"
        >
          <h2 className="text-4xl md:text-6xl lg:text-7xl mb-6"
              style={{ fontFamily: 'Caffie Lofie, sans-serif', fontStyle: 'italic' }}>
            Visualiza el <span className="text-[#4CAE7E]">Poder</span> de tus Datos
          </h2>
        </motion.div>

        {/* Carrusel Horizontal */}
        <div className="relative w-full max-w-7xl mx-auto px-4 md:px-8">
          {/* Flechas de navegación */}
          {showLeftArrow && (
            <button
              onClick={() => scroll('left')}
              className="absolute left-0 top-1/2 -translate-y-1/2 z-20 bg-black/50 hover:bg-black/70 text-white p-3 rounded-full backdrop-blur-sm transition-all duration-300 hover:scale-110"
              style={{ 
                left: window.innerWidth < 768 ? '-10px' : '-25px',
                transform: 'translateY(-50%)'
                }}
            >
              <FaArrowLeft size={window.innerWidth < 768 ? 20 : 24} />
            </button>
          )}

          {showRightArrow && (
            <button
              onClick={() => scroll('right')}
              className="absolute right-0 top-1/2 -translate-y-1/2 z-20 bg-black/50 hover:bg-black/70 text-white p-3 rounded-full backdrop-blur-sm transition-all duration-300 hover:scale-110"
              style={{ 
                right: window.innerWidth < 768 ? '-10px' : '-25px',
                transform: 'translateY(-50%)'
                }}
            >
              <FaArrowRight size={window.innerWidth < 768 ? 20 : 24} />
            </button>
          )}

          {/* Contenedor del carrusel */}
          <div
            ref={carouselRef}
            onScroll={handleScroll}
            className={`flex overflow-x-auto scrollbar-hide ${cardSizes.gap} pb-8 pt-4 px-2`}
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {panels.map((panel) => (
              <motion.div
                key={panel.id}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: panel.id * 0.1 }}
                viewport={{ once: true }}
                className={`flex-shrink-0 ${cardSizes.mobile} ${cardSizes.tablet} ${cardSizes.desktop} bg-white/10 backdrop-blur-md rounded-2xl overflow-hidden hover:transform hover:scale-105 transition-all duration-300 border border-white/20`}
              >
                <div className="p-6 md:p-8">
                  {/* Tag con color gris */}
                  {panel.tag && (
                    <span className="inline-block px-3 py-1 text-xs font-semibold bg-[#4CAE7E] text-white rounded-full mb-2">
                      {panel.tag}
                    </span>
                  )}
                  
                  {/* Icono y título */}
                  <div className="flex items-center gap-3 mb-3" 
                       style={{ fontFamily: 'Caffie Lofie, sans-serif', fontStyle: 'italic' }}>
                    {panel.icon && (
                      <span className="text-1xl">{panel.icon}</span>
                    )}
                    <h3 className="text-xl md:text-2xl font-bold text-white line-clamp-2">
                      {panel.title}
                    </h3>
                  </div>
                  
                  {/* Descripción */}
                  <p className="text-gray-300 text-sm md:text-base mb-6 line-clamp-3 font-poppins font-medium tracking-wide">
                    {panel.description}
                  </p>
                  
                  {/* Botón con link */}
                  <button 
                    onClick={() => handleButtonClick(panel.buttonLink, panel.target)}
                    className="w-full px-4 py-2 bg-[#635DC2] hover:bg-[#3d8e66] text-white rounded-lg font-semibold transition-all duration-300 flex items-center justify-center gap-2 group"
                  >
                    {panel.buttonText}
                    {panel.target === '_blank' && (
                      <FaExternalLinkAlt size={14} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                    )}
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Indicadores */}
        <div className="mt-2 flex gap-1">
          {panels.map((_, index) => (
            <div
              key={index}
              className={`h-1 rounded-full transition-all duration-300 cursor-pointer ${
                Math.abs(scrollPosition / (maxScroll || 1) * panels.length) >= index &&
                Math.abs(scrollPosition / (maxScroll || 1) * panels.length) < index + 1
                  ? 'w-8 bg-[#4CAE7E]'
                  : 'w-4 bg-white/30 hover:bg-white/50'
              }`}
              onClick={() => {
                if (carouselRef.current) {
                  const cardWidth = carouselRef.current.children[0]?.offsetWidth || 0;
                  const gap = 24;
                  carouselRef.current.scrollTo({
                    left: index * (cardWidth + gap),
                    behavior: 'smooth'
                  });
                }
              }}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default VideoSection;