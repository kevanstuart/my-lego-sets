import { inferQueryResponse } from '../api/trpc/[trpc]'
import { useRouter } from 'next/router';
import { trpc } from '@/utils/trpc';
import type React from 'react';

const Set: React.FC = () => {
  const router = useRouter();
  const { id } = router.query;

  const { data: set } = trpc.useQuery(['get-set-by-id', { setNum: id as string }], {
    refetchInterval: false,
    refetchOnReconnect: false,
    refetchOnWindowFocus: false,
  });


  return (
    <div className="bg-slate-100">
      <main className="w-screen relative p-4">
        <h1 className="text-2xl text-center pt-8">Welcome to Legoist - powered by the Rebrickable API</h1>
        <div className="text-xl text-center pt-8 max-w-4xl mx-auto">
        { set && <SetCard set={set} /> }
        </div>
      </main>
    </div>
  );
}

export default Set;

type SetFromServer = inferQueryResponse<"get-set-by-id">;

const SetCard: React.FC<{
  set: SetFromServer
}> = ({ set }) => {
  return (
    <div className="p-4 bg-white rounded-md shadow">
      {<div className="flex h-72 items-center justify-center overflow-hidden">
        <img src={set.set_img_url} className="max-h-full" />
      </div>}
      {<div>
        <h5 className="mt-5">
          <a>{`${set.set_num}: ${set.name}`}</a>
        </h5>
        <ul>
          <li>Year: {set.year}</li>
          <li>Theme: {set.theme}</li>
          <li>Part count: {set.num_parts}</li>
        </ul>
      </div>}
    </div>
  );
};