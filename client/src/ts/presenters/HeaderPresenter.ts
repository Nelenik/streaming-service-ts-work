import { Header, Profile, Search } from "components/header";
import { Presenter } from "core";
import { Models, Playlists, Song } from "types";
import { CustomEvents, DataStore, EventBus, router } from "services";

type HeaderPresenterModels = Pick<Models, "userApi">;

export class HeaderPresenter extends Presenter {
  constructor(private models: HeaderPresenterModels) {
    super();
  }
  async init() {
    const { userApi } = this.models;
    const { username } = await userApi.getUser();
    new Header().mount("#app", "append");
    new Search({ onInput: this.onInput }).mount(".header", "append");
    new Profile({ username }).mount(".header", "append");
  }

  onInput(value: string): void {
    const currentLocation = router.getCurrentLocation();
    let filtredData: Playlists | Song[] = [];
    if (currentLocation.url.includes("songs")) {
      filtredData = DataStore.instance.getSongsList().filter((el) => {
        return (
          el.name.includes(value) ||
          el.album.name.includes(value) ||
          el.artist.name.includes(value)
        );
      });
    } else if (currentLocation.url === "playlists") {
      filtredData = DataStore.instance
        .getPlaylists()
        .filter((el) => el.name.includes(value));
    }
    const onFilterEvent = CustomEvents.get("onFilter")({ filtredData });
    EventBus.dispatchEvent(onFilterEvent);
  }
}

// const rerenderEvent = CustomEvents.get("rerenderTrackList")({
//   listType: "favourites",
//   id: null,
// });
// window.dispatchEvent(rerenderEvent);
