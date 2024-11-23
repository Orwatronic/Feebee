document.addEventListener('DOMContentLoaded', () => {
    // Initialize all main functionality
    initializeNavigation();
    initializeImageLoading();
    initializeScrollEffects();
    setupFormValidation();
});

// Mobile Navigation Toggle
function initializeNavigation() {
    const nav = document.querySelector('nav');
    const mobileMenuBtn = document.createElement('button');
    mobileMenuBtn.className = 'mobile-menu-btn';
    mobileMenuBtn.innerHTML = '<span></span><span></span><span></span>';
    
    nav.insertBefore(mobileMenuBtn, nav.firstChild);

    mobileMenuBtn.addEventListener('click', () => {
        nav.classList.toggle('mobile-menu-open');
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!nav.contains(e.target)) {
            nav.classList.remove('mobile-menu-open');
        }
    });
}

// Image Loading Check
function initializeImageLoading() {
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        img.onerror = function() {
            console.error(`Failed to load image: ${img.src}`);
            img.src = 'images/placeholder.png'; // Add a placeholder image
        };
    });
}

// Scroll Effects
function initializeScrollEffects() {
    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
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

    // Scroll-triggered animations
    const animatedElements = document.querySelectorAll('.animate-on-scroll');
    
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animated');
            }
        });
    }, observerOptions);

    animatedElements.forEach(el => observer.observe(el));
}

// Form Validation
function setupFormValidation() {
    const forms = document.querySelectorAll('form');
    
    forms.forEach(form => {
        form.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            if (validateForm(form)) {
                try {
                    await submitForm(form);
                    showNotification('success', 'Form submitted successfully!');
                    form.reset();
                } catch (error) {
                    showNotification('error', 'Error submitting form. Please try again.');
                }
            }
        });
    });
}

function validateForm(form) {
    let isValid = true;
    const inputs = form.querySelectorAll('input, textarea, select');
    
    inputs.forEach(input => {
        if (input.hasAttribute('required') && !input.value.trim()) {
            isValid = false;
            showInputError(input, 'This field is required');
        } else {
            clearInputError(input);
        }

        // Email validation
        if (input.type === 'email' && input.value) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(input.value)) {
                isValid = false;
                showInputError(input, 'Please enter a valid email address');
            }
        }
    });

    return isValid;
}

function showInputError(input, message) {
    const errorDiv = input.parentElement.querySelector('.error-message') || 
                    document.createElement('div');
    errorDiv.className = 'error-message';
    errorDiv.textContent = message;
    
    if (!input.parentElement.querySelector('.error-message')) {
        input.parentElement.appendChild(errorDiv);
    }
    
    input.classList.add('error');
}

function clearInputError(input) {
    const errorDiv = input.parentElement.querySelector('.error-message');
    if (errorDiv) {
        errorDiv.remove();
    }
    input.classList.remove('error');
}

// Notification System
function showNotification(type, message) {
    const notificationDiv = document.createElement('div');
    notificationDiv.className = `notification ${type}`;
    notificationDiv.textContent = message;
    
    document.body.appendChild(notificationDiv);

    setTimeout(() => {
        notificationDiv.remove();
    }, 3000);
}
