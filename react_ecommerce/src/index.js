import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";

import App from "./App";
import { CartProvider } from "./Contexts/CartContext";

const rootElement = document.getElementById("root");
const root = createRoot(rootElement);
// ApiService.init();
root.render(
  <StrictMode>
    <CartProvider>
      <Router>
        <App />
      </Router>
    </CartProvider>
  </StrictMode>
);
