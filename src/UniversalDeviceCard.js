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
      _massLibraryLoading: { type: Boolean }
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
      
      this._popupPortal.style.cssText = `position: fixed; top: 0; left: 0; width: 100%; height: 100%; pointer-events: none; z-index: ${zIndex};`;
      
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

  /** 是否已安裝 mass_queue 且可取得佇列 */
  _hasMassQueue() {
    return this.hass?.services?.mass_queue?.['get_queue_items'] != null;
  }

  /** 取得 mass_queue 播放清單（需 SupportsResponse） */
  async _fetchMassQueue() {
    if (!this.config?.entity) return;
    this._massQueueLoading = true;
    this._massQueueItems = [];
    this.requestUpdate('_massQueueLoading');
    this.requestUpdate('_massQueueItems');
    try {
      // HA WebSocket API 使用 return_response，回傳在 result.response
      let raw = null;
      if (this.hass?.connection && typeof this.hass.connection.sendMessagePromise === 'function') {
        const msg = await this.hass.connection.sendMessagePromise({
          type: 'call_service',
          domain: 'mass_queue',
          service: 'get_queue_items',
          service_data: { entity: this.config.entity },
          return_response: true
        });
        raw = msg?.result?.response ?? msg?.response;
      }
      if (raw == null && typeof this.hass?.callService === 'function') {
        const res = await this.hass.callService('mass_queue', 'get_queue_items', { entity: this.config.entity }, {}, true);
        raw = res?.response ?? res?.result;
      }
      let items = [];
      if (raw != null) {
        if (Array.isArray(raw)) items = raw;
        else if (raw && typeof raw === 'object' && raw[this.config.entity]) items = raw[this.config.entity];
        else if (raw && typeof raw === 'object') items = Object.values(raw).flat();
      }
      this._massQueueItems = Array.isArray(items) ? items : [];
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

  _playMassQueueItem(queueItemId) {
    if (!this.hass || !this.config?.entity) return;
    this.hass.callService('mass_queue', 'play_queue_item', {
      entity: this.config.entity,
      queue_item_id: queueItemId
    });
  }

  /** 是否已安裝 music_assistant 且可取得 library */
  _hasMusicAssistantLibrary() {
    return this.hass?.services?.music_assistant?.['get_library'] != null;
  }

  /** 從 media_player 實體反查 music_assistant config_entry_id */
  async _getMassConfigEntryId() {
    // 0. 若 config 有手動指定，優先使用
    if (this.config?.mass_config_entry_id) return this.config.mass_config_entry_id;
    if (!this.hass?.connection || !this.config?.entity) return null;
    try {
      // 1. 從 entity registry 取得該實體的 config_entry_id
      const entityMsg = await this.hass.connection.sendMessagePromise({
        type: 'config/entity_registry/get',
        entity_id: this.config.entity
      });
      const entityEntry = entityMsg?.result;
      if (entityEntry?.config_entry_id) return entityEntry.config_entry_id;

      // 2. 若 entity 無 config_entry_id，從 device 取得
      const deviceId = entityEntry?.device_id;
      if (deviceId) {
        const deviceMsg = await this.hass.connection.sendMessagePromise({
          type: 'config/device_registry/list'
        });
        const devices = deviceMsg?.result ?? [];
        const device = Array.isArray(devices) ? devices.find(d => d.id === deviceId) : null;
        const configEntries = device?.config_entries ?? [];
        if (configEntries.length > 0) return configEntries[0];
      }

      // 3. Fallback: config_entries/get 可能不存在，僅在 try 內呼叫
      try {
        const entriesMsg = await this.hass.connection.sendMessagePromise({
          type: 'config_entries/get',
          domain: 'music_assistant'
        });
        const entries = entriesMsg?.result ?? [];
        const first = Array.isArray(entries) && entries.length > 0 ? entries[0] : null;
        return first?.entry_id ?? first ?? null;
      } catch (_) {
        return null;
      }
    } catch (_e) {
      return null;
    }
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

  /** 是否為 MA 實體且可顯示 playlist/library（mass_queue 或 music_assistant） */
  _showMassPlaylistOrLibrary(stateObj) {
    return this._isMusicAssistant(stateObj) && (this._hasMassQueue() || this._hasMusicAssistantLibrary());
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
