import { Header, Profile, Search } from "components/header";
import { Presenter } from "core";
import { Models, Playlists, Song } from "types";
import { CustomEvents, EventBus, router } from "services";
import { DataStore } from "storages";
import { checkSubstrMatch } from "helpers";

type HeaderPresenterModels = Pick<Models, "userApi">;

export class HeaderPresenter extends Presenter {
  constructor(private models: HeaderPresenterModels) {
    super();
  }
  async init(): Promise<void> {
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
          checkSubstrMatch(el.name, value) ||
          checkSubstrMatch(el.album.name, value) ||
          checkSubstrMatch(el.artist.name, value)
        );
      });
    } else if (currentLocation.url === "playlists") {
      filtredData = DataStore.instance
        .getPlaylists()
        .filter((el) => checkSubstrMatch(el.name, value));
    }
    const onFilterEvent = CustomEvents.get("onFilter")({ filtredData });
    EventBus.dispatchEvent(onFilterEvent);
  }
}
