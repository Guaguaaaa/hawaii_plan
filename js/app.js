import { TRIP_DATA } from "./data.js";
import {
  LocalTripStore,
  getAutoMode,
  getDefaultDay,
  getEffectiveMode,
  getModeOverride,
  parseRoute,
  setModeOverride
} from "./state.js";
import {
  findEvent,
  renderEventDrawer,
  renderItinerary,
  renderNavigation,
  renderOverview,
  renderPrepare,
  renderTools,
  renderTopbar
} from "./views.js";

const store = new LocalTripStore();
const appRoot = document.querySelector("#app-view");
const drawerOverlay = document.querySelector("#detail-drawer-overlay");
const drawer = document.querySelector("#detail-drawer");
const toast = document.querySelector("#toast");
const updateBanner = document.querySelector("#update-banner");

let selectedDayId = null;
let lastSection = null;
let previousFocus = null;
let waitingWorker = null;
let reloadForWorker = false;
let toastTimer = null;
let weatherState = null;

function currentContext() {
  const now = new Date();
  const autoMode = getAutoMode(TRIP_DATA, now);
  const mode = getEffectiveMode(TRIP_DATA, now);
  const route = parseRoute(location.hash, TRIP_DATA);
  const fallbackDay = getDefaultDay(TRIP_DATA, mode, now);
  selectedDayId = route.dayId || selectedDayId || fallbackDay.id;
  const selectedDay = TRIP_DATA.days.find((day) => day.id === selectedDayId) || fallbackDay;
  return { now, autoMode, mode, route, selectedDay };
}

function render() {
  const context = currentContext();
  const localState = store.snapshot();

  renderNavigation(TRIP_DATA, context.mode, context.route.section);
  renderTopbar(TRIP_DATA, context.mode, context.autoMode, getModeOverride());

  if (context.route.section === "itinerary") {
    appRoot.innerHTML = renderItinerary(TRIP_DATA, localState, context.selectedDay);
  } else if (context.route.section === "prepare") {
    appRoot.innerHTML = renderPrepare(TRIP_DATA, localState);
  } else if (context.route.section === "tools") {
    appRoot.innerHTML = renderTools(TRIP_DATA, localState);
  } else {
    appRoot.innerHTML = renderOverview(TRIP_DATA, localState, context.mode, context.selectedDay, context.now);
  }

  document.body.dataset.mode = context.mode;
  document.title = `${SECTION_LABEL(context.route.section, context.mode)} · ${TRIP_DATA.meta.title}`;
  updateWeatherNodes();
  updateClocks();

  if (lastSection && lastSection !== context.route.section) window.scrollTo({ top: 0, behavior: "instant" });
  lastSection = context.route.section;
}

function SECTION_LABEL(section, mode) {
  if (section === "overview") return mode === "trip" ? "今日" : mode === "archive" ? "回顾" : "概览";
  return { itinerary: "行程", prepare: "准备", tools: "工具" }[section] || "概览";
}

function updateClocks() {
  const format = (timeZone) => new Intl.DateTimeFormat("zh-CN", {
    timeZone,
    hour: "2-digit",
    minute: "2-digit",
    hour12: false
  }).format(new Date());

  document.querySelectorAll('[data-clock="hnl"]').forEach((node) => {
    node.textContent = format(TRIP_DATA.meta.destinationTimezone);
  });
  document.querySelectorAll('[data-clock="lax"]').forEach((node) => {
    node.textContent = format(TRIP_DATA.meta.homeTimezone);
  });
}

async function refreshWeather() {
  document.querySelectorAll("[data-weather]").forEach((node) => {
    node.classList.add("is-loading");
  });

  try {
    const endpoint = "https://api.open-meteo.com/v1/forecast?latitude=21.3069&longitude=-157.8583&current=temperature_2m,weather_code,wind_speed_10m&daily=temperature_2m_max,temperature_2m_min&temperature_unit=fahrenheit&wind_speed_unit=mph&timezone=Pacific%2FHonolulu&forecast_days=3";
    const response = await fetch(endpoint);
    if (!response.ok) throw new Error("Weather unavailable");
    const data = await response.json();
    weatherState = {
      available: true,
      temperature: Math.round(data.current.temperature_2m),
      code: data.current.weather_code,
      wind: Math.round(data.current.wind_speed_10m),
      high: Math.round(data.daily.temperature_2m_max[0]),
      low: Math.round(data.daily.temperature_2m_min[0])
    };
  } catch {
    weatherState = { available: false };
  }

  updateWeatherNodes();
}

function weatherLabel(code) {
  if (code === 0) return "晴朗";
  if ([1, 2, 3].includes(code)) return "局部多云";
  if ([45, 48].includes(code)) return "有雾";
  if (code >= 51 && code <= 67) return "有阵雨";
  if (code >= 80 && code <= 82) return "短时阵雨";
  return "热带天气";
}

function updateWeatherNodes() {
  document.querySelectorAll("[data-weather]").forEach((node) => {
    node.classList.remove("is-loading");
    if (!weatherState) return;
    if (!weatherState.available) {
      node.innerHTML = '<span class="weather-kicker">Honolulu 天气</span><strong>暂时离线</strong><small>恢复联网后可刷新天气</small>';
      return;
    }
    node.innerHTML = `
      <span class="weather-kicker">Honolulu · ${weatherLabel(weatherState.code)}</span>
      <strong>${weatherState.temperature}°F</strong>
      <small>最高 ${weatherState.high}° · 最低 ${weatherState.low}° · 风速 ${weatherState.wind} mph</small>
    `;
  });
}

function showToast(message) {
  window.clearTimeout(toastTimer);
  toast.textContent = message;
  toast.classList.add("is-visible");
  toastTimer = window.setTimeout(() => toast.classList.remove("is-visible"), 2600);
}

async function copyText(text) {
  try {
    await navigator.clipboard.writeText(text);
    showToast("已复制公开行程信息");
  } catch {
    const textArea = document.createElement("textarea");
    textArea.value = text;
    textArea.setAttribute("readonly", "");
    textArea.className = "clipboard-fallback";
    document.body.append(textArea);
    textArea.select();
    document.execCommand("copy");
    textArea.remove();
    showToast("已复制公开行程信息");
  }
}

function openDrawer(eventId) {
  const match = findEvent(TRIP_DATA, eventId);
  if (!match) return;
  previousFocus = document.activeElement;
  drawer.innerHTML = renderEventDrawer(match.day, match.event);
  drawerOverlay.hidden = false;
  requestAnimationFrame(() => drawerOverlay.classList.add("is-open"));
  document.body.classList.add("drawer-open");
  drawer.querySelector("[data-action='close-drawer']")?.focus();
}

function closeDrawer() {
  drawerOverlay.classList.remove("is-open");
  document.body.classList.remove("drawer-open");
  window.setTimeout(() => {
    drawerOverlay.hidden = true;
    drawer.innerHTML = "";
  }, 220);
  previousFocus?.focus?.();
}

function trapDrawerFocus(event) {
  if (event.key !== "Tab" || drawerOverlay.hidden) return;
  const focusable = [...drawer.querySelectorAll("a[href], button:not([disabled]), select, input")];
  if (!focusable.length) return;
  const first = focusable[0];
  const last = focusable.at(-1);
  if (event.shiftKey && document.activeElement === first) {
    event.preventDefault();
    last.focus();
  } else if (!event.shiftKey && document.activeElement === last) {
    event.preventDefault();
    first.focus();
  }
}

function handleClick(event) {
  const actionTarget = event.target.closest("[data-action]");
  if (!actionTarget) return;
  const action = actionTarget.dataset.action;

  if (action === "open-event") openDrawer(actionTarget.dataset.eventId);
  if (action === "close-drawer") closeDrawer();
  if (action === "refresh-weather") refreshWeather();
  if (action === "filter-tasks") store.setPrepareFilter(actionTarget.dataset.filter);
  if (action === "copy-text") copyText(actionTarget.dataset.copy || "");
  if (action === "apply-update" && waitingWorker) waitingWorker.postMessage({ type: "SKIP_WAITING" });
  if (action === "dismiss-update") updateBanner.hidden = true;
}

function handleChange(event) {
  if (event.target.matches("[data-action='toggle-task']")) {
    store.setTask(event.target.dataset.taskId, event.target.checked);
  }
  if (event.target.matches("[data-action='toggle-packing']")) {
    store.setPacking(event.target.dataset.packingId, event.target.checked);
  }
  if (event.target.matches("[data-action='toggle-arrival-shopping']")) {
    store.setArrivalShopping(event.target.dataset.arrivalShoppingId, event.target.checked);
  }
  if (event.target.id === "mode-select") {
    setModeOverride(event.target.value);
    render();
  }
}

function showUpdate(worker) {
  waitingWorker = worker;
  updateBanner.hidden = false;
}

async function registerServiceWorker() {
  if (!("serviceWorker" in navigator)) return;
  try {
    const registration = await navigator.serviceWorker.register("./sw.js");
    if (registration.waiting) showUpdate(registration.waiting);

    registration.addEventListener("updatefound", () => {
      const worker = registration.installing;
      worker?.addEventListener("statechange", () => {
        if (worker.state === "installed" && navigator.serviceWorker.controller) showUpdate(worker);
      });
    });

    navigator.serviceWorker.addEventListener("controllerchange", () => {
      if (reloadForWorker) return;
      reloadForWorker = true;
      location.reload();
    });
  } catch {
    // The app still works online when service worker registration is unavailable.
  }
}

window.addEventListener("hashchange", render);
document.addEventListener("click", handleClick);
document.addEventListener("change", handleChange);
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && !drawerOverlay.hidden) closeDrawer();
  trapDrawerFocus(event);
});
drawerOverlay.addEventListener("click", (event) => {
  if (event.target === drawerOverlay) closeDrawer();
});
store.subscribe(render);

if (!location.hash) history.replaceState(null, "", "#overview");
render();
refreshWeather();
registerServiceWorker();
window.setInterval(updateClocks, 30_000);
window.setInterval(() => {
  const { mode, route } = currentContext();
  if (mode === "trip" && route.section === "overview") render();
}, 60_000);
