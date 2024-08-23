import { Component, ComponentOptions } from "core";
import { html, wait } from "helpers";
import { Modal } from "services";

interface BaseModalOptions extends ComponentOptions {
  content: Component;
}

export class BaseModal extends Component<BaseModalOptions> {
  constructor(options: BaseModalOptions) {
    super(options);

    this.options.content.mount(this.element, "append");
  }
  getTemplate(): string {
    return html` <div class="playlists-modal"></div> `;
  }

  setHandlers(): void {
    if (!this.element) return;
    this.on("click", this.element, this.onClickHandler.bind(this));

    this.on("keyup", document, this.onEscHandler.bind(this));
  }

  onClickHandler(e: Event) {
    const target = e.target;
    if (!(target instanceof Element)) return;
    if (
      target.closest(".playlists-modal__close-btn") ||
      !target.closest(".playlists-modal__content")
    ) {
      this.close();
    }
  }
  onEscHandler(e: KeyboardEventInit) {
    if (e.code !== "Escape") return;
    this.close();
  }

  close() {
    this.element?.classList.remove("show");
    wait(500).then(() => Modal.instance.close());
  }
}
