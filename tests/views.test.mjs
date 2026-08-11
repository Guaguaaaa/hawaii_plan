import test from "node:test";
import assert from "node:assert/strict";

import { TRIP_DATA } from "../js/data.js";
import { renderItinerary, renderOverview, renderTools } from "../js/views.js";

const localState = {
  version: 2,
  tasks: {},
  packing: {},
  prepareFilter: "todo"
};

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
});

test("itinerary cards open details without a separate detail button", () => {
  const day = TRIP_DATA.days[0];
  const html = renderItinerary(TRIP_DATA, localState, day);
  const triggers = html.match(/class="timeline-card-trigger"/g) || [];

  assert.equal(triggers.length, day.timeline.length);
  assert.doesNotMatch(html, />查看详情<\/button>/);
  assert.match(html, />地图导航<\/a>/);
});

test("tools keeps both clocks and groups budget text into a dedicated layout", () => {
  const html = renderTools(TRIP_DATA, localState);

  assert.match(html, /data-clock="hnl"/);
  assert.match(html, /data-clock="lax"/);
  assert.match(html, /class="budget-total"/);
});
