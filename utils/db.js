const { initializeApp, cert } = require("firebase-admin/app");
const { getFirestore } = require("firebase-admin/firestore");
const serviceAccount = require("../firebaseKey.json");
const app = initializeApp({
  credential: cert(serviceAccount),
});
const db = getFirestore();

const dbConn = async () => {
  try {
    await db.collection("users").limit(1).get();
    console.log("Firebase Connected ✅");
  } catch (error) {
    console.log("Failed connect to firebase ❌", error.message);
  }
};

dbConn();

module.exports = { db };
