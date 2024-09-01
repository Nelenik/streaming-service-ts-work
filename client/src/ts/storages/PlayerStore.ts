import { shuffleArray } from "helpers";
import { PlayerMode, Song } from "types";

export class PlayerStore {
  static instance = new PlayerStore();
  _mode: PlayerMode = "def";

  private _actualPlaylist: Song[] = [];
  private playerHistory: Song[] = [];

  private _currentSong: Song | null = null;

  progress: number = 0;
  isPlaying: boolean = false;
  isMuted: boolean = false;

  set mode(value: PlayerMode) {
    this._mode = value;
    if (value === "shuffle") {
      this.actualPlaylist = shuffleArray(this._actualPlaylist);
    }
  }

  set actualPlaylist(value: Song[]) {
    this._actualPlaylist = value;
    if (!this.currentSong) {
      this.currentSong = this._actualPlaylist[0];
    } else {
      const currenInPlaylist = this._actualPlaylist.find(
        (el) => el.id === this._currentSong?.id
      );
      if (currenInPlaylist) {
        this.currentSong = currenInPlaylist;
      }
    }
  }

  private set currentSong(value: Song | null) {
    this._currentSong = value;
  }

  get currentSong(): Song | null {
    return this._currentSong;
  }

  private updateHistory(): void {
    const historyMaxSize = 5;
    if (this.currentSong) {
      this.playerHistory.push(this.currentSong);
      if (this.playerHistory.length > historyMaxSize) {
        this.playerHistory = this.playerHistory.slice(-5);
      }
    }
  }
  private getNextSongIndex(): number {
    const currentSongIndex = this._actualPlaylist.findIndex(
      (el) => el.id === this.currentSong?.id
    );
    const nextIndex = currentSongIndex + 1;
    switch (this._mode) {
      case "def":
      case "shuffle": {
        return nextIndex > this._actualPlaylist.length - 1 ? -1 : nextIndex;
      }
      case "both": {
        return Math.floor(Math.random() * this._actualPlaylist.length);
      }
      case "cycle": {
        return nextIndex > this._actualPlaylist.length - 1
          ? nextIndex % this._actualPlaylist.length
          : nextIndex;
      }
    }
  }

  getSongById(id: number): void {
    this.currentSong = this._actualPlaylist.find((el) => el.id === id) || null;
  }

  getPrevSong(): void {
    this.currentSong = this.playerHistory.pop() || null;
  }

  getNextSong(): void {
    this.updateHistory();
    const nextIndex = this.getNextSongIndex();
    this.currentSong =
      (nextIndex >= 0 && this._actualPlaylist[nextIndex]) || null;
  }
}
