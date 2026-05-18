// This MFE imports from '@clover/store' — a bare specifier.
// The import map in index.html resolves that to ./clover/store.js.
// The browser caches that module. Every other importer gets the same instance.

import { store } from "@clover/store";

const mount = (options) => {
  const element = options.element;

  const render = (currentCount) => {
    element.querySelector(".counterValue").textContent = currentCount;
  };

  element.innerHTML = `
    <div class="mfePanel">
      <div class="mfePanelHeader">
        <span class="mfePanelTag">MFE</span>
        <span class="mfePanelName">mfe-counter</span>
      </div>
      <div class="mfePanelMeta">store uid: <code>${store.identity.uid}</code></div>
      <div class="counterDisplay">
        <button class="counterButton" id="decrementButton">−</button>
        <span class="counterValue">${store.getCount()}</span>
        <button class="counterButton" id="incrementButton">+</button>
      </div>
    </div>
  `;

  const unsubscribe = store.subscribe(render);

  element
    .querySelector("#incrementButton")
    .addEventListener("click", store.increment);
  element
    .querySelector("#decrementButton")
    .addEventListener("click", store.decrement);

  const unmount = () => {
    unsubscribe();
    element.innerHTML = "";
  };

  return unmount;
};

export { mount };
