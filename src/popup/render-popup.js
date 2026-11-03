/**
 * Imperative popup rendering with XSS-safe DOM construction.
 * Entity names/states/attributes are never concatenated into HTML strings.
 */

function createHaIcon(icon) {
  const el = document.createElement('ha-icon');
  if (icon) el.setAttribute('icon', icon);
  return el;
}

function appendText(parent, tag, className, text) {
  const el = document.createElement(tag);
  if (className) el.className = className;
  el.textContent = text == null ? '' : String(text);
  parent.appendChild(el);
  return el;
}

export function stripDevicePrefix(name, deviceTitle) {
  if (!name) return '';
  if (!deviceTitle) return name;
  const raw = String(name);
  const title = String(deviceTitle).trim();
  if (!title) return raw;
  if (raw.startsWith(title)) {
    const stripped = raw.slice(title.length).replace(/^[\s\-–—_·:：]+/, '').trim();
    return stripped || raw;
  }
  return raw;
}

export function getPopupDeviceTitle(card) {
  const state = card.hass?.states?.[card.config?.entity];
  return state?.attributes?.friendly_name || card._t('device');
}

/**
 * @param {object} card UniversalDeviceCard instance
 * @param {{ getDomainIcon: (domain: string) => string }} helpers
 */
export function renderPopupToPortal(card, helpers) {
  const related = card._getRelatedEntities();
  const sensors = related.filter(
    (e) => e.entity_id.startsWith('sensor') || e.entity_id.startsWith('binary_sensor')
  );
  const controls = related.filter(
    (e) => !e.entity_id.startsWith('sensor') && !e.entity_id.startsWith('binary_sensor')
  );
  const deviceTitle = getPopupDeviceTitle(card);
  const mainState = card.hass?.states?.[card.config?.entity];

  const overlay = document.createElement('div');
  overlay.className = 'popup-overlay';
  overlay.addEventListener('click', (e) => {
    if (e.target === overlay) card._closePopup();
  });

  const content = document.createElement('div');
  const hideScrollbar = card.config?.hide_popup_scrollbar === true;
  const bothClass = sensors.length && controls.length
    ? ' has-both'
    : sensors.length
      ? ' has-sensors-only'
      : ' has-controls-only';
  content.className = (hideScrollbar ? 'popup-content hide-scrollbar' : 'popup-content') + bothClass;
  content.dataset.sensors = String(sensors.length);
  content.dataset.controls = String(controls.length);
  content.addEventListener('click', (e) => e.stopPropagation());

  const header = document.createElement('div');
  header.className = 'popup-header';

  const drag = document.createElement('div');
  drag.className = 'popup-drag-handle';
  header.appendChild(drag);

  const titleWrap = document.createElement('div');
  titleWrap.className = 'popup-title-wrap';
  appendText(titleWrap, 'div', 'popup-title', deviceTitle);
  const subtitleParts = [];
  if (sensors.length) subtitleParts.push(`${sensors.length} ${card._t('popup_sensors')}`);
  if (controls.length) subtitleParts.push(`${controls.length} ${card._t('popup_controls')}`);
  appendText(
    titleWrap,
    'div',
    'popup-subtitle',
    subtitleParts.join(' · ') || card.config?.entity || ''
  );
  header.appendChild(titleWrap);

  const closeBtn = createHaIcon('mdi:close');
  closeBtn.className = 'close-btn';
  closeBtn.addEventListener('click', () => card._closePopup());
  header.appendChild(closeBtn);
  content.appendChild(header);

  if (mainState) {
    const available = card._isEntityAvailable(mainState);
    const isOn = ['on', 'open', 'home', 'playing', 'heat', 'cool', 'auto'].includes(mainState.state);
    const status = document.createElement('div');
    status.className =
      'popup-status' + (!available ? ' is-unavailable' : isOn ? ' is-on' : ' is-off');

    const dot = document.createElement('div');
    dot.className = 'popup-status-dot';
    status.appendChild(dot);

    const meta = document.createElement('div');
    meta.className = 'popup-status-meta';
    appendText(meta, 'div', 'popup-status-label', card._t('state') || 'State');
    const unit = mainState.attributes.unit_of_measurement;
    let valueText;
    if (!available) {
      valueText = card._t('unavailable');
    } else if (mainState.state === 'on' || mainState.state === 'off') {
      valueText = (card._t(mainState.state) || mainState.state) + (unit ? ` ${unit}` : '');
    } else {
      valueText = mainState.state + (unit ? ` ${unit}` : '');
    }
    appendText(meta, 'div', 'popup-status-value', valueText);
    status.appendChild(meta);

    const action = document.createElement('div');
    action.className = 'popup-status-action';
    const domain = card.config.entity.split('.')[0];
    if (available && ['switch', 'light', 'fan', 'input_boolean'].includes(domain)) {
      const sw = document.createElement('ha-switch');
      sw.checked = mainState.state === 'on';
      sw.addEventListener('change', () => card._toggleEntity(card.config.entity));
      action.appendChild(sw);
    }
    status.appendChild(action);
    content.appendChild(status);
  }

  const body = document.createElement('div');
  body.className = 'popup-body';

  if (sensors.length > 0) {
    const section = document.createElement('div');
    section.className = 'popup-section popup-section-sensors';
    appendText(section, 'div', 'popup-section-title', card._t('popup_sensors'));

    const grid = document.createElement('div');
    grid.className = 'sensor-grid';
    sensors.forEach((ent) => {
      grid.appendChild(createSensorCard(card, ent, deviceTitle));
    });
    section.appendChild(grid);
    body.appendChild(section);
  }

  if (controls.length > 0) {
    const section = document.createElement('div');
    section.className = 'popup-section popup-section-controls';
    appendText(section, 'div', 'popup-section-title', card._t('popup_controls'));

    const group = document.createElement('div');
    group.className = 'controls-group';
    controls.forEach((ent) => {
      group.appendChild(createControlRow(card, ent, deviceTitle, helpers.getDomainIcon));
    });
    section.appendChild(group);
    body.appendChild(section);
  } else if (sensors.length === 0) {
    appendText(body, 'div', 'no-controls', card._t('no_controls'));
  }

  content.appendChild(body);
  overlay.appendChild(content);
  card._bindPopupSheetGestures(content, header);
  card._lockPopupScroll(true);

  const existing = card._popupPortal.querySelector('.popup-overlay');
  if (existing) existing.remove();
  card._popupPortal.appendChild(overlay);
}

function createSensorCard(card, ent, deviceTitle) {
  const available = card._isEntityAvailable(ent);
  const isBinary = ent.entity_id.startsWith('binary_sensor');
  const isOn = ent.state === 'on';
  const cardEl = document.createElement('div');
  cardEl.className =
    'sensor-card' +
    (available ? '' : ' sensor-card-unavailable') +
    (isBinary && available ? (isOn ? ' is-on' : ' is-off') : '');

  const icon = ent.attributes.icon || (isBinary ? 'mdi:checkbox-blank-circle' : 'mdi:chart-line');
  cardEl.appendChild(createHaIcon(icon));

  const body = document.createElement('div');
  body.className = 'sensor-card-body';
  const label = stripDevicePrefix(ent.attributes.friendly_name, deviceTitle) || ent.entity_id;
  appendText(body, 'span', 'sensor-label', label);
  let value;
  if (!available) {
    value = card._t('unavailable');
  } else if (isBinary) {
    value = card._t(ent.state) || ent.state;
  } else {
    value = ent.state + (ent.attributes.unit_of_measurement ? ` ${ent.attributes.unit_of_measurement}` : '');
  }
  appendText(body, 'span', 'sensor-value', value);
  cardEl.appendChild(body);
  return cardEl;
}

export function createControlRow(card, ent, deviceTitle, getDomainIcon) {
  const domain = ent.entity_id.split('.')[0];
  const available = card._isEntityAvailable(ent);
  const row = document.createElement('div');
  row.className = 'control-row' + (available ? '' : ' control-row-unavailable');

  const iconWrap = document.createElement('div');
  iconWrap.className = 'control-row-icon';
  iconWrap.appendChild(createHaIcon(ent.attributes.icon || getDomainIcon(domain)));
  row.appendChild(iconWrap);

  appendText(
    row,
    'div',
    'control-row-label',
    stripDevicePrefix(ent.attributes.friendly_name, deviceTitle)
  );

  const action = document.createElement('div');
  action.className = 'control-row-action';
  if (available) {
    card._populateControlAction(action, ent, domain);
  } else {
    appendText(action, 'span', 'state-text unavailable-text', ent.state);
  }
  row.appendChild(action);
  return row;
}
