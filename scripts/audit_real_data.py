#!/usr/bin/env python3
"""
Full dataset audit script — reads ALL real CSV files from both dataset directories
and produces exact totals per month and branch for the dashboard.
"""

import os, csv, json
from collections import defaultdict

DIRS = [
    "/Users/mac/Desktop/aly-baba",
    "/Users/mac/Desktop/jun-apr-26"
]

# ─── Payout Summary Files ────────────────────────────────────────────────────
# These have the authoritative branch-level gross sales, fees, and net payout
PAYOUT_FILES = {
    "jun2025": ["/Users/mac/Desktop/aly-baba/june-2025.csv", "/Users/mac/Desktop/aly-baba/june2-2025.csv"],
    "jul2025": ["/Users/mac/Desktop/aly-baba/july-2025.csv", "/Users/mac/Desktop/aly-baba/july2-2025.csv"],
    "aug2025": ["/Users/mac/Desktop/aly-baba/aug-2025.csv", "/Users/mac/Desktop/aly-baba/aug2-2025.csv"],
    "sep2025": ["/Users/mac/Desktop/aly-baba/sep-2025.csv", "/Users/mac/Desktop/aly-baba/sep2-2025.csv"],
    "oct2025": ["/Users/mac/Desktop/aly-baba/oct-2025.csv", "/Users/mac/Desktop/aly-baba/oct2-2025.csv"],
    "nov2025": ["/Users/mac/Desktop/aly-baba/nov-2025.csv", "/Users/mac/Desktop/aly-baba/nov2-2025.csv"],
    "dec2025": ["/Users/mac/Desktop/aly-baba/dec-2025.csv", "/Users/mac/Desktop/aly-baba/dec2-2025.csv"],
    "jan2026": ["/Users/mac/Desktop/aly-baba/jan-2026.csv", "/Users/mac/Desktop/aly-baba/jan2-2026.csv"],
    "feb2026": ["/Users/mac/Desktop/aly-baba/feb1-2026.csv", "/Users/mac/Desktop/aly-baba/feb2-2026.csv", "/Users/mac/Desktop/aly-baba/feb3-2026.csv"],
    "mar2026": ["/Users/mac/Desktop/aly-baba/mar-Payout summary-26.csv"],
    "apr2026": ["/Users/mac/Desktop/jun-apr-26/apr Payout summary 26.csv"],
    "may2026": ["/Users/mac/Desktop/jun-apr-26/may Payout summary 26.csv"],
    "jun2026": ["/Users/mac/Desktop/jun-apr-26/jun Payout summary 26.csv"],
}

ORDER_HISTORY_FILES = {
    "mar2026": ["/Users/mac/Desktop/aly-baba/mar-Order history-26.csv"],
    "apr2026": ["/Users/mac/Desktop/jun-apr-26/apr Order history 26.csv"],
    "may2026": ["/Users/mac/Desktop/jun-apr-26/may Order history 26.csv"],
    "jun2026": ["/Users/mac/Desktop/jun-apr-26/jun Order history 26.csv"],
}

INACCURATE_FILES = {
    "mar2026": ["/Users/mac/Desktop/aly-baba/mar-Inaccurate orders-26.csv"],
    "apr2026": ["/Users/mac/Desktop/jun-apr-26/apr Inaccurate orders 26.csv"],
    "may2026": ["/Users/mac/Desktop/jun-apr-26/may Inaccurate orders 26.csv"],
    "jun2026": ["/Users/mac/Desktop/jun-apr-26/jun Inaccurate orders 26.csv"],
}

DOWNTIME_FILES = {
    "mar2026": ["/Users/mac/Desktop/aly-baba/mar-Downtime-26.csv"],
    "apr2026": ["/Users/mac/Desktop/jun-apr-26/apr Downtime 26.csv"],
    "may2026": ["/Users/mac/Desktop/jun-apr-26/may Downtime 26.csv"],
    "jun2026": ["/Users/mac/Desktop/jun-apr-26/jun Downtime 26.csv"],
}

REVIEW_FILES = {
    "mar2026": ["/Users/mac/Desktop/aly-baba/mar-Customer and delivery reviews-26.csv"],
    "apr2026": ["/Users/mac/Desktop/jun-apr-26/apr Customer and delivery reviews 26.csv"],
    "may2026": ["/Users/mac/Desktop/jun-apr-26/may Customer and delivery reviews 26.csv"],
}

def sniff_csv(path):
    """Peek at a CSV to show first 5 rows"""
    rows = []
    try:
        with open(path, encoding='utf-8-sig', errors='replace') as f:
            reader = csv.DictReader(f)
            for i, row in enumerate(reader):
                if i >= 3:
                    break
                rows.append(dict(row))
    except Exception as e:
        rows = [{"error": str(e)}]
    return rows

print("=" * 80)
print("DATASET AUDIT — SNIFFING KEY FILES")
print("=" * 80)

# 1. Sniff payout summary files (these have authoritative financials)
for month_key in ["mar2026", "apr2026", "may2026", "jun2026"]:
    files = PAYOUT_FILES.get(month_key, [])
    for f in files:
        if os.path.exists(f):
            print(f"\n[PAYOUT] {month_key} → {os.path.basename(f)}")
            rows = sniff_csv(f)
            for r in rows:
                print("  ", dict(list(r.items())[:8]))
            break

# 2. Sniff order history for apr/may/jun 2026
for month_key in ["mar2026", "apr2026", "may2026", "jun2026"]:
    files = ORDER_HISTORY_FILES.get(month_key, [])
    for f in files:
        if os.path.exists(f):
            print(f"\n[ORDER HIST] {month_key} → {os.path.basename(f)}")
            rows = sniff_csv(f)
            for r in rows:
                print("  ", dict(list(r.items())[:8]))
            break

# 3. Sniff downtime for apr/may/jun 2026
for month_key in ["mar2026", "apr2026", "may2026", "jun2026"]:
    files = DOWNTIME_FILES.get(month_key, [])
    for f in files:
        if os.path.exists(f):
            print(f"\n[DOWNTIME] {month_key} → {os.path.basename(f)}")
            rows = sniff_csv(f)
            for r in rows:
                print("  ", dict(list(r.items())[:8]))
            break

# 4. Sniff inaccurate orders
for month_key in ["mar2026", "apr2026", "may2026", "jun2026"]:
    files = INACCURATE_FILES.get(month_key, [])
    for f in files:
        if os.path.exists(f):
            print(f"\n[INACCURATE] {month_key} → {os.path.basename(f)}")
            rows = sniff_csv(f)
            for r in rows:
                print("  ", dict(list(r.items())[:8]))
            break

# 5. Sniff reviews
for month_key in ["mar2026", "apr2026", "may2026"]:
    files = REVIEW_FILES.get(month_key, [])
    for f in files:
        if os.path.exists(f):
            print(f"\n[REVIEWS] {month_key} → {os.path.basename(f)}")
            rows = sniff_csv(f)
            for r in rows:
                print("  ", dict(list(r.items())[:10]))
            break
