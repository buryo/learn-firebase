const functions = require("firebase-functions");
const admin = require("firebase-admin");
const dotenv = require("dotenv");

dotenv.config();

admin.initializeApp({
  credential: admin.credential.cert({
    projectId: process.env.GOOGLE_PROJECT_ID,
    privateKey: process.env.GOOGLE_PRIVATE_KEY,
    clientEmail: process.env.GOOGLE_CLIENT_EMAIL,
  }),
});

const app = require('./app');



// TODO: create routes

// https://example.com/api/*routes*
exports.api = functions.region("europe-west1").https.onRequest(app);