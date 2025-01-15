const admin = require('firebase-admin');
const serviceAccount = require('./serviceAccountKey.json'); // Replace with your service account file path

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
});

module.exports = admin;
