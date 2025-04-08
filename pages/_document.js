import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <link rel="icon" href="/favicon.ico" />
        <meta charSet="utf-8" />
        <meta name="theme-color" content="#4285F4" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}