import { Like, SongComponent } from "components/songs";
import { Component, Presenter } from "core";
import { Song } from "mocks";
// import { Modal } from "../services";
// import { RemoveSong } from "components/modals";

export class SongPresenter extends Presenter {
  component: Component;

  constructor(
    public songData: Song,
    public num: number
  ) {
    super();
    this.init();
  }

  init() {
    this.component = new SongComponent({
      data: this.songData,
      num: this.num,
    }).mount(".tracks__list", "append");

    //render like component
    const likeParent = this.component.element.querySelector(
      ".tracks__item__data"
    );
    new Like({
      isLiked: true,
      onLike: this.likeHandler,
    }).mount(likeParent, "append");
  }

  likeHandler(component: Component) {
    component.options = {
      ...component.options,
      isLiked: !component.options.isLiked,
    };
  }
}
