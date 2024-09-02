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

  playSong(song: Song | null, handlers: PlaySongHadlers): void {
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
      volume: 0.3,
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
  play(): void {
    this.sound?.play();
    this.dispatchPlaybackData();
  }
  pause(): void {
    this.sound?.pause();
    clearTimeout(this.progressTimeout);
  }

  goTo(value: number): void {
    this.sound?.seek(value);
  }

  isPlaying(): boolean {
    if (!this.sound) return false;
    return this.sound?.playing();
  }

  volume(value: number): void {
    Howler.volume(value);
  }

  mute(muted: boolean): void {
    Howler.mute(muted);
  }

  destroy() {
    this.sound = null;
    Howler.stop();
  }

  private dispatchPlaybackData(): void {
    const progress = this.sound?.seek() || 0;
    const duration = this.sound?.duration() || 0;
    const playbackEvent = CustomEvents.get("songPlayback")({
      progress,
      duration,
    });
    EventBus.dispatchEvent(playbackEvent);
    this.progressTimeout = window.setTimeout(
      this.dispatchPlaybackData.bind(this),
      1000
    );
  }

  updateProgress(value: number): void {
    this.sound?.seek(value);
  }
}

export const Player = new PlayerService();
