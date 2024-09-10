import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { Toaster } from "sonner";  // Ensure you're using the correct import for Sonner

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
    <Toaster position="top-center" /> {/* Positioning the toast at the top center */}
  </StrictMode>
);
