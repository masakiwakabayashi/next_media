import { z } from 'zod'
import { baseProcedure, createTRPCRouter } from '@/trpc/init'

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
      }
    }),
})

// export type definition of API
export type AppRouter = typeof appRouter
