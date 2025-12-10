// Dynamic cache versioning based on HTML metadata
// The cache version is read from the app-version meta tag in index.html
let CACHE_NAME = 'qr-code-gen-v1.5.0'; // Default fallback

const ASSETS_TO_CACHE = [
  './',
  './index.html',
  './styles.css',
  './script.js',
  './icon-192.png',
  './icon-512.png',
  'https://cdnjs.cloudflare.com/ajax/libs/qrcodejs/1.0.0/qrcode.min.js'
];

// Helper function to get version from HTML metadata
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
  return CACHE_NAME; // Fallback to default
}

self.addEventListener('install', (event) => {
  event.waitUntil(
    (async () => {
      // Get dynamic version from HTML
      CACHE_NAME = await getVersionFromHTML();
      console.log('[SW] Installing version:', CACHE_NAME);

      const cache = await caches.open(CACHE_NAME);
      await cache.addAll(ASSETS_TO_CACHE);
    })()
  );
  // Force the waiting service worker to become the active service worker
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    (async () => {
      // Get the current version again to ensure consistency
      CACHE_NAME = await getVersionFromHTML();
      console.log('[SW] Activating version:', CACHE_NAME);

      // Clean up old caches
      const cacheNames = await caches.keys();
      await Promise.all(
        cacheNames
          .filter(cacheName => cacheName !== CACHE_NAME)
          .map((cacheName) => {
            console.log('[SW] Deleted old cache:', cacheName);
            return caches.delete(cacheName);
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
      fetch(request)
        .then(response => {
          // Clone the response and cache it
          const responseToCache = response.clone();
          caches.open(CACHE_NAME).then(cache => {
            cache.put(request, responseToCache);
          });
          return response;
        })
        .catch(error => {
          console.error('[SW] Network request failed, falling back to cache:', error);
          // Fall back to cache if network fails
          return caches.match(request)
            .then(cachedResponse => {
              if (cachedResponse) {
                return cachedResponse;
              }
              // If not in cache either, return a basic offline page response
              console.error('[SW] No cached response available for:', request.url);
              throw error;
            });
        })
    );
    return;
  }

  // Cache-first strategy for all other assets (CSS, JS, images, etc.)
  event.respondWith(
    caches.match(request)
      .then((response) => {
        if (response) {
          return response;
        }
        // If not in cache, fetch from network
        return fetch(request)
          .then(networkResponse => {
            // Cache the fetched resource for future use
            const responseToCache = networkResponse.clone();
            caches.open(CACHE_NAME).then(cache => {
              cache.put(request, responseToCache);
            });
            return networkResponse;
          })
          .catch(error => {
            console.error('[SW] Fetch failed for:', request.url, error);
            throw error;
          });
      })
  );
});
