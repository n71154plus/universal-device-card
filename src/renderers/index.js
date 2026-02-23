import { renderClimate } from './climate.js';
import { renderLight } from './light.js';
import { renderFan } from './fan.js';
import { renderCover } from './cover.js';
import { renderHumidifier } from './humidifier.js';
import { renderMediaPlayer } from './media-player.js';
import { renderVacuum } from './vacuum.js';
import { renderWaterHeater } from './water-heater.js';
import { renderGeneric } from './generic.js';

export const DEVICE_RENDERERS = {
  climate: renderClimate,
  light: renderLight,
  fan: renderFan,
  cover: renderCover,
  humidifier: renderHumidifier,
  media_player: renderMediaPlayer,
  vacuum: renderVacuum,
  water_heater: renderWaterHeater,
  generic: renderGeneric
};