import { SongMenu, SongsList } from "components/songs";
import { Component, Presenter } from "core";
import { SongPresenter } from "./SongPresenter";
import { isSongList, ListType, Models, Song } from "types";
import { PlaylistActions, SongActions } from "models";

export type ActiveDrop = {
  active: SongMenu | null;
  setActive: (current: SongMenu | null) => void;
};

export class SongsListPresenter extends Presenter {
  songsListComponent!: Component;
  songsList: Song[] = [];
  playlistId: number | null = null;

  //active dropdown state
  activeDropState: ActiveDrop = {
    active: null,
    setActive(current) {
      this.active = current;
    },
  };

  constructor(private models: Models) {
    super();
    console.log("song list presenter initialized");

    //handler that closes the active dropdown when clicked outside of it. removed from the component, because unnecessary handlers are hanged on the document.
    document.addEventListener("click", (e) => {
      const target = e.target;
      if (!(target instanceof Element)) return;
      if (
        !target.closest(".tracks__item__drop") &&
        this.activeDropState.active
      ) {
        this.activeDropState.active.isOpen = false;
      }
    });
  }

  async init() {
    this.songsListComponent = new SongsList().mount(".main", "append");
  }

  mountSongs() {
    this.songsList.forEach((song, i) => {
      new SongPresenter(
        song,
        i + 1,
        Boolean(this.playlistId),
        this.models,
        this.activeDropState
      );
    });
  }

  async getActualList(listType: ListType, playlistId: number | null) {
    this.playlistId = playlistId;

    const { userApi, songApi, playlistApi } = this.models;
    switch (listType) {
      case "all": {
        const result = await songApi.handleSongsAction(SongActions.FETCH_ALL);
        if (isSongList(result)) {
          this.songsList = result;
        }
        break;
      }
      case "favourites": {
        this.songsList = (await userApi.getUserLikes()).songLikes;
        break;
      }
      case "playlist": {
        if (!playlistId) break;

        const result = await playlistApi.handlePlaylistsAction(
          PlaylistActions.FETCH_SONGS,
          { playlistId }
        );
        if (isSongList(result)) {
          this.songsList = result;
        }
      }
    }
  }
}
