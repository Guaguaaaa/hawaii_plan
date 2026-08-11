import test from "node:test";
import assert from "node:assert/strict";

import { TRIP_DATA } from "../js/data.js";
import {
  LocalTripStore,
  getAutoMode,
  getCurrentAndNext,
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
  localStorage.setItem("hawaii_packing_checklist", JSON.stringify({ p6: true }));

  const store = new LocalTripStore();
  assert.equal(store.snapshot().tasks["book-malia-first"], true);
  assert.equal(store.snapshot().packing.p6, true);
  assert.equal(localStorage.getItem("hawaii_todo_state"), null);
  assert.equal(localStorage.getItem("hawaii_packing_checklist"), null);
});
