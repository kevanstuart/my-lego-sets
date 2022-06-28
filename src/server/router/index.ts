import { RebrickableClient } from '@/pages/api/utils/rebrickable';
import * as trpc from '@trpc/server';
import next from 'next';
import { resolve } from 'path';
import { z } from 'zod';

const rApi = new RebrickableClient();

export const appRouter = trpc
  .router()
  .middleware(async ({ ctx, next }) => {
    await rApi.setUserToken();
    return next();
  })
  .query('get-my-lists', {
    async resolve() {
      const setLists = await rApi.getSetLists();
      return setLists.results;
    },
  })
  .query('get-sets-by-id', {
    input: z.object({ listId: z.number() }),
    async resolve({ input }) {
      if (input) {
        const sets = await rApi.getSetsByListId(input.listId);
        return sets.results.map((set: any) => set.set)
      }
    }
  })
  .query('get-set-by-id', {
    input: z.object({ setNum: z.string() }),
    async resolve({ input }) {
      if (input) {
        return await rApi.getSetById(input.setNum);
      }
    }
  });

// only export *type signature* of router!
// to avoid accidentally importing your API
// into client-side code
export type AppRouter = typeof appRouter;