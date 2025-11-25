import { useRef, useEffect, useState } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

// LOS PERFILES
const profiles = [
    {
        name: "Jeremy",
        surname: "Uzcategui",
        image: "images/person.png",
        description: (
            <>
                Mi enfoque profesional combina la rigurosidad matemática con la 
                creatividad de la programación. Actualmente, estoy finalizando mi 
                licenciatura en Estadística Pura, enfrentando el desafío final de 
                la tesis con la misma tenacidad con la que abordo los problemas de 
                negocio complejos.<br className="hidden md:block" /> 
                Como fundador, mi objetivo es transformar datos abstractos en 
                soluciones tangibles y estrategias claras. Me apasiona encontrar 
                patrones donde otros solo ven ruido y disfruto el proceso de 
                convertir líneas de código en resultados de valor.
                Más allá de los datos: Creo firmemente en el trabajo con propósito.<br className="hidden md:block" /> 
                Mi motivación a largo plazo no es solo el crecimiento empresarial,
                sino construir un legado que me permita financiar mi gran sueño
                personal: un refugio para animales. Esa es la energía que imprimo
                en cada proyecto.
            </>
        )
    },
    {
        name: "Daniel",
        surname: "Camacho",
        image: "images/person.png",
        description: (
            <>
                Pon tu descripción aqui Daniel
            </>
        )
    },
    {
        name: "Roberto",
        surname: "Schaefer",
        image: "images/person.png", // CAMBIA ESTO por la imagen de tu socio
        description: (
            <>
                Pon tu descripción aqui Roberto
            </>
        )
    }

]

const AboutSection = () => {
    const sectionRef = useRef(null)
    const titleRef = useRef(null)
    const introRef = useRef(null)
    const starsRef = useRef([])
    
    // Referencias para los elementos que van a cambiar dinámicamente
    const imageRef = useRef(null)
    const textRef = useRef(null)

    // Estado para controlar qué perfil se muestra
    const [currentIndex, setCurrentIndex] = useState(0)
    const [isAnimating, setIsAnimating] = useState(false)

    useEffect(() => {
        gsap.registerPlugin(ScrollTrigger)

        // ANIMACIONES DE ENTRADA
        
        // Titulo
        gsap.fromTo(titleRef.current,
            { y: 50, opacity: 0 },
            {
                y: 0, opacity: 1, duration: 0.8,
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top 60%",
                    toggleActions: "play none none reverse",
                }
            }
        )

        // Contenedor principal
        gsap.fromTo(introRef.current,
            { y: 100, opacity: 0 },
            {
                y: 0, opacity: 1, duration: 1.5,
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top 50%",
                    toggleActions: "play none none reverse",
                }
            }
        )

        // Estrellas
        starsRef.current.forEach((star, index) => {
            const direction = index % 2 === 0 ? 1: -1
            const speed = 0.5 + Math.random() * 0.5
            gsap.to(star, {
                x: `${direction * (100 + index * 20)}`,
                y: `${direction * -50 - index * 10}`,
                rotation: direction * 360,
                ease: "none",
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top bottom",
                    end: "bottom top",
                    scrub: speed,
                }
            })
        })

        return () => {
            ScrollTrigger.getAll().forEach((trigger) => {
                if (trigger.vars.trigger === sectionRef.current) trigger.kill()
            }) 
        }
    }, [])

    const addToStars = (el) => {
        if(el && !starsRef.current.includes(el)) starsRef.current.push(el)
    }

    // FUNCIÓN PARA CAMBIAR DE PERFIL
    const changeProfile = (direction) => {
        if (isAnimating) return

        setIsAnimating(true)
        
        let nextIndex
        if (direction === 'next') {
            nextIndex = (currentIndex + 1) % profiles.length
        } else {
            nextIndex = (currentIndex - 1 + profiles.length) % profiles.length
        }

        const rotateTo = direction === 'next' ? 360 : -360
        const rotateFrom = direction === 'next' ? -360 : 360

        // ANIMACIÓN DE SALIDA
        const tl = gsap.timeline({
            onComplete: () => {
                setIsAnimating(false)
            }
        })

        tl.to(imageRef.current, {
            rotation: rotateTo,
            scale: 0,
            opacity: 0,
            duration: 0.5,
            ease: "back.in(1.7)"
        })
        .to(textRef.current, {
            opacity: 0,
            x: direction === 'next' ? -50 : 50,
            duration: 0.3
        }, "<")

        // CAMBIO DE DATOS
        .call(() => {
            setCurrentIndex(nextIndex)
        })

        // SETEO INICIAL DEL NUEVO ESTADO
        .set(imageRef.current, { rotation: rotateFrom, scale: 0, opacity: 0 })
        .set(textRef.current, { x: direction === 'next' ? 50 : -50, opacity: 0 })

        // ANIMACIÓN DE ENTRADA
        .to(imageRef.current, {
            rotation: 0,
            scale: 1,
            opacity: 1,
            duration: 0.5,
            ease: "back.out(1.7)"
        })
        .to(textRef.current, {
            opacity: 1,
            x: 0,
            duration: 0.5
        }, "<") 
    }

  return (
    <section ref={sectionRef} className="min-h-screen relative overflow-hidden 
    bg-gradient-to-b from-neutral-900 to-neutral-800 flex flex-col items-center 
    py-10 md:py-0 md:justify-center">

        {/* Fondo de Estrellas */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {[...Array(10)].map((_, i) => ( 
              <div
                ref={addToStars}
                key={`star-${i}`}
                className="absolute rounded-full"
                style={{
                    width: `${10 + i * 3}px`,
                    height:`${10 + i * 3}px`,
                    backgroundColor: "white",
                    opacity: 0.2 + Math.random() * 0.4,
                    top: `${ Math.random()*100 }%`,
                    left: `${ Math.random()*100 }%`,
                }}
              />
            ))}
        </div>

        <div className="container mx-auto px-6 z-10 flex flex-col items-center w-full">
            
            {/* TÍTULO */}
            <div className="mb-8 md:mb-16 mt-10 md:mt-0">
                <h1 ref={titleRef} className="text-4xl md:text-5xl font-bold 
                text-center text-white opacity-0">
                    Acerca de <span className="text-blue-500">Nosotros</span>
                </h1>
            </div>

            <div ref={introRef} className="flex flex-col-reverse md:flex-row items-center 
            justify-between w-full max-w-6xl opacity-0">
                
                {/* BLOQUE DE TEXTO (Nombre y Descripción) */}
                <div ref={textRef} className="flex flex-col text-center md:text-left md:w-1/2 mt-8 md:mt-0">
                    <h2 className="text-3xl md:text-4xl font-bold text-white mb-8 md:mb-12 -mt-4 text-center md:text-left">
                        {profiles[currentIndex].name} <span className="text-blue-500">{profiles[currentIndex].surname}</span>
                    </h2>
                    <p className="text-sm md:text-lg text-gray-300 leading-relaxed md:pr-10 
                    text-justify md:text-left font-bold">
                       {profiles[currentIndex].description}
                    </p>
                </div>

                {/* BLOQUE DE IMAGEN CON FLECHAS */}
                <div className="md:w-1/2 flex items-center justify-center relative">
                    
                    {/* Flecha Izquierda */}
                    <button 
                        onClick={() => changeProfile('prev')}
                        className="absolute left-0 md:left-10 z-20 p-2 rounded-full 
                        bg-white/10 hover:bg-blue-500/80 transition-all text-white backdrop-blur-sm"
                    >
                         <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor" className="w-6 h-6 md:w-8 md:h-8">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                        </svg>
                    </button>

                    {/* Imagen que gira */}
                    <img 
                        ref={imageRef}
                        className="h-[18rem] md:h-[35rem] object-contain mix-blend-lighten 
                        brightness-0 drop-shadow-2xl transition-transform will-change-transform" 
                        src={profiles[currentIndex].image}
                        alt={`${profiles[currentIndex].name} profile`} 
                    />

                    {/* Flecha Derecha */}
                    <button 
                        onClick={() => changeProfile('next')}
                        className="absolute right-0 md:right-10 z-20 p-2 rounded-full 
                        bg-white/10 hover:bg-blue-500/80 transition-all text-white backdrop-blur-sm"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor" className="w-6 h-6 md:w-8 md:h-8">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                        </svg>
                    </button>

                </div>

            </div>
        </div>
    </section>
  )
}

export default AboutSection