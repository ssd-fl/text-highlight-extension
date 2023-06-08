export type Choice = {
  text: string;
  index: number;
};

export type Summary = {
  id: string;
  object: string;
  created: number;
  model: string;
  choices: Choice[] | [];
};

export type Model = {
  model: string;
  keyword: string;
  max_tokens: number;
  temperature: number;
};

export type Completion = {
  _id: string;
  model: string;
  keyword: string;
  text: string;
  tags: string[];
  createdDate: string;
};
