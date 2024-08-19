import { Playlist, PlaylistsList } from "components/playlists";
import { Component, Presenter } from "core";
import { playlists } from "mocks";

export class PlaylistPresenter extends Presenter {
  public playlistsComponent!: Component;

  constructor() {
    super();
    console.log("playlist presenter initialized");
  }

  init() {
    this.playlistsComponent = new PlaylistsList().mount(".main", "append");
    playlists.forEach((playlist) => {
      new Playlist({ data: playlist }).mount(".playlist__list", "append");
    });
  }
}
