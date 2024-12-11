import { auth, db } from "../../firebase";
import {
  getAuth,
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { collection, getDocs, query, where, deleteDoc, doc, updateDoc, addDoc, orderBy } from 'firebase/firestore';

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

const getUserCount = async () => {
  const usersCollection = collection(db, "users");
  const q = query(usersCollection, where("role", "==", "user"));
  const snapshot = await getDocs(q);
  return snapshot.size; // Mengembalikan jumlah dokumen di koleksi users
};

const getPostCount = async () => {
  const postsCollection = collection(db, "posts");
  const snapshot = await getDocs(postsCollection);
  return snapshot.size; // Mengembalikan jumlah dokumen di koleksi posts
};

const getTutorialCount = async () => {
  const tutorialsCollection = collection(db, "tutorials");
  const snapshot = await getDocs(tutorialsCollection);
  return snapshot.size; // Mengembalikan jumlah dokumen di koleksi tutorials
};

const getPlantingScheduleCount = async () => {
  const scheduleCollection = collection(db, "jadwal_tanam");
  const snapshot = await getDocs(scheduleCollection);
  return snapshot.size; // Mengembalikan jumlah dokumen di koleksi jadwal_tanam
};

const getUsers = async () => {
  const usersCollection = collection(db, "users");
  const q = query(usersCollection, where("role", "==", "user")); // Filter berdasarkan role = user
  const snapshot = await getDocs(q);
  
  const users = snapshot.docs.map(doc => ({
    id: doc.id,
    name: doc.data().name,
    email: doc.data().email,
    createdAt: doc.data().createdAt.toDate().toLocaleString() // Konversi ke string yang lebih mudah dibaca
  }));

  return users;
};

const deleteUser = async (userId: string) => {
  const userDocRef = doc(db, "users", userId);
  await deleteDoc(userDocRef); // Menghapus data pengguna berdasarkan ID
};

// Fungsi untuk mengambil semua data jadwal tanam
export const getJadwalTanam = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, 'jadwal_tanam'));
    return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  } catch (error) {
    console.error('Error fetching data: ', error);
    throw new Error('Gagal mengambil data');
  }
};

// Fungsi untuk menghapus jadwal tanam berdasarkan id
export const deleteJadwalTanam = async (id: string) => {
  try {
    await deleteDoc(doc(db, 'jadwal_tanam', id));
  } catch (error) {
    console.error('Error deleting document: ', error);
    throw new Error('Gagal menghapus data');
  }
};

// Fungsi untuk memperbarui data jadwal tanam
export const updateJadwalTanam = async (id: string, updatedData: any) => {
  try {
    const jadwalRef = doc(db, 'jadwal_tanam', id);
    await updateDoc(jadwalRef, updatedData);
  } catch (error) {
    console.error('Error updating document: ', error);
    throw new Error('Gagal memperbarui data');
  }
};

export const createJadwalTanam = async (newJadwal: any) => {
  try {
    // Referensi ke koleksi jadwal_tanam di Firestore
    const jadwalCollectionRef = collection(db, 'jadwal_tanam');
    
    // Menambahkan dokumen baru ke koleksi
    const docRef = await addDoc(jadwalCollectionRef, newJadwal);

    console.log('Jadwal Tanam berhasil ditambahkan dengan ID: ', docRef.id);
    return docRef.id;  // Mengembalikan ID dokumen yang baru ditambahkan
  } catch (error) {
    console.error('Error menambahkan jadwal tanam: ', error);
    throw new Error('Gagal menambahkan jadwal tanam');
  }
};

interface Post {
  id: string;
  nama: string; // Reference ke user
  judul: string;
  pertanyaan: string;
  createAt: Date;
  view: number;
  komentar: string; // Reference ke komentar
}

export const getPosts = async (): Promise<Post[]> => {
  try {
    const postsRef = collection(db, 'postingan');
    const q = query(postsRef, orderBy('createAt', 'desc'));
    
    const querySnapshot = await getDocs(q);
    const posts: Post[] = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    } as Post));

    return posts;
  } catch (error) {
    console.error("Error fetching posts:", error);
    throw error;
  }
};

export const deletePost = async (postId: string): Promise<void> => {
  try {
    const postRef = doc(db, 'postingan', postId);
    await deleteDoc(postRef);
  } catch (error) {
    console.error("Error deleting post:", error);
    throw error;
  }
};

const commentCollection = collection(db, 'komentar');

export const getComments = async () => {
  const querySnapshot = await getDocs(commentCollection);
  return querySnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
};

export const deleteComment = async (id: string) => {
  const commentDoc = doc(db, 'komentar', id);
  await deleteDoc(commentDoc);
};

export const addComment = async (commentData: {
  name: string;
  body: string;
  createAt: Date;
  judul: string;
}) => {
  await addDoc(commentCollection, commentData);
};

export {
  getUserCount,
  getPostCount,
  getTutorialCount,
  getPlantingScheduleCount,
  getUsers,
  deleteUser
};

