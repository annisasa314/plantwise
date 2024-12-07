import { auth, db } from "../../firebase";
import {
  getAuth,
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { collection, getDocs, query, where } from 'firebase/firestore';

// const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

export const loginWithEmailAndPassword = async (
  email: string,
  password: string
) => {
  try {
    return await signInWithEmailAndPassword(auth, email, password);
  } catch (error) {
    console.error("Login error", error);
    throw error;
  }
};

export const loginWithGoogle = async () => {
  try {
    return await signInWithPopup(auth, googleProvider);
  } catch (error) {
    console.error("Google login error", error);
    throw error;
  }
};

export const registerWithEmailAndPassword = async (
  email: string,
  password: string
) => {
  try {
    return await createUserWithEmailAndPassword(auth, email, password);
  } catch (error) {
    console.error("Registration error", error);
    throw error;
  }
};

export const logoutUser = async () => {
  try {
    await signOut(auth);
  } catch (error) {
    console.error("Logout error", error);
    throw error;
  }
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

