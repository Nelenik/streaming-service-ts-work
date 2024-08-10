import { Component } from "core";
import { html } from "helpers";

export class PlaylistsList extends Component {
  getTemplate(): string {
    return html`
      <section class="playlist section tabs-content" data-target="playlists">
        <h2 class="playlist__h2 visually-hidden">Плейлисты</h2>
        <ul class="playlist__list"></ul>
      </section>
    `;
  }
}
