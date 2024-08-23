import { Component, ComponentOptions } from "core";
import { html } from "helpers";

interface RemoveSongModalOptions extends ComponentOptions {}

export class RemoveSongModal extends Component<RemoveSongModalOptions> {
  getTemplate(): string {
    return html`
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
    `;
  }
}
