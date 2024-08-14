import { Aside } from "components/aside";
import { Layout } from "components/layout";
import { Presenter } from "core";
import { PlaylistModel, SongModel, UserModel } from "models";
import { PlaylistPresenter, SongsListPresenter } from "presenters";

interface LayoutPresenterModels {
  userApi: UserModel;
  songApi: SongModel;
  playlistApi: PlaylistModel;
}

export class LayoutPresenter extends Presenter {
  constructor(private models: LayoutPresenterModels) {
    super();
  }

  async init() {
    const { userApi, songApi, playlistApi } = this.models;
    const userPlaylists = await userApi.getPlaylists();
    console.log(userPlaylists);
    new Layout().mount("#app", "append");

    new Aside({ userPlaylists }).mount(".content-wrap", "prepend");
    new SongsListPresenter();
    new PlaylistPresenter();
  }
}
