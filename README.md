# Ali Baba's Shawarma — Operations Dashboard

A comprehensive restaurant analytics dashboard for **Ali Baba's Shawarma** chain in Toronto, Canada. Built with vanilla HTML/CSS/JavaScript and powered by **amCharts 5** for beautiful, animated visualizations.

---

## Features

- **Secure Login** — Username/password authentication
- **Collapsible Sidebar** — Navigation with icons and minimize/maximize
- **Dark Mode** — Full light/dark theme toggle with smooth transitions
- **8 Dashboard Sections:**
  - Overview — KPI cards + key charts
  - Orders — Hourly distribution, ticket size, delivery time
  - Revenue — Daily trends, branch payouts, fee breakdown
  - Downtime — Branch downtime, causes, availability scores
  - Ratings — Customer scores, menu items, feedback tags
  - Order Accuracy — Issue types, branch issues, top problem items
  - Branches — Radar comparison, scorecard, courier wait times
  - Calendar — Day-by-day performance view with detail panels
- **AI Chatbot** — Powered by OpenRouter (GPT-4o mini), with full dataset context and file upload support (CSV, PDF, TXT)
- **amCharts 5** — Animated, interactive charts with click-to-drill-down
- **Responsive Design** — Works on desktop and mobile

---

## Login Credentials

| Field    | Value     |
|----------|-----------|
| Username | wael atef |
| Password | 0000      |

---

## Project Structure

```
AliBaba_Dashboard/
├── index.html          # Login page
├── dashboard.html      # Main dashboard
├── css/
│   ├── login.css       # Login page styles
│   └── dashboard.css   # Dashboard styles (light + dark)
├── js/
│   ├── login.js        # Login logic
│   ├── data.js         # Dataset aggregates & context
│   ├── charts.js       # amCharts 5 visualizations (29 charts)
│   ├── calendar.js     # Interactive calendar
│   ├── chatbot.js      # AI chatbot (OpenRouter)
│   └── dashboard.js    # Main controller
└── data/
    └── csv/            # Source CSV files (for reference)
```

---

## Running the Project

The dashboard requires a local HTTP server (not just opening HTML files directly in a browser, due to browser security policies for module loading).

### Option 1 — Python (Recommended, no install needed)

If you have Python 3 (check with `python3 --version`):

```bash
cd /Users/mac/Downloads/AliBaba_Dashboard
python3 -m http.server 8080
```

Then open your browser and go to:
```
http://localhost:8080
```

### Option 2 — Python 2

```bash
cd /Users/mac/Downloads/AliBaba_Dashboard
python -m SimpleHTTPServer 8080
```

Then open: `http://localhost:8080`

### Option 3 — Node.js `http-server`

If you have Node.js installed:

```bash
npx http-server /Users/mac/Downloads/AliBaba_Dashboard -p 8080 -o
```

This will automatically open the browser.

### Option 4 — VS Code Live Server

1. Open the `AliBaba_Dashboard` folder in VS Code
2. Install the **Live Server** extension
3. Right-click `index.html` → **Open with Live Server**

---

## Stopping the Server

Press `Ctrl + C` in the terminal to stop the server.

---

## Data Sources

All data is from the `data_set` folder (July 2026, Toronto, Canada):

| Category           | Files Used                                      |
|--------------------|-------------------------------------------------|
| Orders             | Order history Jul 1-27, 2026.csv                |
| Revenue / Payouts  | Payment details Jul 1-29, 2026.csv              |
| Downtime           | Shop availability report Jul 1-27, 2026.csv     |
| Store Pauses       | Pause details Jul 1-27, 2026.csv                |
| Customer Reviews   | Customer and delivery reviews Jul 1-27, 2026.csv|
| Menu Item Reviews  | Menu item reviews Jul 1-27, 2026.csv            |
| Order Accuracy     | Inaccurate orders + Top inaccurate items        |

---

## Branches (9 Toronto Locations)

1. Danforth
2. Queen St E
3. Dundas & Bloor
4. Dundas & University
5. Bloor & Islington
6. Bloor & Lansdowne
7. Lawrence & Weston
8. Kipling Ave
9. Steeles

---

## Technology Stack

| Technology     | Purpose                          |
|----------------|----------------------------------|
| HTML5 / CSS3   | Structure and styling            |
| Vanilla JS     | Application logic                |
| amCharts 5     | Interactive animated charts      |
| OpenRouter API | AI chatbot (GPT-4o mini)         |
| PDF.js         | PDF parsing in chatbot           |
| PapaParse      | CSV parsing in chatbot           |
| Google Fonts   | Inter typeface                   |

---

## AI Chatbot Usage

The chatbot is accessible via the blue button in the bottom-right corner.

**Capabilities:**
- Answer any question about the dashboard data
- Analyze uploaded CSV, PDF, or text files
- Provide actionable insights and recommendations
- Root cause analysis for downtime and order issues

**Example questions:**
- "Which branch has the highest downtime?"
- "What is the main cause of inaccurate orders?"
- "How does Danforth compare to Steeles in revenue?"
- "What are the peak ordering hours?"
- Upload a CSV file and ask: "Analyze this data and compare it with July performance"
