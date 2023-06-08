import { Completion } from '../@types/Summary';
import { format } from 'date-fns';
import keywordExtractor from 'keyword-extractor';

export const convertDataToCompletion = (
  keyword: string | null,
  data: any,
  tags: string[] | null
): Completion | undefined => {
  if (!keyword || !data || !tags) return;

  return {
    _id: data._id,
    model: data.model,
    text: data.choices[0].text,
    tags,
    keyword,
    createdDate: data.createdDate,
  };
};

export const formatDateTime = (date: string | null): string => {
  if (!date) return '';
  return format(new Date(date), 'MMM do, yyyy HH:mm');
};

export function extractKeywords(text: string) {
  const tags = keywordExtractor.extract(text, {
    language: 'english',
    remove_digits: true,
    remove_duplicates: true,
    return_changed_case: true,
  });
  if (tags.length <= 3) return tags;
  return tags.slice(0, 3);
}
