export const getContainer = (
  selectorOrEl: null | string | Element
): Element => {
  if (selectorOrEl === null) {
    throw new Error('Container can not be "null"');
  }
  if (typeof selectorOrEl === "string") {
    const container = document.querySelector(selectorOrEl);
    if (container === null) {
      throw new Error(`No element found for selector ${selectorOrEl}`);
    }
    return container;
  }
  return selectorOrEl;
};
