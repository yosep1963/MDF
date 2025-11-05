/**
 * i18n.js - Internationalization Support for mDF Calculator
 * Supports: Korean (ko), English (en)
 */

const translations = {
    ko: {
        // App Header
        'app-title': 'mDF 계산기',
        'app-subtitle': '수정된 판별함수 점수',

        // Form Labels
        'pt-label': '환자 PT',
        'pt-hint': '환자의 PT 값을 입력하세요',
        'bilirubin-label': '총 빌리루빈',
        'bilirubin-hint': '총 빌리루빈 값을 입력하세요',
        'control-pt-label': '대조군 PT',
        'control-pt-hint': '기본 상한값: 13.5초',

        // Advanced Options
        'advanced-options': '고급 옵션',

        // Buttons
        'calculate-btn': 'mDF 계산',
        'reset-btn': '초기화',

        // Results
        'result-title': '계산 결과',
        'mdf-score': 'mDF 점수',
        'calculation-formula': '계산 공식',

        // Interpretation
        'interpretation-title': '임상적 해석',
        'interpretation-normal': 'mDF 점수가 32 미만입니다. 경증에서 중등도의 알코올성 간염을 나타낼 수 있습니다.',
        'interpretation-severe': 'mDF 점수가 32 이상입니다. 중증 알코올성 간염을 시사하며 코르티코스테로이드 치료가 필요할 수 있습니다. 전문의와 상담하시기 바랍니다.',

        // About
        'about-title': 'mDF 점수란?',
        'about-text': '수정된 판별함수(mDF)는 알코올성 간염의 중증도를 평가하고 치료 결정을 안내하는 데 사용됩니다. mDF 점수 ≥32는 중증 알코올성 간염을 시사하며 코르티코스테로이드 치료가 필요할 수 있음을 나타냅니다.',

        // Footer
        'footer-disclaimer': '이 계산기는 교육 목적으로만 사용됩니다. 의료 결정은 항상 의료 전문가와 상담하시기 바랍니다.',

        // Calculation Breakdown
        'calc-pt-diff': 'PT 차이',
        'calc-multiplied': '4.6 × PT 차이',
        'calc-plus-bili': '+ 총 빌리루빈',
        'calc-final': '최종 mDF 점수'
    },

    en: {
        // App Header
        'app-title': 'mDF Calculator',
        'app-subtitle': 'modified Discriminant Function Score',

        // Form Labels
        'pt-label': 'Patient PT',
        'pt-hint': 'Enter patient\'s PT value',
        'bilirubin-label': 'Total Bilirubin',
        'bilirubin-hint': 'Enter total bilirubin value',
        'control-pt-label': 'Control PT',
        'control-pt-hint': 'Default upper limit: 13.5 sec',

        // Advanced Options
        'advanced-options': 'Advanced Options',

        // Buttons
        'calculate-btn': 'Calculate mDF',
        'reset-btn': 'Reset',

        // Results
        'result-title': 'Result',
        'mdf-score': 'mDF Score',
        'calculation-formula': 'Calculation Formula',

        // Interpretation
        'interpretation-title': 'Clinical Interpretation',
        'interpretation-normal': 'The mDF score is less than 32, indicating mild to moderate alcoholic hepatitis.',
        'interpretation-severe': 'The mDF score is 32 or higher, suggesting severe alcoholic hepatitis. Corticosteroid therapy may be indicated. Please consult with a healthcare professional.',

        // About
        'about-title': 'About mDF Score',
        'about-text': 'The modified Discriminant Function (mDF) is used to assess the severity of alcoholic hepatitis and help guide treatment decisions. An mDF score ≥32 suggests severe alcoholic hepatitis and may indicate the need for corticosteroid therapy.',

        // Footer
        'footer-disclaimer': 'This calculator is for educational purposes only. Always consult with a healthcare professional for medical decisions.',

        // Calculation Breakdown
        'calc-pt-diff': 'PT Difference',
        'calc-multiplied': '4.6 × PT Difference',
        'calc-plus-bili': '+ Total Bilirubin',
        'calc-final': 'Final mDF Score'
    }
};

class I18n {
    constructor() {
        this.currentLang = this.getSavedLanguage() || this.detectLanguage();
        this.init();
    }

    /**
     * Detect browser language
     */
    detectLanguage() {
        const browserLang = navigator.language || navigator.userLanguage;
        return browserLang.startsWith('ko') ? 'ko' : 'en';
    }

    /**
     * Get saved language from localStorage
     */
    getSavedLanguage() {
        return localStorage.getItem('mdf-lang');
    }

    /**
     * Save language to localStorage
     */
    saveLanguage(lang) {
        localStorage.setItem('mdf-lang', lang);
    }

    /**
     * Initialize i18n
     */
    init() {
        this.applyTranslations();
        this.updateLanguageButton();
        this.attachEventListeners();
    }

    /**
     * Apply translations to the page
     */
    applyTranslations() {
        const elements = document.querySelectorAll('[data-i18n]');
        elements.forEach(element => {
            const key = element.getAttribute('data-i18n');
            const translation = this.translate(key);

            if (translation) {
                // Handle different element types
                if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
                    element.placeholder = translation;
                } else {
                    element.textContent = translation;
                }
            }
        });

        // Update HTML lang attribute
        document.documentElement.lang = this.currentLang;
    }

    /**
     * Get translation for a key
     */
    translate(key) {
        return translations[this.currentLang]?.[key] || translations['en'][key] || key;
    }

    /**
     * Switch language
     */
    switchLanguage() {
        this.currentLang = this.currentLang === 'ko' ? 'en' : 'ko';
        this.saveLanguage(this.currentLang);
        this.applyTranslations();
        this.updateLanguageButton();

        // Dispatch custom event for other parts of the app
        window.dispatchEvent(new CustomEvent('languageChanged', {
            detail: { language: this.currentLang }
        }));
    }

    /**
     * Update language toggle button text
     */
    updateLanguageButton() {
        const langDisplay = document.getElementById('current-lang');
        if (langDisplay) {
            langDisplay.textContent = this.currentLang === 'ko' ? 'English' : '한국어';
        }
    }

    /**
     * Attach event listeners
     */
    attachEventListeners() {
        const langToggle = document.getElementById('lang-toggle');
        if (langToggle) {
            langToggle.addEventListener('click', () => this.switchLanguage());
        }
    }

    /**
     * Get current language
     */
    getCurrentLanguage() {
        return this.currentLang;
    }
}

// Initialize i18n when DOM is ready
let i18n;
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        i18n = new I18n();
    });
} else {
    i18n = new I18n();
}
