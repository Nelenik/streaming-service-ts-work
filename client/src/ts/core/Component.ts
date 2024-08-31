import { render, createElement } from "core";
import { InsertMethods } from "types";
import { deepEqual, getContainer } from "helpers";

const NOOP = () => {};

export interface ComponentOptions {
  [key: string]: unknown;
}
export abstract class Component<T extends ComponentOptions = ComponentOptions> {
  private _element: HTMLElement | null = null;

  constructor(protected _options: T = {} as T) {
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

  getElement(): Element {
    //remove eventlisteners before element updating
    this.unsetHandlers();

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

  unsetHandlers(): void {}

  mount(
    selectorOrElement: null | string | Element,
    method: InsertMethods
  ): Component {
    try {
      const container = getContainer(selectorOrElement);
      render(container, this, method);
    } catch (err) {
      console.error(`Error mounting the component: ${err}`);
    }
    return this;
  }

  on(
    eventType: string,
    element: EventTarget,
    listener: EventListenerOrEventListenerObject,
    options?: AddEventListenerOptions
  ) {
    element.addEventListener(eventType, listener, options);
  }
  off(
    eventType: string,
    element: EventTarget,
    listener: EventListenerOrEventListenerObject = NOOP,
    options?: AddEventListenerOptions
  ) {
    element.removeEventListener(eventType, listener, options);
  }
}
