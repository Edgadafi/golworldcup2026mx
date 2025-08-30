import { Metadata } from 'next';
import HomePageClient from './components/HomePageClient';

export const metadata: Metadata = {
  title: 'pa$e a gol',
  description: '¡Juega, predice y gana con pa$e a gol!',
  openGraph: {
    title: '¡Juega, predice y gana con pa$e a gol!',
    description: 'La mejor plataforma para transferencias rápidas y predicciones deportivas',
    images: [
      {
        url: 'https://flashsend-cdmx.vercel.app/PaseaGol-assets/images/hero-1200x630.png',
        width: 1200,
        height: 630,
        alt: 'Pa$e a Gol - Plataforma de Transferencias',
      },
    ],
  },
  other: {
    'fc:frame': 'vNext',
    'fc:frame:image': 'https://flashsend-cdmx.vercel.app/PaseaGol-assets/images/hero-1200x630.png',
    'fc:frame:button:1': 'Jugar',
    'fc:frame:button:1:action': 'post',
    'fc:frame:button:1:target': 'https://flashsend-cdmx.vercel.app/api/frame',
    'fc:frame:post_url': 'https://flashsend-cdmx.vercel.app/api/frame',
  },
};

export default function HomePage() {
  return <HomePageClient />;
}
