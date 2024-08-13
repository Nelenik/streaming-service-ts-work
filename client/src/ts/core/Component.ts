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
    listener: EventListenerOrEventListenerObject
  ) {
    element.addEventListener(eventType, listener);
  }
  off(
    eventType: string,
    element: EventTarget,
    listener: EventListenerOrEventListenerObject = NOOP
  ) {
    element.removeEventListener(eventType, listener);
  }
}
