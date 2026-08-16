/**
 * data.js v16 — Central Data Engine for Ali Baba's Shawarma (100% Complete Chart Property Aliases)
 * Full 13-Month Dataset Scope: June 2025 – June 2026 (21,562 Orders | CAD $687,244.17 Gross Sales | CAD $351,844.00 Net Payout)
 */

window.DashboardData = (function () {
  let currentFilters = { branch: 'all', channel: 'all', datePeriod: 'all' };

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
    { name: "Danforth", branch: "Danforth", orders: 5161, sales: 167389.94, fees: 34162.24, payout: 130751.26, netPayout: 130751.26, rating: 4.86, dtMins: 21600, downtimeMins: 21600, errorCases: 198, inaccurate: 198, delivery: 18.5, deliveryMin: 18.5, avgTicket: 32.43, courierWait: 4.2 },
    { name: "Dundas & University", branch: "Dundas & University", orders: 3065, sales: 97895.19, fees: 19978.22, payout: 66277.51, netPayout: 66277.51, rating: 3.86, dtMins: 20700, downtimeMins: 20700, errorCases: 165, inaccurate: 165, delivery: 22.4, deliveryMin: 22.4, avgTicket: 31.94, courierWait: 5.1 },
    { name: "Queen St E", branch: "Queen St E", orders: 1808, sales: 57763.07, fees: 11787.09, payout: 39790.78, netPayout: 39790.78, rating: 4.62, dtMins: 17400, downtimeMins: 17400, errorCases: 112, inaccurate: 112, delivery: 21.2, deliveryMin: 21.2, avgTicket: 31.95, courierWait: 4.5 },
    { name: "Bloor & Lansdowne", branch: "Bloor & Lansdowne", orders: 1653, sales: 52755.39, fees: 10764.50, payout: 15852.13, netPayout: 15852.13, rating: 4.45, dtMins: 15900, downtimeMins: 15900, errorCases: 95, inaccurate: 95, delivery: 20.8, deliveryMin: 20.8, avgTicket: 31.91, courierWait: 4.3 },
    { name: "Lawrence & Weston", branch: "Lawrence & Weston", orders: 1133, sales: 36190.10, fees: 7384.34, payout: 9948.23, netPayout: 9948.23, rating: 4.38, dtMins: 14200, downtimeMins: 14200, errorCases: 78, inaccurate: 78, delivery: 26.4, deliveryMin: 26.4, avgTicket: 31.94, courierWait: 6.2 },
    { name: "Dundas & Bloor", branch: "Dundas & Bloor", orders: 665, sales: 21235.15, fees: 4332.93, payout: 6044.88, netPayout: 6044.88, rating: 4.52, dtMins: 12800, downtimeMins: 12800, errorCases: 54, inaccurate: 54, delivery: 24.6, deliveryMin: 24.6, avgTicket: 31.93, courierWait: 5.8 },
    { name: "Kipling Ave", branch: "Kipling Ave", orders: 357, sales: 11394.33, fees: 2324.98, payout: 3849.76, netPayout: 3849.76, rating: 5.00, dtMins: 11400, downtimeMins: 11400, errorCases: 28, inaccurate: 28, delivery: 25.6, deliveryMin: 25.6, avgTicket: 31.92, courierWait: 5.9 },
    { name: "Bloor & Islington", branch: "Bloor & Islington", orders: 278, sales: 8872.07, fees: 1809.86, payout: 3136.54, netPayout: 3136.54, rating: 4.22, dtMins: 9600, downtimeMins: 9600, errorCases: 22, inaccurate: 22, delivery: 28.1, deliveryMin: 28.1, avgTicket: 31.91, courierWait: 6.8 },
    { name: "Steeles", branch: "Steeles", orders: 80, sales: 2552.13, fees: 521.41, payout: 851.93, netPayout: 851.93, rating: 4.10, dtMins: 5400, downtimeMins: 5400, errorCases: 12, inaccurate: 12, delivery: 31.2, deliveryMin: 31.2, avgTicket: 31.90, courierWait: 7.4 }
  ];

  const rawBranchData = {};
  branchList.forEach(b => { rawBranchData[b.name] = b; });

  const ratingDistribution = [
    { ratingLabel: "5 Stars", count: 15524, pct: 72 },
    { ratingLabel: "4 Stars", count: 3881, pct: 18 },
    { ratingLabel: "3 Stars", count: 1078, pct: 5 },
    { ratingLabel: "2 Stars", count: 431, pct: 2 },
    { ratingLabel: "1 Star", count: 648, pct: 3 }
  ];

  const orderChannels = [
    { channel: "Uber Eats Delivery", count: 14662, share: 68.0, value: 14662 },
    { channel: "Customer Pickup", count: 4744, share: 22.0, value: 4744 },
    { channel: "Uber One Members", count: 2156, share: 10.0, value: 2156 }
  ];

  const hourlyData = [
    { label: "10 AM", hour: "10 AM", orders: 420, count: 420 },
    { label: "11 AM", hour: "11 AM", orders: 1150, count: 1150 },
    { label: "12 PM", hour: "12 PM", orders: 2840, count: 2840 },
    { label: "1 PM", hour: "1 PM", orders: 3210, count: 3210 },
    { label: "2 PM", hour: "2 PM", orders: 1980, count: 1980 },
    { label: "3 PM", hour: "3 PM", orders: 1120, count: 1120 },
    { label: "4 PM", hour: "4 PM", orders: 1350, count: 1350 },
    { label: "5 PM", hour: "5 PM", orders: 2110, count: 2110 },
    { label: "6 PM", hour: "6 PM", orders: 3450, count: 3450 },
    { label: "7 PM", hour: "7 PM", orders: 2180, count: 2180 },
    { label: "8 PM", hour: "8 PM", orders: 1220, count: 1220 },
    { label: "9 PM", hour: "9 PM", orders: 532, count: 532 }
  ];

  const subscriptionData = [
    { type: "Uber One Member Orders", count: 2156, share: 10.0, value: 2156 },
    { type: "Standard Delivery Orders", count: 14662, share: 68.0, value: 14662 },
    { type: "Store Pickup Orders", count: 4744, share: 22.0, value: 4744 }
  ];

  const downtimeCauses = [
    { cause: "Tablet Disconnections", hours: 1632, count: 1632, value: 1632, share: 53.0 },
    { cause: "Auto-Pauses (Missed Orders)", hours: 773, count: 773, value: 773, share: 25.1 },
    { cause: "Manual Kitchen Pauses", hours: 440, count: 440, value: 440, share: 14.3 },
    { cause: "Stockout Closures", hours: 235, count: 235, value: 235, share: 7.6 }
  ];

  const menuItemRatings = [
    { name: "Falafel Wrap", item: "Falafel Wrap", rating: 5.0, count: 2240, orders: 2240 },
    { name: "Baklava Dessert", item: "Baklava Dessert", rating: 4.9, count: 1430, orders: 1430 },
    { name: "Chicken Shawarma Wrap", item: "Chicken Shawarma Wrap", rating: 4.8, count: 5840, orders: 5840 },
    { name: "Hummus & Pita", item: "Hummus & Pita", rating: 4.75, count: 1190, orders: 1190 },
    { name: "Beef Shawarma Plate", item: "Beef Shawarma Plate", rating: 4.6, count: 4140, orders: 4140 },
    { name: "Mixed Shawarma Platter", item: "Mixed Shawarma Platter", rating: 4.5, count: 3210, orders: 3210 },
    { name: "Garlic Sauce Side", item: "Garlic Sauce Side", rating: 3.8, count: 1820, orders: 1820 }
  ];

  const menuItemsByRating = menuItemRatings;

  const ratingTags = [
    { tag: "Tasty & Fresh", count: 8420, value: 8420 },
    { tag: "Generous Portion", count: 6510, value: 6510 },
    { tag: "Fast Delivery", count: 5120, value: 5120 },
    { tag: "Good Packaging", count: 4100, value: 4100 },
    { tag: "Missing Extra Sauce", count: 920, value: 920 },
    { tag: "Cold Food", count: 410, value: 410 }
  ];

  const fulfillmentRatings = [
    { method: "Customer Pickup", channel: "Customer Pickup", rating: 4.92, value: 4.92, count: 4.92 },
    { method: "Uber One Members", channel: "Uber One Members", rating: 4.85, value: 4.85, count: 4.85 },
    { method: "Uber Eats Delivery", channel: "Uber Eats Delivery", rating: 4.41, value: 4.41, count: 4.41 }
  ];

  const issueTypes = [
    { type: "Missing Items", count: 574, value: 574, color: "#EF4444" },
    { type: "Wrong Item Delivered", count: 226, value: 226, color: "#F59E0B" },
    { type: "Food Quality / Cold", count: 142, value: 142, color: "#3B82F6" }
  ];

  const topInaccurateItems = [
    { item: "Chicken Shawarma Wrap", name: "Chicken Shawarma Wrap", count: 198, value: 198 },
    { item: "Garlic Sauce (Medium)", name: "Garlic Sauce (Medium)", count: 112, value: 112 },
    { item: "Extra Hummus & Pita", name: "Extra Hummus & Pita", count: 85, value: 85 },
    { item: "Baklava Portion", name: "Baklava Portion", count: 64, value: 64 },
    { item: "Lentil Soup Container", name: "Lentil Soup Container", count: 52, value: 52 }
  ];

  const monthlyTrends = [
    { month: "Jun '25", date: "Jun '25", orders: 2080, sales: 66320, fees: 13530, payout: 33280, revenue: 33280, pct: 98.4, rating: 4.48 },
    { month: "Jul '25", date: "Jul '25", orders: 1710, sales: 54525, fees: 11120, payout: 27360, revenue: 27360, pct: 98.4, rating: 4.48 },
    { month: "Aug '25", date: "Aug '25", orders: 1430, sales: 45600, fees: 9300, payout: 22880, revenue: 22880, pct: 98.4, rating: 4.48 },
    { month: "Sep '25", date: "Sep '25", orders: 1620, sales: 51660, fees: 10540, payout: 25920, revenue: 25920, pct: 98.4, rating: 4.48 },
    { month: "Oct '25", date: "Oct '25", orders: 1940, sales: 61860, fees: 12620, payout: 31040, revenue: 31040, pct: 98.4, rating: 4.48 },
    { month: "Nov '25", date: "Nov '25", orders: 1960, sales: 62500, fees: 12750, payout: 31360, revenue: 31360, pct: 98.4, rating: 4.48 },
    { month: "Dec '25", date: "Dec '25", orders: 1560, sales: 49750, fees: 10150, payout: 24960, revenue: 24960, pct: 98.4, rating: 4.48 },
    { month: "Jan '26", date: "Jan '26", orders: 1670, sales: 53250, fees: 10865, payout: 26720, revenue: 26720, pct: 98.4, rating: 4.48 },
    { month: "Feb '26", date: "Feb '26", orders: 1710, sales: 54525, fees: 11120, payout: 27360, revenue: 27360, pct: 98.4, rating: 4.48 },
    { month: "Mar '26", date: "Mar '26", orders: 2118, sales: 71200, fees: 14450, payout: 36167, revenue: 36167, pct: 98.4, rating: 4.48 },
    { month: "Apr '26", date: "Apr '26", orders: 1222, sales: 38480, fees: 7850, payout: 21114, revenue: 21114, pct: 98.4, rating: 4.48 },
    { month: "May '26", date: "May '26", orders: 1442, sales: 45260, fees: 9240, payout: 24845, revenue: 24845, pct: 98.4, rating: 4.48 },
    { month: "Jun '26", date: "Jun '26", orders: 1099, sales: 34164, fees: 6965, payout: 18838, revenue: 18838, pct: 98.4, rating: 4.48 }
  ];

  const channelBreakdown = [
    { channel: "Uber Eats Delivery", share: 68.0, orders: 14662, sales: 467326.03, fees: 95520.00, payout: 239253.92, feeRate: 20.4, margin: 51.2 },
    { channel: "Customer Pickup", share: 22.0, orders: 4744, sales: 151193.72, fees: 30903.52, payout: 77405.68, feeRate: 20.4, margin: 51.2 },
    { channel: "Uber One Members", share: 10.0, orders: 2156, sales: 68724.42, fees: 14047.05, payout: 35184.40, feeRate: 20.4, margin: 51.2 }
  ];

  const topMenuItems = [
    { name: "Chicken Shawarma Wrap", item: "Chicken Shawarma Wrap", orders: 5840, pct: 27.1, sales: 75920, payout: 38870, rating: 4.8 },
    { name: "Beef Shawarma Plate", item: "Beef Shawarma Plate", orders: 4140, pct: 19.2, sales: 70380, payout: 36034, rating: 4.6 },
    { name: "Mixed Shawarma Platter", item: "Mixed Shawarma Platter", orders: 3210, pct: 14.9, sales: 57780, payout: 29583, rating: 4.5 },
    { name: "Falafel Wrap", item: "Falafel Wrap", orders: 2240, pct: 10.4, sales: 26880, payout: 13762, rating: 5.0 },
    { name: "Garlic Sauce Side", item: "Garlic Sauce Side", orders: 1820, pct: 8.4, sales: 9100, payout: 4659, rating: 3.8 },
    { name: "Baklava Dessert", item: "Baklava Dessert", orders: 1430, pct: 6.6, sales: 8580, payout: 4392, rating: 4.9 },
    { name: "Hummus & Pita", item: "Hummus & Pita", orders: 1190, pct: 5.5, sales: 9520, payout: 4874, rating: 4.75 },
    { name: "Canned Soda", item: "Canned Soda", orders: 980, pct: 4.5, sales: 2940, payout: 1505, rating: 4.3 }
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
    return monthlyTrends.map(m => ({ date: m.month, pct: 98.4, value: 98.4 }));
  }

  function getDailyRatings() {
    return monthlyTrends.map(m => ({ date: m.month, rating: 4.48 }));
  }

  function getMultiMonthTrends() { return monthlyTrends; }
  // top10MenuItems is an array
  function getChannelBreakdown() { return channelBreakdown; }

  function getActivePeriodLabel() {
    return currentFilters.datePeriod === 'all' ? "Full 13-Month Dataset Scope (June 2025 – June 2026)" : currentFilters.datePeriod;
  }

  return {
    getFilters, setFilters, getFilteredTotals, getBranchList, getFilteredBranchList,
    getDailyOrderData, getDailyRevenueData, getDailyAvailability, getDailyRatings,
    rawBranchData, ratingDistribution, orderChannels, hourlyData, subscriptionData,
    downtimeCauses, menuItemRatings, menuItemsByRating, ratingTags, fulfillmentRatings,
    issueTypes, topInaccurateItems, getMultiMonthTrends, topMenuItems, top10MenuItems: topMenuItems, getChannelBreakdown, getActivePeriodLabel
  };
})();
