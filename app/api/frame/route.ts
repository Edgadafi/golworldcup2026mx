import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { untrustedData, trustedData } = body;

    // Obtener el mensaje del usuario si existe
    const userMessage = untrustedData?.inputText || '';

    // Crear la respuesta del Frame
    const frameResponse = {
      frames: [
        {
          image: 'https://flashsend-cdmx.vercel.app/PaseaGol-assets/images/hero-1200x630.png',
          buttons: [
            {
              label: '🎯 Pa$e Rápido',
              action: 'post',
            },
            {
              label: '👥 Pa$e Grupal',
              action: 'post',
            },
            {
              label: '📊 Mercado',
              action: 'post',
            },
            {
              label: '🏠 Inicio',
              action: 'post',
            },
          ],
          postUrl: 'https://flashsend-cdmx.vercel.app/api/frame',
        },
      ],
    };

    // Si hay un mensaje del usuario, personalizar la respuesta
    if (userMessage) {
      frameResponse.frames[0].image = 'https://flashsend-cdmx.vercel.app/PaseaGol-assets/images/og-1200x630.png';
    }

    return NextResponse.json(frameResponse);
  } catch (error) {
    console.error('Error en Frame API:', error);
    
    // Respuesta de error por defecto
    return NextResponse.json({
      frames: [
        {
          image: 'https://flashsend-cdmx.vercel.app/PaseaGol-assets/images/hero-1200x630.png',
          buttons: [
            {
              label: '🔄 Reintentar',
              action: 'post',
            },
          ],
          postUrl: 'https://flashsend-cdmx.vercel.app/api/frame',
        },
      ],
    });
  }
}

export async function GET() {
  // Respuesta GET para mostrar el Frame inicial
  return NextResponse.json({
    frames: [
      {
        image: 'https://flashsend-cdmx.vercel.app/PaseaGol-assets/images/hero-1200x630.png',
        buttons: [
          {
            label: '🎯 Pa$e Rápido',
            action: 'post',
          },
          {
            label: '👥 Pa$e Grupal',
            action: 'post',
          },
          {
            label: '📊 Mercado',
            action: 'post',
          },
          {
            label: '🏠 Inicio',
            action: 'post',
          },
        ],
        postUrl: 'https://flashsend-cdmx.vercel.app/api/frame',
      },
    ],
  });
}
