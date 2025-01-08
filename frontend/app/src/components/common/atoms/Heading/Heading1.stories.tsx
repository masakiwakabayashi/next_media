import type { Meta, StoryObj } from '@storybook/react';
import { Heading1 } from './index';

const meta: Meta<typeof Heading1> = {
  component: Heading1,
};

export default meta;
type Story = StoryObj<typeof Heading1>;

export const Primary: Story = {
  args: {
    children: 'タイトル',
  },
};
