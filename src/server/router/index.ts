import { RebrickableClient } from '@/pages/api/utils/rebrickable';
import * as trpc from '@trpc/server';
import next from 'next';
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
    input: z.object({ setId: z.number() }),
    async resolve({ input }) {
      if (input) {
        const sets = await rApi.getSetsByListId(input.setId);
        return sets.results.map((set: any) => set.set)
      }
    }
  });

// only export *type signature* of router!
// to avoid accidentally importing your API
// into client-side code
export type AppRouter = typeof appRouter;