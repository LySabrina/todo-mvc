function createElement(tag, className = "") {
  const elem = document.createElement(tag);
  if (className != "") {
    elem.classList.add(className);
  }

  return elem;
}

export { createElement };
