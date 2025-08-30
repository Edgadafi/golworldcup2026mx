# 🚀 Configuración de Variables de Entorno - Pa$e A Gol CDMX

## 📋 Variables Requeridas

### 1. **NEXT_PUBLIC_ONCHAINKIT_API_KEY** (OBLIGATORIA)
- **Descripción**: API key para OnchainKit (manejo de wallets y transacciones)
- **Cómo obtenerla**: 
  1. Ve a [https://onchainkit.com/](https://onchainkit.com/)
  2. Crea una cuenta o inicia sesión
  3. Genera una nueva API key
  4. Copia la key generada

### 2. **NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID** (OPCIONAL PERO RECOMENDADA)
- **Descripción**: Project ID para WalletConnect (conectividad entre wallets)
- **Cómo obtenerla**:
  1. Ve a [https://cloud.walletconnect.com/](https://cloud.walletconnect.com/)
  2. Crea una cuenta o inicia sesión
  3. Crea un nuevo proyecto
  4. Copia el Project ID

## 🔧 Pasos para Configurar

### Paso 1: Crear archivo .env.local
En la raíz de tu proyecto, crea un archivo llamado `.env.local`:

```bash
# En Windows (PowerShell)
New-Item -Path ".env.local" -ItemType File

# En macOS/Linux
touch .env.local
```

### Paso 2: Agregar las variables
Abre el archivo `.env.local` y agrega:

```env
# API Key de OnchainKit (REQUERIDA)
NEXT_PUBLIC_ONCHAINKIT_API_KEY=tu_api_key_aqui

# Project ID de WalletConnect (OPCIONAL)
NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID=tu_project_id_aqui

# URL de la aplicación
NEXT_PUBLIC_APP_URL=https://flashsend-cdmx.vercel.app

# Configuración de red
NEXT_PUBLIC_CHAIN_ID=8453
NEXT_PUBLIC_CHAIN_NAME=Base
NEXT_PUBLIC_CHAIN_RPC_URL=https://mainnet.base.org
```

### Paso 3: Reiniciar el servidor
Después de crear el archivo `.env.local`:

```bash
# Detener el servidor (Ctrl+C)
# Luego reiniciar
npm run dev
```

## ✅ Verificación

Si todo está configurado correctamente, deberías ver:

1. **Sin errores** en la consola del navegador
2. **Sin pantalla de error** de configuración
3. **La aplicación funcionando** normalmente
4. **Mensaje**: "✅ Configuración validada correctamente" en la consola

## 🚨 Solución de Problemas

### Error: "Configuración Requerida"
- Verifica que el archivo `.env.local` existe en la raíz del proyecto
- Verifica que las variables están escritas correctamente
- Verifica que no hay espacios extra o caracteres especiales

### Error: "API Key inválida"
- Verifica que la API key de OnchainKit es correcta
- Verifica que no tiene espacios o caracteres extra
- Regenera la API key si es necesario

### La aplicación sigue en bucle de carga
- Verifica que todas las variables están configuradas
- Verifica que el servidor se reinició después de los cambios
- Revisa la consola del navegador para errores específicos

## 🔒 Seguridad

- **NUNCA** subas el archivo `.env.local` a Git
- **NUNCA** compartas tus API keys públicamente
- El archivo `.env.local` ya está en `.gitignore` por seguridad

## 📞 Soporte

Si tienes problemas:
1. Revisa la consola del navegador para errores
2. Verifica que las variables están configuradas correctamente
3. Reinicia el servidor de desarrollo
4. Verifica que las API keys son válidas

---

**¡Con estas variables configuradas, tu mini app debería funcionar perfectamente!** 🎉
