export class NoteService {
  static instance = new NoteService();
  styles = `
    display: flex;
    flex-direction: column;
    gap: 5px;
    position: fixed;
    width: min(300px, 90%);
    max-height: 100%;
    overflow-y: auto;
    top: 0;
    right: 0;
    z-index: 2000;
  `;
  notesWrapper!: HTMLElement;
  constructor() {
    this.createWrap();
  }

  private createWrap(): void {
    const wrap = document.createElement("div");
    wrap.id = "notifications";
    wrap.style.cssText = this.styles;
    this.notesWrapper = wrap;
    document.body.append(wrap);
  }
  showNote(note: HTMLElement): void {
    this.notesWrapper.append(note);
  }

  clearAllNotes() {
    this.notesWrapper.replaceChildren();
  }
}
