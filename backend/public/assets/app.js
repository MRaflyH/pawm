import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-app.js";
import { 
    getAuth, 
    signInWithEmailAndPassword, 
    createUserWithEmailAndPassword, 
    signOut, 
    onAuthStateChanged 
} from "https://www.gstatic.com/firebasejs/9.6.10/firebase-auth.js";

// Firebase Configuration
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

// Handle Login
if (document.querySelector("#loginSubmitBtn")) {
    document.querySelector("#loginSubmitBtn").addEventListener("click", () => {
        const email = document.querySelector("#login-email").value;
        const password = document.querySelector("#login-password").value;

        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                console.log("User logged in:", userCredential.user);
                alert("Login successful!");
                window.location.href = "/"; // Redirect to dashboard
            })
            .catch((error) => {
                console.error("Login error:", error.message);
                alert("Login failed: " + error.message);
            });
    });
}

// Handle Sign-Up
if (document.querySelector("#signupSubmitBtn")) {
    document.querySelector("#signupSubmitBtn").addEventListener("click", () => {
        const email = document.querySelector("#signup-email").value;
        const password = document.querySelector("#signup-password").value;

        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                console.log("User signed up and logged in:", userCredential.user);
                alert("Sign-Up successful! Redirecting to dashboard...");
                window.location.href = "/"; // Redirect to dashboard after sign-up
            })
            .catch((error) => {
                console.error("Sign-Up error:", error.message);
                alert("Sign-Up failed: " + error.message);
            });
    });
}

// Auth State Listener for Navbar
onAuthStateChanged(auth, (user) => {
    const loginNav = document.querySelector("#loginNav");
    const signupNav = document.querySelector("#signupNav");
    const logoutNav = document.querySelector("#logoutNav");

    if (user) {
        // User is logged in
        if (loginNav) loginNav.style.display = "none";
        if (signupNav) signupNav.style.display = "none";
        if (logoutNav) logoutNav.style.display = "block";
    } else {
        // User is logged out
        if (loginNav) loginNav.style.display = "block";
        if (signupNav) signupNav.style.display = "block";
        if (logoutNav) logoutNav.style.display = "none";
    }
});

// Handle Logout
document.addEventListener("click", (event) => {
    if (event.target.id === "logoutBtn") {
        signOut(auth)
            .then(() => {
                console.log("User logged out.");
                alert("You have been logged out.");
                window.location.href = "/"; // Redirect to the dashboard
            })
            .catch((error) => {
                console.error("Error logging out:", error.message);
                alert("Logout failed: " + error.message);
            });
    }
});
