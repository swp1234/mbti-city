const CACHE_NAME = 'mbti-city-v1';
const ASSETS = [
  '/mbti-city/',
  '/mbti-city/index.html',
  '/mbti-city/css/style.css',
  '/mbti-city/js/app.js',
  '/mbti-city/js/i18n.js',
  '/mbti-city/js/locales/ko.json',
  '/mbti-city/js/locales/en.json',
  '/mbti-city/js/locales/ja.json',
  '/mbti-city/js/locales/zh.json',
  '/mbti-city/js/locales/hi.json',
  '/mbti-city/js/locales/ru.json',
  '/mbti-city/js/locales/es.json',
  '/mbti-city/js/locales/pt.json',
  '/mbti-city/js/locales/id.json',
  '/mbti-city/js/locales/tr.json',
  '/mbti-city/js/locales/de.json',
  '/mbti-city/js/locales/fr.json',
  '/mbti-city/manifest.json',
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(ASSETS))
  );
  self.skipWaiting();
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k)))
    )
  );
  self.clients.claim();
});

self.addEventListener('fetch', event => {
  if (!event.request.url.startsWith(self.location.origin)) return;
  event.respondWith(
    fetch(event.request).then(response => {
      if (response && response.status === 200) {
        const clone = response.clone();
        caches.open(CACHE_NAME).then(cache => cache.put(event.request, clone));
      }
      return response;
    }).catch(() => caches.match(event.request))
  );
});
