class LanguageManager {
    constructor() {
        this.currentLang = 'ar';
        this.translations = {};
        this.init();
    }

    async init() {
        try {
            console.log('Initializing Language Manager');
            await this.loadTranslations();
            this.loadSavedLanguage();
            this.setupEventListeners();
            this.updateUI();
        } catch (error) {
            console.error('Initialization error:', error);
        }
    }

    async loadTranslations() {
        try {
            console.log('Loading translations...');
            const arResponse = await fetch('/js/translations/ar.json');
            const enResponse = await fetch('/js/translations/en.json');
            
            if (!arResponse.ok || !enResponse.ok) {
                throw new Error('Failed to load translations');
            }

            this.translations = {
                ar: await arResponse.json(),
                en: await enResponse.json()
            };
            console.log('Translations loaded successfully');
        } catch (error) {
            console.error('Error loading translations:', error);
            console.error('Error details:', error.message);
        }
    }

    loadSavedLanguage() {
        const savedLang = localStorage.getItem('preferredLanguage');
        if (savedLang) {
            this.currentLang = savedLang;
        }
    }

    setupEventListeners() {
        document.querySelector('.lang-btn').addEventListener('click', () => {
            this.toggleLanguage();
        });
    }

    toggleLanguage() {
        console.log('Toggling language from:', this.currentLang);
        this.currentLang = this.currentLang === 'ar' ? 'en' : 'ar';
        this.updateUI();
        this.saveLanguagePreference();
        console.log('Language switched to:', this.currentLang);
    }

    updateUI() {
        this.updateDirection();
        this.updateContent();
        this.updateLanguageButton();
    }

    updateDirection() {
        document.documentElement.dir = this.currentLang === 'ar' ? 'rtl' : 'ltr';
        document.documentElement.lang = this.currentLang;
    }

    updateContent() {
        document.querySelectorAll('[data-translate]').forEach(element => {
            const path = element.getAttribute('data-translate').split('.');
            let translation = this.translations[this.currentLang];
            
            for (const key of path) {
                translation = translation[key];
            }
            
            if (translation) {
                element.textContent = translation;
            }
        });
    }

    updateLanguageButton() {
        const langBtn = document.querySelector('.lang-text');
        langBtn.textContent = this.currentLang === 'ar' ? 'English' : 'عربي';
    }

    saveLanguagePreference() {
        localStorage.setItem('preferredLanguage', this.currentLang);
    }
} 