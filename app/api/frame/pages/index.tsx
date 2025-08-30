import Head from "next/head";

export default function Home() {
  return (
    <>
      <Head>
        <title>pa$e a gol</title>
        <meta property="og:title" content="¡Juega, predice y gana con pa$e a gol!" />
        <meta property="og:image" content="https://flashsend-cdmx.vercel.app/splash.png" />
        
        {/* Frame meta tags */}
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
