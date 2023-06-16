const CACHE_NAME = 'chapro-cache';
const RESOURCES_TO_CACHE = [
  "/offline.html",
  "/no-internet.css",
  "/no-internet.jpg",
  "/"
  // Add other resources to cache here
];

/* eslint-disable no-restricted-globals */

self.addEventListener("install", (event) => {
  event.waitUntil(
    (async () => {
      const cache = await caches.open(CACHE_NAME);
      await cache.addAll(RESOURCES_TO_CACHE);
    })()
  );
});

self.addEventListener("fetch", (event) => {
  event.respondWith(
    (async () => {
      const requestUrl = new URL(event.request.url);
      if (navigator.onLine) {
        return fetch(event.request);
      }
      const cache = await caches.open(CACHE_NAME);
      const response = await cache.match(event.request);
      if (response) {
        return response;
      }
      const offlineResponse = await cache.match(requestUrl.pathname);
      return offlineResponse || cache.match("/offline.html") || fetch(event.request);
    })()
  );
});



self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

/* eslint-enable no-restricted-globals */
