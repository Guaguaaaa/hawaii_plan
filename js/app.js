/**
 * Hawaii Oahu Trip 2026 Interactive Application Controller
 */

document.addEventListener('DOMContentLoaded', () => {
  initApp();
});

function initApp() {
  renderItineraryDays();
  renderHotels();
  renderReservations();
  renderChecklist();
  renderBudget();
  setupEventListeners();
  setupDayPills();
}

// 1. Render Day-by-Day Itinerary Cards
function renderItineraryDays(filterTag = 'all', activeDayNum = null) {
  const container = document.getElementById('daysContainer');
  if (!container) return;

  container.innerHTML = '';

  TRIP_DATA.days.forEach(day => {
    // Filter by specific day if selected
    if (activeDayNum !== null && day.dayNum !== activeDayNum) return;

    // Filter by tag if selected
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

// 2. Setup Day Pills Selector
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

// 3. Render Hotels & Rental Car Section
function renderHotels() {
  const hotelListContainer = document.getElementById('hotelList');
  if (!hotelListContainer) return;

  let hotelHTML = '';
  TRIP_DATA.hotels.forEach(hotel => {
    hotelHTML += `
      <div class="hotel-item">
        <div class="hotel-name">
          <span>${hotel.name}</span>
          <span class="hotel-price">¥${hotel.priceRMB.toFixed(2)}</span>
        </div>
        <div class="hotel-sub">📅 ${hotel.date} (${hotel.nights}晚) · <span style="color: var(--accent-palm); font-weight:600;">${hotel.status}</span></div>
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

  // Rental car details
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

// 4. Render Mandatory Reservations
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

// 5. Render Packing Checklist with LocalStorage Persistence
function renderChecklist() {
  const container = document.getElementById('checklistContainer');
  if (!container) return;

  // Load saved state
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

// 6. Render Budget Calculator
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
  const perPersonRMB = totalRMB / TRIP_DATA.meta.travelers;

  container.innerHTML = `
    <div class="info-card">
      <div class="card-title">💰 6天5晚 预算总览 (人均比对)</div>
      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 1rem; margin-bottom: 1.5rem;">
        <div style="background: var(--primary-ocean-light); padding: 1rem; border-radius: var(--radius-md);">
          <div style="font-size: 0.85rem; color: var(--primary-ocean-dark);">预估费用总计 (全员)</div>
          <div style="font-size: 1.6rem; font-weight: 700; color: var(--primary-ocean-dark);">¥${totalRMB.toFixed(0)} RMB</div>
          <div style="font-size: 0.8rem; opacity: 0.8;">折合约 $${(totalRMB / rate).toFixed(0)} USD</div>
        </div>
        <div style="background: var(--accent-coral-light); padding: 1rem; border-radius: var(--radius-md);">
          <div style="font-size: 0.85rem; color: var(--accent-coral);">人均费用 (2人平摊)</div>
          <div style="font-size: 1.6rem; font-weight: 700; color: var(--accent-coral);">¥${perPersonRMB.toFixed(0)} RMB</div>
          <div style="font-size: 0.8rem; opacity: 0.8;">含住宿、租车、油费、门票及餐食</div>
        </div>
      </div>

      <div class="car-detail-list">
        <div class="car-detail-row">
          <span class="label">🏨 酒店住宿费用 (已预订 5晚)</span>
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

// 7. Event Listeners for Navigation & Tag Filtering
function setupEventListeners() {
  // Main Tab Navigation
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

  // Tag filter buttons
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
