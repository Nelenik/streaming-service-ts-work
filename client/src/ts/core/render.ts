import { InsertMethods } from "types";
import { Component } from "./Component";

export type RenderHTML = (
  container: HTMLElement,
  component: string,
  place: InsertPosition
) => void;

export type Render = (
  container: HTMLElement | Node | Element,
  component: Component | Component[],
  method: InsertMethods
) => void;

//inserting markup as string
export const renderHTML: RenderHTML = (container, component, place) => {
  container.insertAdjacentHTML(place, component);
};

//inserting component using methods append, prepend, before, after
export const render: Render = (container, component, method = "append") => {
  if (!Array.isArray(component)) component = [component];
  if (
    container instanceof HTMLElement &&
    typeof container[method] === "function"
  ) {
    component.forEach((componentInst: Component) => {
      if (componentInst.element instanceof Node)
        container[method](componentInst.element);
    });
  } else {
    throw new Error(
      `Method "${method}" is not a valid function on the container.`
    );
  }
};
