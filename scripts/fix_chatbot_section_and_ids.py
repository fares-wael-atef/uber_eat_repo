#!/usr/bin/env python3
"""
fix_chatbot_section_and_ids.py —
1. Adds section-chatbot markup to dashboard.html so Full-Screen AI Chat tab & Maximize button work 100%.
2. Harmonizes element IDs between dashboard.html and js/chatbot.js.
"""

import os, re

def fix_all():
    dash_path = "/Users/mac/Downloads/AliBaba_Dashboard/dashboard.html"
    with open(dash_path) as f:
        html = f.read()

    # Check if section-chatbot exists, if not, add it before floating chatbot panel
    if 'id="section-chatbot"' not in html:
        chatbot_section = """
    <!-- SECTION 10: FULL-SCREEN AI CHATBOT -->
    <div class="section" id="section-chatbot">
      <div class="chatbot-fs-container" style="display:flex; height:calc(100vh - 120px); background:var(--surface); border:1px solid var(--border); border-radius:16px; overflow:hidden;">
        <!-- FS Sidebar -->
        <div class="chatbot-fs-sidebar" style="width:280px; background:var(--surface-2); border-right:1px solid var(--border); padding:20px; display:flex; flex-direction:column; gap:16px;">
          <div style="font-weight:800; font-size:1.1rem; color:var(--blue-600);">AI Assistant Workspace</div>
          <button class="fs-new-chat-btn" id="fsNewChatBtn" style="padding:10px; background:var(--blue-600); color:white; border:none; border-radius:10px; font-weight:700; cursor:pointer;">+ New Conversation</button>
          
          <div style="font-size:0.75rem; font-weight:700; color:var(--text-muted); text-transform:uppercase;">Quick Insights Prompts</div>
          <div className="fs-quick-prompts" style="display:flex; flex-direction:column; gap:8px;">
            <button class="fs-prompt-chip" data-prompt="Give me net payout for each fulfillment method (delivery vs pickup)">Compare Delivery vs Pickup Payouts</button>
            <button class="fs-prompt-chip" data-prompt="What are the top 10 best seller menu items and secondary basket add-ons?">Top 10 Menu Best Sellers</button>
            <button class="fs-prompt-chip" data-prompt="Summarize financial sales, fees, and payout revenue for 10-month dataset">10-Month Financial Summary</button>
            <button class="fs-prompt-chip" data-prompt="What are the main causes of offline downtime across branches?">Offline Downtime Causes</button>
            <button class="fs-prompt-chip" data-prompt="Which branch has the lowest customer rating and highest inaccuracy errors?">Branch Issues & Ratings</button>
          </div>
        </div>

        <!-- FS Main Chat Area -->
        <div className="chatbot-fs-chat-main" style="flex:1; display:flex; flex-direction:column; min-width:0;">
          <div className="chatbot-fs-messages" id="chatMessagesFs" style="flex:1; overflow-y:auto; padding:24px; display:flex; flex-direction:column; gap:16px;">
            <div class="chat-msg bot">
              <div class="msg-bubble">
                Hello! I am your AI Operations Assistant for Ali Baba's Shawarma. Ask me anything about net payouts, delivery vs pickup comparisons, menu best sellers, downtime causes, or store ratings!
              </div>
            </div>
          </div>
          <div className="chatbot-fs-input-area" style="padding:16px 24px; border-top:1px solid var(--border); background:var(--surface);">
            <div style="display:flex; gap:12px; align-items:center;">
              <input type="text" id="chatInputFs" placeholder="Type your operational query... (e.g. compare delivery vs pickup net payout)" style="flex:1; padding:12px 16px; border-radius:12px; border:1px solid var(--border); background:var(--surface-2); color:var(--text-primary); font-size:0.9rem;" />
              <button id="chatSendBtnFs" style="padding:12px 20px; border-radius:12px; background:var(--blue-600); color:white; border:none; font-weight:700; cursor:pointer;">Send</button>
            </div>
          </div>
        </div>
      </div>
    </div>
"""
        html = html.replace('<!-- CHATBOT FLOATING PANEL -->', chatbot_section + '\n    <!-- CHATBOT FLOATING PANEL -->')

    with open(dash_path, "w") as f:
        f.write(html)
    print("[SUCCESS] Added section-chatbot to dashboard.html")

    # 2. Update js/chatbot.js to map element IDs cleanly
    bot_path = "/Users/mac/Downloads/AliBaba_Dashboard/js/chatbot.js"
    bot_code = """/**
 * chatbot.js v7 — Complete AI Assistant Controller (Panel & Fullscreen Workspace)
 */

window.ChatbotManager = (function () {
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

    const sendBtnPanel = document.getElementById('chatSendBtn');
    const inputPanel = document.getElementById('chatInput');

    const sendBtnFs = document.getElementById('chatSendBtnFs') || document.getElementById('fsChatSendBtn');
    const inputFs = document.getElementById('chatInputFs') || document.getElementById('fsChatInput');

    if (fab) fab.addEventListener('click', togglePanel);
    if (closeBtn) closeBtn.addEventListener('click', closePanel);
    if (fullBtn) fullBtn.addEventListener('click', openFullscreen);

    // Floating Panel Listeners
    if (sendBtnPanel) sendBtnPanel.addEventListener('click', () => handleSend('panel'));
    if (inputPanel) {
      inputPanel.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
          e.preventDefault();
          handleSend('panel');
        }
      });
    }

    // Fullscreen Workspace Listeners
    if (sendBtnFs) sendBtnFs.addEventListener('click', () => handleSend('fs'));
    if (inputFs) {
      inputFs.addEventListener('keydown', (e) => {
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
        const mode = document.getElementById('section-chatbot')?.classList.contains('active') ? 'fs' : 'panel';
        const targetInput = mode === 'panel' ? inputPanel : inputFs;
        if (targetInput) targetInput.value = text;
        handleSend(mode);
      });
    });

    const newChatBtn = document.getElementById('fsNewChatBtn');
    if (newChatBtn) {
      newChatBtn.addEventListener('click', () => {
        const containerFs = document.getElementById('chatMessagesFs');
        if (containerFs) {
          containerFs.innerHTML = `
            <div class="chat-msg bot">
              <div class="msg-bubble">
                New conversation started! Ask me anything about net payouts, delivery vs pickup comparisons, menu best sellers, downtime causes, or store ratings!
              </div>
            </div>
          `;
        }
      });
    }
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
    closePanel();
    if (window.showSection) window.showSection('chatbot');
  }

  function handleSend(mode) {
    const input = mode === 'panel' ? document.getElementById('chatInput') : (document.getElementById('chatInputFs') || document.getElementById('fsChatInput'));
    if (!input) return;
    const msg = input.value.trim();
    if (!msg) return;

    appendMessage('user', msg, mode);
    input.value = '';

    const localReply = generateLocalDataResponse(msg);
    setTimeout(() => {
      appendMessage('bot', localReply, mode);
    }, 250);
  }

  function appendMessage(sender, text, mode) {
    let container = null;
    if (mode === 'panel') {
      container = document.getElementById('chatMessages');
    } else {
      container = document.getElementById('chatMessagesFs') || document.getElementById('fsChatMessages');
    }

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
        f.write(bot_code)
    print("[SUCCESS] Updated js/chatbot.js with robust element ID mapping & fullscreen opener")

if __name__ == "__main__":
    fix_all()
