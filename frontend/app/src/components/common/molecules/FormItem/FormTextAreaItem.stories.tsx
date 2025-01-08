import type { Meta, StoryObj } from '@storybook/react';
import { FormTextAreaItem } from './index';

const meta: Meta<typeof FormTextAreaItem> = {
  component: FormTextAreaItem,
};

export default meta;
type Story = StoryObj<typeof FormTextAreaItem>;

export const Primary: Story = {
  args: {
    id: 'name',
    name: 'name',
    value: '',
    placeholder: 'メッセージを入力してください',
    required: true,
    children: 'メッセージ',
  },
};
