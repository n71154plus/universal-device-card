import { html } from 'lit-element';

export function renderMediaPlayer(card, stateObj, layout = 'standard', showPopupButton = true) {
  const state = stateObj.state;
    const title = stateObj.attributes.media_title || 'No Media';
    const artist = stateObj.attributes.media_artist || '';
    const isBar = layout === 'bar';
    const isMini = layout === 'mini';

    const libGroups = {
      artist: [],
      album: [],
      playlist: [],
      track: []
    };
    if (Array.isArray(card._massLibraryItems)) {
      card._massLibraryItems.forEach((item) => {
        const t = item.media_type;
        if (libGroups[t]) libGroups[t].push(item);
      });
    }

    if (isBar) {
      const volPercent = stateObj.attributes.volume_level !== undefined ? Math.round(stateObj.attributes.volume_level * 100) : 0;
      const showMaButtons = card._showMassPlaylistOrLibrary(stateObj);
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
                <span class="bar-value">${volPercent}%</span>
                <button class="bar-btn" @click="${() => card._adjustVolume(5)}">
                  <ha-icon icon="mdi:plus"></ha-icon>
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
          <div class="bar-mode-chip" @click="${() => card._callService('media_player', 'media_previous_track')}">
            <ha-icon icon="mdi:skip-previous"></ha-icon>
          </div>
          <div class="bar-mode-chip ${state === 'playing' ? 'active' : ''}"
               @click="${() => card._callService('media_player', state === 'playing' ? 'media_pause' : 'media_play')}">
            <ha-icon icon="mdi:${state === 'playing' ? 'pause' : 'play'}"></ha-icon>
          </div>
          <div class="bar-mode-chip" @click="${() => card._callService('media_player', 'media_next_track')}">
            <ha-icon icon="mdi:skip-next"></ha-icon>
          </div>
          ${showMaButtons && card._hasMassQueue() ? html`
            <div class="bar-mode-chip ${card._massQueueExpanded ? 'active' : ''}"
                 @click="${() => card._toggleMassQueueExpand()}"
                 title="${card._t('mass_queue_playlist')}">
              <ha-icon icon="mdi:playlist-music"></ha-icon>
            </div>
          ` : ''}
          ${showMaButtons && card._hasMusicAssistantLibrary() ? html`
            <div class="bar-mode-chip ${card._massLibraryExpanded ? 'active' : ''}"
                 @click="${() => card._toggleMassLibraryExpand()}"
                 title="${card._t('mass_library')}">
              <ha-icon icon="mdi:music-box-multiple"></ha-icon>
            </div>
          ` : ''}
          ${showMaButtons && card._hasMusicAssistantSearch() ? html`
            <div class="bar-mode-chip ${card._massSearchExpanded ? 'active' : ''}"
                 @click="${() => card._toggleMassSearchExpand()}"
                 title="${card._t('mass_search')}">
              <ha-icon icon="mdi:magnify"></ha-icon>
            </div>
          ` : ''}
        </div>

        ${card._isMusicAssistant(stateObj) && card._hasMassQueue() && card._massQueueExpanded ? html`
          <div class="mass-queue-foldable">
            <div class="mass-queue-list">
              ${card._massQueueLoading && card._massQueueItems.length === 0
                ? html`<div class="mass-queue-empty">${card._t('mass_queue_loading')}</div>`
                : card._massQueueItems.length === 0
                  ? html`<div class="mass-queue-empty">—</div>`
                  : card._massQueueItems.map((item) => html`
                    <button class="mass-queue-item" @click="${() => card._playMassQueueItem(item)}">
                      <div class="mass-queue-item-image">
                        ${item.local_image_encoded
                          ? html`<img src="data:image/jpeg;base64,${item.local_image_encoded}" alt="" />`
                          : item.media_image
                            ? html`<img src="${item.media_image}" alt="" />`
                            : html`<ha-icon icon="mdi:music"></ha-icon>`}
                      </div>
                      <div class="mass-queue-item-info">
                        <span class="mass-queue-item-title">${item.media_title || item.name || '—'}</span>
                        ${item.media_artist ? html`<span class="mass-queue-item-artist">${item.media_artist}</span>` : ''}
                        ${item.media_album_name ? html`<span class="mass-queue-item-album">${item.media_album_name}</span>` : ''}
                      </div>
                      <ha-icon class="mass-queue-item-play" icon="mdi:play-circle-outline"></ha-icon>
                    </button>
                  `)}
            </div>
          </div>
        ` : ''}

        ${card._isMusicAssistant(stateObj) && card._hasMusicAssistantLibrary() && card._massLibraryExpanded ? html`
          <div class="mass-queue-foldable">
            <div class="mass-library-section">
              ${card._massLibraryLoading && card._massLibraryItems.length === 0
                ? html`<div class="mass-queue-empty">${card._t('mass_library_loading')}</div>`
                : card._massLibraryItems.length === 0
                  ? html`<div class="mass-queue-empty">—</div>`
                  : ['artist', 'album', 'playlist', 'track'].map((type) => {
                      const items = libGroups[type] || [];
                      if (!items.length) return '';
                      return html`
                        <div class="mass-library-row">
                          <div class="mass-library-row-title">${type.toUpperCase()}</div>
                          <div class="mass-library-row-scroll">
                            ${items.map((item) => {
                              const img = item.image || item.album?.image;
                              const artistNames = item.artists?.map(a => a.name).filter(Boolean).join(', ') || '';
                              const albumName = item.album?.name || '';
                              return html`
                                <button class="mass-library-chip" @click="${() => card._playMassLibraryItem(item)}">
                                  <div class="mass-library-chip-image">
                                    ${img ? html`<img src="${img}" alt="" />` : html`<ha-icon icon="mdi:music"></ha-icon>`}
                                  </div>
                                  <div class="mass-library-chip-text">
                                    <span class="mass-library-chip-title">${item.name || '—'}</span>
                                    ${artistNames || albumName ? html`
                                      <span class="mass-library-chip-sub">
                                        ${artistNames || albumName}
                                      </span>
                                    ` : ''}
                                  </div>
                                </button>
                              `;
                            })}
                          </div>
                        </div>
                      `;
                    })}
            </div>
          </div>
        ` : ''}

        ${card._isMusicAssistant(stateObj) && card._hasMusicAssistantSearch() && card._massSearchExpanded ? html`
          <div class="mass-queue-foldable">
            <div class="mass-search-input-row">
              <input type="text" class="mass-search-input" .value="${card._massSearchQuery || ''}"
                     @input="${(e) => card._onMassSearchInput(e)}" @keydown="${(e) => e.key === 'Enter' && card._runMassSearch()}"
                     placeholder="${card._t('mass_search_placeholder')}" />
              <button class="mass-search-btn" @click="${() => card._runMassSearch()}" ?disabled="${card._massSearchLoading}">
                ${card._massSearchLoading ? card._t('mass_search_loading') : card._t('mass_search_button')}
              </button>
            </div>
            <div class="mass-library-section">
              ${card._massSearchLoading && !card._massSearchResults?.artists?.length && !card._massSearchResults?.albums?.length && !card._massSearchResults?.tracks?.length
                ? html`<div class="mass-queue-empty">${card._t('mass_search_loading')}</div>`
                : ['artists', 'albums', 'tracks'].map((key) => {
                    const type = key === 'artists' ? 'artist' : key === 'albums' ? 'album' : 'track';
                    const items = card._massSearchResults?.[key] ?? [];
                    if (!items.length) return '';
                    return html`
                      <div class="mass-library-row">
                        <div class="mass-library-row-title">${type.toUpperCase()}</div>
                        <div class="mass-library-row-scroll">
                          ${items.map((item) => {
                            const img = item.image || item.album?.image;
                            const artistNames = item.artists?.map(a => a.name).filter(Boolean).join(', ') || '';
                            const albumName = item.album?.name || '';
                            return html`
                              <button class="mass-library-chip" @click="${() => card._playMassLibraryItem(item)}">
                                <div class="mass-library-chip-image">
                                  ${img ? html`<img src="${img}" alt="" />` : html`<ha-icon icon="mdi:music"></ha-icon>`}
                                </div>
                                <div class="mass-library-chip-text">
                                  <span class="mass-library-chip-title">${item.name || '—'}</span>
                                  ${artistNames || albumName ? html`
                                    <span class="mass-library-chip-sub">${artistNames || albumName}</span>
                                  ` : ''}
                                </div>
                              </button>
                            `;
                          })}
                        </div>
                      </div>
                    `;
                  })}
            </div>
          </div>
        ` : ''}

        ${card._renderMainButtons(layout)}
      `;
    }

    const volPercent = stateObj.attributes.volume_level !== undefined ? Math.round(stateObj.attributes.volume_level * 100) : 0;
    const showMaButtons = card._showMassPlaylistOrLibrary(stateObj);
    return html`
      <div class="header ${isMini ? 'header-mini' : ''}">
        ${card._renderHeaderIcon(stateObj, isMini)}
        <div class="device-name ${isMini ? 'device-name-mini' : ''}">
          ${card._renderTitle(stateObj.attributes.friendly_name || card._t('device'), layout)}
          ${title ? html`<span class="device-value">${card._renderTitle(title, layout, 28)}</span>` : ''}
        </div>
        ${showMaButtons && card._hasMassQueue() ? html`
          <button class="header-action" @click="${() => card._toggleMassQueueExpand()}">
            <ha-icon icon="mdi:playlist-music"></ha-icon>
          </button>
        ` : ''}
        ${showMaButtons && card._hasMusicAssistantLibrary() ? html`
          <button class="header-action" @click="${() => card._toggleMassLibraryExpand()}">
            <ha-icon icon="mdi:music-box-multiple"></ha-icon>
          </button>
        ` : ''}
        ${showMaButtons && card._hasMusicAssistantSearch() ? html`
          <button class="header-action" @click="${() => card._toggleMassSearchExpand()}">
            <ha-icon icon="mdi:magnify"></ha-icon>
          </button>
        ` : ''}
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

      ${card._isMusicAssistant(stateObj) && card._hasMassQueue() && card._massQueueExpanded ? html`
        <div class="mass-queue-foldable">
          <div class="mass-queue-list">
            ${card._massQueueLoading && card._massQueueItems.length === 0
              ? html`<div class="mass-queue-empty">${card._t('mass_queue_loading')}</div>`
              : card._massQueueItems.length === 0
                ? html`<div class="mass-queue-empty">—</div>`
                : card._massQueueItems.map((item) => html`
                  <button class="mass-queue-item" @click="${() => card._playMassQueueItem(item)}">
                    <div class="mass-queue-item-image">
                      ${item.local_image_encoded
                        ? html`<img src="data:image/jpeg;base64,${item.local_image_encoded}" alt="" />`
                        : item.media_image
                          ? html`<img src="${item.media_image}" alt="" />`
                          : html`<ha-icon icon="mdi:music"></ha-icon>`}
                    </div>
                    <div class="mass-queue-item-info">
                      <span class="mass-queue-item-title">${item.media_title || item.name || '—'}</span>
                      ${item.media_artist ? html`<span class="mass-queue-item-artist">${item.media_artist}</span>` : ''}
                      ${item.media_album_name ? html`<span class="mass-queue-item-album">${item.media_album_name}</span>` : ''}
                    </div>
                    <ha-icon class="mass-queue-item-play" icon="mdi:play-circle-outline"></ha-icon>
                  </button>
                `)}
          </div>
        </div>
      ` : ''}

      ${card._isMusicAssistant(stateObj) && card._hasMusicAssistantLibrary() && card._massLibraryExpanded ? html`
        <div class="mass-queue-foldable">
          <div class="mass-library-section">
            ${card._massLibraryLoading && card._massLibraryItems.length === 0
              ? html`<div class="mass-queue-empty">${card._t('mass_library_loading')}</div>`
              : card._massLibraryItems.length === 0
                ? html`<div class="mass-queue-empty">—</div>`
                : ['artist', 'album', 'playlist', 'track'].map((type) => {
                    const items = libGroups[type] || [];
                    if (!items.length) return '';
                    return html`
                      <div class="mass-library-row">
                        <div class="mass-library-row-title">${type.toUpperCase()}</div>
                        <div class="mass-library-row-scroll">
                          ${items.map((item) => {
                            const img = item.image || item.album?.image;
                            const artistNames = item.artists?.map(a => a.name).filter(Boolean).join(', ') || '';
                            const albumName = item.album?.name || '';
                            return html`
                              <button class="mass-library-chip" @click="${() => card._playMassLibraryItem(item)}">
                                <div class="mass-library-chip-image">
                                  ${img ? html`<img src="${img}" alt="" />` : html`<ha-icon icon="mdi:music"></ha-icon>`}
                                </div>
                                <div class="mass-library-chip-text">
                                  <span class="mass-library-chip-title">${item.name || '—'}</span>
                                  ${artistNames || albumName ? html`
                                    <span class="mass-library-chip-sub">
                                      ${artistNames || albumName}
                                    </span>
                                  ` : ''}
                                </div>
                              </button>
                            `;
                          })}
                        </div>
                      </div>
                    `;
                  })}
          </div>
        </div>
      ` : ''}

      ${card._isMusicAssistant(stateObj) && card._hasMusicAssistantSearch() && card._massSearchExpanded ? html`
        <div class="mass-queue-foldable">
          <div class="mass-search-input-row">
            <input type="text" class="mass-search-input" .value="${card._massSearchQuery || ''}"
                   @input="${(e) => card._onMassSearchInput(e)}" @keydown="${(e) => e.key === 'Enter' && card._runMassSearch()}"
                   placeholder="${card._t('mass_search_placeholder')}" />
            <button class="mass-search-btn" @click="${() => card._runMassSearch()}" ?disabled="${card._massSearchLoading}">
              ${card._massSearchLoading ? card._t('mass_search_loading') : card._t('mass_search_button')}
            </button>
          </div>
          <div class="mass-library-section">
            ${card._massSearchLoading && !card._massSearchResults?.artists?.length && !card._massSearchResults?.albums?.length && !card._massSearchResults?.tracks?.length
              ? html`<div class="mass-queue-empty">${card._t('mass_search_loading')}</div>`
              : ['artists', 'albums', 'tracks'].map((key) => {
                  const type = key === 'artists' ? 'artist' : key === 'albums' ? 'album' : 'track';
                  const items = card._massSearchResults?.[key] ?? [];
                  if (!items.length) return '';
                  return html`
                    <div class="mass-library-row">
                      <div class="mass-library-row-title">${type.toUpperCase()}</div>
                      <div class="mass-library-row-scroll">
                        ${items.map((item) => {
                          const img = item.image || item.album?.image;
                          const artistNames = item.artists?.map(a => a.name).filter(Boolean).join(', ') || '';
                          const albumName = item.album?.name || '';
                          return html`
                            <button class="mass-library-chip" @click="${() => card._playMassLibraryItem(item)}">
                              <div class="mass-library-chip-image">
                                ${img ? html`<img src="${img}" alt="" />` : html`<ha-icon icon="mdi:music"></ha-icon>`}
                              </div>
                              <div class="mass-library-chip-text">
                                <span class="mass-library-chip-title">${item.name || '—'}</span>
                                ${artistNames || albumName ? html`
                                  <span class="mass-library-chip-sub">${artistNames || albumName}</span>
                                ` : ''}
                              </div>
                            </button>
                          `;
                        })}
                      </div>
                    </div>
                  `;
                })}
          </div>
        </div>
      ` : ''}

      ${card._renderMainButtons(layout)}
    `;
}
