// mobile menu toggle
let menuIcon = document.querySelector('#menu-icon');
let navbar = document.querySelector('.navbar');

menuIcon.onclick = () => {
  menuIcon.classList.toggle('fa-xmark');
  navbar.classList.toggle('navbar-active');
};

document.querySelectorAll('.navbar a').forEach(link => {
  link.addEventListener('click', () => {
    menuIcon.classList.remove('fa-xmark');
    navbar.classList.remove('navbar-active');
  });
});

// scrollspy - highlight active nav link
let sections = document.querySelectorAll('section');
let navLinks = document.querySelectorAll('.navbar a');

window.addEventListener('scroll', () => {
  let top = window.scrollY;

  sections.forEach(sec => {
    let offset = sec.offsetTop - 150;
    let height = sec.offsetHeight;
    let id = sec.getAttribute('id');

    if (top >= offset && top < offset + height) {
      navLinks.forEach(link => link.classList.remove('active'));
      let activeLink = document.querySelector(`.navbar a[href="#${id}"]`);
      if (activeLink) activeLink.classList.add('active');
    }
  });

  let header = document.querySelector('.header');
  header.classList.toggle('sticky', top > 100);

  menuIcon.classList.remove('fa-xmark');
  navbar.classList.remove('navbar-active');
});

// read more toggle
const readMoreBtn = document.querySelector('.read-more-btn');
const readMoreText = document.querySelector('.read-more-text');

if (readMoreBtn) {
  readMoreBtn.addEventListener('click', () => {
    readMoreText.classList.toggle('read-more-text--show');
    readMoreBtn.textContent = readMoreText.classList.contains('read-more-text--show')
      ? 'Read Less'
      : 'Read More';
  });
}

// scrollreveal animations
if (typeof ScrollReveal !== 'undefined') {
  const sr = ScrollReveal({
    distance: '40px',
    duration: 1000,
    reset: false,
  });

  sr.reveal('.home-content', { origin: 'left', delay: 100 });
  sr.reveal('.home-img', { origin: 'right', delay: 200 });
  sr.reveal('.about-img', { origin: 'left', delay: 100 });
  sr.reveal('.about-content', { origin: 'right', delay: 200 });
  sr.reveal('.skills-group', { origin: 'bottom', delay: 100, interval: 150 });
  sr.reveal('.services-box', { origin: 'bottom', delay: 100, interval: 150 });
  sr.reveal('.portfolio-box', { origin: 'bottom', delay: 100, interval: 120 });
  sr.reveal('.contact form', { origin: 'bottom', delay: 100 });
}

// hero network background animation
(function () {
  const canvas = document.getElementById('net-bg');
  if (!canvas) return;

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const ctx = canvas.getContext('2d');
  let width, height, points;

  function resize() {
    const home = document.querySelector('.home');
    width = canvas.width = home.offsetWidth;
    height = canvas.height = home.offsetHeight;
    const count = Math.floor((width * height) / 22000);
    points = Array.from({ length: count }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.3,
      vy: (Math.random() - 0.5) * 0.3,
    }));
  }

  function draw() {
    ctx.clearRect(0, 0, width, height);

    points.forEach(p => {
      p.x += p.vx;
      p.y += p.vy;
      if (p.x < 0 || p.x > width) p.vx *= -1;
      if (p.y < 0 || p.y > height) p.vy *= -1;
    });

    for (let i = 0; i < points.length; i++) {
      for (let j = i + 1; j < points.length; j++) {
        const dx = points[i].x - points[j].x;
        const dy = points[i].y - points[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 140) {
          ctx.strokeStyle = `rgba(56, 189, 248, ${1 - dist / 140})`;
          ctx.lineWidth = 0.6;
          ctx.beginPath();
          ctx.moveTo(points[i].x, points[i].y);
          ctx.lineTo(points[j].x, points[j].y);
          ctx.stroke();
        }
      }
      ctx.fillStyle = 'rgba(125, 211, 252, 0.8)';
      ctx.beginPath();
      ctx.arc(points[i].x, points[i].y, 1.6, 0, Math.PI * 2);
      ctx.fill();
    }

    if (!prefersReducedMotion) {
      requestAnimationFrame(draw);
    }
  }

  window.addEventListener('resize', resize);
  resize();
  draw();
})();