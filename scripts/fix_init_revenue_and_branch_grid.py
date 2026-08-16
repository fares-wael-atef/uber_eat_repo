#!/usr/bin/env python3
"""
fix_init_revenue_and_branch_grid.py —
1. Adds drawRevenueBranch() to initRevenue() in js/charts.js.
2. Updates dashboard.html section-branches grid to repeat(3, 1fr) with max-width so all 9 store cards stack in a pristine 3x3 grid layout.
"""

import os, re

def apply_fixes():
    # 1. Update js/charts.js
    charts_path = "/Users/mac/Downloads/AliBaba_Dashboard/js/charts.js"
    with open(charts_path) as f:
        code = f.read()

    code = code.replace(
        "initRevenue() { drawDailyRevenue(); drawRevenueBreakdown(); drawRevenueWaterfall(); drawFeesChart(); },",
        "initRevenue() { drawDailyRevenue(); drawRevenueBranch(); },"
    )

    with open(charts_path, "w") as f:
        f.write(code)
    print("[SUCCESS] Added drawRevenueBranch() to initRevenue() in js/charts.js")

    # 2. Update dashboard.html for branches grid layout
    dash_path = "/Users/mac/Downloads/AliBaba_Dashboard/dashboard.html"
    with open(dash_path) as f:
        html = f.read()

    html = html.replace(
        'div style="display:grid; grid-template-columns: repeat(auto-fill, minmax(320px, 1fr)); gap:18px;"',
        'div style="display:grid; grid-template-columns: repeat(3, 1fr); gap:18px; width:100%;"'
    )

    with open(dash_path, "w") as f:
        f.write(html)
    print("[SUCCESS] Fixed branch grid layout to 3x3 grid in dashboard.html")

if __name__ == "__main__":
    apply_fixes()
