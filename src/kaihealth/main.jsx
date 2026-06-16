import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
// Reutilizamos el sistema de diseño de la v2 (fuentes, paleta, utilidades)
import "../v2/index.css";
import App from "./App.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>
);
