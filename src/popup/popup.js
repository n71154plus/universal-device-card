/**
 * Popup portal CSS for the same-device panel.
 * Kept in sync with the shipped card redesign so `npm run build` matches releases.
 * @param {boolean} isInBubbleCard
 */
export function getPopupStyles(isInBubbleCard = false) {
  const zIndex = isInBubbleCard ? 10000 : 1000;
  return `
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
          max-width: 820px;
          width: min(92vw, 820px);
          max-height: 86vh;
          max-height: 86dvh;
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

      .popup-content {
        background: linear-gradient(165deg, rgba(32, 32, 38, 0.98) 0%, rgba(18, 18, 22, 0.99) 100%) !important;
        border: 1px solid rgba(255, 255, 255, 0.08);
        box-shadow: 0 -8px 40px rgba(0, 0, 0, 0.45);
        color-scheme: dark;
        --primary-text-color: rgba(255, 255, 255, 0.94);
        --secondary-text-color: rgba(255, 255, 255, 0.68);
        --disabled-text-color: rgba(255, 255, 255, 0.42);
        --rgb-primary-text-color: 255, 255, 255;
        --rgb-secondary-text-color: 255, 255, 255;
        --divider-color: rgba(255, 255, 255, 0.1);
        --mdc-theme-on-surface: rgba(255, 255, 255, 0.94);
        --mdc-theme-text-primary-on-background: rgba(255, 255, 255, 0.94);
        --mdc-theme-text-secondary-on-background: rgba(255, 255, 255, 0.68);
        --mdc-icon-color: rgba(255, 255, 255, 0.88);
        --primary-text-color-rgb: 255, 255, 255;
        color: rgba(255, 255, 255, 0.94) !important;
      }

      .popup-content .popup-title,
      .popup-content .sensor-value,
      .popup-content .control-row-label,
      .popup-content .state-text,
      .popup-content .number-control span,
      .popup-content .chip {
        color: rgba(255, 255, 255, 0.94) !important;
      }

      .popup-content .popup-section-title,
      .popup-content .sensor-label {
        color: rgba(255, 255, 255, 0.62) !important;
        opacity: 1 !important;
      }

      .popup-content .close-btn {
        color: rgba(255, 255, 255, 0.78) !important;
      }

      .popup-content .close-btn:hover {
        color: rgba(255, 255, 255, 0.96) !important;
      }

      .popup-content ha-icon {
        color: rgba(255, 255, 255, 0.88);
      }

      .popup-content .select-opt {
        color: rgba(255, 255, 255, 0.88) !important;
      }

      .popup-content .select-opt.active {
        color: #fff !important;
        background: var(--accent-color, #03a9f4) !important;
        border-color: transparent;
      }

      .popup-content .number-control button {
        color: rgba(255, 255, 255, 0.9) !important;
      }

      .popup-content .action-btn {
        color: #fff !important;
      }

      .popup-content .unavailable-badge {
        background: rgba(255, 87, 34, 0.22) !important;
        color: #ffab91 !important;
      }

      .popup-content .no-controls {
        color: rgba(255, 255, 255, 0.55) !important;
      }
      /* ===== Mobile Device Panel v2.6.4 ===== */
      .popup-status {
        display: none;
      }

      @media (max-width: 767px) {
        .popup-overlay {
          align-items: flex-end !important;
          padding: 0 !important;
          background: rgba(0, 0, 0, 0.62) !important;
        }

        .popup-content {
          display: flex !important;
          flex-direction: column !important;
          width: 100% !important;
          max-width: 100% !important;
          max-height: min(94dvh, 960px) !important;
          border-radius: 24px 24px 0 0 !important;
          padding: 4px 12px 0 !important;
          overflow: hidden !important;
          border: 1px solid rgba(255, 255, 255, 0.1) !important;
          border-bottom: none !important;
          box-shadow: 0 -16px 56px rgba(0, 0, 0, 0.6) !important;
          will-change: transform;
          transition: transform 0.18s ease-out;
        }

        .popup-content.is-dragging {
          transition: none !important;
        }

        .popup-header {
          position: relative !important;
          z-index: 6 !important;
          flex-shrink: 0 !important;
          margin-bottom: 0 !important;
          padding: 2px 2px 10px !important;
          background: transparent !important;
          border-bottom: none !important;
          backdrop-filter: none !important;
        }

        .popup-drag-handle {
          width: 40px !important;
          height: 4px !important;
          margin-bottom: 8px !important;
          background: rgba(255, 255, 255, 0.32) !important;
          position: relative;
        }

        .popup-drag-handle::before {
          content: '';
          position: absolute;
          inset: -14px -48px;
        }

        .popup-title {
          font-size: 1.14rem !important;
          font-weight: 750 !important;
          line-height: 1.2 !important;
        }

        .popup-subtitle {
          display: block !important;
          text-align: left !important;
          font-size: 0.66rem !important;
          margin-top: 2px !important;
          color: rgba(255, 255, 255, 0.4) !important;
        }

        .popup-content .close-btn {
          width: 38px !important;
          height: 38px !important;
          background: rgba(255, 255, 255, 0.08) !important;
        }

        .popup-status {
          display: flex;
          align-items: center;
          gap: 10px;
          margin: 0 2px 10px;
          padding: 10px 12px;
          border-radius: 14px;
          background: rgba(255, 255, 255, 0.06);
          border: 1px solid rgba(255, 255, 255, 0.08);
          flex-shrink: 0;
        }

        .popup-status-dot {
          width: 10px;
          height: 10px;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.28);
          flex-shrink: 0;
          box-shadow: 0 0 0 3px rgba(255, 255, 255, 0.06);
        }

        .popup-status.is-on .popup-status-dot {
          background: #4caf50;
          box-shadow: 0 0 0 3px rgba(76, 175, 80, 0.22);
        }

        .popup-status.is-off .popup-status-dot {
          background: rgba(255, 255, 255, 0.28);
        }

        .popup-status.is-unavailable .popup-status-dot {
          background: #ff7043;
          box-shadow: 0 0 0 3px rgba(255, 112, 67, 0.2);
        }

        .popup-status-meta {
          flex: 1;
          min-width: 0;
          display: flex;
          flex-direction: column;
          gap: 1px;
        }

        .popup-status-label {
          font-size: 0.62rem;
          font-weight: 650;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: rgba(255, 255, 255, 0.42);
        }

        .popup-status-value {
          font-size: 0.95rem;
          font-weight: 700;
          color: rgba(255, 255, 255, 0.94);
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .popup-status-action {
          flex-shrink: 0;
        }

        .popup-body {
          flex: 1 1 auto !important;
          min-height: 0 !important;
          overflow-y: auto !important;
          -webkit-overflow-scrolling: touch;
          overscroll-behavior: contain;
          gap: 12px !important;
          padding: 2px 2px calc(18px + env(safe-area-inset-bottom, 0px)) !important;
          mask-image: linear-gradient(180deg, #000 0%, #000 calc(100% - 18px), transparent 100%);
          -webkit-mask-image: linear-gradient(180deg, #000 0%, #000 calc(100% - 18px), transparent 100%);
        }

        .popup-section-title {
          font-size: 0.6rem !important;
          letter-spacing: 0.14em !important;
          margin-bottom: 7px !important;
          opacity: 1 !important;
          color: rgba(255, 255, 255, 0.48) !important;
        }

        .sensor-grid {
          grid-template-columns: repeat(2, minmax(0, 1fr)) !important;
          gap: 7px !important;
        }

        .sensor-card {
          flex-direction: column !important;
          align-items: stretch !important;
          gap: 6px !important;
          min-height: 0 !important;
          padding: 11px 11px 10px !important;
          border-radius: 15px !important;
          background: rgba(255, 255, 255, 0.055) !important;
          border: 1px solid rgba(255, 255, 255, 0.07) !important;
        }

        .sensor-card.is-on {
          background: rgba(76, 175, 80, 0.12) !important;
          border-color: rgba(76, 175, 80, 0.28) !important;
        }

        .sensor-card.is-on .sensor-value {
          color: #81c784 !important;
        }

        .sensor-card.is-off .sensor-value {
          color: rgba(255, 255, 255, 0.55) !important;
        }

        .sensor-card:active {
          background: rgba(255, 255, 255, 0.1) !important;
        }

        .sensor-card ha-icon {
          width: 17px !important;
          height: 17px !important;
          margin-top: 0 !important;
          opacity: 0.65 !important;
        }

        .sensor-card-body {
          display: flex !important;
          flex-direction: column !important;
          gap: 2px !important;
        }

        .sensor-value {
          order: -1 !important;
          font-size: 1.18rem !important;
          font-weight: 750 !important;
          letter-spacing: -0.02em !important;
          line-height: 1.12 !important;
        }

        .sensor-label {
          font-size: 0.66rem !important;
          font-weight: 600 !important;
          color: rgba(255, 255, 255, 0.5) !important;
          opacity: 1 !important;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        .sensor-grid .sensor-card:last-child:nth-child(odd) {
          grid-column: 1 / -1;
        }

        .controls-group {
          border-radius: 16px !important;
          background: rgba(255, 255, 255, 0.04) !important;
          border: 1px solid rgba(255, 255, 255, 0.07) !important;
        }

        .control-row {
          min-height: 52px;
          padding: 10px 11px !important;
          gap: 9px !important;
        }

        .control-row:active:not(.control-row-unavailable) {
          background: rgba(255, 255, 255, 0.07) !important;
        }

        .control-row-icon {
          width: 32px !important;
          height: 32px !important;
          border-radius: 10px !important;
          background: rgba(255, 255, 255, 0.08) !important;
        }

        .control-row-label {
          font-size: 0.86rem !important;
          line-height: 1.25 !important;
        }

        .control-row:has(.select-grid),
        .control-row:has(.number-control) {
          flex-wrap: wrap;
        }

        .control-row:has(.select-grid) .control-row-action,
        .control-row:has(.number-control) .control-row-action {
          flex: 1 1 100%;
          margin-top: 5px;
          justify-content: stretch !important;
        }

        .control-row:has(.select-grid) .select-grid {
          max-width: 100% !important;
          width: 100% !important;
          display: grid !important;
          grid-template-columns: repeat(auto-fit, minmax(70px, 1fr)) !important;
          gap: 5px !important;
          justify-content: stretch !important;
        }

        .select-opt {
          min-height: 40px !important;
          display: flex !important;
          align-items: center !important;
          justify-content: center !important;
          padding: 8px 5px !important;
          font-size: 0.72rem !important;
          font-weight: 650 !important;
          border-radius: 11px !important;
          -webkit-tap-highlight-color: transparent;
        }

        .select-opt:active {
          transform: scale(0.97);
        }

        .control-row:has(.number-control) .number-control {
          width: 100%;
          justify-content: space-between;
          padding: 5px 6px !important;
          border-radius: 12px !important;
        }

        .number-control button {
          width: 42px !important;
          height: 42px !important;
          border-radius: 12px !important;
          font-size: 1.15rem !important;
        }

        .number-control span {
          min-width: 52px !important;
          font-size: 1.08rem !important;
        }

        .action-btn {
          width: 44px !important;
          height: 44px !important;
          border-radius: 12px !important;
        }

        ha-switch {
          transform: scale(1.08);
          transform-origin: center right;
        }

        .no-controls {
          padding: 32px 14px !important;
        }
      }

      @media (max-width: 380px) {
        .sensor-grid {
          grid-template-columns: 1fr !important;
        }
        .sensor-grid .sensor-card:last-child:nth-child(odd) {
          grid-column: auto;
        }
        .popup-title {
          font-size: 1.02rem !important;
        }
      }

      @media (min-width: 381px) and (max-width: 767px) {
        .popup-content[data-sensors='1'] .sensor-grid {
          grid-template-columns: 1fr !important;
        }
      }

      @media (max-width: 900px) and (max-height: 480px) and (orientation: landscape) {
        .popup-content {
          max-height: 96dvh !important;
          border-radius: 16px 16px 0 0 !important;
        }
        .popup-status {
          display: none !important;
        }
        .sensor-grid {
          grid-template-columns: repeat(3, minmax(0, 1fr)) !important;
        }
        .popup-body {
          gap: 8px !important;
        }
      }

/* ===== Responsive Device Panel v2.6 ===== */
      .popup-title-wrap {
        min-width: 0;
        display: flex;
        flex-direction: column;
        gap: 2px;
      }

      .popup-subtitle {
        display: none;
        font-size: 0.72rem;
        font-weight: 500;
        color: rgba(255, 255, 255, 0.45) !important;
        letter-spacing: 0.01em;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }

      .popup-body {
        display: flex;
        flex-direction: column;
        gap: 18px;
      }

      .popup-section-sensors,
      .popup-section-controls {
        min-width: 0;
      }

      /* —— Mobile (default): bottom sheet —— */
      .popup-content {
        padding: 10px 16px calc(18px + env(safe-area-inset-bottom, 0px)) !important;
        max-height: 88vh !important;
        max-height: 88dvh !important;
      }

      .popup-header {
        display: grid !important;
        grid-template-columns: 1fr 40px !important;
        grid-template-rows: auto auto !important;
        align-items: center !important;
        column-gap: 8px !important;
        margin-bottom: 14px !important;
        padding-bottom: 0 !important;
        border-bottom: none !important;
      }

      .popup-drag-handle {
        grid-column: 1 / -1 !important;
        grid-row: 1 !important;
        justify-self: center !important;
        margin-bottom: 12px !important;
        display: block !important;
      }

      .popup-title-wrap {
        grid-column: 1 !important;
        grid-row: 2 !important;
      }

      .popup-title {
        text-align: left !important;
        font-size: 1.08rem !important;
      }

      .popup-content .close-btn {
        grid-column: 2 !important;
        grid-row: 2 !important;
        justify-self: end !important;
        align-self: center !important;
      }

      .sensor-grid {
        grid-template-columns: repeat(2, minmax(0, 1fr)) !important;
        gap: 8px !important;
      }

      .sensor-card {
        min-height: 64px !important;
        padding: 12px !important;
        border-radius: 14px !important;
      }

      .sensor-value {
        font-size: 0.98rem !important;
      }

      .control-row {
        min-height: 52px;
        padding: 12px 12px !important;
        gap: 10px !important;
      }

      .control-row-icon {
        width: 36px !important;
        height: 36px !important;
        border-radius: 11px !important;
      }

      /* Mobile: wide option grids wrap under label for touch */
      .control-row:has(.select-grid) {
        flex-wrap: wrap;
      }

      .control-row:has(.select-grid) .control-row-action {
        flex: 1 1 100%;
        margin-top: 4px;
        justify-content: flex-start !important;
      }

      .control-row:has(.select-grid) .select-grid {
        max-width: 100% !important;
        width: 100% !important;
        justify-content: flex-start !important;
      }

      @media (max-width: 380px) {
        .sensor-grid {
          grid-template-columns: 1fr !important;
        }
      }

      /* —— Desktop / tablet: centered dual-pane dialog —— */
      @media (min-width: 768px) {
        .popup-overlay {
          align-items: center !important;
          justify-content: center !important;
          padding: 28px !important;
        }

        .popup-content {
          width: min(92vw, 820px) !important;
          max-width: 820px !important;
          max-height: 86vh !important;
          max-height: 86dvh !important;
          border-radius: 24px !important;
          padding: 28px 32px 30px !important;
          box-shadow: 0 28px 90px rgba(0, 0, 0, 0.55) !important;
        }

        .popup-drag-handle {
          display: none !important;
        }

        .popup-header {
          grid-template-columns: 1fr 44px !important;
          grid-template-rows: auto !important;
          margin-bottom: 22px !important;
          padding-bottom: 16px !important;
          border-bottom: 1px solid rgba(255, 255, 255, 0.08) !important;
        }

        .popup-title-wrap {
          grid-column: 1 !important;
          grid-row: 1 !important;
        }

        .popup-title {
          font-size: 1.28rem !important;
          letter-spacing: -0.01em !important;
        }

        .popup-subtitle {
          display: block !important;
          text-align: left !important;
          margin-top: 4px;
        }

        .popup-content .close-btn {
          grid-column: 2 !important;
          grid-row: 1 !important;
          width: 40px !important;
          height: 40px !important;
        }

        .popup-content.has-both .popup-body {
          display: grid !important;
          grid-template-columns: minmax(240px, 0.92fr) minmax(300px, 1.18fr);
          gap: 28px;
          align-items: start;
        }

        .popup-section-title {
          position: sticky;
          top: 0;
          z-index: 1;
          background: linear-gradient(180deg, rgba(24, 24, 28, 0.98) 60%, rgba(24, 24, 28, 0));
          padding-top: 2px;
          padding-bottom: 8px;
          margin-bottom: 8px !important;
        }

        .popup-section-controls .controls-group {
          max-height: calc(86dvh - 170px);
          overflow-y: auto;
          overscroll-behavior: contain;
        }

        .sensor-grid {
          gap: 12px !important;
        }

        .sensor-card {
          min-height: 78px !important;
          padding: 16px !important;
          border-radius: 16px !important;
        }

        .sensor-value {
          font-size: 1.12rem !important;
        }

        .control-row {
          min-height: 56px;
          padding: 14px 16px !important;
        }

        .control-row:has(.select-grid) {
          flex-wrap: nowrap;
        }

        .control-row:has(.select-grid) .control-row-action {
          flex: 0 0 auto;
          margin-top: 0;
          width: auto;
          justify-content: flex-end !important;
        }

        .control-row:has(.select-grid) .select-grid {
          max-width: 220px !important;
          width: auto !important;
          justify-content: flex-end !important;
        }

        .control-row:hover:not(.control-row-unavailable) {
          background: rgba(255, 255, 255, 0.055) !important;
        }

        .popup-content.has-sensors-only .sensor-grid {
          grid-template-columns: repeat(3, minmax(0, 1fr)) !important;
        }

        .popup-content.has-controls-only .controls-group {
          max-height: calc(86dvh - 140px);
        }
      }

      @media (min-width: 1100px) {
        .popup-content {
          width: min(90vw, 960px) !important;
          max-width: 960px !important;
          padding: 32px 36px 34px !important;
        }

        .popup-content.has-both .popup-body {
          grid-template-columns: minmax(280px, 1fr) minmax(340px, 1.25fr);
          gap: 36px;
        }

        .popup-content.has-both .sensor-grid {
          grid-template-columns: repeat(2, minmax(0, 1fr)) !important;
        }

        .popup-content.has-sensors-only .sensor-grid {
          grid-template-columns: repeat(4, minmax(0, 1fr)) !important;
        }
      }


      .popup-header {
        display: grid;
        grid-template-columns: 40px 1fr 40px;
        align-items: center;
        margin-bottom: 20px;
        padding-bottom: 4px;
      }

      .popup-title {
        font-size: 1.05rem;
        font-weight: 700;
        text-align: center;
        letter-spacing: 0.01em;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        padding: 0 4px;
      }

      .popup-drag-handle {
        grid-column: 2;
        justify-self: center;
        width: 40px;
        height: 4px;
        background: rgba(255, 255, 255, 0.18);
        border-radius: 4px;
        margin-bottom: 10px;
      }

      .close-btn {
        grid-column: 3;
        grid-row: 1;
        width: 36px;
        height: 36px;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.06);
        border: 1px solid rgba(255, 255, 255, 0.08);
        transition: background 0.2s, transform 0.15s;
      }

      .close-btn:hover {
        background: rgba(255, 255, 255, 0.12);
        transform: scale(1.05);
      }

      .popup-section {
        margin-bottom: 20px;
      }

      .popup-section-title {
        font-size: 0.68rem;
        font-weight: 700;
        letter-spacing: 0.12em;
        text-transform: uppercase;
        opacity: 0.45;
        margin-bottom: 10px;
        padding-left: 2px;
      }

      .sensor-grid {
        display: grid;
        grid-template-columns: repeat(2, minmax(0, 1fr));
        gap: 10px;
      }

      .sensor-card {
        display: flex;
        align-items: flex-start;
        gap: 10px;
        padding: 14px;
        border-radius: 16px;
        background: rgba(255, 255, 255, 0.05);
        border: 1px solid rgba(255, 255, 255, 0.07);
        min-height: 72px;
      }

      .sensor-card ha-icon {
        width: 22px;
        height: 22px;
        opacity: 0.75;
        flex-shrink: 0;
        margin-top: 2px;
      }

      .sensor-card-body {
        display: flex;
        flex-direction: column;
        gap: 4px;
        min-width: 0;
      }

      .sensor-label {
        font-size: 0.72rem;
        font-weight: 600;
        opacity: 0.55;
        line-height: 1.2;
        word-break: break-word;
      }

      .sensor-value {
        font-size: 1.02rem;
        font-weight: 700;
        line-height: 1.2;
        letter-spacing: -0.01em;
      }

      .sensor-card-unavailable {
        opacity: 0.45;
      }

      .controls-group {
        border-radius: 18px;
        overflow: hidden;
        background: rgba(255, 255, 255, 0.04);
        border: 1px solid rgba(255, 255, 255, 0.07);
      }

      .control-row {
        display: flex;
        align-items: center;
        gap: 12px;
        padding: 13px 14px;
        border-bottom: 1px solid rgba(255, 255, 255, 0.06);
        transition: background 0.15s;
      }

      .control-row:last-child {
        border-bottom: none;
      }

      .control-row:hover:not(.control-row-unavailable) {
        background: rgba(255, 255, 255, 0.03);
      }

      .control-row-icon {
        width: 38px;
        height: 38px;
        border-radius: 12px;
        background: rgba(255, 255, 255, 0.07);
        border: 1px solid rgba(255, 255, 255, 0.06);
        display: flex;
        align-items: center;
        justify-content: center;
        flex-shrink: 0;
      }

      .control-row-icon ha-icon {
        width: 20px;
        height: 20px;
        opacity: 0.85;
      }

      .control-row-label {
        flex: 1;
        font-weight: 600;
        font-size: 0.9rem;
        line-height: 1.25;
        min-width: 0;
        word-break: break-word;
      }

      .control-row-action {
        flex-shrink: 0;
        display: flex;
        align-items: center;
        justify-content: flex-end;
      }

      .control-row-unavailable {
        opacity: 0.5;
        pointer-events: none;
      }

      .select-grid {
        display: flex !important;
        flex-wrap: wrap;
        gap: 6px !important;
        width: auto !important;
        max-width: 160px;
        justify-content: flex-end;
      }

      .select-opt {
        padding: 6px 10px !important;
        border-radius: 10px !important;
        font-size: 0.7rem !important;
        border: 1px solid rgba(255, 255, 255, 0.08);
        background: rgba(255, 255, 255, 0.06) !important;
      }

      .select-opt.active {
        box-shadow: 0 2px 8px rgba(3, 169, 244, 0.35);
      }

      .number-control {
        gap: 8px !important;
        background: rgba(255, 255, 255, 0.06);
        border-radius: 12px;
        padding: 4px 6px;
        border: 1px solid rgba(255, 255, 255, 0.08);
      }

      .number-control button {
        width: 32px !important;
        height: 32px !important;
        background: rgba(255, 255, 255, 0.08) !important;
      }

      .number-control span {
        min-width: 36px !important;
        font-size: 0.95rem;
        font-weight: 700;
      }

      .action-btn {
        width: 38px !important;
        height: 38px !important;
        border-radius: 12px !important;
        padding: 0 !important;
      }

      button:disabled,
      ha-switch[disabled] {
        opacity: 0.4;
        cursor: not-allowed;
      }

      @keyframes fadeIn {
        from { opacity: 0; }
        to { opacity: 1; }
      }
      @keyframes slideUp {
        from { transform: translateY(100%); }
        to { transform: translateY(0); }
      }
      ha-switch {
        --mdc-theme-secondary: var(--accent-color, #03a9f4);
      }
      ha-icon {
        color: var(--primary-text-color, #fff);
      }

      .popup-overlay { z-index: ${zIndex} !important; }
`;
}
