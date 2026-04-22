const CACHE_NAME = "foodiee-v1";

const assets = [
  "/foodie-pwa/index.html",
  "/foodie-pwa/css/style.css",
  "/foodie-pwa/js/ui.js",
  "/foodie-pwa/pages/about.html",
  "/foodie-pwa/pages/contact.html",
  "/foodie-pwa/img/burger.png",
  "/foodie-pwa/img/pasta.png",
  "/foodie-pwa/img/rice.png",
  "/foodie-pwa/img/desserts.png"
];

// INSTALL
self.addEventListener("install", event => {
  console.log("Service Worker Installed");

  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(assets))
  );
});

// ACTIVATE
self.addEventListener("activate", event => {
  console.log("Service Worker Activated");

  event.waitUntil(
    caches.keys().then(keys => {
      return Promise.all(
        keys.filter(key => key !== CACHE_NAME)
            .map(key => caches.delete(key))
      );
    })
  );
});

// FETCH
self.addEventListener("fetch", event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        return response || fetch(event.request)
          .catch(() => caches.match("/foodie-pwa/index.html"));
      })
  );
});