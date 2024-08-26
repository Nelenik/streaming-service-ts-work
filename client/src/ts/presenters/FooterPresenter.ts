import { Controls, Footer, TrackName } from "components/footer";
import { Component, Presenter } from "core";
import { checkLike } from "helpers";
import { LikePresenter } from "presenters";
import { Models, Song } from "types";
import { DataStore, ImageService } from "services";
import { PlayerVolume } from "components/footer/PlayerVolume";
import noImage from "img/no-image.jpg";

type FooterPresenterModels = Pick<Models, "userApi" | "songApi">;

export class FooterPresenter extends Presenter {
  footerComponent!: Component;

  pervSong: Song | null = null;
  nextSong: Song | null = null;
  currentSong: Song | null = null;

  constructor(private models: FooterPresenterModels) {
    super();
  }
  init() {
    this.footerComponent = new Footer().mount("#app", "append");
  }

  async drawPlayerParts() {
    const song = DataStore.instance.getSongsList()[0];
    if (!song) return;
    this.footerComponent.element?.querySelector(".player")?.replaceChildren();
    const result = await ImageService.instance.invokeUrl(song.image);
    const cover = result ? result : noImage;
    new TrackName({
      id: song.id,
      name: song.name,
      artist: song.artist.name,
      cover,
    }).mount(".player", "append");
    const footerLikeParent = this.footerComponent.element?.querySelector(
      ".player__name__header"
    );
    if (!(footerLikeParent instanceof HTMLElement)) return;

    new LikePresenter(
      this.models,
      footerLikeParent,
      checkLike(song, this.models.userApi.currUsername),
      song.id
    ).init();

    new Controls({
      progress: 0,
      duration: Math.trunc(song.duration / 1000),
    }).mount(".player", "append");

    new PlayerVolume().mount(".player", "append");
  }

  drawTrackName() {}
}
