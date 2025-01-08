import type { Meta, StoryObj } from '@storybook/react';
import { Heading2 } from './index';

const meta: Meta<typeof Heading2> = {
  component: Heading2,
};

export default meta;
type Story = StoryObj<typeof Heading2>;

export const Primary: Story = {
  args: {
    children: 'タイトル',
  },
};
