import { convertDataToCompletion, formatDateTime } from './helpers';

describe('convertDataToCompletion', () => {
  it('without keyword', () => {
    const value = 'without keyword';
    expect(convertDataToCompletion(null, value, ['tag1'])).toBe(undefined);
  });

  it('without data', () => {
    const keyword = 'without data';
    expect(convertDataToCompletion(keyword, null, ['tag1'])).toBe(undefined);
  });

  it('without tags', () => {
    const keyword = 'without tags';
    expect(convertDataToCompletion(keyword, null, null)).toBe(undefined);
  });

  it('happy pass', () => {
    const keyword = 'keyword';
    const data = {
      _id: 'id',
      model: 'model',
      choices: [
        {
          text: 'text',
        },
      ],
      createdDate: 'createdDate',
    };

    expect(convertDataToCompletion(keyword, data, ['tags'])).toEqual({
      _id: 'id',
      model: 'model',
      text: 'text',
      keyword: 'keyword',
      tags: ['tags'],
      createdDate: 'createdDate',
    });
  });
});

describe('formatDateTime', () => {
  it('without date', () => {
    expect(formatDateTime(null)).toBe('');
  });

  it('with date', () => {
    const date = '2023-06-06T01:47:40.409Z';
    expect(formatDateTime(date)).toBe('Jun 5th, 2023 21:47');
  });
});
