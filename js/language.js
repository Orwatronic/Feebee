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
            if (Object.keys(this.translations).length === 0) {
                console.error('No translations loaded');
                return;
            }
            console.log('Available translations:', Object.keys(this.translations));
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
            if (error instanceof TypeError) {
                console.error('Network error - Check if the JSON files exist and the paths are correct');
            }
        }
    }

    loadSavedLanguage() {
        const savedLang = localStorage.getItem('preferredLanguage');
        if (savedLang) {
            this.currentLang = savedLang;
        }
    }

    setupEventListeners() {
        const langBtn = document.querySelector('.lang-btn');
        if (!langBtn) {
            console.error('Language button not found');
            return;
        }
        console.log('Setting up language button click listener');
        langBtn.addEventListener('click', () => {
            console.log('Language button clicked');
            this.toggleLanguage();
        });
    }

    toggleLanguage() {
        try {
            console.log('Current language:', this.currentLang);
            this.currentLang = this.currentLang === 'ar' ? 'en' : 'ar';
            console.log('Switching to:', this.currentLang);
            document.documentElement.classList.add('lang-switching');
            this.updateUI();
            this.saveLanguagePreference();
            setTimeout(() => {
                document.documentElement.classList.remove('lang-switching');
            }, 300);
        } catch (error) {
            console.error('Error in toggleLanguage:', error);
        }
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