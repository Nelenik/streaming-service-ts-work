export const CustomEvents = new Map();

CustomEvents.set(
  "rerenderFavorites",
  new CustomEvent("rerenderFavorites", {
    detail: { listType: "favourites", id: null },
  })
);
