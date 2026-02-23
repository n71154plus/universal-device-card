# Universal Device Card

Home Assistant 通用裝置卡片，支援多種裝置類型與彈出層控制。

## 支援裝置類型

- climate、light、fan、cover、humidifier、media_player、vacuum、water_heater、generic

## 安裝方式

1. 安裝 [HACS](https://hacs.xyz/)（若尚未安裝）。
2. 在 HACS 中新增此自訂儲存庫（Dashboard / 前端）。
3. 在 HACS 儀表板中找到「Universal Device Card」並安裝。
4. 在 Lovelace 設定中加入資源：`/hacsfiles/universal-device-card/dist/universal-device-card.js`（類型：JavaScript Module）。
5. 在儀表板中新增卡片，類型選擇「Universal Device Card」並設定實體與選項。

## 設定說明

- **entity**：主要裝置實體（必填）
- **layout**：版面（standard / mini / bar）
- **language**：介面語言（auto / en / zh-TW 等）
- **disable_popup**：是否停用彈出層
- **show_buttons**：主卡片上要顯示的按鈕實體列表

更多說明請見 [README](README.md)。
