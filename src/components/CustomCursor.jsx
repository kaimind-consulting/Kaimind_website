import { useRef, useEffect } from "react";
import { gsap } from "gsap";


const CustomCursor = () => {
    // Referencias para los elementos del cursor
    const cursorRef = useRef(null);
    const cursorBorderRef = useRef(null);

    // Esconder el cursor en telefonos
    const isMobile = typeof window !== "undefined" && window.matchMedia("(max-width: 768px)").matches

    if (isMobile) {
        return null
    }

    useEffect(() => {
        //Obtener los elementos del cursor
        const cursor = cursorRef.current
        const cursorBorder = cursorBorderRef.current

        //Posicion inicial fuera de pantalla
        gsap.set([cursor, cursorBorder], {
            xPercent: -50,
            yPercent: -50,
        })

        // Variables para las posiciones del cursor con diferentes velocidades
        const xTo = gsap.quickTo(cursor, "x", {
        duration: 0.2, ease: "power3.out"})

        const yTo = gsap.quickTo(cursor, "y", {
        duration: 0.2, ease: "power3.out"})

        const xToBorder = gsap.quickTo(cursorBorder,
        "x", { duration: 0.5, ease: "power.out"})

        const yToBorder = gsap.quickTo(cursorBorder,
        "y", { duration: 0.5, ease: "power3.out"})

        //Movimiento del mouse
        const handlemouseMove = (e) => {
            xTo(e.clientX)
            yTo(e.clientY)
            xToBorder(e.clientX)
            yToBorder(e.clientY)
        }

        window.addEventListener("mousemove",
            handlemouseMove
        )

        //Animacion del click
        document.addEventListener("mousedown", () => {
            gsap.to([cursor, cursorBorder], {
                scale: 0.6,
                duration: 0.2
            })
        })

        document.addEventListener("mouseup", () => {
            gsap.to([cursor, cursorBorder], {
                scale: 1,
                duration: 0.2
            })
        })

    })

  return (
    <>
        {/* Punto del cursor principal */}
        <dev
            ref={cursorRef}
            className="fixed top-0 left-0 w-[20px]
            h-[20px] bg-white rounded-full pointer-events-none
            z-[999] mix-blend-difference"
        />

        <div
            ref={cursorBorderRef}
            className="fixed top-0 left-0 w-[40px]
            h-[40px] border rounded-full border-white
            pointer-events-none z-[999] 
            mix-blend-difference opacity-50"
        
        />

        
    </>
  )
}

export default CustomCursor