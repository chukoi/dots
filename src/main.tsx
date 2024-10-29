import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import Dots from "./Dots.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Dots />
  </StrictMode>
);
