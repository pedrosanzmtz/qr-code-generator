import { writable } from 'svelte/store';

export type TemplateType = 'url' | 'wifi' | 'vcard' | 'email' | 'sms' | 'phone' | 'text';

export interface WiFiData {
	ssid: string;
	password: string;
	security: 'WPA' | 'WEP' | 'nopass';
	hidden: boolean;
}

export interface VCardData {
	firstName: string;
	lastName: string;
	organization: string;
	phone: string;
	email: string;
	website: string;
	address: string;
	city: string;
	state: string;
	zip: string;
	country: string;
}

export interface EmailData {
	email: string;
	subject: string;
	body: string;
}

export interface SMSData {
	phone: string;
	message: string;
}

export interface PhoneData {
	phone: string;
}

export interface TextData {
	text: string;
}

export interface URLData {
	url: string;
}

export type TemplateData =
	| { type: 'url'; data: URLData }
	| { type: 'wifi'; data: WiFiData }
	| { type: 'vcard'; data: VCardData }
	| { type: 'email'; data: EmailData }
	| { type: 'sms'; data: SMSData }
	| { type: 'phone'; data: PhoneData }
	| { type: 'text'; data: TextData };

interface TemplateState {
	selectedTemplate: TemplateType;
	wifi: WiFiData;
	vcard: VCardData;
	email: EmailData;
	sms: SMSData;
	phone: PhoneData;
	text: TextData;
	url: URLData;
}

const initialState: TemplateState = {
	selectedTemplate: 'url',
	wifi: {
		ssid: '',
		password: '',
		security: 'WPA',
		hidden: false
	},
	vcard: {
		firstName: '',
		lastName: '',
		organization: '',
		phone: '',
		email: '',
		website: '',
		address: '',
		city: '',
		state: '',
		zip: '',
		country: ''
	},
	email: {
		email: '',
		subject: '',
		body: ''
	},
	sms: {
		phone: '',
		message: ''
	},
	phone: {
		phone: ''
	},
	text: {
		text: ''
	},
	url: {
		url: ''
	}
};

function createTemplateStore() {
	const { subscribe, set, update } = writable<TemplateState>(initialState);

	return {
		subscribe,
		setTemplate: (template: TemplateType) => {
			update((state) => ({ ...state, selectedTemplate: template }));
		},
		updateWiFi: (data: Partial<WiFiData>) => {
			update((state) => ({ ...state, wifi: { ...state.wifi, ...data } }));
		},
		updateVCard: (data: Partial<VCardData>) => {
			update((state) => ({ ...state, vcard: { ...state.vcard, ...data } }));
		},
		updateEmail: (data: Partial<EmailData>) => {
			update((state) => ({ ...state, email: { ...state.email, ...data } }));
		},
		updateSMS: (data: Partial<SMSData>) => {
			update((state) => ({ ...state, sms: { ...state.sms, ...data } }));
		},
		updatePhone: (data: Partial<PhoneData>) => {
			update((state) => ({ ...state, phone: { ...state.phone, ...data } }));
		},
		updateText: (data: Partial<TextData>) => {
			update((state) => ({ ...state, text: { ...state.text, ...data } }));
		},
		updateURL: (data: Partial<URLData>) => {
			update((state) => ({ ...state, url: { ...state.url, ...data } }));
		},
		reset: () => {
			set(initialState);
		}
	};
}

export const qrTemplate = createTemplateStore();
