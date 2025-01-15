const { db } = require('../src/config/firebaseClient'); // Import the Firestore instance
const { doc, setDoc, getDoc, serverTimestamp } = require('firebase/firestore');

const TEST_COLLECTION = 'test_collection';

const addTestData = async () => {
    try {
        await setDoc(doc(db, TEST_COLLECTION, 'testDoc2'), {
            name: 'Test User 2',
            email: 'testuser2@example.com',
            createdAt: serverTimestamp(),
        });
        console.log('Test document successfully written!');
    } catch (error) {
        console.error('Error writing test document:', error);
    }
};

const fetchTestData = async () => {
    try {
        const docRef = doc(db, TEST_COLLECTION, 'testDoc2');
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            console.log('Test document data:', docSnap.data());
        } else {
            console.log('No such test document!');
        }
    } catch (error) {
        console.error('Error getting test document:', error);
    }
};

(async () => {
    console.log('Running Firestore tests...');
    await addTestData();
    await fetchTestData();
    console.log('Firestore tests completed!');
})();
