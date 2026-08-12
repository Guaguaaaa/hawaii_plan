import {
  getArrivalShoppingProgress,
  getCountdownDays,
  getCurrentAndNext,
  getHotelForDate,
  getPackingProgress,
  getTaskProgress,
  getTopTasks,
  isTaskDone
} from "./state.js";

const SECTION_LABELS = {
  overview: { plan: "概览", trip: "今日", archive: "回顾" },
  itinerary: { plan: "行程", trip: "行程", archive: "行程" },
  prepare: { plan: "准备", trip: "准备", archive: "清单" },
  tools: { plan: "工具", trip: "工具", archive: "工具" }
};

const SECTION_ICONS = {
  overview: "⌂",
  itinerary: "≡",
  prepare: "✓",
  tools: "+"
};

const TYPE_LABELS = {
  transit: "交通",
  flight: "航班",
  hotel: "住宿",
  relax: "休闲",
  view: "景观",
  food: "餐饮",
  culture: "文化",
  shopping: "购物",
  adventure: "体验",
  attraction: "景点",
  nature: "自然"
};

const PRIORITY_LABELS = {
  urgent: "紧急",
  high: "高优先",
  medium: "普通",
  low: "低优先"
};

export function escapeHtml(value = "") {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function mapUrl(query) {
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`;
}

function currency(value, digits = 0) {
  return new Intl.NumberFormat("zh-CN", {
    minimumFractionDigits: digits,
    maximumFractionDigits: digits
  }).format(value);
}

function coupleRings(extraClass = "") {
  return `<span class="couple-rings ${extraClass}" aria-hidden="true"><i></i><i></i></span>`;
}

function heroKicker(label) {
  return `<div class="hero-kicker">${coupleRings()}<span>${escapeHtml(label)}</span></div>`;
}

function dualClockRow() {
  return `
    <div class="clock-row">
      <div><small>Honolulu</small><strong data-clock="hnl">--:--</strong></div>
      <span aria-label="Honolulu 比 Los Angeles 慢 3 小时">−3h</span>
      <div><small>Los Angeles</small><strong data-clock="lax">--:--</strong></div>
    </div>
  `;
}

function overviewClockCard() {
  return `
    <section class="surface overview-clock-card" aria-label="Honolulu 与 Los Angeles 当前时间">
      <div class="overview-clock-copy">
        <span class="eyebrow">双城时间</span>
        <strong>我们与岛屿的时间</strong>
      </div>
      ${dualClockRow()}
    </section>
  `;
}

function sectionNavItem(section, mode, activeSection) {
  const active = section === activeSection;
  return `
    <a class="app-nav-link ${active ? "is-active" : ""}" href="#${section}" ${active ? 'aria-current="page"' : ""}>
      <span class="app-nav-icon" aria-hidden="true">${SECTION_ICONS[section]}</span>
      <span>${SECTION_LABELS[section][mode]}</span>
    </a>
  `;
}

export function renderNavigation(data, mode, activeSection) {
  const navItems = Object.keys(SECTION_LABELS)
    .map((section) => sectionNavItem(section, mode, activeSection))
    .join("");

  document.querySelector("#desktop-nav").innerHTML = `
    <div class="brand-block">
      <div class="brand-mark" aria-hidden="true"><img class="brand-image" src="./assets/icon-192.png" alt=""></div>
      <div>
        <strong>Oahu for Two</strong>
        <span>${escapeHtml(data.meta.tagline)}</span>
      </div>
    </div>
    <nav class="app-nav-list" aria-label="主导航">${navItems}</nav>
    <div class="sidebar-note">
      <span class="status-dot"></span>
      <span>本机保存 · 支持离线</span>
    </div>
  `;

  document.querySelector("#mobile-nav").innerHTML = navItems;
}

export function renderTopbar(data, mode, autoMode) {
  const modeLabels = { plan: "计划模式", trip: "旅行模式", archive: "回顾模式" };
  const topbar = document.querySelector("#topbar");
  topbar.innerHTML = `
    <div class="topbar-brand">
      <img class="topbar-brand-image" src="./assets/favicon-32x32.png" alt="" aria-hidden="true">
      <div class="topbar-copy">
        <span class="eyebrow">${escapeHtml(data.meta.destinationLabel)} · 双人假期</span>
        <strong>${escapeHtml(data.meta.title)}</strong>
      </div>
    </div>
    <div class="topbar-actions">
      <label class="mode-picker">
        <span>视图</span>
        <select id="mode-select" aria-label="切换网站模式">
          <option value="auto" ${mode === autoMode ? "selected" : ""}>自动 · ${modeLabels[autoMode]}</option>
          <option value="plan" ${mode !== autoMode && mode === "plan" ? "selected" : ""}>计划预览</option>
          <option value="trip" ${mode !== autoMode && mode === "trip" ? "selected" : ""}>旅行预览</option>
          <option value="archive" ${mode !== autoMode && mode === "archive" ? "selected" : ""}>回顾预览</option>
        </select>
      </label>
      <button class="icon-button" type="button" data-action="refresh-weather" aria-label="刷新天气" title="刷新天气">↻</button>
    </div>
  `;
}

function dayStrip(data, selectedId, target = "itinerary") {
  return `
    <div class="day-strip" aria-label="六日行程概览">
      ${data.days.map((day) => `
        <a class="day-chip ${day.id === selectedId ? "is-active" : ""}" href="#${target}/${day.id}" ${day.id === selectedId ? 'aria-current="date"' : ""}>
          <span>Day ${day.dayNum}</span>
          <strong>${day.shortDate}</strong>
          <small>${escapeHtml(day.title)}</small>
          <em>${escapeHtml(day.vibe)}</em>
        </a>
      `).join("")}
    </div>
  `;
}

function progressBlock(label, progress) {
  return `
    <div class="progress-block">
      <div class="progress-heading">
        <span>${label}</span>
        <strong>${progress.done}/${progress.total}</strong>
      </div>
      <progress value="${progress.done}" max="${progress.total}">${progress.percent}%</progress>
      <small>${progress.percent}% 已完成</small>
    </div>
  `;
}

function compactTask(task, localState) {
  const checked = isTaskDone(task, localState);
  return `
    <label class="compact-task ${checked ? "is-done" : ""}">
      <input type="checkbox" data-action="toggle-task" data-task-id="${task.id}" ${checked ? "checked" : ""}>
      <span class="compact-task-copy">
        <strong>${escapeHtml(task.title)}</strong>
        <small>${escapeHtml(task.deadlineLabel)} · ${escapeHtml(task.notes)}</small>
      </span>
      <span class="priority priority-${task.priority}">${PRIORITY_LABELS[task.priority]}</span>
    </label>
  `;
}

function romanticMoments(data) {
  const featuredIds = new Set(["d1-sunset-dinner", "d3-dinner", "d4-tantalus"]);
  const moments = data.days.flatMap((day) => day.timeline
    .filter((event) => featuredIds.has(event.id))
    .map((event) => ({ day, event })));

  return `
    <section class="content-section romantic-section" aria-labelledby="romantic-moments-title">
      <div class="section-heading romantic-heading">
        <div><span class="eyebrow">For two</span><h2 id="romantic-moments-title">留给彼此的岛屿时刻</h2></div>
        <span>日落 · 海风 · 晚餐</span>
      </div>
      <div class="romantic-grid">
        ${moments.map(({ day, event }, index) => `
          <a class="romantic-card" href="#itinerary/${day.id}">
            <span class="moment-index">0${index + 1}</span>
            <span class="moment-copy">
              <small>Day ${day.dayNum} · ${escapeHtml(day.vibe)}</small>
              <strong>${escapeHtml(event.title)}</strong>
              <span>${escapeHtml(event.details)}</span>
            </span>
            <span class="moment-arrow" aria-hidden="true">↗</span>
          </a>
        `).join("")}
      </div>
    </section>
  `;
}

function overviewPlan(data, localState, now) {
  const taskProgress = getTaskProgress(data, localState);
  const packingProgress = getPackingProgress(data, localState);
  const topTasks = getTopTasks(data, localState);
  const countdown = getCountdownDays(data, now);
  const completedReservations = data.reservations.filter((item) => {
    const task = data.tasks.find((candidate) => candidate.id === item.taskId);
    return task && isTaskDone(task, localState);
  }).length;

  return `
    <section class="overview-hero planning-hero" aria-labelledby="overview-title">
      <div class="hero-copy">
        ${heroKicker("两个人的海岛假期")}
        <span class="eyebrow">出发前工作台</span>
        <h1 id="overview-title">${countdown > 0 ? `距离出发还有 <span class="countdown-number">${countdown}</span> 天` : "旅程即将开始"}</h1>
        <p>把重要预约和打包收好，把日落、海风和相处的时间留给彼此。</p>
      </div>
      <div class="hero-weather" data-weather aria-live="polite">
        <span class="weather-kicker">Honolulu 天气</span>
        <strong>正在获取…</strong>
        <small>联网后自动更新</small>
      </div>
    </section>

    ${overviewClockCard()}

    <section class="dashboard-grid" aria-label="准备进度">
      <article class="surface progress-card">
        <div class="section-heading compact">
          <div><span class="eyebrow">准备状态</span><h2>进度一览</h2></div>
          <a href="#prepare">查看全部</a>
        </div>
        ${progressBlock("待办与预约", taskProgress)}
        ${progressBlock("打包清单", packingProgress)}
      </article>
      <article class="surface reservation-summary">
        <span class="eyebrow">强预约项目</span>
        <strong class="summary-number">${completedReservations}<small> / ${data.reservations.length}</small></strong>
        <p>${completedReservations === data.reservations.length ? "预约项目已全部确认" : "仍有热门项目需要确认"}</p>
        <a class="text-link" href="#prepare">前往预约中心 →</a>
      </article>
      <article class="surface stay-summary">
        <span class="eyebrow">住宿安排</span>
        <strong class="summary-number">5<small> 晚</small></strong>
        <p>Malia 3 晚 · Sheraton 2 晚</p>
        <a class="text-link" href="#tools">查看住宿与交通 →</a>
      </article>
    </section>

    <section class="content-section" aria-labelledby="priority-title">
      <div class="section-heading">
        <div><span class="eyebrow">下一步</span><h2 id="priority-title">现在最重要的事</h2></div>
        <a href="#prepare">全部待办</a>
      </div>
      <div class="surface task-stack">
        ${topTasks.length ? topTasks.map((task) => compactTask(task, localState)).join("") : '<div class="empty-state">所有准备事项都完成了。</div>'}
      </div>
    </section>

    <section class="content-section" aria-labelledby="trip-outline-title">
      <div class="section-heading">
        <div><span class="eyebrow">六日蓝图</span><h2 id="trip-outline-title">整段旅程，一眼看清</h2></div>
        <a href="#itinerary/${data.days[0].id}">打开详细行程</a>
      </div>
      ${dayStrip(data, null)}
    </section>

    ${romanticMoments(data)}
  `;
}

function eventQuickCard(label, event, emptyText) {
  if (!event) return `
    <article class="surface now-card is-empty">
      <span class="eyebrow">${label}</span>
      <h2>${emptyText}</h2>
      <p>可以从完整行程中选择其他日期查看。</p>
    </article>
  `;

  return `
    <article class="surface now-card">
      <span class="eyebrow">${label}</span>
      <div class="now-time">${event.startTime}</div>
      <h2>${escapeHtml(event.title)}</h2>
      <p>${escapeHtml(event.details)}</p>
      <div class="button-row">
        ${event.mapQuery ? `<a class="button button-primary" href="${mapUrl(event.mapQuery)}" target="_blank" rel="noopener">开始导航</a>` : ""}
        <button class="button button-quiet" type="button" data-action="open-event" data-event-id="${event.id}">查看详情</button>
      </div>
    </article>
  `;
}

function overviewTrip(data, localState, selectedDay, now) {
  const active = getCurrentAndNext(selectedDay, now);
  const hotel = getHotelForDate(data, selectedDay.dateISO);
  const taskProgress = getTaskProgress(data, localState);

  return `
    <section class="overview-hero trip-hero" aria-labelledby="today-title">
      <div class="hero-copy">
        ${heroKicker("正在岛上 · 一起慢下来")}
        <span class="eyebrow">Day ${selectedDay.dayNum} · ${selectedDay.dateLabel}</span>
        <h1 id="today-title">${escapeHtml(selectedDay.title)}</h1>
        <p>${escapeHtml(selectedDay.summary)}</p>
      </div>
      <div class="hero-weather" data-weather aria-live="polite">
        <span class="weather-kicker">Honolulu 天气</span>
        <strong>正在获取…</strong>
        <small>联网后自动更新</small>
      </div>
    </section>

    ${overviewClockCard()}

    <section class="today-grid" aria-label="今日重点">
      ${eventQuickCard("正在进行", active.current, "现在没有进行中的安排")}
      ${eventQuickCard("下一项", active.next, active.complete ? "今天的行程已经结束" : "暂无下一项安排")}
      <article class="surface tonight-card">
        <span class="eyebrow">今晚住宿</span>
        <h2>${hotel ? escapeHtml(hotel.name) : "今晚无需酒店"}</h2>
        <p>${hotel ? escapeHtml(hotel.address) : "当天返回洛杉矶"}</p>
        <div class="button-row">
          ${hotel ? `<a class="button button-primary" href="${mapUrl(hotel.address)}" target="_blank" rel="noopener">导航到酒店</a>` : ""}
          <a class="button button-quiet" href="#tools">旅行工具</a>
        </div>
      </article>
    </section>

    <section class="content-section">
      <div class="section-heading">
        <div><span class="eyebrow">日期</span><h2>切换每日行程</h2></div>
        <a href="#itinerary/${selectedDay.id}">查看完整时间线</a>
      </div>
      ${dayStrip(data, selectedDay.id, "overview")}
    </section>

    <section class="surface trip-footnote">
      <div><strong>${taskProgress.percent}%</strong><span>准备事项已完成</span></div>
      <a href="#prepare">查看尚未完成的准备 →</a>
    </section>
  `;
}

function overviewArchive(data, localState) {
  const taskProgress = getTaskProgress(data, localState);
  const packingProgress = getPackingProgress(data, localState);
  return `
    <section class="overview-hero archive-hero">
      <div class="hero-copy">
        ${heroKicker("两个人的岛屿回忆")}
        <span class="eyebrow">双人旅程回顾</span>
        <h1>六天五晚，一座岛，两个人</h1>
        <p>海边日落、山海公路与度假时光都留在这里，随时可以一起回看。</p>
      </div>
      <div class="archive-stat"><strong>6</strong><span>旅行日</span></div>
    </section>
    ${overviewClockCard()}
    <section class="dashboard-grid">
      <article class="surface progress-card">${progressBlock("旅行准备", taskProgress)}${progressBlock("打包记录", packingProgress)}</article>
      <article class="surface reservation-summary"><span class="eyebrow">足迹</span><strong class="summary-number">${data.days.reduce((sum, day) => sum + day.timeline.length, 0)}<small> 项</small></strong><p>航班、海滩、文化与环岛行程</p></article>
      <article class="surface stay-summary"><span class="eyebrow">住宿</span><strong class="summary-number">5<small> 晚</small></strong><p>Waikiki Malia 与 Sheraton Waikiki</p></article>
    </section>
    <section class="content-section">
      <div class="section-heading"><div><span class="eyebrow">完整旅程</span><h2>按日期回看</h2></div><a href="#itinerary/${data.days[0].id}">打开时间线</a></div>
      ${dayStrip(data, null)}
    </section>
    ${romanticMoments(data)}
  `;
}

export function renderOverview(data, localState, mode, selectedDay, now = new Date()) {
  if (mode === "trip") return overviewTrip(data, localState, selectedDay, now);
  if (mode === "archive") return overviewArchive(data, localState);
  return overviewPlan(data, localState, now);
}

function taskStatusForEvent(event, data, localState) {
  if (!event.taskId) return "";
  const task = data.tasks.find((item) => item.id === event.taskId);
  const done = task ? isTaskDone(task, localState) : false;
  return `<span class="timeline-status ${done ? "is-done" : "is-pending"}">${done ? "已确认" : "待确认"}</span>`;
}

export function renderItinerary(data, localState, selectedDay) {
  return `
    <section class="page-intro">
      <div><span class="eyebrow">两个人的每日路线</span><h1>六日行程</h1><p>把路线交给时间，把沿途的海风与风景留给彼此。</p></div>
    </section>
    ${dayStrip(data, selectedDay.id)}
    <section class="itinerary-layout">
      <aside class="surface day-summary-card">
        <span class="day-index">Day ${selectedDay.dayNum}</span>
        <span class="day-vibe">${coupleRings()}${escapeHtml(selectedDay.vibe)}</span>
        <h2>${escapeHtml(selectedDay.title)}</h2>
        <p>${escapeHtml(selectedDay.summary)}</p>
        <dl>
          <div><dt>日期</dt><dd>${escapeHtml(selectedDay.dateLabel)}</dd></div>
          <div><dt>交通</dt><dd>${escapeHtml(selectedDay.transport)}</dd></div>
          <div><dt>住宿</dt><dd>${escapeHtml(selectedDay.hotel)}</dd></div>
        </dl>
      </aside>
      <div class="surface timeline-panel">
        <div class="section-heading compact"><div><span class="eyebrow">${selectedDay.dateLabel}</span><h2>时间线</h2></div><span>${selectedDay.timeline.length} 项安排</span></div>
        <ol class="timeline-list">
          ${selectedDay.timeline.map((event) => `
            <li class="timeline-entry" data-event-type="${event.type}" ${event.mood ? `data-mood="${event.mood}"` : ""}>
              <time datetime="${selectedDay.dateISO}T${event.startTime}">${event.startTime}</time>
              <span class="timeline-node" aria-hidden="true"></span>
              <article class="timeline-card">
                <button class="timeline-card-trigger" type="button" data-action="open-event" data-event-id="${event.id}" aria-label="查看${escapeHtml(event.title)}的详情"></button>
                <div class="timeline-title-row">
                  <div><span class="type-label">${TYPE_LABELS[event.type] || "行程"}</span><h3>${escapeHtml(event.title)}</h3></div>
                  <div class="timeline-badges">${event.mood === "romantic" ? '<span class="moment-badge">♡ 双人时光</span>' : ""}${event.badge ? `<span class="badge">${escapeHtml(event.badge)}</span>` : ""}${taskStatusForEvent(event, data, localState)}</div>
                </div>
                <p>${escapeHtml(event.details)}</p>
                <div class="timeline-actions">
                  ${event.mapQuery ? `<a href="${mapUrl(event.mapQuery)}" target="_blank" rel="noopener">地图导航</a>` : ""}
                  <button type="button" data-action="copy-event" data-event-id="${event.id}">复制信息</button>
                </div>
              </article>
            </li>
          `).join("")}
        </ol>
      </div>
    </section>
  `;
}

function reservationCard(item, data, localState) {
  const task = data.tasks.find((candidate) => candidate.id === item.taskId);
  const done = task ? isTaskDone(task, localState) : false;
  return `
    <article class="reservation-card ${done ? "is-done" : ""}">
      <div class="reservation-top"><span class="status-pill ${done ? "status-done" : "status-pending"}">${done ? "已确认" : "待确认"}</span><span>${escapeHtml(item.window)}</span></div>
      <h3>${escapeHtml(item.name)}</h3>
      <p>${escapeHtml(item.notes)}</p>
      <div class="button-row">
        <a class="button button-primary" href="${item.officialLink}" target="_blank" rel="noopener">官方入口</a>
        <a class="button button-quiet" href="${mapUrl(item.mapQuery)}" target="_blank" rel="noopener">查看位置</a>
      </div>
    </article>
  `;
}

function fullTask(task, localState) {
  const checked = isTaskDone(task, localState);
  const fixed = Boolean(task.fixedDone);
  return `
    <label class="task-row ${checked ? "is-done" : ""} ${fixed ? "is-fixed" : ""}">
      <input type="checkbox" data-action="toggle-task" data-task-id="${task.id}" ${checked ? "checked" : ""} ${fixed ? "disabled" : ""}>
      <span class="task-checkmark" aria-hidden="true"></span>
      <span class="task-copy"><strong>${escapeHtml(task.title)}</strong><small>${escapeHtml(task.notes)}</small></span>
      <span class="task-meta"><span class="priority priority-${task.priority}">${PRIORITY_LABELS[task.priority]}</span><small>${escapeHtml(task.deadlineLabel)}</small></span>
    </label>
  `;
}

export function renderPrepare(data, localState) {
  const taskProgress = getTaskProgress(data, localState);
  const packingProgress = getPackingProgress(data, localState);
  const arrivalShoppingProgress = getArrivalShoppingProgress(data, localState);
  const filter = localState.prepareFilter || "all";
  const visibleTasks = data.tasks.filter((task) => {
    if (filter === "all") return true;
    return filter === "done" ? isTaskDone(task, localState) : !isTaskDone(task, localState);
  }).sort((a, b) => Number(isTaskDone(a, localState)) - Number(isTaskDone(b, localState)));

  return `
    <section class="page-intro page-intro-with-progress">
      <div><span class="eyebrow">为两个人收好琐事</span><h1>准备中心</h1><p>把预约、待办和行李提前收好，把旅行时间留给彼此。</p></div>
      <div class="mini-progress"><strong>${taskProgress.percent}%</strong><span>待办完成</span></div>
    </section>

    <section class="content-section">
      <div class="section-heading"><div><span class="eyebrow">预约入口</span><h2>热门项目</h2></div><span>${data.reservations.length} 个项目</span></div>
      <div class="reservation-grid">${data.reservations.map((item) => reservationCard(item, data, localState)).join("")}</div>
    </section>

    <section class="content-section">
      <div class="section-heading tasks-heading">
        <div><span class="eyebrow">行动清单</span><h2>待办事项</h2></div>
        <div class="segmented-control" role="group" aria-label="筛选待办">
          ${[["todo", "待完成"], ["done", "已完成"], ["all", "全部"]].map(([value, label]) => `<button type="button" data-action="filter-tasks" data-filter="${value}" class="${filter === value ? "is-active" : ""}" aria-pressed="${filter === value}">${label}</button>`).join("")}
        </div>
      </div>
      <div class="surface task-list">${visibleTasks.length ? visibleTasks.map((task) => fullTask(task, localState)).join("") : '<div class="empty-state">这个分类里暂时没有事项。</div>'}</div>
    </section>

    <section class="content-section">
      <div class="section-heading"><div><span class="eyebrow">出发前 · 收进行李</span><h2>打包清单</h2></div><span>${packingProgress.done}/${packingProgress.total} 完成</span></div>
      <div class="packing-grid">
        ${data.packingCategories.map((category) => `
          <article class="surface packing-card">
            <h3>${escapeHtml(category.title)}</h3>
            <div class="packing-items">
              ${category.items.map((item) => {
                const checked = Boolean(localState.packing[item.id]);
                return `<label class="packing-item ${checked ? "is-done" : ""}"><input type="checkbox" data-action="toggle-packing" data-packing-id="${item.id}" ${checked ? "checked" : ""}><span>${escapeHtml(item.title)}</span></label>`;
              }).join("")}
            </div>
          </article>
        `).join("")}
      </div>
    </section>

    <section class="content-section local-shopping-section">
      <div class="section-heading"><div><span class="eyebrow">抵达后 · 当地购买</span><h2>当地购物清单</h2><p class="section-description">补给与纪念品集中在这里；只有抵达后需要使用的物品会计入采购进度。</p></div><span>${arrivalShoppingProgress.done}/${arrivalShoppingProgress.total} 补给已购</span></div>
      <article class="surface local-shopping-card">
        <div class="local-shopping-group arrival-shopping-group">
          <div class="local-shopping-group-heading"><span class="eyebrow">优先补齐</span><h3>抵达后补给</h3></div>
          ${(data.arrivalShoppingCategories || []).map((category) => `
            <div class="packing-items" aria-label="${escapeHtml(category.title)}">
              ${category.items.map((item) => {
                const checked = Boolean(localState.arrivalShopping?.[item.id]);
                return `<label class="packing-item ${checked ? "is-done" : ""}"><input type="checkbox" data-action="toggle-arrival-shopping" data-arrival-shopping-id="${item.id}" ${checked ? "checked" : ""}><span>${escapeHtml(item.title)}</span></label>`;
              }).join("")}
            </div>
          `).join("")}
        </div>
        <div class="local-shopping-group souvenir-wishlist-group">
          <div class="local-shopping-group-heading"><span class="eyebrow">慢慢挑选</span><h3>纪念品愿望</h3><p>不计入准备或采购进度。</p></div>
          <div class="souvenir-wishlist-items">${(data.souvenirWishlist || []).map((item) => `<span>${escapeHtml(item.title)}</span>`).join("")}</div>
        </div>
      </article>
    </section>
  `;
}

function hotelCard(hotel, data, localState) {
  const task = data.tasks.find((item) => item.id === hotel.taskId);
  const confirmed = task ? isTaskDone(task, localState) : hotel.status === "confirmed";
  return `
    <article class="hotel-card">
      <div class="hotel-card-top"><span class="status-pill ${confirmed ? "status-done" : "status-pending"}">${confirmed ? "已确认" : "待确认"}</span><strong>¥${currency(hotel.priceRMB, 2)}</strong></div>
      <h3>${escapeHtml(hotel.name)}</h3>
      <p>${escapeHtml(hotel.dateLabel)} · ${escapeHtml(hotel.notes)}</p>
      <address>${escapeHtml(hotel.address)}</address>
      <div class="button-row"><a class="button button-primary" href="${mapUrl(hotel.address)}" target="_blank" rel="noopener">导航</a><button class="button button-quiet" type="button" data-action="copy-text" data-copy="${escapeHtml(`${hotel.name} · ${hotel.address}`)}">复制地址</button></div>
    </article>
  `;
}

export function renderTools(data, localState) {
  const rate = data.meta.exchangeRate;
  const budget = data.budget;
  const extrasRMB = (budget.rentalCarUSD + budget.parkingUSD + budget.gasUSD + budget.ticketsUSD + budget.foodUSD) * rate;
  const totalRMB = budget.hotelsRMB + extrasRMB;
  const perPersonRMB = totalRMB / data.meta.travelers;

  return `
    <section class="page-intro">
      <div><span class="eyebrow">安心去看海</span><h1>旅行工具</h1><p>住宿、交通、天气、医疗与预算收在一起，让度假保持轻松。</p></div>
    </section>

    <section class="utility-grid">
      <article class="surface utility-card time-card">
        <span class="eyebrow">当地时间</span>
        ${dualClockRow()}
      </article>
      <article class="surface utility-card weather-card" data-weather aria-live="polite"><span class="eyebrow">Honolulu 天气</span><strong>正在获取…</strong><small>联网后自动更新</small></article>
      <article class="surface utility-card budget-card">
        <span class="eyebrow">预算总览 · 2人</span>
        <div class="budget-total"><strong>¥${currency(totalRMB)}</strong><small>人均约 ¥${currency(perPersonRMB)}</small></div>
      </article>
    </section>

    <section class="content-section">
      <div class="section-heading"><div><span class="eyebrow">五晚住宿</span><h2>酒店安排</h2></div><span>总计 ¥${currency(budget.hotelsRMB, 2)}</span></div>
      <div class="hotel-grid">${data.hotels.map((hotel) => hotelCard(hotel, data, localState)).join("")}</div>
    </section>

    <section class="content-section tools-split">
      <article class="surface detail-card">
        <div class="section-heading compact"><div><span class="eyebrow">自驾</span><h2>租车与费用</h2></div><span class="status-pill status-pending">待确认</span></div>
        <dl class="detail-list">
          <div><dt>租期</dt><dd>${escapeHtml(data.rentalCar.period)}</dd></div>
          <div><dt>门店</dt><dd>${escapeHtml(data.rentalCar.providers)}</dd></div>
          <div><dt>车型</dt><dd>${escapeHtml(data.rentalCar.carTypes.join(" / "))}</dd></div>
          <div><dt>租车预算</dt><dd>$${data.rentalCar.costEstimateUSD}</dd></div>
          <div><dt>里程 / 油费</dt><dd>${escapeHtml(data.rentalCar.totalMileage)} · 约 $${data.rentalCar.gasEstimateUSD}</dd></div>
        </dl>
      </article>
      <article class="surface detail-card">
        <div class="section-heading compact"><div><span class="eyebrow">费用</span><h2>预算拆分</h2></div><span>汇率 ${rate}</span></div>
        <dl class="detail-list">
          <div><dt>酒店</dt><dd>¥${currency(budget.hotelsRMB, 2)}</dd></div>
          <div><dt>租车</dt><dd>$${budget.rentalCarUSD}</dd></div>
          <div><dt>停车 / 油费</dt><dd>$${budget.parkingUSD + budget.gasUSD}</dd></div>
          <div><dt>门票活动</dt><dd>$${budget.ticketsUSD}</dd></div>
          <div><dt>餐饮</dt><dd>$${budget.foodUSD}</dd></div>
        </dl>
      </article>
    </section>

    <section class="content-section" id="medical">
      <div class="section-heading"><div><span class="eyebrow">紧急备用</span><h2>医疗与 Urgent Care</h2></div><strong class="emergency-label">危及生命请拨 911</strong></div>
      <div class="clinic-grid">
        ${data.urgentCare.map((clinic) => `
          <article class="clinic-card">
            <span>${escapeHtml(clinic.context)}</span><h3>${escapeHtml(clinic.name)}</h3><p>${escapeHtml(clinic.notes)}</p>
            <address>${escapeHtml(clinic.location)}</address><small>${escapeHtml(clinic.hours)}</small>
            <div class="button-row"><a class="button button-danger" href="tel:${clinic.phone.replace(/\D/g, "")}">拨打 ${escapeHtml(clinic.phone)}</a><a class="button button-quiet" href="${mapUrl(clinic.mapQuery)}" target="_blank" rel="noopener">地图</a></div>
          </article>
        `).join("")}
      </div>
    </section>
  `;
}

export function findEvent(data, eventId) {
  for (const day of data.days) {
    const event = day.timeline.find((item) => item.id === eventId);
    if (event) return { day, event };
  }
  return null;
}

export function renderEventDrawer(day, event) {
  const infoRows = (event.info || []).map(([label, value]) => `<div><dt>${escapeHtml(label)}</dt><dd>${escapeHtml(value)}</dd></div>`).join("");
  return `
    <div class="drawer-handle" aria-hidden="true"></div>
    <div class="drawer-header">
      <div><span class="eyebrow">Day ${day.dayNum} · ${TYPE_LABELS[event.type] || "行程"}${event.mood === "romantic" ? " · 双人时光" : ""}</span><h2 id="drawer-title">${escapeHtml(event.title)}</h2></div>
      <button class="icon-button" type="button" data-action="close-drawer" aria-label="关闭详情">×</button>
    </div>
    <div class="drawer-body">
      <div class="drawer-summary"><time>${event.startTime}${event.endTime ? `–${event.endTime}` : ""}</time><span>${escapeHtml(event.location)}</span></div>
      ${event.mood === "romantic" ? '<div class="drawer-moment-note"><span aria-hidden="true">♡</span> 适合一起放慢脚步的岛屿时刻</div>' : ""}
      <p>${escapeHtml(event.details)}</p>
      ${infoRows ? `<dl class="detail-list drawer-info">${infoRows}</dl>` : ""}
      <div class="drawer-actions">
        ${event.mapQuery ? `<a class="button button-primary" href="${mapUrl(event.mapQuery)}" target="_blank" rel="noopener">地图导航</a>` : ""}
      </div>
    </div>
  `;
}
