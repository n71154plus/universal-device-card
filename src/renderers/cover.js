import { html } from 'lit-element';

const COVER_OPEN_TILT = 16;
const COVER_CLOSE_TILT = 32;
const COVER_SET_TILT_POSITION = 128;

export function renderCover(card, stateObj, layout = 'standard', showPopupButton = true) {
  const position = stateObj.attributes.current_position || 0;
  const tiltPosition = stateObj.attributes.current_tilt_position ?? 0;
  const state = stateObj.state;
  const features = stateObj.attributes.supported_features ?? 0;
  const hasTilt = (features & (COVER_OPEN_TILT | COVER_CLOSE_TILT)) !== 0;
  const hasTiltPosition = (features & COVER_SET_TILT_POSITION) !== 0 && stateObj.attributes.current_tilt_position !== undefined;
  const isBar = layout === 'bar';
  const isMini = layout === 'mini';

  if (isBar) {
      return html`
        <div class="bar-content">
          <div class="bar-left">
            ${card._renderBarIcon(stateObj, '')}
            <div class="bar-info">
              <div class="bar-name">${card._renderTitle(stateObj.attributes.friendly_name, layout)}</div>
              <div class="bar-state">${position}%${hasTiltPosition ? ` / ${tiltPosition}%` : ''}</div>
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
            ${hasTiltPosition ? html`
              <div class="bar-controls">
                <button class="bar-btn" @click="${() => card._adjustCoverTiltPosition(-10)}">
                  <ha-icon icon="mdi:blinds"></ha-icon>
                </button>
                <button class="bar-btn" @click="${() => card._adjustCoverTiltPosition(10)}">
                  <ha-icon icon="mdi:blinds-open"></ha-icon>
                </button>
              </div>
            ` : ''}
            ${showPopupButton ? html`
              <button class="bar-settings" @click="${() => card._showPopup = true}">
                <ha-icon icon="mdi:cog"></ha-icon>
              </button>
            ` : ''}
          </div>
        </div>

        <div class="bar-modes">
          <div class="bar-mode-chip ${state === 'open' || state === 'opening' ? 'active' : ''}"
               @click="${() => card._callService('cover', 'open_cover')}"
               title="${card._t('open')}">
            <ha-icon icon="mdi:arrow-up"></ha-icon>
          </div>
          <div class="bar-mode-chip ${state === 'opening' || state === 'closing' ? 'active' : ''}"
               @click="${() => card._callService('cover', 'stop_cover')}"
               title="${card._t('stop')}">
            <ha-icon icon="mdi:stop"></ha-icon>
          </div>
          <div class="bar-mode-chip ${state === 'closed' || state === 'closing' ? 'active' : ''}"
               @click="${() => card._callService('cover', 'close_cover')}"
               title="${card._t('close')}">
            <ha-icon icon="mdi:arrow-down"></ha-icon>
          </div>
        </div>

        ${hasTilt ? html`
          <div class="bar-modes">
            <div class="bar-mode-chip"
                 @click="${() => card._callService('cover', 'open_cover_tilt')}"
                 title="${card._t('open_tilt')}">
              <ha-icon icon="mdi:blinds-open"></ha-icon>
            </div>
            <div class="bar-mode-chip"
                 @click="${() => card._callService('cover', 'close_cover_tilt')}"
                 title="${card._t('close_tilt')}">
              <ha-icon icon="mdi:blinds"></ha-icon>
            </div>
          </div>
        ` : ''}

        ${card._renderMainButtons(layout)}
      `;
    }

    return html`
      <div class="header ${isMini ? 'header-mini' : ''}">
        ${card._renderHeaderIcon(stateObj, isMini)}
        <div class="device-name ${isMini ? 'device-name-mini' : ''}">
          ${card._renderTitle(stateObj.attributes.friendly_name || card._t('device'), layout)}
          ${stateObj.attributes.current_position !== undefined ? html`<span class="device-value">${position}%${hasTiltPosition ? ` / ${tiltPosition}%` : ''}</span>` : ''}
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
        ${hasTilt ? html`
          <button class="cover-btn ${isMini ? 'cover-btn-mini' : ''}" @click="${() => card._callService('cover', 'open_cover_tilt')}">
            <ha-icon icon="mdi:blinds-open"></ha-icon>
            <span>${card._t('open_tilt')}</span>
          </button>
          <button class="cover-btn ${isMini ? 'cover-btn-mini' : ''}" @click="${() => card._callService('cover', 'close_cover_tilt')}">
            <ha-icon icon="mdi:blinds"></ha-icon>
            <span>${card._t('close_tilt')}</span>
          </button>
        ` : ''}
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
      ${hasTiltPosition ? html`
        <div class="temp-control ${isMini ? 'temp-control-mini' : ''}">
          <button class="adj-btn ${isMini ? 'adj-btn-mini' : ''}" @click="${() => card._adjustCoverTiltPosition(-10)}">
            <ha-icon icon="mdi:minus"></ha-icon>
          </button>
          <div class="target-display">
            <span class="label">${card._t('tilt')}</span>
            <span class="value ${isMini ? 'value-mini' : ''}">${tiltPosition}%</span>
          </div>
          <button class="adj-btn ${isMini ? 'adj-btn-mini' : ''}" @click="${() => card._adjustCoverTiltPosition(10)}">
            <ha-icon icon="mdi:plus"></ha-icon>
          </button>
        </div>
      ` : ''}
      ${card._renderMainButtons(layout)}
    `;
}
