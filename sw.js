const CACHE_NAME = "craig-paper-dashboard-v13";
const ASSETS = [
  "./",
  "./index.html",
  "./styles.css",
  "./app.js",
  "./manifest.webmanifest",
  "./icon.svg",
  "./assets/fighters/licenses/public-license.txt",
  "./assets/fighters/brawler-girl/idle.png",
  "./assets/fighters/brawler-girl/walk.png",
  "./assets/fighters/brawler-girl/jab.png",
  "./assets/fighters/brawler-girl/punch.png",
  "./assets/fighters/brawler-girl/kick.png",
  "./assets/fighters/brawler-girl/hurt.png",
  "./assets/fighters/enemy-punk/idle.png",
  "./assets/fighters/enemy-punk/walk.png",
  "./assets/fighters/enemy-punk/punch.png",
  "./assets/fighters/enemy-punk/hurt.png",
  "./assets/fighters/fx/queen.png",
  "./assets/fighters/fx/fistbot.png",
  "./assets/fighters/fx/hitspark.png"
];

self.addEventListener("install", (event) => {
  event.waitUntil(caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS)));
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) => Promise.all(
      keys.filter((key) => key !== CACHE_NAME).map((key) => caches.delete(key))
    )).then(() => self.clients.claim()).then(() => self.clients.matchAll({
      type: "window",
      includeUncontrolled: true
    })).then((clients) => {
      clients.forEach((client) => {
        if ("navigate" in client) client.navigate(client.url);
      });
    })
  );
});

self.addEventListener("fetch", (event) => {
  const request = event.request;
  if (request.method !== "GET") return;
  const url = new URL(request.url);
  if (request.mode === "navigate" || request.destination === "document") {
    event.respondWith(
      fetch(request)
        .then((response) => {
          const clone = response.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put("./", clone));
          return response;
        })
        .catch(() => caches.match("./").then((cached) => cached || caches.match("./index.html")))
    );
    return;
  }
  event.respondWith(
    caches.match(request).then((cached) => {
      if (cached) return cached;
      return fetch(request).then((response) => {
        if (url.origin === self.location.origin) {
          const clone = response.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(request, clone));
        }
        return response;
      });
    })
  );
});
