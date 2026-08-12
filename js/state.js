const STORAGE_KEY = "hawaii_ui_state_v2";
const MODE_OVERRIDE_KEY = "hawaii_mode_override";

const PACKING_ID_V3_TO_V4 = {
  p1: "p1", p2: "p2", p3: "p3", p4: "p4", p5: "p5", p6: "p6", p7: "p7", p10: "p8",
  p11: "p9", p12: "p10", p13: "p11", p14: "p12", p15: "p13", p21: "p14", p44: "p15", p22: "p16",
  p23: "p17", p45: "p18", p46: "p19", p47: "p20", p24: "p21",
  p25: "p22", p26: "p23", p27: "p24", p28: "p25", p29: "p26", p30: "p27", p31: "p28", p32: "p29",
  p33: "p30", p34: "p31", p35: "p32", p36: "p33", p37: "p34", p38: "p35", p39: "p36", p48: "p37", p49: "p38", p50: "p39", p40: "p40",
  p41: "p41", p51: "p42", p52: "p43", p53: "p44", p54: "p45", p55: "p46", p56: "p47", p57: "p48", p42: "p49",
  p58: "p50", p59: "p51", p60: "p52", p61: "p53", p62: "p54", p43: "p55"
};

const LEGACY_TASK_MAP = {
  "todo_🔥 当务之急_0": "book-flights",
  "todo_🔥 当务之急_1": "book-malia-first",
  "todo_🔥 当务之急_2": "book-sheraton",
  "todo_🔥 当务之急_3": "book-malia-last",
  "todo_🔥 当务之急_4": "book-rental-car",
  "todo_🎟️ 预订抢票_0": "book-kualoa",
  "todo_🎟️ 预订抢票_1": "book-pearl-harbor",
  "todo_🎟️ 预订抢票_2": "book-diamond-head",
  "todo_🎟️ 预订抢票_3": "book-hanauma",
  "todo_🧳 行前打包_0": "prep-documents",
  "todo_🧳 行前打包_1": "prep-sun-water",
  "todo_🧳 行前打包_2": "prep-pack"
};

function readJson(storage, key, fallback) {
  try {
    const value = JSON.parse(storage.getItem(key) || "null");
    return value && typeof value === "object" ? value : fallback;
  } catch {
    return fallback;
  }
}

function emptyState() {
  return {
    version: 4,
    tasks: {},
    packing: {},
    arrivalShopping: {},
    prepareFilter: "all"
  };
}

function migrateLegacyState() {
  const next = emptyState();
  const legacyTasks = readJson(localStorage, "hawaii_todo_state", {});
  const legacyPacking = readJson(localStorage, "hawaii_packing_checklist", {});

  Object.entries(legacyTasks).forEach(([legacyId, checked]) => {
    const stableId = LEGACY_TASK_MAP[legacyId];
    if (stableId) next.tasks[stableId] = Boolean(checked);
  });

  Object.entries(legacyPacking).forEach(([id, checked]) => {
    if (/^p\d+$/.test(id)) next.packing[id] = Boolean(checked);
  });

  migratePackingIds(next);

  localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  localStorage.removeItem("hawaii_todo_state");
  localStorage.removeItem("hawaii_packing_checklist");
  return next;
}

function migratePackingIds(state) {
  const packing = {};
  Object.entries(PACKING_ID_V3_TO_V4).forEach(([oldId, newId]) => {
    if (Object.prototype.hasOwnProperty.call(state.packing, oldId)) packing[newId] = Boolean(state.packing[oldId]);
  });
  state.packing = packing;
}

export class LocalTripStore {
  constructor() {
    this.listeners = new Set();
    const savedState = localStorage.getItem(STORAGE_KEY)
      ? readJson(localStorage, STORAGE_KEY, emptyState())
      : null;
    this.state = savedState ? { ...emptyState(), ...savedState } : migrateLegacyState();
    if (this.state.version < 3 && this.state.prepareFilter === "todo") this.state.prepareFilter = "all";
    if (this.state.version < 4) {
      migratePackingIds(this.state);
      this.state.version = 4;
      this.persist();
    }
  }

  snapshot() {
    return this.state;
  }

  subscribe(listener) {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  }

  setTask(id, checked) {
    this.state.tasks[id] = checked;
    this.persist();
  }

  setPacking(id, checked) {
    this.state.packing[id] = checked;
    this.persist();
  }

  setArrivalShopping(id, checked) {
    this.state.arrivalShopping[id] = checked;
    this.persist();
  }

  setPrepareFilter(filter) {
    this.state.prepareFilter = filter;
    this.persist();
  }

  persist() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(this.state));
    this.listeners.forEach((listener) => listener(this.state));
  }
}

export function getModeOverride() {
  const value = sessionStorage.getItem(MODE_OVERRIDE_KEY);
  return ["plan", "trip", "archive"].includes(value) ? value : null;
}

export function setModeOverride(mode) {
  if (mode === "auto") sessionStorage.removeItem(MODE_OVERRIDE_KEY);
  else sessionStorage.setItem(MODE_OVERRIDE_KEY, mode);
}

export function toLocalDateISO(date = new Date()) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

export function getAutoMode(data, date = new Date()) {
  const today = toLocalDateISO(date);
  if (today < data.meta.startDate) return "plan";
  if (today > data.meta.endDate) return "archive";
  return "trip";
}

export function getEffectiveMode(data, date = new Date()) {
  return getModeOverride() || getAutoMode(data, date);
}

export function getCountdownDays(data, date = new Date()) {
  const [year, month, day] = data.meta.startDate.split("-").map(Number);
  const start = new Date(year, month - 1, day);
  return Math.max(0, Math.ceil((start.getTime() - date.getTime()) / 86400000));
}

export function getDayForDate(data, date = new Date()) {
  const today = toLocalDateISO(date);
  return data.days.find((day) => day.dateISO === today) || null;
}

export function getDefaultDay(data, mode, date = new Date()) {
  if (mode === "trip") return getDayForDate(data, date) || data.days[0];
  if (mode === "archive") return data.days[data.days.length - 1];
  return data.days[0];
}

function timeToMinutes(value) {
  if (!value) return null;
  const [hour, minute] = value.split(":").map(Number);
  return hour * 60 + minute;
}

export function getCurrentAndNext(day, date = new Date()) {
  if (!day) return { current: null, next: null, complete: false };
  const matchesToday = day.dateISO === toLocalDateISO(date);
  if (!matchesToday) return { current: null, next: day.timeline[0] || null, complete: false };

  const nowMinutes = date.getHours() * 60 + date.getMinutes();
  let current = null;
  let next = null;

  day.timeline.forEach((item, index) => {
    const start = timeToMinutes(item.startTime);
    const explicitEnd = timeToMinutes(item.endTime);
    const followingStart = timeToMinutes(day.timeline[index + 1]?.startTime);
    const end = explicitEnd ?? followingStart ?? 24 * 60;
    if (start <= nowMinutes && nowMinutes < end) current = item;
    if (!next && start > nowMinutes) next = item;
  });

  return {
    current,
    next,
    complete: nowMinutes >= timeToMinutes(day.timeline.at(-1)?.startTime)
  };
}

export function isTaskDone(task, localState) {
  if (task.fixedDone) return true;
  if (Object.prototype.hasOwnProperty.call(localState.tasks, task.id)) {
    return Boolean(localState.tasks[task.id]);
  }
  return task.status === "done";
}

export function getTaskProgress(data, localState) {
  const done = data.tasks.filter((task) => isTaskDone(task, localState)).length;
  return { done, total: data.tasks.length, percent: Math.round((done / data.tasks.length) * 100) };
}

export function getPackingProgress(data, localState) {
  const items = data.packingCategories.flatMap((category) => category.items);
  const done = items.filter((item) => Boolean(localState.packing[item.id])).length;
  return { done, total: items.length, percent: Math.round((done / items.length) * 100) };
}

export function getArrivalShoppingProgress(data, localState) {
  const items = (data.arrivalShoppingCategories || []).flatMap((category) => category.items);
  const done = items.filter((item) => Boolean(localState.arrivalShopping?.[item.id])).length;
  return { done, total: items.length, percent: items.length ? Math.round((done / items.length) * 100) : 0 };
}

export function getTopTasks(data, localState, limit = 3) {
  const priorityOrder = { urgent: 0, high: 1, medium: 2, low: 3 };
  return data.tasks
    .filter((task) => !isTaskDone(task, localState))
    .sort((a, b) => {
      const priorityDelta = priorityOrder[a.priority] - priorityOrder[b.priority];
      if (priorityDelta !== 0) return priorityDelta;
      return new Date(a.dueAt).getTime() - new Date(b.dueAt).getTime();
    })
    .slice(0, limit);
}

export function getHotelForDate(data, dateISO) {
  return data.hotels.find((hotel) => hotel.checkIn <= dateISO && dateISO < hotel.checkOut) || null;
}

export function parseRoute(hash, data) {
  const cleaned = (hash || "#overview").replace(/^#/, "");
  const [section, detail] = cleaned.split("/");
  const allowed = ["overview", "itinerary", "prepare", "tools"];
  const safeSection = allowed.includes(section) ? section : "overview";
  const safeDay = data.days.some((day) => day.id === detail) ? detail : null;
  return { section: safeSection, dayId: safeDay };
}

export function buildRoute(section, dayId = null) {
  return `#${section}${dayId ? `/${dayId}` : ""}`;
}
