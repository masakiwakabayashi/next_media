import type { Meta, StoryObj } from '@storybook/react';
import { FormInputItem } from './index';

const meta: Meta<typeof FormInputItem> = {
  component: FormInputItem,
};

export default meta;
type Story = StoryObj<typeof FormInputItem>;

export const Primary: Story = {
  args: {
    id: 'name',
    name: 'name',
    value: '',
    placeholder: '名前を入力してください',
    required: true,
    children: '名前',
  },
};
