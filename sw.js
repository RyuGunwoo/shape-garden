'use strict';
const CACHE='shape-garden-unit-v2';
const ASSETS=['./','./index.html','./content.js?v=unit-v2','./engine.js?v=unit-v2','./app.js?v=unit-v2','./block-theme.css?v=unit-v2','./icon.svg','./manifest.webmanifest','./assets/adventure-world.svg','./assets/grass-tile.svg','./assets/dirt-tile.svg','./assets/stone-tile.svg','./assets/block-character.png'];
self.addEventListener('install',e=>e.waitUntil(caches.open(CACHE).then(c=>c.addAll(ASSETS)).then(()=>self.skipWaiting())));
self.addEventListener('activate',e=>e.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k.startsWith('shape-garden-')&&k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim())));
self.addEventListener('fetch',e=>{if(e.request.method!=='GET'||new URL(e.request.url).origin!==self.location.origin)return;const path=new URL(e.request.url).pathname;if(!ASSETS.some(a=>new URL(a,self.registration.scope).pathname===path))return;e.respondWith(caches.match(e.request).then(c=>c||fetch(e.request)));});
