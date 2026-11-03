import { UniversalDeviceCard } from './UniversalDeviceCard.js';
import { UniversalDeviceCardEditor } from './UniversalDeviceCardEditor.js';

if (!customElements.get('device-hub-card')) {
  customElements.define('device-hub-card', UniversalDeviceCard);
}
if (!customElements.get('device-hub-card-editor')) {
  customElements.define('device-hub-card-editor', UniversalDeviceCardEditor);
}

window.customCards = window.customCards || [];
window.customCards.push({
  type: 'device-hub-card',
  name: 'Device Hub Card',
  description:
    'Universal Lovelace card with a same-device popup for sensors and controls (climate, light, fan, cover, media, vacuum, and more).',
  preview: true,
  documentationURL: 'https://github.com/n71154plus/universal-device-card',
});

console.info(
  '%c DEVICE-HUB-CARD %c v2.7.1 ',
  'color: white; background: #03a9f4; font-weight: 700;',
  'color: #03a9f4; background: white; font-weight: 700;'
);
