const CACHE_NAME = "foodiee-v1";

const assets = [
  "/",
  "/index.html",
  "/css/style.css",
  "/js/ui.js",
  "/pages/about.html",
  "/pages/contact.html",
  "/img/burger.png",
  "/img/pasta.png",
  "/img/rice.png",
  "/img/desserts.png"
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
      .then(response => response || fetch(event.request))
  );
});