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
        const payload = event.data.json();

        const pushData = payload.data;
        if (!pushData) {
            return;
        }
        const notificationTitle = pushData.title;

        const notificationOptions = {
            body: pushData.body || 'Default body content.',
            icon: pushData.icon || '/default-icon.png',
            data: payload.data || {}
        };

        self.registration.showNotification(notificationTitle, notificationOptions);



        self.registration.active.postMessage({ message: pushData.oriMessage })

        // document.getElementById("messageContainer").textContent = data.oriMessage;
        // 傳遞通知內容到 PWA 前端

        // self.clients.matchAll().then((clients) => {
        //     clients.forEach((client) => {
        //         client.postMessage({ message: data.oriMessage });
        //     });
        // })


    } else {
        console.error('Push event but no data.');
    }
});

self.addEventListener("notificationclick", (event) => {
    event.notification.close();
    const url = event.notification.data.url;
    const action = event.notification.data.action


    if (url) {
      clients.openWindow(url); 
    }


  //   if (action == "ShowToDoNotificationCard" & url) {
  //       clients.openWindow(url); 
  //       return;
  //   }
  //   event.waitUntil(
  //     self.clients.matchAll({ type: "window", includeUncontrolled: true }).then((clientList) => {
  //         if (clientList.length > 0) {
  //             // 如果 PWA 已開啟，切換到現有分頁
  //             clientList[0].focus();
  //         } else {
  //             // 否則開啟新的 PWA 分頁
  //             self.clients.openWindow(event.notification.data.url);
  //         }
  //     })
  // );
});

