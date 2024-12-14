import { db } from "../../firebase";
// import { uploadAndGetImgUrl } from "@/utils/image";
import { doc, serverTimestamp, updateDoc } from "firebase/firestore";
import Cookies from "js-cookie";
import { uploadAndGetImgUrl } from "../utils/image";
export const updateUser = async (userProfile) => {
    const userCookies = Cookies.get("user");
    const user = userCookies ? JSON.parse(userCookies) : undefined;
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
    };
    await updateDoc(userRef, {
        ...data,
        updatedAt: timestamp,
    });
    return data;
};
