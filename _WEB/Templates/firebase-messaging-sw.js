// this file must be in root folder
importScripts('https://www.gstatic.com/firebasejs/10.1.0/firebase-app-compat.js')
importScripts('https://www.gstatic.com/firebasejs/10.1.0/firebase-messaging-compat.js')

const firebaseConfig = {
    // Modificar y utilizar los  datos del cuenta de la empresa.
    apiKey: "AIzaSyBaefJaGbvJEcUz4JxWZltRSiXwTlr37cg",
    authDomain: "app-nueva-b3943.firebaseapp.com",
    projectId: "app-nueva-b3943",
    storageBucket: "app-nueva-b3943.appspot.com",
    messagingSenderId: "947440843893",
    appId: "1:947440843893:web:8ddeca8c860e07b67f4c3c"
  };

// receiving messages in background
const app = firebase.initializeApp(firebaseConfig)
const messaging = firebase.messaging()

// get this type of message in background
messaging.onBackgroundMessage(function (payload) {
    if (!payload.hasOwnProperty('notification')) {
        const notificationTitle = payload.data.title
        const notificationOptions = {
            body: payload.data.body,
            icon: payload.data.icon,
            image: payload.data.image
        }
        self.registration.showNotification(notificationTitle, notificationOptions);
        self.addEventListener('notificationclick', function (event) {
            const clickedNotification = event.notification
            clickedNotification.close();
            event.waitUntil(
                clients.openWindow(payload.data.click_action)
            )
        })
    }
})