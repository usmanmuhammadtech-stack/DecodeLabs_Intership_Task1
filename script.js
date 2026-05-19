/* ===== LOADER ===== */
window.addEventListener('load', () => {
  setTimeout(() => {
    document.getElementById('loader').classList.add('hidden');
  }, 900);
});

/* ===== CUSTOM CURSOR ===== */
const dot = document.querySelector('.cursor-dot');
const ring = document.querySelector('.cursor-ring');
document.addEventListener('mousemove', (e) => {
  dot.style.left = e.clientX + 'px';
  dot.style.top = e.clientY + 'px';
  setTimeout(() => {
    ring.style.left = e.clientX + 'px';
    ring.style.top = e.clientY + 'px';
  }, 60);
});
document.querySelectorAll('a, button, .service-card, .work-card').forEach(el => {
  el.addEventListener('mouseenter', () => {
    ring.style.width = '56px'; ring.style.height = '56px';
    ring.style.borderColor = 'rgba(99,102,241,0.9)';
    dot.style.transform = 'translate(-50%,-50%) scale(0.5)';
  });
  el.addEventListener('mouseleave', () => {
    ring.style.width = '36px'; ring.style.height = '36px';
    ring.style.borderColor = 'rgba(99,102,241,0.6)';
    dot.style.transform = 'translate(-50%,-50%) scale(1)';
  });
});

/* ===== HEADER SCROLL ===== */
const header = document.getElementById('header');
window.addEventListener('scroll', () => {
  header.classList.toggle('scrolled', window.scrollY > 40);
  updateActiveNav();
});

/* ===== HAMBURGER ===== */
const hamburger = document.getElementById('hamburger');
const mobileNav = document.getElementById('mobileNav');
hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('open');
  mobileNav.classList.toggle('open');
});
document.querySelectorAll('.mob-link').forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('open');
    mobileNav.classList.remove('open');
  });
});

/* ===== ACTIVE NAV ===== */
function updateActiveNav() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');
  let current = '';
  sections.forEach(section => {
    if (window.scrollY >= section.offsetTop - 100) current = section.id;
  });
  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === '#' + current) link.classList.add('active');
  });
}

/* ===== REVEAL ON SCROLL ===== */
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      setTimeout(() => entry.target.classList.add('visible'), i * 80);
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });
document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

/* ===== COUNTER ANIMATION ===== */
function animateCounter(el) {
  const target = parseInt(el.dataset.target);
  const step = target / (1800 / 16);
  let current = 0;
  const timer = setInterval(() => {
    current += step;
    if (current >= target) { el.textContent = target; clearInterval(timer); }
    else el.textContent = Math.floor(current);
  }, 16);
}
const statsObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      document.querySelectorAll('.stat-num').forEach(animateCounter);
      statsObserver.disconnect();
    }
  });
}, { threshold: 0.5 });
const statsSection = document.querySelector('.hero-stats');
if (statsSection) statsObserver.observe(statsSection);

/* ===== CARD TILT ===== */
document.querySelectorAll('.service-card, .work-card').forEach(card => {
  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    card.style.transform = `translateY(-6px) rotateX(${-y * 6}deg) rotateY(${x * 6}deg)`;
  });
  card.addEventListener('mouseleave', () => { card.style.transform = ''; });
});

/* ===== ✅ CONTACT FORM — FORMSPREE REAL SUBMISSION ===== */
const contactForm = document.getElementById('contactForm');
const sendBtn     = document.getElementById('sendBtn');
const formSuccess = document.getElementById('formSuccess');
const formError   = document.getElementById('formError');

contactForm.addEventListener('submit', async (e) => {
  e.preventDefault();

  // Reset messages
  formSuccess.style.display = 'none';
  formError.style.display   = 'none';

  // Button loading state
  sendBtn.disabled = true;
  sendBtn.innerHTML = 'Sending... <i class="fa-solid fa-spinner fa-spin"></i>';

  try {
    const response = await fetch(contactForm.action, {
      method: 'POST',
      body: new FormData(contactForm),
      headers: { 'Accept': 'application/json' }
    });

    if (response.ok) {
      // ✅ SUCCESS — email jayegi usmanmuhammad.tech@gmail.com pe
      formSuccess.style.display = 'flex';
      sendBtn.innerHTML = 'Sent! <i class="fa-solid fa-check"></i>';
      contactForm.reset();

      setTimeout(() => {
        sendBtn.innerHTML = 'Send Message <i class="fa-solid fa-paper-plane"></i>';
        sendBtn.disabled = false;
        formSuccess.style.display = 'none';
      }, 5000);

    } else {
      throw new Error('failed');
    }

  } catch (err) {
    // ❌ ERROR
    formError.style.display = 'flex';
    sendBtn.innerHTML = 'Send Message <i class="fa-solid fa-paper-plane"></i>';
    sendBtn.disabled = false;
  }
});