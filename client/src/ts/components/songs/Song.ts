import { Component, ComponentOptions } from "core";
import { getSongDurStr, getDaysAgo } from "helpers";
import { images, Song } from "mocks";

interface SongOptions extends ComponentOptions {
  data: Song;
  num: number;
}

export class SongComponent extends Component<SongOptions> {
  getTemplate(): string {
    const { data, num } = this.options;
    const path = images.find((el: string) => el.includes(data.image));
    const trackDur = getSongDurStr(data.duration);
    const daysAgo = getDaysAgo(data.createdAt);

    return /*html*/ `
      <li class="tracks__item flex">
        <div class="tracks__item__number">${num}</div>
        <div class="tracks__item__name"><img class="track__img" src="${path}" alt="In Bloom">
          <div class="track__content">
            <h3 class="track__name"><a class="track__name__link" href="#">${data.name}</a></h3><span class="track__author">${data.artist.name}</span>
          </div>
        </div>
        <div class="tracks__item__albom">${data.album.name}</div>
        <div class="tracks__item__data flex">
          <span class="data__text">${daysAgo}</span>
        </div>
        <time class="tracks__item__time">${trackDur}</time>
        <div class="tracks__item__drop">
          <button class="track__btn-dropdown"><svg width="23" height="4" viewBox="0 0 23 4" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="2" cy="2" r="2" fill="#C4C4C4" />
              <circle cx="11.5" cy="2" r="2" fill="#C4C4C4" />
              <circle cx="21" cy="2" r="2" fill="#C4C4C4" />
            </svg>
          </button>
          <div class="track__dropdown">
            <button class="track__add-btn">Добавить в плейлист</button>
            <button class="track__delete-btn">Удалить из плейлиста</button>
          </div>
        </div>
      </li>
    `;
  }
}
