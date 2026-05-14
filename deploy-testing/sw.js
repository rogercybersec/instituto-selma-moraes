// Service Worker — Instituto Selma Moraes PWA
// Versão: 3 | Network-first para HTML (sempre fresh) + cache-first para assets
const VERSION = 'selma-v3-' + Date.now();
const ASSETS = [
  '/',
  '/index.html',
  '/diagnostico.html',
  '/manifest.webmanifest',
  '/logo-sm-footer-cutout.png',
  '/logo-sm-monogram.png',
  '/icon-192.png',
  '/icon-512.png',
  '/apple-touch-icon.png',
];

self.addEventListener('install', (e) => {
  self.skipWaiting();
  e.waitUntil(
    caches.open(VERSION).then((c) => c.addAll(ASSETS).catch(() => {}))
  );
});

self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((k) => k !== VERSION).map((k) => caches.delete(k)))
    ).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (e) => {
  const req = e.request;
  if (req.method !== 'GET') return;
  if (!req.url.startsWith('http')) return;

  const url = new URL(req.url);
  // CRITICAL: NÃO interceptar cross-origin (CDNs como Three.js, Google Fonts)
  // Cross-origin retorna opaque response que browser não consegue executar como script
  if (url.origin !== self.location.origin) return;

  const isHTML = req.mode === 'navigate' || req.destination === 'document' || url.pathname.endsWith('.html') || url.pathname === '/' || url.pathname.match(/^\/[^.]*$/);

  if (isHTML) {
    // HTML: NETWORK-FIRST — sempre busca fresh, evita cache stale do site
    e.respondWith(
      fetch(req).then((res) => {
        if (res && res.status === 200) {
          const clone = res.clone();
          caches.open(VERSION).then((c) => c.put(req, clone));
        }
        return res;
      }).catch(() => caches.match(req))
    );
    return;
  }

  // Assets (img/css/js/png/woff): cache-first stale-while-revalidate
  e.respondWith(
    caches.match(req).then((cached) => {
      const network = fetch(req).then((res) => {
        if (res && res.status === 200) {
          const clone = res.clone();
          caches.open(VERSION).then((c) => c.put(req, clone));
        }
        return res;
      }).catch(() => cached);
      return cached || network;
    })
  );
});
