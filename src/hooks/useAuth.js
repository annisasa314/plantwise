"use strict";
// import React, { useState, useEffect, createContext, useContext } from 'react';
// import { auth } from '../../firebase';
// import {
//   createUserWithEmailAndPassword,
//   signInWithEmailAndPassword,
//   signOut,
//   onAuthStateChanged,
//   updateProfile,
//   User,
// } from 'firebase/auth';
// import { doc, setDoc } from 'firebase/firestore';
// import { db } from '../../firebase';
// interface AuthContextType {
//   currentUser: User | null;
//   signup: (email: string, password: string, name: string) => Promise<void>;
//   login: (email: string, password: string) => Promise<void>;
//   logout: () => Promise<void>;
// }
// const AuthContext = createContext<AuthContextType>({
//   currentUser: null,
//   signup: async () => {},
//   login: async () => {},
//   logout: async () => {},
// });
// export const useAuth = () => useContext(AuthContext);
// export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
//   const [currentUser, setCurrentUser] = useState<User | null>(null);
//   const [loading, setLoading] = useState(true);
//   const signup = async (email: string, password: string, name: string) => {
//     const userCredential = await createUserWithEmailAndPassword(auth, email, password);
//     const user = userCredential.user;
//     await updateProfile(user, { displayName: name });
//     await setDoc(doc(db, 'users', user.uid), { name, email, createdAt: new Date() });
//   };
//   const login = async (email: string, password: string) => {
//     await signInWithEmailAndPassword(auth, email, password);
//   };
//   const logout = async () => {
//     await signOut(auth);
//   };
//   useEffect(() => {
//     const unsubscribe = onAuthStateChanged(auth, (user) => {
//       setCurrentUser(user);
//       setLoading(false);
//     });
//     return unsubscribe;
//   }, []);
//   const value: AuthContextType = {
//     currentUser,
//     signup,
//     login,
//     logout,
//   };
//   return (
//     <AuthContext.Provider value={value}>
//       {!loading && children}
//     </AuthContext.Provider>
//   );
// };
