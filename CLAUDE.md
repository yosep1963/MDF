# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

mDF Calculator is a Progressive Web App (PWA) for calculating the modified Discriminant Function score used to assess alcoholic hepatitis severity. Built with vanilla JavaScript (no frameworks).

**Formula**: `mDF = 4.6 × (PT - Control PT) + Total Bilirubin (mg/dL)`

- mDF < 32: Mild to moderate alcoholic hepatitis
- mDF ≥ 32: Severe alcoholic hepatitis (consider corticosteroid therapy)

## Development Commands

```bash
# Start local server (PWA requires localhost or HTTPS)
python -m http.server 8000

# Alternative with Node.js
npx http-server -p 8000

# Access at http://localhost:8000
```

## Architecture

### Core Files
- `index.html` - Single-page app entry point
- `js/app.js` - `MDFCalculator` class handles all calculation logic, form validation, localStorage persistence
- `js/i18n.js` - `I18n` class manages Korean/English translations with `translations` object
- `css/styles.css` - CSS custom properties for theming, responsive design
- `sw.js` - Service Worker for offline caching (cache-first strategy)
- `manifest.json` - PWA manifest for installability

### Key Patterns
- **State persistence**: Values auto-saved to localStorage (`mdf-values` key)
- **i18n**: Uses `data-i18n` attributes on HTML elements, `i18n.translate(key)` for dynamic text
- **Service Worker caching**: Update `CACHE_VERSION` in `sw.js` when deploying changes to bust cache

### Unit Conversion
Total bilirubin supports mg/dL and µmol/L units:
- Conversion factor: 1 mg/dL = 17.1 µmol/L
- Unit toggle button switches between units; calculation always converts to mg/dL internally

## Deployment

Static site - deploy to any static host (Netlify, Vercel, GitHub Pages).

For Netlify:
- Build command: (empty)
- Publish directory: `.`
