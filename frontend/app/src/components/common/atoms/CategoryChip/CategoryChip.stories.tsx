import type { Meta, StoryObj } from '@storybook/react';
import { CategoryChip } from './index';

const meta: Meta<typeof CategoryChip> = {
  component: CategoryChip,
};

export default meta;
type Story = StoryObj<typeof CategoryChip>;

export const Primary: Story = {
  args: {
    children: 'カテゴリー',
  },
};
