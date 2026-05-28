import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="tr">
      <Head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="description" content="Anima — Psikolojik Dayanıklılık Uygulaması" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <body style={{ margin: 0, padding: 0, fontFamily: "'DM Sans', sans-serif" }}>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
