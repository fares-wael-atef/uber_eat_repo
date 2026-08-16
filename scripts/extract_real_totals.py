#!/usr/bin/env python3
"""
Full dataset aggregation — reads ALL real CSV files and produces exact totals 
for every month and every branch.
"""

import os, csv, json, re
from collections import defaultdict

def read_csv(path):
    rows = []
    try:
        with open(path, encoding='utf-8-sig', errors='replace') as f:
            reader = csv.DictReader(f)
            for row in reader:
                rows.append(dict(row))
    except Exception as e:
        print(f"  [WARN] Could not read {path}: {e}")
    return rows

def find_col(row, *candidates):
    for c in candidates:
        if c in row:
            return row[c]
    return None

def safe_float(v):
    if v is None:
        return 0.0
    try:
        return float(str(v).replace(',', '').replace('$', '').strip())
    except:
        return 0.0

def safe_int(v):
    if v is None:
        return 0
    try:
        return int(str(v).replace(',', '').strip())
    except:
        return 0

# ─── PAYOUT SUMMARY FILES (authoritative financials) ─────────────────────────
PAYOUT_FILES = {
    "mar2026": ["/Users/mac/Desktop/aly-baba/mar-Payout summary-26.csv"],
    "apr2026": ["/Users/mac/Desktop/jun-apr-26/apr Payout summary 26.csv"],
    "may2026": ["/Users/mac/Desktop/jun-apr-26/may Payout summary 26.csv"],
    "jun2026": ["/Users/mac/Desktop/jun-apr-26/jun Payout summary 26.csv"],
}

# ─── ORDER HISTORY FILES ──────────────────────────────────────────────────────
ORDER_HISTORY_FILES = {
    "mar2026": ["/Users/mac/Desktop/aly-baba/mar-Order history-26.csv"],
    "apr2026": ["/Users/mac/Desktop/jun-apr-26/apr Order history 26.csv"],
    "may2026": ["/Users/mac/Desktop/jun-apr-26/may Order history 26.csv"],
    "jun2026": ["/Users/mac/Desktop/jun-apr-26/jun Order history 26.csv"],
}

# ─── INACCURATE ORDERS ────────────────────────────────────────────────────────
INACCURATE_FILES = {
    "mar2026": ["/Users/mac/Desktop/aly-baba/mar-Inaccurate orders-26.csv"],
    "apr2026": ["/Users/mac/Desktop/jun-apr-26/apr Inaccurate orders 26.csv"],
    "may2026": ["/Users/mac/Desktop/jun-apr-26/may Inaccurate orders 26.csv"],
    "jun2026": ["/Users/mac/Desktop/jun-apr-26/jun Inaccurate orders 26.csv"],
}

# ─── DOWNTIME FILES ────────────────────────────────────────────────────────────
DOWNTIME_FILES = {
    "mar2026": ["/Users/mac/Desktop/aly-baba/mar-Downtime-26.csv"],
    "apr2026": ["/Users/mac/Desktop/jun-apr-26/apr Downtime 26.csv"],
    "may2026": ["/Users/mac/Desktop/jun-apr-26/may Downtime 26.csv"],
    "jun2026": ["/Users/mac/Desktop/jun-apr-26/jun Downtime 26.csv"],
}

# ─── REVIEW FILES ──────────────────────────────────────────────────────────────
REVIEW_FILES = {
    "mar2026": ["/Users/mac/Desktop/aly-baba/mar-Customer and delivery reviews-26.csv"],
    "apr2026": ["/Users/mac/Desktop/jun-apr-26/apr Customer and delivery reviews 26.csv"],
    "may2026": ["/Users/mac/Desktop/jun-apr-26/may Customer and delivery reviews 26.csv"],
}

# ─── OLDER MONTHS — use payment details files ─────────────────────────────────
OLDER_PAYMENT_FILES = {
    "jun2025": ["/Users/mac/Desktop/aly-baba/june-2025.csv", "/Users/mac/Desktop/aly-baba/june2-2025.csv"],
    "jul2025": ["/Users/mac/Desktop/aly-baba/july-2025.csv", "/Users/mac/Desktop/aly-baba/july2-2025.csv"],
    "aug2025": ["/Users/mac/Desktop/aly-baba/aug-2025.csv", "/Users/mac/Desktop/aly-baba/aug2-2025.csv"],
    "sep2025": ["/Users/mac/Desktop/aly-baba/sep-2025.csv", "/Users/mac/Desktop/aly-baba/sep2-2025.csv"],
    "oct2025": ["/Users/mac/Desktop/aly-baba/oct-2025.csv", "/Users/mac/Desktop/aly-baba/oct2-2025.csv"],
    "nov2025": ["/Users/mac/Desktop/aly-baba/nov-2025.csv", "/Users/mac/Desktop/aly-baba/nov2-2025.csv"],
    "dec2025": ["/Users/mac/Desktop/aly-baba/dec-2025.csv", "/Users/mac/Desktop/aly-baba/dec2-2025.csv"],
    "jan2026": ["/Users/mac/Desktop/aly-baba/jan-2026.csv", "/Users/mac/Desktop/aly-baba/jan2-2026.csv"],
    "feb2026": ["/Users/mac/Desktop/aly-baba/feb1-2026.csv"],
}

MONTHS_ORDER = ["jun2025","jul2025","aug2025","sep2025","oct2025","nov2025","dec2025",
                "jan2026","feb2026","mar2026","apr2026","may2026","jun2026"]
MONTH_LABELS = {"jun2025":"Jun '25","jul2025":"Jul '25","aug2025":"Aug '25","sep2025":"Sep '25",
                "oct2025":"Oct '25","nov2025":"Nov '25","dec2025":"Dec '25","jan2026":"Jan '26",
                "feb2026":"Feb '26","mar2026":"Mar '26","apr2026":"Apr '26","may2026":"May '26","jun2026":"Jun '26"}

print("=" * 80)
print("STEP 1: READING PAYOUT SUMMARIES (Mar–Jun 2026)")
print("=" * 80)

payout_by_month_branch = {}

for month, files in PAYOUT_FILES.items():
    payout_by_month_branch[month] = {}
    for fpath in files:
        if not os.path.exists(fpath):
            print(f"  [MISSING] {fpath}")
            continue
        rows = read_csv(fpath)
        print(f"  [{month}] {os.path.basename(fpath)}: {len(rows)} rows, cols: {list(rows[0].keys())[:10] if rows else []}")
        for row in rows:
            store = find_col(row, 'Store', 'Restaurant', 'store')
            if not store:
                continue
            # Normalize store name
            store = re.sub(r"Ali Baba'?s(?:\s+Shawarma)?(?:\s*\(([^)]+)\))?", 
                          lambda m: m.group(1) if m.group(1) else store, store).strip()
            # Try common payout cols
            gross = safe_float(find_col(row, 'Gross Food Sales', 'Gross Sales', 'Item Subtotal', 'gross_sales'))
            fees  = safe_float(find_col(row, 'Marketplace Fees', 'Uber Eats Fee', 'Fees', 'fees'))
            net   = safe_float(find_col(row, 'Net Payout', 'Payout', 'net_payout', 'Amount'))
            
            if store not in payout_by_month_branch[month]:
                payout_by_month_branch[month][store] = {'gross': 0, 'fees': 0, 'net': 0}
            payout_by_month_branch[month][store]['gross'] += gross
            payout_by_month_branch[month][store]['fees']  += fees
            payout_by_month_branch[month][store]['net']   += net
    
    # Print totals for this month
    for store, vals in sorted(payout_by_month_branch[month].items()):
        if vals['gross'] > 0 or vals['net'] > 0:
            print(f"    {store}: gross=${vals['gross']:.2f} fees=${vals['fees']:.2f} net=${vals['net']:.2f}")

print("\n" + "=" * 80)
print("STEP 2: READING ORDER HISTORY (Mar–Jun 2026)")
print("=" * 80)

orders_by_month_branch = {}
for month, files in ORDER_HISTORY_FILES.items():
    orders_by_month_branch[month] = {}
    for fpath in files:
        if not os.path.exists(fpath):
            print(f"  [MISSING] {fpath}")
            continue
        rows = read_csv(fpath)
        print(f"  [{month}] {os.path.basename(fpath)}: {len(rows)} orders, cols: {list(rows[0].keys())[:10] if rows else []}")
        for row in rows:
            store = find_col(row, 'Store', 'Restaurant', 'store')
            if not store:
                continue
            store = re.sub(r"Ali Baba'?s(?:\s+Shawarma)?(?:\s*\(([^)]+)\))?",
                          lambda m: m.group(1) if m.group(1) else store, store).strip()
            orders_by_month_branch[month][store] = orders_by_month_branch[month].get(store, 0) + 1
    
    total = sum(orders_by_month_branch[month].values())
    print(f"  TOTAL {month}: {total} orders")
    for store, cnt in sorted(orders_by_month_branch[month].items(), key=lambda x: -x[1]):
        print(f"    {store}: {cnt}")

print("\n" + "=" * 80)
print("STEP 3: READING INACCURATE ORDERS (Mar–Jun 2026)")
print("=" * 80)

inaccurate_by_month = {}
for month, files in INACCURATE_FILES.items():
    total = 0
    for fpath in files:
        if not os.path.exists(fpath):
            continue
        rows = read_csv(fpath)
        total += len(rows)
    inaccurate_by_month[month] = total
    print(f"  [{month}] {total} inaccurate orders")

print("\n" + "=" * 80)
print("STEP 4: READING DOWNTIME (Mar–Jun 2026)")
print("=" * 80)

downtime_by_month = {}
for month, files in DOWNTIME_FILES.items():
    total_mins = 0
    for fpath in files:
        if not os.path.exists(fpath):
            continue
        rows = read_csv(fpath)
        for row in rows:
            mins = safe_float(find_col(row, 'Offline Minutes', 'offline_minutes', 
                                       'Downtime (minutes)', 'Minutes Offline',
                                       'Total Offline Time (Minutes)', 'downtime_mins'))
            total_mins += mins
    downtime_by_month[month] = total_mins
    print(f"  [{month}] {total_mins:.0f} offline minutes ({total_mins/60:.1f} hours)")

print("\n" + "=" * 80)
print("STEP 5: SNIFFING OLDER MONTHS (Jun 2025 – Feb 2026)")
print("=" * 80)

older_month_totals = {}
for month, files in OLDER_PAYMENT_FILES.items():
    for fpath in files:
        if not os.path.exists(fpath):
            continue
        rows = read_csv(fpath)
        if not rows:
            continue
        cols = list(rows[0].keys())
        print(f"  [{month}] {os.path.basename(fpath)}: {len(rows)} rows")
        print(f"    cols: {cols[:12]}")
        # Print first row values
        print(f"    sample: {dict(list(rows[0].items())[:8])}")
        break
