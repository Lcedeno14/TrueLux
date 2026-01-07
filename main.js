// Modern 2026 Landing Page JavaScript

// Navigation
const navbar = document.getElementById('navbar');
const navToggle = document.getElementById('nav-toggle');
const navMenu = document.getElementById('nav-menu');
const navLinks = document.querySelectorAll('.nav-link');

// Navbar scroll effect
let lastScroll = 0;
window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
    
    lastScroll = currentScroll;
});

// Mobile menu toggle
navToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    navToggle.classList.toggle('active');
});

// Close mobile menu when clicking nav links
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        navToggle.classList.remove('active');
    });
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offsetTop = target.offsetTop - 80;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Animated counter for stats
const animateCounter = (element, target, duration = 2000) => {
    const start = 0;
    const increment = target / (duration / 16);
    let current = start;
    
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target + (target === 98 ? '%' : '+');
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current) + (target === 98 ? '%' : '+');
        }
    }, 16);
};

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            
            // Animate stats if it's the stats section
            if (entry.target.classList.contains('hero-stats')) {
                const statNumbers = entry.target.querySelectorAll('.stat-number');
                statNumbers.forEach(stat => {
                    const target = parseInt(stat.getAttribute('data-target'));
                    animateCounter(stat, target);
                });
            }
        }
    });
}, observerOptions);

// Observe elements for animation
document.addEventListener('DOMContentLoaded', () => {
    const animateElements = document.querySelectorAll(
        '.service-card, .project-card, .testimonial-card, .about-text, .contact-info, .hero-stats'
    );
    
    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
        observer.observe(el);
    });
});

// Form handling
const contactForm = document.getElementById('contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(contactForm);
        const data = Object.fromEntries(formData);
        
        // Here you would typically send the data to a server
        console.log('Form submitted:', data);
        
        // Show success message (in a real app, you'd handle this properly)
        const submitButton = contactForm.querySelector('button[type="submit"]');
        const originalText = submitButton.textContent;
        submitButton.textContent = 'Message Sent!';
        submitButton.style.background = '#10b981';
        
        // Reset form
        contactForm.reset();
        
        // Reset button after 3 seconds
        setTimeout(() => {
            submitButton.textContent = originalText;
            submitButton.style.background = '';
        }, 3000);
    });
}

// Parallax effect for hero section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero-background');
    if (hero) {
        hero.style.transform = `translateY(${scrolled * 0.5}px)`;
    }
});

// Add active class to nav link based on scroll position
const sections = document.querySelectorAll('section[id]');
const navLinksArray = Array.from(navLinks);

const updateActiveNavLink = () => {
    const scrollY = window.pageYOffset;
    
    sections.forEach(section => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - 100;
        const sectionId = section.getAttribute('id');
        
        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            navLinksArray.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.classList.add('active');
                }
            });
        }
    });
};

window.addEventListener('scroll', updateActiveNavLink);

// Add subtle animations to cards on hover
document.querySelectorAll('.service-card, .project-card, .testimonial-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-8px) scale(1.02)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

// Performance optimization: Debounce scroll events
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Apply debounce to scroll handlers
const debouncedScroll = debounce(() => {
    updateActiveNavLink();
}, 10);

window.addEventListener('scroll', debouncedScroll);

// Add loading animation
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
});

// Gallery Modal Functionality
const galleryModal = document.getElementById('gallery-modal');
const galleryImage = document.getElementById('gallery-image');
const galleryTitle = document.getElementById('gallery-title');
const galleryCounter = document.getElementById('gallery-counter');
const galleryThumbnails = document.getElementById('gallery-thumbnails');
const galleryClose = document.querySelector('.gallery-close');
const galleryPrev = document.querySelector('.gallery-prev');
const galleryNext = document.querySelector('.gallery-next');
const galleryOverlay = document.querySelector('.gallery-modal-overlay');

// Project image galleries
const projectGalleries = {
    project1: {
        title: 'Residential Project 1',
        images: [
            '/projects/IMG_4878.jpeg',
            '/projects/IMG_4879.jpeg',
            '/projects/IMG_4880.jpeg'
        ]
    },
    project2: {
        title: 'Residential Project 2',
        images: [
            '/projects/155480591355505790.JPG',
            '/projects/4098440594837260042.JPG',
            '/projects/4703747222349663462.JPG',
            '/projects/5560434333821835102.JPG'
        ]
    }
};

let currentGallery = null;
let currentImageIndex = 0;

// Open gallery
document.querySelectorAll('[data-gallery]').forEach(button => {
    button.addEventListener('click', (e) => {
        e.preventDefault();
        const galleryId = button.getAttribute('data-gallery');
        openGallery(galleryId);
    });
});

function openGallery(galleryId) {
    currentGallery = projectGalleries[galleryId];
    currentImageIndex = 0;
    galleryModal.classList.add('active');
    document.body.style.overflow = 'hidden';
    updateGallery();
    createThumbnails();
}

function closeGallery() {
    galleryModal.classList.remove('active');
    document.body.style.overflow = '';
}

function updateGallery() {
    if (!currentGallery) return;
    
    galleryImage.src = currentGallery.images[currentImageIndex];
    galleryTitle.textContent = currentGallery.title;
    galleryCounter.textContent = `${currentImageIndex + 1} / ${currentGallery.images.length}`;
    
    // Update thumbnail active state
    const thumbnails = galleryThumbnails.querySelectorAll('.gallery-thumbnail');
    thumbnails.forEach((thumb, index) => {
        thumb.classList.toggle('active', index === currentImageIndex);
    });
    
    // Update navigation buttons
    galleryPrev.style.opacity = currentImageIndex === 0 ? '0.5' : '1';
    galleryNext.style.opacity = currentImageIndex === currentGallery.images.length - 1 ? '0.5' : '1';
}

function createThumbnails() {
    galleryThumbnails.innerHTML = '';
    currentGallery.images.forEach((image, index) => {
        const thumbnail = document.createElement('div');
        thumbnail.className = `gallery-thumbnail ${index === 0 ? 'active' : ''}`;
        thumbnail.innerHTML = `<img src="${image}" alt="Thumbnail ${index + 1}" loading="lazy">`;
        thumbnail.addEventListener('click', () => {
            currentImageIndex = index;
            updateGallery();
        });
        galleryThumbnails.appendChild(thumbnail);
    });
}

function nextImage() {
    if (currentGallery && currentImageIndex < currentGallery.images.length - 1) {
        currentImageIndex++;
        updateGallery();
    }
}

function prevImage() {
    if (currentGallery && currentImageIndex > 0) {
        currentImageIndex--;
        updateGallery();
    }
}

// Gallery event listeners
galleryClose.addEventListener('click', closeGallery);
galleryOverlay.addEventListener('click', closeGallery);
galleryNext.addEventListener('click', nextImage);
galleryPrev.addEventListener('click', prevImage);

// Keyboard navigation
document.addEventListener('keydown', (e) => {
    if (!galleryModal.classList.contains('active')) return;
    
    if (e.key === 'Escape') closeGallery();
    if (e.key === 'ArrowRight') nextImage();
    if (e.key === 'ArrowLeft') prevImage();
});

// Console message
console.log('%cTrueLux Landing Page', 'font-size: 24px; font-weight: bold; color: #f8da69;');
console.log('%cBuilt with modern web technologies for 2026', 'font-size: 14px; color: #64748b;');

