const VERSION = "v15";

function log(messages, ...data) {
    console.log(VERSION, messages, data);
}

async function installServiceWorker() {
    log("Service worker installation started");
    const request = new Request('/offline.html');
    const response = await fetch(request);
    log("response received after loading offline.html", response);
    if (response.status !== 200) {
        throw new Error("Could not load offline page");
    }
    const cache = await caches.open('app-cache');
    cache.put(request, response);
    log("Cached `offline.html`", cache);
    log("Service worker installed");
}

async function showOfflineError(event) {
    let response;
    try {
        log("Calling network", event.request.url);
        response = await fetch(event.request);
    } catch(err) {
        log("Network request failed. Serving offline page", err);
        const cache = await caches.open('app-cache');
        response = cache.match("/offline.html");
    }
    return response;
}

self.addEventListener('install', event => event.waitUntil(installServiceWorker()));

self.addEventListener('activate', () => {
    log("Service worker activation started");
    log("Service worker activated"); 
});

self.addEventListener('fetch', event => event.respondWith(showOfflineError(event)));
