// ════════════════════════ CUSTOM CURSOR ════════════════════════
const curDot = document.getElementById('cur-dot');
const curRing = document.getElementById('cur-ring');
let mouseX = 0, mouseY = 0;

document.addEventListener('mousemove', (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;
  curDot.style.left = mouseX + 'px';
  curDot.style.top = mouseY + 'px';
  curRing.style.left = mouseX + 'px';
  curRing.style.top = mouseY + 'px';
});

document.addEventListener('mouseover', (e) => {
  if(e.target.tagName === 'A' || e.target.tagName === 'BUTTON') {
    document.body.classList.add('cur-hover');
  }
});

document.addEventListener('mouseout', (e) => {
  if(e.target.tagName === 'A' || e.target.tagName === 'BUTTON') {
    document.body.classList.remove('cur-hover');
  }
});

// ════════════════════════ PAGE LOADER ════════════════════════
window.addEventListener('load', () => {
  const loader = document.getElementById('loader');
  const loaderTxt = document.getElementById('load-txt');
  const loaderBar = document.getElementById('load-bar');
  const loaderPct = document.getElementById('load-pct');
  
  let progress = 0;
  const interval = setInterval(() => {
    progress += Math.random() * 30;
    if(progress > 100) progress = 100;
    
    loaderBar.style.width = progress + '%';
    loaderPct.textContent = Math.floor(progress) + '%';
    
    if(progress === 100) {
      clearInterval(interval);
      loaderTxt.style.transform = 'translateY(-110%)';
      setTimeout(() => {
        loader.style.opacity = '0';
        loader.style.pointerEvents = 'none';
      }, 300);
    }
  }, 100);
});

// ════════════════════════ NAVBAR SCROLL ════════════════════════
const nav = document.getElementById('nav');
let lastScroll = 0;

window.addEventListener('scroll', () => {
  const scrollPos = window.scrollY;
  
  if(scrollPos > 50) {
    nav.classList.add('stuck');
  } else {
    nav.classList.remove('stuck');
  }
  
  lastScroll = scrollPos;
});

// ════════════════════════ MOBILE MENU ════════════════════════
const ham = document.getElementById('ham');
const mobMenu = document.getElementById('mob-menu');
const mobLinks = document.querySelectorAll('.mob-link');

ham.addEventListener('click', () => {
  ham.classList.toggle('is-open');
  mobMenu.classList.toggle('is-open');
});

mobLinks.forEach(link => {
  link.addEventListener('click', () => {
    ham.classList.remove('is-open');
    mobMenu.classList.remove('is-open');
  });
});

// ════════════════════════ SCROLL ANIMATIONS ════════════════════════
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if(entry.isIntersecting) {
      entry.target.classList.add('is-visible');
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.rv').forEach(el => {
  observer.observe(el);
});

// ════════════════════════ ACTIVE NAV LINK ════════════════════════
const navLinks = document.querySelectorAll('.nav-links a');

window.addEventListener('scroll', () => {
  let current = '';
  
  document.querySelectorAll('section').forEach(section => {
    const sectionTop = section.offsetTop;
    if(scrollPos >= sectionTop - 200) {
      current = section.getAttribute('id');
    }
  });
  
  navLinks.forEach(link => {
    link.classList.remove('is-active');
    if(link.getAttribute('href').slice(1) === current) {
      link.classList.add('is-active');
    }
  });
});

// ════════════════════════ HERO TEXT ANIMATION ════════════════════════
const splitLines = document.querySelectorAll('.split-inner');
let splitDelay = 0.3;

splitLines.forEach((line, index) => {
  gsap.from(line, {
    duration: 0.8,
    y: 110,
    delay: splitDelay + (index * 0.1),
    ease: 'power3.out'
  });
});

// Hero description and actions fade in
gsap.to('.hero-desc', {
  duration: 0.8,
  opacity: 1,
  delay: 1.2,
  ease: 'power2.out'
});

gsap.to('.hero-actions', {
  duration: 0.8,
  opacity: 1,
  delay: 1.4,
  ease: 'power2.out'
});

gsap.to('.photo-main', {
  duration: 0.8,
  opacity: 1,
  x: 0,
  delay: 1.3,
  ease: 'power3.out'
});

gsap.to('.hero-stats', {
  duration: 0.8,
  opacity: 1,
  delay: 1.5,
  ease: 'power2.out'
});

// ════════════════════════ SKILLS ANIMATION ════════════════════════
const skillRows = document.querySelectorAll('.skill-row');

const skillObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if(entry.isIntersecting) {
      entry.target.classList.add('animated');
      skillObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });

skillRows.forEach(row => {
  const targetW = row.getAttribute('data-target') || '70%';
  row.style.setProperty('--target-w', targetW);
  skillObserver.observe(row);
});

// ════════════════════════ SCROLL TO TOP ════════════════════════
const btt = document.getElementById('btt');

window.addEventListener('scroll', () => {
  if(window.scrollY > 300) {
    btt.classList.add('visible');
  } else {
    btt.classList.remove('visible');
  }
});

btt.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

// ════════════════════════ PROJECT CARDS ══════��═════════════════
const projCards = document.querySelectorAll('.proj-card');

projCards.forEach(card => {
  card.addEventListener('click', (e) => {
    if(e.target.closest('.proj-arrow')) {
      const projIdx = card.getAttribute('data-proj');
      openProjectModal(projIdx);
    }
  });
});

// ════════════════════════ SMOOTH SCROLL ════════════════════════
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if(target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  });
});

// ════════════════════════ HAMBURGER MENU ANIMATION ════════════════════════
ham.addEventListener('click', function() {
  this.classList.toggle('is-open');
  mobMenu.classList.toggle('is-open');
});

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
  if(!e.target.closest('#ham') && !e.target.closest('#mob-menu')) {
    ham.classList.remove('is-open');
    mobMenu.classList.remove('is-open');
  }
});
