const PANEL_MS = 12000;
const STORAGE_PROFILES = "paperDashboardProfilesV2";
const STORAGE_SELECTED = "paperDashboardSelectedProfile";
const WEEKDAYS_ZH = ["星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"];
const WEEKDAYS_EN = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const MONTHS = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];

const PAGE_DEFS = [
  { id: "weather", label: "天　氣", short: "天氣", desc: "即時天氣、溫度與降雨機率" },
  { id: "calendar", label: "行　事　曆", short: "行事曆", desc: "今日正在進行與即將到來的事項" },
  { id: "countdown", label: "倒　數　日", short: "倒數日", desc: "重要日期、紀念日與里程碑" },
  { id: "notes", label: "焦　點", short: "焦點", desc: "今日提醒、工作重點與個人提示" },
  { id: "rhythm", label: "節　奏", short: "節奏", desc: "今日生活節奏、例行習慣與補水提醒" },
  { id: "system", label: "系　統", short: "系統", desc: "螢幕、電量、網路與本機狀態" },
  { id: "briefing", label: "簡　報", short: "簡報", desc: "今天的三個主題與一句提醒" }
];

const SERIF_STACK = `"Songti TC", "Noto Serif TC", Georgia, serif`;
const SANS_STACK = `-apple-system, BlinkMacSystemFont, "PingFang TC", "Microsoft JhengHei", system-ui, sans-serif`;
const GEOMETRIC_STACK = `"Avenir Next", "Futura", "PingFang TC", system-ui, sans-serif`;
const MONO_STACK = `"SFMono-Regular", "Cascadia Mono", "Menlo", "Consolas", monospace`;
const PIXEL_STACK = `"Courier New", "SFMono-Regular", monospace`;
const DISPLAY_STACK = `"Arial Black", Impact, "PingFang TC", sans-serif`;
const COMIC_STACK = `"Marker Felt", "Comic Sans MS", "PingFang TC", cursive`;
const ROUND_STACK = `"PingFang TC", "Hiragino Maru Gothic ProN", "Microsoft JhengHei", system-ui, sans-serif`;
const LUXURY_STACK = `"Didot", "Bodoni 72", "Songti TC", Georgia, serif`;
const ORBITRON_STACK = `"Avenir Next Condensed", "DIN Condensed", "Arial Narrow", system-ui, sans-serif`;

const STYLE_DEFS = [
  { id: "paper", name: "Paper Classic", zh: "紙感經典", desc: "米色紙張、襯線字、翻頁鐘", sample: "5/4", layout: "classic", family: "paper", vars: { "--outer": "#15110c", "--paper": "#f1ebdc", "--paper-deep": "#e8e0cc", "--ink": "#2a2520", "--ink-soft": "#6b6358", "--ink-faint": "#9a9080", "--line": "#cdc3ae", "--stamp": "#a0382e", "--green": "#2d5a3d", "--glow": "rgba(255, 248, 225, 0.08)", "--font-body": SERIF_STACK, "--font-display": SERIF_STACK, "--font-clock": SERIF_STACK, "--device-radius": "0px" } },
  { id: "braun", name: "Braun Desk", zh: "包浩斯儀表", desc: "淺灰面板、橘色訊號、工業控制感", sample: "ET66", layout: "dense", family: "geometric", vars: { "--outer": "#1f211f", "--paper": "#d8d5ca", "--paper-deep": "#c9c4b8", "--ink": "#282725", "--ink-soft": "#5f5b53", "--ink-faint": "#8e887b", "--line": "#b5afa3", "--stamp": "#e85d2c", "--green": "#56633d", "--glow": "rgba(232, 93, 44, 0.12)", "--font-body": GEOMETRIC_STACK, "--font-display": GEOMETRIC_STACK, "--font-clock": MONO_STACK, "--device-radius": "2px" } },
  { id: "anime", name: "Anime Pastel", zh: "動漫粉彩", desc: "柔和粉彩、圓角卡片、輕亮氛圍", sample: "きら", layout: "bento", family: "soft", vars: { "--outer": "#fff0f6", "--paper": "#fff8fb", "--paper-deep": "#f8dce8", "--ink": "#352633", "--ink-soft": "#765c70", "--ink-faint": "#a9879e", "--line": "#ecc5d8", "--stamp": "#e65d9a", "--green": "#4f8d88", "--glow": "rgba(230, 93, 154, 0.18)", "--font-body": ROUND_STACK, "--font-display": ROUND_STACK, "--font-clock": GEOMETRIC_STACK, "--device-radius": "14px" } },
  { id: "cyber", name: "Cyber Neon", zh: "賽博霓虹", desc: "深色底、青紫光、夜間資訊牆", sample: "19:57", layout: "command", family: "neon", vars: { "--outer": "#050714", "--paper": "#0a0f21", "--paper-deep": "#101a33", "--ink": "#d8f7ff", "--ink-soft": "#8ed6e8", "--ink-faint": "#5b8296", "--line": "#25435f", "--stamp": "#ff4fd8", "--green": "#43f6b3", "--glow": "rgba(75, 224, 255, 0.18)", "--font-body": GEOMETRIC_STACK, "--font-display": ORBITRON_STACK, "--font-clock": ORBITRON_STACK, "--device-radius": "6px", "--texture-bg": "linear-gradient(rgba(75,224,255,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(255,79,216,0.05) 1px, transparent 1px)" } },
  { id: "editorial", name: "Editorial Ink", zh: "雜誌主編", desc: "報刊欄線、沉穩紅黑、資訊密度高", sample: "NEWS", layout: "magazine", family: "editorial", vars: { "--outer": "#0e0e0d", "--paper": "#f7f3e8", "--paper-deep": "#ebe2d0", "--ink": "#121212", "--ink-soft": "#55504a", "--ink-faint": "#918778", "--line": "#b9ae9d", "--stamp": "#b51d23", "--green": "#245c3d", "--glow": "rgba(181, 29, 35, 0.12)", "--font-body": SERIF_STACK, "--font-display": LUXURY_STACK, "--font-clock": LUXURY_STACK, "--device-radius": "0px" } },
  { id: "forest", name: "Forest Zen", zh: "森林靜心", desc: "綠色紙張、低刺激、長時間觀看", sample: "WOOD", layout: "calm", family: "nature", vars: { "--outer": "#0d1711", "--paper": "#e9efe2", "--paper-deep": "#d4ddca", "--ink": "#17251b", "--ink-soft": "#51604f", "--ink-faint": "#7d8a78", "--line": "#aebca5", "--stamp": "#9a5234", "--green": "#1e7048", "--glow": "rgba(87, 134, 89, 0.16)", "--font-body": ROUND_STACK, "--font-display": SERIF_STACK, "--font-clock": LUXURY_STACK, "--device-radius": "10px" } },
  { id: "ocean", name: "Ocean Glass", zh: "海洋玻璃", desc: "藍綠透明感、冷靜清爽", sample: "WAVE", layout: "bento", family: "glass", vars: { "--outer": "#071820", "--paper": "#e6f2f4", "--paper-deep": "#cfe4e9", "--ink": "#102b35", "--ink-soft": "#4d6d76", "--ink-faint": "#809aa3", "--line": "#a9c9d2", "--stamp": "#2477a3", "--green": "#147f72", "--glow": "rgba(50, 153, 190, 0.18)", "--font-body": SANS_STACK, "--font-display": GEOMETRIC_STACK, "--font-clock": GEOMETRIC_STACK, "--device-radius": "18px" } },
  { id: "sunset", name: "Sunset Warm", zh: "夕陽暖調", desc: "暖橘光、柔和對比、生活感", sample: "17:30", layout: "split", family: "warm", vars: { "--outer": "#26120d", "--paper": "#fff0dc", "--paper-deep": "#f3d2b0", "--ink": "#351f19", "--ink-soft": "#795649", "--ink-faint": "#a88372", "--line": "#dbb69d", "--stamp": "#c34b2f", "--green": "#5e7140", "--glow": "rgba(235, 124, 72, 0.16)", "--font-body": SANS_STACK, "--font-display": DISPLAY_STACK, "--font-clock": GEOMETRIC_STACK, "--device-radius": "16px" } },
  { id: "terminal", name: "Terminal Ops", zh: "終端機工作站", desc: "黑綠命令列、工程監控氣質", sample: "$ now", layout: "command", family: "terminal", vars: { "--outer": "#000b07", "--paper": "#04140d", "--paper-deep": "#092015", "--ink": "#c8ffd5", "--ink-soft": "#7ddc93", "--ink-faint": "#4e8d62", "--line": "#1d4a31", "--stamp": "#56f08a", "--green": "#9cffb5", "--glow": "rgba(86, 240, 138, 0.16)", "--font-body": MONO_STACK, "--font-display": MONO_STACK, "--font-clock": MONO_STACK, "--device-radius": "0px" } },
  { id: "noir", name: "Luxury Noir", zh: "黑金精品", desc: "黑底金線、展示櫃與高級鐘錶感", sample: "NOIR", layout: "poster", family: "luxury", vars: { "--outer": "#050403", "--paper": "#11100e", "--paper-deep": "#1d1a15", "--ink": "#efe2c2", "--ink-soft": "#c0ad82", "--ink-faint": "#806f4f", "--line": "#5c4d31", "--stamp": "#d8aa42", "--green": "#a8b76a", "--glow": "rgba(216, 170, 66, 0.16)", "--font-body": LUXURY_STACK, "--font-display": LUXURY_STACK, "--font-clock": LUXURY_STACK, "--device-radius": "4px" } },
  { id: "pixel", name: "Pixel Quest", zh: "像素任務", desc: "8-bit 方塊、低解析 HUD、復古遊戲節奏", sample: "8BIT", layout: "arcade", family: "pixel", vars: { "--outer": "#10121f", "--paper": "#1e2340", "--paper-deep": "#2c335d", "--ink": "#f8f4c6", "--ink-soft": "#ffd166", "--ink-faint": "#7bdff2", "--line": "#49508a", "--stamp": "#ef476f", "--green": "#06d6a0", "--glow": "rgba(239, 71, 111, 0.2)", "--font-body": PIXEL_STACK, "--font-display": PIXEL_STACK, "--font-clock": PIXEL_STACK, "--device-radius": "0px" } },
  { id: "platform", name: "Platform Pop", zh: "平台冒險", desc: "紅藍亮色、關卡感資訊列、跳躍遊戲氛圍", sample: "JUMP", layout: "arcade", family: "platform", vars: { "--outer": "#58b7ff", "--paper": "#fff3c4", "--paper-deep": "#ffc857", "--ink": "#16324f", "--ink-soft": "#2f6690", "--ink-faint": "#6c91bf", "--line": "#1b5299", "--stamp": "#d62828", "--green": "#2a9d8f", "--glow": "rgba(255, 200, 87, 0.28)", "--font-body": GEOMETRIC_STACK, "--font-display": DISPLAY_STACK, "--font-clock": DISPLAY_STACK, "--device-radius": "8px" } },
  { id: "synthwave", name: "Synthwave Grid", zh: "合成波夜景", desc: "紫粉夕陽、地平線格網、80 年代電子感", sample: "1984", layout: "poster", family: "neon", vars: { "--outer": "#13051f", "--paper": "#1a0b2e", "--paper-deep": "#2b124c", "--ink": "#ffe8ff", "--ink-soft": "#ff9de2", "--ink-faint": "#a884ff", "--line": "#5f2c82", "--stamp": "#ff6ec7", "--green": "#00f5d4", "--glow": "rgba(255, 110, 199, 0.22)", "--font-body": GEOMETRIC_STACK, "--font-display": ORBITRON_STACK, "--font-clock": ORBITRON_STACK, "--device-radius": "12px", "--texture-bg": "linear-gradient(rgba(255,110,199,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(0,245,212,0.08) 1px, transparent 1px)" } },
  { id: "vapor", name: "Vapor Mall", zh: "蒸氣波商場", desc: "粉紫青綠、錯位標籤、Y2K 消費文化", sample: "AEST", layout: "split", family: "vapor", vars: { "--outer": "#f6d6ff", "--paper": "#fff7ff", "--paper-deep": "#d5f3ff", "--ink": "#312244", "--ink-soft": "#5f4b8b", "--ink-faint": "#9d75cb", "--line": "#cdb4db", "--stamp": "#00bbf9", "--green": "#00f5d4", "--glow": "rgba(0, 187, 249, 0.2)", "--font-body": SANS_STACK, "--font-display": DISPLAY_STACK, "--font-clock": GEOMETRIC_STACK, "--device-radius": "18px" } },
  { id: "aurora", name: "Aurora Glass", zh: "極光玻璃", desc: "半透明層次、冷色光暈、現代科技桌面", sample: "AURA", layout: "bento", family: "glass", vars: { "--outer": "#07111f", "--paper": "#102238", "--paper-deep": "#173b54", "--ink": "#efffff", "--ink-soft": "#b3f7ff", "--ink-faint": "#7ca8bd", "--line": "#2f6f80", "--stamp": "#7cffcb", "--green": "#9bfffc", "--glow": "rgba(124, 255, 203, 0.2)", "--font-body": SANS_STACK, "--font-display": GEOMETRIC_STACK, "--font-clock": ORBITRON_STACK, "--device-radius": "22px" } },
  { id: "brutal", name: "Brutalist Poster", zh: "粗野海報", desc: "硬邊框、強對比、反模板文化刊物", sample: "BOLD", layout: "poster", family: "brutal", vars: { "--outer": "#f4ff00", "--paper": "#ffffff", "--paper-deep": "#111111", "--ink": "#0b0b0b", "--ink-soft": "#3b3b3b", "--ink-faint": "#707070", "--line": "#0b0b0b", "--stamp": "#ff003d", "--green": "#0057ff", "--glow": "rgba(255, 0, 61, 0.2)", "--font-body": SANS_STACK, "--font-display": DISPLAY_STACK, "--font-clock": DISPLAY_STACK, "--device-radius": "0px" } },
  { id: "swiss", name: "Swiss Grid", zh: "瑞士網格", desc: "白底黑字、嚴格對齊、國際主義資訊版", sample: "GRID", layout: "magazine", family: "swiss", vars: { "--outer": "#d9d9d9", "--paper": "#fbfbf7", "--paper-deep": "#eeeeea", "--ink": "#101010", "--ink-soft": "#4d4d4d", "--ink-faint": "#8a8a8a", "--line": "#1a1a1a", "--stamp": "#e00022", "--green": "#006c67", "--glow": "rgba(224, 0, 34, 0.08)", "--font-body": SANS_STACK, "--font-display": GEOMETRIC_STACK, "--font-clock": GEOMETRIC_STACK, "--device-radius": "0px" } },
  { id: "manga", name: "Manga Panel", zh: "黑白漫畫", desc: "網點紋理、分鏡框、漫畫雜誌衝擊感", sample: "BAM!", layout: "magazine", family: "manga", vars: { "--outer": "#090909", "--paper": "#fffdf2", "--paper-deep": "#e9e5d6", "--ink": "#111111", "--ink-soft": "#383838", "--ink-faint": "#747474", "--line": "#111111", "--stamp": "#e63946", "--green": "#2a9d8f", "--glow": "rgba(255, 253, 242, 0.12)", "--font-body": SANS_STACK, "--font-display": COMIC_STACK, "--font-clock": DISPLAY_STACK, "--device-radius": "0px", "--texture-bg": "radial-gradient(circle, rgba(0,0,0,0.16) 1px, transparent 1px)" } },
  { id: "mecha", name: "Mecha Cockpit", zh: "機甲駕駛艙", desc: "橘色警示、艙內儀表、戰術掃描線", sample: "CORE", layout: "command", family: "cockpit", vars: { "--outer": "#080d12", "--paper": "#101820", "--paper-deep": "#1c2b34", "--ink": "#e7f0f2", "--ink-soft": "#a9c2ca", "--ink-faint": "#607d87", "--line": "#38515d", "--stamp": "#ff8a00", "--green": "#72e06a", "--glow": "rgba(255, 138, 0, 0.2)", "--font-body": GEOMETRIC_STACK, "--font-display": ORBITRON_STACK, "--font-clock": ORBITRON_STACK, "--device-radius": "6px" } },
  { id: "space", name: "Starship Deck", zh: "星艦控制", desc: "深空藍、艙橋面板、航行控制台", sample: "ORBIT", layout: "command", family: "space", vars: { "--outer": "#020617", "--paper": "#0f172a", "--paper-deep": "#172554", "--ink": "#e0f2fe", "--ink-soft": "#93c5fd", "--ink-faint": "#64748b", "--line": "#1d4ed8", "--stamp": "#38bdf8", "--green": "#a3e635", "--glow": "rgba(56, 189, 248, 0.16)", "--font-body": GEOMETRIC_STACK, "--font-display": ORBITRON_STACK, "--font-clock": ORBITRON_STACK, "--device-radius": "14px" } },
  { id: "cafe", name: "Cafe Walnut", zh: "咖啡木質", desc: "木桌、拿鐵色、適合日常生活桌面", sample: "LATTE", layout: "calm", family: "warm", vars: { "--outer": "#26160f", "--paper": "#f7ead8", "--paper-deep": "#d9b994", "--ink": "#2f1f17", "--ink-soft": "#765943", "--ink-faint": "#a8896d", "--line": "#b99069", "--stamp": "#8f3f24", "--green": "#5d7a3d", "--glow": "rgba(217, 185, 148, 0.16)", "--font-body": SERIF_STACK, "--font-display": LUXURY_STACK, "--font-clock": LUXURY_STACK, "--device-radius": "16px" } },
  { id: "sakura", name: "Sakura Washi", zh: "櫻花和紙", desc: "淡粉和紙、細線留白、柔和日系文具感", sample: "春", layout: "calm", family: "soft", vars: { "--outer": "#3d2b33", "--paper": "#fff7f7", "--paper-deep": "#f7dfe7", "--ink": "#33262b", "--ink-soft": "#7d5f69", "--ink-faint": "#b18b98", "--line": "#e7b7c7", "--stamp": "#d65a7a", "--green": "#6b8f71", "--glow": "rgba(214, 90, 122, 0.14)", "--font-body": ROUND_STACK, "--font-display": SERIF_STACK, "--font-clock": LUXURY_STACK, "--device-radius": "12px" } },
  { id: "nordic", name: "Nordic Snow", zh: "北歐雪境", desc: "冷白藍灰、乾淨留白、低噪音桌面", sample: "SNOW", layout: "calm", family: "nordic", vars: { "--outer": "#0f172a", "--paper": "#f8fafc", "--paper-deep": "#e2e8f0", "--ink": "#0f172a", "--ink-soft": "#475569", "--ink-faint": "#94a3b8", "--line": "#cbd5e1", "--stamp": "#2563eb", "--green": "#0f766e", "--glow": "rgba(148, 163, 184, 0.18)", "--font-body": SANS_STACK, "--font-display": GEOMETRIC_STACK, "--font-clock": GEOMETRIC_STACK, "--device-radius": "20px" } },
  { id: "solarpunk", name: "Solarpunk Lab", zh: "太陽龐克", desc: "植物、能源、明亮黃綠的未來感", sample: "SUN", layout: "bento", family: "nature", vars: { "--outer": "#16351f", "--paper": "#fff8d6", "--paper-deep": "#d9f99d", "--ink": "#17351f", "--ink-soft": "#4d6b31", "--ink-faint": "#85955a", "--line": "#b5c56b", "--stamp": "#f59e0b", "--green": "#16a34a", "--glow": "rgba(245, 158, 11, 0.18)", "--font-body": ROUND_STACK, "--font-display": GEOMETRIC_STACK, "--font-clock": GEOMETRIC_STACK, "--device-radius": "18px" } },
  { id: "crt", name: "Retro CRT", zh: "復古電視", desc: "掃描線、琥珀螢幕、老顯示器質感", sample: "CH03", layout: "command", family: "terminal", vars: { "--outer": "#080600", "--paper": "#191205", "--paper-deep": "#261b07", "--ink": "#ffd166", "--ink-soft": "#e9a93b", "--ink-faint": "#8c6a2c", "--line": "#5f4514", "--stamp": "#ffb703", "--green": "#90be6d", "--glow": "rgba(255, 183, 3, 0.18)", "--font-body": MONO_STACK, "--font-display": MONO_STACK, "--font-clock": MONO_STACK, "--device-radius": "24px" } },
  { id: "lab", name: "White Lab", zh: "白色實驗室", desc: "白板、藍色標籤、乾淨資料儀器感", sample: "LAB", layout: "dense", family: "lab", vars: { "--outer": "#dbeafe", "--paper": "#ffffff", "--paper-deep": "#eff6ff", "--ink": "#102033", "--ink-soft": "#46627d", "--ink-faint": "#8aa2b8", "--line": "#bfdbfe", "--stamp": "#2563eb", "--green": "#059669", "--glow": "rgba(37, 99, 235, 0.12)", "--font-body": SANS_STACK, "--font-display": GEOMETRIC_STACK, "--font-clock": GEOMETRIC_STACK, "--device-radius": "12px" } },
  { id: "museum", name: "Museum Label", zh: "美術館標籤", desc: "展牆、編目、精品展覽文字秩序", sample: "ART", layout: "magazine", family: "museum", vars: { "--outer": "#1f1f1a", "--paper": "#f6f1e8", "--paper-deep": "#e5ddd0", "--ink": "#24221d", "--ink-soft": "#6a6258", "--ink-faint": "#9b9082", "--line": "#c8bca9", "--stamp": "#6f1d1b", "--green": "#356859", "--glow": "rgba(246, 241, 232, 0.12)", "--font-body": LUXURY_STACK, "--font-display": LUXURY_STACK, "--font-clock": LUXURY_STACK, "--device-radius": "0px" } },
  { id: "blueprint", name: "Blueprint Grid", zh: "藍圖工程", desc: "工程格線、白線標注、設計圖紙質感", sample: "PLAN", layout: "dense", family: "blueprint", vars: { "--outer": "#061b33", "--paper": "#0b2a4a", "--paper-deep": "#123d66", "--ink": "#d9f2ff", "--ink-soft": "#98d7ff", "--ink-faint": "#5e9cc3", "--line": "#5ab1ef", "--stamp": "#ffffff", "--green": "#7dd3fc", "--glow": "rgba(90, 177, 239, 0.16)", "--font-body": MONO_STACK, "--font-display": GEOMETRIC_STACK, "--font-clock": MONO_STACK, "--device-radius": "0px", "--texture-bg": "linear-gradient(rgba(255,255,255,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.08) 1px, transparent 1px)" } },
  { id: "racing", name: "Racing HUD", zh: "賽車儀表", desc: "斜切速度線、紅白黑儀表、性能感", sample: "RPM", layout: "split", family: "sport", vars: { "--outer": "#111111", "--paper": "#f5f5f5", "--paper-deep": "#e5e5e5", "--ink": "#111111", "--ink-soft": "#4b4b4b", "--ink-faint": "#8a8a8a", "--line": "#111111", "--stamp": "#e10600", "--green": "#00a676", "--glow": "rgba(225, 6, 0, 0.18)", "--font-body": GEOMETRIC_STACK, "--font-display": DISPLAY_STACK, "--font-clock": DISPLAY_STACK, "--device-radius": "4px" } },
  { id: "candy", name: "Candy Toy", zh: "糖果玩具", desc: "高彩度、泡泡卡片、活潑桌面小物感", sample: "POP", layout: "bento", family: "soft", vars: { "--outer": "#ffe5ec", "--paper": "#ffffff", "--paper-deep": "#ffc2d1", "--ink": "#3a0ca3", "--ink-soft": "#7209b7", "--ink-faint": "#b5179e", "--line": "#ffafcc", "--stamp": "#ff006e", "--green": "#00b4d8", "--glow": "rgba(255, 0, 110, 0.18)", "--font-body": ROUND_STACK, "--font-display": COMIC_STACK, "--font-clock": DISPLAY_STACK, "--device-radius": "24px" } }
];

const STYLE_VAR_KEYS = [...new Set(STYLE_DEFS.flatMap((style) => Object.keys(style.vars || {})))];

const LAYOUT_DEFS = [
  { id: "classic", zh: "經典三頁", desc: "時間、資訊與頁籤保持均衡。" },
  { id: "clock-max", zh: "大時間", desc: "把時間放到最大，適合桌面常駐。" },
  { id: "dense", zh: "資訊密集", desc: "降低留白，適合電腦或大螢幕。" },
  { id: "calm", zh: "極簡安靜", desc: "減少視覺刺激，適合長時間觀看。" },
  { id: "bento", zh: "Bento 卡片", desc: "用不規則卡片提高視覺層次。" },
  { id: "command", zh: "指揮中控", desc: "強化邊框、HUD 與監控感。" },
  { id: "magazine", zh: "雜誌分欄", desc: "像刊物版面一樣重視標題與欄線。" },
  { id: "poster", zh: "海報焦點", desc: "把時間和主題做成第一視覺。" },
  { id: "arcade", zh: "遊戲 HUD", desc: "像遊戲狀態列一樣活潑強烈。" },
  { id: "split", zh: "左右分割", desc: "時間與內容形成左右主從。" }
];

const CHARACTER_DEFS = [
  { id: "off", zh: "不要角色", desc: "保持純儀表板畫面。" },
  { id: "mixed", zh: "精選格鬥混戰", desc: "較精緻的街機格鬥素材混戰。" },
  { id: "brawler", zh: "街頭女拳手", desc: "Streets of Fight 玩家角色。" },
  { id: "punk", zh: "龐克敵手", desc: "Streets of Fight 敵方角色。" },
  { id: "queen", zh: "拳擊女王", desc: "Punching Queen 大尺寸動作。" },
  { id: "fistbot", zh: "拳擊機器人", desc: "Beat em up graphics pack 拳套機器人。" }
];

const BATTLE_MODE_DEFS = [
  { id: "interactive", zh: "桌面互動", desc: "角色會巡邏、推動資料卡、穿梭在頁面框線旁。" },
  { id: "spar", zh: "循環對戰", desc: "打出勝負後短暫慶祝，再重新開局，不會只剩一隻。" },
  { id: "patrol", zh: "陪伴巡邏", desc: "減少攻擊動作，適合長時間當桌面擺飾。" }
];

const frameRange = (from, to) => Array.from({ length: to - from + 1 }, (_, index) => from + index);
const FIGHTER_POOL = ["brawler", "punk", "queen", "fistbot"];
const FIGHTER_META = {
  brawler: {
    name: "Brawler Girl",
    accent: "#ff5a85",
    speed: 0.09,
    reach: 72,
    hp: 13,
    strike: 1.9,
    blast: 2.2,
    knockback: 22,
    scale: 0.92,
    smooth: true,
    sprites: {
      idle: { src: "assets/fighters/brawler-girl/idle.png", w: 96, h: 63, frames: frameRange(0, 3), fps: 6 },
      walk: { src: "assets/fighters/brawler-girl/walk.png", w: 96, h: 63, frames: frameRange(0, 9), fps: 12 },
      strike: { src: "assets/fighters/brawler-girl/punch.png", w: 96, h: 63, frames: frameRange(0, 2), fps: 14 },
      blast: { src: "assets/fighters/brawler-girl/kick.png", w: 96, h: 63, frames: frameRange(0, 4), fps: 14 },
      hurt: { src: "assets/fighters/brawler-girl/hurt.png", w: 96, h: 63, frames: frameRange(0, 1), fps: 7 },
      ko: { src: "assets/fighters/brawler-girl/hurt.png", w: 96, h: 63, frames: frameRange(0, 1), fps: 5 }
    }
  },
  punk: {
    name: "Enemy Punk",
    accent: "#7cffcb",
    speed: 0.082,
    reach: 70,
    hp: 12,
    strike: 1.8,
    blast: 1.7,
    knockback: 20,
    scale: 0.94,
    smooth: true,
    sprites: {
      idle: { src: "assets/fighters/enemy-punk/idle.png", w: 96, h: 63, frames: frameRange(0, 3), fps: 6 },
      walk: { src: "assets/fighters/enemy-punk/walk.png", w: 96, h: 63, frames: frameRange(0, 3), fps: 9 },
      strike: { src: "assets/fighters/enemy-punk/punch.png", w: 96, h: 63, frames: frameRange(0, 2), fps: 12 },
      blast: { src: "assets/fighters/enemy-punk/punch.png", w: 96, h: 63, frames: frameRange(0, 2), fps: 12 },
      hurt: { src: "assets/fighters/enemy-punk/hurt.png", w: 96, h: 63, frames: frameRange(0, 3), fps: 8 },
      ko: { src: "assets/fighters/enemy-punk/hurt.png", w: 96, h: 63, frames: frameRange(0, 3), fps: 6 }
    }
  },
  fistbot: {
    name: "Fist Bot",
    accent: "#53e7ff",
    speed: 0.086,
    reach: 64,
    hp: 12,
    strike: 1.7,
    blast: 2.1,
    knockback: 20,
    scale: 1.22,
    smooth: true,
    sprites: {
      idle: { src: "assets/fighters/fx/fistbot.png", w: 76, h: 58, frames: frameRange(0, 2), fps: 5 },
      walk: { src: "assets/fighters/fx/fistbot.png", w: 76, h: 58, frames: frameRange(0, 2), fps: 10 },
      strike: { src: "assets/fighters/fx/fistbot.png", w: 76, h: 58, frames: [4], fps: 1 },
      blast: { src: "assets/fighters/fx/fistbot.png", w: 76, h: 58, frames: [4], fps: 1 },
      hurt: { src: "assets/fighters/fx/fistbot.png", w: 76, h: 58, frames: [3], fps: 1 },
      ko: { src: "assets/fighters/fx/fistbot.png", w: 76, h: 58, frames: [3], fps: 1 }
    }
  },
  arcade: {
    name: "Renegade",
    accent: "#ffcf33",
    speed: 0.092,
    reach: 54,
    hp: 11,
    strike: 1.8,
    blast: 1.2,
    knockback: 17,
    scale: 3.1,
    sprites: {
      idle: { src: "assets/fighters/renegade/Renegade_Idle_1_strip4.png", w: 16, h: 32, frames: frameRange(0, 3), fps: 6 },
      walk: { src: "assets/fighters/renegade/Renegade_Walk_1_strip4.png", w: 16, h: 32, frames: frameRange(0, 3), fps: 9 },
      strike: { src: "assets/fighters/renegade/Renegade_Punch_1.png", w: 24, h: 32, frames: [0], fps: 1 },
      blast: { src: "assets/fighters/renegade/Renegade_Kick_1.png", w: 24, h: 32, frames: [0], fps: 1 },
      hurt: { src: "assets/fighters/renegade/Renegade_Hurt.png", w: 16, h: 32, frames: [0], fps: 1 },
      ko: { src: "assets/fighters/renegade/Renegade_Knock_Out.png", w: 24, h: 32, frames: [0], fps: 1 }
    }
  },
  energy: {
    name: "Ranger",
    accent: "#35e8ff",
    speed: 0.098,
    reach: 60,
    hp: 10,
    strike: 1.5,
    blast: 1.8,
    knockback: 19,
    scale: 3.1,
    sprites: {
      idle: { src: "assets/fighters/ranger/SMS_Ranger_Idle_1_strip4.png", w: 16, h: 32, frames: frameRange(0, 3), fps: 6 },
      walk: { src: "assets/fighters/ranger/SMS_Ranger_Walk_1_strip4.png", w: 16, h: 32, frames: frameRange(0, 3), fps: 9 },
      strike: { src: "assets/fighters/ranger/SMS_Ranger_Punch_1.png", w: 24, h: 32, frames: [0], fps: 1 },
      blast: { src: "assets/fighters/ranger/SMS_Ranger_Kick_1.png", w: 24, h: 32, frames: [0], fps: 1 },
      hurt: { src: "assets/fighters/ranger/SMS_Ranger_Hurt.png", w: 16, h: 32, frames: [0], fps: 1 },
      ko: { src: "assets/fighters/ranger/SMS_Ranger_KnockDown.png", w: 24, h: 32, frames: [0], fps: 1 }
    }
  },
  armor: {
    name: "NES Soldier",
    accent: "#7df9ff",
    speed: 0.07,
    reach: 66,
    hp: 15,
    strike: 2.1,
    blast: 1.4,
    knockback: 23,
    scale: 3.1,
    sprites: {
      idle: { src: "assets/fighters/soldier/NES_Soldier_Idle_1_strip4.png", w: 16, h: 32, frames: frameRange(0, 3), fps: 5 },
      walk: { src: "assets/fighters/soldier/NES_Soldier_Walk_1_strip4.png", w: 16, h: 32, frames: frameRange(0, 3), fps: 8 },
      strike: { src: "assets/fighters/soldier/NES_Soldier_Punch_1.png", w: 24, h: 32, frames: [0], fps: 1 },
      blast: { src: "assets/fighters/soldier/NES_Soldier_Kick_1.png", w: 24, h: 32, frames: [0], fps: 1 },
      hurt: { src: "assets/fighters/soldier/NES_Soldier_Hurt.png", w: 16, h: 32, frames: [0], fps: 1 },
      ko: { src: "assets/fighters/soldier/NES_Soldier_Death.png", w: 40, h: 32, frames: [0], fps: 1 }
    }
  },
  mystic: {
    name: "Kung Fu Man",
    accent: "#ff7df5",
    speed: 0.108,
    reach: 52,
    hp: 9,
    strike: 1.3,
    blast: 1.9,
    knockback: 18,
    scale: 3.3,
    sprites: {
      idle: { src: "assets/fighters/kungfu/GB_Kung_Fu_Man_Idle_EAST_strip4.png", w: 16, h: 24, frames: frameRange(0, 3), fps: 7 },
      walk: { src: "assets/fighters/kungfu/GB_Kung_Fu_Man_Walk_EAST_strip4.png", w: 16, h: 24, frames: frameRange(0, 3), fps: 10 },
      strike: { src: "assets/fighters/kungfu/GB_Kung_Fu_Man_AttackPunch_EAST.png", w: 16, h: 24, frames: [0], fps: 1 },
      blast: { src: "assets/fighters/kungfu/GB_Kung_Fu_Man_AttackKick_EAST.png", w: 16, h: 24, frames: [0], fps: 1 },
      hurt: { src: "assets/fighters/kungfu/GB_Kung_Fu_Man_HitHurt_EAST.png", w: 16, h: 24, frames: [0], fps: 1 },
      ko: { src: "assets/fighters/kungfu/GB_Kung_Fu_Man_HitHurt_EAST.png", w: 16, h: 24, frames: [0], fps: 1 }
    }
  },
  gladiator: {
    name: "Toby Orbon",
    accent: "#ff8a35",
    speed: 0.084,
    reach: 58,
    hp: 12,
    strike: 1.7,
    blast: 1.5,
    knockback: 18,
    scale: 3.05,
    sprites: {
      idle: { src: "assets/fighters/gladiator/Idle_East_StripSheet.png", w: 24, h: 32, frames: frameRange(0, 3), fps: 6 },
      walk: { src: "assets/fighters/gladiator/Walk_East_StripSheet.png", w: 24, h: 32, frames: frameRange(0, 3), fps: 9 },
      strike: { src: "assets/fighters/gladiator/Attack_East_frame_0.png", w: 24, h: 32, frames: [0], fps: 1 },
      blast: { src: "assets/fighters/gladiator/Attack_East_frame_0.png", w: 24, h: 32, frames: [0], fps: 1 },
      hurt: { src: "assets/fighters/gladiator/Hurt_East_frame_0.png", w: 24, h: 32, frames: [0], fps: 1 },
      ko: { src: "assets/fighters/gladiator/Hurt_East_frame_0.png", w: 24, h: 32, frames: [0], fps: 1 }
    }
  },
  queen: {
    name: "Punching Queen",
    accent: "#ff4f9a",
    speed: 0.078,
    reach: 76,
    hp: 13,
    strike: 2.1,
    blast: 2.4,
    knockback: 24,
    scale: 1.2,
    sprites: {
      idle: { src: "assets/fighters/fx/queen.png", w: 74, h: 75, frames: frameRange(0, 2), fps: 6 },
      walk: { src: "assets/fighters/fx/queen.png", w: 74, h: 75, frames: frameRange(0, 2), fps: 8 },
      strike: { src: "assets/fighters/fx/queen.png", w: 74, h: 75, frames: [9, 10, 11], fps: 12 },
      blast: { src: "assets/fighters/fx/queen.png", w: 74, h: 75, frames: [24, 25], fps: 10 },
      hurt: { src: "assets/fighters/fx/queen.png", w: 74, h: 75, frames: [3], fps: 1 },
      ko: { src: "assets/fighters/fx/queen.png", w: 74, h: 75, frames: frameRange(3, 8), fps: 8 }
    }
  }
};
const ARENA_W = 736;
const ARENA_H = 414;
const INTERACTION_ZONES = [
  { id: "clock", x: 492, y: 18, w: 214, h: 72, label: "TIME" },
  { id: "weather", x: 46, y: 166, w: 220, h: 86, label: "WEATHER" },
  { id: "calendar", x: 286, y: 164, w: 190, h: 72, label: "PLAN" },
  { id: "notes", x: 500, y: 154, w: 168, h: 100, label: "NOTE" },
  { id: "tabs", x: 58, y: 356, w: 260, h: 32, label: "TAB" }
];

const DEFAULT_PROFILES = [
  {
    id: "craig",
    name: "Craig",
    callName: "Craig",
    identity: "正在建立個人桌面系統",
    role: "個人桌面 · 待補完整資料",
    style: "paper",
    layout: "classic",
    enabledTabs: ["weather", "calendar", "countdown", "notes", "rhythm", "system", "briefing"],
    location: { label: "臺北市", latitude: 25.033, longitude: 121.5654, useDeviceLocation: true },
    dataUrl: "",
    battle: { enabled: false, count: 4, theme: "mixed", mode: "interactive" },
    events: [
      { title: "晨間整理", start: "08:40", end: "09:10", where: "Craig Desk" },
      { title: "論文與寫作", start: "10:00", end: "12:00", where: "Secondbrain" },
      { title: "Codex 工作整理", start: "15:00", end: "16:00", where: "Dashboard" },
      { title: "晚間收束", start: "21:30", end: "22:00", where: "Desk" }
    ],
    countdowns: [
      { title: "Dashboard 上線", date: "2026-05-04" },
      { title: "年底 / Year End", date: "2026-12-31" },
      { title: "生日", date: "1994-07-18", repeat: true },
      { title: "博士論文節點", date: "2026-12-31" }
    ],
    notes: [
      { title: "今日主軸", body: "先整理個人資料，再把固定資訊做成可共用的設定檔。" },
      { title: "資料狀態", body: "天氣即時讀取；行事曆與倒數日先以本機設定儲存。" },
      { title: "下一步", body: "提供個人資料後，可直接寫入 Craig 預設設定檔並重新部署。" }
    ],
    rhythms: [
      { title: "喝水", meta: "每 90 分鐘", value: "4/8" },
      { title: "伸展", meta: "肩頸與手腕", value: "2 次" },
      { title: "深度工作", meta: "無通知區段", value: "2h" }
    ],
    briefings: [
      "今天先讓桌面保持可看、可用、可長時間開著。",
      "重要資訊放在時間旁，瑣碎資訊放到輪播頁。",
      "資料與風格可以換，但閱讀清楚永遠優先。"
    ]
  },
  {
    id: "guest",
    name: "Guest",
    callName: "Guest",
    identity: "共用展示使用者",
    role: "共用展示 · 可複製成同事設定檔",
    style: "ocean",
    layout: "classic",
    enabledTabs: ["weather", "calendar", "notes", "system"],
    location: { label: "臺北市", latitude: 25.033, longitude: 121.5654, useDeviceLocation: false },
    dataUrl: "",
    battle: { enabled: false, count: 3, theme: "mixed", mode: "patrol" },
    events: [
      { title: "團隊晨會", start: "09:30", end: "10:00", where: "Meeting" },
      { title: "專案檢查", start: "14:00", end: "15:00", where: "Workspace" },
      { title: "回報整理", start: "17:00", end: "17:30", where: "Desk" }
    ],
    countdowns: [
      { title: "月報截止", date: "2026-05-31" },
      { title: "季末檢討", date: "2026-06-30" }
    ],
    notes: [
      { title: "展示用設定檔", body: "可在設定修改後，成為任一同事的個人儀表板。" },
      { title: "共用原則", body: "每個瀏覽器各自儲存，不會寫回其他人的設定。" }
    ],
    rhythms: [
      { title: "會議", meta: "上午優先", value: "1" },
      { title: "回覆", meta: "集中處理", value: "2 批" }
    ],
    briefings: [
      "這是共用展示設定檔，可複製後改成同事版本。",
      "先確認頁面組合，再調整風格與資料。",
      "若長時間常駐，建議開啟陪伴巡邏模式。"
    ]
  }
];

let profiles = [];
let selectedProfileId = "";
let activeProfile = null;
let activeTabs = ["weather", "calendar", "countdown", "notes"];
let activeIndex = 0;
let panelStartedAt = Date.now();
let weatherTimer = null;
let burnTimer = null;
let weatherRequestId = 0;
let lastDateKey = "";
let lastCalendarMinuteKey = "";
let arenaFrame = null;
let arenaState = null;
const fighterImages = {};

function $(selector) {
  return document.querySelector(selector);
}

function $all(selector) {
  return [...document.querySelectorAll(selector)];
}

function pad(value) {
  return String(value).padStart(2, "0");
}

function clone(value) {
  return JSON.parse(JSON.stringify(value));
}

function getWeekNumber(date) {
  const copy = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
  const dayNum = copy.getUTCDay() || 7;
  copy.setUTCDate(copy.getUTCDate() + 4 - dayNum);
  const yearStart = new Date(Date.UTC(copy.getUTCFullYear(), 0, 1));
  return Math.ceil((((copy - yearStart) / 86400000) + 1) / 7);
}

function readProfiles() {
  try {
    const stored = JSON.parse(localStorage.getItem(STORAGE_PROFILES) || "[]");
    if (Array.isArray(stored) && stored.length) return stored.map(normalizeProfile);
  } catch {
    // Fall through to defaults.
  }
  return clone(DEFAULT_PROFILES).map(normalizeProfile);
}

function normalizeProfile(profile) {
  const fallback = clone(DEFAULT_PROFILES.find((item) => item.id === profile.id) || DEFAULT_PROFILES[0]);
  const availableThemes = new Set(CHARACTER_DEFS.filter((item) => item.id !== "off").map((item) => item.id));
  const availableModes = new Set(BATTLE_MODE_DEFS.map((item) => item.id));
  const battle = { ...fallback.battle, ...(profile.battle || {}) };
  if (!availableThemes.has(battle.theme)) battle.theme = fallback.battle?.theme || "mixed";
  if (!availableModes.has(battle.mode)) battle.mode = fallback.battle?.mode || "interactive";
  return {
    ...fallback,
    ...profile,
    callName: profile.callName || profile.name || fallback.callName,
    identity: profile.identity || fallback.identity || "",
    enabledTabs: Array.isArray(profile.enabledTabs) && profile.enabledTabs.length ? profile.enabledTabs : fallback.enabledTabs,
    location: { ...fallback.location, ...(profile.location || {}) },
    dataUrl: profile.dataUrl || "",
    layout: profile.layout || fallback.layout || "classic",
    battle,
    events: Array.isArray(profile.events) ? profile.events : fallback.events,
    countdowns: Array.isArray(profile.countdowns) ? profile.countdowns : fallback.countdowns,
    notes: Array.isArray(profile.notes) ? profile.notes : fallback.notes,
    rhythms: Array.isArray(profile.rhythms) ? profile.rhythms : fallback.rhythms,
    briefings: Array.isArray(profile.briefings) ? profile.briefings : fallback.briefings
  };
}

function saveProfiles() {
  localStorage.setItem(STORAGE_PROFILES, JSON.stringify(profiles));
  localStorage.setItem(STORAGE_SELECTED, selectedProfileId);
}

function getProfile(id = selectedProfileId) {
  return profiles.find((profile) => profile.id === id) || profiles[0];
}

function getStyle(id) {
  return STYLE_DEFS.find((style) => style.id === id) || STYLE_DEFS[0];
}

function getLayout(id) {
  return LAYOUT_DEFS.find((layout) => layout.id === id) || LAYOUT_DEFS[0];
}

function stylePreviewVars(style) {
  const vars = style.vars || {};
  const font = String(vars["--font-display"] || SERIF_STACK).replaceAll('"', "'");
  return [
    `--sample-bg:${vars["--paper"] || "#f1ebdc"}`,
    `--sample-deep:${vars["--paper-deep"] || "#e8e0cc"}`,
    `--sample-color:${vars["--ink"] || "#2a2520"}`,
    `--sample-accent:${vars["--stamp"] || "#a0382e"}`,
    `--sample-font:${font}`
  ].join(";");
}

function hexToRgb(value) {
  const hex = String(value || "").trim().replace("#", "");
  if (!/^[0-9a-f]{6}$/i.test(hex)) return null;
  return {
    r: parseInt(hex.slice(0, 2), 16),
    g: parseInt(hex.slice(2, 4), 16),
    b: parseInt(hex.slice(4, 6), 16)
  };
}

function rgbToHex({ r, g, b }) {
  return `#${[r, g, b].map((item) => Math.round(clamp(item, 0, 255)).toString(16).padStart(2, "0")).join("")}`;
}

function relativeLuminance(color) {
  const channel = (value) => {
    const ratio = value / 255;
    return ratio <= 0.03928 ? ratio / 12.92 : ((ratio + 0.055) / 1.055) ** 2.4;
  };
  return 0.2126 * channel(color.r) + 0.7152 * channel(color.g) + 0.0722 * channel(color.b);
}

function contrastRatio(a, b) {
  const light = Math.max(relativeLuminance(a), relativeLuminance(b));
  const dark = Math.min(relativeLuminance(a), relativeLuminance(b));
  return (light + 0.05) / (dark + 0.05);
}

function mixRgb(a, b, weight) {
  return {
    r: a.r * weight + b.r * (1 - weight),
    g: a.g * weight + b.g * (1 - weight),
    b: a.b * weight + b.b * (1 - weight)
  };
}

function readableColor(baseColor, paperColor, targetRatio, fallbackWeight) {
  const base = hexToRgb(baseColor);
  const paper = hexToRgb(paperColor);
  if (!base || !paper || contrastRatio(base, paper) >= targetRatio) return baseColor;
  const black = { r: 0, g: 0, b: 0 };
  const white = { r: 255, g: 255, b: 255 };
  const anchor = contrastRatio(black, paper) > contrastRatio(white, paper) ? black : white;
  for (let weight = fallbackWeight; weight <= 1; weight += 0.08) {
    const candidate = mixRgb(anchor, base, weight);
    if (contrastRatio(candidate, paper) >= targetRatio) return rgbToHex(candidate);
  }
  return rgbToHex(anchor);
}

function getCallName() {
  return activeProfile?.callName || activeProfile?.name || "Guest";
}

function randomBetween(min, max) {
  return min + Math.random() * (max - min);
}

function clamp(value, min, max) {
  return Math.max(min, Math.min(max, value));
}

function fighterLimit() {
  const lowPower = navigator.hardwareConcurrency && navigator.hardwareConcurrency <= 4;
  const compact = Math.min(window.innerWidth, window.innerHeight) < 520;
  return lowPower || compact ? 4 : 6;
}

function setScale() {
  const scale = Math.min(window.innerWidth / 736, window.innerHeight / 414);
  document.documentElement.style.setProperty("--scale", String(scale));
}

function buildClock() {
  for (const group of $all("[data-clock]")) {
    const small = group.classList.contains("sec");
    group.innerHTML = "00".split("").map((digit) => (
      `<div class="flip-card${small ? " sec" : ""}">
        <div class="flip-half top"><span>${digit}</span></div>
        <div class="flip-half bottom"><span>${digit}</span></div>
      </div>`
    )).join("");
  }
}

function setDigits(kind, value) {
  const group = document.querySelector(`[data-clock="${kind}"]`);
  if (!group) return;
  const digits = value.split("");
  group.querySelectorAll(".flip-card").forEach((card, index) => {
    const current = card.dataset.digit;
    const next = digits[index];
    if (current === next) return;
    card.dataset.digit = next;
    card.querySelectorAll(".flip-half span").forEach((span) => {
      span.textContent = next;
    });
  });
}

function tick() {
  const now = new Date();
  const dateKey = `${getCallName()}-${now.getFullYear()}-${now.getMonth()}-${now.getDate()}-${now.getDay()}`;
  if (dateKey !== lastDateKey) {
    $("#eraLine").textContent = `${getCallName()} · A.D. ${now.getFullYear()} · ${MONTHS[now.getMonth()]}`;
    $("#dateNum").innerHTML = `${now.getMonth() + 1}<span class="slash">/</span>${now.getDate()}`;
    $("#weekday").textContent = WEEKDAYS_ZH[now.getDay()];
    $("#weekLine").textContent = `${WEEKDAYS_EN[now.getDay()]} · week ${getWeekNumber(now)}`;
    lastDateKey = dateKey;
  }
  setDigits("hh", pad(now.getHours()));
  setDigits("mm", pad(now.getMinutes()));
  setDigits("ss", pad(now.getSeconds()));
  const calendarMinuteKey = `${activeProfile?.id || ""}-${now.getFullYear()}-${now.getMonth()}-${now.getDate()}-${now.getHours()}-${now.getMinutes()}`;
  if (calendarMinuteKey !== lastCalendarMinuteKey) {
    renderCalendar();
    lastCalendarMinuteKey = calendarMinuteKey;
  }
  renderProgress();
}

function layoutPreviewMarkup(layoutId) {
  return `<span class="layout-preview layout-preview-${layoutId}" aria-hidden="true">
    <i></i><b></b><em></em><u></u>
  </span>`;
}

function updateWelcomeActiveStates() {
  $all("[data-style]").forEach((button) => {
    button.classList.toggle("active", button.dataset.style === activeProfile.style);
  });
  $all("[data-layout]").forEach((button) => {
    button.classList.toggle("active", button.dataset.layout === activeProfile.layout);
  });
  $all("#pagePicker input").forEach((input) => {
    input.closest(".page-option")?.classList.toggle("active", input.checked);
  });
  const battle = activeProfile.battle || {};
  const characterMode = battle.enabled ? (battle.theme || "mixed") : "off";
  $all("[data-character]").forEach((button) => {
    button.classList.toggle("active", button.dataset.character === characterMode);
  });
  $all("[data-battle-mode]").forEach((button) => {
    button.classList.toggle("active", button.dataset.battleMode === (battle.mode || "interactive"));
  });
}

function renderWelcome() {
  $("#identityCard").innerHTML = `<div>
    <span>${activeProfile.name || "未命名"}</span>
    <strong>${getCallName()}</strong>
    <p>${activeProfile.identity || activeProfile.role || "請記錄這位使用者是誰。"}</p>
  </div>`;
  $("#welcomeNameInput").value = activeProfile.name || "";
  $("#welcomeCallNameInput").value = activeProfile.callName || activeProfile.name || "";
  $("#welcomeIdentityInput").value = activeProfile.identity || "";

  $("#profileGrid").innerHTML = profiles.map((profile) => {
    const style = getStyle(profile.style);
    const pages = profile.enabledTabs.map((id) => PAGE_DEFS.find((page) => page.id === id)?.short).filter(Boolean).join(" / ");
    return `<button class="profile-card${profile.id === selectedProfileId ? " active" : ""}" data-profile="${profile.id}" type="button">
      <span>${profile.name}</span>
      <strong>${profile.role || "個人設定檔"}</strong>
      <small>${style.zh} · ${pages}</small>
    </button>`;
  }).join("");

  $("#pagePicker").innerHTML = PAGE_DEFS.map((page) => {
    const checked = activeProfile.enabledTabs.includes(page.id);
    return `<label class="page-option${checked ? " active" : ""}">
      <input type="checkbox" value="${page.id}" ${checked ? "checked" : ""}>
      <span>${page.label}</span>
      <small>${page.desc}</small>
    </label>`;
  }).join("");

  $("#styleGrid").innerHTML = STYLE_DEFS.map((style) => {
    const layout = getLayout(style.layout);
    return `<button class="style-card${activeProfile.style === style.id ? " active" : ""}" data-style="${style.id}" style="${stylePreviewVars(style)}" type="button">
      <span class="style-sample">${style.sample}</span>
      <strong>${style.zh}</strong>
      <small>${style.desc}</small>
      <em>${layout.zh}</em>
    </button>`;
  }).join("");

  $("#layoutGrid").innerHTML = LAYOUT_DEFS.map((layout) => (
    `<button class="layout-card${activeProfile.layout === layout.id ? " active" : ""}" data-layout="${layout.id}" type="button">
      ${layoutPreviewMarkup(layout.id)}
      <strong>${layout.zh}</strong>
      <small>${layout.desc}</small>
    </button>`
  )).join("");

  const battle = activeProfile.battle || {};
  const characterMode = battle.enabled ? (battle.theme || "mixed") : "off";
  $("#characterPicker").innerHTML = `
    <div class="character-grid">
      ${CHARACTER_DEFS.map((character) => (
        `<button class="character-card${characterMode === character.id ? " active" : ""}" data-character="${character.id}" type="button">
          <span class="character-sample character-${character.id}"></span>
          <strong>${character.zh}</strong>
          <small>${character.desc}</small>
        </button>`
      )).join("")}
    </div>
    <div class="character-count">
      <label>角色數量
        <input id="welcomeBattleCountInput" type="number" min="2" max="6" step="1" value="${Math.max(2, Math.min(6, Number(battle.count) || 3))}">
      </label>
    </div>
    <div class="battle-mode-grid">
      ${BATTLE_MODE_DEFS.map((mode) => (
        `<button class="battle-mode-card${(battle.mode || "interactive") === mode.id ? " active" : ""}" data-battle-mode="${mode.id}" type="button">
          <strong>${mode.zh}</strong>
          <small>${mode.desc}</small>
        </button>`
      )).join("")}
    </div>`;

  $all("[data-profile]").forEach((button) => {
    button.addEventListener("click", () => {
      selectedProfileId = button.dataset.profile;
      activeProfile = getProfile();
      applyProfile();
      renderWelcome();
    });
  });

  $all("#pagePicker input").forEach((input) => {
    input.addEventListener("change", () => {
      const checked = $all("#pagePicker input:checked").map((item) => item.value);
      activeProfile.enabledTabs = checked.length ? checked : ["weather"];
      if (!checked.length) {
        const weatherInput = $('#pagePicker input[value="weather"]');
        if (weatherInput) weatherInput.checked = true;
      }
      activeTabs = [...activeProfile.enabledTabs];
      if (activeIndex >= activeTabs.length) activeIndex = 0;
      updateActiveProfile();
      renderTabs();
      setPanel(activeIndex);
      updateWelcomeActiveStates();
    });
  });

  $all("[data-style]").forEach((button) => {
    button.addEventListener("click", () => {
      const style = getStyle(button.dataset.style);
      activeProfile.style = style.id;
      activeProfile.layout = activeProfile.layout || style.layout || "classic";
      updateActiveProfile();
      applyTheme();
      updateWelcomeActiveStates();
    });
  });

  $all("[data-layout]").forEach((button) => {
    button.addEventListener("click", () => {
      activeProfile.layout = button.dataset.layout;
      updateActiveProfile();
      applyTheme();
      updateWelcomeActiveStates();
    });
  });

  $all("[data-character]").forEach((button) => {
    button.addEventListener("click", () => {
      const character = button.dataset.character;
      activeProfile.battle = {
        ...(activeProfile.battle || {}),
        enabled: character !== "off",
        theme: character === "off" ? "mixed" : character,
        count: Math.max(2, Math.min(6, Number($("#welcomeBattleCountInput")?.value) || activeProfile.battle?.count || 3)),
        mode: activeProfile.battle?.mode || "interactive"
      };
      updateActiveProfile();
      renderArena();
      updateWelcomeActiveStates();
    });
  });

  $all("[data-battle-mode]").forEach((button) => {
    button.addEventListener("click", () => {
      activeProfile.battle = {
        ...(activeProfile.battle || {}),
        enabled: true,
        mode: button.dataset.battleMode || "interactive"
      };
      updateActiveProfile();
      renderArena();
      updateWelcomeActiveStates();
    });
  });

  $("#welcomeBattleCountInput")?.addEventListener("change", (event) => {
    activeProfile.battle = {
      ...(activeProfile.battle || {}),
      count: Math.max(2, Math.min(6, Number(event.target.value) || 3))
    };
    updateActiveProfile();
    renderArena();
    updateWelcomeActiveStates();
  });
}

function showWelcome() {
  $("#welcomeScreen").classList.add("active");
  renderArena();
}

function hideWelcome() {
  $("#welcomeScreen").classList.remove("active");
  panelStartedAt = Date.now();
  renderArena();
}

function createProfile() {
  const base = clone(activeProfile || DEFAULT_PROFILES[0]);
  base.id = `profile-${Date.now()}`;
  base.name = "新設定檔";
  base.callName = "新朋友";
  base.identity = "請記錄這位使用者是誰";
  base.role = "請在設定填入使用者資料";
  profiles.push(base);
  selectedProfileId = base.id;
  activeProfile = base;
  saveProfiles();
  applyProfile();
  renderWelcome();
  openConfig();
}

function updateActiveProfile() {
  const index = profiles.findIndex((profile) => profile.id === activeProfile.id);
  if (index >= 0) profiles[index] = activeProfile;
  saveProfiles();
}

function applyTheme() {
  const style = getStyle(activeProfile.style || "paper");
  STYLE_VAR_KEYS.forEach((key) => document.body.style.removeProperty(key));
  Object.entries(style.vars || {}).forEach(([key, value]) => document.body.style.setProperty(key, value));
  const paper = style.vars?.["--paper"] || "#f1ebdc";
  const paperDeep = style.vars?.["--paper-deep"] || paper;
  const ink = style.vars?.["--ink"] || "#2a2520";
  document.body.style.setProperty("--ink", readableColor(ink, paper, 7, 0.72));
  document.body.style.setProperty("--ink-soft", readableColor(style.vars?.["--ink-soft"] || ink, paper, 4.8, 0.58));
  document.body.style.setProperty("--ink-faint", readableColor(style.vars?.["--ink-faint"] || ink, paper, 3.8, 0.42));
  document.body.style.setProperty("--panel-readable", readableColor(style.vars?.["--ink-soft"] || ink, paperDeep, 4.5, 0.58));
  document.body.dataset.style = style.id;
  document.body.dataset.styleFamily = style.family || "paper";
  document.body.dataset.layout = activeProfile.layout || style.layout || "classic";
  document.title = `${getCallName()} Dashboard`;
}

function applyProfile() {
  activeProfile = getProfile();
  selectedProfileId = activeProfile.id;
  activeTabs = activeProfile.enabledTabs?.length ? [...activeProfile.enabledTabs] : ["weather"];
  if (activeIndex >= activeTabs.length) activeIndex = 0;
  applyTheme();
  renderTabs();
  setPanel(activeIndex);
  lastDateKey = "";
  lastCalendarMinuteKey = "";
  renderCalendar();
  renderCountdowns();
  renderNotes();
  renderRhythm();
  renderSystem();
  renderBriefing();
  renderArena();
  loadWeather();
  saveProfiles();
}

function renderTabs() {
  $("#tabs").innerHTML = activeTabs.map((id, index) => {
    const page = PAGE_DEFS.find((item) => item.id === id);
    return `<button class="tab${index === activeIndex ? " active" : ""}" data-tab="${id}" type="button">${page?.short || id}</button>`;
  }).join("");
  $all(".tab").forEach((tab) => {
    tab.addEventListener("click", () => setPanel(activeTabs.indexOf(tab.dataset.tab)));
  });
}

function stopArena() {
  if (arenaFrame) cancelAnimationFrame(arenaFrame);
  arenaFrame = null;
  arenaState = null;
  $("#arenaLayer").innerHTML = "";
}

function actionPreference(type) {
  return FIGHTER_META[type].reach * 0.68;
}

function getSpriteImage(src) {
  if (!fighterImages[src]) {
    const image = new Image();
    image.decoding = "async";
    image.src = src;
    fighterImages[src] = image;
  }
  return fighterImages[src];
}

function preloadFighterSprites(types) {
  const files = new Set();
  types.forEach((type) => {
    const meta = FIGHTER_META[type];
    Object.values(meta.sprites).forEach((sprite) => files.add(sprite.src));
  });
  files.add("assets/fighters/fx/hitspark.png");
  files.forEach(getSpriteImage);
}

function createFighter(index, theme, count) {
  const type = theme === "mixed" ? FIGHTER_POOL[index % FIGHTER_POOL.length] : theme;
  const meta = FIGHTER_META[type];
  const lane = index / Math.max(1, count - 1);
  const x = 86 + lane * (ARENA_W - 172);
  const y = randomBetween(116, ARENA_H - 54);
  return {
    id: index,
    type,
    x,
    y,
    vx: 0,
    vy: 0,
    face: index % 2 ? -1 : 1,
    targetX: ARENA_W / 2,
    targetY: ARENA_H / 2,
    state: "walk",
    actionStarted: 0,
    actionUntil: 0,
    cooldown: randomBetween(420, 980),
    frameOffset: randomBetween(0, 400),
    behaviorUntil: 0,
    zone: null,
    carryUntil: 0,
    hideUntil: 0,
    hitStarted: 0,
    hitUntil: 0,
    sparkUntil: 0,
    sparkX: x,
    sparkY: y,
    exitUntil: 0,
    alive: true,
    hp: meta.hp,
    maxHp: meta.hp,
    respawnAt: 0
  };
}

function startArena(count, theme, mode = activeProfile.battle?.mode || "interactive") {
  const arena = $("#arenaLayer");
  const canvas = document.createElement("canvas");
  canvas.className = "arena-canvas";
  canvas.width = ARENA_W;
  canvas.height = ARENA_H;
  arena.innerHTML = "";
  arena.appendChild(canvas);

  const ctx = canvas.getContext("2d", { alpha: true });
  ctx.imageSmoothingEnabled = true;
  const fighters = Array.from({ length: count }, (_, index) => createFighter(index, theme, count));
  const css = getComputedStyle(document.body);
  arenaState = {
    key: `${count}-${theme}-${mode}`,
    mode,
    canvas,
    ctx,
    colors: {
      paper: css.getPropertyValue("--paper").trim() || "#f1ebdc",
      panel: css.getPropertyValue("--paper-deep").trim() || "#e8e0cc",
      ink: css.getPropertyValue("--ink").trim() || "#2a2520",
      line: css.getPropertyValue("--line").trim() || "#cdc3ae"
    },
    last: performance.now(),
    winnerId: null,
    finishedAt: 0,
    fighters
  };
  preloadFighterSprites(fighters.map((fighter) => fighter.type));
  arenaFrame = requestAnimationFrame(stepArena);
}

function nearestOpponent(fighter, fighters) {
  let best = null;
  let bestDistance = Infinity;
  for (const candidate of fighters) {
    if (candidate.id === fighter.id || !candidate.alive) continue;
    const dx = candidate.x - fighter.x;
    const dy = candidate.y - fighter.y;
    const distance = Math.hypot(dx, dy);
    if (distance < bestDistance) {
      best = candidate;
      bestDistance = distance;
    }
  }
  return { target: best, distance: bestDistance };
}

function livingFighters(fighters) {
  return fighters.filter((fighter) => fighter.alive);
}

function eliminateFighter(fighter, now, angle) {
  fighter.alive = false;
  fighter.state = "ko";
  fighter.actionStarted = now;
  fighter.actionUntil = now + 640;
  fighter.exitUntil = now + 640;
  fighter.hitStarted = now;
  fighter.hitUntil = now + 640;
  fighter.respawnAt = now + 2600;
  fighter.vx = Math.cos(angle) * 18;
  fighter.vy = Math.sin(angle) * 9;
}

function reviveFighter(fighter, index, count) {
  const meta = FIGHTER_META[fighter.type];
  const lane = index / Math.max(1, count - 1);
  fighter.x = 74 + lane * (ARENA_W - 148);
  fighter.y = randomBetween(142, ARENA_H - 50);
  fighter.vx = 0;
  fighter.vy = 0;
  fighter.face = index % 2 ? -1 : 1;
  fighter.state = "walk";
  fighter.actionUntil = 0;
  fighter.cooldown = randomBetween(380, 980);
  fighter.hitUntil = 0;
  fighter.sparkUntil = 0;
  fighter.carryUntil = 0;
  fighter.hideUntil = 0;
  fighter.alive = true;
  fighter.hp = meta.hp;
  fighter.maxHp = meta.hp;
  fighter.respawnAt = 0;
}

function reviveArena(now) {
  if (!arenaState) return;
  arenaState.fighters.forEach((fighter, index) => reviveFighter(fighter, index, arenaState.fighters.length));
  arenaState.winnerId = null;
  arenaState.finishedAt = 0;
  arenaState.last = now;
}

function chooseInteractionTarget(fighter, now) {
  const zone = INTERACTION_ZONES[(fighter.id + Math.floor(now / 4200)) % INTERACTION_ZONES.length];
  fighter.zone = zone;
  fighter.targetX = clamp(zone.x + zone.w * randomBetween(0.18, 0.82), 48, ARENA_W - 48);
  fighter.targetY = clamp(zone.y + zone.h + randomBetween(20, 48), 76, ARENA_H - 28);
  fighter.behaviorUntil = now + randomBetween(2600, 5200);
  fighter.carryUntil = now + randomBetween(1200, 2600);
  fighter.hideUntil = now + randomBetween(1600, 3400);
}

function updateAmbientFighter(fighter, dt, now, mode) {
  if (now > fighter.behaviorUntil || Math.hypot(fighter.targetX - fighter.x, fighter.targetY - fighter.y) < 18) {
    if (mode === "interactive" && Math.random() < 0.72) chooseInteractionTarget(fighter, now);
    else {
      fighter.zone = null;
      fighter.targetX = randomBetween(58, ARENA_W - 58);
      fighter.targetY = randomBetween(112, ARENA_H - 40);
      fighter.behaviorUntil = now + randomBetween(2400, 5200);
      fighter.carryUntil = 0;
      fighter.hideUntil = 0;
    }
  }

  const dx = fighter.targetX - fighter.x;
  const dy = fighter.targetY - fighter.y;
  const distanceToTarget = Math.max(1, Math.hypot(dx, dy));
  const speed = FIGHTER_META[fighter.type].speed * dt * (mode === "patrol" ? 0.64 : 0.78);
  fighter.vx += (dx / distanceToTarget) * speed;
  fighter.vy += (dy / distanceToTarget) * speed;
  fighter.vx *= 0.76;
  fighter.vy *= 0.76;
  fighter.x = clamp(fighter.x + fighter.vx, 40, ARENA_W - 48);
  fighter.y = clamp(fighter.y + fighter.vy, 72, ARENA_H - 28);
  if (Math.abs(fighter.vx) > 0.04) fighter.face = fighter.vx > 0 ? 1 : -1;
  fighter.state = now < fighter.carryUntil && mode === "interactive" ? "carry" : "walk";
}

function updateFighter(fighter, fighters, dt, now) {
  const mode = arenaState?.mode || "interactive";
  if (!fighter.alive) {
    fighter.vx *= 0.86;
    fighter.vy *= 0.86;
    fighter.x = clamp(fighter.x + fighter.vx, 32, ARENA_W - 32);
    fighter.y = clamp(fighter.y + fighter.vy, 74, ARENA_H - 22);
    if (mode === "spar" && now > fighter.respawnAt && arenaState?.finishedAt && now - arenaState.finishedAt > 2800) {
      reviveArena(now);
    }
    return;
  }

  const meta = FIGHTER_META[fighter.type];
  if (mode === "patrol") {
    updateAmbientFighter(fighter, dt, now, mode);
    return;
  }

  const living = livingFighters(fighters);
  if (living.length <= 1) {
    arenaState.winnerId = fighter.id;
    if (!arenaState.finishedAt) arenaState.finishedAt = now;
    if (mode === "spar" && now - arenaState.finishedAt > 2800) {
      reviveArena(now);
      return;
    }
    if (mode === "interactive") {
      updateAmbientFighter(fighter, dt, now, mode);
      return;
    }
    fighter.state = "walk";
    fighter.vx *= 0.74;
    fighter.vy *= 0.74;
    return;
  }

  if (mode === "interactive" && Math.random() < 0.018 && now > fighter.actionUntil) {
    updateAmbientFighter(fighter, dt, now, mode);
    return;
  }

  fighter.cooldown = Math.max(0, fighter.cooldown - dt);
  const acting = now < fighter.actionUntil;
  const { target, distance } = nearestOpponent(fighter, fighters);
  if (!target) return;

  if (!acting && distance < meta.reach && fighter.cooldown <= 0) {
    const action = Math.random() > 0.42 ? "strike" : "blast";
    fighter.state = action;
    fighter.actionStarted = now;
    fighter.actionUntil = now + (action === "blast" ? 520 : 360);
    fighter.cooldown = randomBetween(620, 1220);
    fighter.face = target.x >= fighter.x ? 1 : -1;

    const damage = action === "blast" ? meta.blast : meta.strike;
    const force = action === "blast" ? meta.knockback * 1.3 : meta.knockback;
    const angle = Math.atan2(target.y - fighter.y, target.x - fighter.x);
    target.vx += Math.cos(angle) * force;
    target.vy += Math.sin(angle) * force * 0.58;
    target.state = "hurt";
    target.hitStarted = now;
    target.hitUntil = now + 260;
    target.sparkUntil = now + 180;
    target.sparkX = target.x - Math.cos(angle) * 14;
    target.sparkY = target.y - FIGHTER_META[target.type].sprites.idle.h * FIGHTER_META[target.type].scale * 0.58;
    target.hp = Math.max(mode === "interactive" ? 1 : 0, target.hp - damage);
    if (target.hp <= 0) {
      eliminateFighter(target, now, angle);
    }
    return;
  }

  const side = target.x >= fighter.x ? -1 : 1;
  const preferred = actionPreference(fighter.type);
  fighter.targetX = target.x + side * preferred;
  fighter.targetY = target.y + Math.sin(now / 520 + fighter.id) * 22;

  if (distance < 36) fighter.targetX = fighter.x - side * 42;

  const dx = fighter.targetX - fighter.x;
  const dy = fighter.targetY - fighter.y;
  const distanceToTarget = Math.max(1, Math.hypot(dx, dy));
  const speed = meta.speed * dt * (acting ? 0.35 : 1);
  fighter.vx += (dx / distanceToTarget) * speed;
  fighter.vy += (dy / distanceToTarget) * speed;
  fighter.vx *= 0.78;
  fighter.vy *= 0.78;
  fighter.x = clamp(fighter.x + fighter.vx, 40, ARENA_W - 48);
  fighter.y = clamp(fighter.y + fighter.vy, 64, ARENA_H - 28);
  if (Math.abs(fighter.vx) > 0.04) fighter.face = fighter.vx > 0 ? 1 : -1;
  if (!acting && now > fighter.hitUntil) fighter.state = "walk";
}

function fighterSprite(fighter, now) {
  const acting = now < fighter.actionUntil;
  const hit = now < fighter.hitUntil;
  const meta = FIGHTER_META[fighter.type];
  if (!fighter.alive) return meta.sprites.ko;
  if (hit) return meta.sprites.hurt;
  if (acting) return meta.sprites[fighter.state === "blast" ? "blast" : "strike"];
  if (arenaState?.winnerId === fighter.id && livingFighters(arenaState.fighters).length === 1) {
    return meta.sprites.blast;
  }
  if (fighter.state === "carry") return meta.sprites.strike;
  if (Math.hypot(fighter.vx, fighter.vy) > 0.3) return meta.sprites.walk;
  return meta.sprites.idle;
}

function drawSprite(ctx, sprite, x, y, scale, frameIndex, face, opacity = 1) {
  const image = getSpriteImage(sprite.src);
  if (!image.complete || !image.naturalWidth) return;
  const frame = sprite.frames[frameIndex % sprite.frames.length] || 0;
  const width = sprite.w;
  const height = sprite.h;
  const sx = frame * width;
  const sy = 0;

  ctx.save();
  ctx.globalAlpha = opacity;
  ctx.translate(x, y);
  ctx.scale(face, 1);
  ctx.drawImage(image, sx, sy, width, height, -width * scale * 0.5, -height * scale, width * scale, height * scale);
  ctx.restore();
}

function drawFighter(ctx, fighter, now) {
  const meta = FIGHTER_META[fighter.type];
  const sprite = fighterSprite(fighter, now);
  const defeatedFade = fighter.alive ? 1 : clamp((fighter.exitUntil - now) / 640, 0, 1);
  if (!fighter.alive && defeatedFade <= 0.02) return;

  const frameIndex = Math.floor((now + fighter.frameOffset) / (1000 / (sprite.fps || 8)));
  const bob = fighter.alive ? Math.sin((now + fighter.frameOffset) / 140) * 1.6 : 0;
  const scale = meta.scale * (now < fighter.actionUntil ? 1.06 : 1);
  const actionLean = now < fighter.actionUntil ? fighter.face * 5 : 0;

  ctx.save();
  ctx.globalAlpha = 0.26 * defeatedFade;
  ctx.fillStyle = "#000";
  ctx.beginPath();
  ctx.ellipse(fighter.x, fighter.y + 4, 24 * scale / 3, 6 * scale / 3, 0, 0, Math.PI * 2);
  ctx.fill();
  ctx.restore();

  if (fighter.alive && now < fighter.carryUntil && fighter.zone) {
    const colors = arenaState.colors || {};
    const lift = Math.sin((now - fighter.frameOffset) / 160) * 3;
    ctx.save();
    ctx.globalAlpha = 0.84;
    ctx.translate(fighter.x + fighter.face * 24, fighter.y - 50 + lift);
    ctx.rotate(fighter.face * 0.08);
    ctx.fillStyle = colors.panel || "rgba(255,255,255,0.78)";
    ctx.strokeStyle = colors.line || "rgba(0,0,0,0.32)";
    ctx.lineWidth = 1;
    ctx.fillRect(-26, -14, 52, 28);
    ctx.strokeRect(-26, -14, 52, 28);
    ctx.fillStyle = colors.ink || "#222";
    ctx.globalAlpha = 0.62;
    ctx.fillRect(-18, -6, 32, 3);
    ctx.fillRect(-18, 2, 22, 3);
    ctx.restore();
  }

  drawSprite(ctx, sprite, fighter.x + actionLean, fighter.y + bob, scale, frameIndex, fighter.face, defeatedFade);

  if (fighter.alive && fighter.zone && now < fighter.hideUntil) {
    const colors = arenaState.colors || {};
    const coverW = Math.min(138, Math.max(72, fighter.zone.w * 0.3));
    const coverH = 34;
    const coverX = clamp(fighter.x - coverW / 2, fighter.zone.x + 8, fighter.zone.x + fighter.zone.w - coverW - 8);
    const coverY = fighter.zone.y + fighter.zone.h - 12;
    ctx.save();
    ctx.globalAlpha = 0.9;
    ctx.fillStyle = colors.panel || "rgba(255,255,255,0.78)";
    ctx.strokeStyle = colors.line || "rgba(0,0,0,0.32)";
    ctx.lineWidth = 1;
    ctx.fillRect(coverX, coverY, coverW, coverH);
    ctx.strokeRect(coverX, coverY, coverW, coverH);
    ctx.globalAlpha = 0.42;
    ctx.fillStyle = colors.ink || "#222";
    ctx.fillRect(coverX + 12, coverY + 10, coverW - 32, 3);
    ctx.fillRect(coverX + 12, coverY + 18, coverW - 52, 3);
    ctx.restore();
  }

  if (fighter.alive) {
    const hpWidth = 34;
    ctx.fillStyle = "rgba(0,0,0,0.34)";
    ctx.fillRect(fighter.x - hpWidth / 2, fighter.y + 8, hpWidth, 3);
    ctx.fillStyle = meta.accent;
    ctx.fillRect(fighter.x - hpWidth / 2, fighter.y + 8, hpWidth * (fighter.hp / fighter.maxHp), 3);
  }

  if (now < fighter.sparkUntil) {
    const spark = {
      src: "assets/fighters/fx/hitspark.png",
      w: 16,
      h: 39,
      frames: frameRange(0, 4),
      fps: 24
    };
    const sparkFrame = Math.floor((now - fighter.hitStarted) / 42);
    drawSprite(ctx, spark, fighter.sparkX, fighter.sparkY, 2, sparkFrame, 1, clamp((fighter.sparkUntil - now) / 180, 0, 1));
  }
}

function drawInteractionHints(ctx, now) {
  if (arenaState?.mode !== "interactive") return;
  const colors = arenaState.colors || {};
  ctx.save();
  ctx.globalAlpha = 0.08 + Math.sin(now / 900) * 0.025;
  ctx.strokeStyle = colors.ink || "#222";
  ctx.setLineDash([8, 8]);
  INTERACTION_ZONES.forEach((zone) => {
    ctx.strokeRect(zone.x, zone.y, zone.w, zone.h);
  });
  ctx.restore();
}

function stepArena(now) {
  if (!arenaState?.ctx) return;
  const elapsed = now - arenaState.last;
  if (elapsed < 41) {
    arenaFrame = requestAnimationFrame(stepArena);
    return;
  }
  const dt = Math.min(66, elapsed);
  arenaState.last = now;
  for (const fighter of arenaState.fighters) updateFighter(fighter, arenaState.fighters, dt, now);
  const { ctx } = arenaState;
  ctx.clearRect(0, 0, ARENA_W, ARENA_H);
  drawInteractionHints(ctx, now);
  [...arenaState.fighters].sort((a, b) => a.y - b.y).forEach((fighter) => drawFighter(ctx, fighter, now));
  arenaFrame = requestAnimationFrame(stepArena);
}

function renderArena() {
  const arena = $("#arenaLayer");
  const battle = activeProfile.battle || {};
  const welcomeActive = $("#welcomeScreen").classList.contains("active");
  const showArena = battle.enabled && !welcomeActive;
  arena.classList.toggle("active", showArena);
  if (!showArena) {
    stopArena();
    return;
  }
  const count = Math.max(2, Math.min(fighterLimit(), Number(battle.count) || 3));
  const theme = battle.theme || "mixed";
  const mode = battle.mode || "interactive";
  const key = `${count}-${theme}-${mode}`;
  if (arenaState?.key === key) return;
  stopArena();
  arena.classList.add("active");
  startArena(count, theme, mode);
}

function weatherLabel(code) {
  if ([0, 1].includes(code)) return "晴朗";
  if ([2, 3].includes(code)) return "多雲";
  if ([45, 48].includes(code)) return "霧";
  if ([51, 53, 55, 61, 63, 65, 80, 81, 82].includes(code)) return "短暫降雨";
  if ([71, 73, 75, 77, 85, 86].includes(code)) return "降雪";
  if ([95, 96, 99].includes(code)) return "雷雨";
  return "天氣變化";
}

function formatCoords(lat, lon) {
  const ns = lat >= 0 ? "N" : "S";
  const ew = lon >= 0 ? "E" : "W";
  return `${Math.abs(lat).toFixed(2)}°${ns} ${Math.abs(lon).toFixed(2)}°${ew}`;
}

function getPosition() {
  const fallback = activeProfile.location || { latitude: 25.033, longitude: 121.5654, label: "臺北市" };
  if (!fallback.useDeviceLocation) return Promise.resolve(fallback);
  return new Promise((resolve) => {
    if (!navigator.geolocation) {
      resolve(fallback);
      return;
    }
    navigator.geolocation.getCurrentPosition(
      (pos) => resolve({
        latitude: pos.coords.latitude,
        longitude: pos.coords.longitude,
        label: "所在位置",
        useDeviceLocation: true
      }),
      () => resolve(fallback),
      { enableHighAccuracy: false, timeout: 2500, maximumAge: 1800000 }
    );
  });
}

async function loadWeather() {
  if (!activeProfile) return;
  const requestId = ++weatherRequestId;
  try {
    const pos = await getPosition();
    if (requestId !== weatherRequestId) return;
    const params = new URLSearchParams({
      latitude: pos.latitude,
      longitude: pos.longitude,
      current: "temperature_2m,apparent_temperature,weather_code,precipitation",
      hourly: "temperature_2m,precipitation_probability,weather_code",
      forecast_days: "2",
      timezone: "Asia/Taipei"
    });
    const res = await fetch(`https://api.open-meteo.com/v1/forecast?${params}`);
    if (requestId !== weatherRequestId) return;
    if (!res.ok) throw new Error(`weather ${res.status}`);
    const data = await res.json();
    if (requestId !== weatherRequestId) return;
    const now = new Date();
    const current = data.current || {};
    const code = Number(current.weather_code || 0);
    const rainIndex = Math.max(0, data.hourly.time.findIndex((time) => new Date(time) >= now));
    const rain = data.hourly.precipitation_probability[rainIndex] ?? "--";
    $("#weatherCity").textContent = pos.label || activeProfile.location.label || "所在位置";
    $("#weatherCoords").textContent = formatCoords(pos.latitude, pos.longitude);
    $("#weatherSummary").textContent = `${weatherLabel(code)} · ${getCallName()} 的即時資訊`;
    $("#weatherTemp").textContent = Math.round(current.temperature_2m ?? 0);
    $("#weatherFeels").textContent = `體感 ${Math.round(current.apparent_temperature ?? current.temperature_2m ?? 0)}°`;
    $("#weatherRain").textContent = `降雨 ${rain}%`;
    $("#weatherIcon").classList.toggle("clear", code <= 1);
    $("#weatherUpdated").textContent = `UPDATED · ${pad(now.getHours())}:${pad(now.getMinutes())}`;
    renderWeatherBlocks(data.hourly, rainIndex);
  } catch (error) {
    $("#weatherCity").textContent = activeProfile.location?.label || "臺北市";
    $("#weatherSummary").textContent = "天氣資料暫時無法讀取 · 使用離線顯示";
    $("#weatherTemp").textContent = "--";
    $("#weatherFeels").textContent = "體感 --°";
    $("#weatherRain").textContent = "降雨 --%";
    $("#weatherBlocks").innerHTML = ["今晚", "明日白天", "明晚"].map((label) => (
      `<div class="weather-block"><div class="label">${label}</div><div class="temp">--°</div><div class="meta">等待更新</div></div>`
    )).join("");
  }
}

function renderWeatherBlocks(hourly, startIndex) {
  const labels = ["接下來", "三小時後", "六小時後"];
  const blocks = labels.map((label, offset) => {
    const index = Math.min(startIndex + offset * 3, hourly.time.length - 1);
    const temp = Math.round(hourly.temperature_2m[index]);
    const rain = hourly.precipitation_probability[index] ?? "--";
    const code = Number(hourly.weather_code[index] || 0);
    const time = new Date(hourly.time[index]);
    return `<div class="weather-block">
      <div class="label">${label}</div>
      <div class="temp">${pad(time.getHours())}:00　${temp}°</div>
      <div class="meta"><span class="rain">降雨 ${rain}%</span>　${weatherLabel(code)}</div>
    </div>`;
  });
  $("#weatherBlocks").innerHTML = blocks.join("");
}

function timeToDate(time) {
  const [hours, minutes] = time.split(":").map(Number);
  const date = new Date();
  date.setHours(hours, minutes || 0, 0, 0);
  return date;
}

function renderCalendar() {
  if (!activeProfile) return;
  const events = [...(activeProfile.events || [])].sort((a, b) => a.start.localeCompare(b.start));
  if (!events.length) {
    $("#eventTitle").textContent = "尚未設定行事曆";
    $("#eventTime").textContent = "請在設定新增事件";
    $("#eventMins").textContent = "--";
    $("#eventMinsLabel").textContent = "分鐘";
    $("#calendarList").innerHTML = "";
    return;
  }
  const now = new Date();
  let current = events.find((event) => now >= timeToDate(event.start) && now <= timeToDate(event.end));
  let upcoming = false;
  if (!current) {
    current = events.find((event) => timeToDate(event.start) > now) || events[events.length - 1];
    upcoming = true;
  }
  const target = upcoming ? timeToDate(current.start) : timeToDate(current.end);
  const mins = Math.max(0, Math.ceil((target - now) / 60000));
  $("#calendarNow").classList.toggle("upcoming", upcoming);
  $("#eventTitle").textContent = current.title;
  $("#eventTime").textContent = `${current.start} - ${current.end} · ${current.where || getCallName()}`;
  $("#eventMins").textContent = mins;
  $("#eventMinsLabel").textContent = upcoming ? "分後開始" : "分　剩餘";
  $("#calendarSource").textContent = `${getCallName().toUpperCase()} · ${events.length} EVENTS`;
  $("#calendarList").innerHTML = events.map((event) => (
    `<div class="cal-row">
      <time>${event.start} - ${event.end}</time>
      <div>${event.title}</div>
      <div class="where">${event.where || ""}</div>
    </div>`
  )).join("");
}

function daysBetween(from, to) {
  const start = new Date(from.getFullYear(), from.getMonth(), from.getDate());
  const end = new Date(to.getFullYear(), to.getMonth(), to.getDate());
  return Math.round((end - start) / 86400000);
}

function nextRecurringDate(rawDate, now) {
  const base = new Date(`${rawDate}T00:00:00+08:00`);
  const next = new Date(now.getFullYear(), base.getMonth(), base.getDate());
  if (next < new Date(now.getFullYear(), now.getMonth(), now.getDate())) {
    next.setFullYear(now.getFullYear() + 1);
  }
  return next;
}

function renderCountdowns() {
  if (!activeProfile) return;
  const now = new Date();
  const items = (activeProfile.countdowns || []).map((item) => {
    const target = item.repeat ? nextRecurringDate(item.date, now) : new Date(`${item.date}T00:00:00+08:00`);
    const days = daysBetween(now, target);
    return { ...item, target, days };
  }).sort((a, b) => Math.abs(a.days) - Math.abs(b.days)).slice(0, 4);

  $("#countList").innerHTML = items.map((item) => {
    const past = item.days < 0;
    const count = Math.abs(item.days);
    const label = past ? "PAST" : "D-DAY";
    const dateText = `${item.target.getFullYear()}-${pad(item.target.getMonth() + 1)}-${pad(item.target.getDate())}`;
    return `<div class="count-item">
      <div class="stamp${past ? " past" : ""}">
        <strong>${count}</strong>
        <span>${label}</span>
      </div>
      <div>
        <div class="count-title">${item.title}</div>
        <div class="count-meta">${dateText} · ${past ? "已過" : "還有"} ${count} 天</div>
      </div>
    </div>`;
  }).join("") || `<div class="empty-state">尚未設定倒數日</div>`;
}

function renderNotes() {
  const notes = activeProfile.notes || [];
  $("#noteBoard").innerHTML = notes.map((note, index) => (
    `<article class="note-card">
      <span>${pad(index + 1)}</span>
      <h2>${note.title}</h2>
      <p>${note.body}</p>
    </article>`
  )).join("") || `<div class="empty-state">尚未設定焦點內容</div>`;
}

function renderRhythm() {
  const rhythms = activeProfile.rhythms || [];
  $("#rhythmBoard").innerHTML = rhythms.map((item, index) => (
    `<article class="rhythm-card">
      <span>${pad(index + 1)}</span>
      <strong>${item.value || "--"}</strong>
      <h2>${item.title}</h2>
      <p>${item.meta || ""}</p>
    </article>`
  )).join("") || `<div class="empty-state">尚未設定今日節奏</div>`;
}

async function renderSystem() {
  const items = [
    { label: "螢幕", value: `${window.innerWidth}×${window.innerHeight}`, meta: `DPR ${Math.round((window.devicePixelRatio || 1) * 10) / 10}` },
    { label: "網路", value: navigator.onLine ? "ONLINE" : "OFFLINE", meta: navigator.connection?.effectiveType ? navigator.connection.effectiveType.toUpperCase() : "LOCAL" },
    { label: "儲存", value: "LOCAL", meta: "瀏覽器本機設定" },
    { label: "護眼", value: "ACTIVE", meta: "位移與亮度微調" }
  ];
  if (navigator.getBattery) {
    try {
      const battery = await navigator.getBattery();
      items.splice(1, 0, {
        label: "電量",
        value: `${Math.round(battery.level * 100)}%`,
        meta: battery.charging ? "CHARGING" : "BATTERY"
      });
    } catch {
      // Battery API may be unavailable.
    }
  }
  $("#systemGrid").innerHTML = items.map((item) => (
    `<article class="system-card">
      <span>${item.label}</span>
      <strong>${item.value}</strong>
      <p>${item.meta}</p>
    </article>`
  )).join("");
}

function renderBriefing() {
  const briefings = activeProfile.briefings || [];
  $("#briefingList").innerHTML = briefings.map((item, index) => (
    `<article class="briefing-item">
      <span>${pad(index + 1)}</span>
      <p>${item}</p>
    </article>`
  )).join("") || `<div class="empty-state">尚未設定今日簡報</div>`;
}

function setPanel(index) {
  if (index < 0) return;
  activeIndex = index;
  panelStartedAt = Date.now();
  const panelName = activeTabs[activeIndex];
  $all(".tab-panel").forEach((panel) => panel.classList.toggle("active", panel.dataset.panel === panelName));
  $all(".tab").forEach((tab) => tab.classList.toggle("active", tab.dataset.tab === panelName));
  $("#pageText").textContent = `${pad(activeIndex + 1)}/${pad(activeTabs.length)}`;
}

function renderProgress() {
  const elapsed = Date.now() - panelStartedAt;
  if (elapsed >= PANEL_MS) {
    setPanel((activeIndex + 1) % activeTabs.length);
    return;
  }
  $("#progressBar").style.width = `${(elapsed / PANEL_MS) * 100}%`;
}

function updateBurnInProtection() {
  const x = Math.round((Math.random() * 14) - 7);
  const y = Math.round((Math.random() * 10) - 5);
  const dim = (0.92 + Math.random() * 0.08).toFixed(2);
  const hue = Math.round((Math.random() * 8) - 4);
  document.documentElement.style.setProperty("--burn-x", `${x}px`);
  document.documentElement.style.setProperty("--burn-y", `${y}px`);
  document.documentElement.style.setProperty("--screen-dim", dim);
  document.documentElement.style.setProperty("--screen-hue", `${hue}deg`);
}

function startBurnInProtection() {
  updateBurnInProtection();
  if (burnTimer) clearInterval(burnTimer);
  burnTimer = setInterval(updateBurnInProtection, 35000);
}

function escapeHtml(value = "") {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

function appendEventRow(event = {}) {
  $("#eventsEditor").insertAdjacentHTML("beforeend", `<div class="form-row event-row">
    <label>標題<input class="event-title" type="text" value="${escapeHtml(event.title || "")}"></label>
    <label>開始<input class="event-start" type="time" value="${escapeHtml(event.start || "09:00")}"></label>
    <label>結束<input class="event-end" type="time" value="${escapeHtml(event.end || "10:00")}"></label>
    <label>地點<input class="event-where" type="text" value="${escapeHtml(event.where || "")}"></label>
    <button class="remove-row" type="button">刪除</button>
  </div>`);
}

function appendCountdownRow(item = {}) {
  $("#countdownsEditor").insertAdjacentHTML("beforeend", `<div class="form-row countdown-row">
    <label>標題<input class="count-title-input" type="text" value="${escapeHtml(item.title || "")}"></label>
    <label>日期<input class="count-date-input" type="date" value="${escapeHtml(item.date || "")}"></label>
    <label class="checkbox-label repeat-field"><input class="count-repeat-input" type="checkbox" ${item.repeat ? "checked" : ""}>每年重複</label>
    <button class="remove-row" type="button">刪除</button>
  </div>`);
}

function appendNoteRow(note = {}) {
  $("#notesEditor").insertAdjacentHTML("beforeend", `<div class="form-row note-row">
    <label>標題<input class="note-title-input" type="text" value="${escapeHtml(note.title || "")}"></label>
    <label class="wide-field">內容<textarea class="note-body-input">${escapeHtml(note.body || "")}</textarea></label>
    <button class="remove-row" type="button">刪除</button>
  </div>`);
}

function renderConfigEditors() {
  $("#eventsEditor").innerHTML = "";
  $("#countdownsEditor").innerHTML = "";
  $("#notesEditor").innerHTML = "";
  (activeProfile.events || []).forEach(appendEventRow);
  (activeProfile.countdowns || []).forEach(appendCountdownRow);
  (activeProfile.notes || []).forEach(appendNoteRow);
  if (!activeProfile.events?.length) appendEventRow();
  if (!activeProfile.countdowns?.length) appendCountdownRow();
  if (!activeProfile.notes?.length) appendNoteRow();
}

function collectEvents() {
  return $all("#eventsEditor .event-row").map((row) => ({
    title: row.querySelector(".event-title").value.trim(),
    start: row.querySelector(".event-start").value || "09:00",
    end: row.querySelector(".event-end").value || "10:00",
    where: row.querySelector(".event-where").value.trim()
  })).filter((event) => event.title);
}

function collectCountdowns() {
  return $all("#countdownsEditor .countdown-row").map((row) => ({
    title: row.querySelector(".count-title-input").value.trim(),
    date: row.querySelector(".count-date-input").value,
    repeat: row.querySelector(".count-repeat-input").checked
  })).filter((item) => item.title && item.date);
}

function collectNotes() {
  return $all("#notesEditor .note-row").map((row) => ({
    title: row.querySelector(".note-title-input").value.trim(),
    body: row.querySelector(".note-body-input").value.trim()
  })).filter((note) => note.title || note.body);
}

function openConfig() {
  $("#profileNameInput").value = activeProfile.name || "";
  $("#profileCallNameInput").value = activeProfile.callName || activeProfile.name || "";
  $("#profileIdentityInput").value = activeProfile.identity || "";
  $("#profileRoleInput").value = activeProfile.role || "";
  $("#locationLabelInput").value = activeProfile.location?.label || "";
  $("#latitudeInput").value = activeProfile.location?.latitude ?? "";
  $("#longitudeInput").value = activeProfile.location?.longitude ?? "";
  $("#useDeviceLocationInput").checked = Boolean(activeProfile.location?.useDeviceLocation);
  renderConfigEditors();
  $("#battleEnabledInput").checked = Boolean(activeProfile.battle?.enabled);
  $("#battleCountInput").value = activeProfile.battle?.count || 3;
  $("#battleThemeInput").value = activeProfile.battle?.theme || "mixed";
  $("#battleModeInput").value = activeProfile.battle?.mode || "interactive";
  $("#configDialog").showModal();
}

function setupConfig() {
  $("#configButton").addEventListener("click", openConfig);
  $("#editSelectedProfile").addEventListener("click", openConfig);
  $("#newProfileButton").addEventListener("click", createProfile);
  $("#welcomeButton").addEventListener("click", showWelcome);
  $("#enterDashboard").addEventListener("click", hideWelcome);
  $("#addEventButton").addEventListener("click", () => appendEventRow());
  $("#addCountdownButton").addEventListener("click", () => appendCountdownRow());
  $("#addNoteButton").addEventListener("click", () => appendNoteRow());
  $("#configDialog").addEventListener("click", (event) => {
    if (event.target.classList.contains("remove-row")) {
      const list = event.target.closest(".form-list");
      event.target.closest(".form-row").remove();
      if (list && !list.querySelector(".form-row")) {
        if (list.id === "eventsEditor") appendEventRow();
        if (list.id === "countdownsEditor") appendCountdownRow();
        if (list.id === "notesEditor") appendNoteRow();
      }
    }
  });

  $("#saveIdentityButton").addEventListener("click", () => {
    activeProfile.name = $("#welcomeNameInput").value.trim() || activeProfile.name;
    activeProfile.callName = $("#welcomeCallNameInput").value.trim() || activeProfile.callName || activeProfile.name;
    activeProfile.identity = $("#welcomeIdentityInput").value.trim() || activeProfile.identity || "";
    updateActiveProfile();
    applyProfile();
    renderWelcome();
  });

  $("#saveConfig").addEventListener("click", () => {
    activeProfile.name = $("#profileNameInput").value.trim() || activeProfile.name;
    activeProfile.callName = $("#profileCallNameInput").value.trim() || activeProfile.callName || activeProfile.name;
    activeProfile.identity = $("#profileIdentityInput").value.trim() || activeProfile.identity || "";
    activeProfile.role = $("#profileRoleInput").value.trim() || activeProfile.role;
    activeProfile.location = {
      label: $("#locationLabelInput").value.trim() || "臺北市",
      latitude: Number($("#latitudeInput").value) || 25.033,
      longitude: Number($("#longitudeInput").value) || 121.5654,
      useDeviceLocation: $("#useDeviceLocationInput").checked
    };
    activeProfile.events = collectEvents();
    activeProfile.countdowns = collectCountdowns();
    activeProfile.notes = collectNotes();
	    activeProfile.battle = {
	      enabled: $("#battleEnabledInput").checked,
	      count: Math.max(2, Math.min(6, Number($("#battleCountInput").value) || 3)),
	      theme: $("#battleThemeInput").value || "mixed",
	      mode: $("#battleModeInput").value || "interactive"
	    };
    updateActiveProfile();
    applyProfile();
    renderWelcome();
  });

  $("#resetConfig").addEventListener("click", () => {
    const defaults = clone(DEFAULT_PROFILES.find((profile) => profile.id === activeProfile.id) || DEFAULT_PROFILES[0]);
    activeProfile.callName = defaults.callName;
    activeProfile.identity = defaults.identity;
    activeProfile.location = defaults.location;
    activeProfile.dataUrl = defaults.dataUrl;
    activeProfile.layout = defaults.layout || "classic";
    activeProfile.battle = defaults.battle;
    activeProfile.events = defaults.events;
    activeProfile.countdowns = defaults.countdowns;
    activeProfile.notes = defaults.notes;
    $("#profileCallNameInput").value = activeProfile.callName || activeProfile.name || "";
    $("#profileIdentityInput").value = activeProfile.identity || "";
    $("#locationLabelInput").value = activeProfile.location?.label || "";
    $("#latitudeInput").value = activeProfile.location?.latitude ?? "";
    $("#longitudeInput").value = activeProfile.location?.longitude ?? "";
    $("#useDeviceLocationInput").checked = Boolean(activeProfile.location?.useDeviceLocation);
    renderConfigEditors();
    $("#battleEnabledInput").checked = Boolean(activeProfile.battle?.enabled);
    $("#battleCountInput").value = activeProfile.battle?.count || 3;
    $("#battleThemeInput").value = activeProfile.battle?.theme || "mixed";
    $("#battleModeInput").value = activeProfile.battle?.mode || "interactive";
    updateActiveProfile();
    applyProfile();
  });
}

function registerServiceWorker() {
  if (!("serviceWorker" in navigator)) return;
  navigator.serviceWorker.register("sw.js").catch(() => {});
}

function init() {
  profiles = readProfiles();
  selectedProfileId = localStorage.getItem(STORAGE_SELECTED) || profiles[0].id;
  activeProfile = getProfile();
  selectedProfileId = activeProfile.id;
  setScale();
  buildClock();
  setupConfig();
  applyProfile();
  renderWelcome();
  showWelcome();
  tick();
  if (weatherTimer) clearInterval(weatherTimer);
  weatherTimer = setInterval(loadWeather, 10 * 60 * 1000);
  startBurnInProtection();
  setInterval(tick, 1000);
  window.addEventListener("resize", () => {
    setScale();
    renderSystem();
  });
  registerServiceWorker();
}

init();
