import { AddToPlaylist, RemoveFromPlaylist } from "components/modals";
import { Like, SongComponent, SongMenu } from "components/songs";
import { Component, Presenter } from "core";
import { Song } from "mocks";
import { Modal } from "services";

type ModalType = "add" | "remove";

export class SongPresenter extends Presenter {
  component: Component;

  constructor(
    public songData: Song,
    public num: number,
    public inPlaylist: boolean
  ) {
    super();
    this.init();
  }

  init() {
    this.component = new SongComponent({
      data: this.songData,
      num: this.num,
    }).mount(".tracks__list", "append");

    //render like component
    const likeParent = this.component.element.querySelector(
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
    }).mount(this.component.element, "append");
  }

  likeHandler(component: Component) {
    component.options = {
      ...component.options,
      isLiked: !component.options.isLiked,
    };
  }

  openModal(type: ModalType) {
    console.log(this.songData.id);
    const close = Modal.instance.close.bind(Modal.instance);
    switch (type) {
      case "add": {
        const addModal = new AddToPlaylist({ closeModal: close });
        Modal.instance.open(addModal);
        addModal.element.classList.add("show");
        break;
      }
      case "remove": {
        const removeModal = new RemoveFromPlaylist({ closeModal: close });
        Modal.instance.open(removeModal);
        removeModal.element.classList.add("show");
      }
    }
  }
}
