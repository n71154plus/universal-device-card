import { html } from 'lit-element';

export function renderCover(card, stateObj, layout = 'standard', showPopupButton = true) {
  const position = stateObj.attributes.current_position || 0;
  const state = stateObj.state;
  const isBar = layout === 'bar';
  const isMini = layout === 'mini';

  if (isBar) {
      return html`
        <div class="bar-content">
          <div class="bar-left">
            <div class="bar-icon">
              <ha-icon icon="mdi:window-shutter"></ha-icon>
            </div>
            <div class="bar-info">
              <div class="bar-name">${card._renderTitle(stateObj.attributes.friendly_name, layout)}</div>
              <div class="bar-state">${position}%</div>
            </div>
          </div>
          <div class="bar-right">
            ${stateObj.attributes.current_position !== undefined ? html`
              <div class="bar-controls">
                <button class="bar-btn" @click="${() => card._adjustCoverPosition(-10)}">
                  <ha-icon icon="mdi:minus"></ha-icon>
                </button>
                <button class="bar-btn" @click="${() => card._adjustCoverPosition(10)}">
                  <ha-icon icon="mdi:plus"></ha-icon>
                </button>
              </div>
            ` : ''}
            <div class="bar-controls">
              <button class="bar-btn-small" @click="${() => card._callService('cover', 'open_cover')}">
                <ha-icon icon="mdi:arrow-up"></ha-icon>
              </button>
              <button class="bar-btn-small" @click="${() => card._callService('cover', 'stop_cover')}">
                <ha-icon icon="mdi:stop"></ha-icon>
              </button>
              <button class="bar-btn-small" @click="${() => card._callService('cover', 'close_cover')}">
                <ha-icon icon="mdi:arrow-down"></ha-icon>
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
        <div class="${stateObj.attributes.current_position !== undefined ? 'current-temp' : 'device-name'} ${isMini ? 'current-temp-mini' : ''} ${stateObj.attributes.current_position === undefined ? 'device-name-mini' : ''}">
          ${stateObj.attributes.current_position !== undefined ? html`${position}<span class="unit">%</span>` : card._renderTitle(stateObj.attributes.friendly_name || card._t('device'), layout)}
        </div>
        ${card._renderHeaderAction(showPopupButton)}
      </div>

      <div class="cover-controls ${isMini ? 'cover-controls-mini' : ''}">
        <button class="cover-btn ${isMini ? 'cover-btn-mini' : ''}" @click="${() => card._callService('cover', 'open_cover')}">
          <ha-icon icon="mdi:arrow-up"></ha-icon>
          <span>${card._t('open')}</span>
        </button>
        <button class="cover-btn ${isMini ? 'cover-btn-mini' : ''}" @click="${() => card._callService('cover', 'stop_cover')}">
          <ha-icon icon="mdi:stop"></ha-icon>
          <span>${card._t('stop')}</span>
        </button>
        <button class="cover-btn ${isMini ? 'cover-btn-mini' : ''}" @click="${() => card._callService('cover', 'close_cover')}">
          <ha-icon icon="mdi:arrow-down"></ha-icon>
          <span>${card._t('close')}</span>
        </button>
      </div>

      ${stateObj.attributes.current_position !== undefined ? html`
        <div class="temp-control ${isMini ? 'temp-control-mini' : ''}">
          <button class="adj-btn ${isMini ? 'adj-btn-mini' : ''}" @click="${() => card._adjustCoverPosition(-10)}">
            <ha-icon icon="mdi:minus"></ha-icon>
          </button>
          <div class="target-display">
            <span class="label">${card._t('position')}</span>
            <span class="value ${isMini ? 'value-mini' : ''}">${position}%</span>
          </div>
          <button class="adj-btn ${isMini ? 'adj-btn-mini' : ''}" @click="${() => card._adjustCoverPosition(10)}">
            <ha-icon icon="mdi:plus"></ha-icon>
          </button>
        </div>
      ` : ''}
      ${card._renderMainButtons(layout)}
    `;
}
