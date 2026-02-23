# Universal Device Card

Home Assistant 通用裝置卡片，支援多種裝置類型（climate、light、fan、cover、humidifier、media_player、vacuum、water_heater、generic）與彈出層控制。

## 預覽

![Universal Device Card 預覽](docs/screenshot.png)

> 上圖為佔位。建議將卡片實際畫面截圖存成 `docs/screenshot.png` 後替換，於 HACS 商店中顯示真實預覽。

## 透過 HACS 安裝（推薦）

1. 確認已安裝 [HACS](https://hacs.xyz/)。
2. 在 HACS → **前端** → 右上角 **⋮** → **自訂儲存庫**，新增此儲存庫 URL，類型選 **Lovelace**（Dashboard）。
3. 在 HACS 前端清單中找到 **Universal Device Card**，點擊安裝。
4. 在 Lovelace 設定 → **儀表板** → **資源** 中新增：
   - **URL**：`/hacsfiles/universal-device-card/dist/universal-device-card.js`
   - **類型**：JavaScript Module
5. 重新載入前端後，在儀表板中新增卡片，類型選擇 **Universal Device Card** 並設定實體。

更多設定說明見 [info.md](info.md)。

## 開發與建置

- **開發**：請在 `src/` 目錄下修改程式；各裝置類型與控制動作已拆成模組，便於維護與擴充。
- **建置**：執行 `npm run build` 會以 Rollup 將 `src/index.js` 打包成單一 JS 檔，並將 `translations/` 複製到 `dist/translations/`。
- **輸出**：建置產物為 `dist/universal-device-card.js` 與 `dist/translations/`。上傳至 HACS 或 GitHub 時請包含整個 `dist/` 目錄。

## 手動部署（非 HACS）

- 將 `dist/` 目錄整個複製到 Home Assistant 的 `www/`（例如 `config/www/universal-device-card/`），並在 Lovelace 資源中加入：
  - URL：`/local/universal-device-card/universal-device-card.js`
  - 類型：JavaScript Module

## 指令

- `npm run build` — 建置至 `dist/`（含卡片與翻譯檔）
- `npm run dev` — 監聽變更並持續建置（可選，方便本地除錯）
