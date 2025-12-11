/**
 * app.js - Main Application Logic for mDF Calculator
 * Formula: mDF = 4.6 × (PT - Control PT) + Total Bilirubin
 */

class MDFCalculator {
    constructor() {
        this.elements = {
            form: document.getElementById('mdf-form'),
            ptInput: document.getElementById('pt-input'),
            bilirubinInput: document.getElementById('bilirubin-input'),
            controlPtInput: document.getElementById('control-pt-input'),
            calculateBtn: document.getElementById('calculate-btn'),
            resetBtn: document.getElementById('reset-btn'),
            resultSection: document.getElementById('result-section'),
            mdfResult: document.getElementById('mdf-result'),
            calculationBreakdown: document.getElementById('calculation-breakdown'),
            interpretationSection: document.getElementById('interpretation-section'),
            interpretationText: document.getElementById('interpretation-text')
        };

        this.init();
    }

    /**
     * Initialize the calculator
     */
    init() {
        this.attachEventListeners();
        this.loadSavedValues();
    }

    /**
     * Attach event listeners
     */
    attachEventListeners() {
        // Form submission
        this.elements.form.addEventListener('submit', (e) => {
            e.preventDefault();
            this.calculate();
        });

        // Reset button
        this.elements.resetBtn.addEventListener('click', () => {
            this.reset();
        });

        // Auto-save input values
        [this.elements.ptInput, this.elements.bilirubinInput, this.elements.controlPtInput].forEach(input => {
            input.addEventListener('input', () => {
                this.saveValues();
            });
        });

        // Language change listener
        window.addEventListener('languageChanged', () => {
            this.updateInterpretation();
        });

        // Real-time validation
        this.elements.ptInput.addEventListener('input', () => this.validateInput(this.elements.ptInput));
        this.elements.bilirubinInput.addEventListener('input', () => this.validateInput(this.elements.bilirubinInput));
        this.elements.controlPtInput.addEventListener('input', () => this.validateInput(this.elements.controlPtInput));
    }

    /**
     * Validate input field
     */
    validateInput(input) {
        const value = parseFloat(input.value);
        const min = parseFloat(input.min);
        const max = parseFloat(input.max);

        if (value < min || value > max) {
            input.style.borderColor = 'var(--warning-color)';
            return false;
        } else {
            input.style.borderColor = 'var(--border-color)';
            return true;
        }
    }

    /**
     * Calculate mDF score
     */
    calculate() {
        // Get input values
        const pt = parseFloat(this.elements.ptInput.value);
        const bilirubin = parseFloat(this.elements.bilirubinInput.value);
        const controlPt = parseFloat(this.elements.controlPtInput.value) || 13.5;

        // Validate inputs
        if (isNaN(pt) || isNaN(bilirubin)) {
            alert(i18n.getCurrentLanguage() === 'ko'
                ? '모든 필수 값을 입력해주세요.'
                : 'Please enter all required values.');
            return;
        }

        if (pt < 0 || bilirubin < 0) {
            alert(i18n.getCurrentLanguage() === 'ko'
                ? '값은 0 이상이어야 합니다.'
                : 'Values must be greater than or equal to 0.');
            return;
        }

        // Calculate mDF
        // Formula: mDF = 4.6 × (PT - Control PT) + Total Bilirubin
        const ptDifference = pt - controlPt;
        const multipliedValue = 4.6 * ptDifference;
        const mdfScore = multipliedValue + bilirubin;

        // Display results
        this.displayResults(mdfScore, pt, bilirubin, controlPt, ptDifference, multipliedValue);

        // Save calculation to history (optional feature for future)
        this.saveCalculation(mdfScore, pt, bilirubin, controlPt);
    }

    /**
     * Display calculation results
     */
    displayResults(mdfScore, pt, bilirubin, controlPt, ptDifference, multipliedValue) {
        // Show result section
        this.elements.resultSection.style.display = 'block';

        // Display mDF score
        this.elements.mdfResult.textContent = mdfScore.toFixed(2);

        // Display calculation breakdown
        this.displayCalculationBreakdown(pt, bilirubin, controlPt, ptDifference, multipliedValue, mdfScore);

        // Display clinical interpretation
        this.displayInterpretation(mdfScore);

        // Scroll to results
        this.elements.resultSection.scrollIntoView({
            behavior: 'smooth',
            block: 'nearest'
        });
    }

    /**
     * Display calculation breakdown
     */
    displayCalculationBreakdown(pt, bilirubin, controlPt, ptDifference, multipliedValue, mdfScore) {
        const isKorean = i18n.getCurrentLanguage() === 'ko';

        const breakdown = `
            <div style="line-height: 2;">
                <strong>${i18n.translate('calc-pt-diff')}:</strong> ${pt.toFixed(1)} - ${controlPt.toFixed(1)} = ${ptDifference.toFixed(1)} sec<br>
                <strong>${i18n.translate('calc-multiplied')}:</strong> 4.6 × ${ptDifference.toFixed(1)} = ${multipliedValue.toFixed(2)}<br>
                <strong>${i18n.translate('calc-plus-bili')}:</strong> ${multipliedValue.toFixed(2)} + ${bilirubin.toFixed(1)} = ${mdfScore.toFixed(2)}<br>
                <hr style="margin: 12px 0; border: none; border-top: 1px solid var(--border-color);">
                <strong>${i18n.translate('calc-final')}:</strong> <span style="font-size: 18px; color: var(--accent-color);">${mdfScore.toFixed(2)}</span>
            </div>
        `;

        this.elements.calculationBreakdown.innerHTML = breakdown;
    }

    /**
     * Display clinical interpretation
     */
    displayInterpretation(mdfScore) {
        const isSevere = mdfScore >= 32;

        // Update section styling
        if (isSevere) {
            this.elements.interpretationSection.classList.add('severe');
        } else {
            this.elements.interpretationSection.classList.remove('severe');
        }

        // Update interpretation text
        this.updateInterpretation();
    }

    /**
     * Update interpretation text (called on language change)
     */
    updateInterpretation() {
        const mdfScore = parseFloat(this.elements.mdfResult.textContent);
        if (isNaN(mdfScore)) return;

        const isSevere = mdfScore >= 32;
        const interpretationKey = isSevere ? 'interpretation-severe' : 'interpretation-normal';
        this.elements.interpretationText.textContent = i18n.translate(interpretationKey);
    }

    /**
     * Reset the calculator
     */
    reset() {
        // Reset form
        this.elements.form.reset();

        // Reset control PT to default
        this.elements.controlPtInput.value = '13.5';

        // Hide results
        this.elements.resultSection.style.display = 'none';

        // Clear saved values
        this.clearSavedValues();

        // Reset input borders
        [this.elements.ptInput, this.elements.bilirubinInput, this.elements.controlPtInput].forEach(input => {
            input.style.borderColor = 'var(--border-color)';
        });

        // Focus on first input
        this.elements.ptInput.focus();
    }

    /**
     * Save input values to localStorage
     */
    saveValues() {
        const values = {
            pt: this.elements.ptInput.value,
            bilirubin: this.elements.bilirubinInput.value,
            controlPt: this.elements.controlPtInput.value
        };

        localStorage.setItem('mdf-values', JSON.stringify(values));
    }

    /**
     * Load saved values from localStorage
     */
    loadSavedValues() {
        const savedValues = localStorage.getItem('mdf-values');

        if (savedValues) {
            try {
                const values = JSON.parse(savedValues);

                if (values.pt) this.elements.ptInput.value = values.pt;
                if (values.bilirubin) this.elements.bilirubinInput.value = values.bilirubin;
                if (values.controlPt) this.elements.controlPtInput.value = values.controlPt;
            } catch (e) {
                console.error('Error loading saved values:', e);
            }
        }
    }

    /**
     * Clear saved values from localStorage
     */
    clearSavedValues() {
        localStorage.removeItem('mdf-values');
    }

    /**
     * Save calculation to history (for future feature)
     */
    saveCalculation(mdfScore, pt, bilirubin, controlPt) {
        const calculation = {
            date: new Date().toISOString(),
            mdfScore: mdfScore.toFixed(2),
            pt: pt.toFixed(1),
            bilirubin: bilirubin.toFixed(1),
            controlPt: controlPt.toFixed(1)
        };

        // Get existing history
        let history = [];
        try {
            const savedHistory = localStorage.getItem('mdf-history');
            if (savedHistory) {
                history = JSON.parse(savedHistory);
            }
        } catch (e) {
            console.error('Error loading history:', e);
        }

        // Add new calculation
        history.unshift(calculation);

        // Keep only last 10 calculations
        if (history.length > 10) {
            history = history.slice(0, 10);
        }

        // Save to localStorage
        try {
            localStorage.setItem('mdf-history', JSON.stringify(history));
        } catch (e) {
            console.error('Error saving history:', e);
        }
    }
}

// Initialize calculator when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        new MDFCalculator();
    });
} else {
    new MDFCalculator();
}
