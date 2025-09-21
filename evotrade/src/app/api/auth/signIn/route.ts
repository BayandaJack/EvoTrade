import { NextResponse } from "next/server";
import * as admin from "firebase-admin";

// Initialize Firebase Admin SDK once
if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.applicationDefault(),
  });
}

export async function POST(req: Request) {
  try {
    const { token } = await req.json();

    // Step 1: Verify token with Firebase Admin
    const decodedToken = await admin.auth().verifyIdToken(token);

    // Step 2: decodedToken contains user's Firebase UID, email, name
    const { uid, email, name } = decodedToken;

    // Step 3: Check your database if user exists
    const db = admin.firestore();
    const userDoc = db.collection("users").doc(uid);
    const userSnapshot = await userDoc.get();

    if (!userSnapshot.exists) {
      // Step 4: New user → create user document
      await userDoc.set({
        uid,
        email,
        name,
        createdAt: admin.firestore.FieldValue.serverTimestamp(),
      });
      console.log("New user created in database:", uid);
    } else {
      console.log("User already exists:", uid);
    }

    return NextResponse.json({ uid, email, name }, {status: 200});
  } catch (err) {
    console.error("Error verifying token:", err);
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
}
