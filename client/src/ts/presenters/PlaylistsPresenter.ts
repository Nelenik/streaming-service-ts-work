import { PlaylistComp, PlaylistsList } from "components/playlists";
import { Component, Presenter } from "core";
import { Models, Playlists } from "types";
import { formPlaylistViewData } from "helpers";

type PlaylistModels = Pick<Models, "userApi">;

export class PlaylistPresenter extends Presenter {
  public playlistsComponent!: Component;
  private playlistsList: Playlists = [];

  constructor(private models: PlaylistModels) {
    super();
  }

  init() {
    this.playlistsComponent = new PlaylistsList().mount(".main", "append");
  }

  async getActualPlaylists() {
    const { userApi } = this.models;
    this.playlistsList = await userApi.getPlaylists();
  }

  async mountPlaylists() {
    for (const playlist of this.playlistsList) {
      const playlistOptions = await formPlaylistViewData(playlist);
      new PlaylistComp(playlistOptions).mount(".playlist__list", "append");
    }
  }
}
