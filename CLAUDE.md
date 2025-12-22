# AI Context for QR Code Generator

> **Purpose**: This document provides comprehensive guidance for AI code assistants working with this project. Read this file before making any changes to understand the project structure, conventions, and workflow.

## Project Overview

This is a **QR Code Generator web application** built with SvelteKit, designed to be:
- **User-friendly**: Accessible to non-technical users
- **Privacy-focused**: Runs entirely in the browser, no data sent to servers
- **Open source**: Free alternative to paid QR code services
- **Modern**: Built with TypeScript, Svelte 5, and modern tooling

### Core Philosophy
- Component-based architecture with Svelte
- Type safety with TypeScript
- Progressive Web App (PWA) enabled for offline use
- Maintain accessibility and responsive design
- Always create GitHub issues and PRs before starting work

## File Structure

```
qr-code-generator/
├── index.html          # Redirect to Vercel deployment
├── README.md           # User-facing documentation
├── CHANGELOG.md        # Version history
├── CONTRIBUTING.md     # Contribution guidelines
├── CLAUDE.md           # This file
├── LICENSE             # MIT License
└── sveltekit/          # SvelteKit application
    ├── src/
    │   ├── app.css                 # Global styles with CSS variables
    │   ├── app.html                # HTML template
    │   ├── lib/
    │   │   ├── components/         # Svelte components
    │   │   │   ├── URLInput.svelte
    │   │   │   ├── GenerateButton.svelte
    │   │   │   ├── QRDisplay.svelte
    │   │   │   ├── SizeSelector.svelte
    │   │   │   ├── ColorSelector.svelte
    │   │   │   ├── LogoUploader.svelte
    │   │   │   ├── ThemeToggle.svelte
    │   │   │   └── LanguageToggle.svelte
    │   │   ├── stores/             # Svelte stores
    │   │   │   ├── language.ts
    │   │   │   ├── theme.ts
    │   │   │   └── qrSettings.ts
    │   │   └── utils/              # Utility functions
    │   │       ├── qrGenerator.ts
    │   │       └── exportFormats.ts
    │   └── routes/
    │       ├── +layout.svelte      # Root layout
    │       ├── +layout.ts          # Layout config
    │       └── +page.svelte        # Main page
    ├── static/                     # Static assets
    │   ├── icon-192.png
    │   └── icon-512.png
    ├── package.json
    ├── svelte.config.js
    ├── vite.config.ts
    └── tsconfig.json
```

## Tech Stack

- **SvelteKit**: Full-stack framework with Svelte 5
- **TypeScript**: Type safety throughout
- **Vite**: Build tool and dev server
- **@vite-pwa/sveltekit**: PWA support
- **qrcode**: QR code generation library
- **Vercel**: Deployment platform

## Development Workflow

### Before Making Changes
1. **Create a GitHub issue** to document the work
2. **Create a branch** linked to the issue (e.g., `claude/issue-123-feature-name`)
3. **Read the current code** to understand existing patterns
4. **Check `CHANGELOG.md`** to see recent changes

### Making Changes

#### 1. **Component Changes** (`src/lib/components/`)
- Use Svelte 5 runes (`$state`, `$derived`, `$effect`, `$props`)
- Keep components focused and single-purpose
- Use TypeScript interfaces for props
- Use CSS variables from `app.css` for theming

#### 2. **Styling Changes** (`src/app.css` or component `<style>`)
- Global styles go in `app.css`
- Component-specific styles go in `<style>` blocks
- Use CSS variables for colors and theming
- Support both light and dark modes

#### 3. **Store Changes** (`src/lib/stores/`)
- Use Svelte's `$state` runes for reactive state
- Export typed interfaces
- Keep stores focused on single concerns

#### 4. **Adding New Features**
- Create new components in `src/lib/components/`
- Add stores if state management is needed
- Update the page in `src/routes/+page.svelte`
- Add translations to `src/lib/stores/language.ts`

### After Making Changes

#### Required Updates
1. **Update `CHANGELOG.md`**:
   - Add entry under `[Unreleased]` section
   - Use format: `- [Category] Description of change`
   - Categories: Added, Changed, Fixed, Removed

2. **Run checks**:
   ```bash
   cd sveltekit
   npm run check      # Type checking
   npm run lint       # Linting
   npm run build      # Build verification
   ```

3. **Create a PR**:
   - Push branch to remote
   - Create PR with clear description
   - Reference the issue number

## Common Commands

```bash
cd sveltekit

# Install dependencies
npm install

# Start development server
npm run dev

# Type checking
npm run check

# Linting
npm run lint

# Build for production
npm run build

# Preview production build
npm run preview
```

## CSS Variables (Theming)

The app uses CSS variables defined in `app.css`:

```css
:root {
  --bg-body-start: #1a1a2e;
  --bg-body-mid: #16213e;
  --bg-body-end: #0f3460;
  --bg-card: #ffffff;
  --text-primary: #1a1a2e;
  --text-secondary: #666666;
  --border-color: #e0e0e0;
  --input-bg: #ffffff;
  --input-text: #000000;
  --btn-primary-bg: linear-gradient(135deg, #0f3460 0%, #1a1a2e 100%);
  --btn-primary-text: #ffffff;
  --btn-secondary-bg: #e8f4f8;
  --btn-secondary-hover: #d0e8f0;
  --btn-secondary-text: #0f3460;
  --error-color: #e74c3c;
}
```

Dark mode overrides these in `body.dark-mode`.

## Testing Checklist

- [ ] **URL Input**: Valid URLs generate QR codes, invalid show errors
- [ ] **Customization**: Size, color, and logo options work
- [ ] **Download**: PNG, JPEG, SVG downloads work
- [ ] **Responsive**: Works on mobile, tablet, desktop
- [ ] **Dark Mode**: Toggle works, colors are correct
- [ ] **i18n**: Language toggle works (EN/ES)
- [ ] **PWA**: App installs and works offline

## Important Reminders

### Before Starting Work
- Create a GitHub issue first
- Create a branch linked to the issue
- Read relevant code before making changes

### Code Standards
- Use TypeScript with proper types
- Use Svelte 5 runes (not legacy syntax)
- Use CSS variables for theming
- Keep components small and focused
- Add translations for new text

### After Completing Work
- Run `npm run check` and `npm run build`
- Update CHANGELOG.md
- Create a PR with clear description
- Reference the issue number in PR

## Resources

- **SvelteKit Docs**: https://kit.svelte.dev/docs
- **Svelte 5 Runes**: https://svelte.dev/docs/svelte/$state
- **Project Repository**: https://github.com/pedrosanzmtz/qr-code-generator
- **Live Demo**: https://qr-code-generator-silk-one.vercel.app/

---

**Last Updated**: 2025-12-22
**For Questions**: Create an issue on GitHub or refer to CONTRIBUTING.md
