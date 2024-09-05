import { SongComponent, SongMenu } from "components/songs";
import { Component, Presenter } from "core";
import { ImageService } from "services";
import { Models, Song, ModalType } from "types";
import noImage from "img/no-image.jpg";
import { ActiveDrop } from "./SongsListPresenter";
import { LikePresenter, ModalPresenter } from "presenters";
import { checkLike } from "helpers";

export class SongPresenter extends Presenter {
  songComponent!: Component;
  modalPresenter: ModalPresenter | null = null;

  constructor(
    private songData: Song,
    private ordinalNum: number,
    private inPlaylist: boolean,
    private models: Models,
    private activeDropState: ActiveDrop
  ) {
    super();
  }

  async init(): Promise<void> {
    await this.renderSongComponent();
    this.renderLikeComponent();
    this.renderSongMenu();
  }

  private async renderSongComponent(): Promise<void> {
    const { id, duration, createdAt, name, artist, album, image } =
      this.songData;

    const result = await ImageService.instance.invokeUrl(image);
    const cover = result ? result : noImage;
    this.songComponent = new SongComponent({
      songId: id,
      duration: Math.trunc(duration / 1000),
      createdAt,
      cover,
      name,
      artistName: artist.name,
      albumName: album.name,
      ordinalNum: this.ordinalNum,
    }).mount(".tracks__list", "append");
  }

  private renderLikeComponent(): void {
    const { userApi } = this.models;
    if (!this.songComponent.element) return;
    const likeParent = this.songComponent.element.querySelector(
      ".tracks__item__data"
    );
    if (!(likeParent instanceof HTMLElement)) return;
    new LikePresenter(
      { userApi: this.models.userApi, songApi: this.models.songApi },
      likeParent,
      checkLike(this.songData, userApi.currUsername),
      this.songData.id
    ).init();
  }

  private renderSongMenu(): void {
    new SongMenu({
      inPlaylist: this.inPlaylist,
      onMenuClick: this.openModal.bind(this),
      setActiveDrop: this.activeDropState.setActive.bind(this.activeDropState),
    }).mount(this.songComponent.element, "append");
  }

  openModal(type: ModalType): void {
    this.modalPresenter = new ModalPresenter(type, this.songData.id, {
      userApi: this.models.userApi,
      playlistApi: this.models.playlistApi,
    });
    this.modalPresenter.init();
  }
}
