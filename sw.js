// Dynamic cache versioning based on HTML metadata
// The cache version is read from the app-version meta tag in index.html
const DEFAULT_CACHE_NAME = 'qr-code-gen-v1.6.1'; // Default fallback

const ASSETS_TO_CACHE = [
  './',
  './index.html',
  './styles.css',
  './script.js',
  './icon-192.png',
  './icon-512.png',
  'https://cdnjs.cloudflare.com/ajax/libs/qrcodejs/1.0.0/qrcode.min.js'
];

/**
 * Helper function to get the current cache version from HTML metadata.
 * This allows the cache to automatically invalidate when the app version changes.
 * @returns {Promise<string>} The cache name (e.g., 'qr-code-gen-v1.5.1')
 */
async function getVersionFromHTML() {
  try {
    const response = await fetch('./index.html', { cache: 'no-cache' });
    const html = await response.text();
    const match = html.match(/<meta\s+name="app-version"\s+content="([^"]+)"/);
    if (match && match[1]) {
      return `qr-code-gen-v${match[1]}`;
    }
  } catch (error) {
    console.error('[SW] Failed to fetch version from HTML:', error);
  }
  return DEFAULT_CACHE_NAME; // Fallback to default
}

self.addEventListener('install', (event) => {
  event.waitUntil(
    (async () => {
      // Get dynamic version from HTML (local scope, no mutation)
      const cacheName = await getVersionFromHTML();
      console.log('[SW] Installing version:', cacheName);

      const cache = await caches.open(cacheName);
      await cache.addAll(ASSETS_TO_CACHE);
    })()
  );
  // Force the waiting service worker to become the active service worker
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    (async () => {
      // Get the current version (local scope, no mutation)
      const cacheName = await getVersionFromHTML();
      console.log('[SW] Activating version:', cacheName);

      // Clean up old caches
      const cacheNames = await caches.keys();
      await Promise.all(
        cacheNames
          .filter(name => name !== cacheName)
          .map((name) => {
            console.log('[SW] Deleted old cache:', name);
            return caches.delete(name);
          })
      );

      // Take control of all clients immediately after cache cleanup
      await self.clients.claim();
    })()
  );
});

self.addEventListener('fetch', (event) => {
  const { request } = event;

  // Network-first strategy for navigation requests (HTML files)
  // This ensures users always get the latest HTML with updated version metadata
  if (request.mode === 'navigate' || request.destination === 'document') {
    event.respondWith(
      (async () => {
        try {
          const response = await fetch(request);
          // Only cache successful responses
          if (response && response.ok && response.status === 200) {
            const cacheName = await getVersionFromHTML();
            const responseToCache = response.clone();
            try {
              const cache = await caches.open(cacheName);
              await cache.put(request, responseToCache);
            } catch (cacheError) {
              console.error('[SW] Failed to cache navigation response:', cacheError);
            }
          }
          return response;
        } catch (error) {
          console.error('[SW] Network request failed, falling back to cache:', error);
          // Fall back to cache if network fails
          const cachedResponse = await caches.match(request);
          if (cachedResponse) {
            return cachedResponse;
          }
          // If not in cache either, throw error
          console.error('[SW] No cached response available for:', request.url);
          throw error;
        }
      })()
    );
    return;
  }

  // Cache-first strategy for all other assets (CSS, JS, images, etc.)
  event.respondWith(
    (async () => {
      // Try cache first
      const cachedResponse = await caches.match(request);
      if (cachedResponse) {
        return cachedResponse;
      }

      // If not in cache, fetch from network
      try {
        const networkResponse = await fetch(request);
        // Only cache successful responses
        if (networkResponse && networkResponse.ok && networkResponse.status === 200) {
          const cacheName = await getVersionFromHTML();
          const responseToCache = networkResponse.clone();
          try {
            const cache = await caches.open(cacheName);
            await cache.put(request, responseToCache);
          } catch (cacheError) {
            console.error('[SW] Failed to cache resource:', cacheError);
          }
        }
        return networkResponse;
      } catch (error) {
        console.error('[SW] Fetch failed for:', request.url, error);
        throw error;
      }
    })()
  );
});
