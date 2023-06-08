import { Completion } from '../@types/Summary';

const KEY = 'completion';
const ENABLE_FEATURE = 'completion_enable';

export class CompletionService {
  static getCompletion = async (): Promise<{ [key: string]: string }> => {
    return new Promise((resolve, reject) => {
      chrome.storage.local.get([KEY], (result) => {
        if (chrome.runtime.lastError) reject(chrome.runtime.lastError);

        const researches = result.completion ?? {};
        resolve(researches);
      });
    });
  };

  static saveOneCompletion = async (key: string, text: string) => {
    const completions = await this.getCompletion();
    const updatedCompletion = { [key]: text, ...completions };

    return new Promise((resolve, reject) => {
      chrome.storage.local.set({ [KEY]: updatedCompletion }, () => {
        if (chrome.runtime.lastError) reject(chrome.runtime.lastError);
        resolve(updatedCompletion);
      });
    });
  };

  static saveAllCompletion = async (data: Completion[]) => {
    console.log('saveAllCompletion', data);
    if (data.length === 0) return;

    const completion = data.reduce((sum: any, current: Completion) => {
      sum[current.keyword] = JSON.stringify(current);
      return sum;
    }, {});

    return new Promise((resolve, reject) => {
      chrome.storage.local.set({ [KEY]: completion }, () => {
        if (chrome.runtime.lastError) reject(chrome.runtime.lastError);
        resolve(completion);
      });
    });
  };

  static clearCompletion = async () => {
    return new Promise((resolve, reject) => {
      chrome.storage.local.remove([KEY], () => {
        if (chrome.runtime.lastError) reject(chrome.runtime.lastError);
        resolve('');
      });
    });
  };

  static saveEnableOption = async (enable: boolean) => {
    const value = enable ? 'enable' : 'disable';

    return new Promise((resolve, reject) => {
      chrome.storage.local.set({ [ENABLE_FEATURE]: value }, () => {
        if (chrome.runtime.lastError) reject(chrome.runtime.lastError);
        resolve(value);
      });
    });
  };

  static getEnableOption = async (): Promise<string> => {
    return new Promise((resolve, reject) => {
      chrome.storage.local.get([ENABLE_FEATURE], (result) => {
        if (chrome.runtime.lastError) reject(chrome.runtime.lastError);
        const enableFeature = result.completion_enable ?? 'disable';
        resolve(enableFeature);
      });
    });
  };
}
