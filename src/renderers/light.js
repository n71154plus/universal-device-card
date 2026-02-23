import { html } from 'lit-element';

export function renderLight(card, stateObj, layout = 'standard', showPopupButton = true) {
  const isOn = stateObj.state === 'on';
    const brightness = stateObj.attributes.brightness || 0;
    const brightnessPercent = Math.round((brightness / 255) * 100);
    const isBar = layout === 'bar';
    const isMini = layout === 'mini';
    const hasBrightness = stateObj.attributes.brightness !== undefined;

    if (isBar) {
      return html`
        <div class="bar-content">
          <div class="bar-left">
            ${card._renderBarIcon(stateObj, isOn ? 'bar-icon-on' : '')}
            <div class="bar-info">
              <div class="bar-name">${card._renderTitle(stateObj.attributes.friendly_name, layout)}</div>
              ${isOn && hasBrightness ? html`
                <div class="bar-slider-container" @click="${(e) => { e.stopPropagation(); card._handleSliderClick(e, 'light'); }}">
                  <div class="bar-slider-bg bar-slider-light" style="--slider-value: ${brightnessPercent}%"></div>
                  <div class="bar-slider-text">${brightnessPercent}%</div>
                </div>
              ` : html`
                <div class="bar-state">${isOn ? card._t('on') : card._t('off')}</div>
              `}
            </div>
          </div>
          <div class="bar-right">
            ${isOn && hasBrightness ? html`
              <div class="bar-controls">
                <button class="bar-btn" @click="${() => card._adjustBrightness(-10)}">
                  <ha-icon icon="mdi:minus"></ha-icon>
                </button>
                <button class="bar-btn" @click="${() => card._adjustBrightness(10)}">
                  <ha-icon icon="mdi:plus"></ha-icon>
                </button>
              </div>
            ` : ''}
            <div class="bar-controls">
              <button class="bar-toggle ${isOn ? 'bar-toggle-on' : ''}" @click="${() => card._toggleEntity()}">
                <ha-icon icon="mdi:power"></ha-icon>
              </button>
            </div>
            ${card._renderHeaderAction(showPopupButton)}
          </div>
        </div>
        ${card._renderMainButtons(layout)}
      `;
    }

    // Standard/Mini：與 climate 一致 — header + main-control + temp-control
    return html`
      <div class="header ${isMini ? 'header-mini' : ''}">
        ${card._renderHeaderIcon(stateObj, isMini)}
        <div class="device-name ${isMini ? 'device-name-mini' : ''}">
          ${card._renderTitle(stateObj.attributes.friendly_name || card._t('device'), layout)}
          <span class="device-value">${isOn && hasBrightness ? `${brightnessPercent}%` : (isOn ? card._t('on') : card._t('off'))}</span>
        </div>
        ${card._renderHeaderAction(showPopupButton)}
      </div>

      <div class="main-control ${isMini ? 'main-control-mini' : ''}">
        <button class="power-btn ${isOn ? 'on' : ''} ${isMini ? 'power-btn-mini' : ''}" 
                @click="${() => card._toggleEntity()}">
          <ha-icon icon="mdi:lightbulb${isOn ? '' : '-outline'}"></ha-icon>
          ${!isMini ? html`<span class="mode-label">${isOn ? card._t('on') : card._t('off')}</span>` : ''}
        </button>
      </div>

      ${isOn && hasBrightness ? html`
        <div class="temp-control ${isMini ? 'temp-control-mini' : ''}">
          <button class="adj-btn ${isMini ? 'adj-btn-mini' : ''}" @click="${() => card._adjustBrightness(-10)}">
            <ha-icon icon="mdi:minus"></ha-icon>
          </button>
          <div class="target-display" style="cursor: pointer;" @click="${(e) => card._handleSliderClick(e, 'light')}">
            <span class="label">${card._t('brightness')}</span>
            <span class="value ${isMini ? 'value-mini' : ''}">${brightnessPercent}%</span>
          </div>
          <button class="adj-btn ${isMini ? 'adj-btn-mini' : ''}" @click="${() => card._adjustBrightness(10)}">
            <ha-icon icon="mdi:plus"></ha-icon>
          </button>
        </div>
      ` : ''}
      
      ${card._renderMainButtons(layout)}
    `;
}
