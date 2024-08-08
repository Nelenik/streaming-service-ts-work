import { Component, ComponentOptions } from "core";
import { getWordEndigs } from "helpers";
import { images, PlaylistData } from "mocks";

interface PlaylistOptions extends ComponentOptions {
  data: PlaylistData;
}

export class Playlist extends Component<PlaylistOptions> {
  constructor(options: PlaylistOptions) {
    super(options);
    // this.mount(".playlist__list", "append");
  }
  getTemplate(): string {
    const { data } = this.options;
    const basePath = images.find((el) => el.includes(data.cover.base));
    const _360Path = images.find((el) => el.includes(data.cover._360));
    const _1440Path = images.find((el) => el.includes(data.cover._1440));
    const songsCount = data.songs.length
      ? getWordEndigs(data.songs.length, ["трек", "трека", "треков"])
      : "Плейлист пока пуст";

    return /*html*/ `
    <li class="playlist__item">
      <picture>
        <source srcset="${_360Path}" media="(max-width: 576px)">
        <source srcset="${_1440Path}" media="(max-width: 1440px)">
        <img class="playlist__img" src="${basePath}" alt="${data.name}">
      </picture>
      <div class="playlist__content">
        <h3 class="playlist__h3"><a class="playlist__h3__link" href="/">${data.name}</a></h3><span class="playlist__count">${songsCount}</span>
      </div>
    </li>
  `;
  }
}
