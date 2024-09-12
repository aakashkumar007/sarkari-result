import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { Toaster } from "sonner";  // Ensure you're using the correct import for Sonner
import { store } from "./redux/store.js";
import { Provider } from "react-redux";  

createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <App />
    <Toaster position="top-center" duration={700}  /> {/* Positioning the toast at the top center */}
  </Provider>
);
