// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Navbar background change on scroll
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Active navigation link
window.addEventListener('scroll', function() {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');
    
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (window.scrollY >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// Project filtering
function filterProjects(category) {
    const projects = document.querySelectorAll('.project-item');
    const buttons = document.querySelectorAll('.project-filter .btn');
    
    // Remove active class from all buttons
    buttons.forEach(btn => btn.classList.remove('active'));
    
    // Add active class to clicked button
    event.target.classList.add('active');
    
    // Filter projects
    projects.forEach(project => {
        if (category === 'all' || project.classList.contains(category)) {
            project.style.display = 'block';
            setTimeout(() => {
                project.style.opacity = '1';
                project.style.transform = 'translateY(0)';
            }, 100);
        } else {
            project.style.opacity = '0';
            project.style.transform = 'translateY(20px)';
            setTimeout(() => {
                project.style.display = 'none';
            }, 300);
        }
    });
}

// Download resume function
function downloadResume() {
    // Create a temporary link element
    const link = document.createElement('a');
    link.href = '#'; // You can replace this with actual resume URL
    link.download = 'Naveen_Kumar_Resume.pdf';
    
    // Show alert for demo purposes
    alert('Resume download would start here. Please upload your resume file and update the link.');
    
    // Uncomment below lines when you have actual resume file
    // document.body.appendChild(link);
    // link.click();
    // document.body.removeChild(link);
}

// Contact form submission

document.getElementById("sheetdb-form").addEventListener("submit", function (e) {
    e.preventDefault();

    const form = e.target;
    const msg = document.getElementById("msg");

    fetch(form.action, {
      method: "POST",
      body: new FormData(form)
    })
    .then(response => {
      msg.innerHTML = "✅ Message sent successfully!";
      setTimeout(() => msg.innerHTML = '', 3000);
      form.reset();
    })
    .catch(error => {
      msg.innerHTML = "❌ Something went wrong!";
      console.error("Error submitting to SheetDB:", error);
    });
    
});


// Scroll animations
function handleScrollAnimations() {
    const elements = document.querySelectorAll('.scroll-animation');
    
    elements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 150;
        
        if (elementTop < window.innerHeight - elementVisible) {
            element.classList.add('animate');
        }
    });
}

// Add scroll animation class to elements
document.addEventListener('DOMContentLoaded', function() {
    const animatedElements = document.querySelectorAll('.service-card, .project-card, .skill-category');
    animatedElements.forEach(element => {
        element.classList.add('scroll-animation');
    });
    
    // Initial check
    handleScrollAnimations();
});

// Listen for scroll events
window.addEventListener('scroll', handleScrollAnimations);

// Typing effect for hero text
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.innerHTML = '';
    
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// Initialize typing effect on page load
document.addEventListener('DOMContentLoaded', function() {
    const heroTitle = document.querySelector('.hero-content h1');
    if (heroTitle) {
        const originalText = heroTitle.textContent;
        setTimeout(() => {
            typeWriter(heroTitle, originalText, 50);
        }, 500);
    }
});

// Particle background effect (optional)
function createParticles() {
    const heroSection = document.querySelector('.hero-section');
    const particlesCount = 50;
    
    for (let i = 0; i < particlesCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.cssText = `
            position: absolute;
            width: 2px;
            height: 2px;
            background: rgba(255, 255, 255, 0.3);
            border-radius: 50%;
            pointer-events: none;
            animation: float ${Math.random() * 3 + 2}s ease-in-out infinite;
            left: ${Math.random() * 100}%;
            top: ${Math.random() * 100}%;
        `;
        heroSection.appendChild(particle);
    }
}

// CSS for particle animation
const style = document.createElement('style');
style.textContent = `
    @keyframes float {
        0%, 100% { transform: translateY(0px) rotate(0deg); }
        50% { transform: translateY(-20px) rotate(180deg); }
    }
    
    .particle {
        animation-delay: ${Math.random() * 2}s;
    }
`;
document.head.appendChild(style);

// Initialize particles
document.addEventListener('DOMContentLoaded', function() {
    setTimeout(createParticles, 1000);
});

// Mobile menu close on link click
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', function() {
        const navbarCollapse = document.querySelector('.navbar-collapse');
        if (navbarCollapse.classList.contains('show')) {
            const bsCollapse = new bootstrap.Collapse(navbarCollapse);
            bsCollapse.hide();
        }
    });
});

// Skill progress animation
function animateSkillBars() {
    const skillBars = document.querySelectorAll('.skill-progress');
    
    skillBars.forEach(bar => {
        const progress = bar.getAttribute('data-progress');
        const progressBar = bar.querySelector('.progress-bar');
        
        if (progressBar) {
            setTimeout(() => {
                progressBar.style.width = progress + '%';
            }, 500);
        }
    });
}

// Counter animation
function animateCounters() {
    const counters = document.querySelectorAll('.stat-item h3');
    
    counters.forEach(counter => {
        const target = parseInt(counter.textContent);
        const duration = 2000;
        const step = target / (duration / 16);
        let current = 0;
        
        const timer = setInterval(() => {
            current += step;
            if (current >= target) {
                current = target;
                clearInterval(timer);
            }
            
            if (counter.textContent.includes('+')) {
                counter.textContent = Math.floor(current) + '+';
            } else if (counter.textContent.includes('.')) {
                counter.textContent = current.toFixed(1);
            } else {
                counter.textContent = Math.floor(current);
            }
        }, 16);
    });
}

// Initialize animations when sections come into view
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            if (entry.target.id === 'skills') {
                animateSkillBars();
            } else if (entry.target.id === 'about') {
                animateCounters();
            }
        }
    });
}, { threshold: 0.5 });

document.addEventListener('DOMContentLoaded', function() {
    const skillsSection = document.querySelector('#skills');
    const aboutSection = document.querySelector('#about');
    
    if (skillsSection) observer.observe(skillsSection);
    if (aboutSection) observer.observe(aboutSection);
});