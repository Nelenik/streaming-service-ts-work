import { Aside } from "components/aside";
import { Layout } from "components/layout";
import { Component, Presenter } from "core";
import { PlaylistModel, SongModel, UserModel } from "models";
import { PlaylistPresenter, SongsListPresenter } from "presenters";
import { ListType } from "types";

interface LayoutPresenterModels {
  userApi: UserModel;
  songApi: SongModel;
  playlistApi: PlaylistModel;
}

export class LayoutPresenter extends Presenter {
  layoutComponent!: Component;
  songsListPresInst: SongsListPresenter | null = null;
  playlistPresInst: PlaylistPresenter | null = null;

  constructor(private models: LayoutPresenterModels) {
    super();
  }

  async init() {
    const { userApi } = this.models;
    const userPlaylists = await userApi.getPlaylists();
    this.layoutComponent = new Layout().mount("#app", "append");

    new Aside({ userPlaylists }).mount(".content-wrap", "prepend");

    //rerender of the favorites on unlike
    window.addEventListener("rerenderFavorites", async (e: CustomEventInit) => {
      const { listType, id } = e.detail;
      await this.drawSongsList(listType, id);
    });
  }

  cleanMainBlock() {
    const main = this.layoutComponent.element?.querySelector(".main");
    main?.replaceChildren();
  }

  async drawSongsList(listType: ListType, playlistId: number | null = null) {
    this.cleanMainBlock();
    if (!this.songsListPresInst) {
      this.songsListPresInst = new SongsListPresenter(this.models);
    }
    this.songsListPresInst.init();
    await this.songsListPresInst.getActualList(listType, playlistId);
    await this.songsListPresInst.mountSongs();
  }

  async drawPlaylists() {
    this.cleanMainBlock();
    if (!this.playlistPresInst) {
      this.playlistPresInst = new PlaylistPresenter({
        userApi: this.models.userApi,
      });
    }
    this.playlistPresInst.init();
    await this.playlistPresInst.getActualPlaylists();
    await this.playlistPresInst.mountPlaylists();
  }
}
