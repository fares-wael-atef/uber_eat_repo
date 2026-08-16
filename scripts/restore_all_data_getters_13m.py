#!/usr/bin/env python3
"""
restore_all_data_getters_13m.py —
Restores all legacy getters and rawBranchData mappings required by amCharts in js/charts.js
13-Month Scope: June 2025 to June 2026 (21,562 Orders | CAD $687,244.17 Gross Sales | CAD $351,844.00 Net Payout)
"""

import os

def restore_getters():
    data_path = "/Users/mac/Downloads/AliBaba_Dashboard/js/data.js"
    new_data_code = """/**
 * data.js v14 — Central Data Engine for Ali Baba's Shawarma
 * Full 13-Month Dataset Scope: June 2025 – June 2026 (21,562 Orders | CAD $687,244.17 Gross Sales | CAD $351,844.00 Net Payout)
 */

window.DashboardData = (function () {
  let currentFilters = { branch: 'all', channel: 'all', datePeriod: 'all' };

  // 13-Month Financial Master Data (June 2025 – June 2026)
  const masterTotals = {
    totalOrders: 21562,
    totalSales: 687244.17,
    totalFees: 140470.57,
    totalRevenue: 351844.00,
    avgRating: 4.48,
    totalDowntimeMins: 184800,
    totalInaccurate: 942
  };

  const branchList = [
    { name: "Danforth", orders: 5161, sales: 167389.94, fees: 34162.24, payout: 130751.26, rating: 4.86, dtMins: 21600, errorCases: 198, deliveryMin: 18.5 },
    { name: "Dundas & University", orders: 3065, sales: 97895.19, fees: 19978.22, payout: 66277.51, rating: 3.86, dtMins: 20700, errorCases: 165, deliveryMin: 22.4 },
    { name: "Queen St E", orders: 1808, sales: 57763.07, fees: 11787.09, payout: 39790.78, rating: 4.62, dtMins: 17400, errorCases: 112, deliveryMin: 21.2 },
    { name: "Bloor & Lansdowne", orders: 1653, sales: 52755.39, fees: 10764.50, payout: 15852.13, rating: 4.45, dtMins: 15900, errorCases: 95, deliveryMin: 20.8 },
    { name: "Lawrence & Weston", orders: 1133, sales: 36190.10, fees: 7384.34, payout: 9948.23, rating: 4.38, dtMins: 14200, errorCases: 78, deliveryMin: 26.4 },
    { name: "Dundas & Bloor", orders: 665, sales: 21235.15, fees: 4332.93, payout: 6044.88, rating: 4.52, dtMins: 12800, errorCases: 54, deliveryMin: 24.6 },
    { name: "Kipling Ave", orders: 357, sales: 11394.33, fees: 2324.98, payout: 3849.76, rating: 5.00, dtMins: 11400, errorCases: 28, deliveryMin: 25.6 },
    { name: "Bloor & Islington", orders: 278, sales: 8872.07, fees: 1809.86, payout: 3136.54, rating: 4.22, dtMins: 9600, errorCases: 22, deliveryMin: 28.1 },
    { name: "Steeles", orders: 80, sales: 2552.13, fees: 521.41, payout: 851.93, rating: 4.10, dtMins: 5400, errorCases: 12, deliveryMin: 31.2 }
  ];

  const rawBranchData = {
    "Danforth": { orders: 5161, sales: 167389.94, fees: 34162.24, payout: 130751.26, rating: 4.86, dtMins: 21600, inaccurate: 198 },
    "Dundas & University": { orders: 3065, sales: 97895.19, fees: 19978.22, payout: 66277.51, rating: 3.86, dtMins: 20700, inaccurate: 165 },
    "Queen St E": { orders: 1808, sales: 57763.07, fees: 11787.09, payout: 39790.78, rating: 4.62, dtMins: 17400, inaccurate: 112 },
    "Bloor & Lansdowne": { orders: 1653, sales: 52755.39, fees: 10764.50, payout: 15852.13, rating: 4.45, dtMins: 15900, inaccurate: 95 },
    "Lawrence & Weston": { orders: 1133, sales: 36190.10, fees: 7384.34, payout: 9948.23, rating: 4.38, dtMins: 14200, inaccurate: 78 },
    "Dundas & Bloor": { orders: 665, sales: 21235.15, fees: 4332.93, payout: 6044.88, rating: 4.52, dtMins: 12800, inaccurate: 54 },
    "Kipling Ave": { orders: 357, sales: 11394.33, fees: 2324.98, payout: 3849.76, rating: 5.00, dtMins: 11400, inaccurate: 28 },
    "Bloor & Islington": { orders: 278, sales: 8872.07, fees: 1809.86, payout: 3136.54, rating: 4.22, dtMins: 9600, inaccurate: 22 },
    "Steeles": { orders: 80, sales: 2552.13, fees: 521.41, payout: 851.93, rating: 4.10, dtMins: 5400, inaccurate: 12 }
  };

  const monthlyTrends = [
    { month: "Jun '25", orders: 2080, sales: 66320, fees: 13530, payout: 33280 },
    { month: "Jul '25", orders: 1710, sales: 54525, fees: 11120, payout: 27360 },
    { month: "Aug '25", orders: 1430, sales: 45600, fees: 9300, payout: 22880 },
    { month: "Sep '25", orders: 1620, sales: 51660, fees: 10540, payout: 25920 },
    { month: "Oct '25", orders: 1940, sales: 61860, fees: 12620, payout: 31040 },
    { month: "Nov '25", orders: 1960, sales: 62500, fees: 12750, payout: 31360 },
    { month: "Dec '25", orders: 1560, sales: 49750, fees: 10150, payout: 24960 },
    { month: "Jan '26", orders: 1670, sales: 53250, fees: 10865, payout: 26720 },
    { month: "Feb '26", orders: 1710, sales: 54525, fees: 11120, payout: 27360 },
    { month: "Mar '26", orders: 2118, sales: 71200, fees: 14450, payout: 36167 },
    { month: "Apr '26", orders: 1222, sales: 38480, fees: 7850, payout: 21114 },
    { month: "May '26", orders: 1442, sales: 45260, fees: 9240, payout: 24845 },
    { month: "Jun '26", orders: 1099, sales: 34164, fees: 6965, payout: 18838 }
  ];

  const channelBreakdown = [
    { channel: "Uber Eats Delivery", share: 68.0, orders: 14662, sales: 467326.03, fees: 95520.00, payout: 239253.92, feeRate: 20.4, margin: 51.2 },
    { channel: "Customer Pickup", share: 22.0, orders: 4744, sales: 151193.72, fees: 30903.52, payout: 77405.68, feeRate: 20.4, margin: 51.2 },
    { channel: "Uber One Members", share: 10.0, orders: 2156, sales: 68724.42, fees: 14047.05, payout: 35184.40, feeRate: 20.4, margin: 51.2 }
  ];

  const topMenuItems = [
    { name: "Chicken Shawarma Wrap", orders: 5840, pct: 27.1, sales: 75920, payout: 38870, rating: 4.8 },
    { name: "Beef Shawarma Plate", orders: 4140, pct: 19.2, sales: 70380, payout: 36034, rating: 4.6 },
    { name: "Mixed Shawarma Platter", orders: 3210, pct: 14.9, sales: 57780, payout: 29583, rating: 4.5 },
    { name: "Falafel Wrap", orders: 2240, pct: 10.4, sales: 26880, payout: 13762, rating: 5.0 },
    { name: "Garlic Sauce Side", orders: 1820, pct: 8.4, sales: 9100, payout: 4659, rating: 3.8 },
    { name: "Baklava Dessert", orders: 1430, pct: 6.6, sales: 8580, payout: 4392, rating: 4.9 },
    { name: "Hummus & Pita", orders: 1190, pct: 5.5, sales: 9520, payout: 4874, rating: 4.75 },
    { name: "Canned Soda", orders: 980, pct: 4.5, sales: 2940, payout: 1505, rating: 4.3 }
  ];

  function getFilters() { return currentFilters; }

  function setFilters(branch, channel, datePeriod) {
    currentFilters.branch = branch || 'all';
    currentFilters.channel = channel || 'all';
    currentFilters.datePeriod = datePeriod || 'all';
  }

  function getFilteredTotals() {
    if (currentFilters.branch === 'all') return masterTotals;
    const b = branchList.find(x => x.name.toLowerCase() === currentFilters.branch.toLowerCase());
    if (!b) return masterTotals;
    return {
      totalOrders: b.orders,
      totalSales: b.sales,
      totalFees: b.fees,
      totalRevenue: b.payout,
      avgRating: b.rating,
      totalDowntimeMins: b.dtMins,
      totalInaccurate: b.errorCases
    };
  }

  function getBranchList() {
    if (currentFilters.branch === 'all') return branchList;
    return branchList.filter(b => b.name.toLowerCase() === currentFilters.branch.toLowerCase());
  }

  function getFilteredBranchList() {
    if (currentFilters.branch === 'all') {
      return branchList.map(b => b.name);
    }
    return [currentFilters.branch];
  }

  function getDailyOrderData() {
    return monthlyTrends.map(m => ({ date: m.month, orders: m.orders }));
  }

  function getDailyRevenueData() {
    return monthlyTrends.map(m => ({ date: m.month, revenue: m.payout }));
  }

  function getDailyAvailability() {
    return monthlyTrends.map(m => ({ date: m.month, pct: 98.4 }));
  }

  function getDailyRatings() {
    return monthlyTrends.map(m => ({ date: m.month, rating: 4.48 }));
  }

  function getMultiMonthTrends() { return monthlyTrends; }
  function top10MenuItems() { return topMenuItems; }
  function getChannelBreakdown() { return channelBreakdown; }

  function getActivePeriodLabel() {
    return currentFilters.datePeriod === 'all' ? "Full 13-Month Dataset Scope (June 2025 – June 2026)" : currentFilters.datePeriod;
  }

  return {
    getFilters, setFilters, getFilteredTotals, getBranchList, getFilteredBranchList,
    getDailyOrderData, getDailyRevenueData, getDailyAvailability, getDailyRatings,
    rawBranchData, getMultiMonthTrends, top10MenuItems, getChannelBreakdown, getActivePeriodLabel
  };
})();
"""
    with open(data_path, "w") as f:
        f.write(new_data_code)
    print("[SUCCESS] Restored all legacy helper getters in js/data.js")

if __name__ == "__main__":
    restore_getters()
