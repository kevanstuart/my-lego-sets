import { inferQueryResponse } from '@/pages/api/trpc/[trpc]'
import { trpc } from '@/utils/trpc';
import type React from 'react';
import Link from 'next/link';

const Index: React.FC = () => {
  const btn = `bg-blue-500 hover:bg-blue-400 text-white font-bold 
  py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded`;

  const { data: lists } = trpc.useQuery(['get-my-lists']);
  type ListFromServer = inferQueryResponse<'get-my-lists'>[0];

  return (
    <div className="h-screen w-screen relative">
      <main>
        <h1 className="text-2xl text-center pt-8">Welcome to Legoist - powered by the Rebrickable API</h1>
        <div className="text-xl text-center pt-8 max-w-4xl mx-auto">
          <h3>Please select your collection:</h3>
          <div className="p-8 flex justify-between items-center max-w-2xl mx-auto">
            { lists && lists.map((item: ListFromServer) => (
              <Link key={item.id} href={`/setlist/${item.id}`}>
                <a className={btn}>{item.name}</a>
              </Link>
            ))}
          </div>
        </div>
      </main>
    </div>
  )
};

export default Index;
