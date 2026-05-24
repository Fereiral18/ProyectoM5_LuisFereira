import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import { ProviderApp } from "./providers/ProviderApp.tsx";
import { App } from "./App.tsx";
import "./style.css"

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ProviderApp>
      <App />
    </ProviderApp>
  </StrictMode>,
);
