// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBOLDwfuNkbBQqm5qc3S_Dt8ySLqWRNEqE",
  authDomain: "netflixgpt-d9a73.firebaseapp.com",
  projectId: "netflixgpt-d9a73",
  storageBucket: "netflixgpt-d9a73.firebasestorage.app",
  messagingSenderId: "8283887224",
  appId: "1:8283887224:web:74564edbda763a7c63ff8d",
  measurementId: "G-058HB5M1B0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app); 

export const auth = getAuth();