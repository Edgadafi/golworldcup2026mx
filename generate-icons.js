// Script para generar iconos en diferentes tamaños
// Necesitas tener ImageMagick instalado: https://imagemagick.org/script/download.php

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const iconSizes = [512, 192, 144, 96, 72, 48, 32, 16, 180];
const sourceIcon = 'public/Pa$e a Gol-assets/icons/icon-1024.png.png';
const outputDir = 'public/pase-a-gol-assets/icons';

// Crear directorio de salida si no existe
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

// Copiar el icono principal
const mainIcon = path.join(outputDir, 'icon-1024.png');
if (fs.existsSync(sourceIcon)) {
  fs.copyFileSync(sourceIcon, mainIcon);
  console.log('✅ Icono principal copiado');
} else {
  console.log('⚠️ Icono principal no encontrado, creando placeholder');
  // Crear un icono placeholder simple
  const canvas = require('canvas');
  const c = canvas.createCanvas(1024, 1024);
  const ctx = c.getContext('2d');
  
  // Fondo verde
  ctx.fillStyle = '#10B981';
  ctx.fillRect(0, 0, 1024, 1024);
  
  // Texto
  ctx.fillStyle = 'white';
  ctx.font = 'bold 48px Arial';
  ctx.textAlign = 'center';
  ctx.fillText('Pa$e A Gol', 512, 512);
  
  const buffer = c.toBuffer('image/png');
  fs.writeFileSync(mainIcon, buffer);
  console.log('✅ Icono placeholder creado');
}

// Generar iconos en diferentes tamaños
iconSizes.forEach(size => {
  const outputFile = path.join(outputDir, `icon-${size}.png`);
  
  try {
    // Usar ImageMagick para redimensionar
    execSync(`magick convert "${mainIcon}" -resize ${size}x${size} "${outputFile}"`);
    console.log(`✅ Icono ${size}x${size} generado`);
  } catch (error) {
    console.log(`⚠️ No se pudo generar icono ${size}x${size} (ImageMagick no disponible)`);
    // Crear un icono placeholder
    const canvas = require('canvas');
    const c = canvas.createCanvas(size, size);
    const ctx = c.getContext('2d');
    
    ctx.fillStyle = '#10B981';
    ctx.fillRect(0, 0, size, size);
    
    ctx.fillStyle = 'white';
    ctx.font = `bold ${Math.max(12, size/8)}px Arial`;
    ctx.textAlign = 'center';
    ctx.fillText('Pa$e', size/2, size/2 - 5);
    ctx.fillText('A Gol', size/2, size/2 + 10);
    
    const buffer = c.toBuffer('image/png');
    fs.writeFileSync(outputFile, buffer);
    console.log(`✅ Icono placeholder ${size}x${size} creado`);
  }
});

console.log('🎉 Generación de iconos completada');
console.log('📁 Iconos generados en:', outputDir);
