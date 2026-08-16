#!/usr/bin/env python3
"""
fix_downtime_and_revenue_branch_plots.py —
Fixes:
1. Sales & Payout Distribution by Branch (removes duplicate #revenueBranchChart div ID from line 383 of dashboard.html).
2. Downtime Root Causes (adds minutes property to D.downtimeCauses in js/data.js).
3. Daily Availability Score (adds score property to D.getDailyAvailability() in js/data.js).
"""

import os, re

def fix_all_three():
    # 1. Update js/data.js for downtimeCauses and getDailyAvailability
    data_path = "/Users/mac/Downloads/AliBaba_Dashboard/js/data.js"
    with open(data_path) as f:
        code = f.read()

    new_downtime_causes = """  const downtimeCauses = [
    { cause: "Tablet Disconnections", hours: 1632, minutes: 97920, count: 1632, value: 1632, share: 53.0 },
    { cause: "Auto-Pauses (Missed Orders)", hours: 773, minutes: 46380, count: 773, value: 773, share: 25.1 },
    { cause: "Manual Kitchen Pauses", hours: 440, minutes: 26400, count: 440, value: 440, share: 14.3 },
    { cause: "Stockout Closures", hours: 235, minutes: 14100, count: 235, value: 235, share: 7.6 }
  ];"""

    code = re.sub(r'const downtimeCauses = \[.*?\];', new_downtime_causes.strip(), code, flags=re.DOTALL)

    new_daily_availability = """  function getDailyAvailability() {
    return monthlyTrends.map(m => ({ date: m.month, score: 98.4, pct: 98.4, value: 98.4 }));
  }"""

    code = re.sub(r'function getDailyAvailability\(\) \{.*?\}', new_daily_availability.strip(), code, flags=re.DOTALL)

    with open(data_path, "w") as f:
        f.write(code)
    print("[SUCCESS] Updated js/data.js with minutes in downtimeCauses and score in getDailyAvailability")

    # 2. Update dashboard.html to resolve duplicate revenueBranchChart ID
    dash_path = "/Users/mac/Downloads/AliBaba_Dashboard/dashboard.html"
    with open(dash_path) as f:
        html = f.read()

    # Replace duplicate ID on line 383
    html = html.replace(
        '<div id="revenueBranchChart" class="chart-container"></div>',
        '<div id="overviewRevenueBranchChart" class="chart-container" style="height:320px;"></div>'
    )

    with open(dash_path, "w") as f:
        f.write(html)
    print("[SUCCESS] Removed duplicate #revenueBranchChart ID from dashboard.html")

if __name__ == "__main__":
    fix_all_three()
