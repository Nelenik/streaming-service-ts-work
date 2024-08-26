// import { CustomEvents, EventBus } from "services";
import { Song } from "types";
import { Howl } from "howler";
import { CustomEvents, EventBus } from "services";

export class PlayerService {
  sound: Howl | null = null;
  private progressTimeout: number = 0;
  playSong(song: Song) {
    if (this.sound) {
      this.sound.unload();
      this.sound = null;
    }

    this.sound = new Howl({
      src: [`http://localhost:3000${song.path}`],
      html5: true,
      onplay: () => {
        this.showProgress();
      },
      onend: () => {
        window.clearTimeout(this.progressTimeout);
      },
    });
    this.play();
  }
  play() {
    this.sound?.play();
  }
  pause() {
    this.sound?.pause();
  }
  resume() {
    this.sound?.play();
  }

  private showProgress() {
    const progress = this.sound?.seek();
    const progressEvent = CustomEvents.get("songProgress")(progress);
    EventBus.dispatchEvent(progressEvent);
    this.progressTimeout = window.setTimeout(this.showProgress, 1000);
  }

  updateProgress(value: number) {
    this.sound?.seek(value);
  }

  static player = new PlayerService();
}
