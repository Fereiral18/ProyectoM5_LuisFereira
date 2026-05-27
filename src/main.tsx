
import { createRoot } from "react-dom/client";

import { ProviderApp } from "./providers/ProviderApp.tsx";
import { App } from "./App.tsx";
import "./style.css"

createRoot(document.getElementById("root")!).render(

    <ProviderApp>
      <App />
    </ProviderApp>

);
