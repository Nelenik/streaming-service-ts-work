import { Component } from "core";

export class Search extends Component {
  constructor() {
    super();
    // this.mount(".header", "append");
  }
  getTemplate(): string {
    return /*html*/ `
    <div class="header__search">
      <input class="header__search__field" type="search" placeholder="ЧТО БУДЕМ ИСКАТЬ?">
    </div>
  `;
  }
}
