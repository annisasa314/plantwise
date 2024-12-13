import React, { useState } from "react";
import {
  IonModal,
  IonContent,
  IonInput,
  IonTextarea,
  IonButton,
  IonHeader,
  IonToolbar,
  IonTitle,
} from "@ionic/react";
import { Post } from "../../type/forum.type";
import { TUser } from "../../type/user.type";
import { Timestamp } from "firebase/firestore";

interface CreatePostModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreatePost: (post: Omit<Post, "id">) => Promise<void>;
  currentUser: TUser;
}

const CreatePostModal: React.FC<CreatePostModalProps> = ({
  isOpen,
  onClose,
  onCreatePost,
  currentUser,
}) => {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [pertanyaan, setPertanyaan] = useState("");

  const handleSubmit = async () => {
    if (!title.trim() || !body.trim() || !pertanyaan.trim()) {
      // TODO: Add proper error handling or validation toast
      return;
    }

    try {
      await onCreatePost({
        judul: title,
        body: body,
        name: currentUser.name || currentUser.email || "Anonymous",
        email: currentUser.email || "",
        pertanyaan: pertanyaan,
        createAt: Timestamp.now(),
        view: 0,
      });

      // Reset form and close modal
      setTitle("");
      setBody("");
      setPertanyaan(
        "Apa saja jenis hama yang sering menyerang tanaman di kebun Anda, dan bagaimana cara efektif untuk mengatasinya?"
      );
      onClose();
    } catch (error) {
      console.error("Error creating post:", error);
      // TODO: Add error handling (e.g., show error toast)
    }
  };

  return (
    <IonModal isOpen={isOpen} onDidDismiss={onClose}>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Create New Post</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <IonInput
          value={title}
          onIonChange={(e) => setTitle(e.detail.value!)}
          placeholder="Post Title"
          label="Title"
          labelPlacement="floating"
        />
        <IonInput
          value={pertanyaan}
          onIonChange={(e) => setPertanyaan(e.detail.value!)}
          placeholder="Specific Question"
          label="Question"
          labelPlacement="floating"
        />
        <IonTextarea
          value={body}
          onIonChange={(e) => setBody(e.detail.value!)}
          placeholder="Post Content"
          label="Content"
          labelPlacement="floating"
        />
        <div className="ion-padding">
          <IonButton expand="block" onClick={handleSubmit}>
            Post
          </IonButton>
          <IonButton expand="block" fill="outline" onClick={onClose}>
            Cancel
          </IonButton>
        </div>
      </IonContent>
    </IonModal>
  );
};

export default CreatePostModal;
