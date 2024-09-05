import { Component } from "core";
import { getContainer } from "helpers";

export class Modal {
  private _place: Element = document.body;
  public openedComponent: Component | null = null;
  static instance = new Modal();

  set place(selectorOrEl: string | Element) {
    this._place = getContainer(selectorOrEl);
  }
  get place(): Element {
    return this._place;
  }

  open(component: Component): void {
    this.close();
    this.openedComponent = component;
    this.openedComponent.mount(this._place, "append");
  }

  close(): void {
    if (this.openedComponent) {
      this.openedComponent.element?.remove();
      this.openedComponent = null;
    }
  }
}
