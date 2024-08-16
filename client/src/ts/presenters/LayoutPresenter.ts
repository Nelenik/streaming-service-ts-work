import { Aside } from "components/aside";
import { Layout } from "components/layout";
import { Presenter } from "core";
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
  songsListPresInst: SongsListPresenter | null = null;
  playlistPresInst: PlaylistPresenter | null = null;

  constructor(private models: LayoutPresenterModels) {
    super();
  }

  async init() {
    const { userApi } = this.models;
    const userPlaylists = await userApi.getPlaylists();
    console.log(userPlaylists);
    new Layout().mount("#app", "append");

    new Aside({ userPlaylists }).mount(".content-wrap", "prepend");
  }

  async drawSongsList(listType: ListType, playlistId: number | null = null) {
    if (!this.songsListPresInst) {
      this.songsListPresInst = new SongsListPresenter(this.models);
      this.songsListPresInst.init();
    }
    await this.songsListPresInst.getActualList(listType, playlistId);
    this.songsListPresInst.mountSongs();
  }

  drawPlaylists() {
    if (!this.playlistPresInst) {
      this.playlistPresInst = new PlaylistPresenter();
    }
  }
}
