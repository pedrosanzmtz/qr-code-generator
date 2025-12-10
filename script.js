const urlInput = document.getElementById('urlInput');
const generateBtn = document.getElementById('generateBtn');
const qrContainer = document.getElementById('qrContainer');
const qrcodeDiv = document.getElementById('qrcode');
const qrcodeHiddenDiv = document.getElementById('qrcode-hidden');
const urlDisplay = document.getElementById('urlDisplay');
const downloadPng = document.getElementById('downloadPng');
const downloadJpeg = document.getElementById('downloadJpeg');
const downloadSvg = document.getElementById('downloadSvg');
const sizeSelect = document.getElementById('sizeSelect');
const colorSelect = document.getElementById('colorSelect');
const colorPickerContainer = document.getElementById('colorPickerContainer');
const customColorInput = document.getElementById('customColorInput');
const errorMsg = document.getElementById('errorMsg');
const logoInput = document.getElementById('logoInput');
const clearLogoBtn = document.getElementById('clearLogoBtn');

let qrcode = null;
let logoFile = null;
let logoDataUrl = null;

function isValidURL(string) {
    try {
        new URL(string);
        return true;
    } catch (_) {
        return false;
    }
}

function generateQRCode() {
    const url = urlInput.value.trim();

    if (!url) {
        errorMsg.textContent = 'Please enter a URL';
        errorMsg.classList.add('active');
        return;
    }

    if (!isValidURL(url)) {
        errorMsg.textContent = 'Please enter a valid URL (e.g., https://example.com)';
        errorMsg.classList.add('active');
        return;
    }

    errorMsg.classList.remove('active');

    const size = parseInt(sizeSelect.value);
    let color = colorSelect.value;

    if (color === 'custom') {
        color = customColorInput.value;
    }

    qrcodeDiv.innerHTML = '';
    qrcode = new QRCode(qrcodeDiv, {
        text: url,
        width: size,
        height: size,
        colorDark: color,
        colorLight: '#ffffff',
        correctLevel: QRCode.CorrectLevel.H
    });

    const observer = new MutationObserver((mutationsList, observer) => {
        for (const mutation of mutationsList) {
            if (mutation.type === 'childList' && mutation.addedNodes.length > 0) {
                const qrImg = qrcodeDiv.querySelector('img');
                if (qrImg) {
                    qrImg.onload = () => {
                        const canvas = document.createElement('canvas');
                        canvas.width = size;
                        canvas.height = size;
                        const ctx = canvas.getContext('2d');
                        ctx.drawImage(qrImg, 0, 0, size, size);

                        if (logoDataUrl) {
                            const logoImg = new Image();
                            logoImg.onload = function() {
                                const logoSize = size * 0.25;
                                const logoX = (size - logoSize) / 2;
                                const logoY = (size - logoSize) / 2;

                                ctx.fillStyle = '#ffffff';
                                ctx.fillRect(logoX - 5, logoY - 5, logoSize + 10, logoSize + 10);
                                ctx.drawImage(logoImg, logoX, logoY, logoSize, logoSize);

                                qrcodeDiv.innerHTML = '';
                                qrcodeDiv.appendChild(canvas);
                            };
                            logoImg.src = logoDataUrl;
                        } else {
                            qrcodeDiv.innerHTML = '';
                            qrcodeDiv.appendChild(canvas);
                        }
                    };
                    if (qrImg.complete) qrImg.onload();
                    observer.disconnect();
                }
            }
        }
    });
    observer.observe(qrcodeDiv, { childList: true });

    urlDisplay.textContent = url;
    qrContainer.classList.add('active');
}

function downloadAs(format) {
    const canvas = qrcodeDiv.querySelector('canvas');
    if (!canvas) return;

    const link = document.createElement('a');

    if (format === 'png') {
        link.download = 'qrcode.png';
        link.href = canvas.toDataURL('image/png');
    } else if (format === 'jpeg') {
        link.download = 'qrcode.jpg';
        link.href = canvas.toDataURL('image/jpeg', 0.9);
    } else if (format === 'svg') {
        const size = parseInt(sizeSelect.value);
        let color = colorSelect.value;
        if (color === 'custom') {
            color = customColorInput.value;
        }

        qrcodeHiddenDiv.innerHTML = '';
        new QRCode(qrcodeHiddenDiv, {
            text: urlInput.value.trim(),
            width: size,
            height: size,
            colorDark: color,
            colorLight: '#ffffff',
            correctLevel: QRCode.CorrectLevel.H
        });

        const hiddenCanvas = qrcodeHiddenDiv.querySelector('canvas');
        const svg = canvasToSvg(hiddenCanvas, size, color);
        const blob = new Blob([svg], { type: 'image/svg+xml' });
        link.download = 'qrcode.svg';
        link.href = URL.createObjectURL(blob);
    }

    link.click();
}

function canvasToSvg(canvas, size, color) {
    const ctx = canvas.getContext('2d');
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const data = imageData.data;
    const moduleCount = canvas.width;
    const moduleSize = size / moduleCount;

    let rects = '';
    for (let y = 0; y < moduleCount; y++) {
        for (let x = 0; x < moduleCount; x++) {
            const idx = (y * moduleCount + x) * 4;
            if (data[idx] < 128) {
                rects += `<rect x="${x * moduleSize}" y="${y * moduleSize}" width="${moduleSize}" height="${moduleSize}" fill="${color}"/>`;
            }
        }
    }

    let logoSvg = '';
    if (logoDataUrl) {
        const logoSize = size * 0.25;
        const logoX = (size - logoSize) / 2;
        const logoY = (size - logoSize) / 2;
        logoSvg += `<rect x="${logoX - 5}" y="${logoY - 5}" width="${logoSize + 10}" height="${logoSize + 10}" fill="#ffffff"/>`;
        logoSvg += `<image href="${logoDataUrl}" x="${logoX}" y="${logoY}" height="${logoSize}" width="${logoSize}" />`;
    }

    return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 ${size} ${size}">
<rect width="100%" height="100%" fill="white"/>
${rects}
${logoSvg}
</svg>`;
}

generateBtn.addEventListener('click', generateQRCode);

urlInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        generateQRCode();
    }
});

urlInput.addEventListener('input', () => {
    errorMsg.classList.remove('active');
});

downloadPng.addEventListener('click', () => downloadAs('png'));
downloadJpeg.addEventListener('click', () => downloadAs('jpeg'));
downloadSvg.addEventListener('click', () => downloadAs('svg'));

urlInput.addEventListener('blur', () => {
    const value = urlInput.value.trim();
    if (value && !value.match(/^https?:\/\//i)) {
        urlInput.value = 'https://' + value;
    }
});

colorSelect.addEventListener('change', () => {
    if (colorSelect.value === 'custom') {
        colorPickerContainer.style.display = 'flex';
    } else {
        colorPickerContainer.style.display = 'none';
    }
});

const themeToggle = document.getElementById('themeToggle');
const body = document.body;
const systemMatch = window.matchMedia('(prefers-color-scheme: dark)');

function setTheme(isDark) {
    if (isDark) {
        body.classList.add('dark-mode');
        themeToggle.textContent = '☀️';
    } else {
        body.classList.remove('dark-mode');
        themeToggle.textContent = '🌙';
    }
}

const storedTheme = localStorage.getItem('theme');
if (storedTheme) {
    setTheme(storedTheme === 'dark');
} else {
    setTheme(systemMatch.matches);
}

themeToggle.addEventListener('click', () => {
    const isDark = !body.classList.contains('dark-mode');
    setTheme(isDark);
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
});

systemMatch.addEventListener('change', (e) => {
    if (!localStorage.getItem('theme')) {
        setTheme(e.matches);
    }
});

logoInput.addEventListener('change', () => {
    if (logoInput.files && logoInput.files[0]) {
        logoFile = logoInput.files[0];

        const reader = new FileReader();
        reader.onload = function(e) {
            logoDataUrl = e.target.result;
            if (urlInput.value.trim()) {
                generateQRCode();
            }
        };
        reader.readAsDataURL(logoFile);

        clearLogoBtn.style.display = 'inline-block';
    }
});

clearLogoBtn.addEventListener('click', () => {
    logoFile = null;
    logoDataUrl = null;
    logoInput.value = '';
    clearLogoBtn.style.display = 'none';
    if (urlInput.value.trim()) {
        generateQRCode();
    }
});
