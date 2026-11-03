import { UniversalDeviceCard } from './UniversalDeviceCard.js';
import { UniversalDeviceCardEditor } from './UniversalDeviceCardEditor.js';

if (!customElements.get('n71154-device-card')) {
  customElements.define('n71154-device-card', UniversalDeviceCard);
}
if (!customElements.get('n71154-device-card-editor')) {
  customElements.define('n71154-device-card-editor', UniversalDeviceCardEditor);
}

window.customCards = window.customCards || [];
window.customCards.push({
  type: 'n71154-device-card',
  name: 'N71154 Device Card',
  description:
    'Universal Lovelace card with a same-device popup for sensors and controls (climate, light, fan, cover, media, vacuum, and more).',
  preview: true,
  documentationURL: 'https://github.com/n71154plus/universal-device-card',
});

console.info(
  '%c N71154-DEVICE-CARD %c v2.7.0 ',
  'color: white; background: #03a9f4; font-weight: 700;',
  'color: #03a9f4; background: white; font-weight: 700;'
);
