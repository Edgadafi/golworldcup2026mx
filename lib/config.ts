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
    // VALIDACIÓN DE ONCHAINKIT (REQUERIDA)
    // ========================================
    
    if (!config.onchainKit.apiKey) {
      result.errors.push('NEXT_PUBLIC_ONCHAINKIT_API_KEY es requerida');
      result.isValid = false;
    } else if (config.onchainKit.apiKey === 'your_onchainkit_api_key_here') {
      result.errors.push('Debes configurar NEXT_PUBLIC_ONCHAINKIT_API_KEY con tu API key real');
      result.isValid = false;
    } else if (config.onchainKit.apiKey.length < 10) {
      result.errors.push('NEXT_PUBLIC_ONCHAINKIT_API_KEY parece ser inválida (muy corta)');
      result.isValid = false;
    } else {
      result.details.onchainKit = true;
      console.log('✅ OnchainKit API Key configurada correctamente');
    }

    // ========================================
    // VALIDACIÓN DE WALLETCONNECT (OPCIONAL)
    // ========================================
    
    if (!config.walletConnect.projectId) {
      result.warnings.push('NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID no está configurado (opcional pero recomendado)');
    } else if (config.walletConnect.projectId === 'your_walletconnect_project_id_here') {
      result.warnings.push('NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID tiene un valor placeholder');
    } else {
      result.details.walletConnect = true;
      console.log('✅ WalletConnect Project ID configurado');
    }

    // ========================================
    // VALIDACIÓN DE CONFIGURACIÓN DE RED
    // ========================================
    
    if (config.chain.id && config.chain.name && config.chain.rpcUrl) {
      result.details.chain = true;
      console.log('✅ Configuración de red válida');
    } else {
      result.warnings.push('Algunas configuraciones de red están usando valores por defecto');
    }

    // ========================================
    // VALIDACIÓN DE CONFIGURACIÓN DE APP
    // ========================================
    
    if (config.app.url && config.app.url.startsWith('http')) {
      result.details.app = true;
      console.log('✅ URL de aplicación válida');
    } else {
      result.warnings.push('URL de aplicación no configurada correctamente');
    }

    // ========================================
    // REPORTE FINAL
    // ========================================
    
    if (result.errors.length > 0) {
      console.error('❌ Errores de configuración encontrados:');
      result.errors.forEach(error => console.error(`   - ${error}`));
      
      console.error('\n📖 Para configurar las variables de entorno:');
      console.error('   1. Verifica que el archivo .env.local existe en la raíz del proyecto');
      console.error('   2. Verifica que las variables están escritas correctamente');
      console.error('   3. Reinicia el servidor de desarrollo');
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
