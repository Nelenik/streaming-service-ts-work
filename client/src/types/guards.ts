import { checkObjectProps } from "helpers";
import { ListType, Song } from "types";

export function isSongList(list: unknown): list is Song[] {
  return (
    Array.isArray(list) &&
    list.every((song) => {
      return checkObjectProps(song, ["duration", "album"]);
    })
  );
}

export function isSong(song: unknown): song is Song {
  return checkObjectProps(song, ["duration", "album"]);
}

export function isListType(val: string | undefined): val is ListType {
  return val === "all" || val === "playlist" || val === "favourites";
}
