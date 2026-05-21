const CACHE_NAME = 'mindbook-v2';

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(async (cache) => {
      const urls = ['/', '/index.html', '/manifest.json'];
      await Promise.all(
        urls.map(async (url) => {
          try {
            await cache.add(url);
          } catch {
            // Skip missing assets (e.g. dev build paths) so install never fails
          }
        })
      );
      self.skipWaiting();
    })
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((k) => k !== CACHE_NAME).map((k) => caches.delete(k)))
    )
  );
});

self.addEventListener('fetch', (event) => {
  if (event.request.method !== 'GET') return;
  event.respondWith(
    caches.match(event.request).then((cached) => cached || fetch(event.request))
  );
});

self.addEventListener('push', (event) => {
  const fallback = {
    title: 'MindBook notification',
    body: 'You have a new notification.',
    icon: '/icons/icon-192x192.png',
    url: '/notifications',
  };

  const data = event.data ? event.data.json() : fallback;
  event.waitUntil(
    self.registration.showNotification(data.title || fallback.title, {
      body: data.body || fallback.body,
      icon: data.icon || fallback.icon,
      badge: '/icons/icon-192x192.png',
      data: { url: data.url || fallback.url },
    })
  );
});

self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  const url = event.notification.data?.url || '/notifications';
  event.waitUntil(
    clients.matchAll({ type: 'window', includeUncontrolled: true }).then((windowClients) => {
      const existingClient = windowClients.find((client) => client.url.includes(url));
      if (existingClient) return existingClient.focus();
      return clients.openWindow(url);
    })
  );
});
