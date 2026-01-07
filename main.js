// True Lux Construction - Modern JavaScript

// Navigation
const navbar = document.getElementById('navbar');
const navToggle = document.getElementById('nav-toggle');
const navMenu = document.getElementById('nav-menu');
const navLinks = document.querySelectorAll('.nav-link');

// Navbar scroll effect
window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Mobile menu toggle
if (navToggle) {
    navToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        navToggle.classList.toggle('active');
    });
}

// Close mobile menu when clicking nav links
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        if (navToggle) navToggle.classList.remove('active');
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

// Intersection Observer for subtle animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements for subtle fade-in
document.addEventListener('DOMContentLoaded', () => {
    const animateElements = document.querySelectorAll(
        '.service-item, .work-item, .process-step, .selected-project'
    );
    
    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
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
        
        // Show success message
        const submitButton = contactForm.querySelector('button[type="submit"]');
        const originalText = submitButton.textContent;
        submitButton.textContent = 'Request Sent';
        submitButton.style.opacity = '0.7';
        
        // Reset form
        contactForm.reset();
        
        // Reset button after 3 seconds
        setTimeout(() => {
            submitButton.textContent = originalText;
            submitButton.style.opacity = '1';
        }, 3000);
    });
}

// Gallery Modal Functionality
const galleryModal = document.getElementById('gallery-modal');
const galleryImage = document.getElementById('gallery-image');
const galleryCounter = document.getElementById('gallery-counter');
const galleryThumbnails = document.getElementById('gallery-thumbnails');
const galleryClose = document.querySelector('.gallery-close');
const galleryPrev = document.querySelector('.gallery-prev');
const galleryNext = document.querySelector('.gallery-next');
const galleryOverlay = document.querySelector('.gallery-modal-overlay');

// Project image galleries
const projectGalleries = {
    1: {
        title: 'Residential Renovation',
        images: [
            '/projects/IMG_4878.jpeg',
            '/projects/IMG_4879.jpeg',
            '/projects/IMG_4880.jpeg'
        ]
    },
    2: {
        title: 'Kitchen & Bath Improvements',
        images: [
            '/projects/IMG_4879.jpeg',
            '/projects/IMG_4878.jpeg'
        ]
    },
    3: {
        title: 'Exterior Improvements & Repairs',
        images: [
            '/projects/IMG_4880.jpeg',
            '/projects/IMG_4878.jpeg'
        ]
    },
    4: {
        title: 'Custom Carpentry & Finish Work',
        images: [
            '/projects/4703747222349663462.JPG',
            '/projects/IMG_4878.jpeg'
        ]
    },
    5: {
        title: 'Multi-Unit Residential Property',
        images: [
            '/projects/155480591355505790.JPG',
            '/projects/4098440594837260042.JPG'
        ]
    },
    6: {
        title: 'Outdoor Living Environment',
        images: [
            '/projects/5560434333821835102.JPG',
            '/projects/4703747222349663462.JPG'
        ]
    }
};

let currentGallery = null;
let currentImageIndex = 0;

// Open gallery from work items
document.querySelectorAll('.work-item').forEach(item => {
    item.addEventListener('click', (e) => {
        const projectId = item.getAttribute('data-project');
        if (projectId && projectGalleries[projectId]) {
            openGallery(projectId);
        }
    });
});

function openGallery(projectId) {
    currentGallery = projectGalleries[projectId];
    currentImageIndex = 0;
    if (galleryModal) {
        galleryModal.classList.add('active');
        document.body.style.overflow = 'hidden';
        updateGallery();
        createThumbnails();
    }
}

function closeGallery() {
    if (galleryModal) {
        galleryModal.classList.remove('active');
        document.body.style.overflow = '';
    }
}

function updateGallery() {
    if (!currentGallery || !galleryImage) return;
    
    galleryImage.src = currentGallery.images[currentImageIndex];
    if (galleryCounter) {
        galleryCounter.textContent = `${currentImageIndex + 1} / ${currentGallery.images.length}`;
    }
    
    // Update thumbnail active state
    const thumbnails = galleryThumbnails?.querySelectorAll('.gallery-thumbnail');
    if (thumbnails) {
        thumbnails.forEach((thumb, index) => {
            thumb.classList.toggle('active', index === currentImageIndex);
        });
    }
    
    // Update navigation buttons
    if (galleryPrev) {
        galleryPrev.style.opacity = currentImageIndex === 0 ? '0.5' : '1';
    }
    if (galleryNext) {
        galleryNext.style.opacity = currentImageIndex === currentGallery.images.length - 1 ? '0.5' : '1';
    }
}

function createThumbnails() {
    if (!galleryThumbnails || !currentGallery) return;
    
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
if (galleryClose) {
    galleryClose.addEventListener('click', closeGallery);
}
if (galleryOverlay) {
    galleryOverlay.addEventListener('click', closeGallery);
}
if (galleryNext) {
    galleryNext.addEventListener('click', nextImage);
}
if (galleryPrev) {
    galleryPrev.addEventListener('click', prevImage);
}

// Keyboard navigation
document.addEventListener('keydown', (e) => {
    if (!galleryModal || !galleryModal.classList.contains('active')) return;
    
    if (e.key === 'Escape') closeGallery();
    if (e.key === 'ArrowRight') nextImage();
    if (e.key === 'ArrowLeft') prevImage();
});
