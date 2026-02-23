import { UniversalDeviceCard } from './UniversalDeviceCard.js';
import { UniversalDeviceCardEditor } from './UniversalDeviceCardEditor.js';

customElements.define('universal-device-card', UniversalDeviceCard);
customElements.define('universal-device-card-editor', UniversalDeviceCardEditor);

window.customCards = window.customCards || [];
window.customCards.push({
  type: 'universal-device-card',
  name: 'Universal Device Card',
  description: '通用設備卡片 - 支援 Climate、Light、Fan、Cover 等多種設備類型',
  preview: true,
  documentationURL: 'https://github.com/your-repo/universal-device-card',
});

console.info(
  '%c UNIVERSAL-DEVICE-CARD %c v2.1 ',
  'color: white; background: #03a9f4; font-weight: 700;',
  'color: #03a9f4; background: white; font-weight: 700;'
);
