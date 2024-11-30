import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {

  try {

    // 投稿
    await prisma.posts.createMany({
      data: [
        { id: 1, title: "Post 1", description: "description 1", content: "Content for post 1" },
        { id: 2, title: "Post 2", description: "description 2", content: "Content for post 2" },
        { id: 3, title: "Post 3", description: "description 3", content: "Content for post 3" },
      ],
    });

    // タグ
    await prisma.tags.createMany({
      data: [
        { id: 1, title: 'React' },
        { id: 2, title: 'Next.js' },
        { id: 3, title: 'TypeScript' },
      ],
    });

    // 中間テーブル postsOnTags
    await prisma.postsOnTags.createMany({
      data: [
        { postId: 1, tagId: 1 },
        { postId: 1, tagId: 2 },
        { postId: 1, tagId: 3 },
        { postId: 2, tagId: 1 },
        { postId: 2, tagId: 2 },
        { postId: 2, tagId: 3 }
      ],
    });

  } catch (error) {
    console.log(error)
  }
}

main()
