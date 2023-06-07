import { convertDataToCompletion, formatDateTime } from './helpers';

describe('convertDataToCompletion', () => {
  it('without keyword', () => {
    const value = 'without keyword';
    expect(convertDataToCompletion(null, value)).toBe(undefined);
  });

  it('without data', () => {
    const keyword = 'without data';
    expect(convertDataToCompletion(keyword, null)).toBe(undefined);
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
