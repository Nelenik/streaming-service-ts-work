import { PlaylistModel, SongModel, UserModel } from "models";

export type InsertMethods = "append" | "prepend" | "before" | "after";

export interface User {
  id: number;
  username: string;
  firstName?: string;
  lastName?: string;
}

export interface UserFull extends User, UserLikes {
  playlists: Playlists;
}

export interface UserLikes {
  songLikes: Song[];
  albumLikes: Album[];
  artistLikes: Artist[];
}

export interface Playlist {
  id: number;
  name: string;
  createdAt: string;
  user: User;
  songs: Song[];
}

export interface PlaylistName {
  name: string;
}

export type Playlists = Playlist[];

export interface Song {
  id: number;
  name: string;
  filename: string;
  path: string;
  image: string;
  duration: number;
  createdAt: string;
  album: Album;
  artist: Artist;
  playlists: Playlists;
  likes: User[];
}

export interface Album {
  id: number;
  name: string;
  image: string;
  createdAt: string;
  songs: Song[];
  artist: Artist;
  likes: User[];
}
export interface Artist {
  id: number;
  name: string;
  image: string;
  createdAt: string;
  albums: Album[];
  likes: User[];
}

export interface Jwt {
  access_token: string;
}

export interface Login {
  username: string;
  password: string;
}

export interface Signup extends Login {
  firstName: string;
  lastName: string;
}

export interface Models {
  userApi: UserModel;
  songApi: SongModel;
  playlistApi: PlaylistModel;
}

export type ListType = "all" | "favourites" | "playlist";

export type ModalType = "add" | "remove";

export type NoteType = "warning" | "error";
