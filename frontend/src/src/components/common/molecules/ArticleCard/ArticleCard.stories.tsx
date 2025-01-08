import type { Meta, StoryObj } from '@storybook/react';
import { ArticleCard } from './index';

const meta: Meta<typeof ArticleCard> = {
  component: ArticleCard,
};

export default meta;
type Story = StoryObj<typeof ArticleCard>;

export const Primary: Story = {
  args: {
    imagePath: "/no_image.webp",
    title: "肉源 六本木店",
    category: "焼肉",
    authorName: "若林 将輝",
    publishedDate: "2025年01月06日",
    link: "/articles/1",
  },
};
