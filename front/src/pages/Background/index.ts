import { DOMMessage } from '../../@types/DOMMessage';
import { convertDataToCompletion } from '../../common/helpers';
import { createCompletion, getAllCompletion } from '../../services/api';
import { CompletionService } from '../../services/chrome';

console.log('This is the background page');

const OPENAI_API_ENDPOINT =
  process.env.REACT_APP_OPENAI_ENDPOINT ??
  'https://api.openai.com/v1/completions';
const API_KEY = process.env.REACT_APP_OPENAI_KEY;

const initialize = async () => {
  try {
    await CompletionService.clearCompletion();
    const completion = await getAllCompletion();
    await CompletionService.saveAllCompletion(completion);
  } catch (error) {
    console.log('initialize: error ===> ', error);
  }
};

const sendMessageToContent = (message: string) => {
  chrome.tabs.query({ active: true, currentWindow: true }).then((tabs) => {
    const activeTab = tabs[0];
    let tID = activeTab.id ?? -1;

    if (activeTab && activeTab.id !== undefined) {
      chrome.tabs.sendMessage(tID, { type: 'open-tooltip', content: message });
    }
  });
};

const catchEventListener = async (
  msg: DOMMessage,
  _: chrome.runtime.MessageSender,
  __: (response: any) => void
) => {
  if (!msg) return;
  if (msg.event !== 'catchText') return;
  if (!msg.text) return;

  const storedCompletion = await CompletionService.getCompletion();

  if (storedCompletion[msg.text.trim()]) {
    const message = JSON.parse(storedCompletion[msg.text.trim()]).text;
    sendMessageToContent(message);
    return;
  }

  const body = {
    model: 'text-davinci-003',
    prompt: msg.text.trim(),
    max_tokens: 2000,
    temperature: 0,
  };

  try {
    const response = await fetch(OPENAI_API_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${API_KEY}`,
      },
      body: JSON.stringify(body),
    });
    const result = await response.json();

    const newCompletion = convertDataToCompletion(msg.text, result);

    if (!newCompletion) return;

    const createdCompletion = await createCompletion(newCompletion);

    if (!createdCompletion) return;

    await CompletionService.saveOneCompletion(
      createdCompletion.keyword,
      JSON.stringify(createdCompletion)
    );

    sendMessageToContent(newCompletion.text);
  } catch (error) {
    console.log(error);
  }
};

chrome.runtime.onMessage.addListener(catchEventListener);

initialize();
