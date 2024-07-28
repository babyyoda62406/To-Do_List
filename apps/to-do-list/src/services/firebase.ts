// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAevX1A2_9PsBhxPNQj3reDCqCcyls4jRs",
  authDomain: "to-do-list-45bb0.firebaseapp.com",
  projectId: "to-do-list-45bb0",
  storageBucket: "to-do-list-45bb0.appspot.com",
  messagingSenderId: "57646686683",
  appId: "1:57646686683:web:ae6473fcfe4599953447fe",
  measurementId: "G-269RPEYBSY"
};


export const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);
export const auth = getAuth(app);
