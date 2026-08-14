#!/usr/bin/env python3
"""
build_clean_login_flow.py —
Configures 2-step Login & Dashboard workflow:
1. index.html: Login page with demo credentials helper and 1-click Quick Login.
2. dashboard.html: Analytics dashboard with authentication check & working Logout button redirecting to index.html.
3. vercel.json: Clean static routing.
"""

import os, json

def build_login_flow():
    # 1. Update index.html with Login UI + Demo Quick Login button
    index_html = """<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Ali Baba's Shawarma — Operations Dashboard Sign In</title>
  <meta name="description" content="Restaurant operations analytics dashboard for Ali Baba's Shawarma chain in Toronto." />
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap" rel="stylesheet" />
  <link rel="stylesheet" href="css/login.css" />
</head>
<body>
  <div class="login-bg">
    <div class="login-particles" id="particles"></div>
    <div class="login-card" id="loginCard">
      <div class="login-logo">
        <div class="logo-icon">
          <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
            <rect width="40" height="40" rx="12" fill="url(#logoGrad)"/>
            <path d="M8 28 L20 12 L32 28" stroke="white" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
            <circle cx="20" cy="22" r="4" fill="white"/>
            <defs>
              <linearGradient id="logoGrad" x1="0" y1="0" x2="40" y2="40">
                <stop offset="0%" stop-color="#1A73E8"/>
                <stop offset="100%" stop-color="#0D47A1"/>
              </linearGradient>
            </defs>
          </svg>
        </div>
        <div class="logo-text">
          <h1>Ali Baba's</h1>
          <span>Operations Dashboard</span>
        </div>
      </div>
      <div class="login-divider"></div>
      <p class="login-subtitle">Sign in to access your restaurant analytics</p>
      
      <form id="loginForm" class="login-form" autocomplete="off">
        <div class="form-group" id="fgUsername">
          <label for="username">Username</label>
          <div class="input-wrapper">
            <span class="input-icon">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                <circle cx="12" cy="7" r="4"/>
              </svg>
            </span>
            <input type="text" id="username" name="username" placeholder="Enter username (or click Quick Sign In)" autocomplete="off" />
          </div>
        </div>
        <div class="form-group" id="fgPassword">
          <label for="password">Password</label>
          <div class="input-wrapper">
            <span class="input-icon">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
                <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
              </svg>
            </span>
            <input type="password" id="password" name="password" placeholder="Enter password" autocomplete="off" />
            <button type="button" class="toggle-pw" id="togglePw" aria-label="Toggle password visibility">
              <svg id="eyeShow" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                <circle cx="12" cy="12" r="3"/>
              </svg>
              <svg id="eyeHide" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="display:none">
                <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/>
                <line x1="1" y1="1" x2="23" y2="23"/>
              </svg>
            </button>
          </div>
        </div>
        <div class="error-msg" id="errorMsg">Invalid username or password. Please try again.</div>
        
        <button type="submit" class="login-btn" id="loginBtn">
          <span class="btn-text">Sign In</span>
          <div class="btn-loader" id="btnLoader"></div>
        </button>

        <button type="button" id="quickLoginBtn" style="margin-top: 10px; width: 100%; padding: 10px; border-radius: 10px; background: rgba(26,115,232,0.1); color: #1A73E8; border: 1px solid rgba(26,115,232,0.3); font-weight: 700; cursor: pointer; transition: all 0.2s;">
          ⚡ Quick Demo Sign In (1-Click Access)
        </button>
      </form>
      <div class="login-footer">Toronto, Canada &bull; Uber Eats Partner Analytics</div>
    </div>
  </div>
  <script src="js/login.js"></script>
</body>
</html>
"""
    with open("/Users/mac/Downloads/AliBaba_Dashboard/index.html", "w") as f:
        f.write(index_html)
    print("[SUCCESS] Updated index.html with Login UI and Quick Sign In button")

    # 2. Update js/login.js
    login_js = """// Login Page Controller
(function () {
  const particlesEl = document.getElementById('particles');
  if (particlesEl) {
    for (let i = 0; i < 20; i++) {
      const p = document.createElement('div');
      p.className = 'particle';
      const size = Math.random() * 60 + 10;
      p.style.cssText = `
        width:${size}px; height:${size}px;
        left:${Math.random()*100}%;
        animation-duration:${Math.random()*15+10}s;
        animation-delay:${Math.random()*10}s;
      `;
      particlesEl.appendChild(p);
    }
  }

  const pwInput = document.getElementById('password');
  const toggleBtn = document.getElementById('togglePw');
  const eyeShow = document.getElementById('eyeShow');
  const eyeHide = document.getElementById('eyeHide');

  if (toggleBtn) {
    toggleBtn.addEventListener('click', () => {
      const isPass = pwInput.type === 'password';
      pwInput.type = isPass ? 'text' : 'password';
      eyeShow.style.display = isPass ? 'none' : '';
      eyeHide.style.display = isPass ? '' : 'none';
    });
  }

  const form = document.getElementById('loginForm');
  const loginBtn = document.getElementById('loginBtn');
  const quickLoginBtn = document.getElementById('quickLoginBtn');
  const btnLoader = document.getElementById('btnLoader');
  const errorMsg = document.getElementById('errorMsg');

  function executeSignIn() {
    sessionStorage.setItem('alibaba_authed', 'true');
    loginBtn.classList.add('loading');
    if (btnLoader) btnLoader.classList.add('visible');
    loginBtn.disabled = true;

    setTimeout(() => {
      const card = document.getElementById('loginCard');
      if (card) card.style.animation = 'slideUp 0.4s cubic-bezier(0.4,0,1,1) reverse both';
      setTimeout(() => { window.location.href = 'dashboard.html'; }, 350);
    }, 600);
  }

  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      executeSignIn();
    });
  }

  if (quickLoginBtn) {
    quickLoginBtn.addEventListener('click', (e) => {
      e.preventDefault();
      document.getElementById('username').value = 'wael atef';
      document.getElementById('password').value = '0000';
      executeSignIn();
    });
  }
})();
"""
    with open("/Users/mac/Downloads/AliBaba_Dashboard/js/login.js", "w") as f:
        f.write(login_js)
    print("[SUCCESS] Updated js/login.js")

    # 3. Update js/dashboard.js auth check and logout handler
    dashboard_js_path = "/Users/mac/Downloads/AliBaba_Dashboard/js/dashboard.js"
    with open(dashboard_js_path) as f:
        dcode = f.read()

    # Update checkAuth
    dcode = dcode.replace(
        "function checkAuth() {\n    sessionStorage.setItem('alibaba_authed', 'true');\n  }",
        "function checkAuth() {\n    if (!sessionStorage.getItem('alibaba_authed')) {\n      window.location.href = 'index.html';\n    }\n  }"
    )

    # Update initLogout
    old_logout = """  function initLogout() {
    const logoutBtn = document.getElementById('logoutBtn');
    if (logoutBtn) {
      logoutBtn.addEventListener('click', (e) => {
        e.preventDefault();
        sessionStorage.setItem('alibaba_authed', 'true');
        alert("Logged Out — Administrator Session Reset Successfully.");
      });
    }
  }"""

    new_logout = """  function initLogout() {
    const logoutBtn = document.getElementById('logoutBtn');
    if (logoutBtn) {
      logoutBtn.addEventListener('click', (e) => {
        e.preventDefault();
        sessionStorage.removeItem('alibaba_authed');
        window.location.href = 'index.html';
      });
    }
  }"""

    dcode = dcode.replace(old_logout, new_logout)

    with open(dashboard_js_path, "w") as f:
        f.write(dcode)
    print("[SUCCESS] Updated js/dashboard.js checkAuth and initLogout")

    # 4. Clean vercel.json
    vercel_path = "/Users/mac/Downloads/AliBaba_Dashboard/vercel.json"
    with open(vercel_path, "w") as f:
        f.write('{\n  "cleanUrls": true\n}\n')
    print("[SUCCESS] Updated vercel.json")

if __name__ == "__main__":
    build_login_flow()
