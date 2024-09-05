import { Component, ComponentOptions } from "core";
import { html } from "helpers";

interface SearchOptions extends ComponentOptions {
  onInput: (value: string) => void;
}

export class Search extends Component<SearchOptions> {
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

  setHandlers(): void {
    const { onInput } = this.options;
    const input = this.element?.querySelector(".header__search__field");
    if (!(input instanceof Element)) return;
    this.on("input", input, (e: Event) => {
      const target = e.currentTarget as HTMLInputElement;
      const value = target.value;
      onInput(value);
    });
  }
}
