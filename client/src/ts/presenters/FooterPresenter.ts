import { Controls, Footer, TrackName } from "components/footer";
import { Component, Presenter } from "core";
import { checkLike } from "helpers";
import { LikePresenter } from "presenters";
import { Models, Song } from "types";
import { DataStore, EventBus, ImageService } from "services";
import { PlayerVolume } from "components/footer/PlayerVolume";
import noImage from "img/no-image.jpg";

type FooterPresenterModels = Pick<Models, "userApi" | "songApi">;

export class FooterPresenter extends Presenter {
  footerComponent!: Component;
  controlsComponent!: Component;
  volumeComponent!: Component;
  trackNameComponent!: Component;

  actualPlaylist: Song[] = [];
  pervSong: Song | null = null;
  nextSong: Song | null = null;
  currentSong: Song | null = null;

  constructor(private models: FooterPresenterModels) {
    super();
  }
  init() {
    this.footerComponent = new Footer().mount("#app", "append");
    this.trackNameComponent = new TrackName().mount(".player", "append");
    this.controlsComponent = new Controls().mount(".player", "append");
    this.volumeComponent = new PlayerVolume().mount(".player", "append");
  }

  renewSongsQueue() {
    this.actualPlaylist = [...DataStore.instance.getSongsList()];
    if (!this.currentSong) {
      this.currentSong = this.actualPlaylist[0];
    } else {
      this.nextSong = this.actualPlaylist[0];
    }
  }

  async updatePlayerView() {
    if (!this.currentSong) return;
    const { id, name, artist, image, duration } = this.currentSong;
    const result = await ImageService.instance.invokeUrl(image);
    const cover = result ? result : noImage;

    this.trackNameComponent.options = {
      id: id,
      name: name,
      artist: artist.name,
      cover,
    };

    const footerLikeParent = this.trackNameComponent.element?.querySelector(
      ".player__name__header"
    );
    if (!(footerLikeParent instanceof HTMLElement)) return;
    const existingLikeBnt = footerLikeParent.querySelector(".track__like-btn");
    existingLikeBnt?.remove();

    new LikePresenter(
      this.models,
      footerLikeParent,
      checkLike(this.currentSong, this.models.userApi.currUsername),
      id
    ).init();

    this.controlsComponent.options = {
      progress: 0,
      duration: Math.trunc(duration / 1000),
    };
  }
}
