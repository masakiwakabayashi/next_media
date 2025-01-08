
import type { Meta, StoryObj } from '@storybook/react';
import { CtaButton } from './index';

const meta: Meta<typeof CtaButton> = {
  component: CtaButton,
};

export default meta;
type Story = StoryObj<typeof CtaButton>;

export const Primary: Story = {
  args: {
    children: 'ボタン',
  },
};
