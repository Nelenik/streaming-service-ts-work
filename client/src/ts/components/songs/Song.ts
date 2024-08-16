import { Component, ComponentOptions } from "core";
import { html, getSongDurStr, getDaysAgo } from "helpers";
import { Song } from "types";

interface SongOptions extends ComponentOptions {
  data: Song;
  num: number;
}

export class SongComponent extends Component<SongOptions> {
  getTemplate(): string {
    const { data, num } = this.options;
    const trackDur = getSongDurStr(data.duration);
    const daysAgo = getDaysAgo(data.createdAt);

    return html`
      <li class="tracks__item flex">
        <div class="tracks__item__number">${num}</div>
        <div class="tracks__item__name">
          <img class="track__img" src="${data.image}" alt="In Bloom" />
          <div class="track__content">
            <h3 class="track__name">
              <a class="track__name__link" href="#">${data.name}</a>
            </h3>
            <span class="track__author">${data.artist.name}</span>
          </div>
        </div>
        <div class="tracks__item__albom">${data.album.name}</div>
        <div class="tracks__item__data flex">
          <span class="data__text">${daysAgo}</span>
        </div>
        <time class="tracks__item__time">${trackDur}</time>
      </li>
    `;
  }
}
