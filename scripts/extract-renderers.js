import { readFileSync, writeFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, '..');
const src = readFileSync(join(root, 'universal-device-card.js'), 'utf8');
const lines = src.split(/\r?\n/);

const methods = [
  { name: 'Climate', start: 483, end: 605, helpers: ['getClimateIcon', 'getFanModeLabel'] },
  { name: 'Light', start: 606, end: 707 },
  { name: 'Fan', start: 708, end: 794, helpers: ['getFanPresetLabel'] },
  { name: 'Cover', start: 795, end: 886 },
  { name: 'Humidifier', start: 887, end: 947 },
  { name: 'MediaPlayer', start: 948, end: 1045 },
  { name: 'Vacuum', start: 1046, end: 1120 },
  { name: 'WaterHeater', start: 1121, end: 1180 },
  { name: 'Generic', start: 1181, end: 1222 }
];

const fileNames = {
  Climate: 'climate',
  Light: 'light',
  Fan: 'fan',
  Cover: 'cover',
  Humidifier: 'humidifier',
  MediaPlayer: 'media-player',
  Vacuum: 'vacuum',
  WaterHeater: 'water-heater',
  Generic: 'generic'
};

for (const m of methods) {
  const bodyLines = lines.slice(m.start - 1, m.end);
  let body = bodyLines.join('\n');
  body = body.replace(/\bthis\./g, 'card.');
  const helperImports = m.helpers && m.helpers.length
    ? `import { ${m.helpers.join(', ')} } from '../utils/helpers.js';\n`
    : '';
  const fnName = 'render' + m.name;
  const content = `import { html } from 'lit-element';\n${helperImports}\nexport function ${fnName}(card, stateObj, layout = 'standard', showPopupButton = true) {\n${body}\n}\n`;
  const fileName = fileNames[m.name] + '.js';
  writeFileSync(join(root, 'src', 'renderers', fileName), content);
  console.log('Wrote', fileName);
}

const indexLines = [
  "import { renderClimate } from './climate.js';",
  "import { renderLight } from './light.js';",
  "import { renderFan } from './fan.js';",
  "import { renderCover } from './cover.js';",
  "import { renderHumidifier } from './humidifier.js';",
  "import { renderMediaPlayer } from './media-player.js';",
  "import { renderVacuum } from './vacuum.js';",
  "import { renderWaterHeater } from './water-heater.js';",
  "import { renderGeneric } from './generic.js';",
  "",
  "export const DEVICE_RENDERERS = {",
  "  climate: renderClimate,",
  "  light: renderLight,",
  "  fan: renderFan,",
  "  cover: renderCover,",
  "  humidifier: renderHumidifier,",
  "  media_player: renderMediaPlayer,",
  "  vacuum: renderVacuum,",
  "  water_heater: renderWaterHeater,",
  "  generic: renderGeneric",
  "};"
];
writeFileSync(join(root, 'src', 'renderers', 'index.js'), indexLines.join('\n'));
console.log('Wrote index.js');
