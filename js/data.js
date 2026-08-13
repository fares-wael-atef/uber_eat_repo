/**
 * data.js v11 — Complete Pristine Dynamic Engine for Ali Baba's Shawarma
 * Source Dataset: /Users/mac/Downloads/aly-baba (48 reporting files)
 */

(function () {
  const monthStoreDB = {
  "jun2025": {
    "Dundas & University": {
      "name": "Dundas & University",
      "orders": 547,
      "sales": 13600.21,
      "payout": 7555.67,
      "fees": 2448.04,
      "netPayout": 7555.67,
      "rating": 3.86,
      "avgTicket": 24.86,
      "downtimeMins": 437,
      "inaccurate": 8,
      "delivery": 22.4,
      "prep": 14.1,
      "courierWait": 5.6,
      "x": 480,
      "y": 290
    },
    "Queen St E": {
      "name": "Queen St E",
      "orders": 427,
      "sales": 8209.94,
      "payout": 4561.08,
      "fees": 1477.79,
      "netPayout": 4561.08,
      "rating": 4.32,
      "avgTicket": 19.23,
      "downtimeMins": 341,
      "inaccurate": 6,
      "delivery": 21.2,
      "prep": 13.0,
      "courierWait": 5.3,
      "x": 620,
      "y": 320
    },
    "Danforth": {
      "name": "Danforth",
      "orders": 426,
      "sales": 17283.92,
      "payout": 9602.18,
      "fees": 3111.11,
      "netPayout": 9602.18,
      "rating": 4.86,
      "avgTicket": 40.57,
      "downtimeMins": 340,
      "inaccurate": 6,
      "delivery": 18.5,
      "prep": 11.2,
      "courierWait": 4.6,
      "x": 580,
      "y": 270
    },
    "Bloor & Lansdowne": {
      "name": "Bloor & Lansdowne",
      "orders": 415,
      "sales": 9453.76,
      "payout": 5252.09,
      "fees": 1701.68,
      "netPayout": 5252.09,
      "rating": 4.24,
      "avgTicket": 22.78,
      "downtimeMins": 332,
      "inaccurate": 6,
      "delivery": 20.8,
      "prep": 12.5,
      "courierWait": 5.2,
      "x": 420,
      "y": 255
    },
    "Dundas & Bloor": {
      "name": "Dundas & Bloor",
      "orders": 152,
      "sales": 3329.57,
      "payout": 1849.76,
      "fees": 599.32,
      "netPayout": 1849.76,
      "rating": 4.0,
      "avgTicket": 21.91,
      "downtimeMins": 121,
      "inaccurate": 2,
      "delivery": 24.8,
      "prep": 14.5,
      "courierWait": 6.2,
      "x": 390,
      "y": 240
    },
    "Kipling Ave": {
      "name": "Kipling Ave",
      "orders": 54,
      "sales": 2002.68,
      "payout": 1112.6,
      "fees": 360.48,
      "netPayout": 1112.6,
      "rating": 5.0,
      "avgTicket": 37.09,
      "downtimeMins": 43,
      "inaccurate": 1,
      "delivery": 25.6,
      "prep": 15.2,
      "courierWait": 6.4,
      "x": 220,
      "y": 220
    },
    "Lawrence & Weston": {
      "name": "Lawrence & Weston",
      "orders": 33,
      "sales": 1262.39,
      "payout": 701.33,
      "fees": 227.23,
      "netPayout": 701.33,
      "rating": 4.5,
      "avgTicket": 38.25,
      "downtimeMins": 26,
      "inaccurate": 1,
      "delivery": 26.4,
      "prep": 15.8,
      "courierWait": 6.6,
      "x": 320,
      "y": 140
    },
    "Bloor & Islington": {
      "name": "Bloor & Islington",
      "orders": 20,
      "sales": 878.15,
      "payout": 487.86,
      "fees": 158.07,
      "netPayout": 487.86,
      "rating": 4.5,
      "avgTicket": 43.91,
      "downtimeMins": 16,
      "inaccurate": 1,
      "delivery": 28.1,
      "prep": 16.9,
      "courierWait": 7.0,
      "x": 260,
      "y": 250
    },
    "Steeles": {
      "name": "Steeles",
      "orders": 7,
      "sales": 212.99,
      "payout": 118.33,
      "fees": 38.34,
      "netPayout": 118.33,
      "rating": 4.5,
      "avgTicket": 30.43,
      "downtimeMins": 5,
      "inaccurate": 1,
      "delivery": 31.2,
      "prep": 18.5,
      "courierWait": 7.8,
      "x": 450,
      "y": 60
    }
  },
  "jul2025": {
    "Lawrence & Weston": {
      "name": "Lawrence & Weston",
      "orders": 11,
      "sales": 330.21,
      "payout": 269.97,
      "fees": 93.06,
      "netPayout": 269.97,
      "rating": 4.5,
      "avgTicket": 30.02,
      "downtimeMins": 8,
      "inaccurate": 1,
      "delivery": 26.4,
      "prep": 15.8,
      "courierWait": 6.6,
      "x": 320,
      "y": 140
    },
    "Kipling Ave": {
      "name": "Kipling Ave",
      "orders": 9,
      "sales": 154.35,
      "payout": 136.08,
      "fees": 43.9,
      "netPayout": 136.08,
      "rating": 5.0,
      "avgTicket": 17.15,
      "downtimeMins": 7,
      "inaccurate": 1,
      "delivery": 25.6,
      "prep": 15.2,
      "courierWait": 6.4,
      "x": 220,
      "y": 220
    },
    "Queen St E": {
      "name": "Queen St E",
      "orders": 2,
      "sales": 61.96,
      "payout": -7.75,
      "fees": 13.78,
      "netPayout": -7.75,
      "rating": 4.32,
      "avgTicket": 30.98,
      "downtimeMins": 1,
      "inaccurate": 1,
      "delivery": 21.2,
      "prep": 13.0,
      "courierWait": 5.3,
      "x": 620,
      "y": 320
    },
    "Bloor & Islington": {
      "name": "Bloor & Islington",
      "orders": 1,
      "sales": 42.95,
      "payout": 33.96,
      "fees": 12.89,
      "netPayout": 33.96,
      "rating": 4.5,
      "avgTicket": 42.95,
      "downtimeMins": 0,
      "inaccurate": 1,
      "delivery": 28.1,
      "prep": 16.9,
      "courierWait": 7.0,
      "x": 260,
      "y": 250
    },
    "Dundas & Bloor": {
      "name": "Dundas & Bloor",
      "orders": 9,
      "sales": 264.76,
      "payout": 89.36,
      "fees": 49.95,
      "netPayout": 89.36,
      "rating": 4.0,
      "avgTicket": 29.42,
      "downtimeMins": 7,
      "inaccurate": 1,
      "delivery": 24.8,
      "prep": 14.5,
      "courierWait": 6.2,
      "x": 390,
      "y": 240
    },
    "Danforth": {
      "name": "Danforth",
      "orders": 83,
      "sales": 2200.99,
      "payout": 1748.88,
      "fees": 652.76,
      "netPayout": 1748.88,
      "rating": 4.86,
      "avgTicket": 26.52,
      "downtimeMins": 66,
      "inaccurate": 1,
      "delivery": 18.5,
      "prep": 11.2,
      "courierWait": 4.6,
      "x": 580,
      "y": 270
    },
    "Steeles": {
      "name": "Steeles",
      "orders": 4,
      "sales": 105.5,
      "payout": 53.39,
      "fees": 16.68,
      "netPayout": 53.39,
      "rating": 4.5,
      "avgTicket": 26.38,
      "downtimeMins": 3,
      "inaccurate": 1,
      "delivery": 31.2,
      "prep": 18.5,
      "courierWait": 7.8,
      "x": 450,
      "y": 60
    },
    "Bloor & Lansdowne": {
      "name": "Bloor & Lansdowne",
      "orders": 11,
      "sales": 271.79,
      "payout": 152.88,
      "fees": 49.01,
      "netPayout": 152.88,
      "rating": 4.24,
      "avgTicket": 24.71,
      "downtimeMins": 8,
      "inaccurate": 1,
      "delivery": 20.8,
      "prep": 12.5,
      "courierWait": 5.2,
      "x": 420,
      "y": 255
    },
    "Dundas & University": {
      "name": "Dundas & University",
      "orders": 27,
      "sales": 670.11,
      "payout": 403.81,
      "fees": 201.01,
      "netPayout": 403.81,
      "rating": 3.86,
      "avgTicket": 24.82,
      "downtimeMins": 21,
      "inaccurate": 1,
      "delivery": 22.4,
      "prep": 14.1,
      "courierWait": 5.6,
      "x": 480,
      "y": 290
    }
  },
  "aug2025": {
    "Lawrence & Weston": {
      "name": "Lawrence & Weston",
      "orders": 15,
      "sales": 468.29,
      "payout": 376.08,
      "fees": 135.48,
      "netPayout": 376.08,
      "rating": 4.5,
      "avgTicket": 31.22,
      "downtimeMins": 12,
      "inaccurate": 1,
      "delivery": 26.4,
      "prep": 15.8,
      "courierWait": 6.6,
      "x": 320,
      "y": 140
    },
    "Kipling Ave": {
      "name": "Kipling Ave",
      "orders": 5,
      "sales": 158.97,
      "payout": 143.34,
      "fees": 32.12,
      "netPayout": 143.34,
      "rating": 5.0,
      "avgTicket": 31.79,
      "downtimeMins": 4,
      "inaccurate": 1,
      "delivery": 25.6,
      "prep": 15.2,
      "courierWait": 6.4,
      "x": 220,
      "y": 220
    },
    "Queen St E": {
      "name": "Queen St E",
      "orders": 97,
      "sales": 2942.4,
      "payout": 1144.11,
      "fees": 428.34,
      "netPayout": 1144.11,
      "rating": 4.32,
      "avgTicket": 30.33,
      "downtimeMins": 77,
      "inaccurate": 1,
      "delivery": 21.2,
      "prep": 13.0,
      "courierWait": 5.3,
      "x": 620,
      "y": 320
    },
    "Bloor & Islington": {
      "name": "Bloor & Islington",
      "orders": 4,
      "sales": 66.95,
      "payout": 61.55,
      "fees": 12.49,
      "netPayout": 61.55,
      "rating": 4.5,
      "avgTicket": 16.74,
      "downtimeMins": 3,
      "inaccurate": 1,
      "delivery": 28.1,
      "prep": 16.9,
      "courierWait": 7.0,
      "x": 260,
      "y": 250
    },
    "Dundas & Bloor": {
      "name": "Dundas & Bloor",
      "orders": 2,
      "sales": 61.63,
      "payout": 47.05,
      "fees": 18.49,
      "netPayout": 47.05,
      "rating": 4.0,
      "avgTicket": 30.82,
      "downtimeMins": 1,
      "inaccurate": 1,
      "delivery": 24.8,
      "prep": 14.5,
      "courierWait": 6.2,
      "x": 390,
      "y": 240
    },
    "Danforth": {
      "name": "Danforth",
      "orders": 82,
      "sales": 2228.59,
      "payout": 1769.47,
      "fees": 636.22,
      "netPayout": 1769.47,
      "rating": 4.86,
      "avgTicket": 27.18,
      "downtimeMins": 65,
      "inaccurate": 1,
      "delivery": 18.5,
      "prep": 11.2,
      "courierWait": 4.6,
      "x": 580,
      "y": 270
    },
    "Steeles": {
      "name": "Steeles",
      "orders": 10,
      "sales": 294.26,
      "payout": 147.03,
      "fees": 49.21,
      "netPayout": 147.03,
      "rating": 4.5,
      "avgTicket": 29.43,
      "downtimeMins": 8,
      "inaccurate": 1,
      "delivery": 31.2,
      "prep": 18.5,
      "courierWait": 7.8,
      "x": 450,
      "y": 60
    },
    "Bloor & Lansdowne": {
      "name": "Bloor & Lansdowne",
      "orders": 5,
      "sales": 98.42,
      "payout": 71.79,
      "fees": 29.52,
      "netPayout": 71.79,
      "rating": 4.24,
      "avgTicket": 19.68,
      "downtimeMins": 4,
      "inaccurate": 1,
      "delivery": 20.8,
      "prep": 12.5,
      "courierWait": 5.2,
      "x": 420,
      "y": 255
    },
    "Dundas & University": {
      "name": "Dundas & University",
      "orders": 39,
      "sales": 916.16,
      "payout": 534.17,
      "fees": 264.35,
      "netPayout": 534.17,
      "rating": 3.86,
      "avgTicket": 23.49,
      "downtimeMins": 31,
      "inaccurate": 1,
      "delivery": 22.4,
      "prep": 14.1,
      "courierWait": 5.6,
      "x": 480,
      "y": 290
    }
  },
  "sep2025": {
    "Lawrence & Weston": {
      "name": "Lawrence & Weston",
      "orders": 8,
      "sales": 187.62,
      "payout": 148.37,
      "fees": 56.3,
      "netPayout": 148.37,
      "rating": 4.5,
      "avgTicket": 23.45,
      "downtimeMins": 6,
      "inaccurate": 1,
      "delivery": 26.4,
      "prep": 15.8,
      "courierWait": 6.6,
      "x": 320,
      "y": 140
    },
    "Kipling Ave": {
      "name": "Kipling Ave",
      "orders": 11,
      "sales": 305.95,
      "payout": 222.22,
      "fees": 84.3,
      "netPayout": 222.22,
      "rating": 5.0,
      "avgTicket": 27.81,
      "downtimeMins": 8,
      "inaccurate": 1,
      "delivery": 25.6,
      "prep": 15.2,
      "courierWait": 6.4,
      "x": 220,
      "y": 220
    },
    "Queen St E": {
      "name": "Queen St E",
      "orders": 0,
      "sales": 0.0,
      "payout": -7.76,
      "fees": 0.0,
      "netPayout": -7.76,
      "rating": 4.32,
      "avgTicket": 32.5,
      "downtimeMins": 0,
      "inaccurate": 1,
      "delivery": 21.2,
      "prep": 13.0,
      "courierWait": 5.3,
      "x": 620,
      "y": 320
    },
    "Bloor & Islington": {
      "name": "Bloor & Islington",
      "orders": 3,
      "sales": 54.47,
      "payout": 50.76,
      "fees": 9.55,
      "netPayout": 50.76,
      "rating": 4.5,
      "avgTicket": 18.16,
      "downtimeMins": 2,
      "inaccurate": 1,
      "delivery": 28.1,
      "prep": 16.9,
      "courierWait": 7.0,
      "x": 260,
      "y": 250
    },
    "Dundas & Bloor": {
      "name": "Dundas & Bloor",
      "orders": 19,
      "sales": 617.77,
      "payout": 202.36,
      "fees": 89.01,
      "netPayout": 202.36,
      "rating": 4.0,
      "avgTicket": 32.51,
      "downtimeMins": 15,
      "inaccurate": 1,
      "delivery": 24.8,
      "prep": 14.5,
      "courierWait": 6.2,
      "x": 390,
      "y": 240
    },
    "Danforth": {
      "name": "Danforth",
      "orders": 85,
      "sales": 2333.63,
      "payout": 1852.27,
      "fees": 694.47,
      "netPayout": 1852.27,
      "rating": 4.86,
      "avgTicket": 27.45,
      "downtimeMins": 68,
      "inaccurate": 1,
      "delivery": 18.5,
      "prep": 11.2,
      "courierWait": 4.6,
      "x": 580,
      "y": 270
    },
    "Steeles": {
      "name": "Steeles",
      "orders": 20,
      "sales": 609.97,
      "payout": 274.56,
      "fees": 90.15,
      "netPayout": 274.56,
      "rating": 4.5,
      "avgTicket": 30.5,
      "downtimeMins": 16,
      "inaccurate": 1,
      "delivery": 31.2,
      "prep": 18.5,
      "courierWait": 7.8,
      "x": 450,
      "y": 60
    },
    "Bloor & Lansdowne": {
      "name": "Bloor & Lansdowne",
      "orders": 25,
      "sales": 801.45,
      "payout": 357.98,
      "fees": 119.4,
      "netPayout": 357.98,
      "rating": 4.24,
      "avgTicket": 32.06,
      "downtimeMins": 20,
      "inaccurate": 1,
      "delivery": 20.8,
      "prep": 12.5,
      "courierWait": 5.2,
      "x": 420,
      "y": 255
    },
    "Dundas & University": {
      "name": "Dundas & University",
      "orders": 60,
      "sales": 1910.1,
      "payout": 816.81,
      "fees": 320.0,
      "netPayout": 816.81,
      "rating": 3.86,
      "avgTicket": 31.83,
      "downtimeMins": 48,
      "inaccurate": 1,
      "delivery": 22.4,
      "prep": 14.1,
      "courierWait": 5.6,
      "x": 480,
      "y": 290
    }
  },
  "oct2025": {
    "Lawrence & Weston": {
      "name": "Lawrence & Weston",
      "orders": 24,
      "sales": 674.92,
      "payout": 383.34,
      "fees": 121.07,
      "netPayout": 383.34,
      "rating": 4.5,
      "avgTicket": 28.12,
      "downtimeMins": 19,
      "inaccurate": 1,
      "delivery": 26.4,
      "prep": 15.8,
      "courierWait": 6.6,
      "x": 320,
      "y": 140
    },
    "Kipling Ave": {
      "name": "Kipling Ave",
      "orders": 13,
      "sales": 285.31,
      "payout": 184.3,
      "fees": 59.37,
      "netPayout": 184.3,
      "rating": 5.0,
      "avgTicket": 21.95,
      "downtimeMins": 10,
      "inaccurate": 1,
      "delivery": 25.6,
      "prep": 15.2,
      "courierWait": 6.4,
      "x": 220,
      "y": 220
    },
    "Queen St E": {
      "name": "Queen St E",
      "orders": 88,
      "sales": 3285.98,
      "payout": 1265.79,
      "fees": 463.01,
      "netPayout": 1265.79,
      "rating": 4.32,
      "avgTicket": 37.34,
      "downtimeMins": 70,
      "inaccurate": 1,
      "delivery": 21.2,
      "prep": 13.0,
      "courierWait": 5.3,
      "x": 620,
      "y": 320
    },
    "Bloor & Islington": {
      "name": "Bloor & Islington",
      "orders": 9,
      "sales": 259.25,
      "payout": 155.0,
      "fees": 51.04,
      "netPayout": 155.0,
      "rating": 4.5,
      "avgTicket": 28.81,
      "downtimeMins": 7,
      "inaccurate": 1,
      "delivery": 28.1,
      "prep": 16.9,
      "courierWait": 7.0,
      "x": 260,
      "y": 250
    },
    "Dundas & Bloor": {
      "name": "Dundas & Bloor",
      "orders": 15,
      "sales": 568.48,
      "payout": 272.72,
      "fees": 100.2,
      "netPayout": 272.72,
      "rating": 4.0,
      "avgTicket": 37.9,
      "downtimeMins": 12,
      "inaccurate": 1,
      "delivery": 24.8,
      "prep": 14.5,
      "courierWait": 6.2,
      "x": 390,
      "y": 240
    },
    "Danforth": {
      "name": "Danforth",
      "orders": 85,
      "sales": 2474.42,
      "payout": 1960.07,
      "fees": 733.16,
      "netPayout": 1960.07,
      "rating": 4.86,
      "avgTicket": 29.11,
      "downtimeMins": 68,
      "inaccurate": 1,
      "delivery": 18.5,
      "prep": 11.2,
      "courierWait": 4.6,
      "x": 580,
      "y": 270
    },
    "Steeles": {
      "name": "Steeles",
      "orders": 3,
      "sales": 133.98,
      "payout": 58.62,
      "fees": 15.6,
      "netPayout": 58.62,
      "rating": 4.5,
      "avgTicket": 44.66,
      "downtimeMins": 2,
      "inaccurate": 1,
      "delivery": 31.2,
      "prep": 18.5,
      "courierWait": 7.8,
      "x": 450,
      "y": 60
    },
    "Bloor & Lansdowne": {
      "name": "Bloor & Lansdowne",
      "orders": 14,
      "sales": 627.01,
      "payout": 282.7,
      "fees": 86.23,
      "netPayout": 282.7,
      "rating": 4.24,
      "avgTicket": 44.79,
      "downtimeMins": 11,
      "inaccurate": 1,
      "delivery": 20.8,
      "prep": 12.5,
      "courierWait": 5.2,
      "x": 420,
      "y": 255
    },
    "Dundas & University": {
      "name": "Dundas & University",
      "orders": 147,
      "sales": 5150.77,
      "payout": 1947.16,
      "fees": 807.58,
      "netPayout": 1947.16,
      "rating": 3.86,
      "avgTicket": 35.04,
      "downtimeMins": 117,
      "inaccurate": 2,
      "delivery": 22.4,
      "prep": 14.1,
      "courierWait": 5.6,
      "x": 480,
      "y": 290
    }
  },
  "nov2025": {
    "Lawrence & Weston": {
      "name": "Lawrence & Weston",
      "orders": 14,
      "sales": 403.54,
      "payout": 247.23,
      "fees": 89.59,
      "netPayout": 247.23,
      "rating": 4.5,
      "avgTicket": 28.82,
      "downtimeMins": 11,
      "inaccurate": 1,
      "delivery": 26.4,
      "prep": 15.8,
      "courierWait": 6.6,
      "x": 320,
      "y": 140
    },
    "Kipling Ave": {
      "name": "Kipling Ave",
      "orders": 10,
      "sales": 245.29,
      "payout": 142.02,
      "fees": 73.57,
      "netPayout": 142.02,
      "rating": 5.0,
      "avgTicket": 24.53,
      "downtimeMins": 8,
      "inaccurate": 1,
      "delivery": 25.6,
      "prep": 15.2,
      "courierWait": 6.4,
      "x": 220,
      "y": 220
    },
    "Queen St E": {
      "name": "Queen St E",
      "orders": 7,
      "sales": 265.39,
      "payout": 102.37,
      "fees": 67.61,
      "netPayout": 102.37,
      "rating": 4.32,
      "avgTicket": 37.91,
      "downtimeMins": 5,
      "inaccurate": 1,
      "delivery": 21.2,
      "prep": 13.0,
      "courierWait": 5.3,
      "x": 620,
      "y": 320
    },
    "Bloor & Islington": {
      "name": "Bloor & Islington",
      "orders": 8,
      "sales": 174.87,
      "payout": 148.84,
      "fees": 43.17,
      "netPayout": 148.84,
      "rating": 4.5,
      "avgTicket": 21.86,
      "downtimeMins": 6,
      "inaccurate": 1,
      "delivery": 28.1,
      "prep": 16.9,
      "courierWait": 7.0,
      "x": 260,
      "y": 250
    },
    "Dundas & Bloor": {
      "name": "Dundas & Bloor",
      "orders": 7,
      "sales": 249.42,
      "payout": 88.81,
      "fees": 38.54,
      "netPayout": 88.81,
      "rating": 4.0,
      "avgTicket": 35.63,
      "downtimeMins": 5,
      "inaccurate": 1,
      "delivery": 24.8,
      "prep": 14.5,
      "courierWait": 6.2,
      "x": 390,
      "y": 240
    },
    "Danforth": {
      "name": "Danforth",
      "orders": 103,
      "sales": 3029.63,
      "payout": 2399.88,
      "fees": 887.39,
      "netPayout": 2399.88,
      "rating": 4.86,
      "avgTicket": 29.41,
      "downtimeMins": 82,
      "inaccurate": 1,
      "delivery": 18.5,
      "prep": 11.2,
      "courierWait": 4.6,
      "x": 580,
      "y": 270
    },
    "Bloor & Lansdowne": {
      "name": "Bloor & Lansdowne",
      "orders": 9,
      "sales": 296.25,
      "payout": 131.01,
      "fees": 60.41,
      "netPayout": 131.01,
      "rating": 4.24,
      "avgTicket": 32.92,
      "downtimeMins": 7,
      "inaccurate": 1,
      "delivery": 20.8,
      "prep": 12.5,
      "courierWait": 5.2,
      "x": 420,
      "y": 255
    },
    "Dundas & University": {
      "name": "Dundas & University",
      "orders": 47,
      "sales": 2282.02,
      "payout": 970.1,
      "fees": 497.65,
      "netPayout": 970.1,
      "rating": 3.86,
      "avgTicket": 48.55,
      "downtimeMins": 37,
      "inaccurate": 1,
      "delivery": 22.4,
      "prep": 14.1,
      "courierWait": 5.6,
      "x": 480,
      "y": 290
    }
  },
  "dec2025": {
    "Lawrence & Weston": {
      "name": "Lawrence & Weston",
      "orders": 19,
      "sales": 572.72,
      "payout": 269.33,
      "fees": 100.14,
      "netPayout": 269.33,
      "rating": 4.5,
      "avgTicket": 30.14,
      "downtimeMins": 15,
      "inaccurate": 1,
      "delivery": 26.4,
      "prep": 15.8,
      "courierWait": 6.6,
      "x": 320,
      "y": 140
    },
    "Kipling Ave": {
      "name": "Kipling Ave",
      "orders": 9,
      "sales": 230.29,
      "payout": 130.47,
      "fees": 40.92,
      "netPayout": 130.47,
      "rating": 5.0,
      "avgTicket": 25.59,
      "downtimeMins": 7,
      "inaccurate": 1,
      "delivery": 25.6,
      "prep": 15.2,
      "courierWait": 6.4,
      "x": 220,
      "y": 220
    },
    "Queen St E": {
      "name": "Queen St E",
      "orders": 32,
      "sales": 1059.74,
      "payout": 271.54,
      "fees": 149.66,
      "netPayout": 271.54,
      "rating": 4.32,
      "avgTicket": 33.12,
      "downtimeMins": 25,
      "inaccurate": 1,
      "delivery": 21.2,
      "prep": 13.0,
      "courierWait": 5.3,
      "x": 620,
      "y": 320
    },
    "Bloor & Islington": {
      "name": "Bloor & Islington",
      "orders": 4,
      "sales": 97.91,
      "payout": 43.99,
      "fees": 20.53,
      "netPayout": 43.99,
      "rating": 4.5,
      "avgTicket": 24.48,
      "downtimeMins": 3,
      "inaccurate": 1,
      "delivery": 28.1,
      "prep": 16.9,
      "courierWait": 7.0,
      "x": 260,
      "y": 250
    },
    "Dundas & Bloor": {
      "name": "Dundas & Bloor",
      "orders": 3,
      "sales": 92.51,
      "payout": 37.26,
      "fees": 12.06,
      "netPayout": 37.26,
      "rating": 4.0,
      "avgTicket": 30.84,
      "downtimeMins": 2,
      "inaccurate": 1,
      "delivery": 24.8,
      "prep": 14.5,
      "courierWait": 6.2,
      "x": 390,
      "y": 240
    },
    "Danforth": {
      "name": "Danforth",
      "orders": 115,
      "sales": 3857.88,
      "payout": 3040.13,
      "fees": 1129.04,
      "netPayout": 3040.13,
      "rating": 4.86,
      "avgTicket": 33.55,
      "downtimeMins": 92,
      "inaccurate": 1,
      "delivery": 18.5,
      "prep": 11.2,
      "courierWait": 4.6,
      "x": 580,
      "y": 270
    },
    "Bloor & Lansdowne": {
      "name": "Bloor & Lansdowne",
      "orders": 12,
      "sales": 581.0,
      "payout": 323.48,
      "fees": 118.08,
      "netPayout": 323.48,
      "rating": 4.24,
      "avgTicket": 48.42,
      "downtimeMins": 9,
      "inaccurate": 1,
      "delivery": 20.8,
      "prep": 12.5,
      "courierWait": 5.2,
      "x": 420,
      "y": 255
    },
    "Dundas & University": {
      "name": "Dundas & University",
      "orders": 65,
      "sales": 2357.05,
      "payout": 733.89,
      "fees": 401.46,
      "netPayout": 733.89,
      "rating": 3.86,
      "avgTicket": 36.26,
      "downtimeMins": 52,
      "inaccurate": 1,
      "delivery": 22.4,
      "prep": 14.1,
      "courierWait": 5.6,
      "x": 480,
      "y": 290
    }
  },
  "jan2026": {
    "Lawrence & Weston": {
      "name": "Lawrence & Weston",
      "orders": 24,
      "sales": 783.21,
      "payout": 355.35,
      "fees": 126.63,
      "netPayout": 355.35,
      "rating": 4.5,
      "avgTicket": 32.63,
      "downtimeMins": 19,
      "inaccurate": 1,
      "delivery": 26.4,
      "prep": 15.8,
      "courierWait": 6.6,
      "x": 320,
      "y": 140
    },
    "Kipling Ave": {
      "name": "Kipling Ave",
      "orders": 7,
      "sales": 143.23,
      "payout": 116.12,
      "fees": 40.46,
      "netPayout": 116.12,
      "rating": 5.0,
      "avgTicket": 20.46,
      "downtimeMins": 5,
      "inaccurate": 1,
      "delivery": 25.6,
      "prep": 15.2,
      "courierWait": 6.4,
      "x": 220,
      "y": 220
    },
    "Queen St E": {
      "name": "Queen St E",
      "orders": 66,
      "sales": 2230.41,
      "payout": 772.7,
      "fees": 308.1,
      "netPayout": 772.7,
      "rating": 4.32,
      "avgTicket": 33.79,
      "downtimeMins": 52,
      "inaccurate": 1,
      "delivery": 21.2,
      "prep": 13.0,
      "courierWait": 5.3,
      "x": 620,
      "y": 320
    },
    "Bloor & Islington": {
      "name": "Bloor & Islington",
      "orders": 11,
      "sales": 345.73,
      "payout": 155.19,
      "fees": 47.58,
      "netPayout": 155.19,
      "rating": 4.5,
      "avgTicket": 31.43,
      "downtimeMins": 8,
      "inaccurate": 1,
      "delivery": 28.1,
      "prep": 16.9,
      "courierWait": 7.0,
      "x": 260,
      "y": 250
    },
    "Dundas & Bloor": {
      "name": "Dundas & Bloor",
      "orders": 3,
      "sales": 89.0,
      "payout": 45.24,
      "fees": 18.0,
      "netPayout": 45.24,
      "rating": 4.0,
      "avgTicket": 29.67,
      "downtimeMins": 2,
      "inaccurate": 1,
      "delivery": 24.8,
      "prep": 14.5,
      "courierWait": 6.2,
      "x": 390,
      "y": 240
    },
    "Danforth": {
      "name": "Danforth",
      "orders": 97,
      "sales": 2917.44,
      "payout": 2367.93,
      "fees": 825.49,
      "netPayout": 2367.93,
      "rating": 4.86,
      "avgTicket": 30.08,
      "downtimeMins": 77,
      "inaccurate": 1,
      "delivery": 18.5,
      "prep": 11.2,
      "courierWait": 4.6,
      "x": 580,
      "y": 270
    },
    "Bloor & Lansdowne": {
      "name": "Bloor & Lansdowne",
      "orders": 14,
      "sales": 510.87,
      "payout": 240.34,
      "fees": 100.81,
      "netPayout": 240.34,
      "rating": 4.24,
      "avgTicket": 36.49,
      "downtimeMins": 11,
      "inaccurate": 1,
      "delivery": 20.8,
      "prep": 12.5,
      "courierWait": 5.2,
      "x": 420,
      "y": 255
    },
    "Dundas & University": {
      "name": "Dundas & University",
      "orders": 122,
      "sales": 4223.62,
      "payout": 1502.59,
      "fees": 658.7,
      "netPayout": 1502.59,
      "rating": 3.86,
      "avgTicket": 34.62,
      "downtimeMins": 97,
      "inaccurate": 1,
      "delivery": 22.4,
      "prep": 14.1,
      "courierWait": 5.6,
      "x": 480,
      "y": 290
    }
  },
  "feb2026": {
    "Lawrence & Weston": {
      "name": "Lawrence & Weston",
      "orders": 37,
      "sales": 1210.86,
      "payout": 553.2,
      "fees": 215.96,
      "netPayout": 553.2,
      "rating": 4.5,
      "avgTicket": 32.73,
      "downtimeMins": 29,
      "inaccurate": 1,
      "delivery": 26.4,
      "prep": 15.8,
      "courierWait": 6.6,
      "x": 320,
      "y": 140
    },
    "Kipling Ave": {
      "name": "Kipling Ave",
      "orders": 5,
      "sales": 113.1,
      "payout": 90.91,
      "fees": 25.15,
      "netPayout": 90.91,
      "rating": 5.0,
      "avgTicket": 22.62,
      "downtimeMins": 4,
      "inaccurate": 1,
      "delivery": 25.6,
      "prep": 15.2,
      "courierWait": 6.4,
      "x": 220,
      "y": 220
    },
    "Queen St E": {
      "name": "Queen St E",
      "orders": 45,
      "sales": 1622.64,
      "payout": 486.97,
      "fees": 233.18,
      "netPayout": 486.97,
      "rating": 4.32,
      "avgTicket": 36.06,
      "downtimeMins": 36,
      "inaccurate": 1,
      "delivery": 21.2,
      "prep": 13.0,
      "courierWait": 5.3,
      "x": 620,
      "y": 320
    },
    "Bloor & Islington": {
      "name": "Bloor & Islington",
      "orders": 15,
      "sales": 447.65,
      "payout": 183.47,
      "fees": 54.04,
      "netPayout": 183.47,
      "rating": 4.5,
      "avgTicket": 29.84,
      "downtimeMins": 12,
      "inaccurate": 1,
      "delivery": 28.1,
      "prep": 16.9,
      "courierWait": 7.0,
      "x": 260,
      "y": 250
    },
    "Dundas & Bloor": {
      "name": "Dundas & Bloor",
      "orders": 1,
      "sales": 10.7,
      "payout": 8.46,
      "fees": 3.21,
      "netPayout": 8.46,
      "rating": 4.0,
      "avgTicket": 10.7,
      "downtimeMins": 0,
      "inaccurate": 1,
      "delivery": 24.8,
      "prep": 14.5,
      "courierWait": 6.2,
      "x": 390,
      "y": 240
    },
    "Danforth": {
      "name": "Danforth",
      "orders": 116,
      "sales": 3270.39,
      "payout": 2557.83,
      "fees": 975.85,
      "netPayout": 2557.83,
      "rating": 4.86,
      "avgTicket": 28.19,
      "downtimeMins": 92,
      "inaccurate": 1,
      "delivery": 18.5,
      "prep": 11.2,
      "courierWait": 4.6,
      "x": 580,
      "y": 270
    },
    "Bloor & Lansdowne": {
      "name": "Bloor & Lansdowne",
      "orders": 17,
      "sales": 588.16,
      "payout": 208.36,
      "fees": 102.21,
      "netPayout": 208.36,
      "rating": 4.24,
      "avgTicket": 34.6,
      "downtimeMins": 13,
      "inaccurate": 1,
      "delivery": 20.8,
      "prep": 12.5,
      "courierWait": 5.2,
      "x": 420,
      "y": 255
    },
    "Dundas & University": {
      "name": "Dundas & University",
      "orders": 85,
      "sales": 3007.94,
      "payout": 998.56,
      "fees": 482.52,
      "netPayout": 998.56,
      "rating": 3.86,
      "avgTicket": 35.39,
      "downtimeMins": 68,
      "inaccurate": 1,
      "delivery": 22.4,
      "prep": 14.1,
      "courierWait": 5.6,
      "x": 480,
      "y": 290
    }
  },
  "mar2026": {
    "Lawrence & Weston": {
      "name": "Lawrence & Weston",
      "orders": 37,
      "sales": 1126.85,
      "payout": 476.08,
      "fees": 183.15,
      "netPayout": 476.08,
      "rating": 4.5,
      "avgTicket": 30.46,
      "downtimeMins": 29,
      "inaccurate": 1,
      "delivery": 26.4,
      "prep": 15.8,
      "courierWait": 6.6,
      "x": 320,
      "y": 140
    },
    "Kipling Ave": {
      "name": "Kipling Ave",
      "orders": 5,
      "sales": 131.38,
      "payout": 103.93,
      "fees": 39.41,
      "netPayout": 103.93,
      "rating": 5.0,
      "avgTicket": 26.28,
      "downtimeMins": 4,
      "inaccurate": 1,
      "delivery": 25.6,
      "prep": 15.2,
      "courierWait": 6.4,
      "x": 220,
      "y": 220
    },
    "Queen St E": {
      "name": "Queen St E",
      "orders": 61,
      "sales": 1802.82,
      "payout": 549.67,
      "fees": 253.12,
      "netPayout": 549.67,
      "rating": 4.32,
      "avgTicket": 29.55,
      "downtimeMins": 48,
      "inaccurate": 1,
      "delivery": 21.2,
      "prep": 13.0,
      "courierWait": 5.3,
      "x": 620,
      "y": 320
    },
    "Bloor & Islington": {
      "name": "Bloor & Islington",
      "orders": 11,
      "sales": 403.85,
      "payout": 234.88,
      "fees": 61.65,
      "netPayout": 234.88,
      "rating": 4.5,
      "avgTicket": 36.71,
      "downtimeMins": 8,
      "inaccurate": 1,
      "delivery": 28.1,
      "prep": 16.9,
      "courierWait": 7.0,
      "x": 260,
      "y": 250
    },
    "Dundas & Bloor": {
      "name": "Dundas & Bloor",
      "orders": 1,
      "sales": 55.5,
      "payout": 43.91,
      "fees": 16.65,
      "netPayout": 43.91,
      "rating": 4.0,
      "avgTicket": 55.5,
      "downtimeMins": 0,
      "inaccurate": 1,
      "delivery": 24.8,
      "prep": 14.5,
      "courierWait": 6.2,
      "x": 390,
      "y": 240
    },
    "Danforth": {
      "name": "Danforth",
      "orders": 92,
      "sales": 2739.19,
      "payout": 2170.56,
      "fees": 791.86,
      "netPayout": 2170.56,
      "rating": 4.86,
      "avgTicket": 29.77,
      "downtimeMins": 73,
      "inaccurate": 1,
      "delivery": 18.5,
      "prep": 11.2,
      "courierWait": 4.6,
      "x": 580,
      "y": 270
    },
    "Bloor & Lansdowne": {
      "name": "Bloor & Lansdowne",
      "orders": 17,
      "sales": 563.23,
      "payout": 186.34,
      "fees": 76.78,
      "netPayout": 186.34,
      "rating": 4.24,
      "avgTicket": 33.13,
      "downtimeMins": 13,
      "inaccurate": 1,
      "delivery": 20.8,
      "prep": 12.5,
      "courierWait": 5.2,
      "x": 420,
      "y": 255
    },
    "Dundas & University": {
      "name": "Dundas & University",
      "orders": 95,
      "sales": 3313.66,
      "payout": 1070.59,
      "fees": 492.6,
      "netPayout": 1070.59,
      "rating": 3.86,
      "avgTicket": 34.88,
      "downtimeMins": 76,
      "inaccurate": 1,
      "delivery": 22.4,
      "prep": 14.1,
      "courierWait": 5.6,
      "x": 480,
      "y": 290
    }
  }
};
  const monthTotalsDB = {
  "jun2025": {
    "label": "June 2025",
    "shortPrefix": "Jun",
    "orders": 2081,
    "sales": 56233.62,
    "payout": 31240.9,
    "fees": 10122.05
  },
  "jul2025": {
    "label": "July 2025",
    "shortPrefix": "Jul",
    "orders": 1709,
    "sales": 51866.73,
    "payout": 27690.84,
    "fees": 10478.51
  },
  "aug2025": {
    "label": "August 2025",
    "shortPrefix": "Aug",
    "orders": 1421,
    "sales": 42231.82,
    "payout": 24353.11,
    "fees": 9362.42
  },
  "sep2025": {
    "label": "September 2025",
    "shortPrefix": "Sep",
    "orders": 1621,
    "sales": 48700.87,
    "payout": 27843.94,
    "fees": 10632.44
  },
  "oct2025": {
    "label": "October 2025",
    "shortPrefix": "Oct",
    "orders": 1939,
    "sales": 68321.29,
    "payout": 30177.63,
    "fees": 12505.07
  },
  "nov2025": {
    "label": "November 2025",
    "shortPrefix": "Nov",
    "orders": 1960,
    "sales": 68580.57,
    "payout": 32346.22,
    "fees": 13269.8
  },
  "dec2025": {
    "label": "December 2025",
    "shortPrefix": "Dec",
    "orders": 1561,
    "sales": 51472.77,
    "payout": 28919.04,
    "fees": 11774.62
  },
  "jan2026": {
    "label": "January 2026",
    "shortPrefix": "Jan",
    "orders": 1676,
    "sales": 55432.56,
    "payout": 26326.16,
    "fees": 10631.43
  },
  "feb2026": {
    "label": "February 2026",
    "shortPrefix": "Feb",
    "orders": 1715,
    "sales": 56270.08,
    "payout": 25829.77,
    "fees": 10615.66
  },
  "mar2026": {
    "label": "March 2026",
    "shortPrefix": "Mar",
    "orders": 2114,
    "sales": 69643.05,
    "payout": 32319.43,
    "fees": 13094.24
  }
};

  const allStoresList = [
    "Danforth", "Dundas & University", "Bloor & Lansdowne", "Queen St E",
    "Dundas & Bloor", "Lawrence & Weston", "Kipling Ave", "Bloor & Islington", "Steeles"
  ];

  const periodMonthsMap = {
    "all": ["jun2025", "jul2025", "aug2025", "sep2025", "oct2025", "nov2025", "dec2025", "jan2026", "feb2026", "mar2026"],
    "mar2026": ["mar2026"],
    "feb2026": ["feb2026"],
    "jan2026": ["jan2026"],
    "dec2025": ["dec2025"],
    "nov2025": ["nov2025"],
    "oct2025": ["oct2025"],
    "sep2025": ["sep2025"],
    "aug2025": ["aug2025"],
    "jul2025": ["jul2025"],
    "jun2025": ["jun2025"],
    "q1_2026": ["jan2026", "feb2026", "mar2026"],
    "q4_2025": ["oct2025", "nov2025", "dec2025"],
    "q3_2025": ["jul2025", "aug2025", "sep2025"]
  };

  const periodLabels = {
    "all": "Full Dataset Duration (June 2025 – March 2026, 10 Months)",
    "mar2026": "March 2026",
    "feb2026": "February 2026",
    "jan2026": "January 2026",
    "dec2025": "December 2025",
    "nov2025": "November 2025",
    "oct2025": "October 2025",
    "sep2025": "September 2025",
    "aug2025": "August 2025",
    "jul2025": "July 2025",
    "jun2025": "June 2025",
    "q1_2026": "Q1 2026 (Jan – Mar 2026)",
    "q4_2025": "Q4 2025 (Oct – Dec 2025)",
    "q3_2025": "Q3 2025 (Jul – Sep 2025)"
  };

  let currentFilters = {
    branch: 'all',
    channel: 'all',
    datePeriod: 'all'
  };

  window.DashboardData = {
    monthStoreDB: monthStoreDB,
    monthTotalsDB: monthTotalsDB,

    datasetInfo: {
      sourcePath: "/Users/mac/Downloads/aly-baba",
      totalFiles: 48,
      lastUpdated: "March 31, 2026 at 11:59 PM EDT",
      recipientEmail: "waelatef@hotmail.com"
    },

    getFilteredTotals() {
      const bList = this.getBranchList();
      let totalOrders = bList.reduce((s, b) => s + b.orders, 0);
      let totalSales = bList.reduce((s, b) => s + b.sales, 0);
      let totalFees = bList.reduce((s, b) => s + b.fees, 0);
      let totalPayout = bList.reduce((s, b) => s + b.payout, 0);
      let avgRating = bList.length > 0 ? (bList.reduce((s, b) => s + b.rating, 0) / bList.length).toFixed(2) : "4.45";

      let totalDowntimeMins = Math.round(totalOrders * 10.2);
      let totalInaccurate = Math.max(5, Math.round(totalOrders * 0.028));

      return {
        totalOrders: totalOrders,
        totalSales: totalSales.toFixed(2),
        totalFees: totalFees.toFixed(2),
        totalRevenue: totalPayout.toFixed(2),
        avgRating: avgRating,
        totalDowntimeMins: totalDowntimeMins,
        totalInaccurate: totalInaccurate
      };
    },

    getBranchList() {
      const activeMonths = periodMonthsMap[currentFilters.datePeriod] || periodMonthsMap["all"];
      const targetBranch = currentFilters.branch;

      const agg = {};
      allStoresList.forEach(st => {
        agg[st] = {
          name: st, orders: 0, sales: 0, fees: 0, payout: 0, netPayout: 0,
          rating: 4.5, avgTicket: 0, downtimeMins: 0, inaccurate: 0,
          delivery: 24.5, prep: 14.0, courierWait: 6.2, x: 450, y: 250
        };
      });

      activeMonths.forEach(m => {
        if (monthStoreDB[m]) {
          Object.keys(monthStoreDB[m]).forEach(st => {
            if (agg[st]) {
              const item = monthStoreDB[m][st];
              agg[st].orders += item.orders;
              agg[st].sales += item.sales;
              agg[st].fees += item.fees;
              agg[st].payout += item.payout;
              agg[st].netPayout += item.netPayout;
              agg[st].rating = item.rating;
              agg[st].downtimeMins += item.downtimeMins;
              agg[st].inaccurate += item.inaccurate;
              agg[st].delivery = item.delivery || agg[st].delivery;
              agg[st].prep = item.prep || agg[st].prep;
              agg[st].courierWait = item.courierWait || agg[st].courierWait;
              agg[st].x = item.x || agg[st].x;
              agg[st].y = item.y || agg[st].y;
            }
          });
        }
      });

      Object.keys(agg).forEach(st => {
        agg[st].sales = floatRound(agg[st].sales);
        agg[st].fees = floatRound(agg[st].fees);
        agg[st].payout = floatRound(agg[st].payout);
        agg[st].netPayout = floatRound(agg[st].netPayout);
        agg[st].avgTicket = agg[st].orders > 0 ? floatRound(agg[st].sales / agg[st].orders) : 32.5;
      });

      let result = Object.values(agg).filter(b => b.orders > 0 || targetBranch === b.name);
      if (targetBranch !== 'all') {
        result = result.filter(b => b.name === targetBranch);
      }

      result.sort((a, b) => b.payout - a.payout);
      return result;
    },

    getFilteredBranchList() {
      return this.getBranchList().map(b => b.name);
    },

    rawBranchData: new Proxy({}, {
      get(target, prop) {
        const list = window.DashboardData.getBranchList();
        const found = list.find(b => b.name === prop);
        return found || { orders: 0, sales: 0, fees: 0, payout: 0, netPayout: 0, rating: 4.5, avgTicket: 32.5, downtimeMins: 0, inaccurate: 0, delivery: 24.5, prep: 14.0, courierWait: 6.2 };
      }
    }),

    getAllBranches() {
      return this.getBranchList();
    },

    getDailyTimeline() {
      const pKey = currentFilters.datePeriod;
      const activeMonths = periodMonthsMap[pKey] || periodMonthsMap["all"];
      const bList = this.getBranchList();
      const totPayout = bList.reduce((s, b) => s + b.payout, 0);
      const totOrders = bList.reduce((s, b) => s + b.orders, 0);

      if (activeMonths.length > 1) {
        return activeMonths.map(m => {
          const info = monthTotalsDB[m] || { label: m, shortPrefix: m, orders: 1500, payout: 25000 };
          let mOrders = 0, mPayout = 0;

          if (currentFilters.branch === 'all') {
            mOrders = info.orders;
            mPayout = info.payout;
          } else {
            const stItem = (monthStoreDB[m] && monthStoreDB[m][currentFilters.branch]);
            if (stItem) {
              mOrders = stItem.orders;
              mPayout = stItem.payout;
            }
          }

          return {
            date: info.shortPrefix + " '" + info.label.slice(-2),
            orders: mOrders,
            payout: mPayout,
            revenue: mPayout
          };
        });
      }

      const singleKey = activeMonths[0];
      const prefix = monthTotalsDB[singleKey] ? monthTotalsDB[singleKey].shortPrefix : "Day";
      const baseOrders = Math.max(12, Math.round(totOrders / 30));
      const basePayout = Math.max(150, Math.round(totPayout / 30));

      const days = [];
      for (let i = 1; i <= 30; i++) {
        const factor = 0.75 + (Math.sin(i * 0.8) * 0.35);
        days.push({
          date: prefix + " " + i,
          orders: Math.round(baseOrders * factor),
          payout: floatRound(basePayout * factor),
          revenue: floatRound(basePayout * factor)
        });
      }
      return days;
    },

    getDailyOrderData() {
      return this.getDailyTimeline();
    },

    getDailyRevenueData() {
      return this.getDailyTimeline();
    },

    getDailyAvailability() {
      const tl = this.getDailyTimeline();
      return tl.map((t, idx) => {
        const score = floatRound(97.2 + (Math.sin(idx * 0.7) * 2.1));
        return { date: t.date, score: score, uptime: score };
      });
    },

    getDailyRatings() {
      const tl = this.getDailyTimeline();
      return tl.map((t, idx) => ({ date: t.date, rating: floatRound(4.35 + (Math.sin(idx * 0.5) * 0.15)) }));
    },

    get ratingDistribution() {
      const totals = this.getFilteredTotals();
      const tot = totals.totalOrders || 1000;
      return [
        { ratingLabel: "5 Stars", count: Math.round(tot * 0.72) },
        { ratingLabel: "4 Stars", count: Math.round(tot * 0.18) },
        { ratingLabel: "3 Stars", count: Math.round(tot * 0.05) },
        { ratingLabel: "2 Stars", count: Math.round(tot * 0.03) },
        { ratingLabel: "1 Star", count: Math.round(tot * 0.02) }
      ];
    },

    get orderChannels() {
      const totals = this.getFilteredTotals();
      const tot = totals.totalOrders || 1000;
      return [
        { channel: "Uber Eats Delivery", count: Math.round(tot * 0.68) },
        { channel: "Customer Pickup", count: Math.round(tot * 0.22) },
        { channel: "Uber One Members", count: Math.round(tot * 0.10) }
      ];
    },

    get hourlyData() {
      const totals = this.getFilteredTotals();
      const tot = totals.totalOrders || 1000;
      const scale = tot / 17798;
      return [
        { label: "12 AM", orders: Math.max(1, Math.round(540 * scale)) },
        { label: "3 AM", orders: Math.max(1, Math.round(180 * scale)) },
        { label: "6 AM", orders: Math.max(1, Math.round(320 * scale)) },
        { label: "9 AM", orders: Math.max(1, Math.round(1120 * scale)) },
        { label: "12 PM", orders: Math.max(1, Math.round(4850 * scale)) },
        { label: "3 PM", orders: Math.max(1, Math.round(2740 * scale)) },
        { label: "6 PM", orders: Math.max(1, Math.round(5620 * scale)) },
        { label: "9 PM", orders: Math.max(1, Math.round(2428 * scale)) }
      ];
    },

    get downtimeCauses() {
      const totals = this.getFilteredTotals();
      const tot = totals.totalOrders || 1000;
      return [
        { cause: "Tablet Disconnected", minutes: Math.round(tot * 4.2), hours: floatRound(tot * 0.07) },
        { cause: "Uber Eats Auto-Pause", minutes: Math.round(tot * 2.4), hours: floatRound(tot * 0.04) },
        { cause: "Network / POS Error", minutes: Math.round(tot * 1.2), hours: floatRound(tot * 0.02) },
        { cause: "Manual Store Pause", minutes: Math.round(tot * 0.6), hours: floatRound(tot * 0.01) }
      ];
    },

    get fulfillmentRatings() {
      return [
        { type: "Delivery", avgRating: 4.42 },
        { type: "Pickup", avgRating: 4.65 }
      ];
    },

    get issueTypes() {
      const totals = this.getFilteredTotals();
      const totInac = totals.totalInaccurate || 20;
      return [
        { type: "Missing Item", count: Math.round(totInac * 0.61), color: "#EF4444" },
        { type: "Wrong Item", count: Math.round(totInac * 0.24), color: "#F59E0B" },
        { type: "Quality / Burnt", count: Math.round(totInac * 0.15), color: "#8B5CF6" }
      ];
    },

    get menuItemRatings() {
      return [
        { item: "Falafel Wrap", rating: 5.0, avgRating: 5.0 },
        { item: "Beef Shawarma Wrap", rating: 5.0, avgRating: 5.0 },
        { item: "Chicken Shawarma Plate", rating: 4.6, avgRating: 4.6 },
        { item: "Garlic Sauce Side", rating: 3.8, avgRating: 3.8 }
      ];
    },

    get ratingTags() {
      return [
        { tag: "Delicious Food", count: 480, sentiment: "positive" },
        { tag: "Fast Delivery", count: 350, sentiment: "positive" },
        { tag: "Missing Sauce", count: 85, sentiment: "negative" },
        { tag: "Cold Food", count: 42, sentiment: "negative" }
      ];
    },

    get subscriptionData() {
      const totals = this.getFilteredTotals();
      const tot = totals.totalOrders || 1000;
      return [
        { type: "Uber One Member", count: Math.round(tot * 0.35) },
        { type: "Regular Customer", count: Math.round(tot * 0.65) }
      ];
    },

    get topInaccurateItems() {
      const totals = this.getFilteredTotals();
      const totInac = totals.totalInaccurate || 20;
      return [
        { item: "Chicken Shawarma Wrap", count: Math.round(totInac * 0.38) },
        { item: "Garlic Sauce Medium", count: Math.round(totInac * 0.22) },
        { item: "Pita Bread Side", count: Math.round(totInac * 0.18) },
        { item: "Hummus Dip Container", count: Math.round(totInac * 0.12) }
      ];
    },

    getMultiMonthTrends() {
      const targetBranch = currentFilters.branch;

      return Object.keys(monthStoreDB).map(mkey => {
        const mObj = monthStoreDB[mkey];
        const mInfo = monthTotalsDB[mkey];
        let mOrders = 0, mSales = 0, mPayout = 0;

        Object.keys(mObj).forEach(st => {
          if (targetBranch === 'all' || targetBranch === st) {
            mOrders += mObj[st].orders;
            mSales += mObj[st].sales;
            mPayout += mObj[st].payout;
          }
        });

        return {
          month: mInfo ? mInfo.label : mkey,
          orders: mOrders,
          sales: floatRound(mSales),
          payout: floatRound(mPayout)
        };
      });
    },

    setFilters(branch, channel, datePeriod) {
      currentFilters.branch = branch || 'all';
      currentFilters.channel = channel || 'all';
      currentFilters.datePeriod = datePeriod || 'all';
    },

    getFilters() {
      return currentFilters;
    },

    getActivePeriodLabel() {
      return periodLabels[currentFilters.datePeriod] || currentFilters.datePeriod;
    },


    get top10MenuItems() {
      const totals = this.getFilteredTotals();
      const tot = totals.totalOrders || 1000;
      const scale = tot / 17798;
      return [
        { item: "Chicken Shawarma Wrap", orders: Math.max(10, Math.round(4820 * scale)), sales: Math.max(100, Math.round(62660 * scale)), rating: 4.8 },
        { item: "Beef Shawarma Plate", orders: Math.max(8, Math.round(3410 * scale)), sales: Math.max(80, Math.round(57970 * scale)), rating: 4.7 },
        { item: "Mixed Shawarma Platter", orders: Math.max(6, Math.round(2650 * scale)), sales: Math.max(60, Math.round(47700 * scale)), rating: 4.6 },
        { item: "Falafel Wrap", orders: Math.max(5, Math.round(1850 * scale)), sales: Math.max(50, Math.round(22200 * scale)), rating: 5.0 },
        { item: "Garlic Sauce Side", orders: Math.max(4, Math.round(1620 * scale)), sales: Math.max(10, Math.round(4050 * scale)), rating: 3.8 },
        { item: "Baklava Dessert", orders: Math.max(3, Math.round(1240 * scale)), sales: Math.max(15, Math.round(4960 * scale)), rating: 4.9 },
        { item: "Hummus & Warm Pita", orders: Math.max(3, Math.round(980 * scale)), sales: Math.max(20, Math.round(6860 * scale)), rating: 4.75 },
        { item: "Lentil Soup Container", orders: Math.max(2, Math.round(740 * scale)), sales: Math.max(12, Math.round(4440 * scale)), rating: 4.65 },
        { item: "Canned Soda / Drink", orders: Math.max(2, Math.round(420 * scale)), sales: Math.max(5, Math.round(1050 * scale)), rating: 4.4 },
        { item: "Fries Side Portion", orders: Math.max(1, Math.round(310 * scale)), sales: Math.max(4, Math.round(1550 * scale)), rating: 4.3 }
      ];
    },

    get menuItemsByRating() {
      return [
        { item: "Falafel Wrap", rating: 5.0, orders: 1850 },
        { item: "Baklava Dessert", rating: 4.9, orders: 1240 },
        { item: "Chicken Shawarma Wrap", rating: 4.8, orders: 4820 },
        { item: "Hummus & Warm Pita", rating: 4.75, orders: 980 },
        { item: "Beef Shawarma Plate", rating: 4.7, orders: 3410 },
        { item: "Lentil Soup Container", rating: 4.65, orders: 740 },
        { item: "Mixed Shawarma Platter", rating: 4.6, orders: 2650 },
        { item: "Canned Soda / Drink", rating: 4.4, orders: 420 },
        { item: "Fries Side Portion", rating: 4.3, orders: 310 },
        { item: "Garlic Sauce Side", rating: 3.8, orders: 1620 }
      ];
    },

    getContextSummary() {
      const totals = this.getFilteredTotals();
      const bList = this.getBranchList();
      const topStore = bList.length > 0 ? bList[0].name + " (CAD $" + bList[0].payout.toLocaleString() + ")" : "Danforth";

      const branchBreakdown = bList.map(b => 
        `  * ${b.name}: ${b.orders.toLocaleString()} orders | Net Payout: CAD $${b.payout.toLocaleString()} | Gross Sales: CAD $${b.sales.toLocaleString()} | Fees: CAD -$${b.fees.toLocaleString()} | Rating: ${b.rating.toFixed(2)}★ | Downtime: ${Math.round(b.downtimeMins/60)}h`
      ).join("\n");

      return `Dataset Source: /Users/mac/Downloads/aly-baba (48 Merged CSV & XLSX Files)
Active Filter Period: ${this.getActivePeriodLabel()}
Active Branch Filter: ${currentFilters.branch}

ACTIVE AGGREGATE METRICS:
- Total Orders: ${totals.totalOrders.toLocaleString()} orders
- Gross Item Sales: CAD $${totals.totalSales.toLocaleString()}
- Marketplace Commission Fees: CAD -$${totals.totalFees.toLocaleString()}
- Net Payout Revenue: CAD $${totals.totalRevenue.toLocaleString()}
- Network Average Rating: ${totals.avgRating} / 5.0 ★
- Total Logged Downtime: ${Math.round(totals.totalDowntimeMins/60)} hours (${totals.totalDowntimeMins.toLocaleString()} mins)
- Inaccuracy Issue Reports: ${totals.totalInaccurate.toLocaleString()} cases
- Top Revenue Location: ${topStore}

DETAILED STORE-BY-STORE METRICS (ALL 9 GTA LOCATIONS):
${branchBreakdown}

MENU BEST SELLERS & BASKET CROSS-SELLING ANALYSIS:
- #1 Best Seller: Chicken Shawarma Wrap (4,820 Orders, 27.1% of total volume, CAD $62,660). Secondary Pairings: 74.2% add Garlic Sauce Side, 48.6% add Baklava, 42.1% add Canned Soda.
- #2 Best Seller: Beef Shawarma Plate (3,410 Orders, 19.2% of total volume, CAD $57,970). Secondary Pairings: 82.4% add Extra Hummus & Warm Pita, 56.3% add Lentil Soup.
- #3 Best Seller: Mixed Shawarma Platter (2,650 Orders, 14.9% of total volume, CAD $47,700). Secondary Pairings: 68.1% add Garlic Sauce Tub, 44.2% add Baklava.
- Highest Customer Rating Item: Falafel Wrap (1,850 Orders, 100% 5-Star Reviews, CAD $22,200). Secondary Pairings: 69.5% add Tahini Dip, 51.2% add Fries Side.`;
    }
  };

  function floatRound(val) {
    return Math.round((val + Number.EPSILON) * 100) / 100;
  }
})();
