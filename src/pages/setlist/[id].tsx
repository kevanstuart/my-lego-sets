import { inferQueryResponse } from '../api/trpc/[trpc]'
import { useRouter } from 'next/router';
import { trpc } from '@/utils/trpc';
import type React from 'react';
import Link from 'next/link';

const Setlist: React.FC = () => {
  const router = useRouter()
  const { id } = router.query

  const { data } = trpc.useQuery(['get-sets-by-id', { setId: +id! }], {
    refetchInterval: false,
    refetchOnReconnect: false,
    refetchOnWindowFocus: false,
  });

  return (
    <div className="bg-slate-100">
      <main className="w-screen relative p-4">
        <h1 className="text-2xl text-center pt-8">Welcome to Legoist - powered by the Rebrickable API</h1>
        <div className="text-xl text-center pt-8 max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            { data && data.map((set: any) => (
              <SetCard key={set.set_num} set={set} />
            ))}
          </div>
        </div>
      </main>
    </div>
  )
}

export default Setlist;

type SetFromServer = inferQueryResponse<"get-sets-by-id">[0];

const SetCard: React.FC<{
  set: SetFromServer
}> = ({ set }) => {
  return (
    <div className="p-4 bg-white rounded-md shadow">
      <div className="flex h-72 items-center justify-center overflow-hidden">
        <img src={set.set_img_url} className="max-h-full" />
      </div>
      <div>
        <h5 className="mt-5">
          <Link href={`/set/${set.set_num}`}>
            <a>{`${set.set_num}: ${set.name}`}</a>
          </Link>
        </h5>
      </div>
    </div>
  );
};