import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-app.js";
import { getAuth, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-auth.js";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyBEgLqb88cS8W5GY7ML6fp_e31YXS82wK0",
  authDomain: "pawm-1762c.firebaseapp.com",
  projectId: "pawm-1762c",
  storageBucket: "pawm-1762c.firebasestorage.app",
  messagingSenderId: "1085651467496",
  appId: "1:1085651467496:web:9aee1ae66245a05e3c9d5d",
  measurementId: "G-W24VGS7LDT"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

document.querySelector("#loginBtn").addEventListener("click", () => {
    const email = document.querySelector("#email").value;
    const password = document.querySelector("#password").value;

    signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            console.log("Logged in:", userCredential.user);
        })
        .catch((error) => {
            console.error("Error logging in:", error);
        });
});
