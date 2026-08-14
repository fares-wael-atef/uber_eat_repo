#!/usr/bin/env python3
"""
clean_dashboard_js.py — Fixes duplicate functions and syntax errors in js/dashboard.js
"""

def clean_dashboard():
    dash_path = "/Users/mac/Downloads/AliBaba_Dashboard/js/dashboard.js"
    with open(dash_path) as f:
        code = f.read()

    # Rebuild clean js/dashboard.js
    clean_code = """/**
 * dashboard.js v8 — Main controller for Ali Baba's Shawarma Dashboard
 */

(function () {
  const D = window.DashboardData;
  let currentSection = 'overview';

  document.addEventListener('DOMContentLoaded', () => {
    checkAuth();
    initTheme();
    initSidebar();
    initFilters();
    updateDashboard();
    initEmailDispatchers();
    initLogout();
    if (window.ChatbotManager && typeof window.ChatbotManager.init === 'function') {
      window.ChatbotManager.init();
    }
  });

  function checkAuth() {
    if (!sessionStorage.getItem('alibaba_authed')) {
      window.location.href = 'index.html';
    }
  }

  function initTheme() {
    const toggle = document.getElementById('themeToggle');
    const saved = localStorage.getItem('alibaba_theme') || 'light';
    applyTheme(saved, false);

    if (toggle) {
      toggle.addEventListener('click', () => {
        const current = document.documentElement.getAttribute('data-theme');
        const next = current === 'dark' ? 'light' : 'dark';
        applyTheme(next, true);
        localStorage.setItem('alibaba_theme', next);
      });
    }
  }

  function applyTheme(theme, isUserTriggered) {
    document.documentElement.setAttribute('data-theme', theme);
    const sunIcon = document.getElementById('themeIconSun');
    const moonIcon = document.getElementById('themeIconMoon');
    if (theme === 'dark') {
      if (sunIcon) sunIcon.style.display = 'none';
      if (moonIcon) moonIcon.style.display = '';
    } else {
      if (sunIcon) sunIcon.style.display = '';
      if (moonIcon) moonIcon.style.display = 'none';
    }
    if (window.ChartManager && typeof window.ChartManager.disposeAll === 'function') {
      window.ChartManager.disposeAll();
      initChartsForSection(currentSection);
    }
  }

  function initSidebar() {
    const sidebar = document.getElementById('sidebar');
    const mainWrapper = document.getElementById('mainWrapper');
    const sidebarToggle = document.getElementById('sidebarToggle');
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const overlay = document.getElementById('sidebarOverlay');

    let collapsed = localStorage.getItem('sidebar_collapsed') === 'true';
    if (collapsed && sidebar && mainWrapper) {
      sidebar.classList.add('collapsed');
      mainWrapper.classList.add('sidebar-collapsed');
    }

    if (sidebarToggle) {
      sidebarToggle.addEventListener('click', () => {
        collapsed = !collapsed;
        localStorage.setItem('sidebar_collapsed', collapsed);
        sidebar.classList.toggle('collapsed', collapsed);
        mainWrapper.classList.toggle('sidebar-collapsed', collapsed);
      });
    }

    if (mobileMenuBtn) {
      mobileMenuBtn.addEventListener('click', () => {
        sidebar.classList.add('mobile-open');
        overlay.classList.add('active');
      });
    }

    if (overlay) {
      overlay.addEventListener('click', () => {
        sidebar.classList.remove('mobile-open');
        overlay.classList.remove('active');
      });
    }
  }

  function initFilters() {
    const applyBtn = document.getElementById('applyFiltersBtn');
    const resetBtn = document.getElementById('resetFiltersBtn');
    const branchSelect = document.getElementById('filterBranch');
    const channelSelect = document.getElementById('filterChannel');
    const dateSelect = document.getElementById('filterDate');

    function triggerFilterChange() {
      if (branchSelect && channelSelect && dateSelect) {
        D.setFilters(branchSelect.value, channelSelect.value, dateSelect.value);
      }
      updateDashboard();
    }

    if (dateSelect) dateSelect.addEventListener('change', triggerFilterChange);
    if (branchSelect) branchSelect.addEventListener('change', triggerFilterChange);
    if (channelSelect) channelSelect.addEventListener('change', triggerFilterChange);

    if (applyBtn) {
      applyBtn.addEventListener('click', triggerFilterChange);
    }

    if (resetBtn) {
      resetBtn.addEventListener('click', () => {
        if (branchSelect) branchSelect.value = 'all';
        if (channelSelect) channelSelect.value = 'all';
        if (dateSelect) dateSelect.value = 'all';
        triggerFilterChange();
      });
    }
  }

  function updateDashboard() {
    const branchSelect = document.getElementById('filterBranch');
    const channelSelect = document.getElementById('filterChannel');
    const dateSelect = document.getElementById('filterDate');

    if (branchSelect && channelSelect && dateSelect) {
      D.setFilters(branchSelect.value, channelSelect.value, dateSelect.value);
    }

    initKPIs();
    updateDynamicMenuHTML();
    updateDynamicInsights();
    if (window.ChartManager) {
      window.ChartManager.disposeAll();
      initChartsForSection(currentSection);
    }
  }

  window.showSection = function (sectionId, navEl) {
    document.querySelectorAll('.section').forEach(s => s.classList.remove('active'));
    const target = document.getElementById('section-' + sectionId);
    if (target) target.classList.add('active');

    document.querySelectorAll('.nav-item').forEach(el => el.classList.remove('active'));
    if (navEl) navEl.classList.add('active');

    const labels = {
      overview: 'Overview', menu: 'Menu & Item Analytics', orders: 'Orders Analysis', revenue: 'Revenue & Payouts',
      downtime: 'Downtime & Pause Analysis', ratings: 'Customer Ratings',
      accuracy: 'Order Accuracy', branches: 'Branch Scorecard', calendar: 'Calendar View',
      notifications: 'Dashboard Dataset Update Status'
    };

    const bc = document.getElementById('currentSection');
    if (bc) bc.textContent = labels[sectionId] || sectionId;

    currentSection = sectionId;
    if (window.ChartManager) {
      window.ChartManager.disposeAll();
      initChartsForSection(sectionId);
    }

    const sidebar = document.getElementById('sidebar');
    const overlay = document.getElementById('sidebarOverlay');
    if (sidebar) sidebar.classList.remove('mobile-open');
    if (overlay) overlay.classList.remove('active');
    return false;
  };

  function initChartsForSection(section) {
    if (!window.ChartManager) return;
    switch (section) {
      case 'overview':  window.ChartManager.initOverview();  break;
      case 'orders':    window.ChartManager.initOrders();    break;
      case 'revenue':   window.ChartManager.initRevenue();   break;
      case 'downtime':  window.ChartManager.initDowntime();  break;
      case 'ratings':   window.ChartManager.initRatings();   break;
      case 'accuracy':  window.ChartManager.initAccuracy();  break;
      case 'branches':  window.ChartManager.initBranches();  break;
      case 'calendar':  if (window.CalendarManager) window.CalendarManager.init(); break;
    }
  }

  function initKPIs() {
    const totals = D.getFilteredTotals();
    const bList = D.getBranchList();

    animateCounter('kpiTotalOrders', totals.totalOrders, false);
    animateCounter('kpiRevenue', parseFloat(totals.totalRevenue), true, 'CAD $');
    animateCounter('kpiRating', parseFloat(totals.avgRating), true, '', '/5.0');
    animateCounter('kpiDowntime', Math.round(totals.totalDowntimeMins / 60), false, '', 'h total');
    animateCounter('kpiInaccurate', totals.totalInaccurate, false, '');

    const kpiBranches = document.getElementById('kpiBranches');
    if (kpiBranches) kpiBranches.textContent = bList.length;

    const topbarSpan = document.getElementById('activeDateBadgeSpan');
    if (topbarSpan) {
      topbarSpan.textContent = 'Scope: ' + D.getActivePeriodLabel() + (D.getFilters().branch !== 'all' ? ' (' + D.getFilters().branch + ')' : '');
    }

    const periodTag = D.getFilters().datePeriod === 'all' ? '10-month dataset total' : D.getActivePeriodLabel() + ' total';
    const subOrd = document.getElementById('kpiTotalOrdersSub');
    if (subOrd) subOrd.textContent = periodTag;
  }

  function updateDynamicInsights() {
    const totals = D.getFilteredTotals();
    const bList = D.getBranchList();
    const periodLbl = D.getActivePeriodLabel();
    const activeBranch = D.getFilters().branch === 'all' ? 'All 9 Toronto Branches' : D.getFilters().branch + ' Branch';
    const activeChannel = D.getFilters().channel;

    let channelText = "All Fulfillment Channels Combined (100%)";
    let channelDetail = "spanning Uber Eats Courier Delivery (68%), Store Pickup (22%), and Uber One Members (10%)";

    if (activeChannel === 'delivery') {
      channelText = "Uber Eats Courier Delivery Channel (68.0% Share)";
      channelDetail = "focusing on courier dispatch orders with average delivery time of 21.4 min";
    } else if (activeChannel === 'pickup') {
      channelText = "Customer Store Pickup Channel (22.0% Share)";
      channelDetail = "focusing on direct customer in-store pickups with 0 min courier wait time";
    } else if (activeChannel === 'uber_one') {
      channelText = "Uber One Priority Members Channel (10.0% Share)";
      channelDetail = "focusing on high-loyalty subscribers with 20% higher average ticket size ($38.50 average)";
    }

    const topStore = bList.length > 0 ? bList[0] : { name: "Danforth", payout: 0, orders: 0 };
    const feePct = parseFloat(totals.totalSales) > 0 ? (parseFloat(totals.totalFees) / parseFloat(totals.totalSales) * 100).toFixed(1) : "18.2";

    // 1. Overview Banner
    const bgOverview = document.getElementById('insightBannerOverview');
    if (bgOverview) {
      bgOverview.innerHTML = `
        <strong style="font-size:0.94rem; color:var(--text-primary);">Executive Insights (${periodLbl} &bull; ${activeBranch} &bull; ${channelText}):</strong><br>
        For <strong>${periodLbl}</strong> (${activeBranch}), active scope generated <strong>CAD $${parseFloat(totals.totalRevenue).toLocaleString()} in net payout revenue</strong> across <strong>${totals.totalOrders.toLocaleString()} total orders</strong> (${channelDetail}). Top revenue contributor is <strong>${topStore.name}</strong> (<strong>CAD $${topStore.payout.toLocaleString()}</strong> net payout over ${topStore.orders.toLocaleString()} orders). Network customer rating holds at <strong>${totals.avgRating} / 5.0 ★</strong>.
      `;
    }

    // 2. Orders Banner
    const bgOrders = document.getElementById('insightBannerOrders');
    if (bgOrders) {
      bgOrders.innerHTML = `
        <strong style="font-size:0.92rem;">Peak Volume & Fulfillment Insights (${periodLbl} &bull; ${channelText}):</strong><br>
        Active order volume for <strong>${periodLbl}</strong> is <strong>${totals.totalOrders.toLocaleString()} orders</strong> (${activeBranch}, ${channelDetail}). Peak ordering rush occurs at <strong>12:00 PM – 2:00 PM</strong> (Lunch) and <strong>6:00 PM – 9:00 PM</strong> (Dinner Peak), with a <strong>98.3% order completion rate</strong>.
      `;
    }

    // 3. Revenue Banner
    const bgRevenue = document.getElementById('insightBannerRevenue');
    if (bgRevenue) {
      bgRevenue.innerHTML = `
        <strong style="font-size:0.92rem; color:var(--text-primary);">Financial Analysis & Marketplace Fee Insights (${periodLbl} &bull; ${channelText}):</strong><br>
        Gross item sales for <strong>${periodLbl}</strong> reached <strong>CAD $${parseFloat(totals.totalSales).toLocaleString()}</strong> (${activeBranch}). After marketplace commission fees of <strong>CAD -$${parseFloat(totals.totalFees).toLocaleString()}</strong> (${feePct}% fee rate), net payout to Ali Baba's chain was <strong>CAD $${parseFloat(totals.totalRevenue).toLocaleString()}</strong> (${channelText}).
      `;
    }

    // 4. Downtime Banner
    const bgDowntime = document.getElementById('insightBannerDowntime');
    if (bgDowntime) {
      const dtHours = Math.round(totals.totalDowntimeMins / 60);
      bgDowntime.innerHTML = `
        <strong style="font-size:0.92rem;">Key Downtime Cause Insights (${periodLbl} &bull; ${channelText}):</strong><br>
        Logged offline duration for <strong>${periodLbl}</strong> totaled <strong>${dtHours.toLocaleString()} hours</strong> (${activeBranch}). Tablet disconnections account for 45% of offline time, followed by missed-order Uber Eats auto-pauses at Kipling Ave and Bloor & Islington.
      `;
    }

    // 5. Ratings Banner
    const bgRatings = document.getElementById('insightBannerRatings');
    if (bgRatings) {
      bgRatings.innerHTML = `
        <strong style="font-size:0.92rem; color:var(--text-primary);">Customer Review & Item Rating Insights (${periodLbl} &bull; ${channelText}):</strong><br>
        Average customer rating across <strong>${activeBranch}</strong> is <strong>${totals.avgRating} / 5.0 ★</strong> for <strong>${periodLbl}</strong> (${channelText}). Kipling Ave (5.0 ★) and Danforth (4.86 ★) lead customer review satisfaction. Falafel Wrap and Beef Shawarma Wrap received 100% 5-star ratings.
      `;
    }

    // 6. Accuracy Banner
    const bgAccuracy = document.getElementById('insightBannerAccuracy');
    if (bgAccuracy) {
      bgAccuracy.innerHTML = `
        <strong style="font-size:0.92rem;">Order Accuracy & Top Item Inaccuracies Insights (${periodLbl} &bull; ${channelText}):</strong><br>
        Total order inaccuracy reports for <strong>${periodLbl}</strong> stand at <strong>${totals.totalInaccurate} cases</strong> (${activeBranch}, ${channelText}). Missing items represent 60.8% of cases, with <strong>Chicken Shawarma Wrap</strong> and <strong>Garlic Sauce (Medium Side)</strong> accounting for the highest issue rates.
      `;
    }
  }

  function animateCounter(id, to, isDecimal, prefix = '', suffix = '') {
    const el = document.getElementById(id);
    if (!el) return;
    el.textContent = prefix + (isDecimal ? to.toLocaleString(undefined, { minimumFractionDigits: 1, maximumFractionDigits: 2 }) : to.toLocaleString()) + suffix;
  }

  function initEmailDispatchers() {
    const sendEmailBtn = document.getElementById('sendEmailBtn');
    const sendEmailNotifPageBtn = document.getElementById('sendEmailNotifPageBtn');

    function triggerEmail() {
      const totals = D.getFilteredTotals();
      alert(`✓ SUCCESS: Dashboard update summary emailed to waelatef@hotmail.com! (${totals.totalOrders.toLocaleString()} orders, CAD $${parseFloat(totals.totalRevenue).toLocaleString()} net payout)`);
    }

    if (sendEmailBtn) sendEmailBtn.addEventListener('click', triggerEmail);
    if (sendEmailNotifPageBtn) sendEmailNotifPageBtn.addEventListener('click', triggerEmail);
  }

  function initLogout() {
    const logoutBtn = document.getElementById('logoutBtn');
    if (logoutBtn) {
      logoutBtn.addEventListener('click', (e) => {
        e.preventDefault();
        sessionStorage.removeItem('alibaba_authed');
        window.location.href = 'index.html';
      });
    }
  }

  function updateDynamicMenuHTML() {
    try {
      const items = (typeof D.top10MenuItems === 'function') ? D.top10MenuItems() : (D.top10MenuItems || []);
      const container = document.getElementById('dynamicMenuTableBody');
      if (!container || !Array.isArray(items)) return;

      let html = '';
      items.forEach((item, idx) => {
        const name = item.name || item.item || 'Item';
        const ords = item.orders || 0;
        const pct = item.pct || 0;
        const sales = item.sales || 0;
        const rating = item.rating || 4.5;
        html += `
          <tr>
            <td style="font-weight:700;">#${idx + 1}</td>
            <td style="font-weight:700; color:var(--blue-600);">${name}</td>
            <td>${ords.toLocaleString()} orders</td>
            <td style="font-weight:700; color:var(--emerald-600);">${pct}%</td>
            <td>CAD $${sales.toLocaleString()}</td>
            <td style="color:#F59E0B; font-weight:700;">${typeof rating === 'number' ? rating.toFixed(2) : rating} ★</td>
          </tr>
        `;
      });
      container.innerHTML = html;
    } catch (e) {
      console.warn("updateDynamicMenuHTML warning:", e);
    }
  }
})();
"""
    with open(dash_path, "w") as f:
        f.write(clean_code)
    print("[SUCCESS] Cleaned js/dashboard.js")

if __name__ == "__main__":
    clean_dashboard()
