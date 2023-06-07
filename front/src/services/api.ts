import { Completion } from '../@types/Summary';

const baseUrl = 'http://localhost:3001/api/v1/completion';
// const baseUrl = 'https://f453-167-88-61-250.ngrok-free.app/api/v1/completion';

export const createCompletion = async (body: Completion) =>
  await fetch(baseUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });

export const getAllCompletion = async (): Promise<Completion[]> => {
  const response = await fetch(`${baseUrl}/all`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  const data = await response.json();
  return data.allCompletion;
};
