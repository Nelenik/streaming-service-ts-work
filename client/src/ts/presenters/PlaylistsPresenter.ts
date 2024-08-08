import { Playlist, PlaylistsList } from "components/playlists";
import { Presenter } from "core";
import { playlists } from "mocks";

export class PlaylistPresenter extends Presenter {
  constructor() {
    super();
    this.init();
  }

  init() {
    this.component = new PlaylistsList().mount(".main", "append");
    playlists.forEach((playlist) => {
      new Playlist({ data: playlist }).mount(".playlist__list", "append");
    });
  }
}
