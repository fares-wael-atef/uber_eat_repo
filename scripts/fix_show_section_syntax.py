#!/usr/bin/env python3
"""
fix_show_section_syntax.py — Fixes duplicate catch block in window.showSection in js/dashboard.js.
"""

def fix():
    target = "/Users/mac/Downloads/AliBaba_Dashboard/js/dashboard.js"
    with open(target) as f:
        code = f.read()

    bad_snippet = """        currentSection = sectionId;
    try { initKPIs(); } catch(e) {}
    try { updateDynamicMenuHTML(); } catch(e) {}
    try { updateDynamicInsights(); } catch(e) {}

    if (window.ChartManager) {
      try {
        window.ChartManager.disposeAll();
        initChartsForSection(sectionId);
      } catch(e) { console.warn("Section switch chart warn:", e); }
    } catch(e) { console.warn("Section switch chart warn:", e); }
    }"""

    good_snippet = """    currentSection = sectionId;
    try { initKPIs(); } catch(e) {}
    try { updateDynamicMenuHTML(); } catch(e) {}
    try { updateDynamicInsights(); } catch(e) {}

    if (window.ChartManager) {
      try {
        window.ChartManager.disposeAll();
        initChartsForSection(sectionId);
      } catch(e) { console.warn("Section switch chart warn:", e); }
    }"""

    code = code.replace(bad_snippet, good_snippet)

    with open(target, "w") as f:
        f.write(code)
    print("[SUCCESS] Fixed window.showSection syntax in js/dashboard.js")

if __name__ == "__main__":
    fix()
