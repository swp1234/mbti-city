const CACHE='mbti-city-v2',SCOPE='/mbti-city/';
const ASSETS=[SCOPE,SCOPE+'index.html',SCOPE+'css/style.css',SCOPE+'js/app.js',SCOPE+'js/i18n.js',SCOPE+'manifest.json',...['ko','en','zh','hi','ru','ja','es','pt','id','tr','de','fr'].map(lang=>SCOPE+'js/locales/'+lang+'.json')];
self.addEventListener('install',event=>{event.waitUntil(caches.open(CACHE).then(cache=>cache.addAll(ASSETS)));self.skipWaiting()});
self.addEventListener('activate',event=>{event.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(key=>key!==CACHE).map(key=>caches.delete(key)))));self.clients.claim()});
self.addEventListener('fetch',event=>{const request=event.request,url=new URL(request.url);if(request.method!=='GET'||url.origin!==self.location.origin||!url.pathname.startsWith(SCOPE))return;event.respondWith(fetch(request).then(response=>{if(response.ok)caches.open(CACHE).then(cache=>cache.put(request,response.clone()));return response}).catch(()=>caches.match(request))) });
