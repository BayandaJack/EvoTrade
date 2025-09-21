"use client";

import { auth, provider } from "../../../firebaseConfig";
import { signInWithPopup } from "firebase/auth";

export default function SignInPage() {
  const handleGoogleAuth = async () => {
    try {
      // stores result of sign in with google 
      const result = await signInWithPopup(auth, provider);
      const user = result?.user;
      console.log("User:", user);

      //send token to api point to create user in firestore
      const idToken = await user.getIdToken();
      await fetch("/api/auth/signIn", {
        method: "POST",
        headers: {"Content-tyoe": "application/json"},
        body: JSON.stringify({  token: idToken})
      });

    } catch (err) {
      console.error("Error signing in:", err);
    }
  };

  return (
    <div>
      <h1>Sign In</h1>
      <button onClick={handleGoogleAuth}>Sign in with Google</button>
    </div>
  );
}