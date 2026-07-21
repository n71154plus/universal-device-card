# Universal Device Card

Home Assistant 通用裝置卡片，支援多種裝置類型與彈出層控制。

## 支援裝置類型

- climate、light、fan、cover、humidifier、media_player、vacuum、water_heater、generic

## 安裝方式

1. 安裝 [HACS](https://hacs.xyz/)（若尚未安裝）。
2. 在 HACS 中新增自訂儲存庫：`https://github.com/n71154plus/universal-device-card`（類型：Dashboard）。
3. 下載並安裝 **Universal Device Card**。
4. 資源路徑：`/hacsfiles/universal-device-card/universal-device-card.js`（類型：JavaScript Module）。
5. 在儀表板新增卡片，類型選擇「Universal Device Card」並設定實體。

## 設定說明

- **entity**：主要裝置實體（必填）
- **layout**：版面（standard / mini / bar）
- **language**：介面語言（auto / en / zh-TW / zh-CN / ja）
- **disable_popup**：是否停用彈出層
- **animations** / **performance_mode**：動畫與效能模式
- **show_buttons**：主卡片上要顯示的按鈕實體列表
- **popup filters**：可用 `exclude_domains`、`include_domains`、`exclude_entities`、`include_entities` 等過濾彈出層內容

更多說明請見 [README](README.md)。
