var CACHE_NAME = 'tab-sync-v1';
var urlsToCache = [
    './index.html',
    './scripts/main.js'
];

self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(function (cache) {
                console.log('Opened cache');
                return cache.addAll(urlsToCache);
            })
    );
});

self.addEventListener('activate', event => {
    console.log('V1 now ready to handle fetches!');
});

self.addEventListener('fetch', async (event) => {
    event.respondWith(
        caches.match(event.request).then(async (response) => {

            // Cache hit - return response
            if (response) {
                return response;
            }
            return fetch(event.request);
        })
    );
});

self.addEventListener('message', event => {
    // console.log(`[Message] event: `, event);
    clients.matchAll().then(clients => {
        clients.forEach(client => {
            client.postMessage({
                value: event.data.value
            });
        })
    })

});
