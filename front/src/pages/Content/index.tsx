import React from 'react';
import { createRoot } from 'react-dom/client';
import { CustomTooltip } from '../../components/Tooltip';
import { CompletionService } from '../../services/chrome';

console.log('Content script works!');

let enableFeature = 'disable';
let x = 0;
let y = 0;

let MyBox: HTMLElement | null = document.getElementById('__tooltip');
let container = document.createElement('div');
let shadowRoot: any = undefined;

MyBox = document.createElement('div');
MyBox.id = '__tooltip';
document.getElementsByTagName('html')[0].appendChild(MyBox);
MyBox.style.display = 'none';

shadowRoot = MyBox?.attachShadow({ mode: 'open' });
container.className = 'container';
shadowRoot?.appendChild(container);

const loadEnableOption = async () => {
  enableFeature = await CompletionService.getEnableOption();
};

export const updateEnableOption = (option: string) => {
  enableFeature = option;
};

chrome.runtime.onMessage.addListener(function (msg, sender, sendResponse) {
  if (msg.type === 'open-tooltip') {
    if (MyBox !== null && MyBox !== undefined) {
      if (MyBox.shadowRoot?.querySelector('.container') === null) {
        container = document.createElement('div');
        container.className = 'container';
        shadowRoot?.appendChild(container);
      }

      MyBox.style.display = 'block';
      MyBox.style.position = 'absolute';
      MyBox.style.top = `${y}px`;
      MyBox.style.left = `${x}px`;
    }

    showPopupCard(msg.content, container);
  } else if (msg.type === 'update-enable') {
    enableFeature = msg.content;
  }
});

window.onload = async function () {
  await loadEnableOption();
};

window.onmouseup = function (event) {
  let text = window.getSelection()?.toString();
  if (text && text.length) {
    if (enableFeature !== 'enable') return;

    if (chrome.runtime?.id) {
      chrome.runtime.sendMessage({ event: 'catchText', text });
      x = event.clientX;
      y = event.clientY;
    }
  }
};

window.onmousedown = function (event) {
  if (MyBox !== undefined && MyBox !== null) {
    if (MyBox !== event.target && !MyBox.contains(event.target as Node)) {
      container.parentNode?.removeChild(container);
      MyBox.style.display = 'none';
      Array.from(
        document.getElementsByClassName(
          'MuiTooltip-popper'
        ) as HTMLCollectionOf<HTMLElement>
      ).forEach((x) => x.remove());
    }
  }
};

const showPopupCard = async (msg: any, MyBox: any) => {
  const root = createRoot(container!);

  root.render(
    <React.StrictMode>
      <CustomTooltip title={msg} />
    </React.StrictMode>
  );
};
