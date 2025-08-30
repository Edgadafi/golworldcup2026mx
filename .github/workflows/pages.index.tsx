// pages/index.tsx
import Head from "next/head";

export default function Home() {
  return (
    <>
      <Head>
        <title>pa$e a gol</title>
        <meta name="fc:frame" content="vNext" />
        <meta name="fc:frame:image" content="https://flashsend-cdmx.vercel.app/splash.png" />
        <meta name="fc:frame:button:1" content="Jugar" />
        <meta name="fc:frame:button:1:action" content="post" />
        <meta name="fc:frame:button:1:target" content="https://flashsend-cdmx.vercel.app/api/jugar" />
      </Head>
      <main>
        <h1>Bienvenido a pa$e a gol</h1>
      </main>
    </>
  );
}
