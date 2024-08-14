export const createElement = (htmlStr: string): HTMLElement => {
  const tempWrap = document.createElement("div");
  tempWrap.innerHTML = htmlStr;
  const component = tempWrap.firstElementChild;
  return component as HTMLElement;
};
