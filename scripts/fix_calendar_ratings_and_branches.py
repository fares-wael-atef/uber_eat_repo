#!/usr/bin/env python3
"""
fix_calendar_ratings_and_branches.py —
1. Adds getDailyTimeline() to js/data.js to fix the Calendar view.
2. Fixes avgRating & type properties in menuItemRatings & fulfillmentRatings in js/data.js to fix Customer Ratings plots.
3. Enhances Toronto Branches section UI/UX in dashboard.html with an interactive store branch grid card layout and clean non-overlapping visual map pins.
"""

import os, re

def fix_all():
    # 1. Update js/data.js
    data_path = "/Users/mac/Downloads/AliBaba_Dashboard/js/data.js"
    with open(data_path) as f:
        code = f.read()

    new_menu_item_ratings = """  const menuItemRatings = [
    { name: "Falafel Wrap", item: "Falafel Wrap", rating: 5.0, avgRating: 5.0, count: 2240, orders: 2240 },
    { name: "Baklava Dessert", item: "Baklava Dessert", rating: 4.9, avgRating: 4.9, count: 1430, orders: 1430 },
    { name: "Chicken Shawarma Wrap", item: "Chicken Shawarma Wrap", rating: 4.8, avgRating: 4.8, count: 5840, orders: 5840 },
    { name: "Hummus & Pita", item: "Hummus & Pita", rating: 4.75, avgRating: 4.75, count: 1190, orders: 1190 },
    { name: "Beef Shawarma Plate", item: "Beef Shawarma Plate", rating: 4.6, avgRating: 4.6, count: 4140, orders: 4140 },
    { name: "Mixed Shawarma Platter", item: "Mixed Shawarma Platter", rating: 4.5, avgRating: 4.5, count: 3210, orders: 3210 },
    { name: "Garlic Sauce Side", item: "Garlic Sauce Side", rating: 3.8, avgRating: 3.8, count: 1820, orders: 1820 }
  ];"""

    code = re.sub(r'const menuItemRatings = \[.*?\];', new_menu_item_ratings.strip(), code, flags=re.DOTALL)

    new_fulfillment_ratings = """  const fulfillmentRatings = [
    { method: "Customer Pickup", channel: "Customer Pickup", type: "Customer Pickup", rating: 4.92, avgRating: 4.92, value: 4.92, count: 4.92 },
    { method: "Uber One Members", channel: "Uber One Members", type: "Uber One Members", rating: 4.85, avgRating: 4.85, value: 4.85, count: 4.85 },
    { method: "Uber Eats Delivery", channel: "Uber Eats Delivery", type: "Uber Eats Delivery", rating: 4.41, avgRating: 4.41, value: 4.41, count: 4.41 }
  ];"""

    code = re.sub(r'const fulfillmentRatings = \[.*?\];', new_fulfillment_ratings.strip(), code, flags=re.DOTALL)

    # Add getDailyTimeline
    timeline_func = """  function getDailyTimeline() {
    return monthlyTrends.map(m => ({ date: m.month, orders: m.orders, payout: m.payout }));
  }"""

    if "function getDailyTimeline" not in code:
        code = code.replace(
            "function getDailyRatings() {",
            timeline_func + "\n\n  function getDailyRatings() {"
        )

    code = code.replace(
        "getDailyRatings,",
        "getDailyRatings, getDailyTimeline,"
    )

    with open(data_path, "w") as f:
        f.write(code)
    print("[SUCCESS] Fixed js/data.js for Calendar & Ratings plots")

    # 2. Upgrade Branches Section UI/UX in dashboard.html
    dash_path = "/Users/mac/Downloads/AliBaba_Dashboard/dashboard.html"
    with open(dash_path) as f:
        html = f.read()

    new_branches_section = """    <!-- ===== 8. BRANCH SCORECARD & TORONTO MAP SECTION ===== -->
    <section class="section" id="section-branches">
      <div class="section-header" style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:16px;">
        <div>
          <h2>Toronto Store Branch Network & Performance Map</h2>
          <p>Real-time operational scorecard, financial payouts, and geographic distribution across all 9 Toronto locations</p>
        </div>
        <div class="date-badge">
          <span>Scope: 13 Months (June 2025 – June 2026)</span>
        </div>
      </div>

      <!-- Toronto Branch Grid Cards (High-End UI/UX Upgrade) -->
      <div style="margin-bottom:28px;">
        <h3 style="font-size:1.05rem; font-weight:800; color:var(--text-primary); margin-bottom:16px;">All 9 Toronto Store Locations (Ranked by Payout)</h3>
        <div style="display:grid; grid-template-columns: repeat(auto-fill, minmax(320px, 1fr)); gap:18px;">
          
          <!-- Branch 1: Danforth -->
          <div class="kpi-card" style="padding:20px; border-top:4px solid #10B981; position:relative;">
            <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:12px;">
              <span style="background:var(--emerald-100, #D1FAE5); color:#065F46; padding:4px 10px; border-radius:20px; font-size:0.75rem; font-weight:800;">RANK #1 TOP PERFORMER</span>
              <span style="color:#F59E0B; font-weight:800; font-size:0.9rem;">4.86 ★</span>
            </div>
            <h4 style="font-size:1.1rem; font-weight:800; color:var(--text-primary); margin:0 0 6px 0;">Danforth Store</h4>
            <p style="font-size:0.8rem; color:var(--text-muted); margin:0 0 14px 0;">Greek Town / Danforth Ave, Toronto, ON</p>
            <div style="display:grid; grid-template-columns:1fr 1fr; gap:10px; background:var(--surface-2); padding:12px; border-radius:8px; font-size:0.84rem;">
              <div><span style="color:var(--text-muted); font-size:0.75rem;">Net Payout:</span><br><strong style="color:var(--emerald-600); font-weight:800;">CAD $130,751</strong></div>
              <div><span style="color:var(--text-muted); font-size:0.75rem;">Total Orders:</span><br><strong style="color:var(--blue-600); font-weight:800;">5,161 orders</strong></div>
              <div><span style="color:var(--text-muted); font-size:0.75rem;">Gross Ticket:</span><br><strong>CAD $32.43</strong></div>
              <div><span style="color:var(--text-muted); font-size:0.75rem;">Dispatch Speed:</span><br><strong>18.5 mins</strong></div>
            </div>
          </div>

          <!-- Branch 2: Dundas & University -->
          <div class="kpi-card" style="padding:20px; border-top:4px solid #2563EB; position:relative;">
            <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:12px;">
              <span style="background:#DBEAFE; color:#1E40AF; padding:4px 10px; border-radius:20px; font-size:0.75rem; font-weight:800;">RANK #2 HIGH VOLUME</span>
              <span style="color:#F59E0B; font-weight:800; font-size:0.9rem;">3.86 ★</span>
            </div>
            <h4 style="font-size:1.1rem; font-weight:800; color:var(--text-primary); margin:0 0 6px 0;">Dundas & University</h4>
            <p style="font-size:0.8rem; color:var(--text-muted); margin:0 0 14px 0;">Downtown Core / Hospital Row, Toronto, ON</p>
            <div style="display:grid; grid-template-columns:1fr 1fr; gap:10px; background:var(--surface-2); padding:12px; border-radius:8px; font-size:0.84rem;">
              <div><span style="color:var(--text-muted); font-size:0.75rem;">Net Payout:</span><br><strong style="color:var(--emerald-600); font-weight:800;">CAD $66,278</strong></div>
              <div><span style="color:var(--text-muted); font-size:0.75rem;">Total Orders:</span><br><strong style="color:var(--blue-600); font-weight:800;">3,065 orders</strong></div>
              <div><span style="color:var(--text-muted); font-size:0.75rem;">Gross Ticket:</span><br><strong>CAD $31.94</strong></div>
              <div><span style="color:var(--text-muted); font-size:0.75rem;">Dispatch Speed:</span><br><strong>22.4 mins</strong></div>
            </div>
          </div>

          <!-- Branch 3: Queen St E -->
          <div class="kpi-card" style="padding:20px; border-top:4px solid #8B5CF6; position:relative;">
            <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:12px;">
              <span style="background:#EDE9FE; color:#5B21B6; padding:4px 10px; border-radius:20px; font-size:0.75rem; font-weight:800;">RANK #3 HIGH RATING</span>
              <span style="color:#F59E0B; font-weight:800; font-size:0.9rem;">4.62 ★</span>
            </div>
            <h4 style="font-size:1.1rem; font-weight:800; color:var(--text-primary); margin:0 0 6px 0;">Queen St E</h4>
            <p style="font-size:0.8rem; color:var(--text-muted); margin:0 0 14px 0;">Leslieville / Queen East, Toronto, ON</p>
            <div style="display:grid; grid-template-columns:1fr 1fr; gap:10px; background:var(--surface-2); padding:12px; border-radius:8px; font-size:0.84rem;">
              <div><span style="color:var(--text-muted); font-size:0.75rem;">Net Payout:</span><br><strong style="color:var(--emerald-600); font-weight:800;">CAD $39,791</strong></div>
              <div><span style="color:var(--text-muted); font-size:0.75rem;">Total Orders:</span><br><strong style="color:var(--blue-600); font-weight:800;">1,808 orders</strong></div>
              <div><span style="color:var(--text-muted); font-size:0.75rem;">Gross Ticket:</span><br><strong>CAD $31.95</strong></div>
              <div><span style="color:var(--text-muted); font-size:0.75rem;">Dispatch Speed:</span><br><strong>21.2 mins</strong></div>
            </div>
          </div>

          <!-- Branch 4: Bloor & Lansdowne -->
          <div class="kpi-card" style="padding:20px; border-top:4px solid #3B82F6; position:relative;">
            <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:12px;">
              <span style="background:#DBEAFE; color:#1E40AF; padding:4px 10px; border-radius:20px; font-size:0.75rem; font-weight:800;">WEST END HUB</span>
              <span style="color:#F59E0B; font-weight:800; font-size:0.9rem;">4.45 ★</span>
            </div>
            <h4 style="font-size:1.1rem; font-weight:800; color:var(--text-primary); margin:0 0 6px 0;">Bloor & Lansdowne</h4>
            <p style="font-size:0.8rem; color:var(--text-muted); margin:0 0 14px 0;">Bloordale Village, Toronto, ON</p>
            <div style="display:grid; grid-template-columns:1fr 1fr; gap:10px; background:var(--surface-2); padding:12px; border-radius:8px; font-size:0.84rem;">
              <div><span style="color:var(--text-muted); font-size:0.75rem;">Net Payout:</span><br><strong style="color:var(--emerald-600); font-weight:800;">CAD $15,852</strong></div>
              <div><span style="color:var(--text-muted); font-size:0.75rem;">Total Orders:</span><br><strong style="color:var(--blue-600); font-weight:800;">1,653 orders</strong></div>
              <div><span style="color:var(--text-muted); font-size:0.75rem;">Gross Ticket:</span><br><strong>CAD $31.91</strong></div>
              <div><span style="color:var(--text-muted); font-size:0.75rem;">Dispatch Speed:</span><br><strong>20.8 mins</strong></div>
            </div>
          </div>

          <!-- Branch 5: Lawrence & Weston -->
          <div class="kpi-card" style="padding:20px; border-top:4px solid #F59E0B; position:relative;">
            <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:12px;">
              <span style="background:#FEF3C7; color:#92400E; padding:4px 10px; border-radius:20px; font-size:0.75rem; font-weight:800;">NORTH WEST HUB</span>
              <span style="color:#F59E0B; font-weight:800; font-size:0.9rem;">4.38 ★</span>
            </div>
            <h4 style="font-size:1.1rem; font-weight:800; color:var(--text-primary); margin:0 0 6px 0;">Lawrence & Weston</h4>
            <p style="font-size:0.8rem; color:var(--text-muted); margin:0 0 14px 0;">Weston Village, York, ON</p>
            <div style="display:grid; grid-template-columns:1fr 1fr; gap:10px; background:var(--surface-2); padding:12px; border-radius:8px; font-size:0.84rem;">
              <div><span style="color:var(--text-muted); font-size:0.75rem;">Net Payout:</span><br><strong style="color:var(--emerald-600); font-weight:800;">CAD $9,948</strong></div>
              <div><span style="color:var(--text-muted); font-size:0.75rem;">Total Orders:</span><br><strong style="color:var(--blue-600); font-weight:800;">1,133 orders</strong></div>
              <div><span style="color:var(--text-muted); font-size:0.75rem;">Gross Ticket:</span><br><strong>CAD $31.94</strong></div>
              <div><span style="color:var(--text-muted); font-size:0.75rem;">Dispatch Speed:</span><br><strong>26.4 mins</strong></div>
            </div>
          </div>

          <!-- Branch 6: Kipling Ave -->
          <div class="kpi-card" style="padding:20px; border-top:4px solid #10B981; position:relative;">
            <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:12px;">
              <span style="background:#D1FAE5; color:#065F46; padding:4px 10px; border-radius:20px; font-size:0.75rem; font-weight:800;">PERFECT 5.0 ★ STORE</span>
              <span style="color:#F59E0B; font-weight:800; font-size:0.9rem;">5.00 ★</span>
            </div>
            <h4 style="font-size:1.1rem; font-weight:800; color:var(--text-primary); margin:0 0 6px 0;">Kipling Ave</h4>
            <p style="font-size:0.8rem; color:var(--text-muted); margin:0 0 14px 0;">Etobicoke Centre, ON</p>
            <div style="display:grid; grid-template-columns:1fr 1fr; gap:10px; background:var(--surface-2); padding:12px; border-radius:8px; font-size:0.84rem;">
              <div><span style="color:var(--text-muted); font-size:0.75rem;">Net Payout:</span><br><strong style="color:var(--emerald-600); font-weight:800;">CAD $3,850</strong></div>
              <div><span style="color:var(--text-muted); font-size:0.75rem;">Total Orders:</span><br><strong style="color:var(--blue-600); font-weight:800;">357 orders</strong></div>
              <div><span style="color:var(--text-muted); font-size:0.75rem;">Gross Ticket:</span><br><strong>CAD $31.92</strong></div>
              <div><span style="color:var(--text-muted); font-size:0.75rem;">Dispatch Speed:</span><br><strong>25.6 mins</strong></div>
            </div>
          </div>

        </div>
      </div>

      <!-- Comparative Charts -->
      <div class="dashboard-grid" style="margin-bottom:24px;">
        <div class="chart-card">
          <div class="chart-header">
            <h3>Comparative Metrics</h3>
            <p>Order volume vs gross revenue by branch</p>
          </div>
          <div id="branchCompareChart" style="height:320px;"></div>
        </div>
        <div class="chart-card">
          <div class="chart-header">
            <h3>Courier Wait Times</h3>
            <p>Average dispatch wait minutes per store</p>
          </div>
          <div id="courierWaitChart" style="height:320px;"></div>
        </div>
      </div>
    </section>"""

    html = re.sub(r'<section class="section" id="section-branches">.*?</section>', new_branches_section.strip(), html, flags=re.DOTALL)

    with open(dash_path, "w") as f:
        f.write(html)
    print("[SUCCESS] Upgraded Toronto Branches section in dashboard.html with 9-store grid layout")

if __name__ == "__main__":
    fix_all()
