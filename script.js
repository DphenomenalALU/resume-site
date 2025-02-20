// Theme toggle functionality
const themeToggle = document.querySelector('.theme-toggle');
const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');

// Check for saved theme preference or use system preference
const currentTheme = localStorage.getItem('theme') || 
                    (prefersDarkScheme.matches ? 'dark' : 'light');
document.body.setAttribute('data-theme', currentTheme);

themeToggle.addEventListener('click', () => {
    const newTheme = document.body.getAttribute('data-theme') === 'light' ? 'dark' : 'light';
    document.body.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
});

// Mobile navigation
const navToggle = document.querySelector('.nav-toggle');
const navMenu = document.querySelector('.nav-menu');

navToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    // Animate hamburger menu
    navToggle.classList.toggle('active');
});

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
    if (!navToggle.contains(e.target) && !navMenu.contains(e.target)) {
        navMenu.classList.remove('active');
        navToggle.classList.remove('active');
    }
});

// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth'
            });
            // Close mobile menu after clicking
            navMenu.classList.remove('active');
            navToggle.classList.remove('active');
        }
    });
});

// Animate skill bars on scroll
const skillBars = document.querySelectorAll('.skill-level');
const animateSkills = () => {
    skillBars.forEach(bar => {
        const rect = bar.getBoundingClientRect();
        if (rect.top < window.innerHeight && rect.bottom > 0) {
            bar.style.width = bar.parentElement.getAttribute('data-level') || '0%';
        }
    });
};

window.addEventListener('scroll', animateSkills);
animateSkills(); // Initial check

// Project modal functionality
const modal = document.getElementById('project-modal');
const modalContent = modal.querySelector('.modal-body');
const projectButtons = document.querySelectorAll('.project-details');
const modalClose = modal.querySelector('.modal-close');

const projectDetails = {
    1: {
        title: 'E-commerce Platform',
        description: `
            <h3>E-commerce Platform</h3>
            <p>A full-featured e-commerce solution built with modern technologies:</p>
            <ul>
                <li>React frontend with Redux for state management</li>
                <li>Node.js/Express backend with RESTful API</li>
                <li>MongoDB database with Mongoose ODM</li>
                <li>JWT authentication and authorization</li>
                <li>Stripe payment integration</li>
                <li>Responsive design with CSS Grid and Flexbox</li>
            </ul>
            <div class="project-links">
                <a href="#" class="btn btn-secondary">View Demo</a>
                <a href="#" class="btn btn-secondary">GitHub Repo</a>
            </div>
        `
    },
    2: {
        title: 'Task Management App',
        description: `
            <h3>Task Management App</h3>
            <p>A real-time collaborative task management application:</p>
            <ul>
                <li>Vue.js frontend with Vuex</li>
                <li>Firebase real-time database</li>
                <li>Authentication and role-based access</li>
                <li>Real-time updates and notifications</li>
                <li>Drag and drop task organization</li>
                <li>Progressive Web App (PWA) features</li>
            </ul>
            <div class="project-links">
                <a href="#" class="btn btn-secondary">View Demo</a>
                <a href="#" class="btn btn-secondary">GitHub Repo</a>
            </div>
        `
    }
};

projectButtons.forEach(button => {
    button.addEventListener('click', () => {
        const projectId = button.getAttribute('data-project');
        const project = projectDetails[projectId];
        if (project) {
            modalContent.innerHTML = project.description;
            modal.classList.add('active');
        }
    });
});

modalClose.addEventListener('click', () => {
    modal.classList.remove('active');
});

modal.addEventListener('click', (e) => {
    if (e.target === modal) {
        modal.classList.remove('active');
    }
});

// Contact form validation
const contactForm = document.getElementById('contact-form');

contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const message = document.getElementById('message').value.trim();
    
    // Simple validation
    if (!name || !email || !message) {
        alert('Please fill in all fields');
        return;
    }
    
    if (!isValidEmail(email)) {
        alert('Please enter a valid email address');
        return;
    }
    
    // Here you would typically send the form data to a server
    console.log('Form submitted:', { name, email, message });
    contactForm.reset();
    alert('Thank you for your message! I will get back to you soon.');
});

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Intersection Observer for fade-in animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe all sections for fade-in animation
document.querySelectorAll('section').forEach(section => {
    observer.observe(section);
});