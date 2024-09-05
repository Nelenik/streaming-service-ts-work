import { Song } from "types";

export function checkLike(song: Song, currUsername: string): boolean {
  return song.likes.some((el) => el.username === currUsername);
}
