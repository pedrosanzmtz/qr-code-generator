# Project Context
This is a simple QR Code Generator web application.
- It is a **static web app** built with Vanilla HTML, CSS, and JavaScript.
- There are **ZERO build tools**. No npm, no webpack, no react.
- Do NOT try to run `npm install` or `npm run build`.
- To run the app, simply open `index.html` in a browser.

# Tech Stack
- **HTML5**: Semantic structure.
- **CSS3**: Modern CSS (Flexbox, Grid, Variables) in `styles.css`.
- **JavaScript**: Vanilla ES6+ in `script.js`.
- **Libraries**: `qrcode.js` (loaded via CDN/local file, do not remove).

# Coding Rules
- **Styles**: ALWAYS modify `styles.css` for styling. Do not use inline styles unless absolutely necessary for dynamic values.
- **Functionality**: Keep logic in `script.js`.
- **Assets**: If adding images, place them in an `assets/` folder (create if missing).

# Workflow Rules
- **Version Control**: When adding a new feature, you MUST update `CHANGELOG.md` with a new entry under `[Unreleased]` or the new version number.
- **Documentation**: If you change the UI or features, you MUST update `README.md` to reflect the changes.
- **Testing**: Since there are no automated tests, manually verify changes by opening `index.html`.
