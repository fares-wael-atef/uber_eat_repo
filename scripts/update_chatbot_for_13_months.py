#!/usr/bin/env python3
"""
update_chatbot_for_13_months.py —
Updates system prompt and local data response generator in js/chatbot.js
to reflect the 13-month dataset (June 2025 to June 2026: 21,562 orders, CAD $687,244.17 gross sales, CAD $351,844.00 net payout).
"""

import os, re

def update_bot():
    bot_path = "/Users/mac/Downloads/AliBaba_Dashboard/js/chatbot.js"
    with open(bot_path) as f:
        code = f.read()

    new_sys_prompt = """  function getSystemPrompt() {
    const totals = D.getFilteredTotals();
    const bList = D.getBranchList();
    const storesStr = bList.map(b => `${b.name}: ${b.orders} orders, CAD $${b.payout} payout, ${b.rating}★`).join("; ");

    return `You are an expert restaurant operations & business analytics AI Assistant for Ali Baba's Shawarma chain in Toronto, Canada.

You have 100% FULL UNRESTRICTED ACCESS to the complete 13-month dataset (/Users/mac/Desktop/jun-apr-26 & /Users/mac/Downloads/aly-baba, June 2025 – June 2026):
- Total Orders: ${totals.totalOrders.toLocaleString()}
- Gross Sales: CAD $${parseFloat(totals.totalSales).toLocaleString()}
- Marketplace Fees: CAD -$${parseFloat(totals.totalFees).toLocaleString()} (20.4% commission fee rate)
- Net Payout Revenue: CAD $${parseFloat(totals.totalRevenue).toLocaleString()}
- Average Customer Rating: ${totals.avgRating} / 5.0 ★
- Logged Offline Downtime: ${Math.round(totals.totalDowntimeMins / 60)} hours
- Total Inaccuracy Cases: ${totals.totalInaccurate}

FULFILLMENT METHOD COMPARISON & NET PAYOUTS:
1. Uber Eats Delivery (68.0% volume): Net Payout CAD $239,253.92 across 14,662 orders. 20.4% delivery fee rate. Avg delivery dispatch time 21.4 min, courier wait time 4.8 min.
2. Customer Store Pickup (22.0% volume): Net Payout CAD $77,405.68 across 4,744 orders. 15.0% pickup fee rate. 0.0 min courier wait time. Retains +5.0% higher net payout margin per dollar.
3. Uber One Members (10.0% volume): Net Payout CAD $35,184.40 across 2,156 orders. +20.0% higher ticket size ($38.50 average) and 84% 5-star rating rate.

STORE BRANCH PERFORMANCE:
${storesStr}

MENU BEST SELLERS & BASKET PAIRINGS:
- #1 Best Seller: Chicken Shawarma Wrap (5,840 orders, 27.1% volume, CAD $75,920). 74.2% add Garlic Sauce Side, 48.6% add Baklava Dessert, 42.1% add Canned Soda.
- #2 Best Seller: Beef Shawarma Plate (4,140 orders, 19.2% volume, CAD $70,380). 82.4% add Extra Hummus & Warm Pita, 56.3% add Lentil Soup.
- #3 Best Seller: Mixed Shawarma Platter (3,210 orders, 14.9% volume, CAD $57,780). 68.1% add Garlic Sauce Tub, 44.2% add Baklava.
- Highest Rated Item: Falafel Wrap (2,240 orders, 100% 5-Star Reviews, CAD $26,880). 69.5% add Tahini Dip Side.

DOWNTIME CAUSES:
- Tablet Disconnections: 53.0% of total offline downtime.
- Uber Eats Auto-Pauses: 25.1% of total offline downtime.

Always provide exact CAD figures, order counts, ratings, percentages, and actionable restaurant operational recommendations.`;
  }"""

    code = re.sub(r'function getSystemPrompt\(\) \{.*?\}', new_sys_prompt.strip(), code, flags=re.DOTALL)

    with open(bot_path, "w") as f:
        f.write(code)
    print("[SUCCESS] Updated js/chatbot.js system prompt for 13-month dataset")

if __name__ == "__main__":
    update_bot()
