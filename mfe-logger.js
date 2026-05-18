// A completely separate MFE. Also imports '@clover/store'.
// The browser resolves that to the same URL → same cached module → same instance.
// When mfe-counter calls increment(), this MFE's subscriber fires too.
// No coordination required. No shared scope init. Just the module cache.

import { store } from "@clover/store";

const mount = (options) => {
  const element = options.element;
  const logEntries = [];

  const renderLog = () => {
    const logListElement = element.querySelector(".logList");
    logListElement.innerHTML = logEntries
      .slice()
      .reverse()
      .map((logEntry) => `<div class="logEntry">${logEntry}</div>`)
      .join("");
  };

  element.innerHTML = `
    <div class="mfePanel">
      <div class="mfePanelHeader">
        <span class="mfePanelTag">MFE</span>
        <span class="mfePanelName">mfe-logger</span>
      </div>
      <div class="mfePanelMeta">store uid: <code>${store.identity.uid}</code></div>
      <div class="logList">
        <div class="logPlaceholder">Waiting for store changes…</div>
      </div>
    </div>
  `;

  const unsubscribe = store.subscribe((currentCount) => {
    const timestamp = new Date().toLocaleTimeString();
    logEntries.push(`[${timestamp}]  count → ${currentCount}`);
    renderLog();
  });

  const unmount = () => {
    unsubscribe();
    element.innerHTML = "";
  };

  return unmount;
};

export { mount };
