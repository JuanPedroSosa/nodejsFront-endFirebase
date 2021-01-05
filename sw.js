//install
// active
// fetch
const CACHE_NAME = "STORIES_CACHE-v1"; // es util para invalidar el cache si necesitamos algun cambio v2
// install se ejcuta la primera que se registra
self.addEventListener("install", function() {
	caches.open(CACHE_NAME).then(function(cache) {
		cache.addAll(["index.html"]);

	})
})

// se ejecuta cada vez que hay un cambio service worker
self.addEventListener("activate", function(ev) {
	ev.waitUntil(
		caches.keys().then(function(cacheNames) {
			let promises = [];
			cacheNames.forEach(cacheName => {
				if (CACHE_NAME !== cacheName)
					promises.push(caches.delete(cacheName));
			})
			return new Promise.all(promises);
		})
	);

})

self.addEventListener("fetch", function(ev) {
	ev.respondWith(
		caches.match(ev.request).then(function(response){
			console.log(response);
			return searchCacheOrMakeRequest(ev.request); //response || fetch(ev.request);
		}).catch(function(err) { // acá entra cuando no hay internet
			if (ev.request.mode == "navigate")
				return caches.match(ev.request);
		})
	);
});

function searchCacheOrMakeRequest(request) {
	const cachePromise = caches.open(CACHE_NAME);
	const matchPromise = cachePromise.then(function(cache){
		return cache.match(request);
	});

	return Promise.all([cachePromise, matchPromise]).then(function([cache, cacheResponse]) {
		const fetchPromise = fetch(request).then(function(fetchResponse){
			cache.put(request,fetchResponse.clone());
			return fetchResponse;
		})

		return cacheResponse || fetchPromise;
	})
}