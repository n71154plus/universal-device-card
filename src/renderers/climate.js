import { html } from 'lit-element';
import { getClimateIcon, getFanModeLabel } from '../utils/helpers.js';

export function renderClimate(card, stateObj, layout = 'standard', showPopupButton = true) {
  const { current_temperature: cur, temperature: target, fan_mode, fan_modes } = stateObj.attributes;
    const mode = stateObj.state;
    const isBar = layout === 'bar';
    const isMini = layout === 'mini';

    if (isBar) {
      return html`
        <div class="bar-content">
          <div class="bar-left">
            <div class="bar-icon">
              <ha-icon icon="mdi:thermostat"></ha-icon>
            </div>
            <div class="bar-info">
              <div class="bar-name">${card._renderTitle(stateObj.attributes.friendly_name, layout)}</div>
              <div class="bar-state">${cur}°C → ${target}°C</div>
            </div>
          </div>
          <div class="bar-right">
            <div class="bar-controls">
              <button class="bar-btn" @click="${() => card._adjustTemp(-0.5)}">
                <ha-icon icon="mdi:minus"></ha-icon>
              </button>
              <button class="bar-btn" @click="${() => card._adjustTemp(0.5)}">
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
        
        <!-- HVAC Mode 快速切換 (Bar) -->
        <div class="bar-modes">
          ${['cool', 'heat', 'dry', 'fan_only', 'auto', 'off'].map(m => html`
            <div class="bar-mode-chip ${mode === m ? 'active' : ''}" 
                 @click="${() => card._setClimateMode(m)}"
                 title="${card._t(m)}">
              <ha-icon icon="${getClimateIcon(m)}"></ha-icon>
            </div>
          `)}
        </div>
        
        <!-- Fan Mode 快速切換 (Bar) -->
        ${fan_modes && fan_modes.length > 0 ? html`
          <div class="bar-fan-modes ${card._fanModeExpanded ? 'expanded' : 'collapsed'}">
            <div class="bar-fan-label" @click="${() => card._fanModeExpanded = !card._fanModeExpanded}">
              <ha-icon icon="mdi:fan"></ha-icon>
              <span>風速</span>
              <ha-icon class="expand-icon ${card._fanModeExpanded ? 'expanded' : ''}" 
                       icon="${card._fanModeExpanded ? 'mdi:chevron-up' : 'mdi:chevron-down'}"></ha-icon>
            </div>
            <div class="bar-fan-options ${card._fanModeExpanded ? 'expanded' : 'collapsed'}">
              ${fan_modes.map(fm => html`
                <div class="bar-fan-chip ${fan_mode === fm ? 'active' : ''}"
                     @click="${() => card._setFanMode(fm)}">
                  ${getFanModeLabel(fm)}
                </div>
              `)}
            </div>
          </div>
        ` : ''}
        
        ${card._renderMainButtons(layout)}
      `;
    }

    return html`
      <div class="header ${isMini ? 'header-mini' : ''}">
        <div class="current-temp ${isMini ? 'current-temp-mini' : ''}">${cur}<span class="unit">°C</span></div>
        ${card._renderHeaderAction(showPopupButton)}
      </div>

      <div class="temp-control ${isMini ? 'temp-control-mini' : ''}">
        <button class="adj-btn ${isMini ? 'adj-btn-mini' : ''}" @click="${() => card._adjustTemp(-0.5)}">
          <ha-icon icon="mdi:minus"></ha-icon>
        </button>
        <div class="target-display">
          <span class="label">${card._t('target_temp')}</span>
          <span class="value ${isMini ? 'value-mini' : ''}">${target}°C</span>
        </div>
        <button class="adj-btn ${isMini ? 'adj-btn-mini' : ''}" @click="${() => card._adjustTemp(0.5)}">
          <ha-icon icon="mdi:plus"></ha-icon>
        </button>
      </div>

      <div class="quick-modes ${isMini ? 'quick-modes-mini' : ''}">
        ${['cool', 'heat', 'dry', 'fan_only', 'auto', 'off'].map(m => html`
          <div class="mode-item ${mode === m ? 'active' : ''} ${isMini ? 'mode-item-mini' : ''}" 
               @click="${() => card._setClimateMode(m)}">
            <ha-icon icon="${getClimateIcon(m)}"></ha-icon>
            ${!isMini ? html`<span class="mode-label">${card._t(m)}</span>` : ''}
          </div>
        `)}
      </div>
      
      <!-- Fan Mode 控制 (Standard/Mini) -->
      ${fan_modes && fan_modes.length > 0 ? html`
        <div class="fan-mode-section ${isMini ? 'fan-mode-mini' : ''}">
          <div class="fan-mode-label" @click="${() => card._fanModeExpanded = !card._fanModeExpanded}">
            <ha-icon icon="mdi:fan"></ha-icon>
            ${!isMini ? html`<span>風速</span>` : ''}
            <ha-icon class="expand-icon ${card._fanModeExpanded ? 'expanded' : ''}" 
                     icon="${card._fanModeExpanded ? 'mdi:chevron-up' : 'mdi:chevron-down'}"></ha-icon>
          </div>
          <div class="fan-mode-options ${isMini ? 'fan-mode-options-mini' : ''} ${card._fanModeExpanded ? 'expanded' : 'collapsed'}">
            ${fan_modes.map(fm => html`
              <div class="fan-mode-chip ${fan_mode === fm ? 'active' : ''} ${isMini ? 'fan-mode-chip-mini' : ''}"
                   @click="${() => card._setFanMode(fm)}">
                ${getFanModeLabel(fm)}
              </div>
            `)}
          </div>
        </div>
      ` : ''}
      
      ${card._renderMainButtons(layout)}
    `;
}
