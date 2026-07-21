# Universal Device Card

[![hacs_badge](https://img.shields.io/badge/HACS-Custom-orange.svg)](https://github.com/hacs/integration)
[![GitHub release](https://img.shields.io/github/release/n71154plus/universal-device-card.svg)](https://github.com/n71154plus/universal-device-card/releases)

Home Assistant 通用裝置卡片，支援多種裝置類型（climate、light、fan、cover、humidifier、media_player、vacuum、water_heater、generic）與彈出層控制。

目前釋出版本：**v2.6.2**

## 透過 HACS 安裝（推薦）

1. 確認已安裝 [HACS](https://hacs.xyz/)。
2. 在 HACS → **前端** → 右上角 **⋮** → **自訂儲存庫**，新增：
   - **URL**：`https://github.com/n71154plus/universal-device-card`
   - **類型**：Dashboard（Lovelace）
3. 在 HACS 前端清單中找到 **Universal Device Card**，點擊下載／安裝。
4. 重新載入 Home Assistant 前端。
5. 在儀表板中新增卡片，類型選擇 **Universal Device Card** 並設定實體。

資源路徑（HACS 通常會自動加入）：

```text
/hacsfiles/universal-device-card/universal-device-card.js
```

類型請選 **JavaScript Module**。

## 手動安裝

1. 下載最新 [Release](https://github.com/n71154plus/universal-device-card/releases) 中的 `dist/` 內容。
2. 放到 `config/www/universal-device-card/`（需包含 `universal-device-card.js` 與 `translations/`）。
3. 在 Lovelace 資源新增：

```text
/local/universal-device-card/universal-device-card.js
```

類型：JavaScript Module。

## 設定範例

```yaml
type: custom:universal-device-card
entity: climate.living_room
layout: standard   # standard | mini | bar
language: auto     # auto | en | zh-TW | zh-CN | ja
disable_popup: false
animations: true
performance_mode: false
```

### 常用選項

| 選項 | 說明 |
|------|------|
| `entity` | 主要裝置實體（必填） |
| `layout` | 版面：`standard` / `mini` / `bar` |
| `language` | 介面語言 |
| `disable_popup` | 停用彈出層 |
| `animations` | 啟用動畫 |
| `performance_mode` | 效能模式（關閉動畫） |
| `show_buttons` | 主畫面顯示的 button 實體 ID 列表 |

更多說明見 [info.md](info.md)。

## 開發與建置

- 釋出產物在 `dist/`（含 `universal-device-card.js` 與 `translations/`）。
- `src/` 為模組化原始碼參考；目前 **HACS 釋出以 `dist/` 為準**。
- 若要從模組原始碼重建：`npm install && npm run build`（會覆寫 `dist/`）。

## 授權

MIT
