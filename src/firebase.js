// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyBGMu2I28FHpSJZc2VQWwRxDg1qzpsmDPY",
    authDomain: "extinctathon-35c32.firebaseapp.com",
    projectId: "extinctathon-35c32",
    storageBucket: "extinctathon-35c32.firebasestorage.app",
    messagingSenderId: "887211950021",
    appId: "1:887211950021:web:2e62353e587ceab684d5ac",
    measurementId: "G-4DF14S37FG"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);