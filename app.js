const PANEL_MS = 12000;
const TABS = ["weather", "calendar", "countdown"];
const WEEKDAYS_ZH = ["星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"];
const WEEKDAYS_EN = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const MONTHS = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];

const DEFAULT_EVENTS = [
  { title: "晨間整理", start: "08:40", end: "09:10", where: "Craig Desk" },
  { title: "論文與寫作", start: "10:00", end: "12:00", where: "Secondbrain" },
  { title: "Codex 工作整理", start: "15:00", end: "16:00", where: "Dashboard" },
  { title: "晚間收束", start: "21:30", end: "22:00", where: "Desk" }
];

const DEFAULT_COUNTDOWNS = [
  { title: "Dashboard 上線", date: "2026-05-04" },
  { title: "年底 / Year End", date: "2026-12-31" },
  { title: "生日", date: "1994-07-18", repeat: true },
  { title: "博士論文節點", date: "2026-12-31" }
];

let activeIndex = 0;
let panelStartedAt = Date.now();

function $(selector) {
  return document.querySelector(selector);
}

function $all(selector) {
  return [...document.querySelectorAll(selector)];
}

function pad(value) {
  return String(value).padStart(2, "0");
}

function getWeekNumber(date) {
  const copy = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
  const dayNum = copy.getUTCDay() || 7;
  copy.setUTCDate(copy.getUTCDate() + 4 - dayNum);
  const yearStart = new Date(Date.UTC(copy.getUTCFullYear(), 0, 1));
  return Math.ceil((((copy - yearStart) / 86400000) + 1) / 7);
}

function setScale() {
  const scale = Math.min(window.innerWidth / 736, window.innerHeight / 414);
  document.documentElement.style.setProperty("--scale", String(scale));
}

function buildClock() {
  for (const group of $all("[data-clock]")) {
    const small = group.classList.contains("sec");
    group.innerHTML = `${small ? "00" : "00"}`.split("").map((digit) => (
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
  $("#eraLine").textContent = `A.D. ${now.getFullYear()} · ${MONTHS[now.getMonth()]}`;
  $("#dateNum").innerHTML = `${now.getMonth() + 1}<span class="slash">/</span>${now.getDate()}`;
  $("#weekday").textContent = WEEKDAYS_ZH[now.getDay()];
  $("#weekLine").textContent = `${WEEKDAYS_EN[now.getDay()]} · week ${getWeekNumber(now)}`;
  setDigits("hh", pad(now.getHours()));
  setDigits("mm", pad(now.getMinutes()));
  setDigits("ss", pad(now.getSeconds()));
  renderCalendar();
  renderProgress();
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
  const fallback = { latitude: 25.033, longitude: 121.5654, label: "臺北市" };
  return new Promise((resolve) => {
    if (!navigator.geolocation) {
      resolve(fallback);
      return;
    }
    navigator.geolocation.getCurrentPosition(
      (pos) => resolve({
        latitude: pos.coords.latitude,
        longitude: pos.coords.longitude,
        label: "所在位置"
      }),
      () => resolve(fallback),
      { enableHighAccuracy: false, timeout: 2500, maximumAge: 1800000 }
    );
  });
}

async function loadWeather() {
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
    $("#weatherCity").textContent = pos.label;
    $("#weatherCoords").textContent = formatCoords(pos.latitude, pos.longitude);
    $("#weatherSummary").textContent = `${weatherLabel(code)} · 舒適閱讀與工作`;
    $("#weatherTemp").textContent = Math.round(current.temperature_2m ?? 0);
    $("#weatherFeels").textContent = `體感 ${Math.round(current.apparent_temperature ?? current.temperature_2m ?? 0)}°`;
    $("#weatherRain").textContent = `降雨 ${rain}%`;
    $("#weatherIcon").classList.toggle("clear", code <= 1);
    $("#weatherUpdated").textContent = `UPDATED · ${pad(now.getHours())}:${pad(now.getMinutes())}`;
    renderWeatherBlocks(data.hourly, rainIndex);
  } catch (error) {
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

function loadEvents() {
  return readJson("paperDashboardEvents", DEFAULT_EVENTS);
}

function loadCountdowns() {
  return readJson("paperDashboardCountdowns", DEFAULT_COUNTDOWNS);
}

function readJson(key, fallback) {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return fallback;
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : fallback;
  } catch {
    return fallback;
  }
}

function timeToDate(time) {
  const [hours, minutes] = time.split(":").map(Number);
  const date = new Date();
  date.setHours(hours, minutes || 0, 0, 0);
  return date;
}

function renderCalendar() {
  const events = loadEvents().slice().sort((a, b) => a.start.localeCompare(b.start));
  const now = new Date();
  let current = events.find((event) => now >= timeToDate(event.start) && now <= timeToDate(event.end));
  let upcoming = false;
  if (!current) {
    current = events.find((event) => timeToDate(event.start) > now) || events[events.length - 1];
    upcoming = true;
  }
  if (!current) return;
  const target = upcoming ? timeToDate(current.start) : timeToDate(current.end);
  const mins = Math.max(0, Math.ceil((target - now) / 60000));
  $("#calendarNow").classList.toggle("upcoming", upcoming);
  $("#eventTitle").textContent = current.title;
  $("#eventTime").textContent = `${current.start} - ${current.end} · ${current.where || "Desk"}`;
  $("#eventMins").textContent = mins;
  $("#eventMinsLabel").textContent = upcoming ? "分後開始" : "分　剩餘";
  $("#calendarSource").textContent = `TODAY · ${events.length} EVENTS`;
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
  const now = new Date();
  const items = loadCountdowns().map((item) => {
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
  }).join("");
}

function setPanel(index) {
  activeIndex = index;
  panelStartedAt = Date.now();
  const panelName = TABS[activeIndex];
  $all(".tab-panel").forEach((panel) => panel.classList.toggle("active", panel.dataset.panel === panelName));
  $all(".tab").forEach((tab) => tab.classList.toggle("active", tab.dataset.tab === panelName));
  $("#pageText").textContent = `${pad(activeIndex + 1)}/03`;
}

function renderProgress() {
  const elapsed = Date.now() - panelStartedAt;
  if (elapsed >= PANEL_MS) {
    setPanel((activeIndex + 1) % TABS.length);
    return;
  }
  $("#progressBar").style.width = `${(elapsed / PANEL_MS) * 100}%`;
}

function setupConfig() {
  const dialog = $("#configDialog");
  $("#configButton").addEventListener("click", () => {
    $("#eventsInput").value = JSON.stringify(loadEvents(), null, 2);
    $("#countdownsInput").value = JSON.stringify(loadCountdowns(), null, 2);
    dialog.showModal();
  });
  $("#saveConfig").addEventListener("click", () => {
    localStorage.setItem("paperDashboardEvents", $("#eventsInput").value);
    localStorage.setItem("paperDashboardCountdowns", $("#countdownsInput").value);
    renderCalendar();
    renderCountdowns();
  });
  $("#resetConfig").addEventListener("click", () => {
    localStorage.removeItem("paperDashboardEvents");
    localStorage.removeItem("paperDashboardCountdowns");
    $("#eventsInput").value = JSON.stringify(DEFAULT_EVENTS, null, 2);
    $("#countdownsInput").value = JSON.stringify(DEFAULT_COUNTDOWNS, null, 2);
    renderCalendar();
    renderCountdowns();
  });
}

function registerServiceWorker() {
  if (!("serviceWorker" in navigator)) return;
  navigator.serviceWorker.register("sw.js").catch(() => {});
}

function init() {
  setScale();
  buildClock();
  tick();
  renderCalendar();
  renderCountdowns();
  setupConfig();
  loadWeather();
  registerServiceWorker();
  setInterval(tick, 1000);
  setInterval(loadWeather, 10 * 60 * 1000);
  window.addEventListener("resize", setScale);
  $all(".tab").forEach((tab) => {
    tab.addEventListener("click", () => setPanel(TABS.indexOf(tab.dataset.tab)));
  });
}

init();
