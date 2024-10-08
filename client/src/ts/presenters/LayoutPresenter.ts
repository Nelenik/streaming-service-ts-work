import { Aside } from "components/aside";
import { Layout } from "components/layout";
import { Component, Presenter } from "core";
import { PlaylistModel, SongModel, UserModel } from "models";
import { PlaylistPresenter, SongsListPresenter } from "presenters";
import { isPlaylists, isSongList, ListType, Playlists, Song } from "types";
import { EventBus } from "services";
import { DataStore } from "storages";

interface LayoutPresenterModels {
  userApi: UserModel;
  songApi: SongModel;
  playlistApi: PlaylistModel;
}

export class LayoutPresenter extends Presenter {
  layoutComponent!: Component;
  songsListPresInst: SongsListPresenter | null = null;
  playlistPresInst: PlaylistPresenter | null = null;

  constructor(private models: LayoutPresenterModels) {
    super();
  }

  async init() {
    const { userApi } = this.models;
    const userPlaylists = await userApi.getPlaylists();
    DataStore.instance.storePlaylists(userPlaylists);

    this.layoutComponent = new Layout().mount("#app", "append");

    new Aside({ userPlaylists }).mount(".content-wrap", "prepend");

    //rerender of the tracklist on unlike or on removing from the playlist
    EventBus.addEventListener("rerenderTrackList", this.onRerenderList);
    //rerender playlists or tracklists on filter
    EventBus.addEventListener("onFilter", this.onFilter);
  }

  //eventBus handlers
  onFilter = async (e: Event) => {
    const customEvent = e as CustomEvent<{ filtredData: Playlists[] | Song[] }>;
    const { filtredData } = customEvent.detail;
    this.cleanMainBlock();
    if (isSongList(filtredData)) {
      this.songsListPresInst?.init();
      await this.songsListPresInst?.mountSongs(filtredData);
    } else if (isPlaylists(filtredData)) {
      this.playlistPresInst?.init();
      await this.playlistPresInst?.mountPlaylists(filtredData);
    }
  };
  onRerenderList = async (e: Event) => {
    const customEvent = e as CustomEvent<{
      listType: ListType;
      id: null | number;
    }>;
    const { listType, id } = customEvent.detail;
    await this.drawSongsList(listType, id);
  };

  cleanMainBlock(): void {
    const main = this.layoutComponent.element?.querySelector(".main");
    main?.replaceChildren();
  }

  async drawSongsList(
    listType: ListType,
    playlistId: number | null = null
  ): Promise<void> {
    this.cleanMainBlock();
    if (!this.songsListPresInst) {
      this.songsListPresInst = new SongsListPresenter(this.models);
    }
    await this.songsListPresInst.getActualList(listType, playlistId);
    this.songsListPresInst.init();
    await this.songsListPresInst.mountSongs(DataStore.instance.getSongsList());
  }

  async drawPlaylists(): Promise<void> {
    this.cleanMainBlock();
    if (!this.playlistPresInst) {
      this.playlistPresInst = new PlaylistPresenter();
    }
    this.playlistPresInst.init();
    await this.playlistPresInst.mountPlaylists(
      DataStore.instance.getPlaylists()
    );
  }
}
