'use strict';
const CACHE='shape-garden-craft-v2';
const ASSETS=['./','./index.html','./content.js?v=craft2','./app.js?v=craft2','./icon.svg','./manifest.webmanifest','./block-theme.css?v=craft2','./assets/adventure-world.svg','./assets/grass-tile.svg','./assets/dirt-tile.svg','./assets/stone-tile.svg','./assets/block-character.png','./challenges.js?v=craft2'];
self.addEventListener('install',event=>{event.waitUntil(caches.open(CACHE).then(cache=>cache.addAll(ASSETS)).then(()=>self.skipWaiting()));});
self.addEventListener('activate',event=>{event.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k.startsWith('shape-garden-')&&k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim()));});
self.addEventListener('fetch',event=>{
 if(event.request.method!=='GET'||new URL(event.request.url).origin!==self.location.origin)return;
 const path=new URL(event.request.url).pathname;
 if(!ASSETS.some(a=>new URL(a,self.registration.scope).pathname===path))return;
 event.respondWith(caches.match(event.request).then(cached=>cached||fetch(event.request)));
});
