import { Aside } from "components/aside";
import { PlaylistsList } from "components/playlists";
// import { playlistsPage } from "components/playlists";
import { SongsList } from "components/songs";
import { Component } from "core";

export class Layout extends Component {
  constructor() {
    super();
    this.mount("#app", "append");
  }
  getTemplate(): string {
    return `
    <div class="content-wrap flex">
      <main class="main">
      </main>
    </div>
  `;
  }
}
