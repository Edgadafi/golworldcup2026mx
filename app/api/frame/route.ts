import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  // Frame metadata para Farcaster
  const frameMetadata = {
    "fc:frame": "vNext",
    "fc:frame:image": "https://flashsend-cdmx.vercel.app/Pa$e%20a%20Gol-assets/images/preview-1200x630.png.png",
    "fc:frame:button:1": "⚽ ¡Pa$e a Gol!",
    "fc:frame:button:2": "🎯 Ver Estadísticas",
    "fc:frame:button:3": "🏆 Mundial 2026",
    "fc:frame:button:4": "💰 Conectar Wallet",
    "fc:frame:post_url": "https://flashsend-cdmx.vercel.app/api/frame",
    "fc:frame:input:text": "Monto a transferir (MXN)",
    "fc:frame:state": "pase-a-gol-cdmx-v1",
    "fc:frame:aspect_ratio": "1.91:1"
  };

  // Retornar el frame metadata
  return NextResponse.json(frameMetadata, {
    headers: {
      'Content-Type': 'application/json',
      'Cache-Control': 'no-cache, no-store, must-revalidate',
      'Pragma': 'no-cache',
      'Expires': '0'
    }
  });
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    console.log('Frame interaction received:', body);

    // Procesar la interacción del frame
    const { buttonIndex, inputText, state } = body;

    let responseMessage = '';
    let responseImage = '';

    switch (buttonIndex) {
      case 1: // ¡Pa$e a Gol!
        responseMessage = '⚽ ¡Iniciando transferencia! Ingresa el monto y destinatario.';
        responseImage = 'https://flashsend-cdmx.vercel.app/Pa$e%20a%20Gol-assets/images/preview-1200x630.png.png';
        break;
      case 2: // Ver Estadísticas
        responseMessage = '🎯 Estadísticas del Mundial 2026: Pa$es completados: 127, Efectividad: 98%';
        responseImage = 'https://flashsend-cdmx.vercel.app/Pa$e%20a%20Gol-assets/screenshots/screenshot-1-dashboard.png.png';
        break;
      case 3: // Mundial 2026
        responseMessage = '🏆 Mundial 2026 en México: ¡La fiesta del fútbol está por comenzar!';
        responseImage = 'https://flashsend-cdmx.vercel.app/Pa$e%20a%20Gol-assets/images/hero-1200x630.png.png';
        break;
      case 4: // Conectar Wallet
        responseMessage = '💰 Conecta tu wallet para empezar a enviar dinero al instante.';
        responseImage = 'https://flashsend-cdmx.vercel.app/Pa$e%20a%20Gol-assets/images/preview-1200x630.png.png';
        break;
      default:
        responseMessage = '¡Bienvenido a Pa$e A Gol CDMX! Selecciona una opción para continuar.';
        responseImage = 'https://flashsend-cdmx.vercel.app/Pa$e%20a%20Gol-assets/images/preview-1200x630.png.png';
    }

    // Crear respuesta del frame
    const frameResponse = {
      "fc:frame": "vNext",
      "fc:frame:image": responseImage,
      "fc:frame:button:1": "🏠 Volver al Inicio",
      "fc:frame:button:2": "🔄 Otra Acción",
      "fc:frame:post_url": "https://flashsend-cdmx.vercel.app/api/frame",
      "fc:frame:state": "response-" + Date.now()
    };

    return NextResponse.json(frameResponse, {
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'no-cache, no-store, must-revalidate'
      }
    });

  } catch (error) {
    console.error('Error processing frame interaction:', error);
    
    // Respuesta de error
    const errorResponse = {
      "fc:frame": "vNext",
      "fc:frame:image": "https://flashsend-cdmx.vercel.app/Pa$e%20a%20Gol-assets/images/preview-1200x630.png.png",
      "fc:frame:button:1": "🔄 Reintentar",
      "fc:frame:post_url": "https://flashsend-cdmx.vercel.app/api/frame",
      "fc:frame:state": "error-" + Date.now()
    };

    return NextResponse.json(errorResponse, {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'no-cache, no-store, must-revalidate'
      }
    });
  }
}
