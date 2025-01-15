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

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Utility function to update navbar based on auth state
function updateNavbar(user) {
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
}

// Fetch and Load Navbar
fetch('/backend/public/navbar.html')
    .then(response => {
        if (!response.ok) throw new Error(`Failed to fetch navbar: ${response.statusText}`);
        return response.text();
    })
    .then(html => {
        document.querySelector('#navbar').innerHTML = html;

        // Initialize Auth State Listener after Navbar Loads
        onAuthStateChanged(auth, (user) => {
            updateNavbar(user);
        });
    })
    .catch(error => console.error("Error loading navbar:", error));

// Handle Login
if (document.querySelector("#loginSubmitBtn")) {
    document.querySelector("#loginSubmitBtn").addEventListener("click", () => {
        const email = document.querySelector("#login-email").value.trim();
        const password = document.querySelector("#login-password").value.trim();

        if (!email || !password) {
            alert("Please enter both email and password.");
            return;
        }

        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                alert("Login successful!");
                window.location.href = "/"; // Redirect to dashboard
            })
            .catch((error) => {
                alert(`Login failed: ${error.message}`);
                console.error("Login error:", error);
            });
    });
}

// Handle Sign-Up
if (document.querySelector("#signupSubmitBtn")) {
    document.querySelector("#signupSubmitBtn").addEventListener("click", () => {
        const email = document.querySelector("#signup-email").value.trim();
        const password = document.querySelector("#signup-password").value.trim();

        if (!email || !password) {
            alert("Please enter both email and password.");
            return;
        }

        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                alert("Sign-Up successful! Redirecting to dashboard...");
                window.location.href = "/"; // Redirect to dashboard after sign-up
            })
            .catch((error) => {
                alert(`Sign-Up failed: ${error.message}`);
                console.error("Sign-Up error:", error);
            });
    });
}

// Handle Logout
document.addEventListener("click", (event) => {
    if (event.target.id === "logoutBtn") {
        signOut(auth)
            .then(() => {
                alert("You have been logged out.");
                window.location.href = "/"; // Redirect to the dashboard
            })
            .catch((error) => {
                alert(`Logout failed: ${error.message}`);
                console.error("Logout error:", error);
            });
    }
});
