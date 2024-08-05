import { SongComponent } from "components/songs";
import { Component, Presenter } from "core";
import { Song } from "mocks";

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
      isLiked: true,
      num: this.num,
    });

    this.component.on(
      "click",
      this.component.element,
      this.greetHandler.bind(this)
    );
  }

  greetHandler() {
    console.log("hello track");
  }
}
