import { Component } from "core";
import { html } from "helpers";

export class Search extends Component {
  getTemplate(): string {
    return html`
      <div class="header__search">
        <input
          class="header__search__field"
          type="search"
          placeholder="ЧТО БУДЕМ ИСКАТЬ?"
        />
      </div>
    `;
  }
}
