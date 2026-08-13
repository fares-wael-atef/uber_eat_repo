// Login Page Logic
(function () {
  const CREDENTIALS = { username: 'wael atef', password: '0000' };

  // Create particles
  const particlesEl = document.getElementById('particles');
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

  // Toggle password visibility
  const pwInput = document.getElementById('password');
  const toggleBtn = document.getElementById('togglePw');
  const eyeShow = document.getElementById('eyeShow');
  const eyeHide = document.getElementById('eyeHide');

  toggleBtn.addEventListener('click', () => {
    const isPass = pwInput.type === 'password';
    pwInput.type = isPass ? 'text' : 'password';
    eyeShow.style.display = isPass ? 'none' : '';
    eyeHide.style.display = isPass ? '' : 'none';
  });

  // Form submission
  const form = document.getElementById('loginForm');
  const loginBtn = document.getElementById('loginBtn');
  const btnLoader = document.getElementById('btnLoader');
  const errorMsg = document.getElementById('errorMsg');
  const fgUsername = document.getElementById('fgUsername');
  const fgPassword = document.getElementById('fgPassword');

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const username = document.getElementById('username').value.trim();
    const password = document.getElementById('password').value;

    // Reset state
    errorMsg.classList.remove('visible');
    fgUsername.classList.remove('has-error');
    fgPassword.classList.remove('has-error');

    // Show loading
    loginBtn.classList.add('loading');
    btnLoader.classList.add('visible');
    loginBtn.disabled = true;

    setTimeout(() => {
      if (username === CREDENTIALS.username && password === CREDENTIALS.password) {
        // Success: set auth flag, animate card out and redirect
        sessionStorage.setItem('alibaba_authed', '1');
        document.getElementById('loginCard').style.animation = 'slideUp 0.4s cubic-bezier(0.4,0,1,1) reverse both';
        setTimeout(() => { window.location.href = 'dashboard.html'; }, 350);
      } else {
        // Error
        errorMsg.classList.add('visible');
        if (username !== CREDENTIALS.username) fgUsername.classList.add('has-error');
        if (password !== CREDENTIALS.password) fgPassword.classList.add('has-error');
        loginBtn.classList.remove('loading');
        btnLoader.classList.remove('visible');
        loginBtn.disabled = false;
      }
    }, 900);
  });
})();
