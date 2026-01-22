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

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
    const isClickInsideNav = navMenu.contains(e.target) || navToggle.contains(e.target);

    if (!isClickInsideNav && navMenu.classList.contains('active')) {
        navMenu.classList.remove('active');
        navToggle.classList.remove('active');
    }
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
        '.service-section, .work-item, .about-text, .contact-info, .process-step'
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
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const submitButton = contactForm.querySelector('button[type="submit"]');
        const originalText = submitButton.textContent;
        
        // Disable button and show loading state
        submitButton.disabled = true;
        submitButton.textContent = 'Sending...';
        
        try {
            // Get form data
            const formData = new FormData(contactForm);
            const data = Object.fromEntries(formData);
            
            // Send to API
            const response = await fetch('/api/contact', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });
            
            const result = await response.json();
            
            if (response.ok) {
                // Success
                submitButton.textContent = 'Message Sent!';
                submitButton.style.background = '#10b981';
                contactForm.reset();

                // Show success message
                setTimeout(() => {
                    submitButton.textContent = originalText;
                    submitButton.style.background = '';
                    submitButton.disabled = false;
                }, 3000);
            } else {
                // Error - log full details
                console.error('API Error Response:', result);
                const errorMsg = result.details || result.error || 'Failed to send message';
                throw new Error(errorMsg);
            }
        } catch (error) {
            console.error('Error:', error);
            console.error('Full error details:', error.message);
            submitButton.textContent = 'Error - Try Again';
            submitButton.style.background = '#ef4444';

            // Show error to user temporarily
            alert('Error submitting form. Check console for details or contact support.');

            setTimeout(() => {
                submitButton.textContent = originalText;
                submitButton.style.background = '';
                submitButton.disabled = false;
            }, 3000);
        }
    });
}

// Parallax effect for home section (if needed)
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const homeVisual = document.querySelector('.home-visual');
    if (homeVisual) {
        // Subtle parallax effect
        homeVisual.style.transform = `translateY(${scrolled * 0.1}px)`;
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
const galleryThumbnails = document.getElementById('gallery-thumbnails');
const galleryClose = document.querySelector('.gallery-close');
const galleryPrev = document.querySelector('.gallery-prev');
const galleryNext = document.querySelector('.gallery-next');
const galleryOverlay = document.querySelector('.gallery-modal-overlay');

// Project image galleries
const projectGalleries = {
    project1: {
        title: 'Residential Renovation',
        images: [
            '/projects/IMG_4879.jpeg',
            '/projects/bathroom.jpeg'
        ]
    },
    project2: {
        title: 'Exterior Improvements & Repairs',
        images: [
            '/projects/155480591355505790.JPG',
            '/projects/2477218595194736636.JPG',
            '/projects/4098440594837260042.JPG',
            '/projects/4703747222349663462.JPG',
            '/projects/5560434333821835102.JPG'
        ]
    },
    project3: {
        title: 'Residential Construction',
        images: [
            '/projects/IMG_4958.jpeg',
            '/projects/IMG_4961.jpeg',
            '/projects/IMG_4963.jpeg'
        ]
    }
};

// Initialize inline galleries for each work item
document.querySelectorAll('[data-gallery]').forEach(workItem => {
    const galleryId = workItem.getAttribute('data-gallery');
    const gallery = projectGalleries[galleryId];

    if (!gallery || gallery.images.length <= 1) return;

    const imageWrapper = workItem.querySelector('.work-image-wrapper');
    const img = workItem.querySelector('.work-image');
    let currentIndex = 0;

    // Create navigation arrows
    const prevBtn = document.createElement('button');
    prevBtn.className = 'gallery-nav-btn prev';
    prevBtn.innerHTML = '<svg viewBox="0 0 24 24"><polyline points="15 18 9 12 15 6"></polyline></svg>';
    prevBtn.setAttribute('aria-label', 'Previous image');

    const nextBtn = document.createElement('button');
    nextBtn.className = 'gallery-nav-btn next';
    nextBtn.innerHTML = '<svg viewBox="0 0 24 24"><polyline points="9 18 15 12 9 6"></polyline></svg>';
    nextBtn.setAttribute('aria-label', 'Next image');

    // Create indicators
    const indicators = document.createElement('div');
    indicators.className = 'gallery-indicators';

    gallery.images.forEach((_, index) => {
        const indicator = document.createElement('div');
        indicator.className = `gallery-indicator ${index === 0 ? 'active' : ''}`;
        indicator.addEventListener('click', (e) => {
            e.stopPropagation();
            currentIndex = index;
            updateImage();
        });
        indicators.appendChild(indicator);
    });

    // Update image function
    function updateImage() {
        img.style.opacity = '0';
        setTimeout(() => {
            img.src = gallery.images[currentIndex];
            img.style.opacity = '1';

            // Update indicators
            indicators.querySelectorAll('.gallery-indicator').forEach((ind, idx) => {
                ind.classList.toggle('active', idx === currentIndex);
            });

            // Show/hide arrows based on position
            prevBtn.style.display = currentIndex > 0 ? 'flex' : 'none';
            nextBtn.style.display = currentIndex < gallery.images.length - 1 ? 'flex' : 'none';
        }, 150);
    }

    // Navigation handlers
    prevBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        if (currentIndex > 0) {
            currentIndex--;
            updateImage();
        }
    });

    nextBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        if (currentIndex < gallery.images.length - 1) {
            currentIndex++;
            updateImage();
        }
    });

    // Append elements
    imageWrapper.appendChild(prevBtn);
    imageWrapper.appendChild(nextBtn);
    imageWrapper.appendChild(indicators);

    // Add transition to image
    img.style.transition = 'opacity 0.15s ease-in-out';

    // Set initial arrow visibility (hide left arrow on first image)
    prevBtn.style.display = 'none';
    nextBtn.style.display = gallery.images.length > 1 ? 'flex' : 'none';
});

// Console message
console.log('%cTrueLux Landing Page', 'font-size: 24px; font-weight: bold; color: #f8da69;');
console.log('%cBuilt with modern web technologies for 2026', 'font-size: 14px; color: #64748b;');

