import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // 初期データとして投入したいリストを配列で作成
  const postData = [
    { id: 1, title: "Post 1", description: "description 1", content: "Content for post 1" },
    { id: 2, title: "Post 2", description: "description 2", content: "Content for post 2" },
    { id: 3, title: "Post 3", description: "description 3", content: "Content for post 3" },
  ]

  try {
    for (const post of postData) {
      await prisma.posts.create({
        data: post,
      });
    }

  } catch (error) {
    console.log(error)
  }
}

main()
