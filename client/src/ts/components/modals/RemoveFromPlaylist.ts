import { Component, ComponentOptions } from "core";
import { html } from "helpers";
// import { Modal } from "services";
import "styles/modal-base.scss";
interface RemoveOptions extends ComponentOptions {
  // onDel: () => void;
  closeModal: () => void;
}

export class RemoveFromPlaylist extends Component<RemoveOptions> {
  getTemplate(): string {
    return html`
      <div class="playlists-modal">
        <div class="playlists-modal__content">
          <div class="playlists-modal__title">Удалить из плейлиста?</div>
          <div class="playlists-modal__footer">
            <button class="playlists-modal__btn playlists-modal__confirm-btn">
              Да
            </button>
            <button class="playlists-modal__btn playlists-modal__close-btn">
              Отменить
            </button>
          </div>
        </div>
      </div>
    `;
  }
  setHandlers(): void {
    this.onCloseClick();
  }

  onCloseClick() {
    const { closeModal } = this.options;
    const closeBtn = this.element.querySelector(".playlists-modal__close-btn");
    this.on("click", closeBtn, closeModal);
  }
}
