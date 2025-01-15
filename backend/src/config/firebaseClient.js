const { initializeApp } = require('firebase/app');
const { getAuth } = require('firebase/auth');
const { getFirestore } = require('firebase/firestore');
require('dotenv').config();
console.log(process.env.FIREBASE_API_KEY); // Should log your API key

const firebaseConfig = {
    apiKey: "AIzaSyBEgLqb88cS8W5GY7ML6fp_e31YXS82wK0",
    authDomain: "pawm-1762c.firebaseapp.com",
    projectId: "pawm-1762c",
    storageBucket: "pawm-1762c.firebasestorage.app",
    messagingSenderId: "1085651467496",
    appId: "1:1085651467496:web:9aee1ae66245a05e3c9d5d",
    measurementId: "G-W24VGS7LDT"
};

const firebaseApp = initializeApp(firebaseConfig);
const auth = getAuth(firebaseApp);
const db = getFirestore(firebaseApp);

module.exports = { firebaseApp, auth, db };
