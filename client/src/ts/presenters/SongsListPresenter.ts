import { SongsList } from "components/songs";
import { Presenter } from "core";
import { songsList } from "mocks";
import { SongPresenter } from "./SongPresenter";
export class SongsListPresenter extends Presenter {
  constructor() {
    super();
    this.init();
  }
  init() {
    this.component = new SongsList().mount(".main", "append");
    songsList.forEach((song, i) => {
      new SongPresenter(song, i, true);
    });
  }
}
