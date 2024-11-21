// src/firebaseConfig.js
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAKD23Mq2sYpu_UqBw3MUBC6L7xPOW1XHE",
  authDomain: "plantwise-8eadf.firebaseapp.com",
  projectId: "plantwise-8eadf",
  storageBucket: "plantwise-8eadf.firebasestorage.app",
  messagingSenderId: "625351268886",
  appId: "1:625351268886:web:8c54e16e0e87cba5bf7337",
  measurementId: "G-WR0P0EQE1W" 
};

// Inisialisasi aplikasi Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

// Fungsi Autentikasi Email/Password
export const createUserWithEmailAndPasswordAuth = (email, password) => {
  return createUserWithEmailAndPassword(auth, email, password);
};

export const signInWithEmailAndPasswordAuth = (email, password) => {
  return signInWithEmailAndPassword(auth, email, password);
};

// Fungsi Autentikasi Google
const provider = new GoogleAuthProvider();

export const signInWithGoogle = () => {
  return signInWithPopup(auth, provider);
};

// Ekspor fungsi dan referensi
export { db, app, auth };