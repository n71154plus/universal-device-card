import { html } from 'lit-element';

export function renderGeneric(card, stateObj, layout = 'standard', showPopupButton = true) {
  const isBar = layout === 'bar';
    const isMini = layout === 'mini';

    if (isBar) {
      return html`
        <div class="bar-content">
          <div class="bar-left">
            ${card._renderBarIcon(stateObj, '')}
            <div class="bar-info">
              <div class="bar-name">${card._renderTitle(stateObj.attributes.friendly_name, layout)}</div>
              <div class="bar-state">${stateObj.state}</div>
            </div>
          </div>
          <div class="bar-right">
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
          <span class="device-value">${stateObj.state}</span>
        </div>
        ${card._renderHeaderAction(showPopupButton)}
      </div>

      <div class="temp-control ${isMini ? 'temp-control-mini' : ''}">
        <div style="width: 64px;"></div>
        <div class="target-display">
          <span class="label">${card._t('device')}</span>
          <span class="value ${isMini ? 'value-mini' : ''}">${stateObj.state}</span>
        </div>
        <div style="width: 64px;"></div>
      </div>
      ${card._renderMainButtons(layout)}
    `;
}
