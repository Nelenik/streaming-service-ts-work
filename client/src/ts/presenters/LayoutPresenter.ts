import { Aside } from "components/aside";
import { Layout } from "components/layout";
import { Presenter } from "core";
import { PlaylistModel, SongModel, UserModel } from "models";
import { PlaylistPresenter, SongsListPresenter } from "presenters";
// import { EventEmitter } from "services";
import { isListType, ListType } from "types";

interface LayoutPresenterModels {
  userApi: UserModel;
  songApi: SongModel;
  playlistApi: PlaylistModel;
}

export class LayoutPresenter extends Presenter {
  songsListPresenterInstance!: SongsListPresenter;
  playlistPresenterInstance!: PlaylistPresenter;

  constructor(private models: LayoutPresenterModels) {
    super();
  }

  async init() {
    const { userApi } = this.models;
    const userPlaylists = await userApi.getPlaylists();
    console.log(userPlaylists);
    new Layout().mount("#app", "append");

    new Aside({ userPlaylists, onSwitch: this.switchScreens.bind(this) }).mount(
      ".content-wrap",
      "prepend"
    );

    this.songsListPresenterInstance = new SongsListPresenter(this.models);
    this.songsListPresenterInstance.init();
    await this.drawSongsList("all");

    this.playlistPresenterInstance = new PlaylistPresenter();
  }

  async drawSongsList(listType: ListType, playlistId: number | null = null) {
    await this.songsListPresenterInstance.getActualList(listType, playlistId);
    this.songsListPresenterInstance.mountSongs();
  }

  async switchScreens(e: Event) {
    const target = (e.target as HTMLElement)?.closest<HTMLElement>(
      ".aside__btn"
    );
    if (!target) return;
    const showClassName = "tabs-content--shown";
    document
      .querySelector(`.${showClassName}`)
      ?.classList.remove(showClassName);
    const path = target.dataset.path;
    console.log("path", path);
    document
      .querySelector(`[data-target="${path}"]`)
      ?.classList.add(showClassName);

    const listType = target.dataset.list;
    const playlistId = Number(target.dataset.listId) || null;
    if (!isListType(listType)) return;
    await this.drawSongsList(listType, playlistId);
  }
}
