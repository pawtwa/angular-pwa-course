const VERSION = "v5";

function log(messages) {
    console.log(VERSION, messages);
}

log("Installed Service Worker");

self.addEventListener('install', () => {
    log("Version is installed"); 
});

self.addEventListener('activate', () => {
    log("Version is activated"); 
});