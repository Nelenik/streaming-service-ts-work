import { Aside } from "components/aside";
import { Layout } from "components/layout";
import { Component, Presenter } from "core";
import { PlaylistModel, SongModel, UserModel } from "models";
import { PlaylistPresenter, SongsListPresenter } from "presenters";
import { isPlaylists, isSongList, ListType } from "types";
import { DataStore } from "services";

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
    window.addEventListener("rerenderTrackList", async (e: CustomEventInit) => {
      const { listType, id } = e.detail;
      await this.drawSongsList(listType, id);
    });
    //rerender playlists or tracklists on filter
    window.addEventListener("onFilter", async (e: CustomEventInit) => {
      const { filtredData } = e.detail;
      this.cleanMainBlock();
      if (isSongList(filtredData)) {
        this.songsListPresInst?.init();
        await this.songsListPresInst?.mountSongs(filtredData);
      } else if (isPlaylists(filtredData)) {
        await this.drawPlaylists();
      }
    });
  }

  cleanMainBlock() {
    const main = this.layoutComponent.element?.querySelector(".main");
    main?.replaceChildren();
  }

  async drawSongsList(listType: ListType, playlistId: number | null = null) {
    this.cleanMainBlock();
    if (!this.songsListPresInst) {
      this.songsListPresInst = new SongsListPresenter(this.models);
    }
    await this.songsListPresInst.getActualList(listType, playlistId);
    this.songsListPresInst.init();
    await this.songsListPresInst.mountSongs(DataStore.instance.getSongsList());
  }

  async drawPlaylists() {
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
