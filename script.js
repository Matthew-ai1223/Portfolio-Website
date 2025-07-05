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
            description: "An innovative educational platform for Tertiary Institutions Students ",
            image: "https://i.ibb.co/8gdgxndR/screenshot-desktop.png",
            liveUrl: "https://scholer.great-site.net",
            githubUrl: "https://github.com/Matthew-ai1223/scholer-p.git",
            status: "completed"
        },
        {
            title: "School Management System",
            description: "A comprehensive School Management System for educational institutions that include student management, staff management, online payment, student result management, and other features",
            image: "https://i.postimg.cc/v8LZjYmR/school.png",
            liveUrl: "https://acecollege.ng",
            githubUrl: "",
            status: "completed"
        },
        {
            title: "Edutech Platform 300plus",
            description: "A comprehensive learning management system for SSCE, JAMB, WAEC, NECO, and the likes",
            image: "https://i.ibb.co/8nNng9VP/Screenshot-2025-04-08-032246.png",
            liveUrl: "https://300plus.ng",
            githubUrl: "https://github.com/Matthew-ai1223/300plus-p.git",
            status: "completed"
        },
        {
            title: "E-commerce Platform",
            description: "A full-featured e-commerce platform built with PHP and MySQL for Agriculture Products",
            image: "https://assets.entrepreneur.com/content/3x2/2000/20150629055642-shutterstock-208664602.jpeg?format=pjeg&auto=webp&crop=16:9&width=675&height=380",
            liveUrl: "https://example.com/ecommerce",
            githubUrl: "https://github.com/Matthew-ai1223/ecommerce-p.git",
            status: "completed"
        },
        {
            title: "CBT System",
            description: "A comprehensive Computer-Based Testing platform for educational institutions",
            image: "https://epiloguesystems.com/wp-content/uploads/2022/10/training-systems.webp",
            liveUrl: "https://300plus.great-site.net/backend/CBT_Test/register.php",
            githubUrl: "https://github.com/Mitth2w-ai122323/cbt-syst.gitem.git",
            status: "completed"
        },
        {   
            title: "Clinical Decision Support System",
            description: "A AI-powered comprehensive Clinical Decision Support System for medical institutions",
            image: "https://i.postimg.cc/9M013V4t/Screenshot-2025-07-05-124135.png",
            liveUrl: "https://dedocweb.vercel.app/",
            githubUrl: "https://dedoc.vercel.app/",
            status: "completed"
        }
    ],
    ongoing: [
        {
            title: "AI Chatbot",
            description: "A Python-based medical chatbot using machine learning",
            image: "https://admin.binariks.com/storage/2024-03/bin-picture-040324-v01-main.webp",
            githubUgitrl: "https://github.com/yourusername/chatbot",
            status: "ongoing"
        },
        {
            title: "E-Learning Mobile App",
            description: "A comprehensive mobile learning platform with interactive courses and real-time progress tracking",
            image: "https://s3-figma-hubfile-images-production.figma.com/hub/file/carousel/img/a806dde3f0f1e96e3949bcfb13564359c532b989",
            githubUrl: "https://github.com/yourusername/e-learning-mobile",
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