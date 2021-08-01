this.addEventListener('install', function (event) {
  console.info('sw installed!');

  // 缓存文件
  event.waitUntil(
    caches.open('v1').then(function(cache) {
      return cache.addAll([
        '/style.css',
        '/star-wars-logo.jpg',
        '/gallery/bountyHunters.jpg',
        '/gallery/myLittleVader.jpg',
        '/gallery/snowTroopers.jpg'
      ]);
    })
  );
});
 
self.addEventListener('activate',(event)=>{
  console.info('sw activate!');
})

self.addEventListener('message', (event) => {
  console.log('sw接到消息', event.data);
})

self.addEventListener('fetch', async event => {
  if (event.clientId) {
    const client = await clients.get(event.clientId);
    // Exit early if we don't get the client.
    // Eg, if it closed.
    if (!client) return;
    // Send a message to the client.
    console.log('client发送消息');
    client.postMessage({
      msg: "Hey I just got a fetch from you!",
      url: event.request.url
    });
  }
});