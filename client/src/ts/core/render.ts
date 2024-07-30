import { InsertMethods } from "types";

export type RenderHTML = (
  container: HTMLElement,
  component: string,
  place: InsertPosition
) => void;

export type RenderElement = (
  container: HTMLElement | Node | Element,
  element: HTMLElement | HTMLElement[],
  method: InsertMethods
) => void;

//inserting markup as string
export const renderHTML: RenderHTML = (container, component, place) => {
  container.insertAdjacentHTML(place, component);
};

//inserting using methods append, prepend, before, after
export const renderElement: RenderElement = (container, element, method) => {
  if (!Array.isArray(element)) element = [element];
  if (
    container instanceof HTMLElement &&
    typeof container[method] === "function"
  ) {
    container[method](...element);
  } else {
    throw new Error(
      `Method "${method}" is not a valid function on the container.`
    );
  }
};
