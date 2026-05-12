const fs = require('fs');
const path = require('path');

function walk(dir, callback) {
  fs.readdirSync(dir).forEach(f => {
    let dirPath = path.join(dir, f);
    let isDirectory = fs.statSync(dirPath).isDirectory();
    isDirectory ? walk(dirPath, callback) : callback(path.join(dir, f));
  });
}

walk('./app', function(filePath) {
  if (filePath.endsWith('.tsx') || filePath.endsWith('.ts') || filePath.endsWith('.css')) {
    let content = fs.readFileSync(filePath, 'utf8');
    let original = content;

    // Colors
    content = content.replace(/text-white/g, 'text-gray-900');
    content = content.replace(/text-gray-300/g, 'text-gray-700');
    content = content.replace(/text-gray-400/g, 'text-gray-600');
    content = content.replace(/text-gray-500/g, 'text-gray-500');
    content = content.replace(/bg-black/g, 'bg-blue-50');
    
    // Borders
    content = content.replace(/border-white\/5/g, 'border-gray-200');
    content = content.replace(/border-white\/10/g, 'border-gray-200');
    content = content.replace(/border-white\/20/g, 'border-gray-300');
    content = content.replace(/border-gray-800/g, 'border-gray-300');
    content = content.replace(/border-gray-600/g, 'border-gray-400');
    
    // Specific colors to theme
    content = content.replace(/bg-gold/g, 'bg-primary');
    content = content.replace(/text-gold/g, 'text-primary');
    content = content.replace(/border-gold/g, 'border-primary');
    content = content.replace(/gold-hover/g, 'primary-hover');
    content = content.replace(/border-border-dark/g, 'border-border-light');
    content = content.replace(/shadow-black\/50/g, 'shadow-blue-900\/10');
    content = content.replace(/shadow-black/g, 'shadow-blue-900\/10');
    
    // Fonts (Serif -> Sans/Display)
    content = content.replace(/font-serif/g, 'font-display');
    content = content.replace(/grayscale-\[20\%\]/g, 'grayscale-0');
    content = content.replace(/contrast-125/g, 'contrast-100');

    if (content !== original) {
      fs.writeFileSync(filePath, content, 'utf8');
      console.log('Updated:', filePath);
    }
  }
});
