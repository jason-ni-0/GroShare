// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth"; 
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAp3bTtlbbPwQBZY-O7zdOcgopBwDxR6cM",
  authDomain: "groshare-1.firebaseapp.com",
  databaseURL: "https://groshare-1-default-rtdb.firebaseio.com",
  projectId: "groshare-1",
  storageBucket: "groshare-1.appspot.com",
  messagingSenderId: "611324232775",
  appId: "1:611324232775:web:01a51cb386555916909d62",
  measurementId: "G-0D91H896VX"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);