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
  { id: "notes", label: "焦　點", short: "焦點", desc: "今日提醒、工作重點與個人提示" }
];

const STYLE_DEFS = [
  { id: "paper", name: "Paper Classic", zh: "紙感經典", desc: "米色紙張、襯線字、翻頁鐘", sample: "5/4" },
  { id: "braun", name: "Braun Desk", zh: "包浩斯儀表", desc: "淺灰面板、橘色訊號、工業控制感", sample: "ET66" },
  { id: "anime", name: "Anime Pastel", zh: "動漫粉彩", desc: "柔和粉彩、可愛標籤、輕亮氛圍", sample: "きら" },
  { id: "cyber", name: "Cyber Neon", zh: "賽博霓虹", desc: "深色底、青紫光、夜間資訊牆", sample: "19:57" },
  { id: "editorial", name: "Editorial Ink", zh: "雜誌主編", desc: "報刊欄線、沉穩紅黑、資訊密度高", sample: "NEWS" },
  { id: "forest", name: "Forest Zen", zh: "森林靜心", desc: "綠色紙張、低刺激、長時間觀看", sample: "WOOD" },
  { id: "ocean", name: "Ocean Glass", zh: "海洋玻璃", desc: "藍綠透明感、冷靜清爽", sample: "WAVE" },
  { id: "sunset", name: "Sunset Warm", zh: "夕陽暖調", desc: "暖橘光、柔和對比、生活感", sample: "17:30" },
  { id: "terminal", name: "Terminal Ops", zh: "終端機工作站", desc: "黑綠命令列、工程監控氣質", sample: "$ now" },
  { id: "noir", name: "Luxury Noir", zh: "黑金精品", desc: "黑底金線、展示櫃與高級鐘錶感", sample: "NOIR" }
];

const DEFAULT_PROFILES = [
  {
    id: "craig",
    name: "Craig",
    callName: "Craig",
    identity: "正在建立個人桌面系統",
    role: "個人桌面 · 待補完整資料",
    style: "paper",
    enabledTabs: ["weather", "calendar", "countdown", "notes"],
    location: { label: "臺北市", latitude: 25.033, longitude: 121.5654, useDeviceLocation: true },
    dataUrl: "",
    battle: { enabled: false, count: 3, theme: "mixed" },
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
    ]
  },
  {
    id: "guest",
    name: "Guest",
    callName: "Guest",
    identity: "共用展示使用者",
    role: "共用展示 · 可複製成同事設定檔",
    style: "ocean",
    enabledTabs: ["weather", "calendar", "notes"],
    location: { label: "臺北市", latitude: 25.033, longitude: 121.5654, useDeviceLocation: false },
    dataUrl: "",
    battle: { enabled: false, count: 2, theme: "arcade" },
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
      { title: "展示用設定檔", body: "可在 CONFIG 修改後，成為任一同事的個人儀表板。" },
      { title: "共用原則", body: "每個瀏覽器各自儲存，不會寫回其他人的設定。" }
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
  return {
    ...fallback,
    ...profile,
    callName: profile.callName || profile.name || fallback.callName,
    identity: profile.identity || fallback.identity || "",
    enabledTabs: Array.isArray(profile.enabledTabs) && profile.enabledTabs.length ? profile.enabledTabs : fallback.enabledTabs,
    location: { ...fallback.location, ...(profile.location || {}) },
    dataUrl: profile.dataUrl || "",
    battle: { ...fallback.battle, ...(profile.battle || {}) },
    events: Array.isArray(profile.events) ? profile.events : fallback.events,
    countdowns: Array.isArray(profile.countdowns) ? profile.countdowns : fallback.countdowns,
    notes: Array.isArray(profile.notes) ? profile.notes : fallback.notes
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

function getCallName() {
  return activeProfile?.callName || activeProfile?.name || "Guest";
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
  $("#eraLine").textContent = `${getCallName()} · A.D. ${now.getFullYear()} · ${MONTHS[now.getMonth()]}`;
  $("#dateNum").innerHTML = `${now.getMonth() + 1}<span class="slash">/</span>${now.getDate()}`;
  $("#weekday").textContent = WEEKDAYS_ZH[now.getDay()];
  $("#weekLine").textContent = `${WEEKDAYS_EN[now.getDay()]} · week ${getWeekNumber(now)}`;
  setDigits("hh", pad(now.getHours()));
  setDigits("mm", pad(now.getMinutes()));
  setDigits("ss", pad(now.getSeconds()));
  renderCalendar();
  renderProgress();
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

  $("#styleGrid").innerHTML = STYLE_DEFS.map((style) => (
    `<button class="style-card style-swatch-${style.id}${activeProfile.style === style.id ? " active" : ""}" data-style="${style.id}" type="button">
      <span class="style-sample">${style.sample}</span>
      <strong>${style.zh}</strong>
      <small>${style.desc}</small>
    </button>`
  )).join("");

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
      updateActiveProfile();
      renderTabs();
      renderWelcome();
    });
  });

  $all("[data-style]").forEach((button) => {
    button.addEventListener("click", () => {
      activeProfile.style = button.dataset.style;
      updateActiveProfile();
      applyTheme();
      renderWelcome();
    });
  });
}

function showWelcome() {
  $("#welcomeScreen").classList.add("active");
}

function hideWelcome() {
  $("#welcomeScreen").classList.remove("active");
  panelStartedAt = Date.now();
}

function createProfile() {
  const base = clone(activeProfile || DEFAULT_PROFILES[0]);
  base.id = `profile-${Date.now()}`;
  base.name = "新設定檔";
  base.callName = "新朋友";
  base.identity = "請記錄這位使用者是誰";
  base.role = "請在 CONFIG 填入使用者資料";
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
  document.body.dataset.style = activeProfile.style || "paper";
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
  renderCalendar();
  renderCountdowns();
  renderNotes();
  renderArena();
  loadWeather();
  loadExternalProfileData();
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

async function loadExternalProfileData() {
  const url = (activeProfile.dataUrl || "").trim();
  if (!url) return;
  try {
    const res = await fetch(url, { cache: "no-store" });
    if (!res.ok) throw new Error(`data ${res.status}`);
    const data = await res.json();
    if (Array.isArray(data.events)) activeProfile.events = data.events;
    if (Array.isArray(data.countdowns)) activeProfile.countdowns = data.countdowns;
    if (Array.isArray(data.notes)) activeProfile.notes = data.notes;
    if (data.location && typeof data.location === "object") {
      activeProfile.location = { ...activeProfile.location, ...data.location };
    }
    updateActiveProfile();
    renderCalendar();
    renderCountdowns();
    renderNotes();
    loadWeather();
  } catch (error) {
    console.warn("Unable to load external dashboard data", error);
  }
}

function renderArena() {
  const arena = $("#arenaLayer");
  const battle = activeProfile.battle || {};
  const showArena = battle.enabled && ["anime", "cyber", "terminal", "noir"].includes(activeProfile.style);
  arena.classList.toggle("active", showArena);
  if (!showArena) {
    arena.innerHTML = "";
    return;
  }
  const count = Math.max(2, Math.min(8, Number(battle.count) || 3));
  const theme = battle.theme || "mixed";
  const pool = ["energy", "arcade", "armor", "mystic"];
  const labels = {
    arcade: ["拳", "踢", "閃", "破", "疾", "反", "連", "爆"],
    energy: ["氣", "波", "光", "瞬", "炎", "雷", "界", "衝"],
    armor: ["甲", "盾", "砲", "飛", "鋼", "核", "鎖", "推"],
    mystic: ["星", "月", "咒", "門", "幻", "焰", "晶", "靈"]
  };
  arena.innerHTML = Array.from({ length: count }, (_, index) => {
    const side = index % 4;
    const delay = (index * -1.7).toFixed(1);
    const fighterTheme = theme === "mixed" ? pool[index % pool.length] : theme;
    const label = labels[fighterTheme]?.[index % 8] || "戰";
    return `<span class="fighter fighter-${side} fighter-${fighterTheme}" style="--delay:${delay}s; --slot:${index};">
      <i>${label}</i>
    </span>`;
  }).join("");
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
  try {
    const pos = await getPosition();
    const params = new URLSearchParams({
      latitude: pos.latitude,
      longitude: pos.longitude,
      current: "temperature_2m,apparent_temperature,weather_code,precipitation",
      hourly: "temperature_2m,precipitation_probability,weather_code",
      forecast_days: "2",
      timezone: "Asia/Taipei"
    });
    const res = await fetch(`https://api.open-meteo.com/v1/forecast?${params}`);
    if (!res.ok) throw new Error(`weather ${res.status}`);
    const data = await res.json();
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
    $("#eventTime").textContent = "請在 CONFIG 新增事件";
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

function parseJsonList(selector, fallback) {
  try {
    const parsed = JSON.parse($(selector).value || "[]");
    return Array.isArray(parsed) ? parsed : fallback;
  } catch {
    return fallback;
  }
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
  $("#dataUrlInput").value = activeProfile.dataUrl || "";
  $("#eventsInput").value = JSON.stringify(activeProfile.events || [], null, 2);
  $("#countdownsInput").value = JSON.stringify(activeProfile.countdowns || [], null, 2);
  $("#notesInput").value = JSON.stringify(activeProfile.notes || [], null, 2);
  $("#battleEnabledInput").checked = Boolean(activeProfile.battle?.enabled);
  $("#battleCountInput").value = activeProfile.battle?.count || 3;
  $("#battleThemeInput").value = activeProfile.battle?.theme || "mixed";
  $("#configDialog").showModal();
}

function setupConfig() {
  $("#configButton").addEventListener("click", openConfig);
  $("#editSelectedProfile").addEventListener("click", openConfig);
  $("#newProfileButton").addEventListener("click", createProfile);
  $("#welcomeButton").addEventListener("click", showWelcome);
  $("#enterDashboard").addEventListener("click", hideWelcome);
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
    activeProfile.dataUrl = $("#dataUrlInput").value.trim();
    activeProfile.events = parseJsonList("#eventsInput", activeProfile.events || []);
    activeProfile.countdowns = parseJsonList("#countdownsInput", activeProfile.countdowns || []);
    activeProfile.notes = parseJsonList("#notesInput", activeProfile.notes || []);
    activeProfile.battle = {
      enabled: $("#battleEnabledInput").checked,
      count: Math.max(2, Math.min(8, Number($("#battleCountInput").value) || 3)),
      theme: $("#battleThemeInput").value || "mixed"
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
    $("#dataUrlInput").value = activeProfile.dataUrl || "";
    $("#eventsInput").value = JSON.stringify(activeProfile.events, null, 2);
    $("#countdownsInput").value = JSON.stringify(activeProfile.countdowns, null, 2);
    $("#notesInput").value = JSON.stringify(activeProfile.notes, null, 2);
    $("#battleEnabledInput").checked = Boolean(activeProfile.battle?.enabled);
    $("#battleCountInput").value = activeProfile.battle?.count || 3;
    $("#battleThemeInput").value = activeProfile.battle?.theme || "mixed";
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
  window.addEventListener("resize", setScale);
  registerServiceWorker();
}

init();
