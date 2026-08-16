#!/usr/bin/env python3
"""
fix_overview_revenue_branch_chart.py —
1. Updates drawRevenueBranch in js/charts.js to accept custom target divId (defaults to 'revenueBranchChart').
2. Updates initOverview to call drawRevenueBranch('revenueBranchChart') and initRevenue to call drawRevenueBranch('revenueBranchChartRev').
3. Updates dashboard.html so overview section has id='revenueBranchChart' and revenue section has id='revenueBranchChartRev'.
"""

import os, re

def fix_revenue_branch_charts():
    # 1. Update js/charts.js
    charts_path = "/Users/mac/Downloads/AliBaba_Dashboard/js/charts.js"
    with open(charts_path) as f:
        code = f.read()

    # Update function signature
    code = code.replace(
        "function drawRevenueBranch() {",
        "function drawRevenueBranch(targetId = 'revenueBranchChart') {"
    )

    code = code.replace(
        "const root = createRoot(\"revenueBranchChart\");",
        "const root = createRoot(targetId);"
    )

    # Update exports in return block
    code = code.replace(
        "initOverview() { drawOrdersTimeline(); drawRevenueBranch();",
        "initOverview() { drawOrdersTimeline(); drawRevenueBranch('revenueBranchChart');"
    )

    code = code.replace(
        "initRevenue() { drawDailyRevenue(); drawRevenueBranch();",
        "initRevenue() { drawDailyRevenue(); drawRevenueBranch('revenueBranchChartRev');"
    )

    with open(charts_path, "w") as f:
        f.write(code)
    print("[SUCCESS] Updated js/charts.js drawRevenueBranch to support targetId")

    # 2. Update dashboard.html
    dash_path = "/Users/mac/Downloads/AliBaba_Dashboard/dashboard.html"
    with open(dash_path) as f:
        html = f.read()

    # Overview div ID -> revenueBranchChart
    html = html.replace(
        '<div id="overviewRevenueBranchChart" class="chart-container" style="height:320px;"></div>',
        '<div id="revenueBranchChart" class="chart-container" style="height:320px;"></div>'
    )

    # Revenue section div ID -> revenueBranchChartRev
    html = html.replace(
        '<div id="revenueBranchChart" style="height:320px;"></div>',
        '<div id="revenueBranchChartRev" style="height:320px;"></div>'
    )

    with open(dash_path, "w") as f:
        f.write(html)
    print("[SUCCESS] Updated dashboard.html div IDs for overview and revenue sections")

if __name__ == "__main__":
    fix_revenue_branch_charts()
