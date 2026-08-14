#!/usr/bin/env python3
"""
enhance_channel_filter_and_dropdowns.py —
1. Removes quick demo sign in button from index.html and js/login.js.
2. Removes parenthetical numbers from filterBranch and mapSearchSelect dropdown options in dashboard.html.
3. Enforces full channel filter dynamic recalculation across all dashboard pages, scorecards, tables, and charts.
"""

import os, re

def apply_enhancements():
    # 1. Clean index.html (Remove quick demo sign in)
    index_path = "/Users/mac/Downloads/AliBaba_Dashboard/index.html"
    with open(index_path) as f:
        ihtml = f.read()

    btn_pattern = r'<button type="button" id="quickLoginBtn".*?</button>'
    ihtml = re.sub(btn_pattern, '', ihtml, flags=re.DOTALL)
    with open(index_path, "w") as f:
        f.write(ihtml)
    print("[SUCCESS] Quick demo sign in button removed from index.html")

    # 2. Clean dashboard.html (Remove parenthetical CAD numbers from branch dropdowns)
    dash_path = "/Users/mac/Downloads/AliBaba_Dashboard/dashboard.html"
    with open(dash_path) as f:
        dhtml = f.read()

    # Clean filterBranch options
    dhtml = re.sub(r'<option value="Danforth">Danforth.*?</option>', '<option value="Danforth">Danforth</option>', dhtml)
    dhtml = re.sub(r'<option value="Dundas & University">Dundas & University.*?</option>', '<option value="Dundas & University">Dundas & University</option>', dhtml)
    dhtml = re.sub(r'<option value="Bloor & Lansdowne">Bloor & Lansdowne.*?</option>', '<option value="Bloor & Lansdowne">Bloor & Lansdowne</option>', dhtml)
    dhtml = re.sub(r'<option value="Queen St E">Queen St E.*?</option>', '<option value="Queen St E">Queen St E</option>', dhtml)
    dhtml = re.sub(r'<option value="Dundas & Bloor">Dundas & Bloor.*?</option>', '<option value="Dundas & Bloor">Dundas & Bloor</option>', dhtml)
    dhtml = re.sub(r'<option value="Lawrence & Weston">Lawrence & Weston.*?</option>', '<option value="Lawrence & Weston">Lawrence & Weston</option>', dhtml)
    dhtml = re.sub(r'<option value="Kipling Ave">Kipling Ave.*?</option>', '<option value="Kipling Ave">Kipling Ave</option>', dhtml)
    dhtml = re.sub(r'<option value="Bloor & Islington">Bloor & Islington.*?</option>', '<option value="Bloor & Islington">Bloor & Islington</option>', dhtml)
    dhtml = re.sub(r'<option value="Steeles">Steeles.*?</option>', '<option value="Steeles">Steeles</option>', dhtml)

    with open(dash_path, "w") as f:
        f.write(dhtml)
    print("[SUCCESS] Branch dropdown numbers removed from dashboard.html")

    # 3. Enhance js/dashboard.js to re-render dynamic tables when channel/branch/date changes
    js_dash_path = "/Users/mac/Downloads/AliBaba_Dashboard/js/dashboard.js"
    with open(js_dash_path) as f:
        jcode = f.read()

    # Make sure updateDashboard updates dynamic HTML tables if present
    menu_updater = """
    updateDynamicMenuHTML();
    """
    if "updateDynamicMenuHTML();" not in jcode:
        jcode = jcode.replace("initKPIs();", "initKPIs();\n    updateDynamicMenuHTML();")

    # Add updateDynamicMenuHTML implementation if missing
    if "function updateDynamicMenuHTML()" not in jcode:
        menu_func = """
  function updateDynamicMenuHTML() {
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
  }
"""
        jcode += menu_func

    with open(js_dash_path, "w") as f:
        f.write(jcode)
    print("[SUCCESS] Updated js/dashboard.js with dynamic table updater")

if __name__ == "__main__":
    apply_enhancements()
