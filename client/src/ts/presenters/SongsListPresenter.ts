import { SongsList } from "components/songs";
import { Presenter } from "core";
import { songsList } from "mocks";
import { SongPresenter } from "./SongPresenter";

interface SongsListPresenterModels {}

export class SongsListPresenter extends Presenter {
  constructor(private models: SongsListPresenterModels) {
    super();
  }
  init() {
    new SongsList().mount(".main", "append");
    songsList.forEach((song, i) => {
      new SongPresenter(song, i, true);
    });
  }
}
