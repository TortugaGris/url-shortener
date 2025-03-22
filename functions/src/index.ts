/**
 * Import function triggers from their respective submodules:
 *
 * import {onCall} from "firebase-functions/v2/https";
 * import {onDocumentWritten} from "firebase-functions/v2/firestore";
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */
import {onRequest} from "firebase-functions/v2/https";
import {onSchedule} from "firebase-functions/scheduler";
import * as admin from "firebase-admin";
import API from "./api/app";
import {Timestamp} from "firebase-admin/firestore";
admin.initializeApp();
// import * as logger from "firebase-functions/logger";

// Start writing functions
// https://firebase.google.com/docs/functions/typescript

// export const helloWorld = onRequest((request, response) => {
//   logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });
exports.api = onRequest(API);

export const deleteExpiredLinks = onSchedule(
  "every day 00:00",
  async (context) => {
    const linksRef = admin.firestore().collection("links");
    const currentTime = Timestamp.now();

    // Fetch expired links
    const snapshot = await linksRef
      .where("expiredAt", "<=", currentTime)
      .get();

    // Delete expired links
    snapshot.forEach(async (doc) => {
      await doc.ref.delete();
    });

    console.log(`Deleted ${snapshot.size} expired links.`);
  }
);
