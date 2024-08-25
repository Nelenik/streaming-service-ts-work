import { ListType, Playlists, Song } from "types";
export const EventBus = new EventTarget();

export const CustomEvents = new Map();

//rerender tracklist on different changes than need update
CustomEvents.set(
  "rerenderTrackList",
  (detail: { listType: ListType; id: null | number }) =>
    new CustomEvent("rerenderTrackList", { detail })
);

//rerender page on filter
CustomEvents.set(
  "onFilter",
  (detail: { filtredData: Playlists[] | Song[] }) =>
    new CustomEvent("onFilter", { detail })
);

//synchronization between likes in playlist and in player
CustomEvents.set(
  "songLike",
  (detail: { songId: number; isLiked: boolean }) =>
    new CustomEvent("songLike", { detail })
);
