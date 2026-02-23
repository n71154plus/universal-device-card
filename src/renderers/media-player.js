import { html } from 'lit-element';

export function renderMediaPlayer(card, stateObj, layout = 'standard', showPopupButton = true) {
  const state = stateObj.state;
    const title = stateObj.attributes.media_title || 'No Media';
    const artist = stateObj.attributes.media_artist || '';
    const isBar = layout === 'bar';
    const isMini = layout === 'mini';

    if (isBar) {
      return html`
        <div class="bar-content">
          <div class="bar-left">
            ${card._renderBarIcon(stateObj, state === 'playing' ? 'bar-icon-on' : '')}
            <div class="bar-info">
              <div class="bar-name">${card._renderTitle(stateObj.attributes.friendly_name, layout, 15)}</div>
              <div class="bar-state">${card._renderTitle(title, layout, 25)}</div>
            </div>
          </div>
          <div class="bar-right">
            ${stateObj.attributes.volume_level !== undefined ? html`
              <div class="bar-controls">
                <button class="bar-btn" @click="${() => card._adjustVolume(-5)}">
                  <ha-icon icon="mdi:minus"></ha-icon>
                </button>
                <span class="bar-value">${Math.round(stateObj.attributes.volume_level * 100)}%</span>
                <button class="bar-btn" @click="${() => card._adjustVolume(5)}">
                  <ha-icon icon="mdi:plus"></ha-icon>
                </button>
              </div>
            ` : ''}
            <div class="bar-controls">
              <button class="bar-btn-small" @click="${() => card._callService('media_player', 'media_previous_track')}">
                <ha-icon icon="mdi:skip-previous"></ha-icon>
              </button>
              <button class="bar-toggle ${state === 'playing' ? 'bar-toggle-on' : ''}" 
                      @click="${() => card._callService('media_player', state === 'playing' ? 'media_pause' : 'media_play')}">
                <ha-icon icon="mdi:${state === 'playing' ? 'pause' : 'play'}"></ha-icon>
              </button>
              <button class="bar-btn-small" @click="${() => card._callService('media_player', 'media_next_track')}">
                <ha-icon icon="mdi:skip-next"></ha-icon>
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

    const volPercent = stateObj.attributes.volume_level !== undefined ? Math.round(stateObj.attributes.volume_level * 100) : 0;
    return html`
      <div class="header ${isMini ? 'header-mini' : ''}">
        ${card._renderHeaderIcon(stateObj, isMini)}
        <div class="device-name ${isMini ? 'device-name-mini' : ''}">
          ${card._renderTitle(stateObj.attributes.friendly_name || card._t('device'), layout)}
          ${title ? html`<span class="device-value">${card._renderTitle(title, layout, 28)}</span>` : ''}
        </div>
        ${card._renderHeaderAction(showPopupButton)}
      </div>

      <div class="media-info ${isMini ? 'media-info-mini' : ''}">
        <div class="media-title ${isMini ? 'media-title-mini' : ''}">${card._renderTitle(title, layout, 30)}</div>
        ${artist && !isMini ? html`<div class="media-artist">${card._renderTitle(artist, layout, 30)}</div>` : ''}
      </div>

      <div class="media-controls ${isMini ? 'media-controls-mini' : ''}">
        <button class="media-btn ${isMini ? 'media-btn-mini' : ''}" @click="${() => card._callService('media_player', 'media_previous_track')}">
          <ha-icon icon="mdi:skip-previous"></ha-icon>
        </button>
        <button class="media-btn primary ${isMini ? 'media-btn-mini' : ''}" @click="${() => card._callService('media_player', state === 'playing' ? 'media_pause' : 'media_play')}">
          <ha-icon icon="mdi:${state === 'playing' ? 'pause' : 'play'}"></ha-icon>
        </button>
        <button class="media-btn ${isMini ? 'media-btn-mini' : ''}" @click="${() => card._callService('media_player', 'media_next_track')}">
          <ha-icon icon="mdi:skip-next"></ha-icon>
        </button>
      </div>

      ${stateObj.attributes.volume_level !== undefined ? html`
        <div class="temp-control ${isMini ? 'temp-control-mini' : ''}">
          <button class="adj-btn ${isMini ? 'adj-btn-mini' : ''}" @click="${() => card._adjustVolume(-5)}">
            <ha-icon icon="mdi:minus"></ha-icon>
          </button>
          <div class="target-display">
            <span class="label">音量</span>
            <span class="value ${isMini ? 'value-mini' : ''}">${volPercent}%</span>
          </div>
          <button class="adj-btn ${isMini ? 'adj-btn-mini' : ''}" @click="${() => card._adjustVolume(5)}">
            <ha-icon icon="mdi:plus"></ha-icon>
          </button>
        </div>
      ` : ''}

      ${card._renderMainButtons(layout)}
    `;
}
