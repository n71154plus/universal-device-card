import { readFileSync, writeFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, '..');
const path = join(root, 'universal-device-card.js');
let lines = readFileSync(path, 'utf8').split(/\r?\n/);

const startIdx = lines.findIndex(l => l.includes('_renderClimate(stateObj, layout'));
const popupIdx = lines.findIndex(l => l.includes('_renderPopup()'));
if (startIdx === -1 || popupIdx === -1) {
  console.error('Start or _renderPopup not found', startIdx, popupIdx);
  process.exit(1);
}

const before = lines.slice(0, startIdx);
const after = lines.slice(popupIdx);
const newLines = before.concat(after);
writeFileSync(path, newLines.join('\n'));
console.log('Removed lines', startIdx + 1, 'to', popupIdx);
