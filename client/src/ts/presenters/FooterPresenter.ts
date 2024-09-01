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
      PlayerStore.instance.getSongById(songId);
      await this.launchCurrentSong(0, true);
    });

    EventBus.addEventListener("songPlayback", (e: CustomEventInit) => {
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
    progress: number = 0,
    playImmediately: boolean = false
  ): Promise<void> {
    const currentSong = PlayerStore.instance.currentSong;
    await this.updatePlayerView(currentSong);
    Player.playSong(currentSong, {
      onPlay: () => {
        PlayerStore.instance.isPlaying = Player.isPlaying();
        this.switchPlayBtnIcon(false);
      },
      onPause: () => {
        PlayerStore.instance.isPlaying = Player.isPlaying();
        this.switchPlayBtnIcon(true);
      },
      onLoad: () => {
        Player.goTo(progress);
        if (playImmediately) {
          Player.play();
        }
      },
      onEnd: async () => {
        PlayerStore.instance.getNextSong();
        await this.launchCurrentSong(0, true);
      },
    });
  }

  async updatePlayerView(currentSong: Song | null): Promise<void> {
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
      onOff: this.onOffHandler,
      onRange: this.rangeHandler,
      onSkip: this.skipHandler.bind(this),
      progress: 0,
      duration: Math.round(duration / 1000),
    };
    this.volumeComponent.options = {
      onVolume: this.volumeHandler,
      onMute: this.muteHandler,
    };
  }
  //change svg icon at the play btn
  switchPlayBtnIcon(play: boolean): void {
    const playBtn = document.querySelector(".player__play-btn");
    playBtn?.classList.toggle("is-playing", !play);
    playBtn?.classList.toggle("is-paused", play);
  }

  onOffHandler(e: Event): void {
    const isPlaying = Player.isPlaying();
    const target = e.currentTarget;
    if (!target || !(target instanceof HTMLElement)) return;

    if (isPlaying) {
      Player.pause();
    } else {
      Player.play();
    }
  }

  rangeHandler(e: Event): void {
    const target = e.target;
    if (!(target instanceof HTMLInputElement)) return;
    Player.goTo(Number(target.value));
  }

  volumeHandler(e: Event): void {
    const target = e.target;
    if (!(target instanceof HTMLInputElement)) return;
    const volumeValue = Number(target.value);
    Player.volume(Number(volumeValue));
  }

  muteHandler(e: Event): void {
    const target = e.target;
    if (target && target instanceof HTMLElement) {
      const newMuteState = !PlayerStore.instance.isMuted;
      Player.mute(newMuteState);
      PlayerStore.instance.isMuted = newMuteState;
      target.classList.toggle("is-muted", newMuteState);
    }
  }

  async skipHandler(skipTo: "next" | "prev"): Promise<void> {
    switch (skipTo) {
      case "next": {
        PlayerStore.instance.getNextSong();
        break;
      }
      case "prev": {
        PlayerStore.instance.getPrevSong();
      }
    }
    await this.launchCurrentSong(0, true);
  }
}
