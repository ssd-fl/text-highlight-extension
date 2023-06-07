import { Completion } from '../@types/Summary';
import { format } from 'date-fns';

export const convertDataToCompletion = (
  keyword: string | null,
  data: any
): Completion | undefined => {
  if (!keyword || !data) return;

  return {
    _id: data._id,
    model: data.model,
    text: data.choices[0].text,
    keyword,
    createdDate: data.createdDate,
  };
};

export const formatDateTime = (date: string | null): string => {
  if (!date) return '';
  return format(new Date(date), 'MMM do, yyyy HH:mm');
};
