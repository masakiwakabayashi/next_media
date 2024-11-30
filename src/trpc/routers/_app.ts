import { z } from 'zod'
import { baseProcedure, createTRPCRouter } from '@/trpc/init'
import { postRouter } from './post'

import { PrismaClient } from '@prisma/client';

// TODO: ここの型はあとで修正する
const prisma: any = new PrismaClient();

/**
 * API Router 定義.
 *
 * 本サンプルコードでは API 処理の実態を直接記述しているが、本来は別のファイル, ディレクトリに構造化して管理すべき.
 */
export const appRouter = createTRPCRouter({
  hello: baseProcedure
    .input(
      // zod による入力バリデーション.
      z.object({
        text: z.string(),
      }),
    )
    .query((opts) => {
      // tRPC API 応答の実装.
      return {
        // コンテキスト `ctx` と入力 `input` を参照できる.
        greeting: `hello ${opts.ctx.userId}, ${opts.input.text}`,
        jp: "こんにちは"
      }
    }),
    // テスト
    test: baseProcedure
    // .input(
    //   // zod による入力バリデーション.
    //   z.object({
    //     text: z.string(),
    //   }),
    // )
    .query((opts) => {
      // tRPC API 応答の実装.
      return {
        // コンテキスト `ctx` と入力 `input` を参照できる.
        greeting: "こぴにちは",
      }
    }),
    // 投稿の取得
    getPosts: baseProcedure
    .query(async () => {
      // const posts = await prisma.posts.findMany();
      const posts = await prisma.posts.findMany({
        include: {
          tags: {
            select: {
              tag: true,
            },
          },
        },
      });
      return posts;
    }),









    postRouter,
})

// export type definition of API
export type AppRouter = typeof appRouter
