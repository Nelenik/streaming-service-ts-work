import { PlaylistComp, PlaylistsList } from "components/playlists";
import { Component, Presenter } from "core";
// import { playlists } from "mocks";
import { Models, Playlists } from "types";
import { defImages } from "models";
import { ImageService } from "services";

type PlaylistModels = Pick<Models, "userApi">;

export class PlaylistPresenter extends Presenter {
  public playlistsComponent!: Component;
  private playlistsList: Playlists = [];

  constructor(private models: PlaylistModels) {
    super();
    console.log("playlist presenter initialized");
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
      const result = await ImageService.instance.invokeUrl(
        playlist.songs[0]?.image
      );
      const cover = result ? result : this.getRandomImg(8);
      new PlaylistComp({
        id: playlist.id,
        cover,
        name: playlist.name,
        songsCount: playlist.songs.length,
      }).mount(".playlist__list", "append");
    }
  }

  getRandomImg = (count: number): string => {
    const array: number[] = Array.from({ length: count }, (v, i) => i + 1);
    const randomInd: number = Math.floor(Math.random() * count);
    const randomNum: number = array[randomInd];
    return defImages.find((el) => el.includes(`playlists(${randomNum})`));
  };
}
