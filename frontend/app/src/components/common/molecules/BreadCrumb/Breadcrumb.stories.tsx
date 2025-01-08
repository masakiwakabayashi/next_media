import type { Meta, StoryObj } from '@storybook/react';
import { Breadcrumb } from './index';

const meta: Meta<typeof Breadcrumb> = {
  component: Breadcrumb,
};

export default meta;
type Story = StoryObj<typeof Breadcrumb>;

export const Primary: Story = {
  args: {
    items: [
      { label: "TOP", href: "/" },
      { label: "肉源 六本木店", href: "/articles/1" },
    ],
  },
};
