// firebase.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyCDrOjFDoa6q9_GzohL7kMjoM1weBQObt8",
  authDomain: "burgerbros-eaedc.firebaseapp.com",
  projectId: "burgerbros-eaedc",
  storageBucket: "burgerbros-eaedc.firebasestorage.app",
  messagingSenderId: "1087017842608",
  appId: "1:1087017842608:web:f75e274ee94ca2ace64875",
  measurementId: "G-T23TS3XPVL"
};
// Initialize Firebase app
const app = initializeApp(firebaseConfig);

// Init services
export const db = getFirestore(app);
export const auth = getAuth(app);