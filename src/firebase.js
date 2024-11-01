import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyBGMu2I28FHpSJZc2VQWwRxDg1qzpsmDPY",
    authDomain: "extinctathon-35c32.firebaseapp.com",
    projectId: "extinctathon-35c32",
    storageBucket: "extinctathon-35c32.firebasestorage.app",
    messagingSenderId: "887211950021",
    appId: "1:887211950021:web:2e62353e587ceab684d5ac",
    measurementId: "G-4DF14S37FG"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };