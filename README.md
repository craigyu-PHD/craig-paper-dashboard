# Craig Paper Dashboard

跨平台使用的個人桌面 Dashboard，採用 ZhgChgLi 文章與 MIT 範例專案的紙感儀表方向：固定 736×414 紙感畫布、翻頁鐘、天氣、行事曆、倒數日與焦點頁面輪播。可用在 Android、iOS、平板、桌面瀏覽器，也適合長開在舊裝置或第二螢幕上。

## 使用方式

1. 用手機、平板或電腦瀏覽器打開 GitHub Pages 網址。
2. 在歡迎頁選擇設定檔、要顯示的頁面資料與風格。
3. 手機和平板可加入主畫面；桌面瀏覽器可直接開啟或釘選成應用程式。
4. 建議橫向使用，畫面會自動縮放到目前裝置尺寸。

## 功能

- 多使用者設定檔：每個 profile 有自己的頁面、事件、倒數日、焦點筆記與風格。
- 頁面選擇：可選天氣、行事曆、倒數日、焦點。
- 10 種風格：紙感經典、包浩斯儀表、動漫粉彩、賽博霓虹、雜誌主編、森林靜心、海洋玻璃、夕陽暖調、終端機工作站、黑金精品。
- 本機設定：目前資料存在瀏覽器 localStorage，不需要登入，也不會互相覆蓋。

## 第一版資料來源

- 天氣：Open-Meteo，會優先使用瀏覽器定位；拒絕定位時預設臺北市。
- 行事曆：瀏覽器 localStorage，可用畫面底部 `CONFIG` 編輯 JSON。
- 倒數日：瀏覽器 localStorage，可用 `CONFIG` 編輯 JSON。
- 焦點：瀏覽器 localStorage，可用 `CONFIG` 編輯 JSON。

## Reference

- Article: https://zhgchg.li/posts/35cc65327d28/
- MIT example: https://github.com/zhgchgli0718/GASDashboardExample
