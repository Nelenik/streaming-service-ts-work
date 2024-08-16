import { Footer } from "components/footer";
import "../index.html";
import "../styles/style.scss";
import { HeaderPresenter, LayoutPresenter } from "presenters";
import { authApi, userApi, songApi, playlistApi } from "models";
import { isListType, Login } from "types";
import { router } from "./services";

router.on("/error", () => {
  document.body.innerHTML = "<div>Page is not found</div>";
});

//AUTH
const loginData: Login = { username: "HelNek", password: "HelNek" };
try {
  const res = await authApi.login(loginData);
  localStorage.setItem("PlayServiceAuth", JSON.stringify(res));
  console.log("authorized");

  //INIT COMPONENTNS
  const headerPresenter = new HeaderPresenter({ userApi });
  const layoutPresener = new LayoutPresenter({ userApi, songApi, playlistApi });
  const footer = new Footer();

  await headerPresenter.init();
  await layoutPresener.init();
  footer.mount("#app", "append");

  //ROUTES
  router.on(() => router.navigate("/songs/all"));

  router.on("songs/:listType", async (match) => {
    if (!match) return;
    const { data, params } = match;
    if (data && isListType(data.listType)) {
      await layoutPresener.drawSongsList(
        data.listType,
        Number(params?.id) || null
      );
    }
  });

  router.on("playlists", async () => {
    await layoutPresener.drawPlaylists();
  });

  router.resolve();
} catch (err) {
  console.log(err);
  router.navigate("/error");
}
