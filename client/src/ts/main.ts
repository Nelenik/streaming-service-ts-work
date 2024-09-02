import "../index.html";
import "../styles/style.scss";
import { HeaderPresenter, LayoutPresenter } from "presenters";
import { authApi, userApi, songApi, playlistApi } from "models";
import { isListType, Login } from "types";
import { ImageService, router } from "./services";
import { FooterPresenter } from "./presenters/FooterPresenter";
import { DataStore } from "./storages";
import { PlayerStore } from "./storages/PlayerStore";

window.addEventListener("beforeunload", () => {
  ImageService.instance.clearAllUrls();
});

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
  const footerPresenter = new FooterPresenter({ userApi, songApi });

  await headerPresenter.init();
  await layoutPresener.init();
  footerPresenter.init();
  //ROUTES
  router.on(() => router.navigate("songs/all"));

  router.on("songs/:listType", async (match) => {
    if (!match) return;
    const { data, params } = match;
    if (data && isListType(data.listType)) {
      await layoutPresener.drawSongsList(
        data.listType,
        Number(params?.id) || null
      );
      PlayerStore.instance.actualPlaylist = DataStore.instance.getSongsList();
      await footerPresenter.launchCurrentSong(
        PlayerStore.instance.progress,
        PlayerStore.instance.isPlaying
      );
    }
  });

  router.on("playlists", async () => {
    await layoutPresener.drawPlaylists();
    router.updatePageLinks();
  });

  router.resolve();
} catch (err) {
  console.log(err);
  router.navigate("error");
}
