import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { untrustedData, trustedData } = body;

    // Obtener el botón presionado
    const buttonIndex = untrustedData?.buttonIndex || 1;
    const userMessage = untrustedData?.inputText || '';

    let responseImage = 'https://flashsend-cdmx.vercel.app/PaseaGol-assets/images/hero-1200x630.png';
    let responseTitle = 'Pa$e a Gol - CDMX';
    let responseDescription = '¡Juega, predice y gana con pa$e a gol!';

    // Personalizar respuesta según el botón presionado
    switch (buttonIndex) {
      case 1: // Pa$e Rápido
        responseImage = 'https://flashsend-cdmx.vercel.app/PaseaGol-assets/images/preview-1200x630.png';
        responseTitle = '🎯 Pa$e Rápido';
        responseDescription = 'Transferencia instantánea al instante';
        break;
      case 2: // Pa$e Grupal
        responseImage = 'https://flashsend-cdmx.vercel.app/PaseaGol-assets/images/og-1200x630.png';
        responseTitle = '👥 Pa$e Grupal';
        responseDescription = 'Enviar a múltiples usuarios';
        break;
      case 3: // Mercado
        responseImage = 'https://flashsend-cdmx.vercel.app/PaseaGol-assets/images/preview-1200x630.png';
        responseTitle = '📊 Mercado';
        responseDescription = 'Predicciones deportivas del Mundial 2026';
        break;
      case 4: // Inicio
        responseImage = 'https://flashsend-cdmx.vercel.app/PaseaGol-assets/images/hero-1200x630.png';
        responseTitle = '🏠 Inicio';
        responseDescription = '¡Bienvenido a Pa$e a Gol!';
        break;
      default:
        responseImage = 'https://flashsend-cdmx.vercel.app/PaseaGol-assets/images/hero-1200x630.png';
        responseTitle = 'Pa$e a Gol - CDMX';
        responseDescription = '¡Juega, predice y gana con pa$e a gol!';
    }

    // Crear la respuesta del Frame
    const frameResponse = {
      frames: [
        {
          image: responseImage,
          title: responseTitle,
          description: responseDescription,
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

    return NextResponse.json(frameResponse);
  } catch (error) {
    console.error('Error en Frame API:', error);
    
    // Respuesta de error por defecto
    return NextResponse.json({
      frames: [
        {
          image: 'https://flashsend-cdmx.vercel.app/PaseaGol-assets/images/hero-1200x630.png',
          title: 'Pa$e a Gol - CDMX',
          description: '¡Juega, predice y gana con pa$e a gol!',
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
        title: 'Pa$e a Gol - CDMX',
        description: '¡Juega, predice y gana con pa$e a gol!',
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
