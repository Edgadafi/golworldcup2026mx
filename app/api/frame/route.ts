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

    // Crear HTML con meta tags de Farcaster Frame
    const htmlResponse = `
<!DOCTYPE html>
<html lang="es-MX">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${responseTitle}</title>
    <meta property="og:title" content="${responseTitle}" />
    <meta property="og:description" content="${responseDescription}" />
    <meta property="og:image" content="${responseImage}" />
    
    <!-- Farcaster Frame Meta Tags -->
    <meta name="fc:frame" content="vNext" />
    <meta name="fc:frame:image" content="${responseImage}" />
    <meta name="fc:frame:button:1" content="🎯 Pa$e Rápido" />
    <meta name="fc:frame:button:2" content="👥 Pa$e Grupal" />
    <meta name="fc:frame:button:3" content="📊 Mercado" />
    <meta name="fc:frame:button:4" content="🏠 Inicio" />
    <meta name="fc:frame:post_url" content="https://flashsend-cdmx.vercel.app/api/frame" />
    <meta name="fc:frame:aspect_ratio" content="1.91:1" />
</head>
<body>
    <h1>${responseTitle}</h1>
    <p>${responseDescription}</p>
    <img src="${responseImage}" alt="${responseTitle}" style="max-width: 100%; height: auto;" />
</body>
</html>`;

    return new NextResponse(htmlResponse, {
      headers: {
        'Content-Type': 'text/html',
      },
    });
  } catch (error) {
    console.error('Error en Frame API:', error);
    
    // Respuesta de error por defecto
    const errorHtml = `
<!DOCTYPE html>
<html lang="es-MX">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Error - Pa$e a Gol</title>
    <meta property="og:title" content="Error - Pa$e a Gol" />
    <meta property="og:description" content="Ha ocurrido un error. Por favor, intenta de nuevo." />
    <meta property="og:image" content="https://flashsend-cdmx.vercel.app/PaseaGol-assets/images/hero-1200x630.png" />
    
    <!-- Farcaster Frame Meta Tags -->
    <meta name="fc:frame" content="vNext" />
    <meta name="fc:frame:image" content="https://flashsend-cdmx.vercel.app/PaseaGol-assets/images/hero-1200x630.png" />
    <meta name="fc:frame:button:1" content="🔄 Reintentar" />
    <meta name="fc:frame:post_url" content="https://flashsend-cdmx.vercel.app/api/frame" />
    <meta name="fc:frame:aspect_ratio" content="1.91:1" />
</head>
<body>
    <h1>Error - Pa$e a Gol</h1>
    <p>Ha ocurrido un error. Por favor, intenta de nuevo.</p>
</body>
</html>`;

    return new NextResponse(errorHtml, {
      headers: {
        'Content-Type': 'text/html',
      },
    });
  }
}

export async function GET() {
  // Respuesta GET para mostrar el Frame inicial
  const htmlResponse = `
<!DOCTYPE html>
<html lang="es-MX">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Pa$e a Gol - CDMX</title>
    <meta property="og:title" content="¡Juega, predice y gana con pa$e a gol!" />
    <meta property="og:description" content="La mejor plataforma para transferencias rápidas y predicciones deportivas" />
    <meta property="og:image" content="https://flashsend-cdmx.vercel.app/PaseaGol-assets/images/hero-1200x630.png" />
    
    <!-- Farcaster Frame Meta Tags -->
    <meta name="fc:frame" content="vNext" />
    <meta name="fc:frame:image" content="https://flashsend-cdmx.vercel.app/PaseaGol-assets/images/hero-1200x630.png" />
    <meta name="fc:frame:button:1" content="🎯 Pa$e Rápido" />
    <meta name="fc:frame:button:2" content="👥 Pa$e Grupal" />
    <meta name="fc:frame:button:3" content="📊 Mercado" />
    <meta name="fc:frame:button:4" content="🏠 Inicio" />
    <meta name="fc:frame:post_url" content="https://flashsend-cdmx.vercel.app/api/frame" />
    <meta name="fc:frame:aspect_ratio" content="1.91:1" />
</head>
<body>
    <h1>¡Juega, predice y gana con pa$e a gol!</h1>
    <p>La mejor plataforma para transferencias rápidas y predicciones deportivas</p>
    <img src="https://flashsend-cdmx.vercel.app/PaseaGol-assets/images/hero-1200x630.png" alt="Pa$e a Gol" style="max-width: 100%; height: auto;" />
</body>
</html>`;

  return new NextResponse(htmlResponse, {
    headers: {
      'Content-Type': 'text/html',
    },
  });
}
