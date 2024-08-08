import { Component } from "core";

export class Layout extends Component {
  constructor() {
    super();
    // this.mount("#app", "append");
  }
  getTemplate(): string {
    return /*html*/ `
    <div class="content-wrap flex">
      <main class="main">
      </main>
    </div>
  `;
  }
}
