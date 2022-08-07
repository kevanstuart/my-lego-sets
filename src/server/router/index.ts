import * as trpc from '@trpc/server';
import { z } from 'zod';

import { RebrickableClient } from '@/pages/api/utils/rebrickable';

const rebrickable = new RebrickableClient();

export const appRouter = trpc
  .router()
  .query('get-themes', {
    async resolve() {
      const themes = await rebrickable.getThemes();
      return themes.results;
    }
  })
  .middleware(async ({ next }) => {
    await rebrickable.setUserToken();
    return next();
  })
  .query('get-my-lists', {
    async resolve() {
      const setLists = await rebrickable.getSetLists();
      return setLists.results;
    },
  })
  .query('get-sets-by-id', {
    input: z.object({ listId: z.number() }),
    async resolve({ input }) {
      if (input) {
        const sets = await rebrickable.getSetsByListId(input.listId);
        return sets.results.map((set: any) => set.set)
      }
    }
  })
  .query('get-set-by-id', {
    input: z.object({ setNum: z.string() }),
    async resolve({ input }) {
      if (input) {
        return await rebrickable.getSetById(input.setNum);
      }
    }
  });

// only export *type signature* of router!
// to avoid accidentally importing your API
// into client-side code
export type AppRouter = typeof appRouter;