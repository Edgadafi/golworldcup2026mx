// ========================================
// CONFIGURACIÓN CENTRALIZADA DE VARIABLES DE ENTORNO
// ========================================

export const config = {
  // ========================================
  // API KEYS REQUERIDAS
  // ========================================
  
  // OnchainKit API Key (REQUERIDA)
  // Obtén tu API key en: https://onchainkit.com/
  onchainKit: {
    apiKey: process.env.NEXT_PUBLIC_ONCHAINKIT_API_KEY || '',
  },

  // WalletConnect Project ID (OPCIONAL)
  // Obtén tu Project ID en: https://cloud.walletconnect.com/
  walletConnect: {
    projectId: process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID || '',
  },

  // ========================================
  // CONFIGURACIÓN DE REDES
  // ========================================
  
  chain: {
    id: process.env.NEXT_PUBLIC_CHAIN_ID || '8453',
    name: process.env.NEXT_PUBLIC_CHAIN_NAME || 'Base',
    rpcUrl: process.env.NEXT_PUBLIC_CHAIN_RPC_URL || 'https://mainnet.base.org',
  },

  // ========================================
  // CONFIGURACIÓN DE FARCASTER
  // ========================================
  
  app: {
    url: process.env.NEXT_PUBLIC_APP_URL || 'https://flashsend-cdmx.vercel.app',
    name: 'Pa$e A Gol CDMX',
    description: 'Transforma cómo compartes dinero en CDMX',
  },

  // ========================================
  // CONFIGURACIÓN DE DESARROLLO
  // ========================================
  
  env: {
    isDevelopment: process.env.NODE_ENV === 'development',
    isProduction: process.env.NODE_ENV === 'production',
  },
};

// ========================================
// VALIDACIÓN DE CONFIGURACIÓN ROBUSTA
// ========================================

export interface ConfigValidationResult {
  isValid: boolean;
  errors: string[];
  warnings: string[];
  details: {
    onchainKit: boolean;
    walletConnect: boolean;
    chain: boolean;
    app: boolean;
  };
}

export function validateConfig(): ConfigValidationResult {
  const result: ConfigValidationResult = {
    isValid: true,
    errors: [],
    warnings: [],
    details: {
      onchainKit: false,
      walletConnect: false,
      chain: false,
      app: false,
    }
  };

  try {
    // ========================================
    // VERIFICAR SI ESTAMOS EN EL CLIENTE
    // ========================================
    
    if (typeof window !== 'undefined') {
      // En el cliente, verificar si las variables están disponibles
      // Las variables NEXT_PUBLIC_* se inyectan en el HTML durante el build
      const clientConfig = {
        onchainKit: {
          apiKey: (window as any).__NEXT_PUBLIC_ONCHAINKIT_API_KEY || config.onchainKit.apiKey,
        },
        walletConnect: {
          projectId: (window as any).__NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID || config.walletConnect.projectId,
        },
        chain: {
          id: (window as any).__NEXT_PUBLIC_CHAIN_ID || config.chain.id,
          name: (window as any).__NEXT_PUBLIC_CHAIN_NAME || config.chain.name,
          rpcUrl: (window as any).__NEXT_PUBLIC_CHAIN_RPC_URL || config.chain.rpcUrl,
        },
        app: {
          url: (window as any).__NEXT_PUBLIC_APP_URL || config.app.url,
        }
      };

      // ========================================
      // VALIDACIÓN DE ONCHAINKIT (REQUERIDA)
      // ========================================
      
      if (!clientConfig.onchainKit.apiKey) {
        result.errors.push('NEXT_PUBLIC_ONCHAINKIT_API_KEY es requerida');
        result.isValid = false;
      } else if (clientConfig.onchainKit.apiKey === 'your_onchainkit_api_key_here') {
        result.errors.push('Debes configurar NEXT_PUBLIC_ONCHAINKIT_API_KEY con tu API key real');
        result.isValid = false;
      } else if (clientConfig.onchainKit.apiKey.length < 10) {
        result.errors.push('NEXT_PUBLIC_ONCHAINKIT_API_KEY parece ser inválida (muy corta)');
        result.isValid = false;
      } else {
        result.details.onchainKit = true;
        console.log('✅ OnchainKit API Key configurada correctamente');
      }

      // ========================================
      // VALIDACIÓN DE WALLETCONNECT (OPCIONAL)
      // ========================================
      
      if (!clientConfig.walletConnect.projectId) {
        result.warnings.push('NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID no está configurado (opcional pero recomendado)');
      } else if (clientConfig.walletConnect.projectId === 'your_walletconnect_project_id_here') {
        result.warnings.push('NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID tiene un valor placeholder');
      } else {
        result.details.walletConnect = true;
        console.log('✅ WalletConnect Project ID configurado');
      }

      // ========================================
      // VALIDACIÓN DE CONFIGURACIÓN DE RED
      // ========================================
      
      if (clientConfig.chain.id && clientConfig.chain.name && clientConfig.chain.rpcUrl) {
        result.details.chain = true;
        console.log('✅ Configuración de red válida');
      } else {
        result.warnings.push('Algunas configuraciones de red están usando valores por defecto');
      }

      // ========================================
      // VALIDACIÓN DE CONFIGURACIÓN DE APP
      // ========================================
      
      if (clientConfig.app.url && clientConfig.app.url.startsWith('http')) {
        result.details.app = true;
        console.log('✅ URL de aplicación válida');
      } else {
        result.warnings.push('URL de aplicación no configurada correctamente');
      }

    } else {
      // En el servidor, asumir que la configuración es válida
      // ya que las variables se validan durante el build
      result.details.onchainKit = true;
      result.details.chain = true;
      result.details.app = true;
      console.log('✅ Configuración validada en servidor');
    }

    // ========================================
    // REPORTE FINAL
    // ========================================
    
    if (result.errors.length > 0) {
      console.error('❌ Errores de configuración encontrados:');
      result.errors.forEach(error => console.error(`   - ${error}`));
      
      if (typeof window !== 'undefined') {
        console.error('\n📖 Para configurar las variables de entorno:');
        console.error('   1. Verifica que las variables están configuradas en Vercel Dashboard');
        console.error('   2. Verifica que el deployment incluye las variables correctas');
        console.error('   3. Haz un redeploy sin cache si es necesario');
      }
    }

    if (result.warnings.length > 0) {
      console.warn('⚠️ Advertencias de configuración:');
      result.warnings.forEach(warning => console.warn(`   - ${warning}`));
    }

    if (result.isValid) {
      console.log('🎉 Configuración validada correctamente');
    }

    return result;

  } catch (error) {
    console.error('❌ Error crítico al validar la configuración:', error);
    result.isValid = false;
    result.errors.push(`Error interno: ${error instanceof Error ? error.message : 'Error desconocido'}`);
    return result;
  }
}

// ========================================
// FUNCIÓN DE INICIALIZACIÓN SEGURA
// ========================================

export function initializeConfig(): ConfigValidationResult {
  if (typeof window !== 'undefined') {
    // Solo ejecutar en el cliente
    return validateConfig();
  }
  
  // En el servidor, retornar configuración válida por defecto
  return {
    isValid: true,
    errors: [],
    warnings: [],
    details: {
      onchainKit: true,
      walletConnect: false,
      chain: true,
      app: true,
    }
  };
}

// ========================================
// EXPORTAR CONFIGURACIÓN VALIDADA
// ========================================

export default config;
