import { hydrateRoot, createRoot } from "react-dom/client";
import "./styles.css";
import { App } from "./App";
import { NotFoundApp } from "./NotFound";

const root = document.getElementById("root")!;
const Comp = document.documentElement.dataset["page"] === "404" ? NotFoundApp : App;
if (root.hasChildNodes()) hydrateRoot(root, <Comp />);
else createRoot(root).render(<Comp />);
