import { html } from 'lit-element';

/**
 * @param {{ html: typeof html, toggle: (id?: string) => void, setSelect: (id: string, opt: string) => void, adjustNumber: (id: string, delta: number) => void, pressButton: (id: string) => void, isEntityAvailable: (ent: object) => boolean }} ctx
 * @param {object} ent - entity state object
 * @param {string} domain
 */
export function renderControlAction(ctx, ent, domain) {
  const { html: h, toggle, setSelect, adjustNumber, pressButton, isEntityAvailable } = ctx;
  const isAvailable = isEntityAvailable(ent);

  switch (domain) {
    case 'switch':
    case 'input_boolean':
      return h`
        <ha-switch 
          .checked="${ent.state === 'on'}"
          .disabled="${!isAvailable}"
          @change="${() => isAvailable && toggle(ent.entity_id)}">
        </ha-switch>
      `;
    case 'select':
    case 'input_select':
      return h`
        <div class="select-grid">
          ${(ent.attributes.options || []).map(opt => h`
            <div class="select-opt ${ent.state === opt ? 'active' : ''} ${!isAvailable ? 'disabled' : ''}" 
                 @click="${() => isAvailable && setSelect(ent.entity_id, opt)}">
              ${opt}
            </div>
          `)}
        </div>
      `;
    case 'number':
    case 'input_number':
      return h`
        <div class="number-control">
          <button ?disabled="${!isAvailable}" @click="${() => isAvailable && adjustNumber(ent.entity_id, -1)}">
            <ha-icon icon="mdi:minus"></ha-icon>
          </button>
          <span>${ent.state}</span>
          <button ?disabled="${!isAvailable}" @click="${() => isAvailable && adjustNumber(ent.entity_id, 1)}">
            <ha-icon icon="mdi:plus"></ha-icon>
          </button>
        </div>
      `;
    case 'button':
      return h`
        <button class="action-btn" ?disabled="${!isAvailable}" @click="${() => isAvailable && pressButton(ent.entity_id)}">
          <ha-icon icon="mdi:gesture-tap"></ha-icon>
        </button>
      `;
    default:
      return h`<span class="state-text">${ent.state}</span>`;
  }
}

/**
 * Populate a DOM container with control UI (for imperative popup).
 * @param {HTMLElement} container
 * @param {object} ent
 * @param {string} domain
 * @param {{ toggle: (id?: string) => void, setSelect: (id: string, opt: string) => void, adjustNumber: (id: string, delta: number) => void, pressButton: (id: string) => void, isEntityAvailable: (ent: object) => boolean }} ctx
 */
export function populateControlAction(container, ent, domain, ctx) {
  const isAvailable = ctx.isEntityAvailable(ent);
  switch (domain) {
    case 'switch':
    case 'input_boolean': {
      const sw = document.createElement('ha-switch');
      sw.checked = ent.state === 'on';
      sw.disabled = !isAvailable;
      sw.addEventListener('change', () => isAvailable && ctx.toggle(ent.entity_id));
      container.appendChild(sw);
      break;
    }
    case 'select':
    case 'input_select': {
      const selectGrid = document.createElement('div');
      selectGrid.className = 'select-grid';
      (ent.attributes.options || []).forEach(opt => {
        const optDiv = document.createElement('div');
        optDiv.className = `select-opt ${ent.state === opt ? 'active' : ''} ${!isAvailable ? 'disabled' : ''}`;
        optDiv.textContent = opt;
        optDiv.addEventListener('click', () => isAvailable && ctx.setSelect(ent.entity_id, opt));
        selectGrid.appendChild(optDiv);
      });
      container.appendChild(selectGrid);
      break;
    }
    case 'number':
    case 'input_number': {
      const numControl = document.createElement('div');
      numControl.className = 'number-control';
      numControl.innerHTML = `
        <button ${!isAvailable ? 'disabled' : ''}><ha-icon icon="mdi:minus"></ha-icon></button>
        <span>${ent.state}</span>
        <button ${!isAvailable ? 'disabled' : ''}><ha-icon icon="mdi:plus"></ha-icon></button>
      `;
      numControl.querySelectorAll('button')[0].addEventListener('click', () => isAvailable && ctx.adjustNumber(ent.entity_id, -1));
      numControl.querySelectorAll('button')[1].addEventListener('click', () => isAvailable && ctx.adjustNumber(ent.entity_id, 1));
      container.appendChild(numControl);
      break;
    }
    case 'button': {
      const btn = document.createElement('button');
      btn.className = 'action-btn';
      btn.disabled = !isAvailable;
      btn.innerHTML = '<ha-icon icon="mdi:gesture-tap"></ha-icon>';
      btn.addEventListener('click', () => isAvailable && ctx.pressButton(ent.entity_id));
      container.appendChild(btn);
      break;
    }
    default:
      container.innerHTML = `<span class="state-text">${ent.state}</span>`;
  }
}
