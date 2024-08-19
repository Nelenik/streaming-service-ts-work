import { Aside } from "components/aside";
import { Layout } from "components/layout";
import { Component, Presenter } from "core";
import { PlaylistModel, SongModel, UserModel } from "models";
import { PlaylistPresenter, SongsListPresenter } from "presenters";
// import { EventEmitter } from "services";
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
    this.songsListPresInst.mountSongs();
  }

  drawPlaylists() {
    this.cleanMainBlock();
    if (!this.playlistPresInst) {
      this.playlistPresInst = new PlaylistPresenter();
    }
    this.playlistPresInst.init();
  }
}
