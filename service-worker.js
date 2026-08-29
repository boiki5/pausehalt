/* ==========================================================================
   PauseHalt service worker
   Keeps a copy of the app on the device so it opens with no signal.

   WHEN YOU UPDATE THE APP: change CACHE_NAME below (v1 -> v2, and so on).
   Without that, returning visitors keep seeing the old cached version.
   ========================================================================== */

const CACHE_NAME = 'pausehalt-v3';

const FILES = [
  './',
  './index.html',
  './terms.html',
  './privacy.html',
  './manifest.json',
  './icons/icon-192.png',
  './icons/icon-512.png',
  './icons/apple-touch-icon.png',
  './icons/favicon-32.png'
];

// On install, download and store everything the app needs
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(FILES))
      .then(() => self.skipWaiting())
  );
});

// On activate, delete caches left over from older versions
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys()
      .then(names => Promise.all(
        names.filter(n => n !== CACHE_NAME).map(n => caches.delete(n))
      ))
      .then(() => self.clients.claim())
  );
});

/* Network first, cache second.
   Online, she always gets the newest version — so your fixes reach people
   straight away. Offline, the cached copy is served instead. */
self.addEventListener('fetch', event => {
  if (event.request.method !== 'GET') return;

  event.respondWith(
    fetch(event.request)
      .then(response => {
        // Store a fresh copy for next time
        const copy = response.clone();
        caches.open(CACHE_NAME).then(cache => cache.put(event.request, copy));
        return response;
      })
      .catch(() =>
        caches.match(event.request).then(hit => hit || caches.match('./index.html'))
      )
  );
});
