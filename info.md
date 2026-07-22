# Universal Device Card

Home Assistant 通用裝置卡片。

## 精髓

主畫面只放常用控制；**點右上角按鈕**會彈出**同一 device** 上的其它感測數據與控制項目（開關、模式、風向、功耗…），不必再翻實體清單。

可用 `disable_popup` 關閉，或用 domain／entity／sensor class 過濾彈出層內容。

## 支援裝置類型

- climate、light、fan、cover、media_player、vacuum、water_heater、humidifier、generic

## 安裝方式

1. 安裝 [HACS](https://hacs.xyz/)
2. 自訂儲存庫：`https://github.com/n71154plus/universal-device-card`（Dashboard）
3. 安裝後資源：`/hacsfiles/universal-device-card/universal-device-card.js`（JavaScript Module）

## 快速設定

```yaml
type: custom:universal-device-card
entity: climate.living_room
layout: standard   # standard | mini | bar
language: zh-TW
disable_popup: false
```

完整說明與預覽圖（含彈出層）見 [README](README.md)。
