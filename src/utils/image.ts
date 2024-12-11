import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import { v4 as uuid } from "uuid";

export const uploadAndGetImgUrl = async (
  file: File,
  folderName: string,
  uid?: string,
) => {
  const storage = getStorage();
  const fileName = uid ?? file.name + uuid();
  const storageRef = ref(storage, `${folderName}/${fileName}`);
  await uploadBytes(storageRef, file);
  const downloadURL = await getDownloadURL(storageRef);
  return downloadURL;
};
