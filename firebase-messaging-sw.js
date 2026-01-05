
importScripts('https://www.gstatic.com/firebasejs/10.7.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.7.0/firebase-messaging-compat.js');

firebase.initializeApp({
  apiKey: "AIzaSyAKWNQ6qq-3FdCZT-gm-lVqWw_VmLo3UZY",
  authDomain: "gen-lang-client-0654563230.firebaseapp.com",
  projectId: "gen-lang-client-0654563230",
  storageBucket: "gen-lang-client-0654563230.firebasestorage.app",
  messagingSenderId: "681432862802",
  appId: "1:681432862802:web:d7d92025fb00c91a394f8b"
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  console.log('[firebase-messaging-sw.js] Received background message ', payload);
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon: '/firebase-logo.png'
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});
