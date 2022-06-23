import { AppRouter } from '@/server/router';
import type { AppProps } from 'next/app';
import { withTRPC } from '@trpc/next';
import "tailwindcss/tailwind.css";
import Head from "next/head";

const Legoist = ({ Component, pageProps }: AppProps) => {
  const title = 'Legoist - Private Lego Collections';
  const description = 
    'Save and view your Lego collection - Powered by Rebrickable';
  const imageMetaURL = '/';
  
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <link rel="icon" href={"https://roundest.t3.gg/favicon.ico"} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:image" content={imageMetaURL} />
        <meta name="twitter:image" content={imageMetaURL} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="theme-color" content="#ffffff" />

        {/* <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png?v=2"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png?v=2"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png?v=2"
        />
        <link rel="manifest" href="/site.webmanifest?v=2" />
        <link rel="shortcut icon" href="/favicon.ico?v=2" /> */}
        <meta
          name="apple-mobile-web-app-title"
          content="Legoist - powered by the Rebrickable API"
        />
        <meta
          name="application-name"
          content="Legoist - powered by the Rebrickable API"
        />
      </Head>
      <Component {...pageProps} />
    </>
  );
};

const getBaseUrl = () => {
  if (typeof window === 'undefined') return "";
  if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`;

  return `http://localhost:${process.env.PORT ?? 3000}`;
}

export default withTRPC<AppRouter>({
  config({ ctx }) {
    const url = `${getBaseUrl()}/api/trpc`;
    return {
      url,
      /**
       * @link https://react-query.tanstack.com/reference/QueryClient
       */
      // queryClientConfig: { defaultOptions: { queries: { staleTime: 60 } } },
    };
  },
  /**
   * @link https://trpc.io/docs/ssr
   */
  ssr: false,
})(Legoist);
