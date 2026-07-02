// ===== Navbar scroll effect =====
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 50);
});

// ===== Mobile navigation toggle =====
const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');

navToggle.addEventListener('click', () => {
  navToggle.classList.toggle('active');
  navLinks.classList.toggle('active');
});

navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    navToggle.classList.remove('active');
    navLinks.classList.remove('active');
  });
});

// ===== Scroll reveal animations =====
const observerOptions = {
  threshold: 0.08,
  rootMargin: '0px 0px -60px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

document.querySelectorAll(
  '.skill-category, .timeline-item, .project-featured, .project-card, .edu-card, .cert-card, .about-text, .about-stats, .contact-content, .stat-card, .section-header'
).forEach((el, i) => {
  el.classList.add('fade-in');
  el.style.transitionDelay = `${Math.min(i * 0.06, 0.4)}s`;
  observer.observe(el);
});

// ===== Animated stat counters =====
function animateCounters() {
  document.querySelectorAll('.stat-number').forEach(counter => {
    const target = parseFloat(counter.getAttribute('data-target'));
    const isDecimal = target % 1 !== 0;
    const duration = 1500;
    const start = performance.now();

    function update(now) {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = target * eased;

      counter.textContent = isDecimal ? current.toFixed(2) : Math.floor(current);

      if (progress < 1) {
        requestAnimationFrame(update);
      } else {
        counter.textContent = isDecimal ? target.toFixed(2) : target;
      }
    }

    requestAnimationFrame(update);
  });
}

const statsObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      animateCounters();
      statsObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.3 });

const statsSection = document.querySelector('.about-stats');
if (statsSection) {
  statsObserver.observe(statsSection);
}

// ===== Project filter tabs =====
const filterBtns = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card');
const projectFeatured = document.querySelector('.project-featured');

filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    filterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    const filter = btn.getAttribute('data-filter');

    // Filter the featured card
    if (projectFeatured) {
      const featuredCat = projectFeatured.getAttribute('data-category') || '';
      if (filter === 'all' || featuredCat.includes(filter)) {
        projectFeatured.classList.remove('hidden');
        projectFeatured.style.animation = 'fadeUp 0.4s ease forwards';
      } else {
        projectFeatured.classList.add('hidden');
      }
    }

    projectCards.forEach(card => {
      const category = card.getAttribute('data-category') || '';
      if (filter === 'all' || category.includes(filter)) {
        card.classList.remove('hidden');
        card.style.animation = 'fadeUp 0.4s ease forwards';
      } else {
        card.classList.add('hidden');
      }
    });
  });
});

// ===== Active nav link highlighting on scroll =====
const sections = document.querySelectorAll('section[id]');
const navLinksAll = document.querySelectorAll('.nav-links a:not(.nav-cta)');

window.addEventListener('scroll', () => {
  const scrollY = window.scrollY + 120;

  let currentSection = '';
  sections.forEach(section => {
    const top = section.offsetTop;
    const height = section.offsetHeight;
    if (scrollY >= top && scrollY < top + height) {
      currentSection = section.getAttribute('id');
    }
  });

  navLinksAll.forEach(link => {
    const href = link.getAttribute('href');
    if (href === `#${currentSection}`) {
      link.classList.add('nav-active');
    } else {
      link.classList.remove('nav-active');
    }
  });
});

// ===== Smooth scroll for all anchor links =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  });
});
