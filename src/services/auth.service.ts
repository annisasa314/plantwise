import { auth, db } from "../../firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";
import { collection, getDocs, query, where } from 'firebase/firestore';

// Fungsi Autentikasi Email/Password
export const registerWithEmailAndPassword = (email: string, password: string) => {
  return createUserWithEmailAndPassword(auth, email, password);
};

export const loginWithEmailAndPassword = (email: string, password: string) => {
  return signInWithEmailAndPassword(auth, email, password);
};

// Fungsi Autentikasi Google
const provider = new GoogleAuthProvider();

export const loginWithGoogle = () => {
  return signInWithPopup(auth, provider);
};

// Function to get tanaman data with optional filters for jenis, musim, and search query
export const getTanamanData = async (jenis?: string, musim?: string, searchQuery?: string) => {
  try {
    // Build the Firestore query with optional filters
    const q = query(
      collection(db, 'jadwal_tanam'),
      ...(jenis ? [where('jenis_tanaman', '==', jenis)] : []),
      ...(musim ? [where('musim', '==', musim)] : []),
      ...(searchQuery ? [where('nama_tanaman', '>=', searchQuery), where('nama_tanaman', '<=', searchQuery + '\uf8ff')] : [])
    );

    const querySnapshot = await getDocs(q);
    const tanamanData: any[] = [];
    querySnapshot.forEach(doc => {
      tanamanData.push({ ...doc.data(), id: doc.id });
    });
    return tanamanData;
  } catch (error) {
    console.error('Error getting documents: ', error);
    return [];
  }
};

