// Script para renombrar archivos de assets eliminando la doble extensión
const fs = require('fs');
const path = require('path');

const assetsDir = 'public/pase-a-gol-assets';

// Función para renombrar archivos
function renameFiles(directory) {
  if (!fs.existsSync(directory)) {
    console.log(`❌ Directorio no encontrado: ${directory}`);
    return;
  }

  const files = fs.readdirSync(directory);
  
  files.forEach(file => {
    const filePath = path.join(directory, file);
    const stats = fs.statSync(filePath);
    
    if (stats.isDirectory()) {
      // Si es un directorio, procesar recursivamente
      renameFiles(filePath);
    } else if (file.endsWith('.png.png')) {
      // Renombrar archivos con doble extensión
      const newName = file.replace('.png.png', '.png');
      const newPath = path.join(directory, newName);
      
      try {
        fs.renameSync(filePath, newPath);
        console.log(`✅ Renombrado: ${file} → ${newName}`);
      } catch (error) {
        console.log(`❌ Error renombrando ${file}:`, error.message);
      }
    }
  });
}

console.log('🔄 Iniciando renombrado de archivos de assets...');

// Renombrar archivos en imágenes
console.log('\n📁 Procesando directorio de imágenes...');
renameFiles(path.join(assetsDir, 'images'));

// Renombrar archivos en screenshots
console.log('\n📁 Procesando directorio de screenshots...');
renameFiles(path.join(assetsDir, 'screenshots'));

console.log('\n🎉 Renombrado de archivos completado!');
console.log('📁 Verificando estructura final...');

// Mostrar estructura final
function showStructure(dir, indent = '') {
  if (!fs.existsSync(dir)) return;
  
  const items = fs.readdirSync(dir);
  items.forEach(item => {
    const itemPath = path.join(dir, item);
    const stats = fs.statSync(itemPath);
    
    if (stats.isDirectory()) {
      console.log(`${indent}📁 ${item}/`);
      showStructure(itemPath, indent + '  ');
    } else {
      console.log(`${indent}📄 ${item}`);
    }
  });
}

showStructure(assetsDir);
