/**
 * SGF OFF-GRID ROOT PROTOCOL - Service Worker
 * Fully Localized Motherboard State Execution Buffer
 * 
 * Bypasses network requirements to process applet assets from local non-volatile storage (ROM equivalent)
 * and keeps execution routines within client-side sandboxed RAM.
 */

const CACHE_NAME = 'sgf-root-cache-v1';
const ASSETS_TO_CACHE = [
  '/',
  '/index.html',
  '/src/main.tsx',
  '/src/App.tsx',
  '/src/index.css',
  'https://fonts.googleapis.com/css2?family=Inter:wght@400;700;900&family=Space+Grotesk:wght@300;500;700&family=JetBrains+Mono:wght@400;700&display=swap'
];

self.addEventListener('install', (event) => {
  // Force active state bypassing network latency overheads
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('[SGF ROOT PROTOCOL] Pre-allocating offline compilation caches...');
      return cache.addAll(ASSETS_TO_CACHE);
    }).then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', (event) => {
  // Claim client to hook immediately without dynamic reload requirements
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cache) => {
          if (cache !== CACHE_NAME) {
            console.log('[SGF ROOT PROTOCOL] Offloading stale state containers:', cache);
            return caches.delete(cache);
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (event) => {
  // Evade network telemetry entirely if cache is primed
  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      if (cachedResponse) {
        return cachedResponse;
      }
      
      return fetch(event.request).then((networkResponse) => {
        // Cache dynamic layout requests for subsequent offsite bootups
        if (
          networkResponse && 
          networkResponse.status === 200 && 
          networkResponse.type === 'basic' &&
          !event.request.url.includes('/api/')
        ) {
          const responseToCache = networkResponse.clone();
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(event.request, responseToCache);
          });
        }
        return networkResponse;
      }).catch(() => {
        // If entirely off-grid, serve cached index fallback immediately
        if (event.request.mode === 'navigate') {
          return caches.match('/index.html');
        }
        return new Response('Offline Source Alignment Activated - Asset Awaiting Network Hook.', {
          status: 503,
          statusText: 'Service Unavailable (Offline)'
        });
      });
    })
  );
});
