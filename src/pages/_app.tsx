import { DefaultOptions } from 'react-query';
import type { AppProps } from 'next/app';
import { withTRPC } from '@trpc/next';
import "tailwindcss/tailwind.css";

import { AppRouter } from '@/server/router';
import Header from '@/components/Header';

const Legoist = ({ Component, pageProps }: AppProps) => {
  const title = 'Legoist - Private Lego Collections';
  const description = `
    Save and view your Lego collection - 
    Powered by Rebrickable
  `;
  const imageMetaURL = '/';
  
  return (
    <>
      <Header 
        title={title}
        description={description}
        imageMetaURL={imageMetaURL}
      />
      <Component {...pageProps} />
    </>
  );
};

export default withTRPC<AppRouter>({
  config({ ctx }) {
    const url = (process.env.VERCEL_URL)
      ? `https://${process.env.VERCEL_URL}/api/trpc`
      : `http://localhost:${process.env.PORT ?? 3000}/api/trpc`;

    const defaultOptions: DefaultOptions = {
      queries: { staleTime: 60 * 60 * 1000 }
    };

    return {
      url,
      queryClientConfig: { defaultOptions }
    };
  },
  ssr: true,
  responseMeta({ clientErrors, ctx }) {
    if (clientErrors.length) {
      return {
        status: clientErrors[0].data?.httpStatus ?? 500,
      };
    }

    const ONE_DAY_IN_SECONDS = 60 * 60 * 24;
    const ONE_WEEK_IN_SECONDS = ONE_DAY_IN_SECONDS * 7; 
    
    return {
      'Cache-Control': `s-maxage=${ONE_WEEK_IN_SECONDS}, stale-while-revalidate=${ONE_DAY_IN_SECONDS}`,
    };
  },
})(Legoist);
