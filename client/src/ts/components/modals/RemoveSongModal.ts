import { Component, ComponentOptions } from "core";
import { html } from "helpers";
import { router } from "services";

interface RemoveSongModalOptions extends ComponentOptions {
  onRemove: (playlistId: number) => Promise<void>;
}

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

  setHandlers(): void {
    const { onRemove } = this.options;
    const removeBtn = this.element?.querySelector(
      ".playlists-modal__confirm-btn"
    );
    if (!(removeBtn instanceof Element)) return;
    this.on("click", removeBtn, async () => {
      const currentLocation = router.getCurrentLocation();
      const playlistId = Number(currentLocation.params?.id);
      await onRemove(playlistId);
    });
  }
}
