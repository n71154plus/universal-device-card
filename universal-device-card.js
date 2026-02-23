import { LitElement, html } from 'https://unpkg.com/lit-element@2.4.0/lit-element.js?module';
import { TRANSLATION_BASE_URL, DEFAULT_TRANSLATIONS } from './src/constants/translations.js';
import { cardStyles } from './src/styles/card-styles.js';
import { popupStyles } from './src/styles/popup-styles.js';
import { getDomainIcon, getClimateIcon, getFanModeLabel, getFanPresetLabel, getStateColor } from './src/utils/helpers.js';
import { createHassServices } from './src/services/hass-services.js';
import { renderControlAction, populateControlAction } from './src/control-actions/index.js';
import { getPopupStyles } from './src/popup/popup.js';
import { DEVICE_RENDERERS } from './src/renderers/index.js';

class UniversalDeviceCard extends LitElement {
  static get properties() {
    return { 
      hass: {}, 
      config: {}, 
      _showPopup: { type: Boolean },
      _showTextPopup: { type: Boolean },
      _popupText: { type: String },
      _translations: { type: Object },
      _fanModeExpanded: { type: Boolean }
    };
  }

  constructor() {
    super();
    this._showPopup = false;
    this._showTextPopup = false;
    this._popupText = '';
    this._translations = {};
    this._fanModeExpanded = false;
  }

  async connectedCallback() {
    super.connectedCallback();
    await this._loadTranslations();
    // 創建 popup portal 容器
    this._createPopupPortal();
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    // 清理 popup portal
    this._removePopupPortal();
  }

  // 創建掛載到 body 的 portal 容器
  _createPopupPortal() {
    if (!this._popupPortal) {
      this._popupPortal = document.createElement('div');
      this._popupPortal.className = 'udc-popup-portal';
      
      // 檢測是否在 bubble-card popup 中
      const isInBubbleCard = this._isInBubbleCardPopup();
      const zIndex = isInBubbleCard ? 10000 : 1000; // 在 bubble-card 中使用更高的 z-index
      
      this._popupPortal.style.cssText = `position: fixed; top: 0; left: 0; width: 100%; height: 100%; pointer-events: none; z-index: ${zIndex};`;
      
      // 注入 CSS 樣式到 portal
      const style = document.createElement('style');
      style.textContent = getPopupStyles(isInBubbleCard);
      this._popupPortal.appendChild(style);
      
      document.body.appendChild(this._popupPortal);
    }
  }

  // 檢測是否在 bubble-card 的 popup 中
  _isInBubbleCardPopup() {
    let element = this;
    while (element && element.parentNode) {
      element = element.parentNode;
      // 檢查是否有 bubble-card 或其 popup 容器的特徵
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

  // 移除 portal 容器
  _removePopupPortal() {
    if (this._popupPortal && this._popupPortal.parentNode) {
      this._popupPortal.parentNode.removeChild(this._popupPortal);
      this._popupPortal = null;
    }
  }

  // 載入翻譯文件
  async _loadTranslations() {
    const lang = this.config?.language || this.hass?.language || 'en';
    
    // 先使用預設翻譯
    this._translations = DEFAULT_TRANSLATIONS[lang] || DEFAULT_TRANSLATIONS['en'];
    
    // 嘗試從外部 JSON 載入（如果不是 auto）
    if (lang !== 'auto') {
      try {
        const response = await fetch(`${TRANSLATION_BASE_URL}${lang}.json`);
        if (response.ok) {
          const externalTranslations = await response.json();
          this._translations = { ...this._translations, ...externalTranslations };
          console.log(`Loaded external translations for ${lang}`);
        }
      } catch (e) {
        // 使用預設翻譯
        console.log(`Using default translations for ${lang}`);
      }
    }
  }

  // 獲取翻譯文本
  _t(key) {
    return this._translations[key] || DEFAULT_TRANSLATIONS['en'][key] || key;
  }

  // UI 編輯器支持
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

  // 獲取設備類型
  _getDeviceType() {
    const entityId = this.config.entity;
    return entityId.split('.')[0];
  }

  // 檢查實體是否應該被過濾掉
  _shouldFilterEntity(entity) {
    const filters = this.config.popup_filters || {};
    const entityId = entity.entity_id;
    const domain = entityId.split('.')[0];
    
    // Domain 過濾
    if (filters.exclude_domains && filters.exclude_domains.includes(domain)) {
      return true;
    }
    
    if (filters.include_domains && !filters.include_domains.includes(domain)) {
      return true;
    }
    
    // Entity ID 過濾
    if (filters.exclude_entities && filters.exclude_entities.includes(entityId)) {
      return true;
    }
    
    if (filters.include_entities && !filters.include_entities.includes(entityId)) {
      return true;
    }
    
    // Sensor device_class 過濾
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

  // 根據設備類型和狀態獲取背景色
  _getStateColor() {
    const stateObj = this.hass.states[this.config.entity];
    if (!stateObj) return 'var(--ha-card-background)';
    return getStateColor(this._getDeviceType(), stateObj.state);
  }

  // 獲取相關實體
  _getRelatedEntities() {
    // 如果禁用 popup，直接返回空數組，不進行任何查詢
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
    
    // 應用過濾器
    return allRelated.filter(entity => !this._shouldFilterEntity(entity));
  }

  // 檢查實體是否可用
  _isEntityAvailable(entity) {
    return entity.state !== 'unavailable' && entity.state !== 'unknown';
  }

  // 獲取要在主畫面顯示的按鈕
  _getMainButtons() {
    if (!this.config.show_buttons || !Array.isArray(this.config.show_buttons)) {
      return [];
    }
    
    return this.config.show_buttons
      .map(entityId => this.hass.states[entityId])
      .filter(state => state !== undefined);
  }

  // 顯示文本彈窗
  _showTextDialog(text) {
    this._popupText = text;
    this._showTextPopup = true;
  }

  render() {
    const stateObj = this.hass.states[this.config.entity];
    if (!stateObj) return html`<ha-card>實體未找到</ha-card>`;

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

  // 更新 popup portal 的內容
  _updatePopupPortal() {
    if (!this._popupPortal) return;

    if (this._showPopup && !this.config.disable_popup) {
      // 啟用指針事件以便能點擊 popup
      this._popupPortal.style.pointerEvents = 'auto';
      
      // 直接將 popup HTML 渲染到 portal
      this._renderPopupToPortal();
    } else {
      // 清空 portal 並禁用指針事件
      this._popupPortal.style.pointerEvents = 'none';
      this._popupPortal.innerHTML = '';
    }
  }

  // 將 popup 渲染到 portal 的輔助方法
  _renderPopupToPortal() {
    const related = this._getRelatedEntities();
    const sensors = related.filter(e => e.entity_id.startsWith('sensor'));
    const controls = related.filter(e => !e.entity_id.startsWith('sensor'));

    // 創建 overlay
    const overlay = document.createElement('div');
    overlay.className = 'popup-overlay';
    overlay.addEventListener('click', (e) => {
      if (e.target === overlay) {
        this._showPopup = false;
        this.requestUpdate();
      }
    });

    // 創建 content
    const content = document.createElement('div');
    // 檢查是否要隱藏捲軸（默認使用美化捲軸）
    const hideScrollbar = this.config?.hide_popup_scrollbar === true;
    content.className = hideScrollbar ? 'popup-content hide-scrollbar' : 'popup-content';
    content.addEventListener('click', (e) => e.stopPropagation());

    // 創建 header
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

    // 添加 sensor chips
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

    // 添加 controls
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
    this._popupPortal.innerHTML = '';
    this._popupPortal.appendChild(overlay);
  }

  // 創建單個控制卡片元素
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

  // 渲染主畫面按鈕
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

  // 渲染標題，支持長文本截斷
  _renderTitle(text, layout, maxLength = 20) {
    if (!text) return '';
    
    const isTruncated = (layout === 'mini' || layout === 'bar') && text.length > maxLength;
    const displayText = isTruncated ? text.substring(0, maxLength) + '...' : text;
    
    if (isTruncated) {
      return html`
        <span class="truncated-text" 
              @click="${() => this._showTextDialog(text)}" 
              title="${this._t('click_to_view')}">
          ${displayText}
        </span>
      `;
    }
    
    return html`<span>${displayText}</span>`;
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

  // 服務調用方法
  _toggleEntity(entityId = this.config.entity) {
    this._services?.toggle(entityId);
  }

  _callService(domain, service) {
    this._services?.callService(domain, service);
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

  // 顯示 more-info 對話框
  // 渲染 header action 圖標
  _renderHeaderAction(showPopupButton = true) {
    if (!showPopupButton) return '';
    
    return html`
      <div class="header-action" 
           @click="${() => this._showPopup = true}"
           title="設定">
        <ha-icon icon="mdi:tune-variant"></ha-icon>
      </div>
    `;
  }

  // 處理背景 slider 點擊
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

  // Climate 控制
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

  // Fan 控制
  _setFanSpeed(percent) {
    this._services?.setFanSpeed(percent);
  }

  _adjustFanSpeed(step) {
    const stateObj = this.hass.states[this.config.entity];
    const currentPercent = stateObj.attributes.percentage || 0;
    const newPercent = Math.max(0, Math.min(100, currentPercent + step));
    this._setFanSpeed(newPercent);
  }

  // Cover 控制
  _setCoverPosition(position) {
    this._services?.setCoverPosition(position);
  }

  _adjustCoverPosition(step) {
    const stateObj = this.hass.states[this.config.entity];
    const currentPosition = stateObj.attributes.current_position || 0;
    const newPosition = Math.max(0, Math.min(100, currentPosition + step));
    this._setCoverPosition(newPosition);
  }

  // Media Player 控制
  _setVolume(volume) {
    this._services?.setVolume(volume);
  }

  _adjustVolume(step) {
    const stateObj = this.hass.states[this.config.entity];
    const currentVolume = (stateObj.attributes.volume_level || 0) * 100;
    const newVolume = Math.max(0, Math.min(100, currentVolume + step));
    this._setVolume(newVolume);
  }

  // Water Heater 控制
  _adjustWaterTemp(step) {
    this._services?.adjustWaterTemp(step);
  }

  setConfig(config) { 
    if (!config.entity) {
      throw new Error('請指定 entity');
    }
    this.config = config; 
  }

  static get styles() {
    return [cardStyles, popupStyles];
  }
}

customElements.define('universal-device-card', UniversalDeviceCard);

// UI Editor Component
class UniversalDeviceCardEditor extends LitElement {
  static get properties() {
    return {
      hass: {},
      config: {},
      _translations: { type: Object }
    };
  }

  constructor() {
    super();
    this._translations = {};
  }

  async connectedCallback() {
    super.connectedCallback();
    await this._loadTranslations();
  }

  async _loadTranslations() {
    const lang = this.hass?.language || 'en';
    this._translations = DEFAULT_TRANSLATIONS[lang] || DEFAULT_TRANSLATIONS['en'];
    
    try {
      const response = await fetch(`${TRANSLATION_BASE_URL}${lang}.json`);
      if (response.ok) {
        const externalTranslations = await response.json();
        this._translations = { ...this._translations, ...externalTranslations };
      }
    } catch (e) {
      // 使用預設翻譯
    }
    this.requestUpdate();
  }

  _t(key) {
    return this._translations[key] || DEFAULT_TRANSLATIONS['en'][key] || key;
  }

  setConfig(config) {
    this.config = config;
  }

  configChanged(newConfig) {
    const event = new Event('config-changed', {
      bubbles: true,
      composed: true
    });
    event.detail = { config: newConfig };
    this.dispatchEvent(event);
  }

  _valueChanged(ev) {
    const target = ev.target;
    const configValue = target.configValue;
    const value = target.checked !== undefined ? target.checked : target.value;
    
    if (this.config[configValue] === value) return;
    
    const newConfig = { ...this.config };
    if (value === '' || (target.type === 'checkbox' && !value)) {
      delete newConfig[configValue];
    } else {
      newConfig[configValue] = value;
    }
    
    this.configChanged(newConfig);
  }

  _showButtonsChanged(ev) {
    const value = ev.target.value;
    const newConfig = { ...this.config };
    
    if (value === '') {
      delete newConfig.show_buttons;
    } else {
      newConfig.show_buttons = value.split(',').map(s => s.trim()).filter(s => s);
    }
    
    this.configChanged(newConfig);
  }

  _filterChanged(ev) {
    const target = ev.target;
    const filterType = target.getAttribute('filter-type');
    const value = target.value;
    
    const newConfig = { ...this.config };
    if (!newConfig.popup_filters) {
      newConfig.popup_filters = {};
    }
    
    if (value === '') {
      delete newConfig.popup_filters[filterType];
    } else {
      newConfig.popup_filters[filterType] = value.split(',').map(s => s.trim()).filter(s => s);
    }
    
    this.configChanged(newConfig);
  }

  render() {
    if (!this.hass || !this.config) {
      return html``;
    }

    const entities = Object.keys(this.hass.states).filter(eid => {
      const domain = eid.split('.')[0];
      return ['climate', 'light', 'fan', 'cover', 'humidifier', 'media_player', 'vacuum', 'water_heater'].includes(domain);
    });

    const filters = this.config.popup_filters || {};

    return html`
      <div class="card-config">
        <div class="option">
          <label>
            ${this._t('editor_entity')} ${this._t('editor_entity_required')}
            <select 
              .value="${this.config.entity || ''}"
              .configValue="${'entity'}"
              @change="${this._valueChanged}">
              <option value="">${this._t('editor_entity_select')}</option>
              ${entities.map(eid => html`
                <option value="${eid}" ?selected="${this.config.entity === eid}">
                  ${this.hass.states[eid].attributes.friendly_name || eid}
                </option>
              `)}
            </select>
          </label>
        </div>

        <div class="option">
          <label>
            ${this._t('editor_layout')}
            <select 
              .value="${this.config.layout || 'standard'}"
              .configValue="${'layout'}"
              @change="${this._valueChanged}">
              <option value="standard">${this._t('editor_layout_standard')}</option>
              <option value="mini">${this._t('editor_layout_mini')}</option>
              <option value="bar">${this._t('editor_layout_bar')}</option>
            </select>
          </label>
        </div>

        <div class="option">
          <label>
            ${this._t('editor_language')}
            <select 
              .value="${this.config.language || 'auto'}"
              .configValue="${'language'}"
              @change="${this._valueChanged}">
              <option value="auto">${this._t('editor_language_auto')}</option>
              <option value="zh-TW">繁體中文</option>
              <option value="zh-CN">简体中文</option>
              <option value="en">English</option>
              <option value="ja">日本語</option>
            </select>
          </label>
        </div>

        <div class="option">
          <label class="checkbox-label">
            <input 
              type="checkbox"
              .checked="${this.config.disable_popup || false}"
              .configValue="${'disable_popup'}"
              @change="${this._valueChanged}">
            <span>${this._t('editor_disable_popup')}</span>
          </label>
        </div>

        <div class="option">
          <label>
            ${this._t('editor_show_buttons')}
            <small>${this._t('editor_show_buttons_desc')}</small>
            <input
              type="text"
              .value="${(this.config.show_buttons || []).join(', ')}"
              @change="${this._showButtonsChanged}"
              placeholder="button.eco_mode, button.self_clean">
          </label>
        </div>

        <hr>

        <h3>${this._t('editor_filters_title')}</h3>
        <p class="description">${this._t('editor_filters_desc')}</p>

        <div class="option">
          <label>
            ${this._t('editor_exclude_domains')}
            <input
              type="text"
              .value="${filters.exclude_domains?.join(', ') || ''}"
              filter-type="exclude_domains"
              @change="${this._filterChanged}"
              placeholder="binary_sensor, update">
          </label>
        </div>

        <div class="option">
          <label>
            ${this._t('editor_include_domains')}
            <input
              type="text"
              .value="${filters.include_domains?.join(', ') || ''}"
              filter-type="include_domains"
              @change="${this._filterChanged}"
              placeholder="sensor, switch, select">
          </label>
        </div>

        <div class="option">
          <label>
            ${this._t('editor_exclude_entities')}
            <input
              type="text"
              .value="${filters.exclude_entities?.join(', ') || ''}"
              filter-type="exclude_entities"
              @change="${this._filterChanged}"
              placeholder="sensor.wifi_signal, switch.test">
          </label>
        </div>

        <div class="option">
          <label>
            ${this._t('editor_include_entities')}
            <input
              type="text"
              .value="${filters.include_entities?.join(', ') || ''}"
              filter-type="include_entities"
              @change="${this._filterChanged}"
              placeholder="sensor.temperature, sensor.humidity">
          </label>
        </div>

        <div class="option">
          <label>
            ${this._t('editor_exclude_sensor_classes')}
            <input
              type="text"
              .value="${filters.exclude_sensor_classes?.join(', ') || ''}"
              filter-type="exclude_sensor_classes"
              @change="${this._filterChanged}"
              placeholder="timestamp, update, date">
          </label>
        </div>

        <div class="option">
          <label>
            ${this._t('editor_include_sensor_classes')}
            <input
              type="text"
              .value="${filters.include_sensor_classes?.join(', ') || ''}"
              filter-type="include_sensor_classes"
              @change="${this._filterChanged}"
              placeholder="temperature, humidity, battery">
          </label>
        </div>
      </div>
    `;
  }

  static get styles() {
    return css`
      .card-config {
        padding: 16px;
      }

      .option {
        margin-bottom: 16px;
      }

      .option label {
        display: block;
        margin-bottom: 4px;
        font-weight: 500;
        color: var(--primary-text-color);
      }

      .option label small {
        display: block;
        font-size: 12px;
        color: var(--secondary-text-color);
        font-weight: normal;
        margin-top: 2px;
      }

      .option select,
      .option input[type="text"] {
        width: 100%;
        padding: 8px;
        border: 1px solid var(--divider-color);
        border-radius: 4px;
        background: var(--card-background-color);
        color: var(--primary-text-color);
        font-size: 14px;
        box-sizing: border-box;
      }

      .option select:focus,
      .option input:focus {
        outline: none;
        border-color: var(--primary-color);
      }

      .checkbox-label {
        display: flex !important;
        align-items: center;
        gap: 8px;
        cursor: pointer;
      }

      .checkbox-label input[type="checkbox"] {
        width: auto;
        cursor: pointer;
      }

      h3 {
        margin: 20px 0 8px 0;
        font-size: 16px;
        color: var(--primary-text-color);
      }

      .description {
        margin: 0 0 12px 0;
        font-size: 12px;
        color: var(--secondary-text-color);
        font-style: italic;
      }

      hr {
        border: none;
        border-top: 1px solid var(--divider-color);
        margin: 20px 0;
      }
    `;
  }
}

customElements.define('universal-device-card-editor', UniversalDeviceCardEditor);

// 註冊到 customCards，讓 UI 編輯器可以找到
window.customCards = window.customCards || [];
window.customCards.push({
  type: 'universal-device-card',
  name: 'Universal Device Card',
  description: '通用設備卡片 - 支援 Climate、Light、Fan、Cover 等多種設備類型',
  preview: true,
  documentationURL: 'https://github.com/your-repo/universal-device-card',
});

console.info(
  '%c UNIVERSAL-DEVICE-CARD %c v2.1 ',
  'color: white; background: #03a9f4; font-weight: 700;',
  'color: #03a9f4; background: white; font-weight: 700;'
);