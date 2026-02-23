import { readFileSync, writeFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, '..');
const src = readFileSync(join(root, 'universal-device-card.js'), 'utf8');
const lines = src.split(/\r?\n/);

// Find "return css`" and the closing "`;"
let startIdx = -1;
let endIdx = -1;
for (let i = 0; i < lines.length; i++) {
  if (lines[i].includes('return css`') && lines[i].trim().startsWith('return')) {
    startIdx = i + 1; // first line of CSS content
    break;
  }
}
for (let i = startIdx; i < lines.length; i++) {
  if (lines[i].trim() === '`;') {
    endIdx = i;
    break;
  }
}

const cssLines = lines.slice(startIdx, endIdx);
const popupMarker = '/* Popup Styles */';
const popupIdx = cssLines.findIndex(l => l.includes(popupMarker));
const cardCss = cssLines.slice(0, popupIdx).join('\n');
const popupCss = cssLines.slice(popupIdx).join('\n');

const cardFile = `import { css } from 'lit-element';

export const cardStyles = css\`
${cardCss}
\`;
`;
const popupFile = `import { css } from 'lit-element';

export const popupStyles = css\`
${popupCss}
\`;
`;

writeFileSync(join(root, 'src', 'styles', 'card-styles.js'), cardFile);
writeFileSync(join(root, 'src', 'styles', 'popup-styles.js'), popupFile);
console.log('Wrote card-styles.js and popup-styles.js');
