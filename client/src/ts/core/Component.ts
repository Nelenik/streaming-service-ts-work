import { render, createElement } from "core";
import { InsertMethods } from "types";

const NOOP = () => {};

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
    componentToInsert: Component | Component[],
    method: InsertMethods
  ) {
    const container =
      selectorOrElement instanceof Element
        ? selectorOrElement
        : this.element?.querySelector(selectorOrElement);
    render(container, componentToInsert, method);
  }
  renderParts(): void {}

  on(
    eventType: string,
    element: Element,
    cb: EventListenerOrEventListenerObject = NOOP
  ) {
    element.addEventListener(eventType, cb);
  }
  off(
    eventType: string,
    element: Element,
    cb: EventListenerOrEventListenerObject = NOOP
  ) {
    element.removeEventListener(eventType, cb);
  }
}
