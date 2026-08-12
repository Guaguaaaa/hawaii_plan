import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

import { TRIP_DATA } from "../js/data.js";
import { renderEventDrawer, renderItinerary, renderOverview, renderPrepare, renderTools } from "../js/views.js";

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

test("the iOS PWA topbar respects the device safe area", () => {
  const styles = readFileSync(new URL("../css/style.css", import.meta.url), "utf8");
  const html = readFileSync(new URL("../index.html", import.meta.url), "utf8");

  assert.match(html, /viewport-fit=cover/);
  assert.match(styles, /--safe-area-top:\s*env\(safe-area-inset-top, 0px\)/);
  assert.match(styles, /min-height:\s*calc\(var\(--topbar-height\) \+ var\(--safe-area-top\)\)/);
  assert.match(styles, /padding:\s*calc\(10px \+ var\(--safe-area-top\)\) 18px 10px/);
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

test("event drawers keep only the map navigation action", () => {
  const html = renderEventDrawer(TRIP_DATA.days[0], TRIP_DATA.days[0].timeline[1]);

  assert.match(html, />地图导航<\/a>/);
  assert.doesNotMatch(html, /复制公开信息|查询航班状态|copy-event/);
});

test("prepare separates departure packing, arrival shopping, and souvenirs", () => {
  const html = renderPrepare(TRIP_DATA, localState);

  assert.match(html, />打包清单</);
  assert.match(html, />当地购物清单</);
  assert.match(html, /data-action="toggle-arrival-shopping"/);
  assert.match(html, />纪念品愿望</);
  assert.match(html, /不计入准备或采购进度/);
  assert.doesNotMatch(html, /<h3>纪念品愿望清单<\/h3>/);
});

test("prepare defaults to all tasks and keeps completed tasks at the bottom", () => {
  const html = renderPrepare(TRIP_DATA, { ...localState, prepareFilter: "all" });
  const firstOpenTask = html.indexOf("预订 Waikiki 门店租车");
  const firstFixedTask = html.indexOf("确认洛杉矶往返檀香山机票");

  assert.match(html, /data-filter="all" class="is-active" aria-pressed="true"/);
  assert.ok(firstOpenTask >= 0 && firstFixedTask > firstOpenTask);
  assert.match(html, /data-task-id="book-flights" checked disabled/);
});

test("tools keeps both clocks and groups budget text into a dedicated layout", () => {
  const html = renderTools(TRIP_DATA, localState);

  assert.match(html, /data-clock="hnl"/);
  assert.match(html, /data-clock="lax"/);
  assert.match(html, /class="budget-total"/);
});
