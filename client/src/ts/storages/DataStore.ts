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

  // mapSongsList(data: Song): void {
  //   this.songs = this.songs.map((el) => {
  //     if (el.id === data.id) {
  //       el.likes = [...el.likes, ...data.likes];
  //     }
  //     return el;
  //   });
  //   console.log("updated song store", this.songs);
  // }

  getPlaylists(): Playlists {
    return this.playlists;
  }

  getSongsList(): Song[] {
    return this.songs;
  }
}
