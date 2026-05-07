/* ===========================
   CUSTOM CURSOR
   =========================== */
const cursor = document.getElementById('cursor');
const cursorTrail = document.getElementById('cursorTrail');

let mouseX = 0, mouseY = 0;
let trailX = 0, trailY = 0;

document.addEventListener('mousemove', (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;
  cursor.style.left = mouseX + 'px';
  cursor.style.top = mouseY + 'px';
});

function animateTrail() {
  trailX += (mouseX - trailX) * 0.12;
  trailY += (mouseY - trailY) * 0.12;
  cursorTrail.style.left = trailX + 'px';
  cursorTrail.style.top = trailY + 'px';
  requestAnimationFrame(animateTrail);
}
animateTrail();

/* ===========================
   NAVIGATION SCROLL
   =========================== */
const nav = document.getElementById('nav');

window.addEventListener('scroll', () => {
  if (window.scrollY > 60) {
    nav.classList.add('scrolled');
  } else {
    nav.classList.remove('scrolled');
  }
});

/* ===========================
   SMOOTH SCROLL
   =========================== */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

/* ===========================
   REVEAL ON SCROLL
   =========================== */
const revealElements = document.querySelectorAll('.reveal');

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      // Stagger animation for sibling elements
      const siblings = entry.target.parentElement.querySelectorAll('.reveal');
      let delay = 0;
      siblings.forEach((sib, idx) => {
        if (sib === entry.target) delay = idx * 80;
      });
      setTimeout(() => {
        entry.target.classList.add('visible');
      }, delay);
      revealObserver.unobserve(entry.target);
    }
  });
}, {
  threshold: 0.1,
  rootMargin: '0px 0px -60px 0px'
});

revealElements.forEach(el => revealObserver.observe(el));

/* ===========================
   HERO TEXT ANIMATION
   =========================== */
window.addEventListener('load', () => {
  const heroElements = document.querySelectorAll('.hero .reveal');
  heroElements.forEach((el, i) => {
    setTimeout(() => {
      el.classList.add('visible');
    }, 200 + i * 150);
  });
});

/* ===========================
   ACTIVE NAV LINK
   =========================== */
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-link');

const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const id = entry.target.getAttribute('id');
      navLinks.forEach(link => {
        link.style.color = '';
        if (link.getAttribute('href') === `#${id}`) {
          link.style.color = 'var(--text)';
        }
      });
    }
  });
}, { threshold: 0.5 });

sections.forEach(s => sectionObserver.observe(s));

/* ===========================
   SKILL CHIP HOVER EFFECT
   =========================== */
document.querySelectorAll('.skill-chips span').forEach(chip => {
  chip.addEventListener('mouseenter', () => {
    chip.style.transform = 'translateY(-2px)';
    chip.style.boxShadow = '0 4px 12px rgba(124,106,245,0.2)';
  });
  chip.addEventListener('mouseleave', () => {
    chip.style.transform = '';
    chip.style.boxShadow = '';
  });
});

/* ===========================
   PROJECT CARD TILT
   =========================== */
document.querySelectorAll('.project-card').forEach(card => {
  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = (y - centerY) / centerY * -3;
    const rotateY = (x - centerX) / centerX * 3;
    card.style.transform = `translateY(-4px) perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
  });

  card.addEventListener('mouseleave', () => {
    card.style.transform = '';
    card.style.transition = 'transform 0.5s cubic-bezier(0.4, 0, 0.2, 1), border-color 0.3s';
  });
});

/* ===========================
   SCROLL PROGRESS
   =========================== */
const progressBar = document.createElement('div');
progressBar.style.cssText = `
  position: fixed;
  top: 0; left: 0;
  height: 2px;
  background: linear-gradient(90deg, var(--accent), var(--accent2));
  z-index: 9998;
  transition: width 0.1s linear;
  width: 0%;
`;
document.body.appendChild(progressBar);

window.addEventListener('scroll', () => {
  const scrollTop = window.scrollY;
  const docHeight = document.documentElement.scrollHeight - window.innerHeight;
  const progress = (scrollTop / docHeight) * 100;
  progressBar.style.width = `${Math.min(progress, 100)}%`;
});

/* ===========================
   TYPEWRITER FOR HERO ROLE
   =========================== */
const roles = ['Software Engineer', 'Backend Developer', 'API Architect', 'Cloud Engineer'];
let roleIndex = 0;
let charIndex = 0;
let isDeleting = false;
const tagEl = document.querySelector('.tag-text');

if (tagEl) {
  const originalText = tagEl.textContent;

  function typeRole() {
    const current = roles[roleIndex];
    if (isDeleting) {
      charIndex--;
    } else {
      charIndex++;
    }

    const display = `${current.substring(0, charIndex)}`;
    tagEl.textContent = `${display} · Backend · Cloud · APIs`;

    let speed = isDeleting ? 50 : 100;

    if (!isDeleting && charIndex === current.length) {
      speed = 2000;
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      roleIndex = (roleIndex + 1) % roles.length;
      speed = 400;
    }

    setTimeout(typeRole, speed);
  }

  // Start typewriter after page loads
  setTimeout(typeRole, 3000);
}

/* ===========================
   CONTACT EMAIL COPY
   =========================== */
const emailLink = document.querySelector('a[href^="mailto"]');
if (emailLink) {
  emailLink.addEventListener('click', (e) => {
    // Just let the mailto work
    const indicator = document.createElement('span');
    indicator.textContent = 'Opening mail client...';
    indicator.style.cssText = `
      position: fixed;
      bottom: 24px;
      right: 24px;
      background: var(--accent);
      color: white;
      padding: 12px 20px;
      border-radius: 8px;
      font-family: var(--font-mono);
      font-size: 0.8rem;
      z-index: 9999;
      animation: slideIn 0.3s ease;
    `;
    document.body.appendChild(indicator);
    setTimeout(() => indicator.remove(), 2500);
  });
}

/* CSS for toast animation */
const style = document.createElement('style');
style.textContent = `
  @keyframes slideIn {
    from { opacity: 0; transform: translateY(10px); }
    to { opacity: 1; transform: translateY(0); }
  }
`;
document.head.appendChild(style);

console.log(
  `%c Ruthvik Reddy's Portfolio %c Built with ♥ and clean code `,
  'background:#7c6af5;color:#fff;font-family:monospace;padding:8px 16px;border-radius:6px 0 0 6px;font-size:14px;',
  'background:#131320;color:#7c6af5;font-family:monospace;padding:8px 16px;border:1px solid #7c6af5;border-radius:0 6px 6px 0;font-size:14px;'
);
