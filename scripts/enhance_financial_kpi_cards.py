#!/usr/bin/env python3
"""
enhance_financial_kpi_cards.py —
Redesigns the Financial Sales & Net Payout Analytics header, insight banner, and KPI card row
in dashboard.html with top accent colors, badge icons, clear vertical hierarchy, and premium glassmorphic styling.
"""

import os, re

def enhance_cards():
    dash_path = "/Users/mac/Downloads/AliBaba_Dashboard/dashboard.html"
    with open(dash_path) as f:
        html = f.read()

    new_banner_and_cards = """      <!-- Financial Insight Banner (Enhanced UI/UX) -->
      <div class="dynamic-insight-banner" id="insightBannerRevenue" style="margin-bottom:24px; padding:18px 24px; background:linear-gradient(135deg, rgba(16,185,129,0.05), rgba(37,99,235,0.04)); border:1px solid rgba(16,185,129,0.2); border-left:5px solid #10B981; border-radius:14px;">
        <div style="display:flex; align-items:center; gap:10px; margin-bottom:6px;">
          <span style="font-size:1.1rem;">📊</span>
          <strong style="font-size:0.96rem; font-weight:800; color:var(--text-primary);">Financial Analysis & Marketplace Fee Insights (June 2025 – June 2026):</strong>
        </div>
        <p style="font-size:0.86rem; line-height:1.5; color:var(--text-secondary); margin:0;">
          Gross item sales reached <strong>CAD $687,244.17</strong> across <strong>21,562 orders</strong> (All 9 Toronto Branches). After marketplace commission fees of <strong>CAD -$140,470.57</strong> (20.4% fee rate), net payout dispatched to Ali Baba's chain was <strong>CAD $351,844.00</strong> (51.2% net retention margin). Top revenue contributor is <strong>Danforth (CAD $130,751.26)</strong>.
        </p>
      </div>

      <!-- Financial Scorecard Cards (Enhanced High-End UI/UX) -->
      <div class="kpi-grid" style="grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); gap:18px; margin-bottom:28px;">
        <!-- Card 1: Gross Sales -->
        <div class="kpi-card" style="padding:22px 24px; border-radius:16px; background:var(--surface); border:1px solid rgba(37,99,235,0.15); border-top:4px solid #2563EB; box-shadow:0 4px 14px rgba(37,99,235,0.06); display:flex; flex-direction:column; justify-content:space-between;">
          <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:10px;">
            <span style="font-size:0.75rem; font-weight:800; color:var(--text-muted); letter-spacing:0.05em; text-transform:uppercase;">TOTAL GROSS SALES</span>
            <span style="background:rgba(37,99,235,0.1); color:#2563EB; border-radius:8px; padding:4px 8px; font-size:0.85rem; font-weight:700;">💳 Gross</span>
          </div>
          <div style="font-size:1.75rem; font-weight:800; color:#2563EB; line-height:1.2; margin-bottom:6px;">CAD $687,244</div>
          <div style="font-size:0.8rem; color:var(--text-muted); display:flex; align-items:center; gap:6px;">
            <span style="color:#2563EB; font-weight:700;">●</span> Before fees & taxes
          </div>
        </div>

        <!-- Card 2: Marketplace Fees -->
        <div class="kpi-card" style="padding:22px 24px; border-radius:16px; background:var(--surface); border:1px solid rgba(239,68,68,0.15); border-top:4px solid #EF4444; box-shadow:0 4px 14px rgba(239,68,68,0.06); display:flex; flex-direction:column; justify-content:space-between;">
          <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:10px;">
            <span style="font-size:0.75rem; font-weight:800; color:var(--text-muted); letter-spacing:0.05em; text-transform:uppercase;">MARKETPLACE FEES</span>
            <span style="background:rgba(239,68,68,0.1); color:#EF4444; border-radius:8px; padding:4px 8px; font-size:0.85rem; font-weight:700;">💸 20.4% Fee</span>
          </div>
          <div style="font-size:1.75rem; font-weight:800; color:#EF4444; line-height:1.2; margin-bottom:6px;">CAD -$140,471</div>
          <div style="font-size:0.8rem; color:var(--text-muted); display:flex; align-items:center; gap:6px;">
            <span style="color:#EF4444; font-weight:700;">●</span> Uber Eats commission rate
          </div>
        </div>

        <!-- Card 3: Net Payout -->
        <div class="kpi-card" style="padding:22px 24px; border-radius:16px; background:var(--surface); border:1px solid rgba(16,185,129,0.2); border-top:4px solid #10B981; box-shadow:0 4px 14px rgba(16,185,129,0.08); display:flex; flex-direction:column; justify-content:space-between;">
          <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:10px;">
            <span style="font-size:0.75rem; font-weight:800; color:var(--text-muted); letter-spacing:0.05em; text-transform:uppercase;">TOTAL NET PAYOUT</span>
            <span style="background:rgba(16,185,129,0.12); color:#059669; border-radius:8px; padding:4px 8px; font-size:0.85rem; font-weight:700;">51.2% Margin</span>
          </div>
          <div style="font-size:1.75rem; font-weight:800; color:#10B981; line-height:1.2; margin-bottom:6px;">CAD $351,844</div>
          <div style="font-size:0.8rem; color:var(--text-muted); display:flex; align-items:center; gap:6px;">
            <span style="color:#10B981; font-weight:700;">✓</span> Net payout delivered
          </div>
        </div>

        <!-- Card 4: Avg Order Value -->
        <div class="kpi-card" style="padding:22px 24px; border-radius:16px; background:var(--surface); border:1px solid rgba(99,102,241,0.15); border-top:4px solid #6366F1; box-shadow:0 4px 14px rgba(99,102,241,0.06); display:flex; flex-direction:column; justify-content:space-between;">
          <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:10px;">
            <span style="font-size:0.75rem; font-weight:800; color:var(--text-muted); letter-spacing:0.05em; text-transform:uppercase;">AVERAGE TICKET (AOV)</span>
            <span style="background:rgba(99,102,241,0.1); color:#4F46E5; border-radius:8px; padding:4px 8px; font-size:0.85rem; font-weight:700;">🏷️ Per Ticket</span>
          </div>
          <div style="font-size:1.75rem; font-weight:800; color:#4F46E5; line-height:1.2; margin-bottom:6px;">CAD $31.87</div>
          <div style="font-size:0.8rem; color:var(--text-muted); display:flex; align-items:center; gap:6px;">
            <span style="color:#4F46E5; font-weight:700;">●</span> Average gross spend
          </div>
        </div>
      </div>"""

    # Pattern replacement for section-revenue banner and kpi-grid
    pattern = r'<!-- Financial Insight Banner -->.*?<!-- Top Chart: Revenue Trajectory & Branch Financials -->'
    replacement = new_banner_and_cards + "\n\n      <!-- Top Chart: Revenue Trajectory & Branch Financials -->"

    html = re.sub(pattern, replacement, html, flags=re.DOTALL)

    with open(dash_path, "w") as f:
        f.write(html)
    print("[SUCCESS] Enhanced Financial KPI Cards and Insight Banner in dashboard.html")

if __name__ == "__main__":
    enhance_cards()
