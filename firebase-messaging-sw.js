importScripts("https://www.gstatic.com/firebasejs/11.1.0/firebase-app-compat.js")
importScripts("https://www.gstatic.com/firebasejs/11.1.0/firebase-messaging-compat.js")

var firebaseConfig = {
    apiKey: 'AIzaSyDt6A9AoWuv19VrVCXGGZxmeBIPyEPOBYU',
    authDomain: 'vitalhcm-3ddd7.firebaseapp.com',
    databaseURL: 'https://vitalhcm-3ddd7.firebaseio.com',
    projectId: "vitalhcm-3ddd7",
    storageBucket: "vitalhcm-3ddd7.firebasestorage.app",
    messagingSenderId: "247345230282",
    appId: "1:247345230282:web:1a24b744b74e3fc5acdf33",
    measurementId: "G-5FLD66CYEZ"
};
firebase.initializeApp(firebaseConfig);


const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
    console.log('Received background message by onBackgroundMessage', payload);
    const notificationTitle = payload.notification.title;
    const notificationOptions = {
        body: payload.notification.body,
        icon: '/icon.png'
    };

    self.registration.showNotification(notificationTitle, notificationOptions);
});

messaging.onMessage((payload) => {
    console.log('Message received in foreground:', payload);
    const notificationTitle = payload.notification.title;
    const notificationOptions = {
        body: payload.notification.body,
        icon: '/firebase-logo.png'
    };

    new Notification(notificationTitle, notificationOptions);
});

self.addEventListener('push', (event) => {
    console.log('Received background message by addEventListener', event);
    const notificationTitle = event.notification.title;
    const notificationOptions = {
        body: event.notification.body,
        icon: '/icon.png'
    };

    return self.registration.showNotification(notificationTitle, notificationOptions);
  })
