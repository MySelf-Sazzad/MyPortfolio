/* ============================================
   PRELOADER
   ============================================ */
window.addEventListener('load', () => {
    const preloader = document.getElementById('preloader');
    setTimeout(() => {
        preloader.classList.add('hidden');
        document.body.style.overflow = '';
        triggerInitialReveals();
    }, 2200);
});

function triggerInitialReveals() {
    const heroReveals = document.querySelectorAll('.hero .reveal');
    heroReveals.forEach(el => el.classList.add('revealed'));
}

/* ============================================
   CUSTOM CURSOR
   ============================================ */
const cursorInner = document.getElementById('cursorInner');
const cursorOuter = document.getElementById('cursorOuter');
let mouseX = 0, mouseY = 0;
let outerX = 0, outerY = 0;

if (window.matchMedia('(pointer: fine)').matches) {
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        cursorInner.style.left = mouseX + 'px';
        cursorInner.style.top = mouseY + 'px';
    });

    function animateOuterCursor() {
        outerX += (mouseX - outerX) * 0.12;
        outerY += (mouseY - outerY) * 0.12;
        cursorOuter.style.left = outerX + 'px';
        cursorOuter.style.top = outerY + 'px';
        requestAnimationFrame(animateOuterCursor);
    }
    animateOuterCursor();

    const interactiveElements = document.querySelectorAll('a, button, input, textarea, .project-card, .blog-card, .hobby-card, .social-card, .filter-btn');
    interactiveElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursorInner.classList.add('hover');
            cursorOuter.classList.add('hover');
        });
        el.addEventListener('mouseleave', () => {
            cursorInner.classList.remove('hover');
            cursorOuter.classList.remove('hover');
        });
    });
} else {
    cursorInner.style.display = 'none';
    cursorOuter.style.display = 'none';
}

/* ============================================
   SCROLL PROGRESS BAR
   ============================================ */
const scrollProgress = document.getElementById('scrollProgress');

window.addEventListener('scroll', () => {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrollPercent = (scrollTop / docHeight) * 100;
    scrollProgress.style.width = scrollPercent + '%';
});

/* ============================================
   NAVBAR
   ============================================ */
const navbar = document.getElementById('navbar');
const navToggle = document.getElementById('navToggle');
const navMenu = document.getElementById('navMenu');
const navLinks = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
    if (window.scrollY > 80) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

navToggle.addEventListener('click', () => {
    navToggle.classList.toggle('active');
    navMenu.classList.toggle('open');
});

navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navToggle.classList.remove('active');
        navMenu.classList.remove('open');
    });
});

navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href');
        const target = document.querySelector(targetId);
        if (target) {
            const offset = 80;
            const top = target.getBoundingClientRect().top + window.scrollY - offset;
            window.scrollTo({ top, behavior: 'smooth' });
        }
    });
});

const sections = document.querySelectorAll('section[id]');

function updateActiveLink() {
    const scrollY = window.scrollY + 150;
    sections.forEach(section => {
        const top = section.offsetTop;
        const height = section.offsetHeight;
        const id = section.getAttribute('id');
        const link = document.querySelector(`.nav-link[data-section="${id}"]`);
        if (link) {
            if (scrollY >= top && scrollY < top + height) {
                navLinks.forEach(l => l.classList.remove('active'));
                link.classList.add('active');
            }
        }
    });
}

window.addEventListener('scroll', updateActiveLink);

/* ============================================
   TYPING EFFECT
   ============================================ */
const typingElement = document.getElementById('typingText');
const typingTexts = [
    'Website Developer',
    'Software Engineer',
    'Frontend Developer',
    'Backend Developer',
    'Full Stack Developer',
    'Gamer',
];

let textIndex = 0;
let charIndex = 0;
let isDeleting = false;
let typingSpeed = 80;

function typeEffect() {
    const currentText = typingTexts[textIndex];

    if (isDeleting) {
        typingElement.textContent = currentText.substring(0, charIndex - 1);
        charIndex--;
        typingSpeed = 40;
    } else {
        typingElement.textContent = currentText.substring(0, charIndex + 1);
        charIndex++;
        typingSpeed = 80;
    }

    if (!isDeleting && charIndex === currentText.length) {
        isDeleting = true;
        typingSpeed = 2000;
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        textIndex = (textIndex + 1) % typingTexts.length;
        typingSpeed = 400;
    }

    setTimeout(typeEffect, typingSpeed);
}

setTimeout(typeEffect, 2500);

/* ============================================
   PARTICLE SYSTEM
   ============================================ */
const canvas = document.getElementById('particlesCanvas');
const ctx = canvas.getContext('2d');
let particles = [];
const particleCount = 70;
const connectionDistance = 150;
let particleMouseX = 0, particleMouseY = 0;

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

resizeCanvas();
window.addEventListener('resize', resizeCanvas);

document.addEventListener('mousemove', (e) => {
    particleMouseX = e.clientX;
    particleMouseY = e.clientY;
});

class Particle {
    constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.vx = (Math.random() - 0.5) * 0.5;
        this.vy = (Math.random() - 0.5) * 0.5;
        this.size = Math.random() * 2 + 0.5;
        this.opacity = Math.random() * 0.5 + 0.1;
    }

    update() {
        this.x += this.vx;
        this.y += this.vy;

        const dx = this.x - particleMouseX;
        const dy = this.y - particleMouseY;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 120) {
            const force = (120 - dist) / 120;
            this.x += (dx / dist) * force * 1.5;
            this.y += (dy / dist) * force * 1.5;
        }

        if (this.x < 0) this.x = canvas.width;
        if (this.x > canvas.width) this.x = 0;
        if (this.y < 0) this.y = canvas.height;
        if (this.y > canvas.height) this.y = 0;
    }

    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(0, 240, 255, ${this.opacity})`;
        ctx.fill();
    }
}

for (let i = 0; i < particleCount; i++) {
    particles.push(new Particle());
}

function drawConnections() {
    for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
            const dx = particles[i].x - particles[j].x;
            const dy = particles[i].y - particles[j].y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            if (dist < connectionDistance) {
                const opacity = (1 - dist / connectionDistance) * 0.15;
                ctx.beginPath();
                ctx.moveTo(particles[i].x, particles[i].y);
                ctx.lineTo(particles[j].x, particles[j].y);
                ctx.strokeStyle = `rgba(0, 240, 255, ${opacity})`;
                ctx.lineWidth = 0.5;
                ctx.stroke();
            }
        }
    }
}

function animateParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach(p => {
        p.update();
        p.draw();
    });
    drawConnections();
    requestAnimationFrame(animateParticles);
}

animateParticles();

/* ============================================
   FLOATING CODE LINES
   ============================================ */
const codeLinesContainer = document.getElementById('codeLines');
const codeSnippets = [
    'const developer = new Engineer("Sazzad");',
    'function createAmazingUI(design) { return build(design); }',
    'class Portfolio extends React.Component {}',
    'export default function App() { return <Hero />; }',
    'async function fetchData(url) { const res = await fetch(url); }',
    'def fibonacci(n): return n if n <= 1 else fib(n-1) + fib(n-2)',
    'SELECT * FROM projects WHERE status = "completed";',
    'git commit -m "feat: add portfolio website"',
    'npm run build && npm run deploy',
    'console.log("Hello, World!");',
    'import { useState } from "react";',
    'app.listen(3000, () => console.log("Server running"));',
    'const skills = ["HTML", "CSS", "JS", "PHP", "Node"];',
    'docker compose up -d --build',
    'if (passion === true) { keepCoding(); }',
];

function createCodeLine() {
    const line = document.createElement('div');
    line.className = 'code-line';
    line.textContent = codeSnippets[Math.floor(Math.random() * codeSnippets.length)];
    line.style.left = Math.random() * 90 + '%';
    line.style.animationDuration = (Math.random() * 15 + 15) + 's';
    line.style.animationDelay = Math.random() * 5 + 's';
    line.style.fontSize = (Math.random() * 4 + 11) + 'px';
    codeLinesContainer.appendChild(line);

    const duration = parseFloat(line.style.animationDuration) * 1000 + parseFloat(line.style.animationDelay) * 1000;
    setTimeout(() => {
        if (line.parentNode) line.parentNode.removeChild(line);
    }, duration + 1000);
}

for (let i = 0; i < 15; i++) {
    createCodeLine();
}

setInterval(createCodeLine, 3000);

/* ============================================
   SCROLL REVEAL (IntersectionObserver)
   ============================================ */
const revealElements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-up');

const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
        }
    });
}, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
});

revealElements.forEach(el => revealObserver.observe(el));

/* ============================================
   COUNTER ANIMATION
   ============================================ */
const statNumbers = document.querySelectorAll('.stat-number');

const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const el = entry.target;
            const target = parseInt(el.getAttribute('data-target'));
            animateCounter(el, target);
            counterObserver.unobserve(el);
        }
    });
}, { threshold: 0.5 });

statNumbers.forEach(el => counterObserver.observe(el));

function animateCounter(el, target) {
    let current = 0;
    const increment = target / 60;
    const duration = 2000;
    const stepTime = duration / 60;

    function step() {
        current += increment;
        if (current >= target) {
            el.innerHTML = target + '<span class="plus">+</span>';
            return;
        }
        el.textContent = Math.floor(current);
        setTimeout(step, stepTime);
    }
    step();
}

/* ============================================
   SKILL BARS ANIMATION
   ============================================ */
const skillBars = document.querySelectorAll('.skill-bar-fill');

const skillObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const el = entry.target;
            const width = el.getAttribute('data-width');
            setTimeout(() => {
                el.style.width = width + '%';
            }, 200);
            skillObserver.unobserve(el);
        }
    });
}, { threshold: 0.3 });

skillBars.forEach(el => skillObserver.observe(el));

/* ============================================
   PROJECT FILTERING
   ============================================ */
const filterBtns = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card');

filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const filter = btn.getAttribute('data-filter');

        projectCards.forEach(card => {
            const category = card.getAttribute('data-category');
            if (filter === 'all' || category === filter) {
                card.classList.remove('hidden');
                card.style.animation = 'fadeInUp 0.5s ease forwards';
            } else {
                card.classList.add('hidden');
            }
        });
    });
});

const styleSheet = document.createElement('style');
styleSheet.textContent = `
    @keyframes fadeInUp {
        from { opacity: 0; transform: translateY(20px); }
        to { opacity: 1; transform: translateY(0); }
    }
`;
document.head.appendChild(styleSheet);

/* ============================================
   MAGNETIC BUTTON EFFECT
   ============================================ */
const magneticBtns = document.querySelectorAll('.magnetic-btn');

magneticBtns.forEach(btn => {
    btn.addEventListener('mousemove', (e) => {
        const rect = btn.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        btn.style.transform = `translate(${x * 0.2}px, ${y * 0.2}px)`;
    });

    btn.addEventListener('mouseleave', () => {
        btn.style.transform = 'translate(0, 0)';
    });
});

/* ============================================
   BACK TO TOP BUTTON
   ============================================ */
const backToTop = document.getElementById('backToTop');

window.addEventListener('scroll', () => {
    if (window.scrollY > 500) {
        backToTop.classList.add('visible');
    } else {
        backToTop.classList.remove('visible');
    }
});

backToTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

/* ============================================
   EMAILJS SETUP - REAL EMAIL SENDING
   ============================================*/
   
// 1. Replace with your EmailJS Public Key
emailjs.init("sPytOBlIL5Bs8rJlf");

// 2. Replace with your EmailJS Service ID (e.g. service_abc123xyz)
const EMAILJS_SERVICE_ID = "service_sazzad";

// 3. Replace with your EmailJS Template ID (e.g. template_abc123xyz)
const EMAILJS_TEMPLATE_ID = "template_htgfkcb";

// Your email address where messages will be received
const RECIPIENT_EMAIL = "sazzad.m.rahman.nix@gmail.com";

/* ============================================
   CONTACT FORM - SENDS REAL EMAIL
   ============================================ */
const contactForm = document.getElementById('contactForm');
const formStatus = document.getElementById('formStatus');

contactForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const message = document.getElementById('message').value.trim();

    // Validate all fields are filled
    if (!name || !email || !message) {
        formStatus.textContent = 'Please fill in all fields.';
        formStatus.className = 'form-status error';
        return;
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        formStatus.textContent = 'Please enter a valid email address.';
        formStatus.className = 'form-status error';
        return;
    }

    // Show loading state on button
    const submitBtn = contactForm.querySelector('button[type="submit"]');
    const originalText = submitBtn.innerHTML;
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
    submitBtn.disabled = true;
    formStatus.textContent = '';
    formStatus.className = 'form-status';

    // Send real email via EmailJS
    // These variables map to {{from_name}}, {{from_email}}, {{message}} in your template
    emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, {
        from_name: name,
        from_email: email,
        message: message,
        to_name: "Sazzad M Rahman",
        to_email: RECIPIENT_EMAIL,
        reply_to: email
    })
    .then(function(response) {
        // Success - email has been sent to your inbox
        console.log('Email sent successfully!', response.status, response.text);
        formStatus.textContent = '✓ Message sent successfully! I\'ll get back to you soon.';
        formStatus.className = 'form-status success';
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
        contactForm.reset();

        setTimeout(() => {
            formStatus.textContent = '';
        }, 5000);
    })
    .catch(function(error) {
        // Failed - something went wrong
        console.error('EmailJS Error Details:', error);
        formStatus.textContent = '❌ Failed to send. Please email directly: ' + RECIPIENT_EMAIL;
        formStatus.className = 'form-status error';
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
    });
});

/* ============================================
   PARALLAX EFFECT ON HERO GLOWS
   ============================================ */
const heroGlows = document.querySelectorAll('.hero-glow');

window.addEventListener('mousemove', (e) => {
    const x = (e.clientX / window.innerWidth - 0.5) * 2;
    const y = (e.clientY / window.innerHeight - 0.5) * 2;

    heroGlows.forEach((glow, i) => {
        const speed = i === 0 ? 30 : -20;
        glow.style.transform = `translate(${x * speed}px, ${y * speed}px)`;
    });
});

/* ============================================
   TILT EFFECT ON PROJECT CARDS
   ============================================ */
const tiltCards = document.querySelectorAll('.project-card');

tiltCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const rotateX = (y - centerY) / centerY * -5;
        const rotateY = (x - centerX) / centerX * 5;
        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-8px)`;
    });

    card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
    });
});

/* ============================================
   NEWSLETTER FORM (Footer)
   ============================================ */
const newsletterForm = document.querySelector('.newsletter-form');
if (newsletterForm) {
    newsletterForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const input = newsletterForm.querySelector('input');
        if (input.value.trim()) {
            input.value = '';
            alert('Thanks for subscribing!');
        }
    });
}

/* ============================================
   DETAIL MODALS
   ============================================ */
function openProjectModal() {
    document.getElementById('projectModal').classList.add('active');
    document.body.style.overflow = 'hidden';
}

function openJourneyModal() {
    document.getElementById('journeyModal').classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeModal(modalId) {
    document.getElementById(modalId).classList.remove('active');
    document.body.style.overflow = '';
}

document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        document.querySelectorAll('.detail-modal.active').forEach(modal => {
            modal.classList.remove('active');
        });
        document.body.style.overflow = '';
    }
});