import { Footer } from "components/footer";
import { Component, Presenter } from "core";
import { checkLike } from "helpers";
import { LikePresenter } from "presenters";
import { Models } from "types";
import { DataStore } from "services";

type FooterPresenterModels = Pick<Models, "userApi" | "songApi">;

export class FooterPresenter extends Presenter {
  footerComponent!: Component;
  constructor(private models: FooterPresenterModels) {
    super();
  }
  async init() {
    this.footerComponent = new Footer().mount("#app", "append");

    const footerLikeParent = this.footerComponent.element?.querySelector(
      ".player__name__header"
    );
    if (!(footerLikeParent instanceof HTMLElement)) return;
    console.log("like is mounting");
    const song = DataStore.instance.getSongsList()[0];
    console.log("song", song);
    if (song) {
      new LikePresenter(
        this.models,
        footerLikeParent,
        checkLike(song, this.models.userApi.currUsername),
        song.id
      ).init();
    }
  }
}
