import { Component, ComponentOptions } from "core";
import { html } from "helpers";

interface TrackNameOptions extends ComponentOptions {
  id: number;
  cover: string;
  name: string;
  artist: string;
}

export class TrackName extends Component<TrackNameOptions> {
  getTemplate(): string {
    const { id, cover, name, artist } = this.options;
    return html`
      <div class="player__track-name flex">
        <img class="player__track__img" src=${cover} alt=${artist} />
        <div class="player__track-name__content">
          <div class="flex player__name__header">
            <h3 class="player__track__h3">${name}</h3>
          </div>
          <p class="player__track__author">${artist}</p>
        </div>
      </div>
    `;
  }
}
