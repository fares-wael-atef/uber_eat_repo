/**
 * calendar.js — Interactive calendar view & detail panel
 * Dynamically displays dates and daily stats based on active date period filter.
 */

window.CalendarManager = (function () {
  const D = window.DashboardData;
  const DAY_NAMES = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  function init() {
    renderCalendar();
    const closeBtn = document.getElementById('dayDetailClose');
    if (closeBtn) {
      closeBtn.addEventListener('click', () => {
        const p = document.getElementById('dayDetailPanel');
        if (p) p.classList.remove('open');
        document.querySelectorAll('.cal-day').forEach(el => el.classList.remove('selected'));
      });
    }
  }

  function renderCalendar() {
    const grid = document.getElementById('calendarGrid');
    if (!grid) return;
    grid.innerHTML = '';

    DAY_NAMES.forEach(name => {
      const header = document.createElement('div');
      header.className = 'cal-day-header';
      header.textContent = name;
      grid.appendChild(header);
    });

    const startOffset = 3;
    for (let i = 0; i < startOffset; i++) {
      const empty = document.createElement('div');
      empty.className = 'cal-day empty';
      grid.appendChild(empty);
    }

    const tl = D.getDailyTimeline();
    const daysCount = Math.min(30, tl.length > 0 ? tl.length : 30);

    for (let day = 1; day <= daysCount; day++) {
      const item = tl[day - 1] || { orders: 45, payout: 650 };
      const perf = item.orders > 60 ? 'high' : item.orders > 40 ? 'medium' : 'low';
      
      const cell = document.createElement('div');
      cell.className = `cal-day perf-${perf}`;
      cell.dataset.day = day;

      cell.innerHTML = `
        <span class="cal-day-num">${day}</span>
        <span class="cal-day-dot"></span>
        <span class="cal-day-mini-stat">${item.orders} orders</span>
      `;

      cell.addEventListener('click', () => selectDay(day, cell, item));
      grid.appendChild(cell);
    }
  }

  function selectDay(day, cell, item) {
    document.querySelectorAll('.cal-day').forEach(el => el.classList.remove('selected'));
    cell.classList.add('selected');
    showDayDetail(day, item);
  }

  function showDayDetail(day, item) {
    const panel = document.getElementById('dayDetailPanel');
    const title = document.getElementById('dayDetailTitle');
    const body = document.getElementById('dayDetailBody');

    if (!panel || !title || !body) return;

    const periodLbl = D.getActivePeriodLabel();
    const dateStr = item && item.date ? item.date : "Day " + day;

    title.textContent = `${dateStr} — Performance Summary (${periodLbl})`;
    const perf = item.orders > 60 ? 'high' : item.orders > 40 ? 'medium' : 'low';
    const perfLabel = perf === 'high' ? 'High Volume' : perf === 'medium' ? 'Average' : 'Low Volume';
    const perfColor = perf === 'high' ? '#10B981' : perf === 'medium' ? '#F59E0B' : '#EF4444';

    body.innerHTML = `
      <div style="display:flex; align-items:center; gap:8px; margin-bottom:14px;">
        <span style="background:${perfColor}; color:white; padding:4px 12px; border-radius:20px; font-size:0.75rem; font-weight:600;">${perfLabel}</span>
        <span style="font-size:0.8rem; color:var(--text-muted);">${dateStr}</span>
      </div>
      <div class="day-stats-grid">
        <div class="day-stat">
          <div class="day-stat-label">Total Orders</div>
          <div class="day-stat-value">${item.orders}</div>
        </div>
        <div class="day-stat">
          <div class="day-stat-label">Net Payout</div>
          <div class="day-stat-value">CAD $${Number(item.payout || 0).toLocaleString()}</div>
        </div>
        <div class="day-stat">
          <div class="day-stat-label">Avg Customer Score</div>
          <div class="day-stat-value">4.45 / 5.0</div>
        </div>
        <div class="day-stat">
          <div class="day-stat-label">Estimated Downtime</div>
          <div class="day-stat-value">${Math.round((item.orders || 10) * 0.8)} mins</div>
        </div>
      </div>
    `;

    panel.classList.add('open');
  }

  return { init, renderCalendar };
})();
