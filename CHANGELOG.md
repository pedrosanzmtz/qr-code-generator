# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.4.0] - 2025-12-10

### Added
- **Feature**: Added the ability to upload a custom logo to be displayed in the center of the QR code.
- **Feature**: Added a "Clear Logo" button to easily remove the selected logo.
- **Improvement**: Updated SVG download functionality to properly embed the logo for a high-quality, vector-friendly output.

## [1.3.0] - 2025-12-09

### Added
- **PWA Support**: Made the web app installable and offline-capable.
    - Added `manifest.json` for app installability.
    - Added Service Worker (`sw.js`) for offline caching of assets.
    - Added app icons (192x192 and 512x512).

## [1.2.0] - 2025-12-09

### Added
- **Dark Mode**: Implemented a toggleable dark theme with persistence.
- Refactored CSS to use custom properties (variables) for better theming.

## [1.1.0] - 2025-12-07

### Added
- Documented support for multiple download formats: PNG, JPEG, and SVG.
- Added "Advanced" custom color option with color picker.
- Updated README to reflect the new version and expanded download options.

## [1.0.0] - 2025-12-05

### Added
- Initial release of the QR Code Generator.
- Instant QR code generation from URL.
- Customization options for size and color.
- URL validation and auto-HTTPS handling.
- Basic PNG download functionality.
