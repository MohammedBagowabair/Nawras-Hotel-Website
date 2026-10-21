import { renderToString } from "react-dom/server";
import { App } from "./App";
import { NotFoundApp } from "./NotFound";

export const render = (page: "home" | "404") => renderToString(page === "404" ? <NotFoundApp /> : <App />);
