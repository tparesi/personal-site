const criticalResources = [
  '/javascripts/site.js',
  '/stylesheets/site.css',
  '/images/cactus.jpg',
  '/index.html',
  '/tparesi-resume.pdf'
],
otherResources = [],
version = 'v1::',
staticCacheName = 'static';

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(version + staticCacheName)
    .then(cache => {
                  cache.addAll(otherResources);
                  return cache.addAll(criticalResources)})
          .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys()
      .then((cacheNames) => {
        return Promise.all(
          cacheNames.filter((key) => {
            // return key.includes(version);
          }).map((key) => {
            return caches.delete(key);
          })
        );
      })
  );
});

self.addEventListener('fetch', event => {
  const request = event.request;

  event.respondWith(
    caches.open(version + staticCacheName).then((cache) => {
      return cache.match(request).then((response) => {
        return response || fetch(request).then((response) => {
          cache.put(request, response.clone());
          return response;
        });
      });
    })
  );
});

const logResumeDirections = () => {
  console.log('I have hidden my resume using the Cache API and Service Worker API.');
  console.log("I will teach you a little bit about these API's, while leading you to my resume.");
  console.log('First, press the Esc key to keep the console open.');
  console.log('Then click the gear icon on the right side and make sure Preserve Log is checked.');
  console.log('Next, go to the Application Tab.');
  console.log('On the left side, go to Cache > Cache Storage > ' + version + staticCacheName + '.');
  console.log("Here you will see the cached files for this website. The Cache API uses this storage to cache it's files.");
  console.log('Click on the Resume, then head to the preview. In order to see it properly, right click and open in new tab.');
  console.log('Lastly, on the left side, go to Application > Service Workers.');
  console.log('Click the offline option and refresh the page! This is the service worker I registered for my site in action');
  console.log('Using the Cache API and Service Worker API, websites can offer optimal experiences for users with slow or no internet.');
  console.log('This works as long as the user has been to the website previously, which is why you will have my resume until you or the browser clears the cache.');
  // console.log('Read my blog article about this for a deeper dive on the topic.');
};

logResumeDirections();