import { ListType, Playlists, Song } from "types";

export const CustomEvents = new Map();

CustomEvents.set(
  "rerenderTrackList",
  (detail: { listType: ListType; id: null | number }) =>
    new CustomEvent("rerenderTrackList", { detail })
);

CustomEvents.set(
  "onFilter",
  (detail: { filtredData: Playlists[] | Song[] }) =>
    new CustomEvent("onFilter", { detail })
);
