// Internationalization (i18n) module

class I18n {
  constructor() {
    this.translations = {};
    this.currentLocale = 'en';
    this.defaultLocale = 'en';
  }

  async init() {
    // Detect browser language
    const browserLang = navigator.language.split('-')[0];
    const supportedLangs = ['en', 'lv', 'ru'];

    // Check URL param first, then localStorage, then browser
    const urlParams = new URLSearchParams(window.location.search);
    const urlLang = urlParams.get('lang');

    if (urlLang && supportedLangs.includes(urlLang)) {
      this.currentLocale = urlLang;
    } else {
      const savedLang = localStorage.getItem('plumber-lang');
      if (savedLang && supportedLangs.includes(savedLang)) {
        this.currentLocale = savedLang;
      } else if (supportedLangs.includes(browserLang)) {
        this.currentLocale = browserLang;
      }
    }

    // Load default locale first (fallback)
    await this.loadLocale(this.defaultLocale);

    // Load selected locale if different
    if (this.currentLocale !== this.defaultLocale) {
      await this.loadLocale(this.currentLocale);
    }

    // Apply translations
    this.applyTranslations();

    // Set language selector value
    const selector = document.getElementById('language-selector');
    if (selector) {
      selector.value = this.currentLocale;
      selector.addEventListener('change', (e) => this.setLocale(e.target.value));
    }
  }

  async loadLocale(locale) {
    try {
      const response = await fetch(`/locales/${locale}.json`);
      if (response.ok) {
        const data = await response.json();
        this.translations[locale] = data;
      }
    } catch (error) {
      console.warn(`Failed to load locale: ${locale}`, error);
    }
  }

  async setLocale(locale) {
    if (!this.translations[locale]) {
      await this.loadLocale(locale);
    }

    this.currentLocale = locale;
    localStorage.setItem('plumber-lang', locale);
    this.applyTranslations();

    // Update HTML lang attribute
    document.documentElement.lang = locale;
  }

  t(key) {
    // Try current locale first
    let value = this.getNestedValue(this.translations[this.currentLocale], key);

    // Fallback to default locale
    if (value === undefined) {
      value = this.getNestedValue(this.translations[this.defaultLocale], key);
    }

    return value || key;
  }

  getNestedValue(obj, key) {
    if (!obj) return undefined;
    return key.split('.').reduce((o, k) => (o || {})[k], obj);
  }

  applyTranslations() {
    // Apply to elements with data-i18n attribute
    document.querySelectorAll('[data-i18n]').forEach(element => {
      const key = element.getAttribute('data-i18n');
      const translation = this.t(key);

      if (translation && translation !== key) {
        if (element.tagName === 'INPUT' && element.type === 'text') {
          element.placeholder = translation;
        } else if (element.tagName === 'OPTION') {
          element.textContent = translation;
        } else {
          element.textContent = translation;
        }
      }
    });

    // Apply to meta tags
    const metaTitle = document.querySelector('title[data-i18n]');
    if (metaTitle) {
      const key = metaTitle.getAttribute('data-i18n');
      document.title = this.t(key);
    }

    const metaDesc = document.querySelector('meta[data-i18n]');
    if (metaDesc) {
      const key = metaDesc.getAttribute('data-i18n');
      metaDesc.setAttribute('content', this.t(key));
    }
  }
}

// Initialize i18n
const i18n = new I18n();
document.addEventListener('DOMContentLoaded', () => i18n.init());

// Export for global access
window.i18n = i18n;
