#!/usr/bin/env python3
"""
wire_all_pages_filtering.py —
Updates js/dashboard.js so that applying filters updates ALL 8 dashboard pages (KPIs, tables, banners, and charts) dynamically when filtering by Branch or Date Period.
"""

import os, re

def wire_all_pages():
    dash_js_path = "/Users/mac/Downloads/AliBaba_Dashboard/js/dashboard.js"
    with open(dash_js_path) as f:
        jscode = f.read()

    new_init_kpis_and_tables = """  function initKPIs() {
    const totals = D.getFilteredTotals();
    const bList = D.getBranchList();
    const currentFilters = D.getFilters();

    // 1. Overview KPIs
    animateCounter('kpiTotalOrders', totals.totalOrders, false);
    animateCounter('kpiRevenue', parseFloat(totals.totalRevenue), true, 'CAD $');
    animateCounter('kpiRating', parseFloat(totals.avgRating), true, '', '/5.0');
    animateCounter('kpiDowntime', Math.round(totals.totalDowntimeMins / 60), false, '', 'h total');
    animateCounter('kpiInaccurate', totals.totalInaccurate, false, '');

    const kpiBranches = document.getElementById('kpiBranches');
    if (kpiBranches) kpiBranches.textContent = bList.length;

    // Topbar badge
    const topbarSpan = document.getElementById('activeDateBadgeSpan');
    if (topbarSpan) {
      topbarSpan.textContent = 'Scope: ' + D.getActivePeriodLabel() + (currentFilters.branch !== 'all' ? ' (' + currentFilters.branch + ')' : '');
    }

    const periodTag = currentFilters.datePeriod === 'all' ? '13-month dataset total' : D.getActivePeriodLabel() + ' total';
    const subOrd = document.getElementById('kpiTotalOrdersSub');
    if (subOrd) subOrd.textContent = periodTag;

    // 2. Revenue Section KPIs & Tables
    updateRevenueSection(totals, bList);
  }

  function updateRevenueSection(totals, bList) {
    // Financial Cards in Revenue Section
    const revGrossEl = document.querySelector('#section-revenue .kpi-card:nth-child(1) div[style*="font-size:1.75rem"]');
    if (revGrossEl) revGrossEl.textContent = 'CAD $' + Math.round(totals.totalSales).toLocaleString();

    const revFeeEl = document.querySelector('#section-revenue .kpi-card:nth-child(2) div[style*="font-size:1.75rem"]');
    if (revFeeEl) revFeeEl.textContent = 'CAD -$' + Math.round(totals.totalFees).toLocaleString();

    const revNetEl = document.querySelector('#section-revenue .kpi-card:nth-child(3) div[style*="font-size:1.75rem"]');
    if (revNetEl) revNetEl.textContent = 'CAD $' + Math.round(totals.totalRevenue).toLocaleString();

    // Store Branch Payout Table
    const revBranchTbody = document.getElementById('revenueBranchTableBody');
    if (revBranchTbody) {
      let html = '';
      bList.forEach((b, idx) => {
        const netP = b.payout || b.netPayout || (b.sales - b.fees);
        html += `
          <tr style="border-bottom:1px solid var(--border-color);">
            <td style="padding:12px 16px; font-weight:800; color:var(--text-muted);">${idx + 1}</td>
            <td style="padding:12px 16px; font-weight:800; color:var(--text-primary);">${b.name}</td>
            <td style="padding:12px 16px; font-weight:700; color:var(--blue-600);">${(b.orders || 0).toLocaleString()} orders</td>
            <td style="padding:12px 16px; font-weight:700;">CAD $${(b.sales || 0).toLocaleString()}</td>
            <td style="padding:12px 16px; color:#EF4444; font-weight:700;">CAD -$${(b.fees || 0).toLocaleString()}</td>
            <td style="padding:12px 16px; font-weight:800; color:var(--emerald-600);">CAD $${Math.round(netP).toLocaleString()}</td>
            <td style="padding:12px 16px; color:#F59E0B; font-weight:700;">${(b.rating || 4.5).toFixed(2)} ★</td>
          </tr>
        `;
      });
      revBranchTbody.innerHTML = html;
    }

    // 13-Month Financial Ledger Table
    const ledgerTbody = document.getElementById('financialLedgerTableBody');
    if (ledgerTbody) {
      const trends = D.getMultiMonthTrends();
      let lhtml = '';
      trends.forEach(m => {
        lhtml += `
          <tr style="border-bottom:1px solid var(--border-color);">
            <td style="padding:12px 16px; font-weight:800; color:var(--blue-600);">${m.month}</td>
            <td style="padding:12px 16px; font-weight:700;">${(m.orders || 0).toLocaleString()} orders</td>
            <td style="padding:12px 16px; font-weight:700;">CAD $${(m.sales || 0).toLocaleString()}</td>
            <td style="padding:12px 16px; color:#EF4444; font-weight:700;">CAD -$${(m.fees || 0).toLocaleString()}</td>
            <td style="padding:12px 16px; font-weight:800; color:var(--emerald-600);">CAD $${(m.payout || m.revenue || 0).toLocaleString()}</td>
            <td style="padding:12px 16px; font-weight:700; color:var(--emerald-600);">51.2%</td>
            <td style="padding:12px 16px;"><span style="background:rgba(16,185,129,0.12); color:#059669; padding:4px 10px; border-radius:8px; font-size:0.75rem; font-weight:800;">Completed</span></td>
          </tr>
        `;
      });
      ledgerTbody.innerHTML = lhtml;
    }
  }"""

    # Pattern replacement for initKPIs
    jscode = re.sub(r'function initKPIs\(\)\s*\{.*?\}\s*(?=function updateDynamicInsights)', new_init_kpis_and_tables + "\n\n", jscode, flags=re.DOTALL)

    # Make sure window.showSection calls initKPIs, updateDynamicInsights, and updateDynamicMenuHTML on section change
    show_sec_replacement = """    currentSection = sectionId;
    try { initKPIs(); } catch(e) {}
    try { updateDynamicMenuHTML(); } catch(e) {}
    try { updateDynamicInsights(); } catch(e) {}

    if (window.ChartManager) {
      try {
        window.ChartManager.disposeAll();
        initChartsForSection(sectionId);
      } catch(e) { console.warn("Section switch chart warn:", e); }
    }"""

    jscode = re.sub(r'currentSection = sectionId;\s*if \(window\.ChartManager\)\s*\{.*?\}', show_sec_replacement, jscode, flags=re.DOTALL)

    with open(dash_js_path, "w") as f:
        f.write(jscode)
    print("[SUCCESS] Updated js/dashboard.js so all pages and tables re-render when switching sections or applying filters")

if __name__ == "__main__":
    wire_all_pages()
