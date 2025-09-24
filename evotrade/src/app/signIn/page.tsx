"use client";

import { auth, provider } from "../../../firebaseConfig";
import { signInWithPopup } from "firebase/auth";

export default function SignUpPage() {
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
        headers: {"Content-type": "application/json"},
        body: JSON.stringify({  token: idToken})
      });

    } catch (err) {
      console.error("Error signing in:", err);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900">
    <div
      className="max-w-md w-full bg-gradient-to-r from-blue-800 to-purple-600 rounded-xl shadow-2xl overflow-hidden p-8 space-y-8"
    >
      <h2
        className="text-center text-4xl font-extrabold text-white"
      >
        Welcome EvoTrader
      </h2>
      <p className="text-center text-gray-200">
        Sign in to your account
      </p>
        <div className="relative">
          <input
            placeholder="john@example.com"
            className="peer h-10 w-full border-b-2 border-gray-300 text-white bg-transparent placeholder-transparent focus:outline-none focus:border-purple-500"
            id="email"
            name="email"
            type="email"
          />
          <label
            className="absolute left-0 -top-3.5 text-gray-500 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-purple-500 peer-focus:text-sm"
            >Email address</label>
        </div>
        <div className="relative">
          <input
            placeholder="Password"
            className="peer h-10 w-full border-b-2 border-gray-300 text-white bg-transparent placeholder-transparent focus:outline-none focus:border-purple-500"
            id="password"
            name="password"
            type="password"
          />
          <label
            className="absolute left-0 -top-3.5 text-gray-500 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-purple-500 peer-focus:text-sm"
            >Password</label>
        </div>
        <div className="flex items-center justify-between">
          <label className="flex items-center text-sm text-gray-200">
            <input
              className="form-checkbox h-4 w-4 text-purple-600 bg-gray-800 border-gray-300 rounded"
              type="checkbox"
            />
            <span className="ml-2">Remember me</span>
          </label>
          <a className="text-sm text-purple-200 hover:underline" href="#"
            >Forgot your password?</a>
        </div>
        <button
          className="w-full py-2 px-4 bg-purple-500 hover:bg-purple-700 hover:cursor-pointer rounded-md shadow-lg text-white font-semibold transition duration-200"
          onClick={handleGoogleAuth}>
          Sign In With Google
        </button>
      <div className="text-center text-gray-300">
        Don't have an account?
        <a className="text-purple-300 hover:underline" href="#">Sign up</a>
      </div>
    </div>
    </div>
  );
}