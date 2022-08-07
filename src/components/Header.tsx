import Head from "next/head";
import React from "react";

interface HeaderProps {
  title: string;
  description: string;
  imageMetaURL: string;
}

const Header: React.FC<HeaderProps> = ({
  title, description, imageMetaURL
}) => {
  return (
    <Head>
      <title>{title}</title>
      <link rel="icon" href={"https://roundest.t3.gg/favicon.ico"} />
      <meta name="description" content={description} />

      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={imageMetaURL} />

      <meta name="twitter:image" content={imageMetaURL} />
      <meta name="twitter:card" content="summary_large_image" />
      
      <meta name="theme-color" content="#ffffff" />
      <meta
        name="apple-mobile-web-app-title"
        content="Legoist - powered by the Rebrickable API"
      />
      <meta
        name="application-name"
        content="Legoist - powered by the Rebrickable API"
      />
    </Head>
  );
}

export default Header;
