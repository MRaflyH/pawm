console.log("app.js loaded!");

import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-app.js";
import { 
    getAuth, 
    signInWithEmailAndPassword, 
    createUserWithEmailAndPassword, 
    signOut, 
    onAuthStateChanged 
} from "https://www.gstatic.com/firebasejs/9.6.10/firebase-auth.js";

import { getFirestore, doc, setDoc, serverTimestamp } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-firestore.js";

const navbarPath = window.location.hostname === "localhost" ? "/navbar.html" : "/navbar";

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
const db = getFirestore(app);

// Utility function to update the navbar
function updateNavbar(user) {
    const loginNav = document.querySelector("#loginNav");
    const signupNav = document.querySelector("#signupNav");
    const logoutNav = document.querySelector("#logoutBtn");

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

// Fetch and load the navbar
fetch(navbarPath)
    .then(response => {
        if (!response.ok) throw new Error(`Failed to fetch navbar: ${response.statusText}`);
        return response.text();
    })
    .then(html => {
        document.querySelector('#navbar').innerHTML = html;

        // Update navbar after it loads
        onAuthStateChanged(auth, (user) => {
            updateNavbar(user);
        });
    })
    .catch(error => console.error("Error loading navbar:", error));

// Handle login
if (document.querySelector("#loginSubmitBtn")) {
    document.querySelector("#loginSubmitBtn").addEventListener("click", () => {
        const email = document.querySelector("#login-email").value.trim();
        const password = document.querySelector("#login-password").value.trim();

        if (!email || !password) {
            alert("Please enter both email and password.");
            return;
        }

        signInWithEmailAndPassword(auth, email, password)
            .then(async (userCredential) => {
                const user = userCredential.user;

                // Save last login timestamp to Firestore
                try {
                    await setDoc(doc(db, "users", user.uid), {
                        lastLogin: serverTimestamp()
                    }, { merge: true }); // Merge with existing data
                    console.log("Last login timestamp updated.");
                } catch (error) {
                    console.error("Error updating last login timestamp:", error);
                }

                alert("Login successful!");
                window.location.href = "/";
            })
            .catch((error) => {
                alert(`Login failed: ${error.message}`);
                console.error("Login error:", error);
            });
    });
}

// Handle sign-up
if (document.querySelector("#signupSubmitBtn")) {
    document.querySelector("#signupSubmitBtn").addEventListener("click", () => {
        const email = document.querySelector("#signup-email").value.trim();
        const password = document.querySelector("#signup-password").value.trim();

        if (!email || !password) {
            alert("Please enter both email and password.");
            return;
        }

        createUserWithEmailAndPassword(auth, email, password)
            .then(async (userCredential) => {
                const user = userCredential.user;

                // Save last login timestamp to Firestore
                try {
                    await setDoc(doc(db, "users", user.uid), {
                        lastLogin: serverTimestamp()
                    }, { merge: true }); // Merge with existing data
                    console.log("Last login timestamp updated for new user.");
                } catch (error) {
                    console.error("Error updating last login timestamp for new user:", error);
                }

                alert("Sign-Up successful! Redirecting to dashboard...");
                window.location.href = "/";
            })
            .catch((error) => {
                alert(`Sign-Up failed: ${error.message}`);
                console.error("Sign-Up error:", error);
            });
    });
}

// Handle logout
document.addEventListener("click", (event) => {
    if (event.target.id === "logoutBtn") {
        signOut(auth)
            .then(() => {
                alert("You have been logged out.");
                window.location.href = "/";
            })
            .catch((error) => {
                alert(`Logout failed: ${error.message}`);
                console.error("Logout error:", error);
            });
    }
});

// Handle Quiz Submission (Generic for Multiple Quizzes)
document.addEventListener("click", async (event) => {
    if (event.target.classList.contains("submit-quiz")) {
        console.log("Submit button clicked!");
        const quizId = event.target.dataset.quizId; // e.g., "phQuiz", "biologyQuiz"
        const user = auth.currentUser;
        console.log("Quiz ID:", quizId);

        if (!user) {
            alert("You need to be logged in to submit the quiz.");
            return;
        }

        // Define correct answers for each quiz
        const quizAnswers = {
            phQuiz: {
                q1: "B", q2: "A", q3: "B", q4: "D", q5: "B",
                q6: "A", q7: "A", q8: "C", q9: "B", q10: "C",
            },
            colorMixingQuiz: {
                q1: "B", // Red + Blue = Purple
                q2: "A", // Primary Colors: Red, Yellow, Blue
                q3: "A", // Yellow + Blue = Green
                q4: "C", // Yellow + Red = Orange
                q5: "B", // All primary colors = Black
                q6: "D", // Yellow is a primary color, not secondary
                q7: "A", // Adding white creates a tint
                q8: "A", // Red + Green = Yellow
                q9: "A", // Red and Green are complementary
                q10: "B", // Adding black creates a shade
            },        
            // Add more quizzes here, e.g., biologyQuiz: { q1: "A", q2: "C", ... }
        };

        const correctAnswers = quizAnswers[quizId];
        if (!correctAnswers) {
            alert("Invalid quiz submission.");
            return;
        }

        // Get user answers and calculate score
        const form = document.querySelector(`#quiz-form-${quizId}`);
        console.log("Form Element:", form);
        if (!form) {
            console.error(`Form with ID quiz-form-${quizId} not found!`);
            return;
        }
        let score = 0;
        Object.keys(correctAnswers).forEach((questionId) => {
            const userAnswer = form.querySelector(`input[name="${questionId}"]:checked`);
            if (userAnswer && userAnswer.value === correctAnswers[questionId]) {
                score++;
            }
        });

        const totalQuestions = Object.keys(correctAnswers).length;
        const percentageScore = Math.round((score / totalQuestions) * 100);

        // Save score to Firestore
        try {
            await setDoc(
                doc(db, "users", user.uid),
                {
                    quizScores: {
                        [quizId]: {
                            score: percentageScore,
                            submittedAt: serverTimestamp(),
                        },
                    },
                },
                { merge: true }
            );
            alert(`Quiz submitted! Your score: ${percentageScore}%`);
            window.location.href = "/"; // Redirect to dashboard or another page
        } catch (error) {
            console.error("Error saving quiz score:", error);
            alert("There was an error submitting your quiz. Please try again.");
        }
    }
});

export { auth, db };
