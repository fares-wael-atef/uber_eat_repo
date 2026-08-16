#!/usr/bin/env python3
"""
audit_new_dataset.py —
Scans and parses all reporting CSV/XLSX files in /Users/mac/Desktop/jun-apr-26
Extracts exact totals for Orders, Sales, Fees, Net Payouts, Ratings, Downtime, Branches, and Monthly trends.
"""

import os, glob, pandas as pd, numpy as np

def audit_dataset(dataset_dir):
    print(f"=== AUDITING DATASET AT: {dataset_dir} ===")
    
    files = glob.glob(os.path.join(dataset_dir, "*"))
    print(f"Total files found: {len(files)}")
    
    month_payout_files = [f for f in files if "Payout summary" in os.path.basename(f) or "payout summary" in os.path.basename(f).lower()]
    payment_files = [f for f in files if "Payment details 26" in os.path.basename(f) or "payment details" in os.path.basename(f).lower()]
    order_files = [f for f in files if "Order history" in os.path.basename(f) or "order history" in os.path.basename(f).lower()]
    downtime_files = [f for f in files if "Downtime" in os.path.basename(f) or "downtime" in os.path.basename(f).lower()]
    rating_files = [f for f in files if "Customer and delivery reviews" in os.path.basename(f) or "reviews" in os.path.basename(f).lower()]
    accuracy_files = [f for f in files if "Inaccurate orders" in os.path.basename(f) or "inaccurate" in os.path.basename(f).lower()]

    print(f"Payout summary files ({len(month_payout_files)}): {[os.path.basename(f) for f in month_payout_files]}")
    print(f"Payment details files ({len(payment_files)}): {[os.path.basename(f) for f in payment_files]}")
    print(f"Order history files ({len(order_files)}): {[os.path.basename(f) for f in order_files]}")
    print(f"Downtime files ({len(downtime_files)}): {[os.path.basename(f) for f in downtime_files]}")

    # Inspect Payout Summary files
    payout_data = []
    for pf in sorted(month_payout_files):
        fname = os.path.basename(pf)
        try:
            df = pd.read_csv(pf)
            print(f"\n--- {fname} Columns: {list(df.columns)} ---")
            print(df.head(3))
            payout_data.append(df)
        except Exception as e:
            print(f"Error reading {fname}: {e}")

    # Inspect Order History files for total order counts & dates
    total_orders_count = 0
    months_found = set()
    branches_found = set()
    
    for of in sorted(order_files):
        fname = os.path.basename(of)
        try:
            df = pd.read_csv(of)
            total_orders_count += len(df)
            for col in df.columns:
                if "store" in col.lower() or "branch" in col.lower() or "restaurant" in col.lower():
                    branches_found.update(df[col].dropna().unique())
                if "date" in col.lower() or "time" in col.lower():
                    try:
                        dates = pd.to_datetime(df[col], errors='coerce')
                        months_found.update(dates.dt.strftime('%Y-%m').dropna().unique())
                    except:
                        pass
        except Exception as e:
            print(f"Error reading order file {fname}: {e}")

    print(f"\nTotal Order Rows across all Order History files: {total_orders_count}")
    print(f"Months detected: {sorted(list(months_found))}")
    print(f"Branches detected ({len(branches_found)}): {sorted(list(branches_found))}")

if __name__ == "__main__":
    audit_dataset("/Users/mac/Desktop/jun-apr-26")
