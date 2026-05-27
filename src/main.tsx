
import { createRoot } from "react-dom/client";


import { App } from "./App.tsx";
import "./style.css"
import { ProviderApp } from "./providers/ProviderApp.tsx";

createRoot(document.getElementById("root")!).render(

    <ProviderApp>
      <App />
    </ProviderApp>

);
