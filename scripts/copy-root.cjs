const fs = require('fs');
const path = require('path');

const distJs = path.join(__dirname, '..', 'dist', 'universal-device-card.js');
const rootJs = path.join(__dirname, '..', 'universal-device-card.js');
const distTrans = path.join(__dirname, '..', 'dist', 'translations');
const rootTrans = path.join(__dirname, '..', 'translations');

if (!fs.existsSync(distJs)) {
  console.error('dist/universal-device-card.js missing');
  process.exit(1);
}
fs.copyFileSync(distJs, rootJs);
console.log('Copied dist/universal-device-card.js -> universal-device-card.js');

// Keep root translations as source of truth; ensure dist already has a copy.
if (fs.existsSync(distTrans)) {
  fs.mkdirSync(rootTrans, { recursive: true });
}
