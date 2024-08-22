import { Component, ComponentOptions } from "core";
import { html } from "helpers";

interface SongMenuOptions extends ComponentOptions {
  inPlaylist: boolean;
  onMenuClick: (type: "add" | "remove") => void;
  setActiveDrop: (component: SongMenu | null) => void;
}

export class SongMenu extends Component<SongMenuOptions> {
  private _isOpen: boolean = false;

  getTemplate(): string {
    const { inPlaylist } = this.options;
    return html`
      <div class="tracks__item__drop">
        <button class="track__btn-dropdown">
          <svg
            width="23"
            height="4"
            viewBox="0 0 23 4"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle cx="2" cy="2" r="2" fill="#C4C4C4" />
            <circle cx="11.5" cy="2" r="2" fill="#C4C4C4" />
            <circle cx="21" cy="2" r="2" fill="#C4C4C4" />
          </svg>
        </button>
        <div class="track__dropdown">
          ${inPlaylist
            ? `<button class="track__delete-btn">Удалить из плейлиста</button>`
            : `<button class="track__add-btn">Добавить в плейлист</button>`}
        </div>
      </div>
    `;
  }

  set isOpen(val: boolean) {
    const { setActiveDrop } = this.options;
    this._isOpen = val;
    const menu = this.element?.querySelector(".track__dropdown");
    if (!menu) return;
    if (val) {
      this.openDropdown(menu);
      setActiveDrop(this);
    } else {
      this.closeDropdown(menu);
      setActiveDrop(null);
    }
  }

  setHandlers(): void {
    this.onClick();
    this.onEsc();
  }

  onClick() {
    const { onMenuClick, inPlaylist } = this.options;
    if (this.element instanceof Element) {
      this.on("click", this.element, (e) => {
        const target = e.target;
        const dropdownTrigger = this.element?.querySelector(
          ".track__btn-dropdown"
        );
        const dropdownItem = this.element?.querySelector(
          ".track__dropdown button"
        );
        if (!(target instanceof Element)) return;

        if (target.closest(".track__dropdown button") === dropdownItem) {
          onMenuClick(inPlaylist ? "remove" : "add");
          this.isOpen = false;
        } else if (target.closest(".track__btn-dropdown") === dropdownTrigger) {
          this.isOpen = this._isOpen ? false : true;
        }
      });
    }
  }
  onEsc(): void {
    if (this.element instanceof Element) {
      this.on("keyup", this.element, (e: KeyboardEventInit) => {
        if (e.code !== "Escape") return;
        this.isOpen = false;
      });
    }
  }
  openDropdown(menu: Element): void {
    const opened = document.querySelector(".dropdown--active");
    if (opened) this.closeDropdown(opened);
    menu.classList.add("dropdown--active");
  }

  closeDropdown(menu: Element): void {
    menu?.classList.remove("dropdown--active");
  }
}
