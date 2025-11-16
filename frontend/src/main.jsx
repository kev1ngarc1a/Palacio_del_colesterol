import React from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
// ELIMINA ESTA IMPORTACIÓN: import { BrowserRouter } from "react-router-dom"; 
import { AuthProvider } from "./context/AuthContext";
import { ProductProvider } from "./context/ProductContext";

createRoot(document.getElementById("root")).render(
<React.StrictMode>
  <AuthProvider>
    <ProductProvider>
      {/* ELIMINA ESTE ENVOLTORIO: <BrowserRouter> */}
      <App />
      {/* ELIMINA ESTE ENVOLTORIO: </BrowserRouter> */}
      </ProductProvider>
      </AuthProvider>
      </React.StrictMode>
);