import { Song, songsList } from "mocks";
import { Component } from "core";
import { SongComponent } from "./Song";

export class SongsPage extends Component {
  getTemplate(): string {
    return `
    <section class="tracks section tabs-content section--active" data-target="tracks">
      <h2 class="tracks__h2 title__h2">Треки</h2>
      <div class="tracks__content">
        <div class="tracks__header flex">
          <div class="tracks__header__number">№</div>
          <div class="tracks__header__name">НАЗВАНИЕ</div>
          <div class="tracks__header__albom">АЛЬБОМ</div>
          <div class="tracks__header__data"><svg width="12" height="13" viewBox="0 0 12 13" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M11 1.5H1C0.723858 1.5 0.5 1.72386 0.5 2V12C0.5 12.2761 0.723858 12.5 1 12.5H11C11.2761 12.5 11.5 12.2761 11.5 12V2C11.5 1.72386 11.2761 1.5 11 1.5Z" stroke="#A4A4A4" stroke-linecap="round" stroke-linejoin="round" />
              <path d="M9 0.5V2.5" stroke="#A4A4A4" stroke-linecap="round" stroke-linejoin="round" />
              <path d="M3 0.5V2.5" stroke="#A4A4A4" stroke-linecap="round" stroke-linejoin="round" />
              <path d="M0.5 4.5H11.5" stroke="#A4A4A4" stroke-linecap="round" stroke-linejoin="round" />
            </svg>
          </div>
          <div class="tracks__header__time"><svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M7 13C10.3137 13 13 10.3137 13 7C13 3.68629 10.3137 1 7 1C3.68629 1 1 3.68629 1 7C1 10.3137 3.68629 13 7 13Z" stroke="#A4A4A4" stroke-miterlimit="10" />
              <path d="M7 3.5V7H10.5" stroke="#A4A4A4" stroke-linecap="round" stroke-linejoin="round" />
            </svg>
          </div>
        </div>
        <ul class="tracks__list">
        </ul>
      </div>
    </section>
  `;
  }
  renderParts(): void {
    const songsComponents = songsList.map(
      (song: Song, i: number) =>
        new SongComponent({ data: song, num: i, isLiked: true })
    );
    this.insertChildren(".tracks__list", songsComponents, "append");
  }
}
