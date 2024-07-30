import "../index.html";
import "../styles/style.scss";
import { renderElement } from "core";
import { Header } from "components/header";
import { Footer } from "components/footer";
import { Layout } from "components/layout";

const container = document.getElementById("app");
renderElement(container, new Header().element, "append");
renderElement(container, new Layout().element, "append");
renderElement(container, new Footer().element, "append");
