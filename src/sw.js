
const VERSION = 'v24';


log('Installing Service Worker');

function getCacheName() {
    return "app-cache-" + VERSION;
}




function log(message, ...data) {
    if (data.length > 0) {
        console.log(VERSION, message, data);
    }
    else {
        console.log(VERSION, message);
    }
}

/*

    These are the files that we want to download and install on the background

        '/',
        '/polyfills.bundle.js',
        '/inline.bundle.js',
        '/styles.bundle.js',
        '/vendor.bundle.js',
        '/main.bundle.js',
        '/assets/bundle.css',
        '/assets/angular-pwa-course.png',
        '/assets/main-page-logo-small-hat.png'
*/

async function installServiceWorker() {

    log("Service Worker installation started ");
    const cache = await caches.open(getCacheName());
    /**
     * Because of bundle differences it can be problematic
     * By default after new version is installed it is waiting to activate the new version till all tabs is closed
     */
    // self.skipWaiting();
    cache.addAll([
        '/',
        '/polyfills.js',
        '/runtime.js',
        '/styles.js',
        '/vendor.js',
        '/main.js',
        '/assets/bundle.css',
        '/assets/angular-pwa-course.png',
        '/assets/main-page-logo-small-hat.png',
        '/favicon.ico',

        '/api/lessons'
    ])
}

async function cacheThenNetwork(event) {
    const cache = await caches.open(getCacheName());
    const cachedResponse = await cache.match(event.request);
    if (cachedResponse) {
        log("From cache", event.request.url);
        return cachedResponse;
    }
    const networkResponse = await fetch(event.request);
    log("Calling network", event.request.url);
    return networkResponse;
}

async function activateSW() {
    log('Service Worker activated');
    const cacheKeys = await caches.keys();
    cacheKeys.forEach(cacheKey => {
        if (cacheKey !== getCacheName()) {
            caches.delete(cacheKey);
        }
    });
    return clients.claim();
}

self.addEventListener('install', event => event.waitUntil(installServiceWorker()));

self.addEventListener('activate', () => activateSW());

self.addEventListener('fetch', event => event.respondWith(cacheThenNetwork(event)));

















