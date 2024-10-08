import { PlaylistOptions } from "components/playlists";
import { html } from "helpers";
import { BaseModal, BaseModalOptions } from "./BaseModal";

interface AddSongModalOptions extends BaseModalOptions {
  playlistsToRender: PlaylistOptions[];
  onAdd: (playlistId: number) => Promise<void>;
}

export class AddSongModal extends BaseModal<AddSongModalOptions> {
  getTemplate(): string {
    return html`
      <div class="playlists-modal">
        <div class="playlists-modal__content">
          <div class="playlists-modal__title">Добавить в плейлист</div>
          <div class="playlists-modal__playlist_content">
            ${this.getPlaylistElements()}
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

  getPlaylistElements(): string {
    const { playlistsToRender } = this.options;
    return playlistsToRender
      .map((data) => {
        const { id, cover, name, songsCountStr } = data;
        return html`
          <div class="playlists-modal__playlist">
            <img
              src="${cover}"
              alt="Gangsta's Paradise"
              class="playlists-modal__playlist__image"
            />
            <button
              class="playlists-modal__playlist__title add-song-trigger"
              data-playlist-id="${id}"
            >
              ${name}
            </button>
            <div class="playlists-modal__playlist__info">${songsCountStr}</div>
          </div>
        `;
      })
      .join(" ");
  }

  setHandlers(): void {
    super.setHandlers();
    this.addOnClick();
    this.closeOnBtnClick(".playlists-modal__close-btn");
  }

  addOnClick(): void {
    const { onAdd } = this.options;
    const btns = this.element?.querySelectorAll(".add-song-trigger");
    btns?.forEach((el) => {
      this.on("click", el, async () => {
        if (!(el instanceof HTMLElement)) return;
        const playlistId = Number(el.dataset.playlistId);
        await onAdd(playlistId);
      });
    });
  }
}
