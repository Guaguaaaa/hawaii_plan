import test from "node:test";
import assert from "node:assert/strict";

import { TRIP_DATA } from "../js/data.js";
import {
  LocalTripStore,
  getAutoMode,
  getArrivalShoppingProgress,
  getCurrentAndNext,
  getPackingProgress,
  isTaskDone,
  parseRoute
} from "../js/state.js";

class MemoryStorage {
  constructor() {
    this.values = new Map();
  }

  getItem(key) {
    return this.values.has(key) ? this.values.get(key) : null;
  }

  setItem(key, value) {
    this.values.set(key, String(value));
  }

  removeItem(key) {
    this.values.delete(key);
  }
}

test("automatic modes cover before, during, and after the trip", () => {
  assert.equal(getAutoMode(TRIP_DATA, new Date(2026, 7, 15, 12)), "plan");
  assert.equal(getAutoMode(TRIP_DATA, new Date(2026, 7, 16, 0)), "trip");
  assert.equal(getAutoMode(TRIP_DATA, new Date(2026, 7, 21, 23, 59)), "trip");
  assert.equal(getAutoMode(TRIP_DATA, new Date(2026, 7, 22, 0)), "archive");
});

test("current and next activity observe start and end boundaries", () => {
  const day = TRIP_DATA.days[0];
  const before = getCurrentAndNext(day, new Date(2026, 7, 16, 6, 45));
  assert.equal(before.current, null);
  assert.equal(before.next.id, "d1-lax-transfer");

  const duringFlight = getCurrentAndNext(day, new Date(2026, 7, 16, 11, 30));
  assert.equal(duringFlight.current.id, "d1-flight-as803");
  assert.equal(duringFlight.next.id, "d1-hnl-transfer");

  const between = getCurrentAndNext(day, new Date(2026, 7, 16, 13, 10));
  assert.equal(between.current, null);
  assert.equal(between.next.id, "d1-hnl-transfer");
});

test("hash routes reject unknown sections and preserve stable day ids", () => {
  assert.deepEqual(parseRoute("#itinerary/day-4", TRIP_DATA), { section: "itinerary", dayId: "day-4" });
  assert.deepEqual(parseRoute("#unknown/day-99", TRIP_DATA), { section: "overview", dayId: null });
});

test("legacy task and packing state migrates to stable ids", () => {
  globalThis.localStorage = new MemoryStorage();
  globalThis.sessionStorage = new MemoryStorage();
  localStorage.setItem("hawaii_todo_state", JSON.stringify({ "todo_🔥 当务之急_1": true }));
  localStorage.setItem("hawaii_packing_checklist", JSON.stringify({ p6: true, p10: true }));

  const store = new LocalTripStore();
  assert.equal(store.snapshot().tasks["book-malia-first"], true);
  assert.equal(store.snapshot().packing.p6, true);
  assert.equal(store.snapshot().packing.p8, true);
  store.setArrivalShopping("buy-bug-repellent", true);
  assert.equal(store.snapshot().arrivalShopping["buy-bug-repellent"], true);
  assert.equal(localStorage.getItem("hawaii_todo_state"), null);
  assert.equal(localStorage.getItem("hawaii_packing_checklist"), null);
});

test("packing and arrival shopping keep independent completion progress", () => {
  const localState = {
    packing: { p6: true },
    arrivalShopping: { "buy-bug-repellent": true }
  };

  const packing = getPackingProgress(TRIP_DATA, localState);
  const shopping = getArrivalShoppingProgress(TRIP_DATA, localState);
  assert.equal(packing.done, 1);
  assert.equal(shopping.done, 1);
  assert.equal(shopping.total, 3);
});

test("packing reflects the current beach and medication choices", () => {
  const titles = TRIP_DATA.packingCategories.flatMap((category) => category.items.map((item) => item.title));

  assert.ok(titles.includes("泳衣"));
  assert.ok(titles.includes("个人处方药"));
  assert.ok(!titles.some((title) => /防晒冲浪服|浮潜|涉水鞋/.test(title)));
  assert.ok(titles.includes("感冒药"));
  assert.ok(titles.includes("创口贴"));
});

test("packing item ids are unique and sequential in file order", () => {
  const items = TRIP_DATA.packingCategories.flatMap((category) => category.items);
  const ids = items.map((item) => item.id);

  assert.equal(new Set(ids).size, ids.length);
  assert.deepEqual(ids, Array.from({ length: 55 }, (_, index) => `p${index + 1}`));
});

test("packing id migration preserves current checkbox choices", () => {
  globalThis.localStorage = new MemoryStorage();
  globalThis.sessionStorage = new MemoryStorage();
  localStorage.setItem("hawaii_ui_state_v2", JSON.stringify({
    version: 3,
    tasks: {},
    packing: { p10: true, p44: true, p43: true },
    arrivalShopping: {},
    prepareFilter: "all"
  }));

  const store = new LocalTripStore();
  assert.deepEqual(store.snapshot().packing, { p8: true, p15: true, p55: true });
  assert.equal(store.snapshot().version, 4);
});

test("confirmed itinerary updates keep flights and key day changes aligned", () => {
  const day1 = TRIP_DATA.days.find((day) => day.id === "day-1");
  const day4 = TRIP_DATA.days.find((day) => day.id === "day-4");
  const day6 = TRIP_DATA.days.find((day) => day.id === "day-6");

  assert.match(day1.timeline.find((event) => event.id === "d1-flight-as803").info.at(-1)[1], /两人共 1 件/);
  assert.ok(day1.timeline.some((event) => event.id === "d1-arrival-planning"));
  assert.match(day4.timeline[0].title, /Waikiki Hertz 取车/);
  assert.equal(day6.timeline[0].title, "Malia 退房");
  assert.match(day6.timeline.find((event) => event.id === "d6-flight-as826").info.at(-1)[1], /两人共 1 件/);
});

test("fixed booking tasks remain done despite local checkbox state", () => {
  const fixedTasks = TRIP_DATA.tasks.filter((task) => task.fixedDone);

  assert.deepEqual(fixedTasks.map((task) => task.id), ["book-flights", "book-malia-first", "book-sheraton", "book-malia-last"]);
  fixedTasks.forEach((task) => assert.equal(isTaskDone(task, { tasks: { [task.id]: false } }), true));
});
