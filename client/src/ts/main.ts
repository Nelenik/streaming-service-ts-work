import "../index.html";
import "../styles/style.scss";
import { render } from "core";
import { Header } from "components/header";
import { Footer } from "components/footer";
import { Layout } from "components/layout";

const container = document.getElementById("app");
render(container, new Header(), "append");
render(container, new Layout(), "append");
render(container, new Footer(), "append");
