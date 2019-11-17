importScripts('https://storage.googleapis.com/workbox-cdn/releases/3.6.3/workbox-sw.js');

if (workbox) {
    console.log(`Workbox berhasil dimuat`);
    ///Precaching App Shell
    workbox.precaching.precacheAndRoute([
        {
            url: '/',
            revision: '3'
        },
        {
            url: '/nav.html',
            revision: '3'
        },
        {
            url: '/index.html',
            revision: '3'
        },
        {
            url: '/detail.html',
            revision: '3'
        },
        {
            url: '/pages/home.html',
            revision: '3'
        },
        {
            url: '/pages/gol.html',
            revision: '3'
        },
        {
            url: '/pages/favorit.html',
            revision: '3'
        },
        {
            url: '/css/materialize.min.css',
            revision: '3'
        },
        {
            url: '/css/materialize.css',
            revision: '3'
        },
        {
            url: '/js/materialize.min.js',
            revision: '3'
        },
        {
            url: '/js/materialize.js',
            revision: '3'
        },
        {
            url: '/js/nav.js',
            revision: '3'
        },
        {
            url: '/js/api.js',
            revision: '3'
        },
        {
            url: '/js/register.js',
            revision: '3'
        },
        {
            url: '/js/db.js',
            revision: '3'
        },
        {
            url: '/js/idb.js',
            revision: '3'
        },
        {
            url: '/img/icon.png',
            revision: '3'
        },
        {
            url: '/img/latar-baju.png',
            revision: '3'
        },
        {
            url: '/manifest.json',
            revision: '3'
        },
        {
            url: 'https://fonts.googleapis.com/icon?family=Material+Icons',
            revision: '3'
        },
        {
            url: 'https://fonts.gstatic.com/s/materialicons/v48/flUhRq6tzZclQEJ-Vdg-IuiaDsNcIhQ8tQ.woff2',
            revision: '3'
        },
        {
            url: 'https://unpkg.com/snarkdown@1.0.2/dist/snarkdown.umd.js',
            revision: '3'
        },
    ]);

    workbox.routing.registerRoute(
        /.*(?:png|gif|jpg|jpeg|svg)$/,
        workbox.strategies.cacheFirst({
            cacheName: 'images-cache',
            plugins: [
                new workbox.cacheableResponse.Plugin({
                    statuses: [0, 200]
                }),
                new workbox.expiration.Plugin({
                    maxEntries: 100,
                    maxAgeSeconds: 30 * 24 * 60 * 60,
                }),
            ]
        })
    );

    workbox.routing.registerRoute(
        new RegExp('https://api.football-data.org/v2/'),
        workbox.strategies.staleWhileRevalidate()
    )

    // Menyimpan cache dari CSS Google Fonts
    workbox.routing.registerRoute(
        /^https:\/\/fonts\.googleapis\.com/,
        workbox.strategies.staleWhileRevalidate({
            cacheName: 'google-fonts-stylesheets',
        })
    );

    // Menyimpan cache untuk file font selama 1 tahun
    workbox.routing.registerRoute(
        /^https:\/\/fonts\.gstatic\.com/,
        workbox.strategies.cacheFirst({
            cacheName: 'google-fonts-webfonts',
            plugins: [
                new workbox.cacheableResponse.Plugin({
                    statuses: [0, 200],
                }),
                new workbox.expiration.Plugin({
                    maxAgeSeconds: 60 * 60 * 24 * 365,
                    maxEntries: 30,
                }),
            ],
        })
    );

    workbox.routing.registerRoute(
        new RegExp('/pages/'),
        workbox.strategies.staleWhileRevalidate()
    );

} else {
    console.log(`Workbox gagal dimuat`);
}

self.addEventListener('push', function(event) {
    var body;
    if (event.data) {
        body = event.data.text();
    } else {
        body = 'Push message no payload';
    }
    var options = {
        body: body,
        icon: 'img/icon.png',
        vibrate: [100, 50, 100],
        data: {
        dateOfArrival: Date.now(),
        primaryKey: 1
        }
    };
    event.waitUntil(
        self.registration.showNotification('Push Notification', options)
    );
});