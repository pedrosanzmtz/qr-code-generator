import { sveltekit } from '@sveltejs/kit/vite';
import { SvelteKitPWA } from '@vite-pwa/sveltekit';
import { defineConfig } from 'vite';

export default defineConfig({
	plugins: [
		sveltekit(),
		SvelteKitPWA({
			registerType: 'autoUpdate',
			manifest: {
				name: 'QR Code Generator',
				short_name: 'QR Gen',
				description: 'Create QR codes instantly from any URL',
				start_url: '/',
				display: 'standalone',
				background_color: '#ffffff',
				theme_color: '#667eea',
				icons: [
					{
						src: '/icon-192.png',
						sizes: '192x192',
						type: 'image/png'
					},
					{
						src: '/icon-512.png',
						sizes: '512x512',
						type: 'image/png'
					},
					{
						src: '/icon-512.png',
						sizes: '512x512',
						type: 'image/png',
						purpose: 'maskable'
					}
				]
			},
			workbox: {
				// Network-first for navigation (HTML), cache-first for assets
				runtimeCaching: [
					{
						urlPattern: /^https:\/\/.*\.(js|css|png|jpg|jpeg|svg|gif|webp|woff|woff2)$/,
						handler: 'CacheFirst',
						options: {
							cacheName: 'assets-cache',
							expiration: {
								maxEntries: 100,
								maxAgeSeconds: 60 * 60 * 24 * 30 // 30 days
							}
						}
					}
				],
				navigateFallback: null,
				cleanupOutdatedCaches: true
			},
			devOptions: {
				enabled: true
			}
		})
	]
});
