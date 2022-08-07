import { appRouter, AppRouter } from '@/server/router';
import * as trpcNext from '@trpc/server/adapters/next';
import { inferProcedureOutput } from '@trpc/server';

const createContext = async (
  { req, res }: trpcNext.CreateNextContextOptions
) => {
  return { req, res };
};

export default trpcNext.createNextApiHandler({
  router: appRouter,
  createContext
});

export type inferQueryResponse<
  TRouteKey extends keyof AppRouter['_def']['queries']
> = inferProcedureOutput<AppRouter['_def']['queries'][TRouteKey]>;
