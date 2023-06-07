import type { Meta, StoryObj } from '@storybook/react';

import { CustomTooltip } from './Tooltip';

const meta: Meta<typeof CustomTooltip> = {
  title: 'CustomTooltip',
  component: CustomTooltip,
};

export default meta;
type Story = StoryObj<typeof CustomTooltip>;

export const DefaultCustomTooltip: Story = {
  render: () => <CustomTooltip title="title" />,
};
