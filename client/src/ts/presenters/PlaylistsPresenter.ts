import { PlaylistComp, PlaylistsList } from "components/playlists";
import { Component, Presenter } from "core";
import { formPlaylistViewData } from "helpers";
import { Playlists } from "types";

export class PlaylistPresenter extends Presenter {
  public playlistsComponent!: Component;

  init() {
    this.playlistsComponent = new PlaylistsList().mount(".main", "append");
  }

  async mountPlaylists(actualPlaylists: Playlists) {
    for (const playlist of actualPlaylists) {
      const playlistOptions = await formPlaylistViewData(playlist);
      new PlaylistComp(playlistOptions).mount(".playlist__list", "append");
    }
  }
}
