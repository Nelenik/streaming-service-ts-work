import { Footer } from "components/footer";
import "../index.html";
import "../styles/style.scss";
import { HeaderPresenter, LayoutPresenter } from "presenters";
import { authApi, userApi } from "models";
import { Login } from "types";

new HeaderPresenter();
new LayoutPresenter();
new Footer().mount("#app", "append");

const loginData: Login = { username: "HelNek", password: "HelNek" };

authApi.login(loginData).then((res) => {
  localStorage.setItem("PlayServiceAuth", JSON.stringify(res));
  console.log("authorized");
});

userApi.getUserFull().then((res) => console.log(res));
