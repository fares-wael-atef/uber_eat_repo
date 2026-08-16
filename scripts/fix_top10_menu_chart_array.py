#!/usr/bin/env python3
"""
fix_top10_menu_chart_array.py —
Fixes D.top10MenuItems export in js/data.js to return an Array (not a function), and updates drawTop10MenuChart in js/charts.js to safely resolve functions or arrays.
Also adds style="height:320px;" to top10MenuChart in dashboard.html.
"""

import os, re

def fix_top10():
    # 1. Update js/data.js
    data_path = "/Users/mac/Downloads/AliBaba_Dashboard/js/data.js"
    with open(data_path) as f:
        code = f.read()

    code = code.replace(
        "function top10MenuItems() { return topMenuItems; }",
        "// top10MenuItems is an array"
    )

    code = code.replace(
        "top10MenuItems, getChannelBreakdown",
        "topMenuItems, top10MenuItems: topMenuItems, getChannelBreakdown"
    )

    with open(data_path, "w") as f:
        f.write(code)
    print("[SUCCESS] Fixed top10MenuItems in js/data.js")

    # 2. Update js/charts.js
    charts_path = "/Users/mac/Downloads/AliBaba_Dashboard/js/charts.js"
    with open(charts_path) as f:
        ccode = f.read()

    ccode = ccode.replace(
        "const data = D.top10MenuItems;",
        "const rawData = typeof D.top10MenuItems === 'function' ? D.top10MenuItems() : D.top10MenuItems;\n    const data = Array.isArray(rawData) ? rawData : (D.topMenuItems || []);"
    )

    ccode = ccode.replace(
        "const data = D.menuItemsByRating;",
        "const rawData = typeof D.menuItemsByRating === 'function' ? D.menuItemsByRating() : D.menuItemsByRating;\n    const data = Array.isArray(rawData) ? rawData : [];"
    )

    with open(charts_path, "w") as f:
        f.write(ccode)
    print("[SUCCESS] Safe function/array resolution in js/charts.js")

    # 3. Update dashboard.html
    dash_path = "/Users/mac/Downloads/AliBaba_Dashboard/dashboard.html"
    with open(dash_path) as f:
        html = f.read()

    html = html.replace(
        '<div id="top10MenuChart" class="chart-container"></div>',
        '<div id="top10MenuChart" class="chart-container" style="height:320px;"></div>'
    )

    with open(dash_path, "w") as f:
        f.write(html)
    print("[SUCCESS] Added style height:320px to top10MenuChart in dashboard.html")

if __name__ == "__main__":
    fix_top10()
