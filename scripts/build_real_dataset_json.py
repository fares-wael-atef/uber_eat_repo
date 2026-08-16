#!/usr/bin/env python3
"""
build_real_dataset_json.py — 
Reads ALL real CSVs from both dataset directories and produces a verified JSON 
with exact per-month and per-branch totals for the dashboard.
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
        print(f"  [WARN] {path}: {e}")
    return rows

def safe_float(v):
    if v is None: return 0.0
    try: return float(str(v).replace(',','').replace('$','').replace('CAD','').strip())
    except: return 0.0

def safe_int(v):
    if v is None: return 0
    try: return int(str(v).replace(',','').strip())
    except: return 0

def norm_store(s):
    """Normalize store name to short form"""
    if not s: return ""
    m = re.search(r'\(([^)]+)\)', s)
    if m:
        name = m.group(1).strip()
        # Fix inconsistent capitalizations
        name = name.replace("Queen st E", "Queen St E").replace("queen st e", "Queen St E")
        return name
    return s.strip()

# ============================================================
# 1. ORDER HISTORY — all months
# ============================================================
print("=" * 70)
print("STEP 1: COUNT ORDERS FROM ORDER HISTORY FILES")
print("=" * 70)

# Jun-Feb: use the payment detail files (they have order rows)
# Jun 2025: june-2025.csv cols: 'Store name as per Uber Eats manager', header row problem
# Let's use a targeted count

order_counts = {}
inaccurate_counts = {}
downtime_mins = {}
reviews_data = {}

# ── Old-format payment files (Jun 2025 – Feb 2026)
OLD_PAYMENT = {
    "jun2025": ["/Users/mac/Desktop/aly-baba/june-2025.csv", "/Users/mac/Desktop/aly-baba/june2-2025.csv", "/Users/mac/Desktop/aly-baba/june3-2025.csv"],
    "jul2025": ["/Users/mac/Desktop/aly-baba/july-2025.csv", "/Users/mac/Desktop/aly-baba/july2-2025.csv", "/Users/mac/Desktop/aly-baba/july3-2025.csv"],
    "aug2025": ["/Users/mac/Desktop/aly-baba/aug2-2025.csv"],
    "sep2025": ["/Users/mac/Desktop/aly-baba/sep2-2025.csv"],
    "oct2025": ["/Users/mac/Desktop/aly-baba/oct2-2025.csv"],
    "nov2025": ["/Users/mac/Desktop/aly-baba/nov2-2025.csv"],
    "dec2025": ["/Users/mac/Desktop/aly-baba/dec2-2025.csv"],
    "jan2026": ["/Users/mac/Desktop/aly-baba/jan2-2026.csv"],
    "feb2026": ["/Users/mac/Desktop/aly-baba/feb1-2026.csv"],
}
# New-format order history (Mar 2026+)
NEW_ORDER_HIST = {
    "mar2026": "/Users/mac/Desktop/aly-baba/mar-Order history-26.csv",
    "apr2026": "/Users/mac/Desktop/jun-apr-26/apr Order history 26.csv",
    "may2026": "/Users/mac/Desktop/jun-apr-26/may Order history 26.csv",
    "jun2026": "/Users/mac/Desktop/jun-apr-26/jun Order history 26.csv",
}

# Count from old files
old_store_col = 'Store name as per Uber Eats manager'
old_order_col = 'Order ID as per Uber Eats manager'
old_status_col = 'Either: Completed (eater received food), Cancelled (order cancelled by eater or support), Refund (eater was refunded for order), or Unfulfilled (order was not able to be completed)'
old_sales_col  = 'Total item sales excl tax '
old_fees_col   = 'Uber Eats Service Fee (% of Gross Order) '

for month, files in OLD_PAYMENT.items():
    by_store = defaultdict(lambda: {'orders':0,'sales':0.0,'fees':0.0,'payout':0.0,'unique_orders':set()})
    for fpath in files:
        if not os.path.exists(fpath): continue
        rows = read_csv(fpath)
        # Skip header row if duplicated
        for row in rows:
            store_val = row.get(old_store_col, row.get('Store Name',''))
            if store_val in ('Store Name', 'Store', '', None): continue
            store = norm_store(store_val) or store_val
            
            order_id = row.get(old_order_col, row.get('Order ID',''))
            status   = row.get(old_status_col, row.get('Order Status',''))
            sales    = safe_float(row.get(old_sales_col, row.get('Total item sales excl tax', '')))
            fees     = safe_float(row.get(old_fees_col, row.get('Uber Eats Service Fee','0')))
            
            if order_id and order_id not in ('Order ID', '', None):
                by_store[store]['unique_orders'].add(order_id)
            by_store[store]['sales']  += sales
            by_store[store]['fees']   += fees
    
    month_total = 0
    month_sales = 0
    month_fees  = 0
    for store, d in by_store.items():
        cnt = len(d['unique_orders']) or d['orders']
        month_total += cnt
        month_sales += d['sales']
        month_fees  += d['fees']
    
    order_counts[month] = {'total': month_total, 'by_store': {s: len(d['unique_orders']) for s,d in by_store.items()}, 'sales': month_sales, 'fees': month_fees}
    print(f"  [{month}] {month_total} orders | sales=${month_sales:.2f} | fees=${month_fees:.2f}")

# Count from new-format order history
for month, fpath in NEW_ORDER_HIST.items():
    if not os.path.exists(fpath):
        print(f"  [MISSING] {month}: {fpath}")
        continue
    rows = read_csv(fpath)
    by_store = defaultdict(int)
    for row in rows:
        store_val = row.get('Store','')
        if not store_val or store_val == 'Store': continue
        store = norm_store(store_val)
        by_store[store] += 1
    total = sum(by_store.values())
    order_counts[month] = {'total': total, 'by_store': dict(by_store)}
    print(f"  [{month}] {total} orders: {dict(by_store)}")

print("\n" + "=" * 70)
print("STEP 2: PAYOUT SUMMARIES (Mar–Jun 2026)")
print("=" * 70)

PAYOUT = {
    "mar2026": "/Users/mac/Desktop/aly-baba/mar-Payout summary-26.csv",
    "apr2026": "/Users/mac/Desktop/jun-apr-26/apr Payout summary 26.csv",
    "may2026": "/Users/mac/Desktop/jun-apr-26/may Payout summary 26.csv",
    "jun2026": "/Users/mac/Desktop/jun-apr-26/jun Payout summary 26.csv",
}

payout_data = {}
for month, fpath in PAYOUT.items():
    if not os.path.exists(fpath): continue
    rows = read_csv(fpath)
    if not rows: continue
    cols = list(rows[0].keys())
    print(f"  [{month}] cols: {cols}")
    
    by_store = defaultdict(lambda: {'gross':0,'fees':0,'net':0,'orders':0})
    for row in rows:
        store_val = row.get('Store','')
        if not store_val or store_val == 'Store': continue
        store = norm_store(store_val)
        # Try various column names
        gross = safe_float(row.get('Gross Food Sales', row.get('Gross Sales', row.get('Item Subtotal',0))))
        fees  = safe_float(row.get('Marketplace Fees', row.get('Uber Eats Fee', row.get('Total Fees',0))))
        net   = safe_float(row.get('Net Payout', row.get('Payout', row.get('Total Payout',0))))
        by_store[store]['gross'] += gross
        by_store[store]['fees']  += fees
        by_store[store]['net']   += net
    
    payout_data[month] = dict(by_store)
    for store, d in sorted(payout_data[month].items(), key=lambda x: -x[1]['gross']):
        if d['gross'] > 0:
            print(f"    {store}: gross=${d['gross']:.2f} fees=${d['fees']:.2f} net=${d['net']:.2f}")

print("\n" + "=" * 70)
print("STEP 3: INACCURATE ORDERS (all months)")
print("=" * 70)

INACCURATE = {
    "mar2026": "/Users/mac/Desktop/aly-baba/mar-Inaccurate orders-26.csv",
    "apr2026": "/Users/mac/Desktop/jun-apr-26/apr Inaccurate orders 26.csv",
    "may2026": "/Users/mac/Desktop/jun-apr-26/may Inaccurate orders 26.csv",
    "jun2026": "/Users/mac/Desktop/jun-apr-26/jun Inaccurate orders 26.csv",
}
for month, fpath in INACCURATE.items():
    if not os.path.exists(fpath): continue
    rows = read_csv(fpath)
    inaccurate_counts[month] = len(rows)
    print(f"  [{month}] {len(rows)} inaccurate orders")

print("\n" + "=" * 70)
print("STEP 4: STORE AVAILABILITY / DOWNTIME (checking column names)")
print("=" * 70)

AVAIL = {
    "mar2026": "/Users/mac/Desktop/aly-baba/mar-Store Availability Report-26.csv",
    "apr2026": "/Users/mac/Desktop/jun-apr-26/apr Store Availability Report 26.csv",
    "may2026": "/Users/mac/Desktop/jun-apr-26/may Store Availability Report 26.csv",
    "jun2026": "/Users/mac/Desktop/jun-apr-26/jun Store Availability Report 26.csv",
}
for month, fpath in AVAIL.items():
    if not os.path.exists(fpath): continue
    rows = read_csv(fpath)
    if not rows: continue
    print(f"  [{month}] {len(rows)} rows, cols: {list(rows[0].keys())}")
    # Print a few rows
    for r in rows[:2]:
        print(f"    {dict(list(r.items())[:10])}")

print("\n" + "=" * 70)
print("STEP 5: REVIEWS (checking rating columns)")
print("=" * 70)

REVIEWS = {
    "mar2026": "/Users/mac/Desktop/aly-baba/mar-Customer and delivery reviews-26.csv",
    "apr2026": "/Users/mac/Desktop/jun-apr-26/apr Customer and delivery reviews 26.csv",
    "may2026": "/Users/mac/Desktop/jun-apr-26/may Customer and delivery reviews 26.csv",
}
for month, fpath in REVIEWS.items():
    if not os.path.exists(fpath): continue
    rows = read_csv(fpath)
    if not rows: continue
    print(f"  [{month}] {len(rows)} reviews, cols: {list(rows[0].keys())}")
    ratings = [safe_float(r.get('Rating', r.get('rating', r.get('Customer Rating',0)))) for r in rows]
    ratings = [r for r in ratings if r > 0]
    avg = sum(ratings)/len(ratings) if ratings else 0
    print(f"    avg rating: {avg:.2f} from {len(ratings)} rated orders")

print("\n" + "=" * 70)
print("STEP 6: DOWNTIME FILES (checking correct columns)")
print("=" * 70)

DOWNTIME = {
    "mar2026": "/Users/mac/Desktop/aly-baba/mar-Downtime-26.csv",
    "apr2026": "/Users/mac/Desktop/jun-apr-26/apr Downtime 26.csv",
    "may2026": "/Users/mac/Desktop/jun-apr-26/may Downtime 26.csv",
    "jun2026": "/Users/mac/Desktop/jun-apr-26/jun Downtime 26.csv",
}
for month, fpath in DOWNTIME.items():
    if not os.path.exists(fpath): continue
    rows = read_csv(fpath)
    if not rows: continue
    print(f"  [{month}] {len(rows)} rows, ALL cols: {list(rows[0].keys())}")
    # Print first row to see all values
    print(f"    row[0]: {dict(rows[0])}")
    break
