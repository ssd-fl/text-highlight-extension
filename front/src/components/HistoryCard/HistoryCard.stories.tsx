import type { Meta, StoryObj } from '@storybook/react';

import { HistoryCard } from './HistoryCard';
import { Completion } from '../../@types/Summary';

const meta: Meta<typeof HistoryCard> = {
  title: 'HistoryCard',
  component: HistoryCard,
};

export default meta;
type Story = StoryObj<typeof HistoryCard>;

const data: Completion = {
  _id: '647ea40a7ab989ecb9095a3e',
  createdDate: '2023-06-06T01:47:40.409Z',
  keyword: 'keyword',
  text: 'text',
  model: 'model',
};

export const DefaultHistoryCard: Story = {
  render: () => <HistoryCard data={data} />,
};
