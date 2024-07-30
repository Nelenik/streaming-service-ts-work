import { Aside } from "components/aside";
import { PlaylistPage } from "components/playlists";
// import { playlistsPage } from "components/playlists";
import { SongsPage } from "components/songs";
import { Component } from "core";

export class Layout extends Component {
  getTemplate(): string {
    return `
    <div class="content-wrap flex">
      <main class="main">
      </main>
    </div>
  `;
  }
  renderParts() {
    this.insertChildren(".main", new Aside().element, "before");
    this.insertChildren(".main", new SongsPage().element, "append");
    this.insertChildren(".main", new PlaylistPage().element, "append");
  }
}
