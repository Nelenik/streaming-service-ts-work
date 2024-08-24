import { PlaylistComp, PlaylistsList } from "components/playlists";
import { Component, Presenter } from "core";
import { formPlaylistViewData } from "helpers";
import { DataStore } from "services";

export class PlaylistPresenter extends Presenter {
  public playlistsComponent!: Component;

  init() {
    this.playlistsComponent = new PlaylistsList().mount(".main", "append");
  }

  async mountPlaylists() {
    for (const playlist of DataStore.instance.getPlaylists()) {
      const playlistOptions = await formPlaylistViewData(playlist);
      new PlaylistComp(playlistOptions).mount(".playlist__list", "append");
    }
  }
}
