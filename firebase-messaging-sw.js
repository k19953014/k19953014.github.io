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
    console.log('Received background message ', payload);
    const notificationTitle = payload.notification.title;
    const notificationOptions = {
        body: payload.notification.body,
        icon: '/icon.png'
    };

    self.registration.showNotification(notificationTitle, notificationOptions);
});
