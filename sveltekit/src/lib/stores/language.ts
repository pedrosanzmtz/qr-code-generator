import { writable, derived } from 'svelte/store';
import { browser } from '$app/environment';

export type Language = 'en' | 'es';

export type TranslationKey =
	| 'title'
	| 'subtitle'
	| 'urlLabel'
	| 'urlPlaceholder'
	| 'generateBtn'
	| 'customizeTitle'
	| 'sizeLabel'
	| 'colorLabel'
	| 'logoLabel'
	| 'clearLogoBtn'
	| 'chooseFile'
	| 'noFileChosen'
	| 'sizeSmall'
	| 'sizeMedium'
	| 'sizeLarge'
	| 'colorBlack'
	| 'colorNavy'
	| 'colorDarkGray'
	| 'colorPurple'
	| 'colorRed'
	| 'colorGreen'
	| 'colorCustom'
	| 'selectColor'
	| 'downloadLabel'
	| 'downloadPng'
	| 'downloadJpeg'
	| 'downloadSvg'
	| 'errorEmpty'
	| 'errorInvalid'
	| 'themeToggleAria'
	| 'languageToggleAria'
	| 'githubLinkAria'
	| 'templateLabel'
	| 'templateUrl'
	| 'templateWifi'
	| 'templateVcard'
	| 'templateEmail'
	| 'templateSms'
	| 'templatePhone'
	| 'templateText'
	| 'wifiSSID'
	| 'wifiSSIDPlaceholder'
	| 'wifiPassword'
	| 'wifiPasswordPlaceholder'
	| 'wifiSecurity'
	| 'wifiNoPassword'
	| 'wifiHidden'
	| 'vcardFirstName'
	| 'vcardFirstNamePlaceholder'
	| 'vcardLastName'
	| 'vcardLastNamePlaceholder'
	| 'vcardOrganization'
	| 'vcardOrganizationPlaceholder'
	| 'vcardPhone'
	| 'vcardPhonePlaceholder'
	| 'vcardEmail'
	| 'vcardEmailPlaceholder'
	| 'vcardWebsite'
	| 'vcardWebsitePlaceholder'
	| 'vcardAddress'
	| 'vcardAddressPlaceholder'
	| 'vcardCity'
	| 'vcardCityPlaceholder'
	| 'vcardState'
	| 'vcardStatePlaceholder'
	| 'vcardZip'
	| 'vcardZipPlaceholder'
	| 'vcardCountry'
	| 'vcardCountryPlaceholder'
	| 'emailAddress'
	| 'emailAddressPlaceholder'
	| 'emailSubject'
	| 'emailSubjectPlaceholder'
	| 'emailBody'
	| 'emailBodyPlaceholder'
	| 'smsPhone'
	| 'smsPhonePlaceholder'
	| 'smsMessage'
	| 'smsMessagePlaceholder'
	| 'phoneNumber'
	| 'phoneNumberPlaceholder'
	| 'textContent'
	| 'textContentPlaceholder';

export const translations: Record<Language, Record<TranslationKey, string>> = {
	en: {
		title: 'QR Code Generator',
		subtitle: 'Create QR codes instantly from any URL',
		urlLabel: 'Enter URL',
		urlPlaceholder: 'https://example.com',
		generateBtn: 'Generate QR Code',
		customizeTitle: 'Customize',
		sizeLabel: 'Size',
		colorLabel: 'Color',
		logoLabel: 'Logo (Optional)',
		clearLogoBtn: 'Clear',
		chooseFile: 'Choose file',
		noFileChosen: 'No file chosen',
		sizeSmall: 'Small (128px)',
		sizeMedium: 'Medium (200px)',
		sizeLarge: 'Large (300px)',
		colorBlack: 'Black',
		colorNavy: 'Navy',
		colorDarkGray: 'Dark Gray',
		colorPurple: 'Purple',
		colorRed: 'Red',
		colorGreen: 'Green',
		colorCustom: 'Custom Color',
		selectColor: 'Select Color:',
		downloadLabel: 'Download as:',
		downloadPng: 'PNG',
		downloadJpeg: 'JPEG',
		downloadSvg: 'SVG',
		errorEmpty: 'Please enter a URL',
		errorInvalid: 'Please enter a valid URL (e.g., https://example.com)',
		themeToggleAria: 'Toggle Dark Mode',
		languageToggleAria: 'Change Language',
		githubLinkAria: 'GitHub Repository',
		templateLabel: 'QR Code Type',
		templateUrl: 'URL',
		templateWifi: 'WiFi',
		templateVcard: 'vCard',
		templateEmail: 'Email',
		templateSms: 'SMS',
		templatePhone: 'Phone',
		templateText: 'Text',
		wifiSSID: 'Network Name (SSID)',
		wifiSSIDPlaceholder: 'MyNetwork',
		wifiPassword: 'Password',
		wifiPasswordPlaceholder: 'password123',
		wifiSecurity: 'Security Type',
		wifiNoPassword: 'No Password',
		wifiHidden: 'Hidden Network',
		vcardFirstName: 'First Name',
		vcardFirstNamePlaceholder: 'John',
		vcardLastName: 'Last Name',
		vcardLastNamePlaceholder: 'Doe',
		vcardOrganization: 'Company',
		vcardOrganizationPlaceholder: 'Acme Inc.',
		vcardPhone: 'Phone',
		vcardPhonePlaceholder: '+1234567890',
		vcardEmail: 'Email',
		vcardEmailPlaceholder: 'john@example.com',
		vcardWebsite: 'Website',
		vcardWebsitePlaceholder: 'https://example.com',
		vcardAddress: 'Street Address',
		vcardAddressPlaceholder: '123 Main St',
		vcardCity: 'City',
		vcardCityPlaceholder: 'New York',
		vcardState: 'State',
		vcardStatePlaceholder: 'NY',
		vcardZip: 'ZIP Code',
		vcardZipPlaceholder: '10001',
		vcardCountry: 'Country',
		vcardCountryPlaceholder: 'USA',
		emailAddress: 'Email Address',
		emailAddressPlaceholder: 'contact@example.com',
		emailSubject: 'Subject (Optional)',
		emailSubjectPlaceholder: 'Hello!',
		emailBody: 'Message (Optional)',
		emailBodyPlaceholder: 'Write your message here...',
		smsPhone: 'Phone Number',
		smsPhonePlaceholder: '+1234567890',
		smsMessage: 'Message (Optional)',
		smsMessagePlaceholder: 'Your message here...',
		phoneNumber: 'Phone Number',
		phoneNumberPlaceholder: '+1234567890',
		textContent: 'Text Content',
		textContentPlaceholder: 'Enter any text to encode in the QR code...'
	},
	es: {
		title: 'Generador de Códigos QR',
		subtitle: 'Crea códigos QR al instante desde cualquier URL',
		urlLabel: 'Ingresa URL',
		urlPlaceholder: 'https://ejemplo.com',
		generateBtn: 'Generar Código QR',
		customizeTitle: 'Personalizar',
		sizeLabel: 'Tamaño',
		colorLabel: 'Color',
		logoLabel: 'Logo (Opcional)',
		clearLogoBtn: 'Limpiar',
		chooseFile: 'Seleccionar archivo',
		noFileChosen: 'Ningún archivo',
		sizeSmall: 'Pequeño (128px)',
		sizeMedium: 'Mediano (200px)',
		sizeLarge: 'Grande (300px)',
		colorBlack: 'Negro',
		colorNavy: 'Azul Marino',
		colorDarkGray: 'Gris Oscuro',
		colorPurple: 'Morado',
		colorRed: 'Rojo',
		colorGreen: 'Verde',
		colorCustom: 'Color Personalizado',
		selectColor: 'Seleccionar Color:',
		downloadLabel: 'Descargar como:',
		downloadPng: 'PNG',
		downloadJpeg: 'JPEG',
		downloadSvg: 'SVG',
		errorEmpty: 'Por favor ingresa una URL',
		errorInvalid: 'Por favor ingresa una URL válida (ej., https://ejemplo.com)',
		themeToggleAria: 'Cambiar Modo Oscuro',
		languageToggleAria: 'Cambiar Idioma',
		githubLinkAria: 'Repositorio de GitHub',
		templateLabel: 'Tipo de Código QR',
		templateUrl: 'URL',
		templateWifi: 'WiFi',
		templateVcard: 'vCard',
		templateEmail: 'Correo',
		templateSms: 'SMS',
		templatePhone: 'Teléfono',
		templateText: 'Texto',
		wifiSSID: 'Nombre de Red (SSID)',
		wifiSSIDPlaceholder: 'MiRed',
		wifiPassword: 'Contraseña',
		wifiPasswordPlaceholder: 'contraseña123',
		wifiSecurity: 'Tipo de Seguridad',
		wifiNoPassword: 'Sin Contraseña',
		wifiHidden: 'Red Oculta',
		vcardFirstName: 'Nombre',
		vcardFirstNamePlaceholder: 'Juan',
		vcardLastName: 'Apellido',
		vcardLastNamePlaceholder: 'Pérez',
		vcardOrganization: 'Empresa',
		vcardOrganizationPlaceholder: 'Acme S.A.',
		vcardPhone: 'Teléfono',
		vcardPhonePlaceholder: '+34123456789',
		vcardEmail: 'Correo',
		vcardEmailPlaceholder: 'juan@ejemplo.com',
		vcardWebsite: 'Sitio Web',
		vcardWebsitePlaceholder: 'https://ejemplo.com',
		vcardAddress: 'Dirección',
		vcardAddressPlaceholder: 'Calle Principal 123',
		vcardCity: 'Ciudad',
		vcardCityPlaceholder: 'Madrid',
		vcardState: 'Estado/Provincia',
		vcardStatePlaceholder: 'Madrid',
		vcardZip: 'Código Postal',
		vcardZipPlaceholder: '28001',
		vcardCountry: 'País',
		vcardCountryPlaceholder: 'España',
		emailAddress: 'Dirección de Correo',
		emailAddressPlaceholder: 'contacto@ejemplo.com',
		emailSubject: 'Asunto (Opcional)',
		emailSubjectPlaceholder: '¡Hola!',
		emailBody: 'Mensaje (Opcional)',
		emailBodyPlaceholder: 'Escribe tu mensaje aquí...',
		smsPhone: 'Número de Teléfono',
		smsPhonePlaceholder: '+34123456789',
		smsMessage: 'Mensaje (Opcional)',
		smsMessagePlaceholder: 'Tu mensaje aquí...',
		phoneNumber: 'Número de Teléfono',
		phoneNumberPlaceholder: '+34123456789',
		textContent: 'Contenido de Texto',
		textContentPlaceholder: 'Ingresa cualquier texto para codificar en el código QR...'
	}
} as const;

function isValidLanguage(lang: string | null): lang is Language {
	return lang === 'en' || lang === 'es';
}

function createLanguageStore() {
	const getInitialLanguage = (): Language => {
		if (!browser) return 'en';

		const stored = localStorage.getItem('language');
		if (isValidLanguage(stored)) {
			return stored;
		}

		return navigator.language?.startsWith('es') ? 'es' : 'en';
	};

	const { subscribe, set } = writable<Language>(getInitialLanguage());

	return {
		subscribe,
		toggle: () => {
			let current: Language = 'en';
			subscribe((val) => (current = val))();

			const newLang = current === 'en' ? 'es' : 'en';
			if (browser) {
				localStorage.setItem('language', newLang);
				document.documentElement.setAttribute('lang', newLang);
			}
			set(newLang);
		},
		set: (lang: Language) => {
			if (browser) {
				localStorage.setItem('language', lang);
				document.documentElement.setAttribute('lang', lang);
			}
			set(lang);
		}
	};
}

export const language = createLanguageStore();

export const t = derived(language, ($language) => translations[$language]);
