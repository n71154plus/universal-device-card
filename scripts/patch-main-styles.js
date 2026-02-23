import { readFileSync, writeFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, '..');
let src = readFileSync(join(root, 'universal-device-card.js'), 'utf8');

const startMark = '  static get styles() {\n    return css`';
const endMark = '    `;\n  }\n}\n\ncustomElements.define';
if (!src.includes(startMark)) {
  console.error('Start mark not found');
  process.exit(1);
}
if (!src.includes(endMark)) {
  console.error('End mark not found');
  process.exit(1);
}
const replacement = '  static get styles() {\n    return [cardStyles, popupStyles];\n  }\n}\n\ncustomElements.define';
const regex = new RegExp(startMark.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + '[\\s\\S]*?' + endMark.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'));
src = src.replace(regex, replacement);
writeFileSync(join(root, 'universal-device-card.js'), src);
console.log('Patched universal-device-card.js styles');
