import { Footer } from "components/footer";
import "../index.html";
import "../styles/style.scss";
import { HeaderPresenter, LayoutPresenter } from "presenters";

new HeaderPresenter();
new LayoutPresenter();
new Footer().mount("#app", "append");
