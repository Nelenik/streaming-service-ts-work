import { Component } from "core";
import { playlists } from "mocks";
import { Playlist } from "./Playlist";

export class PlaylistPage extends Component {
  getTemplate(): string {
    return `
    <section class="playlist section tabs-content" data-target="playlists">
      <h2 class="playlist__h2 visually-hidden">Плейлисты</h2>
      <ul class="playlist__list">
      </ul>
    </section>
  `;
  }
  renderParts(): void {
    const playlistsElems = playlists.map((data) => new Playlist({ data }));
    this.insertChildren(".playlist__list", playlistsElems, "append");
  }
}
