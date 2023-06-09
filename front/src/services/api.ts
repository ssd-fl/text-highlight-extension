import { Completion } from '../@types/Summary';

const baseUrl = 'http://localhost:3001/completions';

export const createCompletion = async (body: Completion) => {
  const response = await fetch(baseUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });
  return await response.json();
};

export const getAllCompletion = async (): Promise<Completion[]> => {
  const response = await fetch(baseUrl, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  return await response.json();
};
