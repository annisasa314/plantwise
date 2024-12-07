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

export const getTanamanData = async (jenis?: string, musim?: string) => {
  try {
    const q = query(
      collection(db, 'jadwal_tanam'),
      ...(jenis ? [where('jenis_tanaman', '==', jenis)] : []),
      ...(musim ? [where('musim', '==', musim)] : [])
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
