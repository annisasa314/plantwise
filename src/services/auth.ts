import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { doc, setDoc, getDoc } from "firebase/firestore";

import { auth, db } from "../../firebase";

import { TLoginForm, TSignupForm } from "../types/form.type";
import { TUser } from "../types/user.type";

export const signup = async (values: TSignupForm) => {
  const userCredentials = await createUserWithEmailAndPassword(
    auth,
    values.email,
    values.password
  );

  const user = {
    uid: userCredentials.user.uid,
    name: values.name,
    email: values.email,
    photoURL: "",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  await setDoc(doc(db, "user", user.uid), user);

  return user as TUser;
};

export const login = async (values: TLoginForm) => {
  const userCredentials = await signInWithEmailAndPassword(
    auth,
    values.email,
    values.password
  );

  const docRef = doc(db, "user", userCredentials.user.uid);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    return docSnap.data() as TUser;
  } else {
    signOut(auth);
    throw new Error("User not found!");
  }
};

export const loginAdmin = async (values: TLoginForm) => {
  const userCredentials = await signInWithEmailAndPassword(
    auth,
    values.email,
    values.password
  );

  const docRef = doc(db, "user", userCredentials.user.uid);
  const docSnap = await getDoc(docRef);

  if (!docSnap.exists()) {
    signOut(auth);
    throw new Error("User not found!");
  }

  const user = docSnap.data() as TUser;

  // if (user.role !== "admin") {
  //   signOut(auth);
  //   throw new Error("User not found!");
  // }

  return user;
};

export const logout = async () => {
  await signOut(auth);
};

export const getCurrentUser = async () => {
  const user = auth.currentUser;
  return user;
};
