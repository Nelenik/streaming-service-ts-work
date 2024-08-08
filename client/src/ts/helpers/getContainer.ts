export const getContainer = (selectorOrEl: string | Element): Element => {
  return typeof selectorOrEl === "string"
    ? document.querySelector(selectorOrEl)
    : selectorOrEl;
};
