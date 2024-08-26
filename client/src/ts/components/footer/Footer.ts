import { Component } from "core";
import { html } from "helpers";

export class Footer extends Component {
  getTemplate(): string {
    return html`
      <footer class="footer">
        <div class="player flex"></div>
      </footer>
    `;
  }
}
