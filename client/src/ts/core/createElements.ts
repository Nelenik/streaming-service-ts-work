export const createElement = (htmlStr: string): HTMLElement => {
  const tempWrap = document.createElement("div");
  tempWrap.innerHTML = htmlStr;
  let component = tempWrap.firstElementChild;
  if (component instanceof HTMLElement) return component;
};
