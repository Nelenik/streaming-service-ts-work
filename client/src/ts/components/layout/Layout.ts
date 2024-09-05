import { Component } from "core";
import { html } from "helpers";

export class Layout extends Component {
  getTemplate(): string {
    return html`
      <div class="content-wrap flex">
        <main class="main"></main>
      </div>
    `;
  }
}
