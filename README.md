# QR Code Generator

A simple, elegant QR code generator built with vanilla HTML, CSS, and JavaScript. Enter any URL and instantly create customizable QR codes with size and color options.

**Live Demo:** https://pedrosanzmtz.github.io/qr-code-generator/

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
- **Customizable Size** - Choose from Small (128px), Medium (200px), or Large (300px)
- **Color Options** - Select from 6 color presets or choose a **Custom Color** using the picker
- **Multiple Formats** - Download as PNG, JPEG, or SVG
- **URL Validation** - Automatic validation with helpful error messages
- **Auto HTTPS** - Automatically adds `https://` prefix when missing
- **Keyboard Support** - Press Enter to generate

## Usage

1. Open `index.html` in any modern web browser
2. Enter a URL in the input field
3. Select your preferred size and color
4. Click "Generate QR Code" or press Enter
5. Download the QR code as PNG, JPEG, or SVG

## Tech Stack

- HTML5
- CSS3 (with modern features like CSS Grid, Flexbox, and gradients)
- Vanilla JavaScript
- [qrcode.js](https://github.com/davidshimjs/qrcodejs) - QR code generation library

## No Build Required

This is a zero-dependency, static HTML application. Simply open the HTML file in a browser - no server, build tools, or installation needed.

## 🚀 Future Roadmap

We are continuously improving this project to provide features that are usually behind a paywall.

- [ ] **More QR Types**: Support for Wi-Fi, vCard (Contacts), Email, and SMS.
- [ ] **Logo Integration**: Allow users to upload a logo to place in the center of the QR code.
- [ ] **History**: Save generated QR codes to local storage so users don't lose them.
- [x] **Dark Mode**: Add a toggle for dark/light theme (defaults to system preference).
- [ ] **Offline Support**: Turn the site into a PWA (Progressive Web App) for offline use.

## Version

1.2.0

## License

MIT License - feel free to use, modify, and distribute this project for any purpose.
