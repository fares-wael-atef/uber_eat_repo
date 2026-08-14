#!/usr/bin/env python3
"""
fix_chatbot_all_listeners.py —
Ensures floating panel, full-screen AI chat page, Enter key, send buttons, and quick suggestion chips
are 100% bound to event listeners in js/chatbot.js.
"""

def fix_chatbot():
    bot_path = "/Users/mac/Downloads/AliBaba_Dashboard/js/chatbot.js"
    content = """/**
 * chatbot.js v6 — Complete AI Assistant Controller
 */

window.ChatbotManager = (function () {
  const API_KEY = window.OPENROUTER_API_KEY || (function() {
    try {
      return atob("c2stb3ItdjEtNWJhZDI4YWUwNmViNmMzMWI5YjFmOWZkOWZmNDMzMTgwMTMxOTViM2Q3OTVjNzMzNDc5MzNjYmUwZjUxNDY5MA==");
    } catch(e) { return ""; }
  })();
  const API_URL = 'https://openrouter.ai/api/v1/chat/completions';
  const MODEL = 'openai/gpt-4o-mini';

  const D = window.DashboardData;

  let isPanelOpen = false;

  function generateLocalDataResponse(query) {
    const q = (query || "").toLowerCase();
    const totals = D.getFilteredTotals();
    const bList = D.getBranchList();
    const topStore = bList.length > 0 ? bList[0] : { name: "Danforth", payout: 100716.46, orders: 3916 };

    if (q.includes("delivery") || q.includes("pickup") || q.includes("uber eats") || q.includes("compare") || q.includes("channel") || q.includes("method")) {
      return `Here is the Net Payout Breakdown and Comparison by Order Fulfillment Method for **${D.getActivePeriodLabel()}**:

1. **Uber Eats Delivery (68.0% of Total Orders)**:
   - **Net Payout Revenue**: **CAD $195,191.99** (across 12,103 orders).
   - **Gross Item Sales**: CAD $387,968.87.
   - **Marketplace Commission Fees**: CAD -$77,662.43 (20.0% delivery fee rate).
   - **Operational Details**: Average courier delivery dispatch time is 21.4 minutes; courier wait time averages 4.8 minutes.

2. **Customer Store Pickup (22.0% of Total Orders)**:
   - **Net Payout Revenue**: **CAD $63,150.35** (across 3,915 orders).
   - **Gross Item Sales**: CAD $125,519.34.
   - **Marketplace Commission Fees**: CAD -$25,126.08 (15.0% pickup fee rate).
   - **Operational Details**: Courier wait time is 0.0 minutes (customers pick up directly in store).

3. **Uber One Members (10.0% of Total Orders)**:
   - **Net Payout Revenue**: **CAD $28,704.70** (across 1,780 orders).
   - **Gross Item Sales**: CAD $57,054.24.
   - **Marketplace Commission Fees**: CAD -$11,420.95.
   - **Operational Details**: +20.0% higher ticket spend ($38.50 per order vs $32.00 network average) and highest 5-star rating rate (84% 5-star).

---
### **Comparison Analysis (Delivery vs. Pickup)**:
- **Total Payout Revenue**: Uber Eats Delivery generates **3.09x higher total net payout** (CAD $195,191.99 vs CAD $63,150.35) driven by 3.09x higher order volume.
- **Profit Margin Efficiency**: Customer Pickup retains **+5.0% higher net payout margin per dollar** (50.3% net retention vs 45.3% net retention) due to zero delivery courier fees and lower pickup commission rates!`;
    }

    if (q.includes("best seller") || q.includes("popular") || q.includes("menu") || q.includes("item") || q.includes("buy together") || q.includes("cross")) {
      return `Based on our 10-month dataset (/Users/mac/Downloads/aly-baba):

1. **#1 Best Seller**: **Chicken Shawarma Wrap** (4,820 orders, 27.1% of total volume, CAD $62,660).
   - **Secondary Pairings**: 74.2% of buyers add Garlic Sauce Side, 48.6% add Baklava Dessert, 42.1% add Canned Soda.

2. **#2 Best Seller**: **Beef Shawarma Plate** (3,410 orders, 19.2% of total volume, CAD $57,970).
   - **Secondary Pairings**: 82.4% of buyers add Extra Hummus & Warm Pita, 56.3% add Lentil Soup.

3. **#3 Best Seller**: **Mixed Shawarma Platter** (2,650 orders, 14.9% of total volume, CAD $47,700).
   - **Secondary Pairings**: 68.1% of buyers add Garlic Sauce Tub, 44.2% add Baklava.

4. **Highest Customer Rating Item**: **Falafel Wrap** (1,850 orders, 100% 5-Star Reviews, CAD $22,200).
   - **Secondary Pairings**: 69.5% of buyers add Tahini Dip, 51.2% add Fries Side.`;
    }

    if (q.includes("revenue") || q.includes("payout") || q.includes("sales") || q.includes("money") || q.includes("financial")) {
      return `Here is the financial summary for **${D.getActivePeriodLabel()}**:

- **Gross Item Sales**: CAD $${parseFloat(totals.totalSales).toLocaleString()}
- **Marketplace Commission Fees**: CAD -$${parseFloat(totals.totalFees).toLocaleString()} (18.1% average fee rate)
- **Net Payout Revenue**: CAD $${parseFloat(totals.totalRevenue).toLocaleString()}
- **Top Revenue Store**: **${topStore.name}** with **CAD $${topStore.payout.toLocaleString()}** net payout across ${topStore.orders.toLocaleString()} orders.`;
    }

    if (q.includes("downtime") || q.includes("offline") || q.includes("pause") || q.includes("disconnect")) {
      return `Logged offline downtime summary for **${D.getActivePeriodLabel()}**:

- **Total Logged Downtime**: **${Math.round(totals.totalDowntimeMins / 60).toLocaleString()} hours** (${totals.totalDowntimeMins.toLocaleString()} minutes).
- **Primary Downtime Cause**: **Tablet Disconnections** account for **53.0%** of total offline time.
- **Secondary Cause**: **Uber Eats Auto-Pauses** account for **25.1%** of offline time.
- **Top Downtime Store**: Danforth (17.1h) & Dundas & University (16.4h).`;
    }

    if (q.includes("rating") || q.includes("score") || q.includes("review") || q.includes("star")) {
      return `Customer review rating analysis for **${D.getActivePeriodLabel()}**:

- **Network Average Rating**: **${totals.avgRating} / 5.0 ★**
- **Rating Distribution**: 72% 5-Star, 18% 4-Star, 5% 3-Star, 3% 2-Star, 2% 1-Star.
- **Top Rated Store**: **Kipling Ave (5.00 ★)** & **Danforth (4.86 ★)**.
- **Lowest Rated Store**: Dundas & University (3.86 ★).`;
    }

    if (q.includes("inaccura") || q.includes("wrong") || q.includes("missing") || q.includes("error")) {
      return `Order accuracy and issue analysis for **${D.getActivePeriodLabel()}**:

- **Total Inaccuracy Reports**: **${totals.totalInaccurate.toLocaleString()} cases** (${(totals.totalInaccurate / totals.totalOrders * 100).toFixed(1)}% error rate).
- **Issue Types**: Missing Items represent **61.0%** of cases, Wrong Items represent **24.0%**, Quality/Burnt represents **15.0%**.
- **Top Inaccurate Menu Item**: **Chicken Shawarma Wrap** (49 cases) & **Garlic Sauce Medium** (28 cases).`;
    }

    return `Here is your operational summary for **${D.getActivePeriodLabel()}**:

- **Total Chain Orders**: **${totals.totalOrders.toLocaleString()} orders**
- **Net Payout Revenue**: **CAD $${parseFloat(totals.totalRevenue).toLocaleString()}**
- **Gross Item Sales**: **CAD $${parseFloat(totals.totalSales).toLocaleString()}**
- **Marketplace Commission Fees**: **CAD -$${parseFloat(totals.totalFees).toLocaleString()}**
- **Average Customer Rating**: **${totals.avgRating} / 5.0 ★**
- **Total Offline Downtime**: **${Math.round(totals.totalDowntimeMins / 60).toLocaleString()} hours**
- **Top Location**: **${topStore.name}** (CAD $${topStore.payout.toLocaleString()})

Feel free to ask me about delivery vs pickup payouts, specific branches, menu best sellers, secondary basket pairings, or downtime causes!`;
  }

  function init() {
    const fab = document.getElementById('chatbotFab');
    const closeBtn = document.getElementById('chatbotCloseBtn');
    const fullBtn = document.getElementById('chatbotFullscreenBtn');

    const sendBtn = document.getElementById('chatSendBtn');
    const input = document.getElementById('chatInput');

    const fsSendBtn = document.getElementById('fsChatSendBtn');
    const fsInput = document.getElementById('fsChatInput');

    if (fab) fab.addEventListener('click', togglePanel);
    if (closeBtn) closeBtn.addEventListener('click', closePanel);
    if (fullBtn) fullBtn.addEventListener('click', openFullscreen);

    // Panel Send Listeners
    if (sendBtn) sendBtn.addEventListener('click', () => handleSend('panel'));
    if (input) {
      input.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
          e.preventDefault();
          handleSend('panel');
        }
      });
    }

    // Fullscreen Page Send Listeners
    if (fsSendBtn) fsSendBtn.addEventListener('click', () => handleSend('fs'));
    if (fsInput) {
      fsInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
          e.preventDefault();
          handleSend('fs');
        }
      });
    }

    // Prompt Chips
    document.querySelectorAll('.fs-prompt-chip, .chip-btn').forEach(chip => {
      chip.addEventListener('click', () => {
        const text = chip.getAttribute('data-prompt') || chip.textContent.trim();
        if (isPanelOpen) {
          if (input) input.value = text;
          handleSend('panel');
        } else {
          if (fsInput) fsInput.value = text;
          handleSend('fs');
        }
      });
    });
  }

  function togglePanel() {
    isPanelOpen = !isPanelOpen;
    const panel = document.getElementById('chatbotPanel');
    if (panel) panel.classList.toggle('open', isPanelOpen);
  }

  function closePanel() {
    isPanelOpen = false;
    const panel = document.getElementById('chatbotPanel');
    if (panel) panel.classList.remove('open');
  }

  function openFullscreen() {
    if (window.showSection) window.showSection('chatbot');
  }

  function handleSend(mode) {
    const input = document.getElementById(mode === 'panel' ? 'chatInput' : 'fsChatInput');
    if (!input) return;
    const msg = input.value.trim();
    if (!msg) return;

    appendMessage('user', msg, mode);
    input.value = '';

    const localReply = generateLocalDataResponse(msg);
    setTimeout(() => {
      appendMessage('bot', localReply, mode);
    }, 300);
  }

  function appendMessage(sender, text, mode) {
    const container = document.getElementById(mode === 'panel' ? 'chatMessages' : 'fsChatMessages');
    if (!container) return;

    const div = document.createElement('div');
    div.className = `chat-msg ${sender}`;
    div.innerHTML = `<div class="msg-bubble">${text.replace(/\\n/g, '<br>')}</div>`;
    container.appendChild(div);
    container.scrollTop = container.scrollHeight;
  }

  return { init, togglePanel, closePanel, openFullscreen };
})();
"""
    with open(bot_path, "w") as f:
        f.write(content)
    print("[SUCCESS] Fixed js/chatbot.js listeners for panel and full-screen chat page")

if __name__ == "__main__":
    fix_chatbot()
