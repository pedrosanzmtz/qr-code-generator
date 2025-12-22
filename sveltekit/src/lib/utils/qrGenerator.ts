import QRCode from 'qrcode';
import type { QRSize } from '$lib/stores/qrSettings';

export interface QROptions {
	size: QRSize;
	color: string;
	logoDataUrl: string | null;
}

/**
 * Validates if a string is a valid URL
 */
export function isValidURL(urlString: string): boolean {
	try {
		new URL(urlString);
		return true;
	} catch {
		return false;
	}
}

/**
 * Prepends https:// to URLs that don't have a protocol
 */
export function normalizeURL(urlString: string): string {
	const trimmed = urlString.trim();
	if (trimmed && !/^https?:\/\//i.test(trimmed)) {
		return 'https://' + trimmed;
	}
	return trimmed;
}

/**
 * Logo overlay configuration
 */
const LOGO_SIZE_RATIO = 0.25; // Logo is 25% of QR size
const LOGO_PADDING = 5; // White padding around logo

/**
 * Draws a logo overlay on a canvas context
 */
export function drawLogoOverlay(
	ctx: CanvasRenderingContext2D,
	logoDataUrl: string,
	size: number
): Promise<void> {
	return new Promise((resolve) => {
		const logoImg = new Image();
		logoImg.onload = () => {
			const logoSize = size * LOGO_SIZE_RATIO;
			const logoX = (size - logoSize) / 2;
			const logoY = (size - logoSize) / 2;

			// Draw white background behind logo
			ctx.fillStyle = '#ffffff';
			ctx.fillRect(
				logoX - LOGO_PADDING,
				logoY - LOGO_PADDING,
				logoSize + LOGO_PADDING * 2,
				logoSize + LOGO_PADDING * 2
			);

			// Draw logo
			ctx.drawImage(logoImg, logoX, logoY, logoSize, logoSize);
			resolve();
		};
		logoImg.onerror = () => resolve(); // Silently fail if logo can't load
		logoImg.src = logoDataUrl;
	});
}

/**
 * Generates a QR code canvas with optional logo overlay
 */
export async function generateQRCode(text: string, options: QROptions): Promise<HTMLCanvasElement> {
	const { size, color, logoDataUrl } = options;

	// Create canvas element
	const canvas = document.createElement('canvas');

	// Generate QR code to canvas
	await QRCode.toCanvas(canvas, text, {
		width: size,
		margin: 1,
		color: {
			dark: color,
			light: '#ffffff'
		},
		errorCorrectionLevel: 'H' // High error correction for logo overlay
	});

	// Add logo overlay if provided
	if (logoDataUrl) {
		const ctx = canvas.getContext('2d');
		if (ctx) {
			await drawLogoOverlay(ctx, logoDataUrl, size);
		}
	}

	return canvas;
}

/**
 * Gets the logo size configuration for SVG export
 */
export function getLogoConfig(size: number): {
	logoSize: number;
	logoX: number;
	logoY: number;
	padding: number;
} {
	const logoSize = size * LOGO_SIZE_RATIO;
	return {
		logoSize,
		logoX: (size - logoSize) / 2,
		logoY: (size - logoSize) / 2,
		padding: LOGO_PADDING
	};
}
