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

function detectDeviceInfo() {
    const userAgent = navigator.userAgent.toLowerCase();
  
    let deviceType = '';
    if (/iphone|ipad|ipod/.test(userAgent)) {
      deviceType = 'iOS';
    } else if (/android/.test(userAgent)) {
      deviceType = 'Android';
    } else if (/win/.test(userAgent)) {
      deviceType = 'Windows PC';
    } else if (/mac/.test(userAgent) && !/like mac os x/.test(userAgent)) {
      deviceType = 'Mac';
    } else {
      deviceType = 'Unknown Device';
    }
  
    return {
      deviceType,
      userAgent,
    };
  }

self.addEventListener('push', (event) => {
    console.log('Received background message by addEventListener', event);
    if (event.data) {
        const payload = event.data.json(); // 获取消息的 JSON 数据

        const notificationTitle = payload.notification?.title || 'Default Title';

        var deviceInfo = detectDeviceInfo();
        if (deviceInfo.deviceType == "iOS" || deviceInfo.deviceType == "Mac") {
            return;
        }

        const notificationOptions = {
            body: payload.notification?.body || 'Default body content.',
            icon: payload.notification?.icon || '/default-icon.png',
            data: payload.data || {}, // 附加数据
        };

        self.registration.showNotification(notificationTitle, notificationOptions);
    } else {
        console.error('Push event but no data.');
    }
  })
