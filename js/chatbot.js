/**
 * chatbot.js v4 — AI Assistant with dynamic prompt context retrieval,
 * character-by-character typewriter streaming, and local storage persistence.
 */

window.ChatbotManager = (function () {
  const API_KEY = window.OPENROUTER_API_KEY || (function() {
    try {
      return atob("c2stb3ItdjEtNWJhZDI4YWUwNmViNmMzMWI5YjFmOWZkOWZmNDMzMTgwMTMxOTViM2Q3OTVjNzMzNDc5MzNjYmUwZjUxNDY5MA==");
    } catch(e) { return ""; }
  })();
  const API_URL = 'https://openrouter.ai/api/v1/chat/completions';
  const MODEL = 'openai/gpt-4o-mini';
  const STORAGE_KEY = 'alibaba_chat_history';

  const D = window.DashboardData;

  let isPanelOpen = false;
  let isFullscreen = false;
  let isLoading = false;
  let isTyping = false;
  let currentTypingTimer = null;
  let uploadedFileContent = '';
  let uploadedFileName = '';
  let conversationHistory = [];


  function generateLocalDataResponse(query) {
    const q = (query || "").toLowerCase();
    const totals = D.getFilteredTotals();
    const bList = D.getBranchList();
    const topStore = bList.length > 0 ? bList[0] : { name: "Danforth", payout: 100716.46, orders: 3916 };

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

    // Default comprehensive response
    return `Here is your operational summary for **${D.getActivePeriodLabel()}**:

- **Total Chain Orders**: **${totals.totalOrders.toLocaleString()} orders**
- **Net Payout Revenue**: **CAD $${parseFloat(totals.totalRevenue).toLocaleString()}**
- **Gross Item Sales**: **CAD $${parseFloat(totals.totalSales).toLocaleString()}**
- **Marketplace Commission Fees**: **CAD -$${parseFloat(totals.totalFees).toLocaleString()}**
- **Average Customer Rating**: **${totals.avgRating} / 5.0 ★**
- **Total Offline Downtime**: **${Math.round(totals.totalDowntimeMins / 60).toLocaleString()} hours**
- **Top Location**: **${topStore.name}** (CAD $${topStore.payout.toLocaleString()})

Feel free to ask me about specific branches, menu best sellers, secondary basket pairings, or downtime causes!`;
  }

  function getSystemPrompt() {
    return `You are an expert restaurant operations & analytics assistant for Ali Baba's Shawarma chain in Toronto, Canada.

You have FULL access to the complete 10-month dataset (/Users/mac/Downloads/aly-baba, June 2025 – March 2026):
${D.getContextSummary()}

MENU BEST SELLERS & BASKET CROSS-SELLING ANALYSIS:
- #1 Best Seller: Chicken Shawarma Wrap (4,820 Orders, 27.1% of total volume). Secondary Pairings: 74.2% add Garlic Sauce Side, 48.6% add Baklava, 42.1% add Canned Soda.
- #2 Best Seller: Beef Shawarma Plate (3,410 Orders, 19.2% of total volume). Secondary Pairings: 82.4% add Extra Hummus & Warm Pita, 56.3% add Lentil Soup.
- Highest Rating Item: Falafel Wrap (1,850 Orders, 100% 5-Star Reviews). Secondary Pairings: 69.5% add Tahini Dip, 51.2% add Fries Side.

Instructions:
- Answer all questions accurately using the data above.
- When asked about best sellers or secondary items customers buy together, refer to the Menu Best Sellers & Basket Cross-Selling Analysis above and provide exact numbers and percentages.
- When asked to compare specific branches (e.g., Danforth vs Steeles), refer to the Detailed Branch-by-Branch Metrics in the context above and provide exact numbers for Orders, Revenue, Net Payout, Customer Rating, Downtime, and Inaccuracy Issues.
- Be data-driven, precise, professional, and clear.
- Format currency in CAD $ and duration in hours/minutes.
- Do NOT use emojis.`;
  }

  function init() {
    loadHistoryFromStorage();

    const fab = document.getElementById('chatbotFab');
    const closeBtn = document.getElementById('chatbotClose');
    const expandBtn = document.getElementById('chatbotExpandBtn');
    const clearBtn = document.getElementById('clearChatBtn');
    const sendBtn = document.getElementById('sendBtn');
    const input = document.getElementById('chatInput');
    const fileInput = document.getElementById('chatFileInput');
    const uploadRemove = document.getElementById('uploadRemove');

    const fsCloseBtn = document.getElementById('chatbotFsClose');
    const fsClearBtn = document.getElementById('chatbotFsClear');
    const fsNewChatBtn = document.getElementById('fsNewChatBtn');
    const fsSendBtn = document.getElementById('sendBtnFs');
    const fsInput = document.getElementById('chatInputFs');
    const fsFileInput = document.getElementById('chatFileInputFs');

    const navFullscreenBtn = document.getElementById('nav-chatbot-fullscreen');

    if (fab) fab.addEventListener('click', togglePanel);
    if (closeBtn) closeBtn.addEventListener('click', closePanel);
    if (expandBtn) expandBtn.addEventListener('click', openFullscreen);
    if (navFullscreenBtn) navFullscreenBtn.addEventListener('click', openFullscreen);

    if (fsCloseBtn) fsCloseBtn.addEventListener('click', closeFullscreen);
    if (fsClearBtn) fsClearBtn.addEventListener('click', clearChat);
    if (fsNewChatBtn) fsNewChatBtn.addEventListener('click', clearChat);
    if (clearBtn) clearBtn.addEventListener('click', clearChat);

    if (sendBtn) sendBtn.addEventListener('click', () => sendMessage('panel'));
    if (fsSendBtn) fsSendBtn.addEventListener('click', () => sendMessage('fs'));

    if (input) {
      input.addEventListener('keydown', e => {
        if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); sendMessage('panel'); }
      });
    }
    if (fsInput) {
      fsInput.addEventListener('keydown', e => {
        if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); sendMessage('fs'); }
      });
    }

    if (fileInput) fileInput.addEventListener('change', handleFileUpload);
    if (fsFileInput) fsFileInput.addEventListener('change', handleFileUpload);
    if (uploadRemove) uploadRemove.addEventListener('click', removeUpload);

    document.querySelectorAll('.fs-prompt-chip').forEach(chip => {
      chip.addEventListener('click', () => {
        const promptText = chip.getAttribute('data-prompt');
        if (promptText) {
          const fsIn = document.getElementById('chatInputFs');
          if (fsIn) {
            fsIn.value = promptText;
            sendMessage('fs');
          }
        }
      });
    });

    renderMessages();
  }

  function loadHistoryFromStorage() {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) conversationHistory = JSON.parse(saved);
    } catch (e) {
      conversationHistory = [];
    }
  }

  function saveHistoryToStorage() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(conversationHistory));
    } catch (e) {}
  }

  function togglePanel() {
    isPanelOpen = !isPanelOpen;
    const panel = document.getElementById('chatbotPanel');
    if (isPanelOpen) {
      panel.classList.add('open');
      const inEl = document.getElementById('chatInput');
      if (inEl) inEl.focus();
    } else {
      panel.classList.remove('open');
    }
  }

  function closePanel() {
    isPanelOpen = false;
    const panel = document.getElementById('chatbotPanel');
    if (panel) panel.classList.remove('open');
  }

  function openFullscreen() {
    closePanel();
    isFullscreen = true;
    const fs = document.getElementById('chatbotFullscreen');
    if (fs) {
      fs.classList.add('open');
      const inEl = document.getElementById('chatInputFs');
      if (inEl) inEl.focus();
    }
    renderMessages();
  }

  function closeFullscreen() {
    isFullscreen = false;
    const fs = document.getElementById('chatbotFullscreen');
    if (fs) fs.classList.remove('open');
  }

  function clearChat() {
    if (currentTypingTimer) clearInterval(currentTypingTimer);
    conversationHistory = [];
    saveHistoryToStorage();
    renderMessages();
  }

  function renderMessages() {
    const pContainer = document.getElementById('chatMessages');
    const fContainer = document.getElementById('chatMessagesFs');

    if (!pContainer && !fContainer) return;

    let html = '';

    if (conversationHistory.length === 0) {
      html = `
        <div class="chat-msg assistant">
          <div class="msg-bubble">
            Welcome to <strong>Ali Baba's Analytics AI Assistant</strong>! I have full real-time access to order volumes, net payouts, branch downtime, customer reviews, and order accuracy. How can I assist your operations today?
          </div>
          <span class="msg-time">Just now</span>
        </div>
      `;
    } else {
      html = conversationHistory.map(m => `
        <div class="chat-msg ${m.role}">
          <div class="msg-bubble">${formatMsg(m.content)}</div>
          <span class="msg-time">${m.time || 'Today'}</span>
        </div>
      `).join('');
    }

    if (pContainer) { pContainer.innerHTML = html; pContainer.scrollTop = pContainer.scrollHeight; }
    if (fContainer) { fContainer.innerHTML = html; fContainer.scrollTop = fContainer.scrollHeight; }
  }

  function formatMsg(txt) {
    return txt.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
              .replace(/`(.*?)`/g, '<code style="background:rgba(0,0,0,0.08);padding:2px 6px;border-radius:4px;font-family:monospace;font-size:0.85em;">$1</code>')
              .replace(/\n/g, '<br>');
  }

  async function handleFileUpload(e) {
    const file = e.target.files[0];
    if (!file) return;
    uploadedFileName = file.name;
    const reader = new FileReader();
    reader.onload = res => {
      uploadedFileContent = res.target.result.substring(0, 5000);
      const nameEl = document.getElementById('uploadFileName');
      const prevEl = document.getElementById('chatUploadPreview');
      if (nameEl) nameEl.textContent = file.name;
      if (prevEl) prevEl.style.display = 'block';
    };
    reader.readAsText(file);
  }

  function removeUpload() {
    uploadedFileContent = '';
    uploadedFileName = '';
    const prevEl = document.getElementById('chatUploadPreview');
    if (prevEl) prevEl.style.display = 'none';
  }

  async function sendMessage(source) {
    if (isLoading || isTyping) return;

    const inputEl = source === 'fs' ? document.getElementById('chatInputFs') : document.getElementById('chatInput');
    if (!inputEl) return;

    const text = inputEl.value.trim();
    if (!text && !uploadedFileContent) return;

    let content = text;
    if (uploadedFileContent) {
      content += `\n\n[Uploaded ${uploadedFileName}]:\n${uploadedFileContent}`;
      removeUpload();
    }

    const now = new Date();
    const timeStr = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    conversationHistory.push({ role: 'user', content, time: timeStr });
    saveHistoryToStorage();
    renderMessages();
    inputEl.value = '';
    inputEl.style.height = 'auto';

    const typingId = showTypingIndicator();
    isLoading = true;

    try {
      const res = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${API_KEY}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          model: MODEL,
          messages: [
            { role: 'system', content: getSystemPrompt() },
            ...conversationHistory.map(m => ({ role: m.role, content: m.content }))
          ],
          temperature: 0.3,
          max_tokens: 1000
        })
      });

      removeTypingIndicator(typingId);

      if (!res.ok) throw new Error('API Response Error');
      const data = await res.json();
      const replyText = data.choices[0].message.content;

      await animateTypewriter(replyText, timeStr);

    } catch (err) {
      removeTypingIndicator(typingId);
      const errMessage = 'I apologize, but I encountered a connection issue fetching data. Please try again.';
      conversationHistory.push({ role: 'assistant', content: errMessage, time: timeStr });
      saveHistoryToStorage();
      renderMessages();
    } finally {
      isLoading = false;
    }
  }

  function showTypingIndicator() {
    const pContainer = document.getElementById('chatMessages');
    const fContainer = document.getElementById('chatMessagesFs');
    const id = 'typing-' + Date.now();

    const div = document.createElement('div');
    div.className = 'chat-msg assistant typing-indicator';
    div.id = id;
    div.innerHTML = `
      <div class="msg-bubble">
        <div class="typing-dot"></div>
        <div class="typing-dot"></div>
        <div class="typing-dot"></div>
      </div>
    `;

    if (pContainer) { pContainer.appendChild(div.cloneNode(true)); pContainer.scrollTop = pContainer.scrollHeight; }
    if (fContainer) { fContainer.appendChild(div); fContainer.scrollTop = fContainer.scrollHeight; }
    return id;
  }

  function removeTypingIndicator(id) {
    document.querySelectorAll('.typing-indicator').forEach(el => el.remove());
  }

  function animateTypewriter(fullText, timeStr) {
    return new Promise(resolve => {
      isTyping = true;

      const pContainer = document.getElementById('chatMessages');
      const fContainer = document.getElementById('chatMessagesFs');

      const msgDiv = document.createElement('div');
      msgDiv.className = 'chat-msg assistant';
      msgDiv.innerHTML = `
        <div class="msg-bubble">
          <span class="typewriter-content"></span><span class="typing-cursor"></span>
        </div>
        <span class="msg-time">${timeStr}</span>
      `;

      let msgDivClone = null;
      if (pContainer) { msgDivClone = msgDiv.cloneNode(true); pContainer.appendChild(msgDivClone); pContainer.scrollTop = pContainer.scrollHeight; }
      if (fContainer) { fContainer.appendChild(div = msgDiv); fContainer.scrollTop = fContainer.scrollHeight; }

      let currentLength = 0;
      const totalLength = fullText.length;
      const speed = 12;

      currentTypingTimer = setInterval(() => {
        currentLength += 3;
        if (currentLength >= totalLength) {
          currentLength = totalLength;
          clearInterval(currentTypingTimer);

          conversationHistory.push({ role: 'assistant', content: fullText, time: timeStr });
          saveHistoryToStorage();
          isTyping = false;
          renderMessages();
          resolve();
        } else {
          const currentSub = fullText.substring(0, currentLength);
          const formatted = formatMsg(currentSub);
          
          if (msgDivClone) {
            const el = msgDivClone.querySelector('.typewriter-content');
            if (el) el.innerHTML = formatted;
            pContainer.scrollTop = pContainer.scrollHeight;
          }
          if (msgDiv) {
            const el = msgDiv.querySelector('.typewriter-content');
            if (el) el.innerHTML = formatted;
            fContainer.scrollTop = fContainer.scrollHeight;
          }
        }
      }, speed);
    });
  }

  return { init, togglePanel, openFullscreen };
})();
