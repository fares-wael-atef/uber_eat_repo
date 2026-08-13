#!/usr/bin/env python3
"""
make_map_dynamic.py — Updates drawBranchMap() in js/charts.js to dynamically calculate
store payout and order badges from D.getBranchList().
"""

import os, re

def update_map():
    target_path = "/Users/mac/Downloads/AliBaba_Dashboard/js/charts.js"
    with open(target_path) as f:
        code = f.read()

    old_block = """    const branchCoords = [
      { name: "Steeles", x: 480, y: 70, rev: 422, orders: 19, rating: "4.70", downtime: "2m", color: "#F59E0B" },
      { name: "Lawrence & Weston", x: 310, y: 190, rev: 1331, orders: 48, rating: "4.80", downtime: "22m", color: "#F59E0B" },
      { name: "Kipling Ave", x: 180, y: 390, rev: 859, orders: 32, rating: "4.62", downtime: "54m", color: "#F59E0B" },
      { name: "Bloor & Islington", x: 260, y: 320, rev: 1735, orders: 61, rating: "4.65", downtime: "13.2h", color: "#10B981" },
      { name: "Dundas & Bloor", x: 410, y: 290, rev: 2956, orders: 112, rating: "4.74", downtime: "2.1h", color: "#10B981" },
      { name: "Bloor & Lansdowne", x: 470, y: 310, rev: 1525, orders: 58, rating: "4.68", downtime: "1m", color: "#10B981" },
      { name: "Dundas & University", x: 610, y: 330, rev: 2374, orders: 94, rating: "4.60", downtime: "4.8h", color: "#10B981" },
      { name: "Queen St E", x: 740, y: 360, rev: 3305, orders: 136, rating: "4.85", downtime: "1h 14m", color: "#1A73E8" },
      { name: "Danforth", x: 780, y: 260, rev: 4197, orders: 198, rating: "4.72", downtime: "2.3h", color: "#1A73E8" }
    ];"""

    new_block = """    const activeList = D.getBranchList();
    const staticCoords = {
      "Steeles": { x: 480, y: 70, color: "#F59E0B" },
      "Lawrence & Weston": { x: 310, y: 190, color: "#F59E0B" },
      "Kipling Ave": { x: 180, y: 390, color: "#F59E0B" },
      "Bloor & Islington": { x: 260, y: 320, color: "#10B981" },
      "Dundas & Bloor": { x: 410, y: 290, color: "#10B981" },
      "Bloor & Lansdowne": { x: 470, y: 310, color: "#10B981" },
      "Dundas & University": { x: 610, y: 330, color: "#10B981" },
      "Queen St E": { x: 740, y: 360, color: "#1A73E8" },
      "Danforth": { x: 780, y: 260, color: "#1A73E8" }
    };

    const branchCoords = activeList.map(b => {
      const c = staticCoords[b.name] || { x: 450, y: 250, color: "#1A73E8" };
      return {
        name: b.name,
        x: c.x,
        y: c.y,
        color: c.color,
        rev: Math.round(b.payout),
        orders: b.orders,
        rating: b.rating ? b.rating.toFixed(2) : "4.50",
        downtime: Math.round(b.downtimeMins / 60) + "h"
      };
    });"""

    if old_block in code:
        code = code.replace(old_block, new_block)
        with open(target_path, "w") as f:
            f.write(code)
        print("[SUCCESS] Dynamic branchCoords mapped in charts.js!")
    else:
        print("[NOTICE] Block already updated or pattern not found.")

if __name__ == "__main__":
    update_map()
