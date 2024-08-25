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
  init() {
    this.footerComponent = new Footer().mount("#app", "append");
  }

  drawPlayerParts() {
    const footerLikeParent = this.footerComponent.element?.querySelector(
      ".player__name__header"
    );
    if (!(footerLikeParent instanceof HTMLElement)) return;

    this.footerComponent.element?.querySelector(".track__like-btn")?.remove();

    const song = DataStore.instance.getSongsList()[0];
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
