import { AddSongModal, BaseModal, RemoveSongModal } from "components/modals";
import { Like, SongComponent, SongMenu } from "components/songs";
import { Component, Presenter } from "core";
import { CustomEvents, ImageService, Modal, router } from "services";
import { isSong, Models, Song } from "types";
import { SongActions } from "models";
import noImage from "img/no-image.jpg";
import { ActiveDrop } from "./SongsListPresenter";
import { wait } from "helpers";

type ModalType = "add" | "remove";

export class SongPresenter extends Presenter {
  songComponent!: Component;
  likeComponent!: Component;

  constructor(
    private songData: Song,
    private ordinalNum: number,
    private inPlaylist: boolean,
    private models: Models,
    private activeDropState: ActiveDrop
  ) {
    super();
    // this.init();
    console.log("song presenter initialized");
  }

  async init() {
    await this.renderSongComponent();
    this.renderLikeComponent();
    this.renderSongMenu();
  }

  private async renderSongComponent() {
    const { id, duration, createdAt, name, artist, album, image } =
      this.songData;

    const result = await ImageService.instance.invokeUrl(image);
    const cover = result ? result : noImage;
    this.songComponent = new SongComponent({
      id: id,
      duration,
      createdAt,
      cover,
      name,
      artistName: artist.name,
      albumName: album.name,
      ordinalNum: this.ordinalNum,
    }).mount(".tracks__list", "append");
  }

  private renderLikeComponent() {
    if (!this.songComponent.element) return;
    const likeParent = this.songComponent.element.querySelector(
      ".tracks__item__data"
    );

    new Like({
      isLiked: this.isLiked(this.songData),
      onLike: this.likeHandler.bind(this),
    }).mount(likeParent, "append");
  }

  private renderSongMenu() {
    new SongMenu({
      inPlaylist: this.inPlaylist,
      onMenuClick: this.openModal.bind(this),
      setActiveDrop: this.activeDropState.setActive.bind(this.activeDropState),
    }).mount(this.songComponent.element, "append");
  }

  private isLiked(song: Song): boolean {
    return song.likes.some(
      (el) => el.username === this.models.userApi.currUsername
    );
  }
  //handlers
  private async likeHandler(component: Component) {
    const { songApi } = this.models;
    const { id } = this.songData;
    const isLiked = component.options.isLiked;
    const result = isLiked
      ? await songApi.handleSongsAction(SongActions.UNLIKE, id)
      : await songApi.handleSongsAction(SongActions.LIKE, id);

    const currentLocation = router.getCurrentLocation();
    if (isLiked && currentLocation.url === "songs/favourites") {
      const rerenderEvent = CustomEvents.get("rerenderFavorites");
      window.dispatchEvent(rerenderEvent);
    } else if (isSong(result)) {
      component.options = {
        ...component.options,
        isLiked: this.isLiked(result),
      };
    }
  }

  openModal(type: ModalType) {
    console.log(this.songData.id);
    let content: Component;
    switch (type) {
      case "add":
        content = new AddSongModal();
        break;
      case "remove":
        content = new RemoveSongModal();
        break;
    }
    const modal = new BaseModal({ content });
    Modal.instance.open(modal);
    console.log(Modal.instance.openedComponent);
    wait(0).then(() => {
      modal.element?.classList.add("show");
    });
  }
}
