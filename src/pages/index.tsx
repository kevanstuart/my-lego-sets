import { inferQueryResponse } from './api/trpc/[trpc]';
import { trpc } from '@/utils/trpc';
import type React from 'react';

import type { NextPage } from 'next'
// import Image from 'next/image'

const Home: NextPage = () => {
  const { data, refetch, isLoading } = trpc.useQuery(['get-my-lists'], {
    refetchInterval: false,
    refetchOnReconnect: false,
    refetchOnWindowFocus: false,
  });

  return (
    <div className="h-screen w-screen relative">
      <main>
        <h1 className="text-2xl text-center pt-8">Welcome to Legoist - powered by the Rebrickable API</h1>
        <div className="text-xl text-center pt-8">
          <h3>Please select your collection:</h3>
          <ul>
            { data && data.map((item: any) => (
              <li>{item.name}</li>
            ))}
          </ul>
        </div>
      </main>
    </div>
  )
}

export default Home
