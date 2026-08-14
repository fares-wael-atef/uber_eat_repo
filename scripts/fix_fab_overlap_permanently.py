#!/usr/bin/env python3
"""
fix_fab_overlap_permanently.py —
Permanently hides #chatbotFab when section-chatbot is active OR chatbotPanel is open.
Ensures zero overlap with full-screen send button or panel send button.
"""

import os, re

def apply_fix():
    # 1. Update dashboard.html CSS
    dash_path = "/Users/mac/Downloads/AliBaba_Dashboard/dashboard.html"
    with open(dash_path) as f:
        html = f.read()

    fab_css = """
<style>
/* PERMANENT FAB HIDE WHEN IN FULLSCREEN OR SIDE PANEL OPEN */
body:has(#section-chatbot.active) #chatbotFab,
body:has(#chatbotPanel.open) #chatbotFab,
.section#section-chatbot.active ~ #chatbotFab,
#section-chatbot.active ~ .chatbot-fab,
#chatbotPanel.open ~ #chatbotFab,
.chatbot-fab.is-hidden {
  display: none !important;
  opacity: 0 !important;
  pointer-events: none !important;
}
</style>
"""
    if 'PERMANENT FAB HIDE WHEN IN FULLSCREEN' not in html:
        html = html.replace('</head>', fab_css + '\n</head>')

    with open(dash_path, "w") as f:
        f.write(html)
    print("[SUCCESS] Updated dashboard.html with CSS body:has rules for #chatbotFab")

    # 2. Update js/dashboard.js inside showSection
    js_dash_path = "/Users/mac/Downloads/AliBaba_Dashboard/js/dashboard.js"
    with open(js_dash_path) as f:
        dcode = f.read()

    fab_hide_logic = """    const fab = document.getElementById('chatbotFab');
    if (fab) {
      if (sectionId === 'chatbot') {
        fab.style.setProperty('display', 'none', 'important');
      } else {
        const panel = document.getElementById('chatbotPanel');
        const isPanelOpen = panel && panel.classList.contains('open');
        fab.style.setProperty('display', isPanelOpen ? 'none' : 'flex', 'important');
      }
    }"""

    if 'fab.style.setProperty' not in dcode:
        dcode = dcode.replace(
            "const bc = document.getElementById('currentSection');",
            fab_hide_logic + "\n    const bc = document.getElementById('currentSection');"
        )
        with open(js_dash_path, "w") as f:
            f.write(dcode)
        print("[SUCCESS] Updated js/dashboard.js showSection to hide fab on sectionId === 'chatbot'")

    # 3. Update js/chatbot.js with updateFabVisibility()
    bot_path = "/Users/mac/Downloads/AliBaba_Dashboard/js/chatbot.js"
    with open(bot_path) as f:
        bcode = f.read()

    bcode = bcode.replace(
        "function togglePanel() {",
        """function updateFabVisibility() {
    const fab = document.getElementById('chatbotFab');
    if (!fab) return;
    const isFsActive = document.getElementById('section-chatbot')?.classList.contains('active');
    const isPanelOpen = document.getElementById('chatbotPanel')?.classList.contains('open');
    if (isFsActive || isPanelOpen) {
      fab.style.setProperty('display', 'none', 'important');
    } else {
      fab.style.setProperty('display', 'flex', 'important');
    }
  }

  function togglePanel() {"""
    )

    bcode = bcode.replace(
        "if (panel) panel.classList.toggle('open', isPanelOpen);",
        "if (panel) panel.classList.toggle('open', isPanelOpen);\n    updateFabVisibility();"
    )

    bcode = bcode.replace(
        "function closePanel() {",
        "function closePanel() {\n    isPanelOpen = false;\n    const panel = document.getElementById('chatbotPanel');\n    if (panel) panel.classList.remove('open');\n    updateFabVisibility();\n  }\n  function dummyClosePanel() {"
    )

    bcode = bcode.replace(
        "function openFullscreen() {",
        "function openFullscreen() {\n    closePanel();\n    if (window.showSection) window.showSection('chatbot');\n    updateFabVisibility();\n    renderAllMessages();\n  }\n  function dummyOpenFullscreen() {"
    )

    with open(bot_path, "w") as f:
        f.write(bcode)
    print("[SUCCESS] Updated js/chatbot.js with updateFabVisibility()")

if __name__ == "__main__":
    apply_fix()
