import { ListType } from "types";

export const CustomEvents = new Map();

CustomEvents.set(
  "rerenderTrackList",
  (detail: { listType: ListType; id: null | number }) =>
    new CustomEvent("rerenderTrackList", { detail })
);
