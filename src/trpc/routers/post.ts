import { baseProcedure, createTRPCRouter } from '@/trpc/init'
import { PostContentSchema } from '@/schema/post'
import { PrismaClient } from '@prisma/client';

// TODO: ここの型はあとで修正する
const prisma: any = new PrismaClient();

export const postRouter = createTRPCRouter({
  // 投稿を取得する処理
  // getPosts: baseProcedure
  // .query(async () => {
  //   // const posts = await prisma.posts.findMany();
  //   // return posts; // 投稿データをそのまま返却
  //     return "投稿"
  // }),





});





