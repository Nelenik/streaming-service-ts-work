import { Component, ComponentOptions } from "core";
import { getWordEndigs, html } from "helpers";
// import { router } from "services";

interface PlaylistOptions extends ComponentOptions {
  id: number;
  name: string;
  songsCount: number;
  // data: Playlist;
  cover: string | undefined;
}

export class PlaylistComp extends Component<PlaylistOptions> {
  getTemplate(): string {
    const { id, name, songsCount, cover } = this.options;

    const songsCountStr = songsCount
      ? `${songsCount} ` +
        getWordEndigs(songsCount, ["трек", "трека", "треков"])
      : "Плейлист пока пуст";

    return html`
      <li class="playlist__item">
        <picture>
          <img class="playlist__img" src="${cover}" alt="${name}" />
        </picture>
        <div class="playlist__content">
          <h3 class="playlist__h3">
            <a
              class="playlist__h3__link"
              href="/songs/playlist?id=${id}"
              data-navigo
              >${name}</a
            >
          </h3>
          <span class="playlist__count">${songsCountStr}</span>
        </div>
      </li>
    `;
  }
}
