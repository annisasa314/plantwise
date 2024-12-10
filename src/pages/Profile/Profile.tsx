import React, { useState, useEffect } from "react";
import {
  IonPage,
  IonContent,
  IonItem,
  IonInput,
  IonButton,
  IonIcon,
  IonAvatar,
  IonToast,
} from "@ionic/react";
import { personOutline, mailOutline, lockClosedOutline } from "ionicons/icons";
import { getCurrentUser } from "../../services/auth";
import { updateProfile, updatePassword } from "firebase/auth";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../../../firebase";
import { TUser } from "../../type/user.type";

const Profile: React.FC = () => {
  const [user, setUser] = useState<TUser | null>(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");

  useEffect(() => {
    const fetchUserData = async () => {
      const currentUser = await getCurrentUser();
      if (currentUser) {
        const docRef = doc(db, "user", currentUser.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const userData = docSnap.data() as TUser;
          setUser(userData);
          setName(userData.name);
          setEmail(userData.email);
        }
      }
    };

    fetchUserData();
  }, []);

  const handleUpdateProfile = async () => {
    try {
      const currentUser = await getCurrentUser();
      if (currentUser) {
        // Update Firebase Authentication profile
        await updateProfile(currentUser, { displayName: name });

        // Update Firestore user document
        await updateDoc(doc(db, "user", currentUser.uid), {
          name,
          updatedAt: new Date().toISOString(),
        });

        setToastMessage("Profile updated successfully");
        setShowToast(true);
      }
    } catch (error) {
      setToastMessage("Error updating profile");
      setShowToast(true);
      console.error("Error updating profile:", error);
    }
  };

  const handleUpdatePassword = async () => {
    if (password !== confirmPassword) {
      setToastMessage("Passwords do not match");
      setShowToast(true);
      return;
    }

    try {
      const currentUser = await getCurrentUser();
      if (currentUser) {
        // Update Firebase Authentication password
        await updatePassword(currentUser, password);

        setToastMessage("Password updated successfully");
        setShowToast(true);
      }
    } catch (error) {
      setToastMessage("Error updating password");
      setShowToast(true);
      console.error("Error updating password:", error);
    }
  };

  return (
    <IonPage>
      <IonContent className="ion-padding">
        <div className="ion-text-center">
          <IonAvatar className="profile-avatar">
            <img
              src={user?.photoURL || "/assets/icon/favicon.png"}
              alt="Profile"
            />
          </IonAvatar>
          <IonButton fill="clear" size="small" className="change-photo-btn">
            Change
          </IonButton>
        </div>

        <IonItem lines="none" className="input-container">
          <IonIcon icon={personOutline} slot="start" />
          <IonInput
            placeholder="Enter your name"
            value={name}
            onIonChange={(e) => setName(e.detail.value!)}
            className="input-field"
          />
        </IonItem>

        <IonItem lines="none" className="input-container">
          <IonIcon icon={mailOutline} slot="start" />
          <IonInput
            type="email"
            placeholder="Enter your email"
            value={email}
            onIonChange={(e) => setEmail(e.detail.value!)}
            className="input-field"
          />
        </IonItem>

        <IonItem lines="none" className="input-container">
          <IonIcon icon={lockClosedOutline} slot="start" />
          <IonInput
            type="password"
            placeholder="Enter new password"
            value={password}
            onIonChange={(e) => setPassword(e.detail.value!)}
            className="input-field"
          />
        </IonItem>

        <IonItem lines="none" className="input-container">
          <IonIcon icon={lockClosedOutline} slot="start" />
          <IonInput
            type="password"
            placeholder="Confirm new password"
            value={confirmPassword}
            onIonChange={(e) => setConfirmPassword(e.detail.value!)}
            className="input-field"
          />
        </IonItem>

        <IonButton expand="block" onClick={handleUpdateProfile} color="primary">
          Update Profile
        </IonButton>

        <IonButton
          expand="block"
          onClick={handleUpdatePassword}
          color="primary"
        >
          Update Password
        </IonButton>

        <IonToast
          isOpen={showToast}
          onDidDismiss={() => setShowToast(false)}
          message={toastMessage}
          duration={2000}
          color="success"
          position="top"
        />
      </IonContent>
    </IonPage>
  );
};

export default Profile;
