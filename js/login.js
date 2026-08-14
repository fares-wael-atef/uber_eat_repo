// Login Page Controller
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
