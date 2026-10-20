'use strict';
const CACHE='shape-garden-hints-v1';
const ASSETS=['./','./index.html','./content.js?v=hints1','./app.js?v=hints1','./icon.svg','./manifest.webmanifest','./photo-theme.css?v=photo1','./assets/sky-photo.jpg','./assets/forest-photo.jpg'];
self.addEventListener('install',event=>{event.waitUntil(caches.open(CACHE).then(cache=>cache.addAll(ASSETS)).then(()=>self.skipWaiting()));});
self.addEventListener('activate',event=>{event.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k.startsWith('shape-garden-')&&k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim()));});
self.addEventListener('fetch',event=>{
 if(event.request.method!=='GET'||new URL(event.request.url).origin!==self.location.origin)return;
 const path=new URL(event.request.url).pathname;
 if(!ASSETS.some(a=>new URL(a,self.registration.scope).pathname===path))return;
 event.respondWith(caches.match(event.request).then(cached=>cached||fetch(event.request)));
});
