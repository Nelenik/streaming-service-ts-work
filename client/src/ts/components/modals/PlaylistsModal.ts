import { Component, ComponentOptions } from "core";
import { html } from "helpers";
import { Modal } from "services";
import playlistImg from "img/playlists(1).jpg";

type ModalType = "add" | "remove";
interface PlaylsistModalOptions extends ComponentOptions {
  type: ModalType;
  onRemove?: () => void;
  onAdd?: () => void;
}

export class PlaylsistModal extends Component<PlaylsistModalOptions> {
  addTemplate() {
    return html`
      <div class="playlists-modal">
        <div class="playlists-modal__content">
          <div class="playlists-modal__title">Добавить в плейлист</div>
          <div class="playlists-modal__playlist_content">
            <div class="playlists-modal__playlist">
              <img
                src="${playlistImg}"
                alt="Gangsta's Paradise"
                class="playlists-modal__playlist__image"
              />
              <div class="playlists-modal__playlist__title">Плейлист #1</div>
              <div class="playlists-modal__playlist__info">Нет треков</div>
            </div>
            <div class="playlists-modal__playlist">
              <img
                src="${playlistImg}"
                alt="Gangsta's Paradise"
                class="playlists-modal__playlist__image"
              />
              <div class="playlists-modal__playlist__title">Плейлист #2</div>
              <div class="playlists-modal__playlist__info">Нет треков</div>
            </div>
            <div class="playlists-modal__playlist">
              <img
                src="${playlistImg}"
                alt="Gangsta's Paradise"
                class="playlists-modal__playlist__image"
              />
              <div class="playlists-modal__playlist__title">Плейлист #3</div>
              <div class="playlists-modal__playlist__info">Нет треков</div>
            </div>
            <div class="playlists-modal__playlist">
              <img
                src="${playlistImg}"
                alt="Gangsta's Paradise"
                class="playlists-modal__playlist__image"
              />
              <div class="playlists-modal__playlist__title">Плейлист #4</div>
              <div class="playlists-modal__playlist__info">Нет треков</div>
            </div>
            <div class="playlists-modal__playlist">
              <img
                src="${playlistImg}"
                alt="Gangsta's Paradise"
                class="playlists-modal__playlist__image"
              />
              <div class="playlists-modal__playlist__title">Плейлист #5</div>
              <div class="playlists-modal__playlist__info">Нет треков</div>
            </div>
            <div class="playlists-modal__playlist">
              <img
                src="${playlistImg}"
                alt="Gangsta's Paradise"
                class="playlists-modal__playlist__image"
              />
              <div class="playlists-modal__playlist__title">Плейлист #6</div>
              <div class="playlists-modal__playlist__info">Нет треков</div>
            </div>
            <div class="playlists-modal__playlist">
              <img
                src="${playlistImg}"
                alt="Gangsta's Paradise"
                class="playlists-modal__playlist__image"
              />
              <div class="playlists-modal__playlist__title">Плейлист #7</div>
              <div class="playlists-modal__playlist__info">Нет треков</div>
            </div>
            <div class="playlists-modal__playlist">
              <img
                src="${playlistImg}"
                alt="Gangsta's Paradise"
                class="playlists-modal__playlist__image"
              />
              <div class="playlists-modal__playlist__title">Плейлист #8</div>
              <div class="playlists-modal__playlist__info">Нет треков</div>
            </div>
          </div>
          <div class="playlists-modal__footer">
            <button class="playlists-modal__btn playlists-modal__close-btn">
              Отменить
            </button>
          </div>
        </div>
      </div>
    `;
  }
  removeTemplate() {
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
  getTemplate(): string {
    const { type } = this.options;
    switch (type) {
      case "add":
        return this.addTemplate();
      case "remove":
        return this.removeTemplate();
    }
  }

  setHandlers(): void {
    this.onClick();
    this.onEsc();
  }

  onClick() {
    // const { onAdd, onRemove } = this.options;
    this.on("click", this.element, (e) => {
      const target = e.target;
      if (!(target instanceof Element)) return;
      if (
        target.closest(".playlists-modal__close-btn") ||
        !target.closest(".playlists-modal__content")
      ) {
        this.close();
      }
    });
  }

  onEsc(): void {
    this.on("keyup", document, (e: KeyboardEvent) => {
      if (e.code !== "Escape") return;
      this.close();
    });
  }

  close() {
    this.element.classList.remove("show");
    setTimeout(Modal.instance.close, 500);
  }
}
