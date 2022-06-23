import { Rebrickable } from '@/pages/api/utils/rebrickable';
import * as trpc from '@trpc/server';
import { z } from 'zod';

const api = new Rebrickable();

export const appRouter = trpc
  .router()
  .query('get-my-lists', {
    input: z.object({ text: z.string().nullish() }).nullish(),
    async resolve({ input }) {      
      const setLists = await api.getSetLists();

      return setLists.results;
    },
  });

// only export *type signature* of router!
// to avoid accidentally importing your API
// into client-side code
export type AppRouter = typeof appRouter;