import { html } from 'lit-element';

export function renderVacuum(card, stateObj, layout = 'standard', showPopupButton = true) {
  const state = stateObj.state;
    const battery = stateObj.attributes.battery_level || 0;
    const isBar = layout === 'bar';
    const isMini = layout === 'mini';

    if (isBar) {
      return html`
        <div class="bar-content">
          <div class="bar-left">
            ${card._renderBarIcon(stateObj, state === 'cleaning' ? 'bar-icon-on' : '')}
            <div class="bar-info">
              <div class="bar-name">${card._renderTitle(stateObj.attributes.friendly_name, layout)}</div>
              <div class="bar-state">${card._getVacuumStateText(state)} · ${battery}%</div>
            </div>
          </div>
          <div class="bar-right">
            <div class="bar-controls">
              <button class="bar-btn-small" @click="${() => card._callService('vacuum', 'start')}">
                <ha-icon icon="mdi:play"></ha-icon>
              </button>
              <button class="bar-btn-small" @click="${() => card._callService('vacuum', 'pause')}">
                <ha-icon icon="mdi:pause"></ha-icon>
              </button>
              <button class="bar-btn-small" @click="${() => card._callService('vacuum', 'return_to_base')}">
                <ha-icon icon="mdi:home"></ha-icon>
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
          <span class="device-value">${card._getVacuumStateText(state)} · ${battery}%</span>
        </div>
        ${card._renderHeaderAction(showPopupButton)}
      </div>

      <div class="vacuum-status ${isMini ? 'vacuum-status-mini' : ''}">
        <div class="status-badge ${isMini ? 'status-badge-mini' : ''}">${card._getVacuumStateText(state)}</div>
        <div class="battery-display ${isMini ? 'battery-display-mini' : ''}">
          <ha-icon icon="mdi:battery${battery > 90 ? '' : battery > 50 ? '-50' : '-20'}"></ha-icon>
          <span>${battery}%</span>
        </div>
      </div>

      <div class="vacuum-controls ${isMini ? 'vacuum-controls-mini' : ''}">
        <button class="vacuum-btn ${isMini ? 'vacuum-btn-mini' : ''}" @click="${() => card._callService('vacuum', 'start')}">
          <ha-icon icon="mdi:play"></ha-icon>
          <span>${card._t('start')}</span>
        </button>
        <button class="vacuum-btn ${isMini ? 'vacuum-btn-mini' : ''}" @click="${() => card._callService('vacuum', 'pause')}">
          <ha-icon icon="mdi:pause"></ha-icon>
          <span>${card._t('pause')}</span>
        </button>
        <button class="vacuum-btn ${isMini ? 'vacuum-btn-mini' : ''}" @click="${() => card._callService('vacuum', 'return_to_base')}">
          <ha-icon icon="mdi:home"></ha-icon>
          <span>${card._t('return_home')}</span>
        </button>
      </div>
      ${card._renderMainButtons(layout)}
    `;
}
