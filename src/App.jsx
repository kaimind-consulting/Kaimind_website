import { useEffect } from 'react'
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

import Header from "./components/Header";
import HeroSection from "./components/HeroSection";
import CustomCursor from "./components/CustomCursor";
import AboutSection from "./components/AboutSection";
import ProjectsSection from "./components/ProjectsSection";
import Footer from "./components/Footer";

export default function App() {

  useEffect(() =>{
    // registrar el plugin para el scroll
    gsap.registerPlugin(ScrollTrigger)

    // refresh el scroll cuando la pagina este full
    ScrollTrigger.refresh()

    // Limpiar el scroll
    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill ())
    }
  }, [])

  return (
    <>
      <Header />
      <HeroSection />
      <AboutSection />
      <ProjectsSection />
      <Footer />
    </>
  )
}