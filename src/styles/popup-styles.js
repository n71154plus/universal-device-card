import { css } from 'lit-element';

export const popupStyles = css`
      /* Popup Styles */
      .popup-overlay {
        position: fixed !important; 
        inset: 0 !important;
        top: 0 !important; 
        left: 0 !important; 
        right: 0 !important; 
        bottom: 0 !important;
        min-height: 100vh;
        min-height: 100dvh;
        padding:
          env(safe-area-inset-top, 0px)
          env(safe-area-inset-right, 0px)
          env(safe-area-inset-bottom, 0px)
          env(safe-area-inset-left, 0px);
        background: rgba(0,0,0,0.7); 
        backdrop-filter: blur(12px);
        -webkit-backdrop-filter: blur(12px);
        display: flex; 
        align-items: flex-end;
        justify-content: center; 
        z-index: 9999 !important;
        animation: fadeIn 0.3s;
        /* 重要：確保 popup 不受父元素的 transform/filter 影響 */
        transform: none !important;
        will-change: auto;
        overscroll-behavior: contain;
      }
      
      .popup-content {
        width: 100%; 
        max-height: 85vh; 
        max-height: 85dvh;
        background: var(--card-background-color);
        border-radius: 36px 36px 0 0; 
        padding: 20px;
        padding-bottom: calc(20px + env(safe-area-inset-bottom, 0px));
        overflow-y: auto; 
        -webkit-overflow-scrolling: touch;
        overscroll-behavior: contain;
        animation: slideUp 0.4s cubic-bezier(0.2, 1, 0.3, 1);
      }

      @supports (-webkit-touch-callout: none) {
        .popup-overlay {
          min-height: -webkit-fill-available;
        }

        .popup-content {
          max-height: calc(100dvh - env(safe-area-inset-top, 0px) - 8px);
          border-radius: 30px 30px 0 0;
        }
      }

      /* 寬屏幕支持 - 在桌面設備上顯示為居中對話框 */
      @media (min-width: 768px) {
        .popup-overlay {
          align-items: center;
          padding: 20px;
        }

        .popup-content {
          max-width: 600px;
          width: 90%;
          max-height: 80vh;
          max-height: 80dvh;
          border-radius: 24px;
          padding-bottom: 20px;
          box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
          animation: scaleIn 0.3s cubic-bezier(0.2, 1, 0.3, 1);
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
        background: rgba(var(--rgb-primary-text-color), 0.2); 
        border-radius: 3px; 
      }
      
      .close-btn {
        position: absolute;
        right: 0;
        cursor: pointer;
        color: var(--secondary-text-color);
        padding: 4px;
        transition: color 0.3s;
      }

      .close-btn:hover {
        color: var(--primary-text-color);
      }

      /* Sensor Chips */
      .chips-container { 
        display: flex; 
        flex-wrap: wrap; 
        gap: 10px; 
        margin-bottom: 24px; 
      }
      
      .chip { 
        display: flex; 
        align-items: center; 
        gap: 8px; 
        padding: 8px 16px; 
        background: rgba(var(--rgb-primary-text-color), 0.06); 
        border-radius: 100px; 
        font-size: 0.9rem; 
        font-weight: 600;
      }

      /* Control Cards */
      .controls-list { 
        display: flex; 
        flex-direction: column; 
        gap: 14px; 
      }
      
      .control-card {
        background: rgba(var(--rgb-primary-text-color), 0.04);
        padding: 18px; 
        border-radius: 24px;
        display: flex; 
        justify-content: space-between; 
        align-items: center;
      }
      
      .control-header { 
        display: flex; 
        align-items: center; 
        gap: 14px; 
        font-weight: 700; 
      }
      
      .no-controls {
        text-align: center;
        padding: 32px;
        opacity: 0.5;
      }

      /* Unavailable State Styles */
      .chip-unavailable {
        opacity: 0.5;
        background: rgba(var(--rgb-primary-text-color), 0.03) !important;
      }

      .control-card-unavailable {
        opacity: 0.6;
        pointer-events: none;
      }

      .control-card-unavailable .control-action {
        filter: grayscale(0.8);
      }

      .unavailable-badge {
        font-size: 0.7rem;
        padding: 2px 8px;
        border-radius: 10px;
        background: rgba(255, 87, 34, 0.15);
        color: #ff5722;
        margin-left: 8px;
        font-weight: 600;
      }

      .unavailable-text {
        opacity: 0.4;
      }

      /* Control Actions */
      .select-grid { 
        display: grid; 
        grid-template-columns: repeat(2, 1fr); 
        gap: 8px; 
        width: 55%; 
      }
      
      .select-opt { 
        padding: 10px 4px; 
        text-align: center; 
        background: rgba(var(--rgb-primary-text-color), 0.06); 
        border-radius: 12px; 
        font-size: 0.75rem; 
        cursor: pointer; 
        font-weight: 500; 
        transition: all 0.2s;
      }
      
      .select-opt:hover {
        background: rgba(var(--rgb-primary-text-color), 0.12);
      }
      
      .select-opt.active { 
        background: var(--accent-color); 
        color: white; 
      }

      .select-opt.disabled {
        opacity: 0.4;
        cursor: not-allowed;
        pointer-events: none;
      }

      .number-control {
        display: flex;
        align-items: center;
        gap: 12px;
      }

      .number-control button {
        width: 36px;
        height: 36px;
        border-radius: 50%;
        border: none;
        background: rgba(var(--rgb-primary-text-color), 0.1);
        cursor: pointer;
        transition: all 0.2s;
      }

      .number-control button:hover {
        background: var(--accent-color);
        color: white;
      }

      .number-control button:disabled {
        opacity: 0.4;
        cursor: not-allowed;
      }

      .action-btn {
        padding: 8px 16px;
        border-radius: 12px;
        border: none;
        background: var(--accent-color);
        color: white;
        cursor: pointer;
        transition: all 0.2s;
      }

      .action-btn:hover {
        transform: scale(1.05);
      }

      .action-btn:disabled {
        opacity: 0.4;
        cursor: not-allowed;
      }

      .state-text {
        font-weight: 600;
        opacity: 0.8;
      }

      button:disabled,
      ha-switch[disabled] {
        opacity: 0.4;
        cursor: not-allowed;
      }

      /* Enhanced Animations */
      @keyframes fadeIn { 
        from { opacity: 0; } 
        to { opacity: 1; }
      }
      
      @keyframes slideUp { 
        from { transform: translateY(100%); } 
        to { transform: translateY(0); }
      }

      @keyframes slideDown {
        from { 
          transform: translateY(-20px);
          opacity: 0;
        }
        to {
          transform: translateY(0);
          opacity: 1;
        }
      }

      @keyframes scaleIn {
        from {
          transform: scale(0.8);
          opacity: 0;
        }
        to {
          transform: scale(1);
          opacity: 1;
        }
      }

      @keyframes pulse {
        0%, 100% {
          transform: scale(1);
        }
        50% {
          transform: scale(1.05);
        }
      }

      @keyframes bounce {
        0%, 100% {
          transform: translateY(0);
        }
        50% {
          transform: translateY(-10px);
        }
      }

      /* Apply animations */
      .main-container {
        animation: scaleIn 0.4s cubic-bezier(0.2, 1, 0.3, 1);
      }

      .header {
        animation: slideDown 0.5s ease-out;
      }

      .temp-control,
      .main-control {
        animation: slideDown 0.6s ease-out;
      }

      .quick-modes,
      .cover-controls,
      .vacuum-controls,
      .media-controls {
        animation: slideDown 0.7s ease-out;
      }

      .mode-item {
        animation: scaleIn 0.4s ease-out backwards;
      }

      .mode-item:nth-child(1) { animation-delay: 0.05s; }
      .mode-item:nth-child(2) { animation-delay: 0.1s; }
      .mode-item:nth-child(3) { animation-delay: 0.15s; }
      .mode-item:nth-child(4) { animation-delay: 0.2s; }
      .mode-item:nth-child(5) { animation-delay: 0.25s; }
      .mode-item:nth-child(6) { animation-delay: 0.3s; }

      .chip {
        animation: scaleIn 0.3s ease-out backwards;
      }

      .chip:nth-child(1) { animation-delay: 0.05s; }
      .chip:nth-child(2) { animation-delay: 0.1s; }
      .chip:nth-child(3) { animation-delay: 0.15s; }
      .chip:nth-child(4) { animation-delay: 0.2s; }
      .chip:nth-child(5) { animation-delay: 0.25s; }
      .chip:nth-child(6) { animation-delay: 0.3s; }

      .control-card {
        animation: slideDown 0.3s ease-out backwards;
      }

      .control-card:nth-child(1) { animation-delay: 0.05s; }
      .control-card:nth-child(2) { animation-delay: 0.1s; }
      .control-card:nth-child(3) { animation-delay: 0.15s; }
      .control-card:nth-child(4) { animation-delay: 0.2s; }
      .control-card:nth-child(5) { animation-delay: 0.25s; }

      .power-btn.on {
        animation: pulse 2s infinite;
      }

      .adj-btn:active,
      .power-btn:active,
      .media-btn:active,
      .cover-btn:active,
      .vacuum-btn:active {
        animation: bounce 0.3s;
      }

      /* Hover effects with animations */
      .mode-item:hover:not(.active) {
        animation: pulse 0.6s;
      }

      .header-action:active {
        animation: bounce 0.3s;
      }
`;
