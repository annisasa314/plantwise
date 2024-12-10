import { db } from "../../firebase";
import { TUpdateProfileForm } from "../type/form.type";
import { TUser } from "../type/user.type";
// import { uploadAndGetImgUrl } from "@/utils/image";
import { doc, serverTimestamp, updateDoc } from "firebase/firestore";
import Cookies from "js-cookie";
import { uploadAndGetImgUrl } from "../utils/image";

export const updateUser = async (userProfile: TUpdateProfileForm) => {
  const userCookies = Cookies.get("user");
  const user: TUser = userCookies ? JSON.parse(userCookies) : undefined;
  if (!user) {
    throw new Error("User not found");
  }
  const userRef = doc(db, "user", user.uid);
  const timestamp = serverTimestamp();

  let photoURL = "";

  if (userProfile.photoURL) {
    photoURL = await uploadAndGetImgUrl(userProfile.photoURL, "user", user.uid);
  }

  const data = {
    ...user,
    ...userProfile,
    photoURL: photoURL,
  } as TUser;

  await updateDoc(userRef, {
    ...data,
    updatedAt: timestamp,
  });

  return data;
};
