import type { Meta, StoryObj } from '@storybook/react';
import { FormInput } from './index';

const meta: Meta<typeof FormInput> = {
  component: FormInput,
};

export default meta;
type Story = StoryObj<typeof FormInput>;

export const Primary: Story = {
  args: {
    id: 'name',
    name: 'name',
    value: '',
    placeholder: '名前を入力してください',
    required: true,
  },
};
