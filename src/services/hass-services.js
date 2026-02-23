/**
 * Creates an object of HA service helpers bound to hass and main entityId.
 * Main entity is used for card controls; toggle/setSelect/adjustNumber/pressButton accept entityId for popup.
 */
export function createHassServices(hass, entityId) {
  if (!hass || !entityId) return null;
  const main = entityId;

  return {
    callService(domain, service, extra = {}) {
      hass.callService(domain, service, { entity_id: main, ...extra });
    },
    toggle(entityId = main) {
      hass.callService('homeassistant', 'toggle', { entity_id: entityId });
    },
    setSelect(entityId, option) {
      hass.callService('select', 'select_option', { entity_id: entityId, option });
    },
    adjustNumber(entityId, delta) {
      const state = hass.states[entityId];
      if (!state) return;
      const current = parseFloat(state.state);
      const step = state.attributes.step || 1;
      const min = state.attributes.min;
      const max = state.attributes.max;
      let newValue = current + delta * step;
      if (min !== undefined) newValue = Math.max(min, newValue);
      if (max !== undefined) newValue = Math.min(max, newValue);
      const domain = entityId.split('.')[0];
      const svc = domain === 'number' ? 'number' : 'input_number';
      hass.callService(svc, 'set_value', { entity_id: entityId, value: newValue });
    },
    pressButton(entityId) {
      hass.callService('button', 'press', { entity_id: entityId });
    },
    adjustTemp(step) {
      const target = hass.states[main].attributes.temperature + step;
      hass.callService('climate', 'set_temperature', { entity_id: main, temperature: target });
    },
    setClimateMode(hvac_mode) {
      hass.callService('climate', 'set_hvac_mode', { entity_id: main, hvac_mode });
    },
    setFanMode(fan_mode) {
      hass.callService('climate', 'set_fan_mode', { entity_id: main, fan_mode });
    },
    setBrightness(percent) {
      const brightness = Math.round((percent / 100) * 255);
      hass.callService('light', 'turn_on', { entity_id: main, brightness });
    },
    setFanSpeed(percent) {
      hass.callService('fan', 'set_percentage', { entity_id: main, percentage: parseInt(percent) });
    },
    setCoverPosition(position) {
      hass.callService('cover', 'set_cover_position', { entity_id: main, position: parseInt(position) });
    },
    setVolume(volume) {
      hass.callService('media_player', 'volume_set', { entity_id: main, volume_level: volume / 100 });
    },
    setFanPresetMode(preset_mode) {
      hass.callService('fan', 'set_preset_mode', { entity_id: main, preset_mode });
    },
    setWaterHeaterTemp(temperature) {
      hass.callService('water_heater', 'set_temperature', { entity_id: main, temperature });
    },
    adjustWaterTemp(step) {
      const target = hass.states[main].attributes.temperature + step;
      hass.callService('water_heater', 'set_temperature', { entity_id: main, temperature: target });
    }
  };
}
