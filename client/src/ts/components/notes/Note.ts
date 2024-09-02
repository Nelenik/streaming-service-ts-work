import { Component, ComponentOptions } from "core";
import { html, wait } from "helpers";
import { NoteService } from "services";
import { NoteType } from "types";

interface NoteOptions extends ComponentOptions {
  message: string;
  type?: NoteType;
}

export class Note extends Component<NoteOptions> {
  getTemplate(): string {
    const { message, type } = this.options;
    const typeModificator = (type && `note--${type}`) || "";
    return html`
      <div class="note ${typeModificator}">
        <button class="note__close">🗙</button>
        <p class="note__message">${message}</p>
      </div>
    `;
  }
  show(): Note {
    if (!this.element) return this;
    NoteService.instance.showNote(this.element);
    wait(0).then(() => {
      this.element?.classList.add("note--show");
    });
    return this;
  }
  autoClose(ms: number): void {
    wait(ms).then(() => this.close());
  }
  close(): void {
    this.element?.classList.remove("note--show");
    wait(400).then(() => {
      this.element?.remove();
      this.removeElement();
    });
  }
  setHandlers(): void {
    const closeBtn = this.element?.querySelector(".note__close");
    if (!(closeBtn instanceof Element)) return;
    this.on("click", closeBtn, () => this.close());
  }
}
