import * as trpc from '@trpc/server';
import { z } from 'zod';

export const appRouter = trpc
  .router()
  .query('get-my-collection', {
    input: z.object({ text: z.string().nullish() }).nullish(),
    async resolve({ input }) {
      return { id: input, name: 'Bilbo' };
    },
  });

// only export *type signature* of router!
// to avoid accidentally importing your API
// into client-side code
export type AppRouter = typeof appRouter;