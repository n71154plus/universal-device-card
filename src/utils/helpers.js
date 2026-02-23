/** Domain icon mapping */
export function getDomainIcon(domain) {
  const icons = {
    switch: 'mdi:toggle-switch',
    light: 'mdi:lightbulb',
    fan: 'mdi:fan',
    sensor: 'mdi:eye',
    binary_sensor: 'mdi:checkbox-marked-circle',
    select: 'mdi:format-list-bulleted',
    number: 'mdi:counter',
    button: 'mdi:gesture-tap',
    climate: 'mdi:thermostat',
    cover: 'mdi:window-shutter',
    lock: 'mdi:lock'
  };
  return icons[domain] || 'mdi:circle-outline';
}

/** Climate HVAC mode icon */
export function getClimateIcon(mode) {
  return {
    cool: 'mdi:snowflake',
    heat: 'mdi:fire',
    dry: 'mdi:water-percent',
    fan_only: 'mdi:fan',
    auto: 'mdi:brightness-auto',
    off: 'mdi:power'
  }[mode];
}

/** Fan mode label (e.g. for climate fan_mode) */
export function getFanModeLabel(fanMode) {
  const labels = {
    auto: '自動',
    low: '低速',
    medium: '中速',
    high: '高速',
    middle: '中速',
    favorite: '最愛',
    silent: '靜音',
    turbo: '強力'
  };
  return labels[fanMode] || fanMode;
}

/** Fan preset mode label */
export function getFanPresetLabel(preset) {
  const labels = {
    auto: '自動',
    smart: '智慧',
    sleep: '睡眠',
    nature: '自然',
    normal: '正常',
    low: '低速',
    medium: '中速',
    high: '高速',
    turbo: '強力',
    quiet: '靜音',
    breeze: '微風',
    favorite: '最愛'
  };
  return labels[preset] || preset;
}

const COLOR_SCHEMES = {
  climate: {
    cool: 'rgba(3, 169, 244, 0.2)',
    heat: 'rgba(255, 152, 0, 0.2)',
    dry: 'rgba(156, 39, 176, 0.15)',
    fan_only: 'rgba(76, 175, 80, 0.15)',
    auto: 'rgba(0, 150, 136, 0.15)',
    off: 'rgba(158, 158, 158, 0.1)'
  },
  light: {
    on: 'rgba(255, 193, 7, 0.2)',
    off: 'rgba(158, 158, 158, 0.1)'
  },
  fan: {
    on: 'rgba(76, 175, 80, 0.2)',
    off: 'rgba(158, 158, 158, 0.1)'
  },
  cover: {
    open: 'rgba(3, 169, 244, 0.15)',
    opening: 'rgba(3, 169, 244, 0.15)',
    closed: 'rgba(158, 158, 158, 0.1)',
    closing: 'rgba(158, 158, 158, 0.1)'
  },
  humidifier: {
    on: 'rgba(33, 150, 243, 0.2)',
    off: 'rgba(158, 158, 158, 0.1)'
  },
  media_player: {
    playing: 'rgba(156, 39, 176, 0.2)',
    paused: 'rgba(255, 152, 0, 0.15)',
    off: 'rgba(158, 158, 158, 0.1)'
  },
  vacuum: {
    cleaning: 'rgba(76, 175, 80, 0.2)',
    docked: 'rgba(158, 158, 158, 0.1)',
    returning: 'rgba(255, 152, 0, 0.15)'
  },
  water_heater: {
    electric: 'rgba(255, 152, 0, 0.2)',
    gas: 'rgba(255, 87, 34, 0.2)',
    off: 'rgba(158, 158, 158, 0.1)'
  }
};

/** Background color by domain and state */
export function getStateColor(domain, state) {
  return COLOR_SCHEMES[domain]?.[state] || 'var(--ha-card-background)';
}
