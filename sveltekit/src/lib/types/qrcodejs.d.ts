declare module 'qrcodejs' {
	interface QRCodeOptions {
		text: string;
		width?: number;
		height?: number;
		colorDark?: string;
		colorLight?: string;
		correctLevel?: number;
	}

	class QRCode {
		static CorrectLevel: {
			L: number;
			M: number;
			Q: number;
			H: number;
		};

		constructor(element: HTMLElement, options: QRCodeOptions | string);
		clear(): void;
		makeCode(text: string): void;
	}

	export default QRCode;
}
