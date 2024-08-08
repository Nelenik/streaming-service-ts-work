import { Component } from "core";
import { getContainer } from "helpers";

export class Modal {
  static instace = new Modal();
  private _place: Element = document.body;
  private openedComponent: Component = null;

  set place(selectorOrEl: string | Element) {
    this._place = getContainer(selectorOrEl);
  }
  get place(): Element {
    return this._place;
  }

  open(component: Component) {
    this.openedComponent = component;
    this.openedComponent.mount(this._place, "append");
  }

  close() {
    this.openedComponent.element.remove();
  }
}
