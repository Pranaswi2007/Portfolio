/* ===== PRANASWI CHEMBETI PORTFOLIO — SCRIPT.JS ===== */

/* ---- Custom Cursor ---- */
// Native cursor used — no custom cursor code needed

/* ---- Particle Canvas ---- */
const canvas = document.getElementById('particle-canvas');
const ctx = canvas.getContext('2d');
let particles = [];
let animFrameId;

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener('resize', resizeCanvas);

class Particle {
    constructor() {
        this.reset();
    }
    reset() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 1.5 + 0.5;
        this.speedX = (Math.random() - 0.5) * 0.4;
        this.speedY = (Math.random() - 0.5) * 0.4;
        this.opacity = Math.random() * 0.5 + 0.1;
        this.color = Math.random() > 0.6
            ? `rgba(168, 85, 247, ${this.opacity})`
            : Math.random() > 0.5
            ? `rgba(6, 182, 212, ${this.opacity})`
            : `rgba(236, 72, 153, ${this.opacity})`;
    }
    update() {
        this.x += this.speedX;
        this.y += this.speedY;
        if (this.x < 0 || this.x > canvas.width || this.y < 0 || this.y > canvas.height) {
            this.reset();
        }
    }
    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.fill();
    }
}

function initParticles() {
    particles = [];
    const count = Math.min(120, Math.floor(window.innerWidth / 12));
    for (let i = 0; i < count; i++) {
        particles.push(new Particle());
    }
}

function connectParticles() {
    for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
            const dx = particles[i].x - particles[j].x;
            const dy = particles[i].y - particles[j].y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            if (dist < 100) {
                const alpha = (1 - dist / 100) * 0.08;
                ctx.beginPath();
                ctx.moveTo(particles[i].x, particles[i].y);
                ctx.lineTo(particles[j].x, particles[j].y);
                ctx.strokeStyle = `rgba(124, 58, 237, ${alpha})`;
                ctx.lineWidth = 0.5;
                ctx.stroke();
            }
        }
    }
}

function animateParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach(p => { p.update(); p.draw(); });
    connectParticles();
    animFrameId = requestAnimationFrame(animateParticles);
}

initParticles();
animateParticles();
window.addEventListener('resize', initParticles);

/* ---- Typed Name Animation ---- */
function typeText(element, text, speed = 80) {
    let i = 0;
    element.textContent = '';
    return new Promise(resolve => {
        const timer = setInterval(() => {
            if (i < text.length) {
                element.textContent += text[i];
                i++;
            } else {
                clearInterval(timer);
                resolve();
            }
        }, speed);
    });
}

const typedName = document.getElementById('typed-name');
if (typedName) {
    setTimeout(() => typeText(typedName, 'Pranaswi Chembeti', 80), 600);
}

/* ---- Role Rotator ---- */
const roles = [
    'CSE Student 🎓',
    'DSA Enthusiast 💡',
    'Data Analyst 📊',
    'Cloud Learner ☁️',
    'Infosys Intern 🚀',
    'Problem Solver 🧩',
];
let roleIndex = 0;
let charIndex = 0;
let isDeleting = false;
const roleEl = document.getElementById('role-text');

function typeRole() {
    if (!roleEl) return;
    const current = roles[roleIndex];
    if (isDeleting) {
        roleEl.textContent = current.substring(0, charIndex--);
    } else {
        roleEl.textContent = current.substring(0, charIndex++);
    }
    let delay = isDeleting ? 50 : 90;
    if (!isDeleting && charIndex > current.length) {
        delay = 1800;
        isDeleting = true;
    } else if (isDeleting && charIndex < 0) {
        isDeleting = false;
        charIndex = 0;
        roleIndex = (roleIndex + 1) % roles.length;
        delay = 300;
    }
    setTimeout(typeRole, delay);
}
setTimeout(typeRole, 1400);

/* ---- Navbar Scroll ---- */
const navbar = document.getElementById('navbar');
const navLinks = document.querySelectorAll('.nav-link');
const sections = document.querySelectorAll('section[id]');

window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }

    // Active nav link
    let current = '';
    sections.forEach(sec => {
        const top = sec.offsetTop - 100;
        if (window.scrollY >= top) current = sec.getAttribute('id');
    });
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === '#' + current) {
            link.classList.add('active');
        }
    });
});

/* ---- Hamburger Menu ---- */
const hamburger = document.getElementById('hamburger');
const navLinksContainer = document.querySelector('.nav-links');

hamburger.addEventListener('click', () => {
    navLinksContainer.classList.toggle('open');
    hamburger.classList.toggle('open');
});

navLinksContainer.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
        navLinksContainer.classList.remove('open');
        hamburger.classList.remove('open');
    });
});

/* ---- Scroll Reveal ---- */
function addRevealClasses() {
    const toReveal = [
        '.about-card',
        '.skills-category',
        '.timeline-item',
        '.achievement-main',
        '.hackathon-card',
        '.contact-card',
        '.contact-form-card',
    ];
    toReveal.forEach(selector => {
        document.querySelectorAll(selector).forEach((el, i) => {
            if (!el.classList.contains('reveal')) {
                el.classList.add('reveal');
                el.style.transitionDelay = `${i * 0.1}s`;
            }
        });
    });
}
addRevealClasses();

const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, { threshold: 0.1, rootMargin: '0px 0px -60px 0px' });

document.querySelectorAll('.reveal, .reveal-left, .reveal-right').forEach(el => {
    revealObserver.observe(el);
});

/* ---- Animated Counter ---- */
function animateCounter(el) {
    const target = parseInt(el.getAttribute('data-target'));
    let current = 0;
    const duration = 1500;
    const step = target / (duration / 16);
    const timer = setInterval(() => {
        current += step;
        if (current >= target) {
            el.textContent = target;
            clearInterval(timer);
        } else {
            el.textContent = Math.floor(current);
        }
    }, 16);
}

const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.querySelectorAll('.stat-number').forEach(el => {
                if (!el.dataset.animated) {
                    el.dataset.animated = 'true';
                    animateCounter(el);
                }
            });
        }
    });
}, { threshold: 0.5 });

const statCard = document.querySelector('.stat-card');
if (statCard) counterObserver.observe(statCard);

/* ---- Confetti ---- */
function createConfetti() {
    const container = document.getElementById('confetti');
    if (!container) return;
    const colors = ['#7C3AED', '#06B6D4', '#F59E0B', '#EC4899', '#22C55E', '#F97316'];
    for (let i = 0; i < 20; i++) {
        const piece = document.createElement('div');
        piece.style.cssText = `
            position: absolute;
            width: ${Math.random() * 8 + 4}px;
            height: ${Math.random() * 8 + 4}px;
            background: ${colors[Math.floor(Math.random() * colors.length)]};
            border-radius: ${Math.random() > 0.5 ? '50%' : '2px'};
            top: 50%;
            left: 50%;
            opacity: 0;
            pointer-events: none;
        `;
        container.appendChild(piece);
    }
}
createConfetti();

const trophyObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const pieces = entry.target.querySelectorAll('#confetti div');
            pieces.forEach((piece, i) => {
                setTimeout(() => {
                    const angle = (i / pieces.length) * Math.PI * 2;
                    const distance = 60 + Math.random() * 80;
                    const tx = Math.cos(angle) * distance;
                    const ty = Math.sin(angle) * distance - 40;
                    piece.animate([
                        { opacity: 0, transform: 'translate(-50%, -50%) scale(0)' },
                        { opacity: 1, transform: `translate(calc(-50% + ${tx}px), calc(-50% + ${ty}px)) scale(1) rotate(${Math.random() * 360}deg)` },
                        { opacity: 0, transform: `translate(calc(-50% + ${tx * 1.3}px), calc(-50% + ${ty + 40}px)) scale(0.5) rotate(${Math.random() * 720}deg)` }
                    ], {
                        duration: 1200 + Math.random() * 600,
                        delay: i * 40,
                        easing: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
                        iterations: Infinity,
                        direction: 'normal'
                    });
                }, i * 30);
            });
        }
    });
}, { threshold: 0.5 });

const achievementSection = document.querySelector('.achievement-main');
if (achievementSection) trophyObserver.observe(achievementSection);

/* ---- Contact Form ---- */
const form = document.getElementById('contact-form');
if (form) {
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const btn = form.querySelector('button[type="submit"]');
        const original = btn.innerHTML;
        btn.innerHTML = '<i class="fas fa-check"></i> <span>Message Sent!</span>';
        btn.style.background = 'linear-gradient(135deg, #22C55E, #16A34A)';
        btn.disabled = true;

        setTimeout(() => {
            btn.innerHTML = original;
            btn.style.background = '';
            btn.disabled = false;
            form.reset();
        }, 3000);
    });
}

/* ---- Smooth Section Entrance ---- */
window.addEventListener('load', () => {
    document.querySelectorAll('.section-header').forEach((el, i) => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
    });

    const headerObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                headerObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.3 });

    document.querySelectorAll('.section-header').forEach(el => headerObserver.observe(el));
});

/* ---- Parallax Shapes ---- */
window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    const shapes = document.querySelectorAll('.shape');
    shapes.forEach((shape, i) => {
        const speed = 0.05 + i * 0.03;
        shape.style.transform = `translateY(${scrollY * speed}px)`;
    });
});

/* ---- Card Tilt Effect ---- */
document.querySelectorAll('.hackathon-card, .timeline-card, .achievement-main').forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const rotateX = ((y - centerY) / centerY) * -5;
        const rotateY = ((x - centerX) / centerX) * 5;
        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-8px)`;
    });
    card.addEventListener('mouseleave', () => {
        card.style.transform = '';
    });
});

/* ---- Glow on Mouse Move (global) ---- */
document.addEventListener('mousemove', (e) => {
    const cards = document.querySelectorAll('.about-card, .skills-category, .contact-form-card, .contact-card');
    cards.forEach(card => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        card.style.setProperty('--mouse-x', x + 'px');
        card.style.setProperty('--mouse-y', y + 'px');
    });
});

/* ---- Orbit Items Hover Pause ---- */
document.querySelectorAll('.orbit-item').forEach(item => {
    item.addEventListener('mouseenter', () => {
        document.querySelectorAll('.avatar-ring').forEach(ring => {
            ring.style.animationPlayState = 'paused';
        });
    });
    item.addEventListener('mouseleave', () => {
        document.querySelectorAll('.avatar-ring').forEach(ring => {
            ring.style.animationPlayState = 'running';
        });
    });
});

/* ---- Scroll to top on logo click ---- */
document.querySelector('.nav-logo').addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

console.log(`
╔═══════════════════════════════════╗
║   Pranaswi Chembeti — Portfolio   ║
║   Built with ❤️ and clean code    ║
║   No shortcuts. Just skills.      ║
╚═══════════════════════════════════╝
`);
