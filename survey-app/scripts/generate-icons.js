const fs = require('fs')
const path = require('path')

const iconsDir = path.join(__dirname, '../public/icons')
if (!fs.existsSync(iconsDir)) {
  fs.mkdirSync(iconsDir, { recursive: true })
}

const sizes = [72, 96, 128, 144, 152, 192, 384, 512]

// Create a simple SVG-based PNG placeholder using canvas-like approach
// Since we can't use canvas in Node without extra deps, create SVG files
sizes.forEach(size => {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 ${size} ${size}">
  <rect width="${size}" height="${size}" fill="#173901" rx="${size * 0.15}"/>
  <text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" fill="white" font-size="${size * 0.4}" font-family="sans-serif">🌸</text>
</svg>`
  
  fs.writeFileSync(path.join(iconsDir, `icon-${size}x${size}.svg`), svg)
  console.log(`Created icon-${size}x${size}.svg`)
})

console.log('Icons generated!')
