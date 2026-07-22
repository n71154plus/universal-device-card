# Universal Device Card

Home Assistant 通用裝置卡片：依實體類型自動顯示控制項，並支援彈出層查看同裝置相關實體。

## 支援裝置類型

- climate（冷氣／空調）
- light（燈光）
- fan（風扇／空淨）
- cover（窗簾／遮蔽）
- media_player（喇叭／影音）
- vacuum（掃地機）
- water_heater（熱水器）
- humidifier、generic 等其他實體

## 安裝方式

1. 安裝 [HACS](https://hacs.xyz/)（若尚未安裝）
2. HACS → 前端 → 自訂儲存庫，新增 `https://github.com/n71154plus/universal-device-card`（類型：Dashboard）
3. 下載並安裝 **Universal Device Card**
4. 資源路徑：`/hacsfiles/universal-device-card/universal-device-card.js`（JavaScript Module）
5. 儀表板新增卡片，選擇「Universal Device Card」並設定 `entity`

## 快速設定

```yaml
type: custom:universal-device-card
entity: climate.living_room
layout: standard   # standard | mini | bar
language: zh-TW
```

### 常用選項

- **entity**：主要裝置實體（必填）
- **layout**：`standard` / `mini` / `bar`
- **language**：`auto` / `en` / `zh-TW` / `zh-CN` / `ja`
- **disable_popup**：停用彈出層
- **animations** / **performance_mode**：動畫與效能
- **show_buttons**：主畫面額外 button 實體
- **popup filters**：`exclude_domains`、`include_domains`、`exclude_entities`、`include_entities` 等

完整說明與預覽圖請見 [README](README.md)。
