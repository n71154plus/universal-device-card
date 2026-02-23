import { css } from 'lit-element';

export const cardStyles = css`
      :host { 
        --accent-color: #03a9f4;
        --text-primary: var(--primary-text-color);
        --text-secondary: var(--secondary-text-color);
      }
      
      .main-container { 
        padding: 20px; 
        border-radius: 28px; 
        background: var(--ha-card-background);
        transition: background-color 0.8s ease;
        position: relative;
        overflow-x: hidden; /* 只隱藏水平溢出 */
        overflow-y: visible; /* 允許垂直溢出 */
      }

      /* Header */
      .header { 
        display: flex; 
        justify-content: space-between; 
        align-items: center;
        margin-bottom: 16px;
        gap: 12px;
      }

      .header-icon {
        flex-shrink: 0;
        width: 40px;
        height: 40px;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        border-radius: 50%;
        transition: background 0.2s, transform 0.2s;
      }

      .header-icon:hover {
        background: rgba(var(--rgb-primary-text-color), 0.08);
      }

      .header-icon:active {
        transform: scale(0.95);
      }

      .header-icon.icon-longpress-active,
      .bar-icon.icon-longpress-active {
        transform: scale(0.92);
        animation: icon-longpress-pulse 0.2s ease-out;
      }

      @keyframes icon-longpress-pulse {
        0% { opacity: 1; }
        50% { opacity: 0.85; }
        100% { opacity: 1; }
      }

      .header-icon ha-icon {
        width: 28px;
        height: 28px;
      }

      .header-icon-mini {
        width: 32px;
        height: 32px;
      }

      .header-icon-mini ha-icon {
        width: 22px;
        height: 22px;
      }

      .header > .current-temp,
      .header > .device-name,
      .header .title-scroll-wrap {
        flex: 1;
        min-width: 0;
      }
      
      .device-name {
        font-size: 1.25rem;
        font-weight: 700;
        color: var(--text-primary);
        min-width: 0;
      }

      .device-value {
        font-size: 0.8rem;
        font-weight: 500;
        opacity: 0.78;
        display: block;
        margin-top: 2px;
      }

      /* 標題過長時水平捲動，不裁切 */
      .title-scroll-wrap {
        display: block;
        overflow-x: auto;
        overflow-y: hidden;
        max-width: 100%;
        min-width: 0;
        scrollbar-width: none;
        -ms-overflow-style: none;
        scroll-behavior: smooth;
      }

      .title-scroll-wrap::-webkit-scrollbar {
        display: none;
      }

      .title-text {
        white-space: nowrap;
        display: inline-block;
      }

      /* ===== 統一佈局系統 ===== */
      
      /* 第一行：Header with Slider */
      .unified-header {
        position: relative;
        padding: 16px;
        border-radius: 16px;
        margin-bottom: 16px;
        overflow: hidden;
        min-height: 60px;
      }

      .unified-header-mini {
        padding: 12px;
        min-height: 50px;
        margin-bottom: 12px;
      }

      /* 背景 Slider */
      .slider-background {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        z-index: 0;
        cursor: pointer;
        transition: all 0.3s ease;
        border-radius: 16px;
      }

      .slider-background:hover {
        opacity: 0.9;
      }

      /* Light - 黃色漸變 */
      .slider-light {
        background: linear-gradient(
          to right,
          rgba(255, 165, 0, 0.25) 0%,
          rgba(255, 215, 0, 0.25) var(--slider-value),
          rgba(var(--rgb-primary-text-color), 0.05) var(--slider-value)
        );
      }

      /* Cover - 藍色漸變 */
      .slider-cover {
        background: linear-gradient(
          to right,
          rgba(25, 118, 210, 0.25) 0%,
          rgba(100, 181, 246, 0.25) var(--slider-value),
          rgba(var(--rgb-primary-text-color), 0.05) var(--slider-value)
        );
      }

      /* Media Player - 綠色漸變 */
      .slider-media {
        background: linear-gradient(
          to right,
          rgba(56, 142, 60, 0.25) 0%,
          rgba(102, 187, 106, 0.25) var(--slider-value),
          rgba(var(--rgb-primary-text-color), 0.05) var(--slider-value)
        );
      }

      /* Fan - 青色漸變 */
      .slider-fan {
        background: linear-gradient(
          to right,
          rgba(0, 172, 193, 0.25) 0%,
          rgba(77, 208, 225, 0.25) var(--slider-value),
          rgba(var(--rgb-primary-text-color), 0.05) var(--slider-value)
        );
      }

      /* Header 內容層 */
      .header-content {
        position: relative;
        z-index: 1;
        display: flex;
        justify-content: space-between;
        align-items: center;
        pointer-events: none;
      }

      .header-content > * {
        pointer-events: auto;
      }

      .device-info {
        flex: 1;
        display: flex;
        justify-content: space-between;
        align-items: baseline;
        gap: 12px;
      }

      .device-info .device-name {
        font-size: 1.2rem;
        font-weight: 600;
        color: var(--text-primary);
      }

      .device-value {
        font-size: 1.5rem;
        font-weight: 700;
        color: var(--text-primary);
      }

      .device-state {
        font-size: 1rem;
        font-weight: 500;
        opacity: 0.7;
      }

      /* 第二行：Primary Control */
      .unified-control-primary {
        display: flex;
        justify-content: center;
        align-items: center;
        margin: 20px 0;
      }

      .unified-control-mini {
        margin: 12px 0;
      }

      .power-btn {
        width: 100px;
        height: 100px;
        border-radius: 50%;
        border: none;
        background: rgba(var(--rgb-primary-text-color), 0.1);
        cursor: pointer;
        transition: all 0.3s;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        gap: 4px;
      }

      .power-btn ha-icon {
        font-size: 2.5rem;
      }

      .power-btn .btn-label {
        font-size: 0.85rem;
        font-weight: 500;
        opacity: 0.8;
      }

      .power-btn.on {
        background: var(--accent-color);
        color: white;
        box-shadow: 0 8px 24px rgba(3, 169, 244, 0.4);
      }

      .power-btn-mini {
        width: 70px;
        height: 70px;
      }

      .power-btn-mini ha-icon {
        font-size: 2rem;
      }

      .power-btn-mini .btn-label {
        font-size: 0.75rem;
      }

      /* 第三行：Secondary Control */
      .unified-control-secondary {
        display: flex;
        justify-content: space-between;
        align-items: center;
        gap: 16px;
        margin: 16px 0;
      }

      .control-label {
        flex: 1;
        text-align: center;
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 8px;
        font-size: 0.9rem;
        font-weight: 500;
        opacity: 0.8;
      }

      .control-label ha-icon {
        width: 20px;
        height: 20px;
      }

      /* Bar Mode Slider */
      .bar-slider-container {
        position: relative;
        height: 20px;
        margin-top: 4px;
        border-radius: 10px;
        overflow: hidden;
        cursor: pointer;
      }

      .bar-slider-bg {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        transition: all 0.3s ease;
      }

      .bar-slider-text {
        position: relative;
        z-index: 1;
        font-size: 0.75rem;
        font-weight: 600;
        text-align: center;
        line-height: 20px;
      }

      .current-temp { 
        font-size: 3.5rem; 
        font-weight: 800; 
        letter-spacing: -2px; 
      }
      
      .unit { 
        font-size: 1.2rem; 
        margin-left: 4px; 
        opacity: 0.7; 
      }
      
      .header-action { 
        background: rgba(var(--rgb-primary-text-color), 0.05); 
        padding: 10px; 
        border-radius: 14px; 
        cursor: pointer;
        transition: background 0.3s;
      }
      
      .header-action:hover {
        background: rgba(var(--rgb-primary-text-color), 0.1);
      }

      /* Temperature Control (Climate & Water Heater) */
      .temp-control { 
        display: flex; 
        justify-content: space-between; 
        align-items: center; 
        margin: 24px 0; 
      }
      
      .adj-btn { 
        width: 64px; 
        height: 64px; 
        border-radius: 22px; 
        border: none; 
        background: var(--accent-color); 
        color: white; 
        cursor: pointer; 
        box-shadow: 0 4px 10px rgba(0,0,0,0.1);
        transition: transform 0.2s, box-shadow 0.2s;
      }
      
      .adj-btn:hover {
        transform: scale(1.05);
        box-shadow: 0 6px 16px rgba(0,0,0,0.15);
      }
      
      .adj-btn:active {
        transform: scale(0.95);
      }
      
      .target-display { text-align: center; }
      .target-display .value { font-size: 2.2rem; font-weight: 800; display: block; }
      .target-display .label { font-size: 0.8rem; opacity: 0.6; }

      /* Value Control (Light brightness, Cover position, Media volume, etc.) */
      .value-control {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin: 20px 0;
        gap: 16px;
      }

      .value-control-mini {
        margin: 12px 0;
        gap: 12px;
      }

      .value-display {
        flex: 1;
        text-align: center;
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 8px;
      }

      .value-display ha-icon {
        width: 32px;
        height: 32px;
        opacity: 0.7;
      }

      .value-display .value {
        font-size: 1.8rem;
        font-weight: 700;
      }

      .value-display .value-mini {
        font-size: 1.4rem;
      }

      /* Quick Modes (Climate) */
      .quick-modes { 
        display: grid; 
        grid-template-columns: repeat(3, 1fr); 
        gap: 10px; 
      }
      
      .mode-item { 
        padding: 12px; 
        border-radius: 20px; 
        background: rgba(var(--rgb-primary-text-color), 0.05); 
        text-align: center; 
        cursor: pointer; 
        transition: all 0.3s;
      }
      
      .mode-item:hover {
        background: rgba(var(--rgb-primary-text-color), 0.1);
      }
      
      .mode-item.active { 
        background: var(--accent-color); 
        color: white; 
        box-shadow: 0 4px 12px rgba(3, 169, 244, 0.3);
      }

      .mode-label {
        font-size: 0.7rem;
        margin-top: 4px;
        display: block;
        opacity: 0.9;
      }

      /* Fan Mode Section (Standard/Mini) */
      .fan-mode-section {
        margin-top: 16px;
        padding: 12px;
        background: rgba(var(--rgb-primary-text-color), 0.03);
        border-radius: 16px;
      }

      .fan-mode-mini {
        margin-top: 12px;
        padding: 8px;
      }

      .fan-mode-label {
        display: flex;
        align-items: center;
        gap: 8px;
        margin-bottom: 8px;
        font-size: 0.85rem;
        font-weight: 600;
        opacity: 0.8;
        cursor: pointer;
        transition: opacity 0.3s;
        line-height: 1;
      }

      .fan-mode-label:hover {
        opacity: 1;
      }

      .fan-mode-label ha-icon {
        width: 18px;
        height: 18px;
        flex-shrink: 0;
        display: inline-flex;
        align-items: center;
        justify-content: center;
      }

      .fan-mode-label > span {
        display: inline-flex;
        align-items: center;
        line-height: 1;
      }

      .expand-icon {
        margin-left: auto;
        transition: transform 0.3s;
      }

      .expand-icon.expanded {
        transform: rotate(180deg);
      }

      .fan-mode-options {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(60px, 1fr));
        gap: 8px;
        max-height: 0;
        overflow: hidden;
        opacity: 0;
        transition: max-height 0.3s ease, opacity 0.3s ease, margin-top 0.3s ease;
      }

      .fan-mode-options.expanded {
        max-height: 200px;
        opacity: 1;
        margin-top: 8px;
      }

      .fan-mode-options.collapsed {
        margin-top: 0;
      }

      .fan-mode-options-mini {
        grid-template-columns: repeat(auto-fit, minmax(50px, 1fr));
        gap: 6px;
      }

      .fan-mode-chip {
        padding: 10px 8px;
        border-radius: 12px;
        background: rgba(var(--rgb-primary-text-color), 0.05);
        text-align: center;
        cursor: pointer;
        transition: all 0.3s;
        font-size: 0.75rem;
        font-weight: 500;
      }

      .fan-mode-chip-mini {
        padding: 8px 6px;
        font-size: 0.7rem;
      }

      .fan-mode-chip:hover {
        background: rgba(var(--rgb-primary-text-color), 0.1);
        transform: translateY(-2px);
      }

      .fan-mode-chip.active {
        background: var(--accent-color);
        color: white;
        box-shadow: 0 2px 8px rgba(3, 169, 244, 0.3);
      }

      /* Bar Mode - HVAC Mode Chips */
      .bar-modes {
        display: flex;
        gap: 8px;
        padding: 12px 16px;
        margin: 0 -20px; /* 負邊距延伸到父容器邊緣 */
        padding-left: 20px;
        padding-right: 20px;
        overflow-x: auto;
        scrollbar-width: none;
        -webkit-overflow-scrolling: touch; /* iOS 平滑滾動 */
      }

      .bar-modes::-webkit-scrollbar {
        display: none;
      }

      .bar-mode-chip {
        min-width: 44px;
        height: 44px;
        padding: 0 12px;
        border-radius: 12px;
        background: rgba(var(--rgb-primary-text-color), 0.05);
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        transition: all 0.3s;
        flex-shrink: 0;
        gap: 6px;
      }

      .bar-mode-chip:hover {
        background: rgba(var(--rgb-primary-text-color), 0.1);
        transform: scale(1.05);
      }

      .bar-mode-chip.active {
        background: var(--accent-color);
        color: white;
        box-shadow: 0 2px 8px rgba(3, 169, 244, 0.3);
      }

      .bar-mode-chip ha-icon {
        width: 22px;
        height: 22px;
        flex-shrink: 0;
      }
      }

      /* Bar Mode - Fan Mode */
      .bar-fan-modes {
        background: rgba(var(--rgb-primary-text-color), 0.02);
        border-top: 1px solid rgba(var(--rgb-primary-text-color), 0.05);
        transition: max-height 0.3s ease, padding 0.3s ease;
        overflow: hidden;
      }

      .bar-fan-modes.expanded {
        padding: 12px 16px;
        max-height: 200px;
      }

      .bar-fan-modes.collapsed {
        padding: 8px 16px;
        max-height: 40px;
      }

      .bar-fan-label {
        display: flex;
        align-items: center;
        gap: 8px;
        font-size: 0.8rem;
        font-weight: 600;
        opacity: 0.7;
        cursor: pointer;
        transition: opacity 0.3s;
        line-height: 1;
      }

      .bar-fan-label:hover {
        opacity: 1;
      }

      .bar-fan-label ha-icon {
        width: 16px;
        height: 16px;
        flex-shrink: 0;
        display: inline-flex;
        align-items: center;
        justify-content: center;
      }

      .bar-fan-label > span {
        display: inline-flex;
        align-items: center;
        line-height: 1;
      }

      .bar-fan-options {
        display: flex;
        gap: 6px;
        flex-wrap: wrap;
        max-height: 0;
        overflow: hidden;
        opacity: 0;
        transition: max-height 0.3s ease, opacity 0.3s ease, margin-top 0.3s ease;
      }

      .bar-fan-options.expanded {
        max-height: 150px;
        opacity: 1;
        margin-top: 10px;
      }

      .bar-fan-options.collapsed {
        margin-top: 0;
      }

      .bar-fan-chip {
        padding: 8px 14px;
        border-radius: 16px;
        background: rgba(var(--rgb-primary-text-color), 0.05);
        font-size: 0.75rem;
        font-weight: 500;
        cursor: pointer;
        transition: all 0.3s;
        white-space: nowrap;
      }

      .bar-fan-chip:hover {
        background: rgba(var(--rgb-primary-text-color), 0.1);
        transform: translateY(-1px);
      }

      .bar-fan-chip.active {
        background: var(--accent-color);
        color: white;
        box-shadow: 0 2px 6px rgba(3, 169, 244, 0.3);
      }

      /* Main Control (Light, Fan, etc.) */
      .main-control {
        display: flex;
        justify-content: center;
        margin: 24px 0;
      }

      .power-btn {
        width: 120px;
        height: 120px;
        border-radius: 50%;
        border: none;
        background: rgba(var(--rgb-primary-text-color), 0.1);
        cursor: pointer;
        transition: all 0.3s;
        font-size: 3rem;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        gap: 4px;
      }

      .power-btn.on {
        background: var(--accent-color);
        color: white;
        box-shadow: 0 8px 24px rgba(3, 169, 244, 0.4);
      }

      .power-btn:hover {
        transform: scale(1.05);
      }

      .power-btn .mode-label {
        font-size: 0.7rem;
        margin-top: 0;
        opacity: 0.9;
      }

      /* Slider Control */
      .slider-control {
        display: flex;
        align-items: center;
        gap: 12px;
        margin: 16px 0;
      }

      .slider-control input[type="range"] {
        flex: 1;
        height: 6px;
        border-radius: 3px;
        background: rgba(var(--rgb-primary-text-color), 0.1);
        outline: none;
        -webkit-appearance: none;
      }

      .slider-control input[type="range"]::-webkit-slider-thumb {
        -webkit-appearance: none;
        width: 20px;
        height: 20px;
        border-radius: 50%;
        background: var(--accent-color);
        cursor: pointer;
      }

      .slider-value {
        min-width: 48px;
        text-align: right;
        font-weight: 700;
      }

      /* Cover Controls */
      .cover-controls {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: 10px;
        margin: 16px 0;
      }

      .cover-btn {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 8px;
        padding: 16px;
        border: none;
        border-radius: 16px;
        background: rgba(var(--rgb-primary-text-color), 0.05);
        cursor: pointer;
        transition: all 0.3s;
        font-size: 0.85rem;
      }

      .cover-btn:hover {
        background: rgba(var(--rgb-primary-text-color), 0.1);
      }

      .position-display {
        text-align: center;
        margin-top: 16px;
        font-size: 1.1rem;
        font-weight: 600;
      }

      /* Media Player */
      .media-info {
        text-align: center;
        margin: 24px 0;
      }

      .media-title {
        font-size: 1.3rem;
        font-weight: 700;
        margin-bottom: 4px;
      }

      .media-artist {
        font-size: 0.9rem;
        opacity: 0.7;
      }

      .media-controls {
        display: flex;
        justify-content: center;
        gap: 12px;
        margin: 16px 0;
      }

      .media-btn {
        width: 56px;
        height: 56px;
        border-radius: 50%;
        border: none;
        background: rgba(var(--rgb-primary-text-color), 0.1);
        cursor: pointer;
        transition: all 0.3s;
        font-size: 1.5rem;
      }

      .media-btn.primary {
        width: 72px;
        height: 72px;
        background: var(--accent-color);
        color: white;
        font-size: 2rem;
      }

      .media-btn:hover {
        transform: scale(1.1);
      }

      /* Music Assistant 播放清單 (mass_queue) */
      .mass-queue-foldable {
        margin-top: 16px;
        border-radius: 12px;
        background: rgba(var(--rgb-primary-text-color), 0.06);
        overflow: hidden;
      }
      .mass-queue-header {
        display: flex;
        align-items: center;
        gap: 10px;
        width: 100%;
        padding: 12px 14px;
        border: none;
        background: transparent;
        cursor: pointer;
        font-size: 1rem;
        font-weight: 600;
        color: var(--text-primary);
        text-align: left;
        transition: background 0.2s;
      }
      .mass-queue-header:hover {
        background: rgba(var(--rgb-primary-text-color), 0.08);
      }
      .mass-queue-header ha-icon {
        width: 22px;
        height: 22px;
        flex-shrink: 0;
      }
      .mass-queue-loading {
        margin-left: auto;
        font-size: 0.85rem;
        font-weight: 500;
        opacity: 0.7;
      }
      .mass-queue-list {
        max-height: 280px;
        overflow-y: auto;
        padding: 0 8px 8px;
      }
      .mass-queue-empty {
        padding: 16px;
        text-align: center;
        color: var(--text-secondary);
        font-size: 0.9rem;
      }
      .mass-queue-item {
        display: flex;
        align-items: center;
        gap: 12px;
        width: 100%;
        padding: 10px 12px;
        margin-bottom: 4px;
        border: none;
        border-radius: 10px;
        background: rgba(var(--rgb-primary-text-color), 0.05);
        cursor: pointer;
        text-align: left;
        transition: background 0.2s;
      }
      .mass-queue-item:hover {
        background: rgba(var(--rgb-primary-text-color), 0.12);
      }
      .mass-queue-item-image {
        flex-shrink: 0;
        width: 48px;
        height: 48px;
        border-radius: 8px;
        overflow: hidden;
        background: rgba(var(--rgb-primary-text-color), 0.15);
        display: flex;
        align-items: center;
        justify-content: center;
      }
      .mass-queue-item-image img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
      .mass-queue-item-image ha-icon {
        width: 28px;
        height: 28px;
        opacity: 0.6;
      }
      .mass-queue-item-info {
        flex: 1;
        min-width: 0;
        display: flex;
        flex-direction: column;
        gap: 2px;
      }
      .mass-queue-item-title {
        font-size: 0.95rem;
        font-weight: 600;
        color: var(--text-primary);
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
      .mass-queue-item-artist,
      .mass-queue-item-album {
        font-size: 0.8rem;
        color: var(--text-secondary);
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
      .mass-queue-item-play {
        flex-shrink: 0;
        width: 28px;
        height: 28px;
        opacity: 0.7;
      }

      /* Music Assistant 資料庫列 (Library) */
      .mass-library-section {
        display: flex;
        flex-direction: column;
        gap: 10px;
        padding: 8px 8px 10px;
      }
      .mass-library-row {
        display: flex;
        flex-direction: column;
        gap: 4px;
      }
      .mass-library-row-title {
        font-size: 0.85rem;
        font-weight: 600;
        opacity: 0.7;
        padding: 0 4px;
      }
      .mass-library-row-scroll {
        display: flex;
        gap: 8px;
        overflow-x: auto;
        padding: 2px 2px 6px;
        scrollbar-width: none;
        -webkit-overflow-scrolling: touch;
      }
      .mass-library-row-scroll::-webkit-scrollbar {
        display: none;
      }
      .mass-library-chip {
        flex: 0 0 auto;
        min-width: 90px;
        max-width: 120px;
        border-radius: 12px;
        padding: 6px;
        border: none;
        background: rgba(var(--rgb-primary-text-color), 0.05);
        cursor: pointer;
        display: flex;
        flex-direction: column;
        gap: 4px;
        text-align: left;
        transition: background 0.2s, transform 0.2s;
      }
      .mass-library-chip:hover {
        background: rgba(var(--rgb-primary-text-color), 0.1);
        transform: translateY(-1px);
      }
      .mass-library-chip-image {
        width: 100%;
        aspect-ratio: 1 / 1;
        border-radius: 10px;
        overflow: hidden;
        background: rgba(var(--rgb-primary-text-color), 0.15);
        display: flex;
        align-items: center;
        justify-content: center;
      }
      .mass-library-chip-image img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
      .mass-library-chip-image ha-icon {
        width: 28px;
        height: 28px;
        opacity: 0.7;
      }
      .mass-library-chip-text {
        min-width: 0;
        display: flex;
        flex-direction: column;
        gap: 2px;
      }
      .mass-library-chip-title {
        font-size: 0.8rem;
        font-weight: 600;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
      .mass-library-chip-sub {
        font-size: 0.7rem;
        color: var(--text-secondary);
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }

      /* Vacuum */
      .vacuum-status {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin: 16px 0;
      }

      .status-badge {
        padding: 8px 16px;
        border-radius: 20px;
        background: rgba(var(--rgb-primary-text-color), 0.1);
        font-weight: 600;
      }

      .battery-display {
        display: flex;
        align-items: center;
        gap: 8px;
        font-size: 1.1rem;
        font-weight: 700;
      }

      .vacuum-controls {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: 10px;
        margin: 16px 0;
      }

      .vacuum-btn {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 8px;
        padding: 16px;
        border: none;
        border-radius: 16px;
        background: rgba(var(--rgb-primary-text-color), 0.05);
        cursor: pointer;
        transition: all 0.3s;
        font-size: 0.85rem;
      }

      .vacuum-btn:hover {
        background: var(--accent-color);
        color: white;
      }

      /* Generic */
      .generic-state {
        text-align: center;
        margin: 32px 0;
      }

      .state-value {
        font-size: 2rem;
        font-weight: 700;
      }

      /* Main Buttons */
      .main-buttons {
        display: flex;
        gap: 8px;
        margin-top: 12px;
        flex-wrap: wrap;
      }

      .main-buttons-bar {
        margin-top: 0;
        margin-left: 8px;
      }

      .main-button {
        display: flex;
        align-items: center;
        gap: 6px;
        padding: 8px 12px;
        border-radius: 16px;
        border: none;
        background: rgba(var(--rgb-primary-text-color), 0.08);
        cursor: pointer;
        font-size: 0.85rem;
        transition: all 0.2s;
      }

      .main-button:hover {
        background: var(--accent-color);
        color: white;
      }

      .main-button.disabled {
        opacity: 0.4;
        cursor: not-allowed;
      }

      /* Bar Layout */
      .bar-layout {
        padding: 8px 16px !important;
      }

      .bar-content {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 16px;
      }

      .bar-left {
        display: flex;
        align-items: center;
        gap: 12px;
        flex: 1;
        min-width: 0;
      }

      .bar-icon {
        width: 40px;
        height: 40px;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        background: rgba(var(--rgb-primary-text-color), 0.08);
        font-size: 1.5rem;
        flex-shrink: 0;
        transition: all 0.3s;
        cursor: pointer;
      }

      .bar-icon:hover {
        background: rgba(var(--rgb-primary-text-color), 0.12);
      }

      .bar-icon:active {
        transform: scale(0.95);
      }

      .bar-icon-on {
        background: var(--accent-color);
        color: white;
      }

      .bar-info {
        display: flex;
        flex-direction: column;
        gap: 2px;
        min-width: 0;
        flex: 1;
      }

      .bar-name {
        font-weight: 700;
        font-size: 0.85rem;
        min-width: 0;
      }

      .bar-name .title-scroll-wrap {
        display: block;
        overflow-x: auto;
        overflow-y: hidden;
        scrollbar-width: none;
        -ms-overflow-style: none;
        scroll-behavior: smooth;
      }

      .bar-name .title-scroll-wrap::-webkit-scrollbar {
        display: none;
      }

      .bar-name .title-text {
        white-space: nowrap;
        display: inline-block;
      }

      .bar-state {
        font-size: 0.85rem;
        opacity: 0.7;
      }

      .bar-right {
        display: flex;
        align-items: center;
        gap: 8px;
        flex-shrink: 0;
      }

      .bar-controls {
        display: flex;
        gap: 4px;
      }

      .bar-btn {
        width: 36px;
        height: 36px;
        border-radius: 50%;
        border: none;
        background: rgba(var(--rgb-primary-text-color), 0.08);
        cursor: pointer;
        transition: all 0.2s;
        font-size: 1.2rem;
      }

      .bar-btn:hover {
        background: var(--accent-color);
        color: white;
      }

      .bar-btn-small {
        width: 32px;
        height: 32px;
        border-radius: 50%;
        border: none;
        background: rgba(var(--rgb-primary-text-color), 0.08);
        cursor: pointer;
        transition: all 0.2s;
        font-size: 1rem;
      }

      .bar-btn-small:hover {
        background: var(--accent-color);
        color: white;
      }

      .bar-toggle {
        width: 36px;
        height: 36px;
        border-radius: 50%;
        border: none;
        background: rgba(var(--rgb-primary-text-color), 0.08);
        cursor: pointer;
        transition: all 0.2s;
      }

      .bar-toggle-on {
        background: var(--accent-color);
        color: white;
      }

      .bar-settings {
        width: 36px;
        height: 36px;
        border-radius: 50%;
        border: none;
        background: rgba(var(--rgb-primary-text-color), 0.05);
        cursor: pointer;
        transition: all 0.2s;
      }

      .bar-settings:hover {
        background: rgba(var(--rgb-primary-text-color), 0.1);
      }

      /* Bar 模式數值顯示 */
      .bar-value {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        min-width: 45px;
        padding: 0 8px;
        font-size: 0.85rem;
        font-weight: 600;
        color: var(--primary-text-color);
      }

      /* Bar 模式 Mode 文字 */
      .bar-mode-text {
        font-size: 0.75rem;
        font-weight: 500;
        white-space: nowrap;
      }

      /* Mini Layout Styles */
      .mini-layout {
        padding: 14px !important;
      }

      .header-mini {
        margin-bottom: 10px !important;
      }

      .device-name-mini {
        font-size: 1rem !important;
      }

      .current-temp-mini {
        font-size: 2.5rem !important;
      }

      .temp-control-mini {
        margin: 14px 0 !important;
      }

      .adj-btn-mini {
        width: 48px !important;
        height: 48px !important;
        border-radius: 16px !important;
      }

      .value-mini {
        font-size: 1.6rem !important;
      }

      .quick-modes-mini {
        gap: 6px !important;
      }

      .mode-item-mini {
        padding: 8px !important;
        border-radius: 14px !important;
      }

      .mode-item-mini ha-icon {
        font-size: 1.2rem;
      }

      .main-control-mini {
        margin: 14px 0 !important;
      }

      .power-btn-mini {
        width: 80px !important;
        height: 80px !important;
        font-size: 2rem !important;
      }

      .slider-control-mini {
        margin: 10px 0 !important;
      }

      .cover-controls-mini,
      .vacuum-controls-mini {
        gap: 6px !important;
        margin: 10px 0 !important;
      }

      .cover-btn-mini,
      .vacuum-btn-mini {
        padding: 10px !important;
        font-size: 0.75rem !important;
      }

      .cover-btn-mini ha-icon,
      .vacuum-btn-mini ha-icon {
        font-size: 1.2rem !important;
      }

      .position-display-mini,
      .humidity-control-mini,
      .generic-state-mini {
        margin-top: 10px !important;
      }

      .media-info-mini {
        margin: 14px 0 !important;
      }

      .media-title-mini {
        font-size: 1rem !important;
      }

      .media-controls-mini {
        gap: 8px !important;
        margin: 10px 0 !important;
      }

      .media-btn-mini {
        width: 44px !important;
        height: 44px !important;
        font-size: 1.2rem !important;
      }

      .media-btn-mini.primary {
        width: 56px !important;
        height: 56px !important;
        font-size: 1.6rem !important;
      }

      .vacuum-status-mini {
        margin: 10px 0 !important;
      }

      .status-badge-mini,
      .battery-display-mini {
        font-size: 0.85rem !important;
      }

      .state-value-mini {
        font-size: 1.5rem !important;
      }

      /* Text Popup */
      .text-popup-overlay {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: rgba(0, 0, 0, 0.7);
        backdrop-filter: blur(8px);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 1001;
        animation: fadeIn 0.2s;
      }

      .text-popup-content {
        background: var(--card-background-color);
        border-radius: 24px;
        padding: 20px;
        max-width: 90%;
        max-height: 80vh;
        overflow-y: auto;
        animation: scaleIn 0.3s cubic-bezier(0.2, 1, 0.3, 1);
        box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
      }

      .text-popup-header {
        display: flex;
        justify-content: flex-end;
        margin-bottom: 12px;
      }

      .text-popup-body {
        font-size: 1rem;
        line-height: 1.6;
        word-wrap: break-word;
      }

      .truncated-text {
        cursor: pointer;
        text-decoration: underline dotted;
        text-decoration-color: rgba(var(--rgb-primary-text-color), 0.3);
      }

      .truncated-text:hover {
        text-decoration-color: var(--accent-color);
      }

`;
