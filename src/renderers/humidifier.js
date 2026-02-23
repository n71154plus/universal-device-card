import { html } from 'lit-element';

export function renderHumidifier(card, stateObj, layout = 'standard', showPopupButton = true) {
  const isOn = stateObj.state === 'on';
    const humidity = stateObj.attributes.humidity || 0;
    const isBar = layout === 'bar';
    const isMini = layout === 'mini';

    if (isBar) {
      return html`
        <div class="bar-content">
          <div class="bar-left">
            <div class="bar-icon ${isOn ? 'bar-icon-on' : ''}">
              <ha-icon icon="mdi:air-humidifier"></ha-icon>
            </div>
            <div class="bar-info">
              <div class="bar-name">${card._renderTitle(stateObj.attributes.friendly_name, layout)}</div>
              <div class="bar-state">${isOn ? `${humidity}%` : card._t('off')}</div>
            </div>
          </div>
          <div class="bar-right">
            <div class="bar-controls">
              <button class="bar-toggle ${isOn ? 'bar-toggle-on' : ''}" @click="${() => card._toggleEntity()}">
                <ha-icon icon="mdi:power"></ha-icon>
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
        <div class="${isOn ? 'current-temp' : 'device-name'} ${isMini ? 'current-temp-mini' : ''} ${!isOn ? 'device-name-mini' : ''}">
          ${isOn ? html`${humidity}<span class="unit">%</span>` : card._renderTitle(stateObj.attributes.friendly_name || card._t('device'), layout)}
        </div>
        ${card._renderHeaderAction(showPopupButton)}
      </div>

      <div class="main-control ${isMini ? 'main-control-mini' : ''}">
        <button class="power-btn ${isOn ? 'on' : ''} ${isMini ? 'power-btn-mini' : ''}" @click="${() => card._toggleEntity()}">
          <ha-icon icon="mdi:air-humidifier"></ha-icon>
          ${!isMini ? html`<span class="mode-label">${isOn ? card._t('on') : card._t('off')}</span>` : ''}
        </button>
      </div>

      ${isOn ? html`
        <div class="temp-control ${isMini ? 'temp-control-mini' : ''}">
          <div style="width: 64px;"></div>
          <div class="target-display">
            <span class="label">${card._t('target_humidity')}</span>
            <span class="value ${isMini ? 'value-mini' : ''}">${humidity}%</span>
          </div>
          <div style="width: 64px;"></div>
        </div>
      ` : ''}
      ${card._renderMainButtons(layout)}
    `;
}
