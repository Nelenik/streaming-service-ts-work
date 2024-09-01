import { checkObjectProps } from "helpers";
import { ListType, Playlist, Playlists, Song } from "types";

export function isSongList(list: unknown): list is Song[] {
  return (
    Array.isArray(list) &&
    list.every((song) => {
      return isSong(song);
    })
  );
}

export function isSong(song: unknown): song is Song {
  return checkObjectProps(song, ["duration", "album"]);
}

export function isPlaylist(playlist: unknown): playlist is Playlist {
  return checkObjectProps(playlist, ["user", "songs"]);
}

export function isPlaylists(playlists: unknown): playlists is Playlists {
  return (
    Array.isArray(playlists) &&
    playlists.every((playlist) => isPlaylist(playlist))
  );
}

export function isListType(val: string | undefined): val is ListType {
  return val === "all" || val === "playlist" || val === "favourites";
}

export function isPrevOrNext(value: unknown): value is "next" | "prev" {
  return value === "next" || value === "prev";
}
