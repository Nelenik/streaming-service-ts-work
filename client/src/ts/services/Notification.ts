import { Component, ComponentOptions } from "core";
import { html, wait } from "helpers";

export class Notification {
  notesWrapper!: HTMLElement;
  static instance = new Notification();

  constructor() {
    this.createWrap();
  }

  createWrap() {
    console.log("created wrap");
    const wrap = document.createElement("div");
    wrap.classList.add("note-block");
    document.body.append(wrap);
    console.log(document);
    this.notesWrapper = wrap;
  }
  displayNote(message: string, type?: NoteType) {
    const noteInst = new Note({ message, type });
    if (!noteInst || !(noteInst.element instanceof HTMLElement)) return;
    noteInst.mount(document.body, "append");
    wait(600).then(() => {
      noteInst.element?.remove();
      noteInst.removeElement();
    });
  }
}

interface NoteOptions extends ComponentOptions {
  message: string;
  type?: NoteType;
}

type NoteType = "warning" | "error";
class Note extends Component<NoteOptions> {
  getTemplate(): string {
    const { message, type } = this.options;
    const modificatior = type ? `note__${type}` : "";
    return html`
      <div class="note ${modificatior}">
        <button class="note__close">⛌</button>
        <p class="note__message">${message}</p>
      </div>
    `;
  }
  setHandlers(): void {
    const closeBtn = this.element?.querySelector(".note__close");
    if (!(closeBtn instanceof Element)) return;
    this.on("click", closeBtn, () => {
      this.element?.remove();
    });
  }
}
