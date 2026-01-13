import { initializeApp, getApps } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyBmdntNfMyabLmVeVjAsMukaeYC9lRg2h0",
    authDomain: "panchagavya-aed22.firebaseapp.com",
    projectId: "panchagavya-aed22",
    storageBucket: "panchagavya-aed22.firebasestorage.app",
    messagingSenderId: "906861070412",
    appId: "1:906861070412:web:889cf99de6ebb5602d0ce9"
};

// Initialize Firebase
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };
