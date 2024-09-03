import { Component, ComponentOptions } from "core";
import { html, wait } from "helpers";
import { Modal } from "services";

export interface BaseModalOptions extends ComponentOptions {
  // content: Component;
  showingCssClass: string;
}

export class BaseModal<
  T extends BaseModalOptions = BaseModalOptions,
> extends Component<T> {
  getTemplate(): string {
    return html` <div></div> `;
  }

  open() {
    Modal.instance.open(this);
    wait(100).then(() => {
      this.element?.classList.add(this.options.showingCssClass);
    });
  }
  close() {
    this.element?.classList.remove(this.options.showingCssClass);
    wait(500).then(() => Modal.instance.close());
  }

  setHandlers(): void {
    this.closeOnEsc();
    this.closeOnOverlayClick();
  }

  closeOnEsc(): void {
    this.on("keyup", document, (e: KeyboardEventInit) => {
      if (e.code !== "Escape") return;
      this.close();
    });
  }

  closeOnOverlayClick(): void {
    if (!this.element) return;
    this.on("click", this.element, (e: Event) => {
      if (e.target === e.currentTarget) {
        this.close();
      }
    });
  }

  closeOnBtnClick(closeBtnSelector: string): void {
    const closeBtn = this.element?.querySelector(closeBtnSelector);
    if (closeBtn) {
      this.on("click", closeBtn, this.close.bind(this));
    }
  }
}
