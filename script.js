// Hamburger Menu Functionality
document.addEventListener('DOMContentLoaded', () => {
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');

    if (hamburger && navLinks) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navLinks.classList.toggle('active');
        });

        // Close menu when clicking on a nav link
        document.querySelectorAll('.nav-links a').forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                navLinks.classList.remove('active');
            });
        });

        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!hamburger.contains(e.target) && !navLinks.contains(e.target)) {
                hamburger.classList.remove('active');
                navLinks.classList.remove('active');
            }
        });
    }
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Animate progress bars when they come into view
const progressBars = document.querySelectorAll('.progress');

const animateProgressBars = () => {
    progressBars.forEach(bar => {
        const width = bar.style.width;
        bar.style.width = '0';
        setTimeout(() => {
            bar.style.width = width;
        }, 100);
    });
};

// Intersection Observer for progress bars
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateProgressBars();
            observer.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

document.querySelectorAll('.languages-section').forEach(section => {
    observer.observe(section);
});

// Project Data
const projects = {
    successful: [
        {
            title: "Edutech Platform Scholar",
            description: "An innovative educational platform for students and teachers",
            image: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
            liveUrl: "https://example.com/scholar",
            githubUrl: "https://github.com/yourusername/scholar",
            status: "completed"
        },
        {
            title: "Edutech Platform 300plus",
            description: "A comprehensive learning management system for educational institutions",
            image: "https://i.ibb.co/8nNng9VP/Screenshot-2025-04-08-032246.png",
            liveUrl: "https://300plus.great-site.net",
            githubUrl: "https://github.com/Matthew-ai1223/300plus-p.git",
            status: "completed"
        },
        {
            title: "E-commerce Platform",
            description: "A full-featured e-commerce platform built with PHP and MySQL",
            image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
            liveUrl: "https://example.com/ecommerce",
            githubUrl: "https://github.com/yourusername/ecommerce",
            status: "completed"
        },
        {
            title: "Task Management App",
            description: "A React Native mobile app for task management",
            image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
            liveUrl: "https://example.com/taskapp",
            githubUrl: "https://github.com/yourusername/taskapp",
            status: "completed"
        }
    ],
    ongoing: [
        {
            title: "AI Chatbot",
            description: "A Python-based chatbot using machine learning",
            image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
            githubUrl: "https://github.com/yourusername/chatbot",
            status: "ongoing"
        },
        {
            title: "Portfolio Website",
            description: "A responsive portfolio website using modern web technologies",
            image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
            githubUrl: "https://github.com/yourusername/portfolio",
            status: "ongoing"
        }
    ]
};

// Function to create project cards
function createProjectCard(project) {
    return `
        <div class="project-card">
            <div class="project-status status-${project.status}">
                ${project.status === 'ongoing' ? 'In Progress' : 'Completed'}
            </div>
            <img src="${project.image}" alt="${project.title}">
            <div class="project-info">
                <h3>${project.title}</h3>
                <p>${project.description}</p>
                <div class="project-links">
                    ${project.liveUrl ? `<a href="${project.liveUrl}" class="live-link" target="_blank">Live Demo</a>` : ''}
                    <a href="${project.githubUrl}" class="github-link" target="_blank">GitHub</a>
                </div>
            </div>
        </div>
    `;
}

// Function to render projects
function renderProjects(type) {
    const container = document.getElementById(`${type}-projects`);
    container.innerHTML = projects[type].map(createProjectCard).join('');
}

// Tab switching functionality
document.querySelectorAll('.tab-button').forEach(button => {
    button.addEventListener('click', () => {
        // Remove active class from all buttons
        document.querySelectorAll('.tab-button').forEach(btn => btn.classList.remove('active'));
        // Add active class to clicked button
        button.classList.add('active');
        
        // Hide all project containers
        document.querySelectorAll('.projects-container').forEach(container => {
            container.style.display = 'none';
        });
        
        // Show selected project container
        const tabType = button.getAttribute('data-tab');
        document.getElementById(`${tabType}-projects`).style.display = 'grid';
    });
});

// Initial render
renderProjects('successful');
renderProjects('ongoing');

// Form submission handling
const contactForm = document.getElementById('contact-form');
const submitButton = document.getElementById('submit-button');

// Function to check if all required fields are filled
function checkFormValidity() {
    const name = contactForm.querySelector('input[name="name"]').value.trim();
    const email = contactForm.querySelector('input[name="email"]').value.trim();
    const phone = contactForm.querySelector('input[name="phone"]').value.trim();
    const message = contactForm.querySelector('textarea[name="message"]').value.trim();
    
    // Enable button only if all fields are filled
    submitButton.disabled = !(name && email && phone && message);
}

// Add input event listeners to all form fields
contactForm.querySelectorAll('input, textarea').forEach(field => {
    field.addEventListener('input', checkFormValidity);
});

contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    // Validate WhatsApp number
    const whatsappNumber = contactForm.querySelector('input[name="phone"]').value;
    if (!isValidWhatsAppNumber(whatsappNumber)) {
        alert('Please enter a valid WhatsApp number');
        return;
    }
    
    // Show loading state
    submitButton.textContent = 'Sending...';
    submitButton.disabled = true;
    
    try {
        const formData = new FormData(contactForm);
        await fetch('https://api.web3forms.com/submit', {
            method: 'POST',
            body: formData
        });
        
        // Always redirect to thank-you page
        window.location.href = 'thank-you.html';
    } catch (error) {
        // Still redirect to thank-you page even if there's an error
        window.location.href = 'thank-you.html';
    }
});

// WhatsApp number validation function
function isValidWhatsAppNumber(number) {
    // Remove any non-digit characters
    const cleanNumber = number.replace(/\D/g, '');
    
    // Check if the number is between 10 and 15 digits
    return cleanNumber.length >= 10 && cleanNumber.length <= 15;
}

// Add smooth scroll behavior for the entire page
document.documentElement.style.scrollBehavior = 'smooth';

// Add active class to navigation links based on scroll position
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('.nav-links a');

window.addEventListener('scroll', () => {
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= sectionTop - 60) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').slice(1) === current) {
            link.classList.add('active');
        }
    });
}); 