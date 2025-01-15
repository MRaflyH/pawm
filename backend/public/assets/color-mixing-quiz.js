const firebase = require("../../src/config/firebaseClient.js");
const db = firebase.firestore();
const auth = firebase.auth();

const answerKey = {
    q1: "Purple",
    q2: "Blue and Yellow",
};

document.getElementById("submitColorQuiz").addEventListener("click", async () => {
    const form = document.getElementById("colorQuizForm");
    const formData = new FormData(form);
    let score = 0;

    // Calculate the score
    for (const [question, answer] of formData.entries()) {
        if (answer === answerKey[question]) {
            score++;
        }
    }

    // Display the score
    document.getElementById("colorScoreDisplay").textContent = `Your score: ${score}/${Object.keys(answerKey).length}`;

    // Save the score to Firestore
    const user = auth.currentUser;
    if (user) {
        try {
            await db.collection("colorQuizScores").doc(user.uid).set({
                score,
                timestamp: new Date(),
            });
            console.log("Score saved successfully!");
        } catch (error) {
            console.error("Error saving score:", error);
        }
    } else {
        alert("Please log in to save your score.");
    }
});
