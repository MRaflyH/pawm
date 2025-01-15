import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-app.js";
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-auth.js";

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

// Form toggling
const loginContainer = document.querySelector("#login-container");
const signupContainer = document.querySelector("#signup-container");
document.querySelector("#showSignUp").addEventListener("click", () => {
    loginContainer.style.display = "none";
    signupContainer.style.display = "block";
});
document.querySelector("#showLogin").addEventListener("click", () => {
    signupContainer.style.display = "none";
    loginContainer.style.display = "block";
});

// Login
document.querySelector("#loginBtn").addEventListener("click", () => {
    const email = document.querySelector("#login-email").value;
    const password = document.querySelector("#login-password").value;

    signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            console.log("User signed in:", userCredential.user);
            alert("Login successful!");
        })
        .catch((error) => {
            console.error("Error logging in:", error);
            alert("Login failed: " + error.message);
        });
});

// Sign-Up
document.querySelector("#signupBtn").addEventListener("click", () => {
    const email = document.querySelector("#signup-email").value;
    const password = document.querySelector("#signup-password").value;

    createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            console.log("User signed up:", userCredential.user);
            alert("Sign-up successful! You can now log in.");
            // Switch to login form
            signupContainer.style.display = "none";
            loginContainer.style.display = "block";
        })
        .catch((error) => {
            console.error("Error signing up:", error);
            alert("Sign-up failed: " + error.message);
        });
});

// Logout
document.querySelector("#logoutBtn").addEventListener("click", () => {
    signOut(auth)
        .then(() => {
            console.log("User signed out.");
            alert("Logged out successfully!");
        })
        .catch((error) => {
            console.error("Error signing out:", error);
        });
});
