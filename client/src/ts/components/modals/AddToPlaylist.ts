import { Component, ComponentOptions } from "core";
import { html } from "helpers";
import playlistImg from "img/playlists(1).jpg";

interface AddOptions extends ComponentOptions {
  closeModal: () => void;
}

export class AddToPlaylist extends Component<AddOptions> {
  getTemplate(): string {
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
}
