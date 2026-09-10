# Craig Paper Dashboard

## Project Purpose

個人桌面 Dashboard / PWA，目標是讓手機、平板、桌面瀏覽器或第二螢幕長開使用。介面採固定紙感畫布、翻頁鐘、天氣、行事曆、倒數日、焦點筆記與頁面輪播。

## Working Folder

`/Users/craig/Library/CloudStorage/GoogleDrive-craigpop.tw@gmail.com/我的雲端硬碟/010-Codex GPT/10-打造個人桌面 Dashboard `

注意：資料夾名稱尾端有一個空白字元，命令與路徑處理時要保留。

## Entry Points

- `index.html`: App shell 與主要 DOM 結構。
- `styles.css`: 視覺樣式、版面與 responsive scaling。
- `app.js`: Dashboard 狀態、頁面切換、資料儲存、天氣與互動邏輯。
- `sw.js`: Service worker / PWA 快取。
- `manifest.webmanifest`: PWA manifest。
- `Textures/`, `assets/`, `fighter-*.gif`: 視覺素材。

## Runtime

- 目前是靜態前端專案，沒有 `package.json`。
- 本機預覽可用任何靜態檔案伺服器，例如 `python3 -m http.server 8000`。
- GitHub Pages 部署時保留 `.nojekyll`。

## Data Rules

- 使用者資料目前儲存在瀏覽器 `localStorage`。
- 不提交真實個資、API key、token、`.env*` 或本機 AI 設定。
- 如果未來加入學生、班級或教學資料，使用班級代碼與座號，不使用真實姓名。

## Obsidian

主要 vault：

`/Users/craig/Library/Mobile Documents/com~apple~CloudDocs/CRAIG圖書館`

本專案進度與 Codex 使用紀錄寫入：

`Codex 使用記錄/01-每日工作進度/2026-05-06-個人桌面Dashboard初始化.md`

`AGENTS.md` 記錄穩定專案規則；Obsidian cockpit 記錄進度、下一步、變更與踩坑，避免重複。

## Safety

- 保留既有 README、素材、source files 與 git history。
- 修改前先檢查目前檔案狀態；不要覆蓋使用者未提交變更。
- 對 UI 做改動後，至少用本機靜態伺服器確認首頁可載入。

## 開工同步

當使用者說「開工」、「開始工作」、「接續專案」或要求恢復本專案脈絡時，請啟用全域 `startup-sync` 流程，並依序執行：

1. 先讀取本 `AGENTS.md`，確認專案定位、工作邊界、常用指令與安全規則。
2. 若本檔或 Obsidian 規則指定專案駕駛艙、Codex 使用記錄或進度筆記，優先讀取對應 Obsidian 筆記，掌握上次進度、下一步與踩坑。
3. 檢查 `git status --short` 與目前 branch，回報未提交變更，但不要自動 pull、commit 或 push。
4. 回報「目前狀態 / 建議下一步 / 需要使用者確認的事項」，再等待使用者指示。

除非使用者明確要求，開工同步不得建立新 Obsidian vault、改動既有 Obsidian 資料夾結構、覆蓋既有筆記、改寫專案規則或執行具有外部副作用的部署/推送。
