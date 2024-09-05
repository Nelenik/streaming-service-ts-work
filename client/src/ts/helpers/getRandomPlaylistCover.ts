import { defImages } from "helpers";

export const getRandomPlaylistCover = (count: number): string => {
  const array: number[] = Array.from({ length: count }, (v, i) => i + 1);
  const randomInd: number = Math.floor(Math.random() * count);
  const randomNum: number = array[randomInd];
  return defImages.find((el) => el.includes(`playlists(${randomNum})`));
};
