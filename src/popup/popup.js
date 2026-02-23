/**
 * Returns the CSS string for the popup portal (injected into portal's <style>).
 * @param {boolean} isInBubbleCard
 */
export function getPopupStyles(isInBubbleCard = false) {
  const zIndex = isInBubbleCard ? 10000 : 1000;
  return `
      .popup-overlay {
        position: fixed !important; 
        top: 0 !important; 
        left: 0 !important; 
        right: 0 !important; 
        bottom: 0 !important;
        background: rgba(0,0,0,0.7); 
        backdrop-filter: blur(12px);
        display: flex; 
        align-items: flex-end;
        justify-content: center; 
        z-index: ${zIndex} !important;
        animation: fadeIn 0.3s;
        transform: none !important;
        will-change: auto;
      }
      
      .popup-content {
        width: 100%; 
        max-height: 85vh; 
        background: var(--card-background-color, #fff);
        border-radius: 36px 36px 0 0; 
        padding: 20px;
        overflow-y: auto; 
        animation: slideUp 0.4s cubic-bezier(0.2, 1, 0.3, 1);
        color: var(--primary-text-color, #000);
        scrollbar-width: thin;
        scrollbar-color: rgba(var(--rgb-primary-text-color, 128, 128, 128), 0.3) transparent;
      }

      .popup-content::-webkit-scrollbar {
        width: 6px;
      }

      .popup-content::-webkit-scrollbar-track {
        background: transparent;
        border-radius: 10px;
      }

      .popup-content::-webkit-scrollbar-thumb {
        background: rgba(var(--rgb-primary-text-color, 128, 128, 128), 0.3);
        border-radius: 10px;
        transition: background 0.3s;
      }

      .popup-content::-webkit-scrollbar-thumb:hover {
        background: rgba(var(--rgb-primary-text-color, 128, 128, 128), 0.5);
      }

      .popup-content.hide-scrollbar {
        scrollbar-width: none;
        -ms-overflow-style: none;
      }

      .popup-content.hide-scrollbar::-webkit-scrollbar {
        display: none;
      }

      @media (min-width: 768px) {
        .popup-overlay {
          align-items: center;
          padding: 20px;
        }

        .popup-content {
          max-width: 600px;
          width: 90%;
          max-height: 80vh;
          border-radius: 24px;
          box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
          animation: scaleIn 0.3s cubic-bezier(0.2, 1, 0.3, 1);
        }

        .popup-content::-webkit-scrollbar {
          width: 8px;
        }

        @keyframes scaleIn {
          from {
            opacity: 0;
            transform: scale(0.9);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
      }
      
      .popup-header {
        display: flex;
        align-items: center;
        justify-content: center;
        position: relative;
        margin-bottom: 24px;
      }
      
      .popup-drag-handle { 
        width: 50px; 
        height: 5px; 
        background: rgba(128, 128, 128, 0.2); 
        border-radius: 3px; 
      }
      
      .close-btn {
        position: absolute;
        right: 0;
        cursor: pointer;
        color: var(--secondary-text-color, #666);
        padding: 4px;
        transition: color 0.3s;
        font-size: 24px;
        width: 32px;
        height: 32px;
        display: flex;
        align-items: center;
        justify-content: center;
      }

      .close-btn:hover {
        color: var(--primary-text-color, #000);
      }

      .chips-container { 
        display: flex; 
        flex-wrap: wrap; 
        gap: 10px; 
        margin-bottom: 20px;
      }
      
      .chip { 
        padding: 10px 16px; 
        border-radius: 20px; 
        background: rgba(128, 128, 128, 0.1); 
        display: flex; 
        align-items: center; 
        gap: 8px; 
        font-size: 0.9rem;
      }

      .chip-unavailable {
        opacity: 0.5;
      }

      .chip ha-icon {
        width: 20px;
        height: 20px;
      }

      .controls-list {
        display: flex;
        flex-direction: column;
        gap: 12px;
      }

      .control-card {
        background: rgba(128, 128, 128, 0.05);
        border-radius: 16px;
        padding: 16px;
      }

      .control-card-unavailable {
        opacity: 0.5;
      }

      .control-header {
        display: flex;
        align-items: center;
        gap: 12px;
        margin-bottom: 12px;
        font-weight: 600;
      }

      .control-header ha-icon {
        width: 24px;
        height: 24px;
      }

      .unavailable-badge {
        margin-left: auto;
        padding: 4px 12px;
        background: rgba(255, 152, 0, 0.2);
        color: #ff9800;
        border-radius: 12px;
        font-size: 0.75rem;
      }

      .control-action {
        display: flex;
        align-items: center;
        justify-content: flex-end;
      }

      .select-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(80px, 1fr));
        gap: 8px;
      }

      .select-opt {
        padding: 10px;
        border-radius: 12px;
        background: rgba(128, 128, 128, 0.1);
        text-align: center;
        cursor: pointer;
        transition: all 0.3s;
        font-size: 0.9rem;
      }

      .select-opt:hover:not(.disabled) {
        background: rgba(128, 128, 128, 0.2);
      }

      .select-opt.active {
        background: var(--accent-color, #03a9f4);
        color: white;
      }

      .select-opt.disabled {
        opacity: 0.5;
        cursor: not-allowed;
      }

      .number-control {
        display: flex;
        align-items: center;
        gap: 16px;
      }

      .number-control button {
        width: 40px;
        height: 40px;
        border-radius: 50%;
        border: none;
        background: rgba(128, 128, 128, 0.1);
        cursor: pointer;
        transition: all 0.3s;
        display: flex;
        align-items: center;
        justify-content: center;
      }

      .number-control button:hover:not(:disabled) {
        background: rgba(128, 128, 128, 0.2);
        transform: scale(1.1);
      }

      .number-control button:disabled {
        opacity: 0.5;
        cursor: not-allowed;
      }

      .number-control button ha-icon {
        width: 20px;
        height: 20px;
      }

      .number-control span {
        min-width: 50px;
        text-align: center;
        font-weight: 600;
      }

      .action-btn {
        width: 48px;
        height: 48px;
        border-radius: 50%;
        border: none;
        background: var(--accent-color, #03a9f4);
        color: white;
        cursor: pointer;
        transition: all 0.3s;
        display: flex;
        align-items: center;
        justify-content: center;
      }

      .action-btn:hover:not(:disabled) {
        transform: scale(1.1);
      }

      .action-btn:disabled {
        opacity: 0.5;
        cursor: not-allowed;
        background: rgba(128, 128, 128, 0.3);
      }

      .action-btn ha-icon {
        width: 24px;
        height: 24px;
      }

      .state-text {
        padding: 8px 16px;
        background: rgba(128, 128, 128, 0.1);
        border-radius: 12px;
        font-size: 0.9rem;
      }

      .unavailable-text {
        color: #ff9800;
      }

      .no-controls {
        text-align: center;
        padding: 40px 20px;
        color: var(--secondary-text-color, #666);
        font-size: 1rem;
      }

      @keyframes fadeIn {
        from { opacity: 0; }
        to { opacity: 1; }
      }

      @keyframes slideUp {
        from {
          transform: translateY(100%);
        }
        to {
          transform: translateY(0);
        }
      }

      ha-switch {
        --mdc-theme-secondary: var(--accent-color, #03a9f4);
      }

      ha-icon {
        color: var(--primary-text-color, #000);
      }
    `;
}
