const fs = require('fs');
const path = require('path');

const src = path.join(__dirname, '..', 'translations');
const dest = path.join(__dirname, '..', 'dist', 'translations');

if (!fs.existsSync(src)) {
  console.warn('translations/ not found, skipping copy');
  process.exit(0);
}

fs.mkdirSync(dest, { recursive: true });
fs.readdirSync(src).forEach((name) => {
  const srcFile = path.join(src, name);
  const destFile = path.join(dest, name);
  if (fs.statSync(srcFile).isFile()) {
    fs.copyFileSync(srcFile, destFile);
  }
});
console.log('Copied translations/ to dist/translations/');
