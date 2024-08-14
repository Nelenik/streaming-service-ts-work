import { Footer } from "components/footer";
import "../index.html";
import "../styles/style.scss";
import { HeaderPresenter, LayoutPresenter } from "presenters";
import { authApi, userApi, songApi, playlistApi } from "models";
import { Login } from "types";

const loginData: Login = { username: "HelNek", password: "HelNek" };
authApi.login(loginData).then(async (res) => {
  localStorage.setItem("PlayServiceAuth", JSON.stringify(res));
  console.log("authorized");

  await new HeaderPresenter({ userApi }).init();

  await new LayoutPresenter({ userApi, songApi, playlistApi }).init();

  new Footer().mount("#app", "append");
});
