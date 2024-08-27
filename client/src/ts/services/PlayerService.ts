// import { CustomEvents, EventBus } from "services";
import { Song } from "types";
import { Howl } from "howler";
import { CustomEvents, EventBus } from "services";
import { NOOP } from "helpers";

interface PlaySongHadlers {
  onPlay?: () => void;
  onEnd?: () => void;
  onPause?: () => void;
  onLoad?: () => void;
}

export class PlayerService {
  sound: Howl | null = null;
  private progressTimeout: number = 0;

  playSong(song: Song | null, handlers: PlaySongHadlers) {
    if (!song) return;
    const {
      onPlay = NOOP,
      onEnd = NOOP,
      onPause = NOOP,
      onLoad = NOOP,
    } = handlers;
    if (this.sound) {
      this.sound.unload();
      this.sound = null;
      clearTimeout(this.progressTimeout);
    }

    this.sound = new Howl({
      src: [`http://localhost:3000${song.path}`],
      html5: true,
      volume: 0.5,
      onplay: () => {
        onPlay();
      },
      onend: () => {
        onEnd();
        clearTimeout(this.progressTimeout);
      },
      onpause: () => {
        onPause();
      },
      onload: () => {
        onLoad();
      },
    });
  }
  play() {
    this.sound?.play();
    this.showProgress();
  }
  pause() {
    this.sound?.pause();
    clearTimeout(this.progressTimeout);
  }

  goTo(value: number) {
    this.sound?.seek(value);
  }

  isPlaying(): boolean {
    if (!this.sound) return false;
    return this.sound?.playing();
  }

  private showProgress() {
    const progress = this.sound?.seek();
    const duration = this.sound?.duration();
    const progressEvent = CustomEvents.get("songProgress")({
      progress,
      duration,
    });
    EventBus.dispatchEvent(progressEvent);
    this.progressTimeout = window.setTimeout(
      this.showProgress.bind(this),
      1000
    );
  }

  updateProgress(value: number) {
    this.sound?.seek(value);
  }

  // static player = new PlayerService();
}

export const Player = new PlayerService();
