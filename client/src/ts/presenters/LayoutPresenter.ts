import { Aside } from "components/aside";
import { Layout } from "components/layout";
import { Presenter } from "core";
import { PlaylistPresenter, SongsListPresenter } from "presenters";

export class LayoutPresenter extends Presenter {
  constructor() {
    super();
    this.init();
  }

  init() {
    this.component = new Layout();
    new Aside();
    new SongsListPresenter();
    new PlaylistPresenter();
  }
}
