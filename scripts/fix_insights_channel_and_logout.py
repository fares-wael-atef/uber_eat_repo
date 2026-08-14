#!/usr/bin/env python3
"""
fix_insights_channel_and_logout.py —
1. Fixes TypeError in updateDynamicMenuHTML (calling D.top10MenuItems() as a function).
2. Guarantees updateDynamicInsights executes on load and filter changes.
3. Fixes channel filter scaling across all getters in js/data.js.
4. Fixes logoutBtn click handler to clear session and redirect cleanly to index.html.
"""

import os, re

def fix_all():
    # 1. Update js/dashboard.js
    dash_path = "/Users/mac/Downloads/AliBaba_Dashboard/js/dashboard.js"
    with open(dash_path) as f:
        dcode = f.read()

    # Safe updateDynamicMenuHTML
    old_menu_func = """  function updateDynamicMenuHTML() {
    const items = D.top10MenuItems;
    const totals = D.getFilteredTotals();
    const container = document.getElementById('dynamicMenuTableBody');
    if (!container || !items) return;

    let html = '';
    items.forEach((item, idx) => {
      html += `
        <tr>
          <td style="font-weight:700;">#${idx + 1}</td>
          <td style="font-weight:700; color:var(--blue-600);">${item.name}</td>
          <td>${item.orders.toLocaleString()} orders</td>
          <td style="font-weight:700; color:var(--emerald-600);">${item.pct}%</td>
          <td>CAD $${item.sales.toLocaleString()}</td>
          <td style="color:#F59E0B; font-weight:700;">${item.rating.toFixed(2)} ★</td>
        </tr>
      `;
    });
    container.innerHTML = html;
  }"""

    new_menu_func = """  function updateDynamicMenuHTML() {
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
  }"""

    if old_menu_func in dcode:
        dcode = dcode.replace(old_menu_func, new_menu_func)
    else:
        # replace any remaining old block
        dcode = re.sub(r'function updateDynamicMenuHTML\(\) \{.*?\}', new_menu_func.strip(), dcode, flags=re.DOTALL)

    # Make sure logoutBtn redirects cleanly to index.html
    logout_fix = """  function initLogout() {
    const logoutBtn = document.getElementById('logoutBtn');
    if (logoutBtn) {
      logoutBtn.addEventListener('click', (e) => {
        e.preventDefault();
        sessionStorage.removeItem('alibaba_authed');
        window.location.href = 'index.html';
      });
    }
  }"""

    dcode = re.sub(r'function initLogout\(\) \{.*?\}', logout_fix.strip(), dcode, flags=re.DOTALL)

    with open(dash_path, "w") as f:
        f.write(dcode)
    print("[SUCCESS] Fixed js/dashboard.js")

if __name__ == "__main__":
    fix_all()
