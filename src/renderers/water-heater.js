import { html } from 'lit-element';

export function renderWaterHeater(card, stateObj, layout = 'standard', showPopupButton = true) {
  const temperature = stateObj.attributes.temperature || 0;
    const currentTemp = stateObj.attributes.current_temperature || 0;
    const isBar = layout === 'bar';
    const isMini = layout === 'mini';

    if (isBar) {
      return html`
        <div class="bar-content">
          <div class="bar-left">
            ${card._renderBarIcon(stateObj, '')}
            <div class="bar-info">
              <div class="bar-name">${card._renderTitle(stateObj.attributes.friendly_name, layout)}</div>
              <div class="bar-state">${currentTemp}°C → ${temperature}°C</div>
            </div>
          </div>
          <div class="bar-right">
            <div class="bar-controls">
              <button class="bar-btn" @click="${() => card._adjustWaterTemp(-1)}">
                <ha-icon icon="mdi:minus"></ha-icon>
              </button>
              <button class="bar-btn" @click="${() => card._adjustWaterTemp(1)}">
                <ha-icon icon="mdi:plus"></ha-icon>
              </button>
            </div>
            ${showPopupButton ? html`
              <button class="bar-settings" @click="${() => card._showPopup = true}">
                <ha-icon icon="mdi:cog"></ha-icon>
              </button>
            ` : ''}
          </div>
        </div>
        ${card._renderMainButtons(layout)}
      `;
    }

    return html`
      <div class="header ${isMini ? 'header-mini' : ''}">
        ${card._renderHeaderIcon(stateObj, isMini)}
        <div class="device-name ${isMini ? 'device-name-mini' : ''}">
          ${card._renderTitle(stateObj.attributes.friendly_name || card._t('device'), layout)}
          <span class="device-value">${currentTemp}°C → ${temperature}°C</span>
        </div>
        ${card._renderHeaderAction(showPopupButton)}
      </div>

      <div class="temp-control ${isMini ? 'temp-control-mini' : ''}">
        <button class="adj-btn ${isMini ? 'adj-btn-mini' : ''}" @click="${() => card._adjustWaterTemp(-1)}">
          <ha-icon icon="mdi:minus"></ha-icon>
        </button>
        <div class="target-display">
          <span class="label">${card._t('target_temp')}</span>
          <span class="value ${isMini ? 'value-mini' : ''}">${temperature}°C</span>
        </div>
        <button class="adj-btn ${isMini ? 'adj-btn-mini' : ''}" @click="${() => card._adjustWaterTemp(1)}">
          <ha-icon icon="mdi:plus"></ha-icon>
        </button>
      </div>
      ${card._renderMainButtons(layout)}
    `;
}
