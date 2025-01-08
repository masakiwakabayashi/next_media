import type { Meta, StoryObj } from '@storybook/react';
import { FormTextArea } from './index';

const meta: Meta<typeof FormTextArea> = {
  component: FormTextArea,
};

export default meta;
type Story = StoryObj<typeof FormTextArea>;

export const Primary: Story = {
  args: {
    id: 'message',
    name: 'message',
    value: '',
    placeholder: 'メッセージを入力してください',
    required: true,
  },
};
