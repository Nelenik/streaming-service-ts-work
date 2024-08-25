import { SongMenu, SongsList } from "components/songs";
import { Component, Presenter } from "core";
import { SongPresenter } from "./SongPresenter";
import { isPlaylist, isSongList, ListType, Models, Song } from "types";
import { PlaylistActions, SongActions } from "models";
import { DataStore } from "services";

export type ActiveDrop = {
  active: SongMenu | null;
  setActive: (current: SongMenu | null) => void;
};

export class SongsListPresenter extends Presenter {
  songsListComponent!: Component;
  playlistId: number | null = null;
  listTitle: string = "Треки";

  //active dropdown state
  activeDropState: ActiveDrop = {
    active: null,
    setActive(current) {
      this.active = current;
    },
  };

  constructor(private models: Models) {
    super();

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

  init() {
    this.songsListComponent = new SongsList({ title: this.listTitle }).mount(
      ".main",
      "append"
    );
  }

  async mountSongs(actualSongList: Song[]) {
    for (let i = 0; i < actualSongList.length; i++) {
      const song = actualSongList[i];
      const songPresenter = new SongPresenter(
        song,
        i + 1,
        Boolean(this.playlistId),
        this.models,
        this.activeDropState
      );
      await songPresenter.init();
    }
  }

  async getActualList(listType: ListType, playlistId: number | null) {
    this.playlistId = playlistId;

    const { userApi, songApi, playlistApi } = this.models;
    switch (listType) {
      case "all": {
        const result = await songApi.handleSongsAction(SongActions.FETCH_ALL);
        if (isSongList(result)) {
          DataStore.instance.storeSongsList(result);
          this.listTitle = "Треки";
        }
        break;
      }
      case "favourites": {
        DataStore.instance.storeSongsList(
          (await userApi.getUserLikes()).songLikes
        );
        this.listTitle = "Избранное";
        break;
      }
      case "playlist": {
        if (!playlistId) break;

        const result = await playlistApi.handlePlaylistsAction(
          PlaylistActions.FETCH_ONE,
          { playlistId }
        );
        if (isPlaylist(result)) {
          DataStore.instance.storeSongsList(result.songs);
          this.listTitle = result.name;
        }
        break;
      }
    }
  }
}
