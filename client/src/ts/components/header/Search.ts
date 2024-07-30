import { Component } from "core";

export class Search extends Component {
  getTemplate(): string {
    return `
    <div class="header__search">
      <input class="header__search__field" type="search" placeholder="ЧТО БУДЕМ ИСКАТЬ?">
    </div>
  `;
  }
}
