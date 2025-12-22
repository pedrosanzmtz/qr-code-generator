import { getLogoConfig } from './qrGenerator';

export type ExportFormat = 'png' | 'jpeg' | 'svg';

/**
 * Converts canvas to PNG data URL
 */
export function canvasToPng(canvas: HTMLCanvasElement): string {
	return canvas.toDataURL('image/png');
}

/**
 * Converts canvas to JPEG data URL with quality setting
 */
export function canvasToJpeg(canvas: HTMLCanvasElement, quality: number = 0.9): string {
	return canvas.toDataURL('image/jpeg', quality);
}

/**
 * Converts a QR code canvas to SVG format
 * Reads the canvas pixel data and creates SVG rectangles for dark modules
 */
export function canvasToSvg(
	canvas: HTMLCanvasElement,
	size: number,
	color: string,
	logoDataUrl: string | null
): string {
	const ctx = canvas.getContext('2d');
	if (!ctx) return '';

	const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
	const data = imageData.data;
	const moduleCount = canvas.width;
	const moduleSize = size / moduleCount;

	// Build SVG rectangles for each dark module
	let rects = '';
	for (let y = 0; y < moduleCount; y++) {
		for (let x = 0; x < moduleCount; x++) {
			const idx = (y * moduleCount + x) * 4;
			// Dark module if red channel < 128 (QR codes are black/white)
			if (data[idx] < 128) {
				rects += `<rect x="${x * moduleSize}" y="${y * moduleSize}" width="${moduleSize}" height="${moduleSize}" fill="${color}"/>`;
			}
		}
	}

	// Add logo to SVG if present
	let logoSvg = '';
	if (logoDataUrl) {
		const { logoSize, logoX, logoY, padding } = getLogoConfig(size);
		logoSvg += `<rect x="${logoX - padding}" y="${logoY - padding}" width="${logoSize + padding * 2}" height="${logoSize + padding * 2}" fill="#ffffff"/>`;
		logoSvg += `<image href="${logoDataUrl}" x="${logoX}" y="${logoY}" height="${logoSize}" width="${logoSize}" />`;
	}

	return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 ${size} ${size}">
<rect width="100%" height="100%" fill="white"/>
${rects}
${logoSvg}
</svg>`;
}

/**
 * Downloads a canvas as PNG or JPEG file
 */
export function downloadCanvas(canvas: HTMLCanvasElement, format: 'png' | 'jpeg'): void {
	const link = document.createElement('a');

	if (format === 'png') {
		link.download = 'qrcode.png';
		link.href = canvasToPng(canvas);
	} else {
		link.download = 'qrcode.jpg';
		link.href = canvasToJpeg(canvas);
	}

	link.click();
}

/**
 * Downloads SVG content as a file
 */
export function downloadSvg(svgContent: string): void {
	const blob = new Blob([svgContent], { type: 'image/svg+xml' });
	const link = document.createElement('a');
	link.download = 'qrcode.svg';
	link.href = URL.createObjectURL(blob);
	link.click();
	// Clean up object URL after download
	setTimeout(() => URL.revokeObjectURL(link.href), 100);
}

/**
 * Unified download function for all formats
 */
export function downloadQRCode(
	canvas: HTMLCanvasElement,
	format: ExportFormat,
	size: number,
	color: string,
	logoDataUrl: string | null
): void {
	if (format === 'svg') {
		const svgContent = canvasToSvg(canvas, size, color, logoDataUrl);
		downloadSvg(svgContent);
	} else {
		downloadCanvas(canvas, format);
	}
}
