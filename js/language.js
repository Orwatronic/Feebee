// Language translations
const translations = {
    'ar': {
        'home': 'الرئيسية',
        'about': 'من نحن',
        'services': 'خدماتنا',
        'work': 'أعمالنا وعملاؤنا',
        'blog': 'المدونة',
        'contact': 'اتصل بنا',
        'faq': 'الأسئلة الشائعة',
        // Add more translations as needed
    },
    'en': {
        'home': 'Home',
        'about': 'About',
        'services': 'Services',
        'work': 'Our Work',
        'blog': 'Blog',
        'contact': 'Contact',
        'faq': 'FAQ',
        // Add more translations as needed
    }
};

// Current language
let currentLang = 'ar';

// Function to toggle language
function toggleLanguage() {
    currentLang = currentLang === 'ar' ? 'en' : 'ar';
    updateLanguage();
    updateDirection();
    saveLangPreference();
}

// Function to update text content
function updateLanguage() {
    document.querySelectorAll('[data-translate]').forEach(element => {
        const key = element.getAttribute('data-translate');
        element.textContent = translations[currentLang][key];
    });
    
    // Update language button text
    const langBtn = document.querySelector('.lang-text');
    langBtn.textContent = currentLang === 'ar' ? 'English' : 'عربي';
}

// Function to update text direction
function updateDirection() {
    document.documentElement.dir = currentLang === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = currentLang;
}

// Save language preference
function saveLangPreference() {
    localStorage.setItem('preferredLanguage', currentLang);
}

// Load saved language preference
function loadLangPreference() {
    const savedLang = localStorage.getItem('preferredLanguage');
    if (savedLang) {
        currentLang = savedLang;
        updateLanguage();
        updateDirection();
    }
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', loadLangPreference); 