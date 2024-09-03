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

  likePresenterInst!: Presenter;

  constructor(private models: FooterPresenterModels) {
    super();
    EventBus.addEventListener("playSong", async (e: Event) => {
      const customEvent = e as CustomEvent<{ songId: number }>;
      const { songId } = customEvent.detail;
      PlayerStore.instance.getSongById(songId);
      await this.launchCurrentSong(0, true);
    });

    EventBus.addEventListener("songPlayback", (e: Event) => {
      const customEvent = e as CustomEvent<{ progress: number }>;
      const { progress } = customEvent.detail;
      PlayerStore.instance.progress = progress;
    });
  }
  init(): void {
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
    if (!currentSong) {
      Player.destroy();
      PlayerStore.instance.isPlaying = false;
      this.switchPlayBtnIcon(true);
      return;
    }
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

  async updatePlayerView(currentSong: Song): Promise<void> {
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
    //destroys previous like presenter instance to avoid listeners accumulation in footer
    if (this.likePresenterInst) this.likePresenterInst.destroy();
    if (footerLikeParent && footerLikeParent instanceof HTMLElement) {
      const existingLikeBnt =
        footerLikeParent.querySelector(".track__like-btn");
      existingLikeBnt?.remove();

      this.likePresenterInst = new LikePresenter(
        this.models,
        footerLikeParent,
        checkLike(currentSong, this.models.userApi.currUsername),
        id
      );
      this.likePresenterInst.init();
    }

    this.controlsComponent.options = {
      onOff: this.onOffHandler,
      onRange: this.rangeHandler,
      onSkip: this.skipHandler.bind(this),
      onRepeat: this.repeatHandler,
      onRandom: this.randomHandler,
      progress: 0,
      duration: Math.round(duration / 1000),
      isLooped: PlayerStore.instance.isLooped,
      isRandom: PlayerStore.instance.isRandom,
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

  onOffHandler(): void {
    const isPlaying = Player.isPlaying();
    if (isPlaying) {
      Player.pause();
    } else {
      Player.play();
    }
  }

  rangeHandler(newValue: number): void {
    Player.goTo(newValue);
  }
  volumeHandler(volumeValue: number): void {
    Player.volume(volumeValue);
  }

  muteHandler(target: HTMLElement): void {
    const newMuteState = !PlayerStore.instance.isMuted;
    Player.mute(newMuteState);
    PlayerStore.instance.isMuted = newMuteState;
    target.classList.toggle("is-muted", newMuteState);
  }

  async skipHandler(skipTo: "next" | "prev"): Promise<void> {
    switch (skipTo) {
      case "next": {
        PlayerStore.instance.getNextSong();
        break;
      }
      case "prev": {
        PlayerStore.instance.getPrevSong();
        break;
      }
    }
    await this.launchCurrentSong(0, true);
  }

  repeatHandler(isLooped: boolean): void {
    PlayerStore.instance.isLooped = isLooped;
  }
  randomHandler(isRandom: boolean): void {
    PlayerStore.instance.isRandom = isRandom;
  }
}
