import { inferQueryResponse } from './api/trpc/[trpc]';
import { trpc } from '@/utils/trpc';
import type React from 'react';

import type { NextPage } from 'next'
// import Image from 'next/image'

const Home: NextPage = () => {
  const { data, refetch, isLoading } = trpc.useQuery(['get-my-collection'], {
    refetchInterval: false,
    refetchOnReconnect: false,
    refetchOnWindowFocus: false,
  });

  return (
    <div className="h-screen w-screen relative">
      <main>
        <h1>Welcome to Legoist - powered by the Rebrickable API</h1>
      </main>
    </div>
  )
}

export default Home
