// Service Worker für die "Installieren"-Fähigkeit (PWA). Cacht nur die
// eigene Seite (App-Shell) als Offline-Fallback — Live-Daten von Wikipedia
// und TheSportsDB laufen unangetastet direkt übers Netz, damit die Tabelle
// und Resultate nie veraltet aus dem Cache kommen.
const CACHE_NAME = "fcz-dashboard-v1";
const APP_SHELL = ["./", "./index.html", "./manifest.json", "./icon.svg"];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => cache.addAll(APP_SHELL))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(keys.filter((k) => k !== CACHE_NAME).map((k) => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", (event) => {
  const req = event.request;
  // Nur eigene GET-Anfragen abfangen; API-Aufrufe an andere Origins (Wikipedia,
  // TheSportsDB) bleiben unberührt und laufen normal übers Netz.
  if (req.method !== "GET" || new URL(req.url).origin !== self.location.origin) return;

  event.respondWith(
    fetch(req)
      .then((res) => {
        const copy = res.clone();
        caches.open(CACHE_NAME).then((cache) => cache.put(req, copy));
        return res;
      })
      .catch(() => caches.match(req).then((cached) => cached || caches.match("./index.html")))
  );
});
