import { Playlists, Song } from "types";

export class DataStore {
  private playlists: Playlists = [];
  private songs: Song[] = [];

  static instance = new DataStore();

  storePlaylists(data: Playlists): void {
    this.playlists = data;
  }

  storeSongsList(data: Song[]): void {
    this.songs = data;
  }

  getPlaylists(): Playlists {
    return this.playlists;
  }

  getSongsList(): Song[] {
    return this.songs;
  }
}
