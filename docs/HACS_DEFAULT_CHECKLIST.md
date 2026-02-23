# 納入 HACS 官方清單檢查清單

要讓 **Universal Device Card** 出現在 HACS 的預設商店（不需手動加自訂儲存庫），需完成下列項目。

## 一、GitHub 儲存庫設定

- [ ] **公開儲存庫**：專案為 public。
- [ ] **Description**：在 GitHub 儲存庫首頁右側「About」→ 填寫簡短描述（會顯示在 HACS 中）。
- [ ] **Topics**：在 About 中新增 topics，例如：`home-assistant`、`lovelace`、`custom-cards`、`hacs`。
- [ ] **Issues**：設定 → General → Issues 保持啟用。

## 二、本專案內已具備的項目

- [x] **hacs.json**：根目錄已有，含 `name`、`filename`、`render_readme`、`homeassistant`。
- [x] **README.md**：使用說明與安裝步驟。
- [x] **info.md**：HACS 資訊頁內容（或由 `render_readme: true` 使用 README）。
- [x] **HACS Action**：`.github/workflows/validate.yml`，category 為 `plugin`。

## 三、你仍需完成的事項

### 1. 預覽圖片（必填，否則 PR 會被打回）

- [ ] 在 README 中需有至少一張可顯示的預覽圖。
- 做法二選一：
  - 將卡片實際畫面截圖存成 **`docs/screenshot.png`**，commit 並 push（目前 README 已引用此路徑）；或
  - 在 README 的預覽區改為使用**可公開存取的圖片 URL**，例如：  
    `![預覽](https://你的圖床網址/screenshot.png)`

### 2. GitHub Release（必填）

- [ ] 在專案 push 後，到 **Releases** → **Create a new release**。
- [ ] 建立的是 **Release**（有版本號與說明），不是只有 tag。
- [ ] 建議在 **Actions** 中先確認 **Validate** workflow 已通過，再建立該版本的 Release。

### 3. 提交到 hacs/default

- [ ] Fork [hacs/default](https://github.com/hacs/default)。
- [ ] 在 fork 中從 **master** 開新分支（不要直接改 master）。
- [ ] 編輯 **`plugin`** 檔案，在清單中**依字母順序**加入你的儲存庫，格式：`你的GitHub帳號/儲存庫名稱`  
  例如：`myusername/universal-device-card`。
- [ ] 送出 PR 到 hacs/default，並**完整填寫 PR 範本**（例如：勾選適用項目；**Plugin 不要勾 hassfest**）。
- [ ] PR 需從**個人帳號**提交（不要用 Organization），且 PR 可被維護者編輯。
- [ ] 完成後將 PR 設為 **Ready for review**（若一開始是 draft）。

### 4. 其他注意事項

- 僅**儲存庫擁有者**或**主要貢獻者**可提交納入預設清單的 PR。
- 新加入的審核可能需要**數個月**，進度可到 [backlog](https://github.com/hacs/default/pulls?q=is%3Apr+is%3Aopen+draft%3Afalse+sort%3Acreated-asc) 查看。
- 若僅限特定國家使用，需在 **hacs.json** 中設定 `country`（ISO 3166-1 alpha-2，例如 `"TW"`）。

## 四、本地先跑一次 HACS 檢查（可選）

1. 將此專案 push 到你的 GitHub。
2. 開啟 **Actions** 分頁，確認 **Validate** workflow 有跑且通過。
3. 若有失敗，依錯誤訊息修正（常見：缺少 description、topics、issues 或 README 中沒有圖片）。

---

參考文件：

- [HACS - Include default repositories](https://hacs.xyz/docs/publish/include/)
- [HACS - GitHub Action](https://hacs.xyz/docs/publish/action/)
