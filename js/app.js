/**
 * Hawaii Oahu Trip 2026 Interactive Application Controller
 */

document.addEventListener('DOMContentLoaded', () => {
  initApp();
  initLiveClocks();
  fetchLiveWeather();
});

function initApp() {
  renderTodoList();
  renderItineraryDays();
  renderHotels();
  renderUrgentCare();
  renderReservations();
  renderChecklist();
  renderBudget();
  setupEventListeners();
  setupDayPills();

  fetchGoogleSheetsData();
}

function renderUrgentCare() {
  const container = document.getElementById('urgentCareList');
  if (!container || !TRIP_DATA.urgentCare) return;

  let html = '';
  TRIP_DATA.urgentCare.forEach(clinic => {
    const mapUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(clinic.mapQuery)}`;
    
    html += `
      <div style="background: var(--bg-subtle); padding: 1rem; border-radius: var(--radius-md); margin-bottom: 1rem; border-left: 4px solid var(--badge-food);">
        <div style="font-weight:700; font-size:1.05rem; margin-bottom:0.2rem; display:flex; justify-content:space-between; flex-wrap:wrap;">
          <span>🏥 ${clinic.name}</span>
          <a href="tel:${clinic.phone.replace(/[^0-9]/g, '')}" style="color:var(--primary-ocean); font-weight:700; text-decoration:none;">📞 ${clinic.phone}</a>
        </div>
        <div style="font-size:0.85rem; color:var(--text-muted);">📍 ${clinic.location}</div>
        <div style="font-size:0.85rem; color:var(--text-muted); margin-top:0.2rem;">⏰ 营业时间: ${clinic.hours}</div>
        <div style="font-size:0.85rem; color:var(--text-main); margin-top:0.4rem;">💡 ${clinic.notes}</div>
        <div style="margin-top:0.6rem; display:flex; gap:0.5rem;">
          <a href="${mapUrl}" target="_blank" class="btn-action" style="font-size:0.75rem;">📍 地图导航</a>
          <a href="tel:${clinic.phone.replace(/[^0-9]/g, '')}" class="btn-action" style="font-size:0.75rem; background:var(--badge-food); color:white;">📞 拨打电话</a>
        </div>
      </div>
    `;
  });

  container.innerHTML = html;
}

// 1. Render Todo List (Priority, DDL, Phase)
function renderTodoList(customList = null) {
  const container = document.getElementById('todoContainer');
  if (!container) return;

  const list = customList || TRIP_DATA.todoList;
  if (!list || list.length === 0) return;

  // Group by Phase
  const groups = {};
  list.forEach(item => {
    const phase = item.phase || item['Phase'] || item['阶段'] || '📌 待办事项';
    if (!groups[phase]) groups[phase] = [];
    groups[phase].push(item);
  });

  const savedState = JSON.parse(localStorage.getItem('hawaii_todo_state') || '{}');

  let html = '';
  Object.keys(groups).forEach(phaseName => {
    let itemsHTML = '';
    groups[phaseName].forEach((task, idx) => {
      const taskId = `todo_${phaseName}_${idx}`;
      const isDone = !!savedState[taskId] || task.status === '已完成' || task['Status'] === '已完成';
      const taskText = task.task || task['Task'] || task['待办事项'] || '';
      const priority = task.priority || task['Priority'] || task['优先级'] || '🟡 中';
      const ddl = task.deadline || task['Deadline'] || task['截止日期'] || '';
      const notes = task.notes || task['Notes'] || task['详细说明'] || '';

      itemsHTML += `
        <div class="timeline-content ${isDone ? 'completed-task' : ''}" style="margin-bottom: 0.75rem; border-left: 4px solid ${priority.includes('紧急') ? '#ef4444' : priority.includes('高') ? '#f97316' : '#0284c7'};">
          <div class="item-top">
            <label style="display:flex; align-items:center; gap:0.6rem; cursor:pointer; font-weight:700; font-size:1.05rem;">
              <input type="checkbox" ${isDone ? 'checked' : ''} onchange="toggleTodoStatus('${taskId}', this)" style="width:18px; height:18px; accent-color:var(--primary-ocean);">
              <span class="todo-title-text" style="${isDone ? 'text-decoration: line-through; color: var(--text-light);' : ''}">${taskText}</span>
            </label>
            <div class="item-badges">
              <span class="badge-tag" style="background: var(--bg-card); border: 1px solid var(--border-color);">${priority}</span>
              ${ddl ? `<span class="badge-tag need-booking">⏰ DDL: ${ddl}</span>` : ''}
            </div>
          </div>
          ${notes ? `<div class="activity-details" style="margin-top:0.4rem; font-size:0.85rem;">💡 ${notes}</div>` : ''}
        </div>
      `;
    });

    html += `
      <div class="info-card" style="margin-bottom: 1.5rem;">
        <div class="card-title">${phaseName}</div>
        <div>${itemsHTML}</div>
      </div>
    `;
  });

  container.innerHTML = html;
}

function toggleTodoStatus(id, checkboxEl) {
  const savedState = JSON.parse(localStorage.getItem('hawaii_todo_state') || '{}');
  savedState[id] = checkboxEl.checked;
  localStorage.setItem('hawaii_todo_state', JSON.stringify(savedState));

  const titleTextEl = checkboxEl.closest('.item-top').querySelector('.todo-title-text');
  if (checkboxEl.checked) {
    titleTextEl.style.textDecoration = 'line-through';
    titleTextEl.style.color = 'var(--text-light)';
  } else {
    titleTextEl.style.textDecoration = 'none';
    titleTextEl.style.color = 'var(--text-main)';
  }
}

// 2. Fetch Live Google Sheets if URLs configured
async function fetchGoogleSheetsData() {
  if (!TRIP_DATA.googleSheets) return;

  // Live Budget from Google Sheets
  if (TRIP_DATA.googleSheets.budgetCsvUrl) {
    try {
      const res = await fetch(TRIP_DATA.googleSheets.budgetCsvUrl);
      const csvText = await res.text();
      const rows = parseCSV(csvText);
      if (rows && rows.length > 0) renderGoogleSheetsBudget(rows);
    } catch (e) { console.warn('Google Sheets Budget error:', e); }
  }

  // Live Todo from Google Sheets
  if (TRIP_DATA.googleSheets.todoCsvUrl) {
    try {
      const res = await fetch(TRIP_DATA.googleSheets.todoCsvUrl);
      const csvText = await res.text();
      const rows = parseCSV(csvText);
      if (rows && rows.length > 0) renderTodoList(rows);
    } catch (e) { console.warn('Google Sheets Todo error:', e); }
  }

  // Live Packing Checklist from Google Sheets
  if (TRIP_DATA.googleSheets.checklistCsvUrl) {
    try {
      const res = await fetch(TRIP_DATA.googleSheets.checklistCsvUrl);
      const csvText = await res.text();
      const rows = parseCSV(csvText);
      if (rows && rows.length > 0) renderGoogleSheetsChecklist(rows);
    } catch (e) { console.warn('Google Sheets Checklist error:', e); }
  }
}

function renderGoogleSheetsChecklist(rows) {
  const container = document.getElementById('checklistContainer');
  if (!container) return;

  const savedState = JSON.parse(localStorage.getItem('hawaii_packing_checklist') || '{}');
  const categories = {};

  rows.forEach((r, idx) => {
    const cat = r.Category || r['类别'] || '📦 物品清单';
    if (!categories[cat]) categories[cat] = [];
    categories[cat].push({
      id: `gs_check_${idx}`,
      text: r.Item || r['准备物品'] || '',
      priority: r.Priority || r['优先级'] || '',
      notes: r.Notes || r['备注'] || ''
    });
  });

  let html = '';
  Object.keys(categories).forEach(catName => {
    let itemsHTML = '';
    categories[catName].forEach(item => {
      const isChecked = !!savedState[item.id];
      itemsHTML += `
        <label class="check-item ${isChecked ? 'completed' : ''}" data-id="${item.id}" style="display:flex; justify-content:space-between; align-items:center;">
          <div style="display:flex; align-items:center; gap:0.75rem;">
            <input type="checkbox" ${isChecked ? 'checked' : ''} onchange="toggleChecklistItem('${item.id}', this)">
            <span>${item.text} ${item.notes ? `<small style="color:var(--text-muted); font-size:0.8rem;">(${item.notes})</small>` : ''}</span>
          </div>
          ${item.priority ? `<span class="badge-tag" style="font-size:0.75rem; background:var(--bg-subtle);">${item.priority}</span>` : ''}
        </label>
      `;
    });

    html += `
      <div class="checklist-card">
        <div class="checklist-title">${catName}</div>
        <div>${itemsHTML}</div>
      </div>
    `;
  });

  container.innerHTML = html;
}

function parseCSV(text) {
  const lines = text.trim().split(/\r?\n/);
  if (lines.length < 2) return [];
  const headers = lines[0].split(',').map(h => h.trim().replace(/^"|"$/g, ''));
  return lines.slice(1).map(line => {
    const regex = /(?:^|,)(?:"([^"]*)"|([^,]*))/g;
    const obj = {};
    let matches;
    let i = 0;
    while ((matches = regex.exec(line)) !== null && i < headers.length) {
      const val = matches[1] !== undefined ? matches[1] : matches[2];
      obj[headers[i]] = (val || '').trim();
      i++;
    }
    return obj;
  });
}

function renderGoogleSheetsBudget(rows) {
  const container = document.getElementById('budgetContainer');
  if (!container) return;

  const rate = TRIP_DATA.meta.exchangeRate;
  let totalRMB = 0;
  let rowsHTML = '';

  rows.forEach(r => {
    const usd = parseFloat(r.Cost_USD || r['金额USD'] || 0);
    const rmb = parseFloat(r.Cost_RMB || r['金额RMB'] || 0);
    const itemTotalRMB = rmb > 0 ? rmb : (usd * rate);
    totalRMB += itemTotalRMB;

    rowsHTML += `
      <div class="car-detail-row">
        <span class="label">${r.Category || r['类别'] || ''} · ${r.Item || r['支出项目'] || ''} (${r.Status || r['状态'] || ''})</span>
        <span class="value">¥${itemTotalRMB.toFixed(2)} RMB ${usd > 0 ? `($${usd} USD)` : ''}</span>
      </div>
    `;
  });

  const totalUSD = totalRMB / rate;
  const perPersonRMB = totalRMB / TRIP_DATA.meta.travelers;
  const perPersonUSD = totalUSD / TRIP_DATA.meta.travelers;

  container.innerHTML = `
    <div class="info-card">
      <div class="card-title">📊 Google Sheets 实时动态预算</div>
      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 1rem; margin-bottom: 1.5rem;">
        <div style="background: var(--primary-ocean-light); padding: 1.25rem; border-radius: var(--radius-md);">
          <div style="font-size: 0.85rem; color: var(--primary-ocean-dark); font-weight:600;">全员预估费用总计 (2人)</div>
          <div style="font-size: 1.6rem; font-weight: 700; color: var(--primary-ocean-dark); margin-top: 0.2rem;">¥${totalRMB.toFixed(0)} RMB</div>
          <div style="font-size: 0.9rem; opacity: 0.9; margin-top: 0.2rem;">约 $${totalUSD.toFixed(0)} USD</div>
        </div>
        <div style="background: var(--accent-coral-light); padding: 1.25rem; border-radius: var(--radius-md);">
          <div style="font-size: 0.85rem; color: var(--accent-coral); font-weight:600;">人均费用 (2人平摊)</div>
          <div style="font-size: 1.6rem; font-weight: 700; color: var(--accent-coral); margin-top: 0.2rem;">$${perPersonUSD.toFixed(0)} USD</div>
          <div style="font-size: 0.9rem; opacity: 0.9; margin-top: 0.2rem;">(约 ¥${perPersonRMB.toFixed(0)} RMB / 人)</div>
        </div>
      </div>
      <div class="car-detail-list">
        ${rowsHTML}
      </div>
    </div>
  `;
}

// Live Clocks
function initLiveClocks() {
  updateClocks();
  setInterval(updateClocks, 1000);
}

function updateClocks() {
  const hnlTimeEl = document.getElementById('hnlClock');
  const laxTimeEl = document.getElementById('laxClock');

  if (hnlTimeEl) {
    hnlTimeEl.innerText = new Date().toLocaleTimeString('zh-CN', {
      timeZone: 'Pacific/Honolulu',
      hour12: false,
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });
  }

  if (laxTimeEl) {
    laxTimeEl.innerText = new Date().toLocaleTimeString('zh-CN', {
      timeZone: 'America/Los_Angeles',
      hour12: false,
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });
  }
}

// Live Weather
async function fetchLiveWeather() {
  const weatherEl = document.getElementById('weatherWidget');
  if (!weatherEl) return;

  try {
    const url = 'https://api.open-meteo.com/v1/forecast?latitude=21.3069&longitude=-157.8583&current_weather=true&daily=weathercode,temperature_2m_max,temperature_2m_min&timezone=Pacific%2FHonolulu';
    const res = await fetch(url);
    const data = await res.json();

    if (data && data.current_weather) {
      const tempC = Math.round(data.current_weather.temperature);
      const tempF = Math.round((tempC * 9/5) + 32);
      const windSpeed = data.current_weather.windspeed;

      const daily = data.daily;
      let forecastHTML = '';
      if (daily && daily.time) {
        for (let i = 0; i < Math.min(3, daily.time.length); i++) {
          const dayName = i === 0 ? '今天' : i === 1 ? '明天' : '后天';
          const maxF = Math.round((daily.temperature_2m_max[i] * 9/5) + 32);
          const minF = Math.round((daily.temperature_2m_min[i] * 9/5) + 32);
          forecastHTML += `<span style="font-size:0.8rem; background:rgba(255,255,255,0.15); padding:0.2rem 0.6rem; border-radius:4px;">${dayName}: ${minF}°F - ${maxF}°F</span>`;
        }
      }

      weatherEl.innerHTML = `
        <div style="display:flex; align-items:center; gap:0.5rem; flex-wrap:wrap;">
          <span>☀️ 檀香山实时天气: <strong>${tempF}°F (${tempC}°C)</strong></span>
          <span>· 风速 ${windSpeed} km/h</span>
          <div style="display:inline-flex; gap:0.4rem; margin-left:0.5rem;">${forecastHTML}</div>
        </div>
      `;
    }
  } catch (err) {
    weatherEl.innerHTML = `☀️ 檀香山年均气温: <strong>80°F - 86°F (26°C - 30°C)</strong> · 晴朗热带气候`;
  }
}

// Render Day-by-Day Itinerary Cards
function renderItineraryDays(filterTag = 'all', activeDayNum = null) {
  const container = document.getElementById('daysContainer');
  if (!container) return;

  container.innerHTML = '';

  TRIP_DATA.days.forEach(day => {
    if (activeDayNum !== null && day.dayNum !== activeDayNum) return;
    if (filterTag !== 'all' && day.tag !== filterTag) return;

    const dayCard = document.createElement('div');
    dayCard.className = 'day-card';
    dayCard.id = `day-${day.dayNum}`;

    let timelineHTML = '';
    day.timeline.forEach(item => {
      const mapUrl = item.mapQuery 
        ? `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(item.mapQuery)}`
        : null;

      timelineHTML += `
        <div class="timeline-item">
          <div class="timeline-time">⏰ ${item.time}</div>
          <div class="timeline-content">
            <div class="item-top">
              <span class="activity-name">${item.activity}</span>
              <div class="item-badges">
                ${item.badge ? `<span class="badge-tag need-booking">🎟️ ${item.badge}</span>` : ''}
              </div>
            </div>
            <div class="activity-details">${item.details}</div>
            <div class="action-row">
              ${mapUrl ? `<a href="${mapUrl}" target="_blank" rel="noopener" class="btn-action">📍 打开地图导航</a>` : ''}
              <button class="btn-action" onclick="copyToClipboard('${item.activity} - ${item.location || ''}')">📋 复制信息</button>
            </div>
          </div>
        </div>
      `;
    });

    dayCard.innerHTML = `
      <div class="day-card-header">
        <div class="day-title-group">
          <span class="day-number-badge">DAY ${day.dayNum}</span>
          <div>
            <div class="day-title">${day.title}</div>
            <div style="font-size: 0.85rem; color: var(--text-muted);">${day.date}</div>
          </div>
        </div>
        <div class="day-meta-chips">
          <span class="chip chip-car">${day.carStatus}</span>
          <span class="chip chip-hotel">🏨 ${day.hotelStay}</span>
        </div>
      </div>
      <div class="timeline-list">
        ${timelineHTML}
      </div>
    `;

    container.appendChild(dayCard);
  });

  if (container.children.length === 0) {
    container.innerHTML = `<div style="text-align:center; padding: 3rem; color: var(--text-muted);">未找到符合条件的行程</div>`;
  }
}

// Setup Day Pills Selector
function setupDayPills() {
  const dayPillsContainer = document.getElementById('dayPills');
  if (!dayPillsContainer) return;

  dayPillsContainer.innerHTML = `<button class="day-pill active" data-day="all">显示全部 6 天</button>`;
  
  TRIP_DATA.days.forEach(day => {
    const pill = document.createElement('button');
    pill.className = 'day-pill';
    pill.dataset.day = day.dayNum;
    pill.innerText = `Day ${day.dayNum} (${day.date.split(' ')[0]})`;
    dayPillsContainer.appendChild(pill);
  });

  dayPillsContainer.addEventListener('click', (e) => {
    if (!e.target.classList.contains('day-pill')) return;

    document.querySelectorAll('.day-pill').forEach(btn => btn.classList.remove('active'));
    e.target.classList.add('active');

    const selectedDay = e.target.dataset.day;
    const activeTag = document.querySelector('.tag-btn.active')?.dataset.tag || 'all';

    if (selectedDay === 'all') {
      renderItineraryDays(activeTag, null);
    } else {
      renderItineraryDays(activeTag, parseInt(selectedDay, 10));
    }
  });
}

// Render Hotels & Rental Car Section
function renderHotels() {
  const hotelListContainer = document.getElementById('hotelList');
  if (!hotelListContainer) return;

  let hotelHTML = '';
  TRIP_DATA.hotels.forEach(hotel => {
    const isBooked = hotel.status === '已预订';
    const statusColor = isBooked ? 'var(--accent-palm)' : 'var(--accent-coral)';

    hotelHTML += `
      <div class="hotel-item">
        <div class="hotel-name">
          <span>${hotel.name}</span>
          <span class="hotel-price">¥${hotel.priceRMB.toFixed(2)}</span>
        </div>
        <div class="hotel-sub">📅 ${hotel.date} (${hotel.nights}晚) · <span style="color: ${statusColor}; font-weight:700;">${hotel.status}</span></div>
        <div class="hotel-sub" style="margin-top: 0.3rem;">📍 ${hotel.address}</div>
        <div class="hotel-sub" style="margin-top: 0.3rem; color: var(--text-main);">💡 ${hotel.notes}</div>
        <div style="margin-top: 0.5rem; display:flex; gap:0.5rem;">
          <a href="https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(hotel.address)}" target="_blank" class="btn-action" style="font-size:0.75rem;">📍 导航去酒店</a>
          <button class="btn-action" style="font-size:0.75rem;" onclick="copyToClipboard('${hotel.name}: ${hotel.address}')">📋 复制地址</button>
        </div>
      </div>
    `;
  });
  hotelListContainer.innerHTML = hotelHTML;

  const carContainer = document.getElementById('carDetails');
  if (!carContainer) return;

  const car = TRIP_DATA.rentalCar;
  carContainer.innerHTML = `
    <div class="car-detail-list">
      <div class="car-detail-row">
        <span class="label">自驾租期</span>
        <span class="value">${car.period}</span>
      </div>
      <div class="car-detail-row">
        <span class="label">推荐公司与取还</span>
        <span class="value">${car.providers}</span>
      </div>
      <div class="car-detail-row">
        <span class="label">推荐车型</span>
        <span class="value">${car.carTypes.join(' / ')}</span>
      </div>
      <div class="car-detail-row">
        <span class="label">预估租车费(3天)</span>
        <span class="value" style="color: var(--accent-coral);">$${car.costEstimateUSD} USD (约 ¥${(car.costEstimateUSD * 7.25).toFixed(0)})</span>
      </div>
      <div class="car-detail-row">
        <span class="label">预估停车费(2晚)</span>
        <span class="value">$${car.parkingEstimateUSD} USD</span>
      </div>
      <div class="car-detail-row">
        <span class="label">总行驶里程/油费</span>
        <span class="value">${car.totalMileageMiles} (约 $${car.gasEstimateUSD} 油费)</span>
      </div>
    </div>
  `;
}

// Render Mandatory Reservations
function renderReservations() {
  const container = document.getElementById('reservationsContainer');
  if (!container) return;

  let html = '';
  TRIP_DATA.reservations.forEach(res => {
    const mapUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(res.mapQuery)}`;

    html += `
      <div class="res-card">
        <div>
          <div class="res-header">
            <div class="res-name">${res.name}</div>
            <span class="res-badge">必须提前预约</span>
          </div>
          <div class="res-window">⏰ 预约规则：${res.window}</div>
          <div class="res-body">${res.notes}</div>
        </div>
        <div style="display: flex; gap: 0.5rem; flex-wrap: wrap;">
          <a href="${res.officialLink}" target="_blank" rel="noopener" class="btn-action" style="background: var(--primary-ocean); color: white;">🌐 官方预订入口</a>
          <a href="${mapUrl}" target="_blank" rel="noopener" class="btn-action">📍 位置地图</a>
        </div>
      </div>
    `;
  });
  container.innerHTML = html;
}

// Render Packing Checklist
function renderChecklist() {
  const container = document.getElementById('checklistContainer');
  if (!container) return;

  const savedState = JSON.parse(localStorage.getItem('hawaii_packing_checklist') || '{}');

  let html = '';
  TRIP_DATA.packingCategories.forEach(cat => {
    let itemsHTML = '';
    cat.items.forEach(item => {
      const isChecked = !!savedState[item.id];
      itemsHTML += `
        <label class="check-item ${isChecked ? 'completed' : ''}" data-id="${item.id}">
          <input type="checkbox" ${isChecked ? 'checked' : ''} onchange="toggleChecklistItem('${item.id}', this)">
          <span>${item.text}</span>
        </label>
      `;
    });

    html += `
      <div class="checklist-card">
        <div class="checklist-title">${cat.category}</div>
        <div>${itemsHTML}</div>
      </div>
    `;
  });

  container.innerHTML = html;
}

function toggleChecklistItem(id, checkboxEl) {
  const savedState = JSON.parse(localStorage.getItem('hawaii_packing_checklist') || '{}');
  savedState[id] = checkboxEl.checked;
  localStorage.setItem('hawaii_packing_checklist', JSON.stringify(savedState));

  const labelEl = checkboxEl.closest('.check-item');
  if (checkboxEl.checked) {
    labelEl.classList.add('completed');
  } else {
    labelEl.classList.remove('completed');
  }
}

// Render Budget Calculator
function renderBudget() {
  const container = document.getElementById('budgetContainer');
  if (!container) return;

  const b = TRIP_DATA.budgetSummary;
  const rate = TRIP_DATA.meta.exchangeRate;

  const rentalRMB = b.rentalCarUSD * rate;
  const parkingRMB = b.parkingUSD * rate;
  const gasRMB = b.gasUSD * rate;
  const ticketsRMB = b.ticketsUSD * rate;
  const foodRMB = b.foodUSD * rate;

  const totalRMB = b.hotelsTotalRMB + rentalRMB + parkingRMB + gasRMB + ticketsRMB + foodRMB;
  const totalUSD = totalRMB / rate;

  const perPersonRMB = totalRMB / TRIP_DATA.meta.travelers;
  const perPersonUSD = totalUSD / TRIP_DATA.meta.travelers;

  container.innerHTML = `
    <div class="info-card">
      <div class="card-title">💰 6天5晚 预算总览</div>
      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 1rem; margin-bottom: 1.5rem;">
        <div style="background: var(--primary-ocean-light); padding: 1.25rem; border-radius: var(--radius-md);">
          <div style="font-size: 0.85rem; color: var(--primary-ocean-dark); font-weight:600;">全员预估费用总计 (2人)</div>
          <div style="font-size: 1.6rem; font-weight: 700; color: var(--primary-ocean-dark); margin-top: 0.2rem;">¥${totalRMB.toFixed(0)} RMB</div>
          <div style="font-size: 0.9rem; opacity: 0.9; margin-top: 0.2rem;">约 $${totalUSD.toFixed(0)} USD</div>
        </div>
        <div style="background: var(--accent-coral-light); padding: 1.25rem; border-radius: var(--radius-md);">
          <div style="font-size: 0.85rem; color: var(--accent-coral); font-weight:600;">人均费用 (2人平摊)</div>
          <div style="font-size: 1.6rem; font-weight: 700; color: var(--accent-coral); margin-top: 0.2rem;">$${perPersonUSD.toFixed(0)} USD</div>
          <div style="font-size: 0.9rem; opacity: 0.9; margin-top: 0.2rem;">(约 ¥${perPersonRMB.toFixed(0)} RMB / 人)</div>
        </div>
      </div>

      <div class="car-detail-list">
        <div class="car-detail-row">
          <span class="label">🏨 酒店住宿费用 (5晚，待预订)</span>
          <span class="value">¥${b.hotelsTotalRMB.toFixed(2)} RMB</span>
        </div>
        <div class="car-detail-row">
          <span class="label">🚗 租车费用 (预估 3天)</span>
          <span class="value">$${b.rentalCarUSD} USD (约 ¥${rentalRMB.toFixed(0)})</span>
        </div>
        <div class="car-detail-row">
          <span class="label">🅿️ 停车费 (Sheraton $60 + Malia $35)</span>
          <span class="value">$${b.parkingUSD} USD (约 ¥${parkingRMB.toFixed(0)})</span>
        </div>
        <div class="car-detail-row">
          <span class="label">⛽ 油费 (整程约 1 箱油)</span>
          <span class="value">$${b.gasUSD} USD (约 ¥${gasRMB.toFixed(0)})</span>
        </div>
        <div class="car-detail-row">
          <span class="label">🎟️ 门票与活动预约预估</span>
          <span class="value">$${b.ticketsUSD} USD (约 ¥${ticketsRMB.toFixed(0)})</span>
        </div>
        <div class="car-detail-row">
          <span class="label">🍧 美食小吃与餐饮预估</span>
          <span class="value">$${b.foodUSD} USD (约 ¥${foodRMB.toFixed(0)})</span>
        </div>
      </div>
    </div>
  `;
}

// Event Listeners
function setupEventListeners() {
  const navBtns = document.querySelectorAll('.nav-btn');
  navBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      navBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const targetTab = btn.dataset.tab;
      document.querySelectorAll('.tab-pane').forEach(pane => pane.classList.remove('active'));
      document.getElementById(targetTab)?.classList.add('active');
    });
  });

  const tagBtns = document.querySelectorAll('.tag-btn');
  tagBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      tagBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const tag = btn.dataset.tag;
      const activeDay = document.querySelector('.day-pill.active')?.dataset.day || 'all';
      renderItineraryDays(tag, activeDay === 'all' ? null : parseInt(activeDay, 10));
    });
  });
}

// Toast & Copy Utility
function copyToClipboard(text) {
  navigator.clipboard.writeText(text).then(() => {
    showToast(`✅ 已复制到剪贴板: ${text}`);
  }).catch(() => {
    showToast(`📋 内容: ${text}`);
  });
}

function showToast(msg) {
  let toast = document.getElementById('toastMsg');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'toastMsg';
    toast.className = 'toast-msg';
    document.body.appendChild(toast);
  }

  toast.innerText = msg;
  toast.classList.add('show');

  setTimeout(() => {
    toast.classList.remove('show');
  }, 2500);
}
