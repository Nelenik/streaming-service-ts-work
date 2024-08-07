import { render, createElement } from "core";
import { InsertMethods } from "types";
import { deepEqual } from "helpers";

const NOOP = () => {};

export interface ComponentOptions {
  [key: string]: unknown;
}
export abstract class Component<T extends ComponentOptions = ComponentOptions> {
  private _element: HTMLElement | null = null;

  constructor(protected _options: T = null) {
    this.getElement();
  }

  abstract getTemplate(): string;

  set options(val) {
    if (deepEqual(val, this._options)) return;
    this._options = val;
    this.getElement();
  }

  get options() {
    return this._options;
  }

  get element() {
    return this._element;
  }

  getElement(): HTMLElement {
    const newElement = createElement(this.getTemplate());
    if (this._element === null) {
      this._element = newElement;
    } else {
      this._element.replaceWith(newElement);
      this._element = newElement;
    }
    this.setHandlers();
    return this._element;
  }
  removeElement(): Component {
    this._element = null;
    return this;
  }

  setHandlers(): void {}

  mount(selectorOrElement: string | Element, method: InsertMethods): void {
    const container =
      typeof selectorOrElement === "string"
        ? document.querySelector(selectorOrElement)
        : selectorOrElement;
    render(container, this, method);
  }

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
