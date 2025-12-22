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
	| 'githubLinkAria';

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
		githubLinkAria: 'GitHub Repository'
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
		githubLinkAria: 'Repositorio de GitHub'
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
