<script type="module">
  // Import the functions you need from the SDKs you need
    import {initializeApp} from "https://www.gstatic.com/firebasejs/9.11.0/firebase-app.js";
  import {getAnalytics} from "https://www.gstatic.com/firebasejs/9.11.0/firebase-analytics.js";
  // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries

  // Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  const firebaseConfig = {
        apiKey: "AIzaSyAiNeeWmC2XF5aFabeaUlAwPLIhG90qHGQ",
    authDomain: "emic-d7274.firebaseapp.com",
    databaseURL: "https://emic-d7274.firebaseio.com",
    projectId: "emic-d7274",
    storageBucket: "emic-d7274.appspot.com",
    messagingSenderId: "908282206532",
    appId: "1:908282206532:web:a31c42aa98c0588730df11",
    measurementId: "G-BC5QPWW1BV"
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const analytics = getAnalytics(app);
</script>