import { Controls, Footer, TrackName } from "components/footer";
import { Component, Presenter } from "core";
import { checkLike } from "helpers";
import { LikePresenter } from "presenters";
import { Models, Song } from "types";
import { EventBus, ImageService, Player } from "services";
import { PlayerVolume } from "components/footer/PlayerVolume";
import noImage from "img/no-image.jpg";
import { PlayerStore } from "storages";

type FooterPresenterModels = Pick<Models, "userApi" | "songApi">;

export class FooterPresenter extends Presenter {
  footerComponent!: Component;
  controlsComponent!: Component;
  volumeComponent!: Component;
  trackNameComponent!: Component;

  constructor(private models: FooterPresenterModels) {
    super();
    EventBus.addEventListener("playSong", async (e: CustomEventInit) => {
      const { songId } = e.detail;
      PlayerStore.instance.playSongById(songId);
      await this.launchCurrentSong(true, 0, true);
    });

    EventBus.addEventListener("songProgress", (e: CustomEventInit) => {
      const { progress } = e.detail;
      PlayerStore.instance.progress = progress;
    });
  }
  init() {
    this.footerComponent = new Footer().mount("#app", "append");
    this.trackNameComponent = new TrackName().mount(".player", "append");
    this.controlsComponent = new Controls().mount(".player", "append");
    this.volumeComponent = new PlayerVolume().mount(".player", "append");
  }

  async launchCurrentSong(
    autoplay: boolean = false,
    progress: number = 0,
    isPlaying: boolean = false
  ) {
    const currentSong = PlayerStore.instance.currentSong;
    console.log(currentSong);
    await this.updatePlayerView(currentSong);
    Player.playSong(currentSong, {
      onPlay: () => {
        PlayerStore.instance.isPlaying = Player.isPlaying();
      },
      onPause: () => {
        PlayerStore.instance.isPlaying = Player.isPlaying();
      },
      onLoad: () => {
        Player.goTo(progress);
        if (isPlaying && autoplay) {
          Player.play();
        }
      },
      onEnd: async () => {
        PlayerStore.instance.playNexttSong();
        await this.launchCurrentSong(true);
      },
    });
  }

  async updatePlayerView(currentSong: Song | null) {
    if (!currentSong) return;
    const { id, name, artist, image, duration } = currentSong;
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
      checkLike(currentSong, this.models.userApi.currUsername),
      id
    ).init();

    this.controlsComponent.options = {
      onOff: this.pausePlayHandler,
      onRange: this.onRangeChange,
      progress: 0,
      duration: Math.trunc(duration / 1000),
    };
  }

  pausePlayHandler() {
    const isPlaying = Player.isPlaying();

    if (isPlaying) {
      Player.pause();
    } else {
      Player.play();
    }
  }

  onRangeChange(e: Event) {
    const target = e.target;
    if (!(target instanceof HTMLInputElement)) return;
    Player.goTo(Number(target.value));
  }
}
