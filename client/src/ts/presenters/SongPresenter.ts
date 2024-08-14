import { PlaylsistModal } from "components/modals";
import { Like, SongComponent, SongMenu } from "components/songs";
import { Component, Presenter } from "core";
import { Song } from "mocks";
import { Modal } from "services";

type ModalType = "add" | "remove";

export class SongPresenter extends Presenter {
  songComponent!: Component;

  constructor(
    public songData: Song,
    public num: number,
    public inPlaylist: boolean
  ) {
    super();
    this.init();
  }

  init() {
    this.songComponent = new SongComponent({
      data: this.songData,
      num: this.num,
    }).mount(".tracks__list", "append");
    if (!this.songComponent.element) return;

    //render like component
    const likeParent = this.songComponent.element.querySelector(
      ".tracks__item__data"
    );
    new Like({
      isLiked: true,
      onLike: this.likeHandler,
    }).mount(likeParent, "append");

    //render menu
    new SongMenu({
      inPlaylist: true,
      onMenuClick: this.openModal.bind(this),
    }).mount(this.songComponent.element, "append");
  }

  likeHandler(component: Component) {
    component.options = {
      ...component.options,
      isLiked: !component.options.isLiked,
    };
  }

  openModal(type: ModalType) {
    console.log(this.songData.id);
    const modal = new PlaylsistModal({ type });
    Modal.instance.open(modal);
    modal.element?.classList.add("show");
  }
}
