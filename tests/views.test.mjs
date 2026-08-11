import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

import { TRIP_DATA } from "../js/data.js";
import { renderItinerary, renderOverview, renderTools } from "../js/views.js";

const localState = {
  version: 2,
  tasks: {},
  packing: {},
  prepareFilter: "todo"
};

test("brand surfaces reuse the existing favicon assets", () => {
  const source = readFileSync(new URL("../js/views.js", import.meta.url), "utf8");

  assert.match(source, /assets\/icon-192\.png/);
  assert.match(source, /assets\/favicon-32x32\.png/);
});

test("planning overview has neutral day links, dual clocks, and a highlighted countdown", () => {
  const html = renderOverview(
    TRIP_DATA,
    localState,
    "plan",
    TRIP_DATA.days[3],
    new Date(2026, 7, 11, 12)
  );

  assert.match(html, /class="countdown-number"/);
  assert.match(html, /data-clock="hnl"/);
  assert.match(html, /data-clock="lax"/);
  assert.doesNotMatch(html, /day-chip is-active/);
  assert.match(html, /#itinerary\/day-1/);
  assert.match(html, /class="hero-kicker"/);
  assert.match(html, /class="romantic-grid"/);
  assert.match(html, /第一场日落/);
});

test("itinerary cards open details without a separate detail button", () => {
  const day = TRIP_DATA.days[0];
  const html = renderItinerary(TRIP_DATA, localState, day);
  const triggers = html.match(/class="timeline-card-trigger"/g) || [];

  assert.equal(triggers.length, day.timeline.length);
  assert.doesNotMatch(html, />查看详情<\/button>/);
  assert.match(html, />地图导航<\/a>/);
  assert.match(html, /♡ 双人时光/);
  assert.match(html, /data-mood="romantic"/);
});

test("tools keeps both clocks and groups budget text into a dedicated layout", () => {
  const html = renderTools(TRIP_DATA, localState);

  assert.match(html, /data-clock="hnl"/);
  assert.match(html, /data-clock="lax"/);
  assert.match(html, /class="budget-total"/);
});
