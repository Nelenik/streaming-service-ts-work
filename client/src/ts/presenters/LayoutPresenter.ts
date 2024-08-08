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
    this.component = new Layout().mount("#app", "append");
    new Aside().mount(".content-wrap", "prepend");
    new SongsListPresenter();
    new PlaylistPresenter();
  }
}
