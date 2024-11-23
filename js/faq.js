class FAQManager {
    constructor() {
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.setupCategories();
    }

    setupEventListeners() {
        // Toggle FAQ answers
        document.querySelectorAll('.faq-question').forEach(question => {
            question.addEventListener('click', (e) => {
                this.toggleAnswer(e.currentTarget.parentElement);
            });
        });

        // Category filtering
        document.querySelectorAll('.category-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                this.filterByCategory(e.currentTarget);
            });
        });

        // Form submission
        const questionForm = document.getElementById('questionForm');
        if (questionForm) {
            questionForm.addEventListener('submit', (e) => {
                this.handleFormSubmission(e);
            });
        }
    }

    toggleAnswer(faqItem) {
        // Close other open items
        const currentlyOpen = document.querySelector('.faq-item.active');
        if (currentlyOpen && currentlyOpen !== faqItem) {
            currentlyOpen.classList.remove('active');
            const icon = currentlyOpen.querySelector('.toggle-icon');
            icon.textContent = '+';
        }

        // Toggle current item
        faqItem.classList.toggle('active');
        const icon = faqItem.querySelector('.toggle-icon');
        icon.textContent = faqItem.classList.contains('active') ? '−' : '+';

        // Smooth animation
        const answer = faqItem.querySelector('.faq-answer');
        if (faqItem.classList.contains('active')) {
            answer.style.maxHeight = answer.scrollHeight + 'px';
        } else {
            answer.style.maxHeight = '0';
        }
    }

    filterByCategory(selectedBtn) {
        // Update active button
        document.querySelectorAll('.category-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        selectedBtn.classList.add('active');

        const category = selectedBtn.dataset.category;
        const faqItems = document.querySelectorAll('.faq-item');

        faqItems.forEach(item => {
            if (category === 'all' || item.dataset.category === category) {
                item.style.display = 'block';
                item.classList.add('fade-in');
            } else {
                item.style.display = 'none';
                item.classList.remove('fade-in');
            }
        });
    }

    async handleFormSubmission(e) {
        e.preventDefault();

        const formData = new FormData(e.target);
        const question = formData.get('question');
        const email = formData.get('email');

        try {
            // Show loading state
            const submitBtn = e.target.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;
            submitBtn.disabled = true;
            submitBtn.textContent = window.langManager.getTranslation('faq.ask.form.submitting');

            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 1000));

            // Show success message
            this.showNotification('success', window.langManager.getTranslation('faq.ask.form.success'));
            e.target.reset();

        } catch (error) {
            // Show error message
            this.showNotification('error', window.langManager.getTranslation('faq.ask.form.error'));
        } finally {
            // Reset button
            submitBtn.disabled = false;
            submitBtn.textContent = originalText;
        }
    }

    showNotification(type, message) {
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.textContent = message;

        document.body.appendChild(notification);

        // Remove notification after 3 seconds
        setTimeout(() => {
            notification.classList.add('fade-out');
            setTimeout(() => notification.remove(), 300);
        }, 3000);
    }
}

// Initialize FAQ manager when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.faqManager = new FAQManager();
});
