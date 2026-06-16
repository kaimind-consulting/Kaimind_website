import { useState } from "react";
import Header, { ContactModal } from "./components/Header";
import Hero from "./components/Hero";
import Solutions from "./components/Solutions";
import Process from "./components/Process";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import FloatingContact from "./components/FloatingContact";
import GrainOverlay from "./components/GrainOverlay";

export default function App() {
  const [contactOpen, setContactOpen] = useState(false);
  const openContact = () => setContactOpen(true);

  return (
    <>
      <Header onContact={openContact} />
      <main>
        <Hero onContact={openContact} />
        <Solutions />
        <Process />
        {/* "Acerca de nosotros" retirado por ahora — el componente About.jsx
            sigue en el repo para retomarlo cuando estén las fotos/textos. */}
        <Contact onContact={openContact} />
      </main>
      <Footer onContact={openContact} />
      <ContactModal open={contactOpen} onClose={() => setContactOpen(false)} />
      <FloatingContact />
      <GrainOverlay />
    </>
  );
}
