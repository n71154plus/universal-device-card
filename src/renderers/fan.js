import { html } from 'lit-element';
import { getFanPresetLabel } from '../utils/helpers.js';

export function renderFan(card, stateObj, layout = 'standard', showPopupButton = true) {
  const isOn = stateObj.state === 'on';
  const speed = stateObj.attributes.percentage || 0;
  const presetModes = stateObj.attributes.preset_modes || [];
  const currentPreset = stateObj.attributes.preset_mode;
  const isBar = layout === 'bar';
  const isMini = layout === 'mini';

  if (isBar) {
      return html`
        <div class="bar-content">
          <div class="bar-left">
            <div class="bar-icon ${isOn ? 'bar-icon-on' : ''}">
              <ha-icon icon="mdi:fan"></ha-icon>
            </div>
            <div class="bar-info">
              <div class="bar-name">${card._renderTitle(stateObj.attributes.friendly_name, layout)}</div>
              <div class="bar-state">${isOn ? `${speed}%` : card._t('off')}</div>
            </div>
          </div>
          <div class="bar-right">
            ${isOn && speed !== undefined ? html`
              <div class="bar-controls">
                <button class="bar-btn" @click="${() => card._adjustFanSpeed(-10)}">
                  <ha-icon icon="mdi:minus"></ha-icon>
                </button>
                <button class="bar-btn" @click="${() => card._adjustFanSpeed(10)}">
                  <ha-icon icon="mdi:plus"></ha-icon>
                </button>
              </div>
            ` : ''}
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
        
        <!-- Fan Preset Modes (Bar) -->
        ${presetModes.length > 0 ? html`
          <div class="bar-modes">
            ${presetModes.map(mode => html`
              <div class="bar-mode-chip ${currentPreset === mode ? 'active' : ''}" 
                   @click="${() => card._setFanPresetMode(mode)}"
                   title="${mode}">
                <span class="bar-mode-text">${getFanPresetLabel(mode)}</span>
              </div>
            `)}
          </div>
        ` : ''}
        
        ${card._renderMainButtons(layout)}
      `;
    }

    return html`
      <div class="header ${isMini ? 'header-mini' : ''}">
        <div class="${isOn ? 'current-temp' : 'device-name'} ${isMini ? 'current-temp-mini' : ''} ${!isOn ? 'device-name-mini' : ''}">
          ${isOn ? html`${speed}<span class="unit">%</span>` : card._renderTitle(stateObj.attributes.friendly_name || card._t('device'), layout)}
        </div>
        ${card._renderHeaderAction(showPopupButton)}
      </div>

      <div class="main-control ${isMini ? 'main-control-mini' : ''}">
        <button class="power-btn ${isOn ? 'on' : ''} ${isMini ? 'power-btn-mini' : ''}" @click="${() => card._toggleEntity()}">
          <ha-icon icon="mdi:fan"></ha-icon>
          ${!isMini ? html`<span class="mode-label">${isOn ? card._t('on') : card._t('off')}</span>` : ''}
        </button>
      </div>

      ${isOn ? html`
        <div class="temp-control ${isMini ? 'temp-control-mini' : ''}">
          <button class="adj-btn ${isMini ? 'adj-btn-mini' : ''}" @click="${() => card._adjustFanSpeed(-10)}">
            <ha-icon icon="mdi:minus"></ha-icon>
          </button>
          <div class="target-display">
            <span class="label">風速</span>
            <span class="value ${isMini ? 'value-mini' : ''}">${speed}%</span>
          </div>
          <button class="adj-btn ${isMini ? 'adj-btn-mini' : ''}" @click="${() => card._adjustFanSpeed(10)}">
            <ha-icon icon="mdi:plus"></ha-icon>
          </button>
        </div>
      ` : ''}
      ${card._renderMainButtons(layout)}
    `;
}
