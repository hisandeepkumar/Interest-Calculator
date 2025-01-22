const CACHE_NAME = "interest-calculator-v1";
const urlsToCache = [
    "./",
    "./index.html",
    "./manifest.json",
    "./style.css", // Replace with your CSS file name
    "./icon-192x192.png", // Replace with your icon file paths
    "./icon-512x512.png",
    "./script.js", // Replace with your JS file name
    "https://cdn.jsdelivr.net/npm/chart.js" // External dependencies
];

// Install Service Worker
self.addEventListener("install", (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            return cache.addAll(urlsToCache);
        })
    );
});

// Fetch Resources
self.addEventListener("fetch", (event) => {
    event.respondWith(
        caches.match(event.request).then((response) => {
            return response || fetch(event.request);
        })
    );
});

// Activate Service Worker and Remove Old Caches
self.addEventListener("activate", (event) => {
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.map((cache) => {
                    if (cache !== CACHE_NAME) {
                        return caches.delete(cache);
                    }
                })
            );
        })
    );
});
