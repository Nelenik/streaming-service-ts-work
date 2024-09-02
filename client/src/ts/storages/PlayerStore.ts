import { Note } from "components/notes";
import { Song } from "types";

export class PlayerStore {
  private HISTORY_MAX_SIZE: number = 5;
  static instance = new PlayerStore();

  private _actualPlaylist: Song[] = [];

  private playerHistory: Song[] = [];

  private _currentSong: Song | null = null;

  progress: number = 0;
  isPlaying: boolean = false;
  isMuted: boolean = false;
  //modes
  isRandom: boolean = false;
  isLooped: boolean = false;

  set actualPlaylist(value: Song[]) {
    this._actualPlaylist = value;
    if (!this.currentSong) {
      this.currentSong = this._actualPlaylist[0];
    }
  }

  private set currentSong(value: Song | null) {
    this._currentSong = value;
  }

  get currentSong(): Song | null {
    return this._currentSong;
  }

  private updateHistory(): void {
    const lastSongId = this.playerHistory.at(-1)?.id;
    if (this.currentSong) {
      if (lastSongId && this.currentSong.id === lastSongId) return;
      this.playerHistory.push(this.currentSong);
      if (this.playerHistory.length >= this.HISTORY_MAX_SIZE) {
        this.playerHistory = this.playerHistory.slice(-5);
      }
    }
  }
  private getNextSongIndex(): number {
    const currentSongIndex = this._actualPlaylist.findIndex(
      (el) => el.id === this.currentSong?.id
    );

    const nextIndex = currentSongIndex + 1;
    if (this.isLooped) {
      return currentSongIndex;
    }
    if (this.isRandom) {
      return Math.floor(Math.random() * this._actualPlaylist.length);
    } else {
      return nextIndex;
    }
  }

  getSongById(id: number): void {
    this.currentSong = this._actualPlaylist.find((el) => el.id === id) || null;
  }

  getPrevSong(): void {
    this.currentSong = this.playerHistory.pop() || null;
    if (!this.currentSong) {
      new Note({
        message: "History is empty",
      })
        .show()
        .autoClose(4000);
    }
  }

  getNextSong(): void {
    this.updateHistory();
    const nextIndex = this.getNextSongIndex();
    this.currentSong =
      (nextIndex >= 0 && this._actualPlaylist[nextIndex]) || null;
    if (!this.currentSong) {
      new Note({
        message: "No songs available for playback.",
      })
        .show()
        .autoClose(4000);
    }
  }
}
