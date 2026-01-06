import type {
	WiFiData,
	VCardData,
	EmailData,
	SMSData,
	PhoneData,
	TextData,
	URLData
} from '$lib/stores/qrTemplate';

/**
 * Escapes special characters in WiFi strings
 */
function escapeWiFi(str: string): string {
	return str.replace(/([\\";,:])/g, '\\$1');
}

/**
 * Encodes WiFi credentials into WiFi QR code format
 * Format: WIFI:T:WPA;S:NetworkName;P:Password;H:false;;
 */
export function encodeWiFi(data: WiFiData): string {
	const { ssid, password, security, hidden } = data;

	if (!ssid) {
		throw new Error('WiFi SSID is required');
	}

	const parts = [
		`T:${security}`,
		`S:${escapeWiFi(ssid)}`,
		security !== 'nopass' && password ? `P:${escapeWiFi(password)}` : '',
		`H:${hidden}`
	].filter(Boolean);

	return `WIFI:${parts.join(';')};;`;
}

/**
 * Encodes contact information into vCard 3.0 format
 */
export function encodeVCard(data: VCardData): string {
	const { firstName, lastName, organization, phone, email, website, address, city, state, zip, country } =
		data;

	if (!firstName && !lastName) {
		throw new Error('At least one name is required');
	}

	const lines = ['BEGIN:VCARD', 'VERSION:3.0'];

	// Name
	lines.push(`N:${lastName};${firstName};;;`);
	lines.push(`FN:${[firstName, lastName].filter(Boolean).join(' ')}`);

	// Organization
	if (organization) {
		lines.push(`ORG:${organization}`);
	}

	// Phone
	if (phone) {
		lines.push(`TEL;TYPE=CELL:${phone}`);
	}

	// Email
	if (email) {
		lines.push(`EMAIL:${email}`);
	}

	// Website
	if (website) {
		lines.push(`URL:${website}`);
	}

	// Address
	if (address || city || state || zip || country) {
		lines.push(`ADR:;;${address};${city};${state};${zip};${country}`);
	}

	lines.push('END:VCARD');

	return lines.join('\n');
}

/**
 * Encodes email data into mailto format
 * Format: mailto:email@example.com?subject=Subject&body=Body
 */
export function encodeEmail(data: EmailData): string {
	const { email, subject, body } = data;

	if (!email) {
		throw new Error('Email address is required');
	}

	const params: string[] = [];
	if (subject) {
		params.push(`subject=${encodeURIComponent(subject)}`);
	}
	if (body) {
		params.push(`body=${encodeURIComponent(body)}`);
	}

	const queryString = params.length > 0 ? `?${params.join('&')}` : '';
	return `mailto:${email}${queryString}`;
}

/**
 * Encodes SMS data into SMS format
 * Format: sms:+1234567890?body=Message
 */
export function encodeSMS(data: SMSData): string {
	const { phone, message } = data;

	if (!phone) {
		throw new Error('Phone number is required');
	}

	const queryString = message ? `?body=${encodeURIComponent(message)}` : '';
	return `sms:${phone}${queryString}`;
}

/**
 * Encodes phone number into tel format
 * Format: tel:+1234567890
 */
export function encodePhone(data: PhoneData): string {
	const { phone } = data;

	if (!phone) {
		throw new Error('Phone number is required');
	}

	return `tel:${phone}`;
}

/**
 * Returns plain text
 */
export function encodeText(data: TextData): string {
	const { text } = data;

	if (!text) {
		throw new Error('Text content is required');
	}

	return text;
}

/**
 * Encodes URL (with protocol prepending if needed)
 */
export function encodeURL(data: URLData): string {
	const { url } = data;

	if (!url) {
		throw new Error('URL is required');
	}

	// Prepend https:// if no protocol is present
	const trimmed = url.trim();
	if (trimmed && !/^https?:\/\//i.test(trimmed)) {
		return 'https://' + trimmed;
	}

	return trimmed;
}
