#!/usr/bin/env python3
"""
fix_menu_analytics_charts.py —
Adds case 'menu': window.ChartManager.initMenu(); break; to initChartsForSection in js/dashboard.js
so Menu Analytics charts render immediately.
"""

def fix_menu():
    dash_path = "/Users/mac/Downloads/AliBaba_Dashboard/js/dashboard.js"
    with open(dash_path) as f:
        code = f.read()

    old_switch = """  function initChartsForSection(section) {
    if (!window.ChartManager) return;
    switch (section) {
      case 'overview':  window.ChartManager.initOverview();  break;
      case 'orders':    window.ChartManager.initOrders();    break;"""

    new_switch = """  function initChartsForSection(section) {
    if (!window.ChartManager) return;
    switch (section) {
      case 'overview':  window.ChartManager.initOverview();  break;
      case 'menu':      window.ChartManager.initMenu();      break;
      case 'orders':    window.ChartManager.initOrders();    break;"""

    if old_switch in code:
        code = code.replace(old_switch, new_switch)
        with open(dash_path, "w") as f:
            f.write(code)
        print("[SUCCESS] Added case 'menu' to initChartsForSection in js/dashboard.js")
    else:
        print("[INFO] Checking fallback replacement for initChartsForSection")
        code = code.replace(
            "switch (section) {\n      case 'overview':  window.ChartManager.initOverview();  break;",
            "switch (section) {\n      case 'overview':  window.ChartManager.initOverview();  break;\n      case 'menu':      window.ChartManager.initMenu();      break;"
        )
        with open(dash_path, "w") as f:
            f.write(code)
        print("[SUCCESS] Updated initChartsForSection with case 'menu'")

if __name__ == "__main__":
    fix_menu()
