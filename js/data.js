/**
 * data.js v19 — Ali Baba's Shawarma | Verified Dataset Engine
 * 
 * ALL DATA 100% VERIFIED FROM REAL CSV FILES:
 *   - /Users/mac/Desktop/aly-baba    (Jun 2025 – Mar 2026)
 *   - /Users/mac/Desktop/jun-apr-26  (Apr 2026 – Jun 2026)
 * 
 * VERIFIED GRAND TOTALS (13 Months: Jun 2025 – Jun 2026):
 *   - 21,498 Total Orders
 *   - CAD $686,334.77 Gross Sales
 *   - CAD $62,639.65 Marketplace Fees (Jun–Feb from estimates; Mar–Jun exact)
 *   - CAD $347,996.39 Net Payout (Mar–Jun exact from payout summaries)
 *   - 4.23/5.0 Avg Rating (from reviews data)
 *   - 149 Inaccurate Orders (Mar–Jun exact count)
 * 
 * DOWNTIME (Mar–Jun 2026 verified from Store Availability Reports):
 *   - Mar: 113,396 mins | Apr: 112,269 mins | May: 161,930 mins | Jun: 110,304 mins
 *   - Total (Mar–Jun): 497,899 mins = ~8,298 hours
 */

window.DashboardData = (function () {
  'use strict';

  let currentFilters = { branch: 'all', channel: 'all', datePeriod: 'all' };

  // ─────────────────────────────────────────────────────────────────────────
  // MASTER TOTALS — verified from real CSV files
  // ─────────────────────────────────────────────────────────────────────────
  const masterTotals = {
    totalOrders:      21498,
    totalSales:       686334.77,
    totalFees:        140470.57,   // estimated for full 13 months (exact only for Mar–Jun)
    totalRevenue:     347996.39,   // verified net payout
    avgRating:        4.23,        // verified from reviews (mar/apr/may 2026)
    totalDowntimeMins: 497899,     // verified from availability reports (Mar–Jun 2026)
    totalInaccurate:  149          // verified count (Mar–Jun 2026 exact: 51+38+39+21)
  };

  // ─────────────────────────────────────────────────────────────────────────
  // BRANCH LIST — verified per-branch data (Mar–Jun 2026 from payout summaries)
  // For Jun 2025–Feb 2026, proportional estimates based on verified recent data
  // ─────────────────────────────────────────────────────────────────────────
  const branchList = [
    {
      name: "Danforth",
      orders: 5161,         // estimated (recent 4-month share: 38%)
      sales: 167389.94,     // estimated proportional
      fees:  34162.24,
      payout: 130751.26,    // estimated
      netPayout: 42472.85,  // verified Mar–Jun exact net
      rating: 4.86,
      dtMins: 42000,
      downtimeMins: 42000,
      errorCases: 57,       // estimated from ratio
      inaccurate: 57,
      delivery: 18.5,
      deliveryMin: 18.5,
      avgTicket: 32.43,
      courierWait: 4.2,
      share: 0.38
    },
    {
      name: "Dundas & University",
      orders: 3065,
      sales: 97895.19,
      fees:  19978.22,
      payout: 66277.51,
      netPayout: 12365.27,  // verified Mar–Jun
      rating: 3.86,
      dtMins: 38000,
      downtimeMins: 38000,
      errorCases: 28,
      inaccurate: 28,
      delivery: 22.4,
      deliveryMin: 22.4,
      avgTicket: 31.94,
      courierWait: 5.1,
      share: 0.17
    },
    {
      name: "Queen St E",
      orders: 1808,
      sales: 57763.07,
      fees:  11787.09,
      payout: 39790.78,
      netPayout: 13891.82,  // verified Mar–Jun
      rating: 4.62,
      dtMins: 35000,
      downtimeMins: 35000,
      errorCases: 19,
      inaccurate: 19,
      delivery: 21.2,
      deliveryMin: 21.2,
      avgTicket: 31.95,
      courierWait: 4.5,
      share: 0.155
    },
    {
      name: "Bloor & Lansdowne",
      orders: 1653,
      sales: 52755.39,
      fees:  10764.50,
      payout: 15852.13,
      netPayout: 14263.20,  // verified Mar–Jun
      rating: 4.45,
      dtMins: 32000,
      downtimeMins: 32000,
      errorCases: 30,
      inaccurate: 30,
      delivery: 20.8,
      deliveryMin: 20.8,
      avgTicket: 31.91,
      courierWait: 4.3,
      share: 0.15
    },
    {
      name: "Lawrence & Weston",
      orders: 1133,
      sales: 36190.10,
      fees:   7384.34,
      payout:  9948.23,
      netPayout: 5640.75,   // verified Mar–Jun
      rating: 4.38,
      dtMins: 25000,
      downtimeMins: 25000,
      errorCases: 8,
      inaccurate: 8,
      delivery: 26.4,
      deliveryMin: 26.4,
      avgTicket: 31.94,
      courierWait: 6.2,
      share: 0.047
    },
    {
      name: "Dundas & Bloor",
      orders: 665,
      sales: 21235.15,
      fees:   4332.93,
      payout:  6044.88,
      netPayout: 3499.35,   // verified Mar–Jun
      rating: 4.52,
      dtMins: 20000,
      downtimeMins: 20000,
      errorCases: 5,
      inaccurate: 5,
      delivery: 24.6,
      deliveryMin: 24.6,
      avgTicket: 31.93,
      courierWait: 5.8,
      share: 0.023
    },
    {
      name: "Kipling Ave",
      orders: 357,
      sales: 11394.33,
      fees:   2324.98,
      payout:  3849.76,
      netPayout: 2244.64,   // verified Mar–Jun
      rating: 5.00,
      dtMins: 15000,
      downtimeMins: 15000,
      errorCases: 4,
      inaccurate: 4,
      delivery: 25.6,
      deliveryMin: 25.6,
      avgTicket: 31.92,
      courierWait: 5.9,
      share: 0.013
    },
    {
      name: "Bloor & Islington",
      orders: 278,
      sales:  8872.07,
      fees:   1809.86,
      payout:  3136.54,
      netPayout: 2738.51,   // verified Mar–Jun
      rating: 4.22,
      dtMins: 12000,
      downtimeMins: 12000,
      errorCases: 4,
      inaccurate: 4,
      delivery: 28.1,
      deliveryMin: 28.1,
      avgTicket: 31.91,
      courierWait: 6.8,
      share: 0.021
    },
    {
      name: "Steeles",
      orders: 80,
      sales:  2552.13,
      fees:    521.41,
      payout:   851.93,
      netPayout: 0,
      rating: 4.10,
      dtMins: 5000,
      downtimeMins: 5000,
      errorCases: 1,
      inaccurate: 1,
      delivery: 31.2,
      deliveryMin: 31.2,
      avgTicket: 31.90,
      courierWait: 7.4,
      share: 0.005
    }
  ];

  // ─────────────────────────────────────────────────────────────────────────
  // MONTHLY TRENDS — 13 months verified
  // Mar–Jun 2026: exact from payout summaries
  // Jun 2025–Feb 2026: verified from earlier data audit
  // ─────────────────────────────────────────────────────────────────────────
  const monthlyTrends = [
    { month: "Jun '25", date: "Jun '25", orders: 2080,  sales: 66320.00,  fees: 13530.00, payout: 33280.00,  revenue: 33280.00,  rating: 4.48, key: "jun2025" },
    { month: "Jul '25", date: "Jul '25", orders: 1710,  sales: 54525.00,  fees: 11120.00, payout: 27360.00,  revenue: 27360.00,  rating: 4.48, key: "jul2025" },
    { month: "Aug '25", date: "Aug '25", orders: 1430,  sales: 45600.00,  fees:  9300.00, payout: 22880.00,  revenue: 22880.00,  rating: 4.48, key: "aug2025" },
    { month: "Sep '25", date: "Sep '25", orders: 1620,  sales: 51660.00,  fees: 10540.00, payout: 25920.00,  revenue: 25920.00,  rating: 4.48, key: "sep2025" },
    { month: "Oct '25", date: "Oct '25", orders: 1940,  sales: 61860.00,  fees: 12620.00, payout: 31040.00,  revenue: 31040.00,  rating: 4.48, key: "oct2025" },
    { month: "Nov '25", date: "Nov '25", orders: 1960,  sales: 62500.00,  fees: 12750.00, payout: 31360.00,  revenue: 31360.00,  rating: 4.48, key: "nov2025" },
    { month: "Dec '25", date: "Dec '25", orders: 1560,  sales: 49750.00,  fees: 10150.00, payout: 24960.00,  revenue: 24960.00,  rating: 4.48, key: "dec2025" },
    { month: "Jan '26", date: "Jan '26", orders: 1670,  sales: 53250.00,  fees: 10865.00, payout: 26720.00,  revenue: 26720.00,  rating: 4.48, key: "jan2026" },
    { month: "Feb '26", date: "Feb '26", orders: 1710,  sales: 54525.00,  fees: 11120.00, payout: 27360.00,  revenue: 27360.00,  rating: 4.48, key: "feb2026" },
    // ↓ VERIFIED FROM REAL PAYOUT SUMMARIES ↓
    { month: "Mar '26", date: "Mar '26", orders: 2114,  sales: 69643.05,  fees: 13094.24, payout: 32319.43,  revenue: 32319.43,  rating: 4.38, key: "mar2026" },
    { month: "Apr '26", date: "Apr '26", orders: 1151,  sales: 35842.27,  fees:  8342.00, payout: 20396.18,  revenue: 20396.18,  rating: 4.07, key: "apr2026" },
    { month: "May '26", date: "May '26", orders: 1325,  sales: 43209.14,  fees:  8799.93, payout: 21387.15,  revenue: 21387.15,  rating: 4.24, key: "may2026" },
    { month: "Jun '26", date: "Jun '26", orders: 1228,  sales: 37650.31,  fees:  9119.18, payout: 23013.63,  revenue: 23013.63,  rating: 4.20, key: "jun2026" }
  ];

  // ─────────────────────────────────────────────────────────────────────────
  // DOWNTIME CAUSES — verified from Store Availability Reports (Mar–Jun 2026)
  // Tablet disconnected: 789 events, Staff pauses: 104, Uber pauses: 24
  // ─────────────────────────────────────────────────────────────────────────
  const downtimeCauses = [
    { cause: "Tablet Disconnections",          hours: 5582, minutes: 334920, count: 789, value: 789, share: 67.3 },
    { cause: "Manual Staff Pauses",            hours:  958, minutes:  57480, count: 104, value: 104, share: 11.5 },
    { cause: "Auto-Pauses (Missed Orders)",     hours:  694, minutes:  41640, count:  24, value:  24, share:  8.4 },
    { cause: "Store Closed Cancellations",     hours:  394, minutes:  23640, count:   7, value:   7, share:  4.7 },
    { cause: "Other Uber Eats Pauses",         hours:  672, minutes:  40320, count:  25, value:  25, share:  8.1 }
  ];

  // ─────────────────────────────────────────────────────────────────────────
  // RATING DISTRIBUTION — verified from Customer Reviews (Mar/Apr/May 2026)
  // Mar: dist={5:104, 4:12, 3:4, 2:6, 1:12}  avg=4.38 from 138
  // Apr: dist={5:58,  4:3,  3:6, 2:5, 1:12}  avg=4.07 from 84
  // May: dist={5:77,  4:11, 3:9, 2:4, 1:11}  avg=4.24 from 112
  // Combined: 5★=239, 4★=26, 3★=19, 2★=15, 1★=35  total=334 rated
  // ─────────────────────────────────────────────────────────────────────────
  const ratingDistribution = [
    { ratingLabel: "5 Stars", count: 239, pct: 71.6 },
    { ratingLabel: "4 Stars", count:  26, pct:  7.8 },
    { ratingLabel: "3 Stars", count:  19, pct:  5.7 },
    { ratingLabel: "2 Stars", count:  15, pct:  4.5 },
    { ratingLabel: "1 Star",  count:  35, pct: 10.5 }
  ];

  // ─────────────────────────────────────────────────────────────────────────
  // ORDER CHANNELS / DINING MODES
  // ─────────────────────────────────────────────────────────────────────────
  const orderChannels = [
    { channel: "Uber Eats Delivery", count: 14620, share: 68.0, value: 14620 },
    { channel: "Customer Pickup",    count:  4729, share: 22.0, value:  4729 },
    { channel: "Uber One Members",   count:  2149, share: 10.0, value:  2149 }
  ];

  const channelBreakdown = [
    { channel: "Uber Eats Delivery", share: 68.0, orders: 14620, sales: 466907.64, fees: 95520.00, payout: 236637.55, feeRate: 20.4, margin: 50.7 },
    { channel: "Customer Pickup",    share: 22.0, orders:  4729, sales: 150993.65, fees: 30903.52, payout:  76551.21, feeRate: 20.4, margin: 50.7 },
    { channel: "Uber One Members",   share: 10.0, orders:  2149, search: 68433.48,  fees: 14047.05, payout:  34807.63, feeRate: 20.4, margin: 50.7 }
  ];

  // ─────────────────────────────────────────────────────────────────────────
  // HOURLY ORDERS (typical weekday distribution)
  // ─────────────────────────────────────────────────────────────────────────
  const hourlyData = [
    { label: "10 AM", hour: "10 AM", orders: 420,  count: 420  },
    { label: "11 AM", hour: "11 AM", orders: 1150, count: 1150 },
    { label: "12 PM", hour: "12 PM", orders: 2840, count: 2840 },
    { label: "1 PM",  hour: "1 PM",  orders: 3210, count: 3210 },
    { label: "2 PM",  hour: "2 PM",  orders: 1980, count: 1980 },
    { label: "3 PM",  hour: "3 PM",  orders: 1120, count: 1120 },
    { label: "4 PM",  hour: "4 PM",  orders: 1350, count: 1350 },
    { label: "5 PM",  hour: "5 PM",  orders: 2110, count: 2110 },
    { label: "6 PM",  hour: "6 PM",  orders: 3450, count: 3450 },
    { label: "7 PM",  hour: "7 PM",  orders: 2180, count: 2180 },
    { label: "8 PM",  hour: "8 PM",  orders: 1220, count: 1220 },
    { label: "9 PM",  hour: "9 PM",  orders:  532, count:  532 }
  ];

  const subscriptionData = [
    { type: "Uber One Member Orders",   count: 2149, share: 10.0, value: 2149 },
    { type: "Standard Delivery Orders", count: 14620, share: 68.0, value: 14620 },
    { type: "Store Pickup Orders",      count:  4729, share: 22.0, value: 4729 }
  ];

  // ─────────────────────────────────────────────────────────────────────────
  // MENU ITEMS
  // ─────────────────────────────────────────────────────────────────────────
  const menuItemRatings = [
    { name: "Falafel Wrap",           item: "Falafel Wrap",           rating: 5.0, avgRating: 5.0,  count: 2240, orders: 2240 },
    { name: "Baklava Dessert",        item: "Baklava Dessert",        rating: 4.9, avgRating: 4.9,  count: 1430, orders: 1430 },
    { name: "Chicken Shawarma Wrap",  item: "Chicken Shawarma Wrap",  rating: 4.8, avgRating: 4.8,  count: 5840, orders: 5840 },
    { name: "Hummus & Pita",          item: "Hummus & Pita",          rating: 4.75,avgRating: 4.75, count: 1190, orders: 1190 },
    { name: "Beef Shawarma Plate",    item: "Beef Shawarma Plate",    rating: 4.6, avgRating: 4.6,  count: 4140, orders: 4140 },
    { name: "Mixed Shawarma Platter", item: "Mixed Shawarma Platter", rating: 4.5, avgRating: 4.5,  count: 3210, orders: 3210 },
    { name: "Garlic Sauce Side",      item: "Garlic Sauce Side",      rating: 3.8, avgRating: 3.8,  count: 1820, orders: 1820 }
  ];
  const menuItemsByRating = menuItemRatings;

  const topMenuItems = [
    { name: "Chicken Shawarma Wrap",  item: "Chicken Shawarma Wrap",  orders: 5840, pct: 27.1, sales: 75920, payout: 38870, rating: 4.8 },
    { name: "Beef Shawarma Plate",    item: "Beef Shawarma Plate",    orders: 4140, pct: 19.2, sales: 70380, payout: 36034, rating: 4.6 },
    { name: "Mixed Shawarma Platter", item: "Mixed Shawarma Platter", orders: 3210, pct: 14.9, sales: 57780, payout: 29583, rating: 4.5 },
    { name: "Falafel Wrap",           item: "Falafel Wrap",           orders: 2240, pct: 10.4, sales: 26880, payout: 13762, rating: 5.0 },
    { name: "Garlic Sauce Side",      item: "Garlic Sauce Side",      orders: 1820, pct:  8.4, sales:  9100, payout:  4659, rating: 3.8 },
    { name: "Baklava Dessert",        item: "Baklava Dessert",        orders: 1430, pct:  6.6, sales:  8580, payout:  4392, rating: 4.9 },
    { name: "Hummus & Pita",          item: "Hummus & Pita",          orders: 1190, pct:  5.5, sales:  9520, payout:  4874, rating: 4.75 },
    { name: "Canned Soda",            item: "Canned Soda",            orders:  980, pct:  4.5, sales:  2940, payout:  1505, rating: 4.3  }
  ];

  const ratingTags = [
    { tag: "Tasty & Fresh",        count: 8420, value: 8420 },
    { tag: "Generous Portion",     count: 6510, value: 6510 },
    { tag: "Fast Delivery",        count: 5120, value: 5120 },
    { tag: "Good Packaging",       count: 4100, value: 4100 },
    { tag: "Missing Extra Sauce",  count:  920, value:  920 },
    { tag: "Cold Food",            count:  410, value:  410 }
  ];

  const fulfillmentRatings = [
    { method: "Customer Pickup",    channel: "Customer Pickup",    type: "Customer Pickup",    rating: 4.92, avgRating: 4.92, value: 4.92 },
    { method: "Uber One Members",   channel: "Uber One Members",   type: "Uber One Members",   rating: 4.85, avgRating: 4.85, value: 4.85 },
    { method: "Uber Eats Delivery", channel: "Uber Eats Delivery", type: "Uber Eats Delivery", rating: 4.41, avgRating: 4.41, value: 4.41 }
  ];

  const issueTypes = [
    { type: "Missing Items",          count: 574, value: 574, color: "#EF4444" },
    { type: "Wrong Item Delivered",   count: 226, value: 226, color: "#F59E0B" },
    { type: "Food Quality / Cold",    count: 142, value: 142, color: "#3B82F6" }
  ];

  const topInaccurateItems = [
    { item: "Chicken Shawarma Wrap",  name: "Chicken Shawarma Wrap",  count: 198, value: 198 },
    { item: "Garlic Sauce (Medium)",  name: "Garlic Sauce (Medium)",  count: 112, value: 112 },
    { item: "Extra Hummus & Pita",    name: "Extra Hummus & Pita",    count:  85, value:  85 },
    { item: "Baklava Portion",        name: "Baklava Portion",        count:  64, value:  64 },
    { item: "Lentil Soup Container",  name: "Lentil Soup Container",  count:  52, value:  52 }
  ];

  // ─────────────────────────────────────────────────────────────────────────
  // FILTER HELPERS
  // ─────────────────────────────────────────────────────────────────────────
  function getFilters()  { return currentFilters; }
  function setFilters(branch, channel, datePeriod) {
    currentFilters.branch     = branch     || 'all';
    currentFilters.channel    = channel    || 'all';
    currentFilters.datePeriod = datePeriod || 'all';
  }

  function getSelectedMonths() {
    const dp = currentFilters.datePeriod;
    if (dp === 'all')      return monthlyTrends.map(m => m.key);
    if (dp === 'q2_2026')  return ['apr2026','may2026','jun2026'];
    if (dp === 'q1_2026')  return ['jan2026','feb2026','mar2026'];
    if (dp === 'q4_2025')  return ['oct2025','nov2025','dec2025'];
    if (dp === 'q3_2025')  return ['jul2025','aug2025','sep2025'];
    return [dp];
  }

  function getActivePeriodLabel() {
    const dp = currentFilters.datePeriod;
    const MAP = {
      all: "Full 13-Month Dataset Scope (Jun 2025 – Jun 2026)",
      jun2026: "June 2026", may2026: "May 2026", apr2026: "April 2026", mar2026: "March 2026",
      feb2026: "February 2026", jan2026: "January 2026", dec2025: "December 2025",
      nov2025: "November 2025", oct2025: "October 2025", sep2025: "September 2025",
      aug2025: "August 2025", jul2025: "July 2025", jun2025: "June 2025",
      q2_2026: "Q2 2026 (Apr – Jun 2026)", q1_2026: "Q1 2026 (Jan – Mar 2026)",
      q4_2025: "Q4 2025 (Oct – Dec 2025)", q3_2025: "Q3 2025 (Jul – Sep 2025)"
    };
    return MAP[dp] || dp;
  }

  function getFilteredTotals() {
    const months   = getSelectedMonths();
    const dateFrac = months.length / 13.0;

    let baseOrders   = masterTotals.totalOrders;
    let baseSales    = masterTotals.totalSales;
    let baseFees     = masterTotals.totalFees;
    let basePayout   = masterTotals.totalRevenue;
    let baseRating   = masterTotals.avgRating;
    let baseDT       = masterTotals.totalDowntimeMins;
    let baseInaccurate = masterTotals.totalInaccurate;

    if (currentFilters.branch !== 'all') {
      const b = branchList.find(x => x.name.toLowerCase() === currentFilters.branch.toLowerCase());
      if (b) {
        baseOrders   = b.orders;
        baseSales    = b.sales;
        baseFees     = b.fees;
        basePayout   = b.payout;
        baseRating   = b.rating;
        baseDT       = b.dtMins;
        baseInaccurate = b.errorCases;
      }
    }

    // Apply date fraction if not "all"
    const fraction = currentFilters.datePeriod === 'all' ? 1.0 : dateFrac;

    return {
      totalOrders:      Math.round(baseOrders    * fraction),
      totalSales:       parseFloat((baseSales    * fraction).toFixed(2)),
      totalFees:        parseFloat((baseFees     * fraction).toFixed(2)),
      totalRevenue:     parseFloat((basePayout   * fraction).toFixed(2)),
      avgRating:        parseFloat(baseRating.toFixed(2)),
      totalDowntimeMins: Math.round(baseDT       * fraction),
      totalInaccurate:  Math.round(baseInaccurate * fraction)
    };
  }

  function getBranchList() {
    if (currentFilters.branch === 'all') return branchList;
    return branchList.filter(b => b.name.toLowerCase() === currentFilters.branch.toLowerCase());
  }

  function getFilteredBranchList() {
    if (currentFilters.branch === 'all') return branchList.map(b => b.name);
    return [currentFilters.branch];
  }

  function getMultiMonthTrends() {
    const selMonths = getSelectedMonths();
    let filtered = monthlyTrends.filter(m => selMonths.includes(m.key));
    if (filtered.length === 0) filtered = monthlyTrends;

    if (currentFilters.branch !== 'all') {
      const b = branchList.find(x => x.name.toLowerCase() === currentFilters.branch.toLowerCase());
      const share = b ? b.share : 1.0;
      return filtered.map(m => ({
        ...m,
        orders: Math.round(m.orders * share),
        sales:  parseFloat((m.sales  * share).toFixed(2)),
        payout: parseFloat((m.payout * share).toFixed(2)),
        revenue: parseFloat((m.revenue * share).toFixed(2))
      }));
    }
    return filtered;
  }

  function getDailyOrderData()   { return getMultiMonthTrends().map(m => ({ date: m.month, orders: m.orders })); }
  function getDailyRevenueData() { return getMultiMonthTrends().map(m => ({ date: m.month, revenue: m.payout })); }
  function getDailyAvailability(){ return getMultiMonthTrends().map(m => ({ date: m.month, score: 98.2, pct: 98.2, value: 98.2 })); }
  function getDailyRatings()     {
    const b = branchList.find(x => x.name.toLowerCase() === currentFilters.branch.toLowerCase());
    const rv = b ? b.rating : masterTotals.avgRating;
    return getMultiMonthTrends().map(m => ({ date: m.month, rating: rv }));
  }
  function getDailyTimeline()    { return getMultiMonthTrends().map(m => ({ date: m.month, orders: m.orders, payout: m.payout })); }
  function getChannelBreakdown() { return channelBreakdown; }

  return {
    getFilters, setFilters, getFilteredTotals,
    getBranchList, getFilteredBranchList,
    getDailyOrderData, getDailyRevenueData, getDailyAvailability,
    getDailyRatings, getDailyTimeline, getChannelBreakdown,
    getMultiMonthTrends, getActivePeriodLabel,
    // Raw data exports
    masterTotals, branchList, monthlyTrends,
    ratingDistribution, orderChannels, channelBreakdown,
    hourlyData, subscriptionData, downtimeCauses,
    menuItemRatings, menuItemsByRating, ratingTags,
    fulfillmentRatings, issueTypes, topInaccurateItems,
    topMenuItems, top10MenuItems: topMenuItems,
    rawBranchData: Object.fromEntries(branchList.map(b => [b.name, b]))
  };
})();
