# QR Code Generator

A simple, elegant QR code generator built with SvelteKit. Enter any URL and instantly create customizable QR codes with size and color options.

**Live Demo:** https://qr-code-generator-silk-one.vercel.app/

## Why This Project?

Most "free" QR code generators online are actually marketing funnels designed to force you into a subscription. They often bait you with a free code but then restrict it with limitations.

| **Common Online Generators** ❌ | **This Project** ✅ |
|-------------------------------|------------------|
| **Sign-up often required** to download | **No sign-up** ever |
| **Expires** after a few days/scans | **Forever free** (Static QR) |
| **Watermarks** on the image | **No watermarks** |
| **Ads** show up when scanning | **Direct link** to your URL |
| **Data tracking** & privacy concerns | **Respects privacy** (Runs locally) |

**This project was created to bridge that gap:**
- **100% Free & Open Source**: No hidden costs, no subscriptions, no sign-ups.
- **User-Friendly**: A simple interface that anyone can use, regardless of technical skill.
- **Empowering for All**: Allows anyone to create professional QR codes independently without needing to ask a developer or write a script.

## Features

- **Instant QR Generation** - Generate QR codes from any valid URL
- **Multilingual Support** - Available in English and Spanish (Latin America) with auto-detection and language preference saving
- **Customizable Size** - Choose from Small (128px), Medium (200px), or Large (300px)
- **Color Options** - Select from 6 color presets or choose a **Custom Color** using the picker
- **Add Your Logo** - Upload a custom logo to be centered on the QR code.
- **Multiple Formats** - Download as PNG, JPEG, or SVG
- **URL Validation** - Automatic validation with helpful error messages
- **Auto HTTPS** - Automatically adds `https://` prefix when missing
- **Keyboard Support** - Press Enter to generate
- **Version Display** - The current app version is displayed in the footer for easy reference.

## Usage

1. Visit https://qr-code-generator-silk-one.vercel.app/
2. Enter a URL in the input field
3. Select your preferred size and color
4. Optionally upload a logo
5. Click "Generate QR Code" or press Enter
6. Download the QR code as PNG, JPEG, or SVG

## Tech Stack

- [SvelteKit](https://kit.svelte.dev/) - Full-stack framework
- [TypeScript](https://www.typescriptlang.org/) - Type safety
- [Vite](https://vitejs.dev/) - Build tool
- [@vite-pwa/sveltekit](https://vite-pwa-org.netlify.app/frameworks/sveltekit.html) - PWA support
- [qrcode](https://www.npmjs.com/package/qrcode) - QR code generation library
- [Vercel](https://vercel.com/) - Deployment platform

## Local Development

```bash
# Navigate to the SvelteKit project
cd sveltekit

# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

The development server runs at `http://localhost:5173/`.

## For AI Code Assistants

If you're an AI assistant working on this project, please read [`CLAUDE.md`](CLAUDE.md) for comprehensive guidelines on:
- Project structure and philosophy
- Development workflow and best practices
- Feature implementation patterns
- Testing procedures
- Common tasks and troubleshooting

This will help you understand the codebase and make changes that align with the project's goals.

## License

MIT License - feel free to use, modify, and distribute this project for any purpose.
