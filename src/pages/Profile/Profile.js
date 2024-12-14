"use strict";
// import React, { useState, useEffect } from "react";
// import { db } from "../../../firebase";
// import { doc, getDoc, updateDoc } from "firebase/firestore";
// import { getAuth, signOut } from "firebase/auth";
// import { TUser } from "../../type/user.type";
// import { useHistory } from "react-router-dom"; // Gunakan useHistory dari react-router
// const Profile: React.FC = () => {
//   const [user, setUser] = useState<TUser | null>(null);
//   const [isEditing, setIsEditing] = useState(false);
//   const [newName, setNewName] = useState<string>("");
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);
//   const history = useHistory(); // Gunakan hook useHistory untuk navigasi
//   useEffect(() => {
//     const fetchUserData = async () => {
//       try {
//         const auth = getAuth();
//         const currentUser = auth.currentUser;
//         if (!currentUser) {
//           throw new Error("No authenticated user found");
//         }
//         const userId = currentUser.uid;
//         const userDocRef = doc(db, "users", userId);
//         const userDocSnap = await getDoc(userDocRef);
//         if (userDocSnap.exists()) {
//           const userData = userDocSnap.data() as TUser;
//           setUser(userData);
//           setNewName(userData.name);
//         } else {
//           throw new Error("User document not found in Firestore");
//         }
//       } catch (err) {
//         setError(
//           err instanceof Error ? err.message : "An unknown error occurred"
//         );
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchUserData();
//   }, []);
//   const handleSave = async () => {
//     try {
//       if (user) {
//         const userDocRef = doc(db, "users", user.id);
//         const updateData = {
//           name: newName.trim(),
//           updatedAt: new Date().toISOString(),
//         };
//         await updateDoc(userDocRef, updateData);
//         setUser((prevUser) =>
//           prevUser ? { ...prevUser, ...updateData } : null
//         );
//         setIsEditing(false);
//       }
//     } catch (err) {
//       setError(err instanceof Error ? err.message : "Failed to save changes");
//     }
//   };
//   // Metode logout yang mirip dengan contoh sidebar
//   const handleLogout = async () => {
//     try {
//       const auth = getAuth();
//       await signOut(auth);
//       // Redirect ke halaman login
//       history.push("/login");
//     } catch (error) {
//       console.error("Logout failed", error);
//       // Optional: tambahkan state error logout jika diperlukan
//     }
//   };
//   const handleCancel = () => {
//     setIsEditing(false);
//     setNewName(user?.name || "");
//   };
//   if (loading) {
//     return <div className="text-center p-4">Loading...</div>;
//   }
//   if (error) {
//     return (
//       <div className="text-red-500 p-4">
//         Error: {error}
//         <button
//           onClick={() => window.location.reload()}
//           className="ml-2 text-blue-500"
//         >
//           Retry
//         </button>
//       </div>
//     );
//   }
//   if (!user) {
//     return <div className="text-center p-4">No user data available</div>;
//   }
//   return (
//     <div className="max-w-md mx-auto p-6 bg-white shadow-md rounded-lg">
//       <div className="flex justify-between items-center mb-4">
//         <h2 className="text-2xl font-bold">Profile</h2>
//         <button
//           onClick={handleLogout}
//           className="px-4 py-2 bg-red-500 text-white rounded
//                      hover:bg-red-600 transition-colors duration-300"
//         >
//           Logout
//         </button>
//       </div>
//       <div className="space-y-4">
//         <div>
//           <label className="block text-sm font-medium text-gray-700">
//             Name
//           </label>
//           {isEditing ? (
//             <input
//               type="text"
//               value={newName}
//               onChange={(e) => setNewName(e.target.value)}
//               className="mt-1 block w-full rounded-md border-gray-300 shadow-sm
//                          focus:border-blue-300 focus:ring focus:ring-blue-200
//                          focus:ring-opacity-50 bg-white text-gray-900"
//             />
//           ) : (
//             <div
//               onClick={() => setIsEditing(true)}
//               className="mt-1 p-2 border border-transparent hover:border-gray-300
//                          rounded cursor-pointer bg-gray-50 text-gray-700"
//             >
//               {user.name}
//             </div>
//           )}
//         </div>
//         <div>
//           <label className="block text-sm font-medium text-gray-700">
//             Email
//           </label>
//           <p className="mt-1 text-gray-900">{user.email}</p>
//         </div>
//         <div>
//           <label className="block text-sm font-medium text-gray-700">
//             Created At
//           </label>
//           <p className="mt-1 text-gray-900">
//             {new Date(user.createdAt).toLocaleString()}
//           </p>
//         </div>
//         <div>
//           <label className="block text-sm font-medium text-gray-700">
//             Updated At
//           </label>
//           <p className="mt-1 text-gray-900">
//             {new Date(user.updatedAt).toLocaleString()}
//           </p>
//         </div>
//         {isEditing && (
//           <div className="flex space-x-4 mt-6">
//             <button
//               onClick={handleSave}
//               className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
//             >
//               Save
//             </button>
//             <button
//               onClick={handleCancel}
//               className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400"
//             >
//               Cancel
//             </button>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };
// export default Profile;
