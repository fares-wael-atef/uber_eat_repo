#!/usr/bin/env python3
"""
remove_all_emojis.py — Replaces all emoji icons in dashboard.html with professional typography.
"""

def clean_emojis():
    target = "/Users/mac/Downloads/AliBaba_Dashboard/dashboard.html"
    with open(target) as f:
        html = f.read()

    replacements = {
        "🥇 Chicken Shawarma Wrap": "Chicken Shawarma Wrap",
        "🥈 Beef Shawarma Plate": "Beef Shawarma Plate",
        "🥉 Mixed Shawarma Platter": "Mixed Shawarma Platter",
        "⭐ Falafel Wrap": "Falafel Wrap",
        "🥇 #1 Best Seller:": "#1 Best Seller:",
        "🥈 #2 Best Seller:": "#2 Best Seller:",
        "⭐ Highest Rating:": "Highest Customer Rating:",
        "🏆 Star Champions": "Star Champions",
        "⚠️ Volume Heavy": "Attention Items (Volume Heavy)",
        "💡 Hidden Gems": "Hidden Gem Opportunities",
        "🇨🇦 TORONTO": "TORONTO",
        "📍 All Locations": "All Locations"
    }

    for k, v in replacements.items():
        html = html.replace(k, v)

    with open(target, "w") as f:
        f.write(html)

    print("[SUCCESS] Removed all emojis from dashboard.html")

if __name__ == "__main__":
    clean_emojis()
