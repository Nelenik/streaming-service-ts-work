import { Component, ComponentOptions } from "core";
import { html, getSongDurStr, getDaysAgo } from "helpers";
import { CustomEvents, EventBus } from "services";

interface SongOptions extends ComponentOptions {
  songId: number;
  ordinalNum: number;
  duration: number;
  createdAt: string;
  cover: string;
  name: string;
  artistName: string;
  albumName: string;
}

export class SongComponent extends Component<SongOptions> {
  getTemplate(): string {
    const {
      ordinalNum,
      duration,
      createdAt,
      cover,
      name,
      artistName,
      albumName,
    } = this.options;
    const trackDur = getSongDurStr(duration);
    const daysAgo = getDaysAgo(createdAt);
    return html`
      <li class="tracks__item flex">
        <div class="tracks__item__number">${ordinalNum}</div>
        <div class="tracks__item__name">
          <img class="track__img" src="${cover}" alt="In Bloom" />
          <div class="track__content">
            <h3 class="track__name">
              <a class="track__name__link" href="#">${name}</a>
            </h3>
            <span class="track__author">${artistName}</span>
          </div>
        </div>
        <div class="tracks__item__albom">${albumName}</div>
        <div class="tracks__item__data flex">
          <span class="data__text">${daysAgo}</span>
        </div>
        <time class="tracks__item__time">${trackDur}</time>
      </li>
    `;
  }

  setHandlers(): void {
    const { songId } = this.options;
    const link = this.element?.querySelector(".track__name__link");
    if (!link || !(link instanceof Element)) return;
    this.on("click", link, (e: Event) => {
      e.preventDefault();
      const playSongEvent = CustomEvents.get("playSong")({
        songId,
      });
      EventBus.dispatchEvent(playSongEvent);
    });
  }
}
