import { Component, ComponentOptions } from "core";
import "styles/modal-base.scss";
interface RemoveSongOptions extends ComponentOptions {
  onDel: () => void;
  onCancel: () => void;
}

export class RemoveSong extends Component<RemoveSongOptions> {
  getTemplate(): string {
    return /*html*/ `
      <div class="modal">
        <div class="modal__content">
          <button class="del">Удалить</button>
          <button class="cancel">Отменить</button>
        </div>
      </div>
    `;
  }
}
