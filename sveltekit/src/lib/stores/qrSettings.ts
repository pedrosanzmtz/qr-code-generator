import { writable } from 'svelte/store';
import type { TranslationKey } from './language';

export type QRSize = 128 | 200 | 300;

export interface ColorOption {
	value: string;
	labelKey: TranslationKey;
}

export const colorOptions: ColorOption[] = [
	{ value: '#000000', labelKey: 'colorBlack' },
	{ value: '#0f3460', labelKey: 'colorNavy' },
	{ value: '#2c3e50', labelKey: 'colorDarkGray' },
	{ value: '#8e44ad', labelKey: 'colorPurple' },
	{ value: '#c0392b', labelKey: 'colorRed' },
	{ value: '#27ae60', labelKey: 'colorGreen' },
	{ value: 'custom', labelKey: 'colorCustom' }
];

export const sizeOptions: { value: QRSize; labelKey: TranslationKey }[] = [
	{ value: 128, labelKey: 'sizeSmall' },
	{ value: 200, labelKey: 'sizeMedium' },
	{ value: 300, labelKey: 'sizeLarge' }
];

interface QRSettings {
	size: QRSize;
	colorPreset: string;
	customColor: string;
	logoDataUrl: string | null;
}

function createQRSettingsStore() {
	const { subscribe, set, update } = writable<QRSettings>({
		size: 200,
		colorPreset: '#000000',
		customColor: '#000000',
		logoDataUrl: null
	});

	return {
		subscribe,
		setSize: (size: QRSize) => {
			update((s) => ({ ...s, size }));
		},
		setColorPreset: (colorPreset: string) => {
			update((s) => ({ ...s, colorPreset }));
		},
		setCustomColor: (customColor: string) => {
			update((s) => ({ ...s, customColor }));
		},
		setLogo: (logoDataUrl: string | null) => {
			update((s) => ({ ...s, logoDataUrl }));
		},
		clearLogo: () => {
			update((s) => ({ ...s, logoDataUrl: null }));
		},
		getColor: (settings: QRSettings): string => {
			return settings.colorPreset === 'custom' ? settings.customColor : settings.colorPreset;
		},
		reset: () => {
			set({
				size: 200,
				colorPreset: '#000000',
				customColor: '#000000',
				logoDataUrl: null
			});
		}
	};
}

export const qrSettings = createQRSettingsStore();
