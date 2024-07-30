import { Song } from "mocks";

export class PlaylistData {
  constructor(
    public id: number,
    public name: string,
    public songs: Song[],
    public cover: {
      base: string;
      _360: string;
      _1440: string;
    }
  ) {}
}

export const playlists: PlaylistData[] = [
  new PlaylistData(1, "Playlist No1", [], {
    base: "playlists(1).jpg",
    _360: "playlists__360(1).jpg",
    _1440: "playlists__1440(1).jpg",
  }),
  new PlaylistData(1, "Playlist No2", [], {
    base: "playlists(2).jpg",
    _360: "playlists__360(2).jpg",
    _1440: "playlists__1440(2).jpg",
  }),
  new PlaylistData(1, "Playlist No3", [], {
    base: "playlists(3).jpg",
    _360: "playlists__360(3).jpg",
    _1440: "playlists__1440(3).jpg",
  }),
  new PlaylistData(1, "Playlist No4", [], {
    base: "playlists(4).jpg",
    _360: "playlists__360(4).jpg",
    _1440: "playlists__1440(4).jpg",
  }),
  new PlaylistData(1, "Playlist No5", [], {
    base: "playlists(5).jpg",
    _360: "playlists__360(5).jpg",
    _1440: "playlists__1440(5).jpg",
  }),
  new PlaylistData(1, "Playlist No6", [], {
    base: "playlists(6).jpg",
    _360: "playlists__360(6).jpg",
    _1440: "playlists__1440(6).jpg",
  }),
];
