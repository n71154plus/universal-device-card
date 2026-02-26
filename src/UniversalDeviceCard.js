import { LitElement, html } from 'lit-element';
import { getTranslationBaseUrl, DEFAULT_TRANSLATIONS } from './constants/translations.js';
import { cardStyles } from './styles/card-styles.js';
import { popupStyles } from './styles/popup-styles.js';
import { getDomainIcon, getClimateIcon, getFanModeLabel, getFanPresetLabel, getStateColor } from './utils/helpers.js';
import { createHassServices } from './services/hass-services.js';
import { renderControlAction, populateControlAction } from './control-actions/index.js';
import { getPopupStyles } from './popup/popup.js';
import { DEVICE_RENDERERS } from './renderers/index.js';

export class UniversalDeviceCard extends LitElement {
  static get properties() {
    return { 
      hass: {}, 
      config: {}, 
      _showPopup: { type: Boolean },
      _showTextPopup: { type: Boolean },
      _popupText: { type: String },
      _translations: { type: Object },
      _fanModeExpanded: { type: Boolean },
      _massQueueItems: { type: Array },
      _massQueueExpanded: { type: Boolean },
      _massQueueLoading: { type: Boolean },
      _massLibraryItems: { type: Array },
      _massLibraryExpanded: { type: Boolean },
      _massLibraryLoading: { type: Boolean },
      _massSearchExpanded: { type: Boolean },
      _massSearchQuery: { type: String },
      _massSearchLoading: { type: Boolean },
      _massSearchResults: { type: Object }
    };
  }

  constructor() {
    super();
    this._showPopup = false;
    this._showTextPopup = false;
    this._popupText = '';
    this._translations = {};
    this._fanModeExpanded = false;
    this._iconLongPressTimer = null;
    this._iconLongPressFired = false;
    this._iconLastTapTime = 0;
    this._massQueueItems = [];
    this._massQueueExpanded = false;
    this._massQueueLoading = false;
    this._massLibraryItems = [];
    this._massLibraryExpanded = false;
    this._massLibraryLoading = false;
    this._massSearchExpanded = false;
    this._massSearchQuery = '';
    this._massSearchLoading = false;
    this._massSearchResults = { artists: [], albums: [], tracks: [] };
  }

  async connectedCallback() {
    super.connectedCallback();
    await this._loadTranslations();
    this._createPopupPortal();
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    // ?? popup portal
    this._removePopupPortal();
  }

  // 創建掛載到 body 的 portal 容器
  _createPopupPortal() {
    if (!this._popupPortal) {
      this._popupPortal = document.createElement('div');
      this._popupPortal.className = 'udc-popup-portal';
      
      const isInBubbleCard = this._isInBubbleCardPopup();
      const zIndex = isInBubbleCard ? 10000 : 1000; // ??bubble-card ?????踐??次? z-index
      
      this._popupPortal.style.cssText = `position: fixed; inset: 0; top: 0; left: 0; width: 100vw; height: 100vh; height: 100dvh; min-height: -webkit-fill-available; pointer-events: none; z-index: ${zIndex};`;
      
      // 注入 CSS 樣式到 portal
      const style = document.createElement('style');
      style.textContent = getPopupStyles(isInBubbleCard);
      this._popupPortal.appendChild(style);
      
      document.body.appendChild(this._popupPortal);
    }
  }

  _isInBubbleCardPopup() {
    let element = this;
    while (element && element.parentNode) {
      element = element.parentNode;
      if (element.host) element = element.host;
      if (element.classList) {
        const classList = Array.from(element.classList);
        if (classList.some(c => c.includes('bubble') || c.includes('popup-container'))) {
          return true;
        }
      }
      if (element.tagName === 'BUBBLE-CARD' || element.tagName === 'BUBBLE-POP-UP') {
        return true;
      }
    }
    return false;
  }

  _removePopupPortal() {
    if (this._popupPortal && this._popupPortal.parentNode) {
      this._popupPortal.parentNode.removeChild(this._popupPortal);
      this._popupPortal = null;
    }
  }

  // ??航擗???刻麾
  async _loadTranslations() {
    const lang = this.config?.language || this.hass?.language || 'en';
    const langAlias = { 'zh-Hant': 'zh-TW' };
    const resolvedLang = langAlias[lang] || lang;

    this._translations = DEFAULT_TRANSLATIONS[resolvedLang] || DEFAULT_TRANSLATIONS[lang] || DEFAULT_TRANSLATIONS['en'];

    if (lang !== 'auto') {
      try {
        const baseUrl = getTranslationBaseUrl();
        let response = await fetch(`${baseUrl}${lang}.json`);
        if (!response.ok && lang !== resolvedLang) response = await fetch(`${baseUrl}${resolvedLang}.json`);
        if (response.ok) {
          const externalTranslations = await response.json();
          this._translations = { ...this._translations, ...externalTranslations };
        }
      } catch (_e) {
        // 外載失敗時已使用內建 DEFAULT_TRANSLATIONS
      }
    }
  }

  _t(key) {
    return this._translations[key] || DEFAULT_TRANSLATIONS['en'][key] || key;
  }

  static getConfigElement() {
    return document.createElement("universal-device-card-editor");
  }

  static getStubConfig() {
    return {
      entity: "",
      layout: "standard",
      language: "auto",
      disable_popup: false,
      show_buttons: []
    };
  }

  // ????桀???遴竣?
  _getDeviceType() {
    const entityId = this.config.entity;
    return entityId.split('.')[0];
  }

  // ?潘撓貔?????秋???血??⊥????
  _shouldFilterEntity(entity) {
    const filters = this.config.popup_filters || {};
    const entityId = entity.entity_id;
    const domain = entityId.split('.')[0];
    
    // Domain ??
    if (filters.exclude_domains && filters.exclude_domains.includes(domain)) {
      return true;
    }
    
    if (filters.include_domains && !filters.include_domains.includes(domain)) {
      return true;
    }
    
    // Entity ID ??
    if (filters.exclude_entities && filters.exclude_entities.includes(entityId)) {
      return true;
    }
    
    if (filters.include_entities && !filters.include_entities.includes(entityId)) {
      return true;
    }
    
    // Sensor device_class ??
    if (domain === 'sensor' && filters.exclude_sensor_classes) {
      const deviceClass = entity.attributes.device_class;
      if (deviceClass && filters.exclude_sensor_classes.includes(deviceClass)) {
        return true;
      }
    }
    
    if (domain === 'sensor' && filters.include_sensor_classes) {
      const deviceClass = entity.attributes.device_class;
      if (!deviceClass || !filters.include_sensor_classes.includes(deviceClass)) {
        return true;
      }
    }
    
    return false;
  }

  // ?撖??桀???遴竣???????謘???迎
  _getStateColor() {
    const stateObj = this.hass.states[this.config.entity];
    if (!stateObj) return 'var(--ha-card-background)';
    return getStateColor(this._getDeviceType(), stateObj.state);
  }

  // ????鞈???
  _getRelatedEntities() {
    // ????啾播??popup?謆?鈭??豯血??鞎???????２??鈭亙眺
    if (this.config.disable_popup === true) {
      return [];
    }
    
    const mainEntityInfo = this.hass.entities[this.config.entity];
    if (!mainEntityInfo) return [];
    
    const deviceId = mainEntityInfo.device_id;
    const allRelated = Object.values(this.hass.states).filter(state => {
      const ent = this.hass.entities[state.entity_id];
      return ent && ent.device_id === deviceId && state.entity_id !== this.config.entity;
    });
    
    return allRelated.filter(entity => !this._shouldFilterEntity(entity));
  }

  // ?潘撓貔?????秋????
  _isEntityAvailable(entity) {
    return entity.state !== 'unavailable' && entity.state !== 'unknown';
  }

  // ????秋撒謓剝?擗?嚚??瑞?????
  _getMainButtons() {
    if (!this.config.show_buttons || !Array.isArray(this.config.show_buttons)) {
      return [];
    }
    
    return this.config.show_buttons
      .map(entityId => this.hass.states[entityId])
      .filter(state => state !== undefined);
  }

  // ?輯????軋秧?塚??
  _showTextDialog(text) {
    this._popupText = text;
    this._showTextPopup = true;
  }

  render() {
    const stateObj = this.hass.states[this.config.entity];
    if (!stateObj) return html`<ha-card>???????/ha-card>`;

    const bgColor = this._getStateColor();
    const deviceType = this._getDeviceType();
    const layout = this.config.layout || 'standard';
    const showPopupButton = this.config.disable_popup !== true;

    return html`
      <ha-card class="main-container ${layout}-layout" 
               style="background-color: ${bgColor}">
        ${this._renderDeviceSpecificContent(stateObj, deviceType, layout, showPopupButton)}
        ${this._showTextPopup ? this._renderTextPopup() : ''}
      </ha-card>
    `;
  }

  updated(changedProperties) {
    super.updated(changedProperties);
    if (this.hass && this.config?.entity) {
      this._services = createHassServices(this.hass, this.config.entity);
    }
    if (changedProperties.has('_showPopup')) {
      this._updatePopupPortal();
    }
  }

  _updatePopupPortal() {
    if (!this._popupPortal) return;

    if (this._showPopup && !this.config.disable_popup) {
      // ?賹?????哨?颲??銋拙?鞈???popup
      this._popupPortal.style.pointerEvents = 'auto';
      
      // ?皝???popup HTML ????portal
      this._renderPopupToPortal();
    } else {
      this._popupPortal.style.pointerEvents = 'none';
      // 只移除 overlay，保留 portal 內的 <style>，否則下次開啟會沒有 CSS
      const overlay = this._popupPortal.querySelector('.popup-overlay');
      if (overlay) overlay.remove();
    }
  }

  _renderPopupToPortal() {
    const related = this._getRelatedEntities();
    const sensors = related.filter(e => e.entity_id.startsWith('sensor'));
    const controls = related.filter(e => !e.entity_id.startsWith('sensor'));

    // ?? overlay
    const overlay = document.createElement('div');
    overlay.className = 'popup-overlay';
    overlay.addEventListener('click', (e) => {
      if (e.target === overlay) {
        this._showPopup = false;
        this.requestUpdate();
      }
    });

    // ?? content
    const content = document.createElement('div');
    const hideScrollbar = this.config?.hide_popup_scrollbar === true;
    content.className = hideScrollbar ? 'popup-content hide-scrollbar' : 'popup-content';
    content.addEventListener('click', (e) => e.stopPropagation());

    // ?? header
    const header = document.createElement('div');
    header.className = 'popup-header';
    header.innerHTML = `
      <div class="popup-drag-handle"></div>
      <ha-icon class="close-btn" icon="mdi:close"></ha-icon>
    `;
    header.querySelector('.close-btn').addEventListener('click', () => {
      this._showPopup = false;
      this.requestUpdate();
    });

    content.appendChild(header);

    // ??? sensor chips
    if (sensors.length > 0) {
      const chipsContainer = document.createElement('div');
      chipsContainer.className = 'chips-container';
      
      sensors.forEach(s => {
        const isAvailable = this._isEntityAvailable(s);
        const chip = document.createElement('div');
        chip.className = `chip ${!isAvailable ? 'chip-unavailable' : ''}`;
        chip.innerHTML = `
          <ha-icon icon="${s.attributes.icon || 'mdi:information-outline'}"></ha-icon>
          <span>${isAvailable ? `${s.state} ${s.attributes.unit_of_measurement || ''}` : this._t('unavailable')}</span>
        `;
        chipsContainer.appendChild(chip);
      });
      
      content.appendChild(chipsContainer);
    }

    // ??? controls
    if (controls.length > 0) {
      const controlsList = document.createElement('div');
      controlsList.className = 'controls-list';
      
      controls.forEach(ent => {
        const controlCard = this._createControlCardElement(ent);
        controlsList.appendChild(controlCard);
      });
      
      content.appendChild(controlsList);
    } else {
      const noControls = document.createElement('div');
      noControls.className = 'no-controls';
      noControls.textContent = this._t('no_controls');
      content.appendChild(noControls);
    }

    overlay.appendChild(content);
    // 只移除舊的 overlay，不要用 innerHTML = ''，否則會一併清掉 portal 內的 <style> 導致 CSS 失效
    const existing = this._popupPortal.querySelector('.popup-overlay');
    if (existing) existing.remove();
    this._popupPortal.appendChild(overlay);
  }

  _createControlCardElement(ent) {
    const domain = ent.entity_id.split('.')[0];
    const isAvailable = this._isEntityAvailable(ent);

    const card = document.createElement('div');
    card.className = `control-card ${!isAvailable ? 'control-card-unavailable' : ''}`;
    
    const headerDiv = document.createElement('div');
    headerDiv.className = 'control-header';
    headerDiv.innerHTML = `
      <ha-icon icon="${ent.attributes.icon || getDomainIcon(domain)}"></ha-icon>
      <span>${ent.attributes.friendly_name}</span>
      ${!isAvailable ? `<span class="unavailable-badge">${this._t('unavailable')}</span>` : ''}
    `;
    
    const actionDiv = document.createElement('div');
    actionDiv.className = 'control-action';
    
    if (isAvailable) {
      this._populateControlAction(actionDiv, ent, domain);
    } else {
      actionDiv.innerHTML = `<span class="state-text unavailable-text">${ent.state}</span>`;
    }
    
    card.appendChild(headerDiv);
    card.appendChild(actionDiv);
    
    return card;
  }

  _populateControlAction(container, ent, domain) {
    const ctx = {
      toggle: (id) => this._toggleEntity(id),
      setSelect: (id, opt) => this._setSelect(id, opt),
      adjustNumber: (id, delta) => this._adjustNumber(id, delta),
      pressButton: (id) => this._pressButton(id),
      isEntityAvailable: (e) => this._isEntityAvailable(e)
    };
    populateControlAction(container, ent, domain, ctx);
  }

  _renderTextPopup() {
    return html`
      <div class="text-popup-overlay" @click="${() => this._showTextPopup = false}">
        <div class="text-popup-content" @click="${(e) => e.stopPropagation()}">
          <div class="text-popup-header">
            <ha-icon class="close-btn" icon="mdi:close" @click="${() => this._showTextPopup = false}"></ha-icon>
          </div>
          <div class="text-popup-body">${this._popupText}</div>
        </div>
      </div>
    `;
  }

  _renderDeviceSpecificContent(stateObj, deviceType, layout = 'standard', showPopupButton = true) {
    const fn = DEVICE_RENDERERS[deviceType] || DEVICE_RENDERERS.generic;
    return fn(this, stateObj, layout, showPopupButton);
  }

  _renderMainButtons(layout) {
    const buttons = this._getMainButtons();
    if (buttons.length === 0) return '';

    const isBar = layout === 'bar';
    
    return html`
      <div class="main-buttons ${isBar ? 'main-buttons-bar' : ''}">
        ${buttons.map(btn => {
          const isAvailable = this._isEntityAvailable(btn);
          
          return html`
            <button 
              class="main-button ${!isAvailable ? 'disabled' : ''}"
              ?disabled="${!isAvailable}"
              @click="${() => isAvailable && this._pressButton(btn.entity_id)}"
              title="${btn.attributes.friendly_name}">
              <ha-icon icon="${btn.attributes.icon || 'mdi:gesture-tap'}"></ha-icon>
              ${!isBar ? html`<span>${btn.attributes.friendly_name}</span>` : ''}
            </button>
          `;
        })}
      </div>
    `;
  }

  /** 標題：過長時以水平捲動顯示完整文字，不裁切 */
  _renderTitle(text, layout, maxLength = 20) {
    if (!text) return '';
    return html`
      <span class="title-scroll-wrap" title="${text}">
        <span class="title-text">${text}</span>
      </span>
    `;
  }

  _renderPopup() {
    const related = this._getRelatedEntities();
    const sensors = related.filter(e => e.entity_id.startsWith('sensor'));
    const controls = related.filter(e => !e.entity_id.startsWith('sensor'));

    return html`
      <div class="popup-overlay" @click="${() => this._showPopup = false}">
        <div class="popup-content" @click="${(e) => e.stopPropagation()}">
          <div class="popup-header">
            <div class="popup-drag-handle"></div>
            <ha-icon class="close-btn" icon="mdi:close" @click="${() => this._showPopup = false}"></ha-icon>
          </div>
          
          ${sensors.length > 0 ? html`
            <div class="chips-container">
              ${sensors.map(s => {
                const isAvailable = this._isEntityAvailable(s);
                return html`
                  <div class="chip ${!isAvailable ? 'chip-unavailable' : ''}">
                    <ha-icon icon="${s.attributes.icon || 'mdi:information-outline'}"></ha-icon>
                    <span>${isAvailable ? `${s.state} ${s.attributes.unit_of_measurement || ''}` : this._t('unavailable')}</span>
                  </div>
                `;
              })}
            </div>
          ` : ''}

          ${controls.length > 0 ? html`
            <div class="controls-list">
              ${controls.map(ent => this._renderControlCard(ent))}
            </div>
          ` : html`<div class="no-controls">${this._t('no_controls')}</div>`}
        </div>
      </div>
    `;
  }

  _renderControlCard(ent) {
    const domain = ent.entity_id.split('.')[0];
    const isAvailable = this._isEntityAvailable(ent);
    
    return html`
      <div class="control-card ${!isAvailable ? 'control-card-unavailable' : ''}">
        <div class="control-header">
          <ha-icon icon="${ent.attributes.icon || getDomainIcon(domain)}"></ha-icon>
          <span>${ent.attributes.friendly_name}</span>
          ${!isAvailable ? html`<span class="unavailable-badge">${this._t('unavailable')}</span>` : ''}
        </div>
        
        <div class="control-action">
          ${isAvailable ? this._renderControlAction(ent, domain) : html`
            <span class="state-text unavailable-text">${ent.state}</span>
          `}
        </div>
      </div>
    `;
  }

  _renderControlAction(ent, domain) {
    const ctx = {
      html,
      toggle: (id) => this._toggleEntity(id),
      setSelect: (id, opt) => this._setSelect(id, opt),
      adjustNumber: (id, delta) => this._adjustNumber(id, delta),
      pressButton: (id) => this._pressButton(id),
      isEntityAvailable: (e) => this._isEntityAvailable(e)
    };
    return renderControlAction(ctx, ent, domain);
  }

  _setFanPresetMode(preset_mode) {
    this._services?.setFanPresetMode(preset_mode);
  }

  _getVacuumStateText(state) {
    return this._t(state) || state;
  }

  // ????方撒??撖?
  _toggleEntity(entityId = this.config.entity) {
    this._services?.toggle(entityId);
  }

  _callService(domain, service) {
    this._services?.callService(domain, service);
  }

  /** 是否為 Music Assistant 實體（有 mass_player_type 屬性） */
  _isMusicAssistant(stateObj) {
    return stateObj && stateObj.attributes && stateObj.attributes.mass_player_type != null;
  }

  /** 是否已安裝 music_assistant 且可取得佇列（官方 get_queue） */
  _hasMassQueue() {
    return this.hass?.services?.music_assistant?.['get_queue'] != null;
  }

  /** 將 get_queue 回傳的單一項目正規化為顯示用格式 */
  _normalizeQueueItem(item) {
    if (!item) return null;
    const media = item.media_item || item;
    const artists = media.artists;
    const artistName = Array.isArray(artists) && artists.length
      ? artists.map((a) => a?.name).filter(Boolean).join(', ')
      : '';
    return {
      queue_item_id: item.queue_item_id,
      name: item.name || media?.name,
      media_title: item.name || media?.name,
      media_artist: artistName,
      media_album_name: media?.album?.name,
      media_image: media?.image,
      uri: media?.uri,
      media_item: media
    };
  }

  /** 取得 music_assistant.get_queue 播放清單（官方 API） */
  async _fetchMassQueue() {
    if (!this.config?.entity) return;
    this._massQueueLoading = true;
    this._massQueueItems = [];
    this.requestUpdate('_massQueueLoading');
    this.requestUpdate('_massQueueItems');
    const entityId = this.config.entity;
    try {
      let raw = null;
      const target = { entity_id: entityId };
      const serviceData = { entity_id: entityId };
      if (this.hass?.connection && typeof this.hass.connection.sendMessagePromise === 'function') {
        const msg = await this.hass.connection.sendMessagePromise({
          type: 'call_service',
          domain: 'music_assistant',
          service: 'get_queue',
          service_data: serviceData,
          target,
          return_response: true
        });
        raw = msg?.result?.response ?? msg?.response ?? msg?.result;
      }
      if (raw == null && typeof this.hass?.callService === 'function') {
        const res = await this.hass.callService('music_assistant', 'get_queue', serviceData, target, true);
        raw = res?.response ?? res?.result ?? res;
      }
      const items = [];
      if (raw && typeof raw === 'object') {
        const queue = raw[entityId] || raw;
        if (queue && typeof queue === 'object') {
          if (Array.isArray(queue.items)) {
            queue.items.forEach((it) => {
              const n = this._normalizeQueueItem(it);
              if (n) items.push(n);
            });
          } else {
            [queue.current_item, queue.next_item].forEach((it) => {
              const n = this._normalizeQueueItem(it);
              if (n) items.push(n);
            });
          }
        }
      }
      this._massQueueItems = items;
    } catch (e) {
      this._massQueueItems = [];
    }
    this._massQueueLoading = false;
    this.requestUpdate('_massQueueItems');
    this.requestUpdate('_massQueueLoading');
  }

  _toggleMassQueueExpand() {
    this._massQueueExpanded = !this._massQueueExpanded;
    if (this._massQueueExpanded && this._massQueueItems.length === 0 && !this._massQueueLoading) {
      this._fetchMassQueue();
    }
    this.requestUpdate('_massQueueExpanded');
  }

  /** 播放佇列項目（使用 music_assistant.play_media + 曲目 uri） */
  _playMassQueueItem(item) {
    if (!this.hass || !this.config?.entity) return;
    const uri = typeof item === 'string' ? null : item?.uri || item?.media_item?.uri;
    if (uri) {
      this.hass.callService('music_assistant', 'play_media', {
        entity_id: this.config.entity,
        media_id: [uri],
        media_type: 'track'
      });
      return;
    }
  }

  /** 是否已安裝 music_assistant 且可取得 library */
  _hasMusicAssistantLibrary() {
    return this.hass?.services?.music_assistant?.['get_library'] != null;
  }

  /** 取得 music_assistant config_entry_id（供 get_library 使用） */
  async _getMassConfigEntryId() {
    // 0. 手動指定
    if (this.config?.mass_config_entry_id) return this.config.mass_config_entry_id;
    // 1. 前端 entity 快取（若有）
    const entityId = this.config?.entity;
    const frontendEntity = this.hass?.entities?.[entityId];
    if (frontendEntity?.config_entry_id) return frontendEntity.config_entry_id;
    // 2. REST API（可行且穩定）
    if (typeof this.hass?.callApi === 'function') {
      try {
        const entries = await this.hass.callApi('GET', 'config/config_entries/entry');
        const list = Array.isArray(entries) ? entries : [];
        const ma = list.find((e) => e?.domain === 'music_assistant' && e?.state === 'loaded');
        if (ma?.entry_id) return ma.entry_id;
      } catch (_) {
        // ignore
      }
    }
    return null;
  }

  /** 取得 music_assistant 音樂資料庫（tracks / albums / artists / playlists） */
  async _fetchMassLibrary() {
    if (!this.config?.entity) return;
    this._massLibraryLoading = true;
    this._massLibraryItems = [];
    this.requestUpdate('_massLibraryLoading');
    this.requestUpdate('_massLibraryItems');
    try {
      const configEntryId = await this._getMassConfigEntryId();
      if (!configEntryId) {
        this._massLibraryItems = [];
        return;
      }
      const allItems = [];
      const typesToLoad = ['artist', 'album', 'playlist', 'track'];
      const serviceData = { config_entry_id: configEntryId, limit: 30 };

      const fetchOne = async (mt) => {
        const data = { ...serviceData, media_type: mt };
        if (this.hass?.connection && typeof this.hass.connection.sendMessagePromise === 'function') {
          const msg = await this.hass.connection.sendMessagePromise({
            type: 'call_service',
            domain: 'music_assistant',
            service: 'get_library',
            service_data: data,
            return_response: true
          });
          const raw = msg?.result?.response ?? msg?.response ?? msg?.result;
          const items = raw?.items ?? (Array.isArray(raw) ? raw : []);
          return Array.isArray(items) ? items.map(it => ({ ...it, media_type: mt })) : [];
        }
        if (typeof this.hass?.callService === 'function') {
          const res = await this.hass.callService('music_assistant', 'get_library', data, {}, true);
          const raw = res?.response ?? res?.result ?? res;
          const items = raw?.items ?? (Array.isArray(raw) ? raw : []);
          return Array.isArray(items) ? items.map(it => ({ ...it, media_type: mt })) : [];
        }
        return [];
      };

      for (const mt of typesToLoad) {
        try {
          const items = await fetchOne(mt);
          allItems.push(...items);
        } catch (_inner) {
          // ignore single type failure
        }
      }
      this._massLibraryItems = allItems;
    } catch (_e) {
      this._massLibraryItems = [];
    } finally {
      this._massLibraryLoading = false;
      this.requestUpdate('_massLibraryItems');
      this.requestUpdate('_massLibraryLoading');
    }
  }

  _toggleMassLibraryExpand() {
    this._massLibraryExpanded = !this._massLibraryExpanded;
    if (this._massLibraryExpanded && this._massLibraryItems.length === 0 && !this._massLibraryLoading) {
      this._fetchMassLibrary();
    }
    this.requestUpdate('_massLibraryExpanded');
  }

  _playMassLibraryItem(item) {
    if (!this.hass || !this.config?.entity || !item?.uri) return;
    this.hass.callService('music_assistant', 'play_media', {
      entity_id: this.config.entity,
      media_id: [item.uri],
      media_type: item.media_type || 'track'
    });
  }

  /** 是否已安裝 music_assistant 且可搜尋 */
  _hasMusicAssistantSearch() {
    return this.hass?.services?.music_assistant?.search != null;
  }

  /** 執行 music_assistant.search，回傳 { artists, albums, tracks } */
  async _fetchMassSearch(query) {
    const q = (query || '').trim();
    if (!q || !this.config?.entity) return;
    this._massSearchLoading = true;
    this._massSearchResults = { artists: [], albums: [], tracks: [] };
    this.requestUpdate('_massSearchLoading');
    this.requestUpdate('_massSearchResults');
    try {
      const configEntryId = await this._getMassConfigEntryId();
      if (!configEntryId) {
        this._massSearchResults = { artists: [], albums: [], tracks: [] };
        return;
      }
      const serviceData = { config_entry_id: configEntryId, name: q };
      let raw = null;
      if (this.hass?.connection && typeof this.hass.connection.sendMessagePromise === 'function') {
        const msg = await this.hass.connection.sendMessagePromise({
          type: 'call_service',
          domain: 'music_assistant',
          service: 'search',
          service_data: serviceData,
          return_response: true
        });
        raw = msg?.result?.response ?? msg?.response ?? msg?.result;
      }
      if (raw == null && typeof this.hass?.callService === 'function') {
        const res = await this.hass.callService('music_assistant', 'search', serviceData, {}, true);
        raw = res?.response ?? res?.result ?? res;
      }
      const artists = Array.isArray(raw?.artists) ? raw.artists : [];
      const albums = Array.isArray(raw?.albums) ? raw.albums : [];
      const tracks = Array.isArray(raw?.tracks) ? raw.tracks : [];
      this._massSearchResults = { artists, albums, tracks };
    } catch (_e) {
      this._massSearchResults = { artists: [], albums: [], tracks: [] };
    } finally {
      this._massSearchLoading = false;
      this.requestUpdate('_massSearchResults');
      this.requestUpdate('_massSearchLoading');
    }
  }

  _toggleMassSearchExpand() {
    this._massSearchExpanded = !this._massSearchExpanded;
    if (!this._massSearchExpanded) {
      this._massSearchQuery = '';
      this._massSearchResults = { artists: [], albums: [], tracks: [] };
    }
    this.requestUpdate('_massSearchExpanded');
    this.requestUpdate('_massSearchQuery');
    this.requestUpdate('_massSearchResults');
  }

  _onMassSearchInput(ev) {
    this._massSearchQuery = ev?.target?.value ?? '';
    this.requestUpdate('_massSearchQuery');
  }

  _runMassSearch() {
    const q = (this._massSearchQuery || '').trim();
    if (q) this._fetchMassSearch(q);
  }

  /** 是否為 MA 實體且可顯示 queue/library/搜尋 */
  _showMassPlaylistOrLibrary(stateObj) {
    return this._isMusicAssistant(stateObj) && (
      this._hasMassQueue() ||
      this._hasMusicAssistantLibrary() ||
      this._hasMusicAssistantSearch()
    );
  }

  _setSelect(entityId, option) {
    this._services?.setSelect(entityId, option);
  }

  _adjustNumber(entityId, delta) {
    this._services?.adjustNumber(entityId, delta);
  }

  _pressButton(entityId) {
    this._services?.pressButton(entityId);
  }

  /** 開啟 HA 原生 more-info 對話框 */
  _openMoreInfo() {
    this.dispatchEvent(new CustomEvent('hass-more-info', {
      bubbles: true,
      composed: true,
      detail: { entityId: this.config.entity }
    }));
  }

  /** 觸覺／振動回饋（長按或雙擊時，與 HA 原生行為一致） */
  _fireHaptic(type = 'medium') {
    if (typeof navigator !== 'undefined' && navigator.vibrate) {
      navigator.vibrate(type === 'heavy' ? [20, 40, 20] : [15, 30, 15]);
    }
    this.dispatchEvent(new CustomEvent('haptic', {
      bubbles: true,
      composed: true,
      detail: { type }
    }));
  }

  _onIconPointerDown(ev) {
    this._iconLongPressFired = false;
    this._iconLongPressTarget = ev.currentTarget;
    this._iconLongPressTimer = setTimeout(() => {
      this._iconLongPressTimer = null;
      this._iconLongPressFired = true;
      this._fireHaptic('medium');
      if (this._iconLongPressTarget) {
        this._iconLongPressTarget.classList.add('icon-longpress-active');
        setTimeout(() => {
          if (this._iconLongPressTarget) this._iconLongPressTarget.classList.remove('icon-longpress-active');
        }, 200);
      }
      this._openMoreInfo();
    }, 500);
  }

  _onIconPointerUp() {
    if (this._iconLongPressTimer) {
      clearTimeout(this._iconLongPressTimer);
      this._iconLongPressTimer = null;
    }
    this._iconLongPressTarget = null;
    if (this._iconLongPressFired) {
      this._iconLongPressFired = false;
      return;
    }
    const now = Date.now();
    if (this._iconLastTapTime && now - this._iconLastTapTime < 400) {
      this._iconLastTapTime = 0;
      this._fireHaptic('light');
      this._openMoreInfo();
      return;
    }
    this._iconLastTapTime = now;
    this._toggleEntity();
  }

  _onIconPointerLeave() {
    if (this._iconLongPressTimer) {
      clearTimeout(this._iconLongPressTimer);
      this._iconLongPressTimer = null;
    }
    this._iconLongPressTarget = null;
  }

  /** 左上角實體圖示：tap=toggle, long press=more-info, double tap=more-info（與 HA 原生卡片一致） */
  _renderHeaderIcon(stateObj, isMini = false) {
    if (!stateObj) return '';
    const domain = this._getDeviceType();
    const icon = stateObj.attributes?.icon || getDomainIcon(domain);
    const bgColor = getStateColor(domain, stateObj.state);
    const iconColor = (bgColor && bgColor !== 'var(--ha-card-background)' && bgColor.startsWith('rgba'))
      ? bgColor.replace(/[\d.]+\)$/, '1)')
      : '';
    return html`
      <div class="header-icon ${isMini ? 'header-icon-mini' : ''} entity-icon-action"
           style="${iconColor ? `color: ${iconColor}` : ''}"
           @pointerdown="${(e) => this._onIconPointerDown(e)}"
           @pointerup="${this._onIconPointerUp.bind(this)}"
           @pointerleave="${this._onIconPointerLeave.bind(this)}"
           @pointercancel="${this._onIconPointerLeave.bind(this)}"
           @click="${(e) => { e.preventDefault(); e.stopPropagation(); }}"
           title="${this._t('device')}">
        <ha-icon icon="${icon}"></ha-icon>
      </div>
    `;
  }

  /** Bar layout 左側實體圖示：與 header 相同 tap=toggle, long press=more-info, double tap=more-info */
  _renderBarIcon(stateObj, extraClass = '') {
    if (!stateObj) return '';
    const domain = this._getDeviceType();
    const icon = stateObj.attributes?.icon || getDomainIcon(domain);
    return html`
      <div class="bar-icon entity-icon-action ${extraClass}"
           @pointerdown="${(e) => this._onIconPointerDown(e)}"
           @pointerup="${this._onIconPointerUp.bind(this)}"
           @pointerleave="${this._onIconPointerLeave.bind(this)}"
           @pointercancel="${this._onIconPointerLeave.bind(this)}"
           @click="${(e) => { e.preventDefault(); e.stopPropagation(); }}"
           title="${this._t('device')}">
        <ha-icon icon="${icon}"></ha-icon>
      </div>
    `;
  }

  _renderHeaderAction(showPopupButton = true) {
    if (!showPopupButton) return '';
    return html`
      <div class="header-action" 
           @click="${() => this._showPopup = true}"
           title="${this._t('device')}">
        <ha-icon icon="mdi:tune-variant"></ha-icon>
      </div>
    `;
  }

  // ?????魂? slider ?綜等?
  _handleSliderClick(e, type) {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const percent = Math.round((x / rect.width) * 100);
    const clampedPercent = Math.max(0, Math.min(100, percent));
    
    switch(type) {
      case 'light':
        this._setBrightness(clampedPercent);
        break;
      case 'cover':
        this._setCoverPosition(clampedPercent);
        break;
      case 'media':
        this._setVolume(clampedPercent);
        break;
      case 'fan':
        this._setFanSpeed(clampedPercent);
        break;
    }
  }

  // Climate ??對?
  _adjustTemp(step) {
    this._services?.adjustTemp(step);
  }

  _setClimateMode(hvac_mode) {
    this._services?.setClimateMode(hvac_mode);
  }

  _setFanMode(fan_mode) {
    this._services?.setFanMode(fan_mode);
  }

  _setBrightness(percent) {
    this._services?.setBrightness(percent);
  }

  _adjustBrightness(step) {
    const stateObj = this.hass.states[this.config.entity];
    const currentBrightness = stateObj.attributes.brightness || 0;
    const currentPercent = Math.round((currentBrightness / 255) * 100);
    const newPercent = Math.max(0, Math.min(100, currentPercent + step));
    this._setBrightness(newPercent);
  }

  // Fan ??對?
  _setFanSpeed(percent) {
    this._services?.setFanSpeed(percent);
  }

  _adjustFanSpeed(step) {
    const stateObj = this.hass.states[this.config.entity];
    const currentPercent = stateObj.attributes.percentage || 0;
    const newPercent = Math.max(0, Math.min(100, currentPercent + step));
    this._setFanSpeed(newPercent);
  }

  // Cover ??對?
  _setCoverPosition(position) {
    this._services?.setCoverPosition(position);
  }

  _adjustCoverPosition(step) {
    const stateObj = this.hass.states[this.config.entity];
    const currentPosition = stateObj.attributes.current_position || 0;
    const newPosition = Math.max(0, Math.min(100, currentPosition + step));
    this._setCoverPosition(newPosition);
  }

  _adjustCoverTiltPosition(step) {
    const stateObj = this.hass.states[this.config.entity];
    const currentTilt = stateObj.attributes.current_tilt_position ?? 50;
    const newTilt = Math.max(0, Math.min(100, currentTilt + step));
    this._services?.setCoverTiltPosition(newTilt);
  }

  // Media Player ??對?
  _setVolume(volume) {
    this._services?.setVolume(volume);
  }

  _adjustVolume(step) {
    const stateObj = this.hass.states[this.config.entity];
    const currentVolume = (stateObj.attributes.volume_level || 0) * 100;
    const newVolume = Math.max(0, Math.min(100, currentVolume + step));
    this._setVolume(newVolume);
  }

  // Water Heater ??對?
  _adjustWaterTemp(step) {
    this._services?.adjustWaterTemp(step);
  }

  setConfig(config) { 
    if (!config.entity) {
      throw new Error('?ｇ????entity');
    }
    this.config = config; 
  }

  static get styles() {
    return [cardStyles, popupStyles];
  }
}
