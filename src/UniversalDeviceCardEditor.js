import { LitElement, html, css } from 'lit-element';
import { getTranslationBaseUrl, DEFAULT_TRANSLATIONS } from './constants/translations.js';

export class UniversalDeviceCardEditor extends LitElement {
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
    const langAlias = { 'zh-Hant': 'zh-TW' };
    const resolvedLang = langAlias[lang] || lang;
    this._translations = DEFAULT_TRANSLATIONS[resolvedLang] || DEFAULT_TRANSLATIONS[lang] || DEFAULT_TRANSLATIONS['en'];

    try {
      const baseUrl = getTranslationBaseUrl();
      let response = await fetch(`${baseUrl}${lang}.json`);
      if (!response.ok && lang !== resolvedLang) response = await fetch(`${baseUrl}${resolvedLang}.json`);
      if (response.ok) {
        const externalTranslations = await response.json();
        this._translations = { ...this._translations, ...externalTranslations };
      }
    } catch (_e) {}
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
