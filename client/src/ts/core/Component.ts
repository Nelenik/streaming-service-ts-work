import { renderElement } from "core";
import { createElement } from "helpers";
import { InsertMethods } from "types";

export interface ComponentOptions {
  [key: string]: unknown;
}
export abstract class Component<T = ComponentOptions> {
  private _element: HTMLElement | null = null;

  constructor(protected options: T = null) {
    this.getElement();
    this.renderParts();
  }

  abstract getTemplate(): string;

  set element(val) {
    this._element = val;
  }

  get element() {
    return this._element;
  }

  getElement(): HTMLElement {
    this.element ??= createElement(this.getTemplate());
    return this.element;
  }
  removeElement(): void {
    this.element = null;
  }

  insertChildren(
    selectorOrElement: string | Element,
    elToInsert: HTMLElement | HTMLElement[],
    method: InsertMethods
  ) {
    const container =
      selectorOrElement instanceof Element
        ? selectorOrElement
        : this.element.querySelector(selectorOrElement);
    renderElement(container, elToInsert, method);
  }
  renderParts(): void {}
}
