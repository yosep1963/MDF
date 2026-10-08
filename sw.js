/**
 * Service Worker for mDF Calculator PWA
 * Provides offline functionality and caching
 */

const CACHE_VERSION = 'v1.2.1';
const CACHE_NAME = `mdf-calculator-${CACHE_VERSION}`;

// Files to cache
const FILES_TO_CACHE = [
    '/',
    '/index.html',
    '/css/styles.css?v=1.2.1',
    '/js/app.js?v=1.2.1',
    '/js/i18n.js?v=1.2.1',
    '/manifest.json',
    '/icons/icon-192.png',
    '/icons/icon-512.png'
];

/**
 * Install Event - Cache static assets
 */
self.addEventListener('install', (event) => {
    console.log('[ServiceWorker] Installing...');

    event.waitUntil(
        caches.open(CACHE_NAME)
            .then((cache) => {
                console.log('[ServiceWorker] Caching app shell');
                return cache.addAll(FILES_TO_CACHE);
            })
            .then(() => {
                console.log('[ServiceWorker] Skip waiting');
                return self.skipWaiting();
            })
            .catch((error) => {
                console.error('[ServiceWorker] Cache failed:', error);
            })
    );
});

/**
 * Activate Event - Clean up old caches
 */
self.addEventListener('activate', (event) => {
    console.log('[ServiceWorker] Activating...');

    event.waitUntil(
        caches.keys()
            .then((cacheNames) => {
                return Promise.all(
                    cacheNames.map((cacheName) => {
                        if (cacheName !== CACHE_NAME) {
                            console.log('[ServiceWorker] Removing old cache:', cacheName);
                            return caches.delete(cacheName);
                        }
                    })
                );
            })
            .then(() => {
                console.log('[ServiceWorker] Claiming clients');
                return self.clients.claim();
            })
    );
});

/**
 * Fetch Event - Serve from cache, fallback to network
 * Strategy: Cache First, then Network
 */
self.addEventListener('fetch', (event) => {
    // Skip cross-origin requests
    if (!event.request.url.startsWith(self.location.origin)) {
        return;
    }

    event.respondWith(
        caches.match(event.request)
            .then((cachedResponse) => {
                if (cachedResponse) {
                    console.log('[ServiceWorker] Serving from cache:', event.request.url);
                    return cachedResponse;
                }

                console.log('[ServiceWorker] Fetching from network:', event.request.url);
                return fetch(event.request)
                    .then((response) => {
                        // Don't cache if not a success response
                        if (!response || response.status !== 200 || response.type !== 'basic') {
                            return response;
                        }

                        // Clone the response
                        const responseToCache = response.clone();

                        // Cache the new response
                        caches.open(CACHE_NAME)
                            .then((cache) => {
                                cache.put(event.request, responseToCache);
                            });

                        return response;
                    })
                    .catch((error) => {
                        console.error('[ServiceWorker] Fetch failed:', error);

                        // Return offline page or cached version
                        return caches.match('/index.html');
                    });
            })
    );
});

/**
 * Message Event - Handle messages from the app
 */
self.addEventListener('message', (event) => {
    if (event.data && event.data.type === 'SKIP_WAITING') {
        self.skipWaiting();
    }

    if (event.data && event.data.type === 'CACHE_URLS') {
        event.waitUntil(
            caches.open(CACHE_NAME)
                .then((cache) => {
                    return cache.addAll(event.data.payload);
                })
        );
    }
});

/**
 * Sync Event - Background sync (optional, for future features)
 */
self.addEventListener('sync', (event) => {
    if (event.tag === 'sync-calculations') {
        event.waitUntil(syncCalculations());
    }
});

/**
 * Sync calculations (placeholder for future feature)
 */
function syncCalculations() {
    return new Promise((resolve) => {
        console.log('[ServiceWorker] Syncing calculations...');
        // Future feature: sync calculation history to server
        resolve();
    });
}

/**
 * Push Event - Push notifications (optional, for future features)
 */
self.addEventListener('push', (event) => {
    const options = {
        body: event.data ? event.data.text() : 'New update available',
        icon: '/icons/icon-192.png',
        badge: '/icons/icon-192.png',
        vibrate: [200, 100, 200],
        tag: 'mdf-calculator',
        requireInteraction: false
    };

    event.waitUntil(
        self.registration.showNotification('mDF Calculator', options)
    );
});

/**
 * Notification Click Event
 */
self.addEventListener('notificationclick', (event) => {
    event.notification.close();

    event.waitUntil(
        clients.openWindow('/')
    );
});
