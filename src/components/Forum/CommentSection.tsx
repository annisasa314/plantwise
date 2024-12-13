import React, { useState, useEffect } from "react";
import { IonInput, IonButton, IonToast, IonSpinner } from "@ionic/react";
import { Comment } from "../../type/forum.type";
import { addComment } from "../../services/auth";
import { auth } from "../../../firebase";
import { Timestamp } from "firebase/firestore";

interface CommentSectionProps {
  postId: string;
  comments: Comment[];
  onNewComment: (comment: Comment) => void;
}

const CommentSection: React.FC<CommentSectionProps> = ({
  postId,
  comments,
  onNewComment,
}) => {
  const [newComment, setNewComment] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [currentUser, setCurrentUser] = useState<any>(null);

  // Effect untuk menghandle autentikasi
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setCurrentUser({
          id: user.uid,
          name: user.displayName ?? "",
          email: user.email ?? "",
        });
      } else {
        setCurrentUser(null);
      }
    });

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, []);

  // Handle submitting a new comment
  const handleSubmitComment = async () => {
    // Validasi input
    if (!newComment.trim()) {
      setErrorMessage("Komentar tidak boleh kosong");
      return;
    }

    // Pastikan user sudah login
    if (!currentUser) {
      setErrorMessage("Anda harus login terlebih dahulu untuk berkomentar");
      return;
    }

    setIsLoading(true);
    setErrorMessage(null);

    try {
      const commentData: Omit<Comment, "id"> = {
        body: newComment,
        name: currentUser.name || currentUser.email || "Anonymous",
        email: currentUser.email!,
        createAt: Timestamp.now(),
        postId: postId,
      };

      // Tambahkan komentar ke database
      const addedComment = await addComment(commentData);

      // Konstruksi komentar lengkap dengan ID
      const fullComment = {
        ...commentData,
        id: addedComment.id,
      };

      // Update daftar komentar di parent component
      onNewComment(fullComment);

      // Reset input
      setNewComment("");
    } catch (error) {
      console.error("Error adding comment:", error);
      setErrorMessage("Gagal menambahkan komentar. Silakan coba lagi.");
    } finally {
      setIsLoading(false);
    }
  };

  // Render komentar dengan format yang lebih baik
  const renderComment = (comment: Comment) => (
    <div key={comment.id} className="bg-gray-100 p-3 rounded-lg mb-2 shadow-sm">
      <div className="flex justify-between items-center mb-1">
        <span className="font-semibold text-sm text-gray-800">
          {comment.name}
        </span>
        <span className="text-xs text-gray-500">
          {comment.createAt instanceof Timestamp
            ? comment.createAt.toDate().toLocaleString("id-ID", {
                year: "numeric",
                month: "short",
                day: "numeric",
                hour: "2-digit",
                minute: "2-digit",
              })
            : new Date(comment.createAt).toLocaleString("id-ID", {
                year: "numeric",
                month: "short",
                day: "numeric",
                hour: "2-digit",
                minute: "2-digit",
              })}
        </span>
      </div>
      <p className="text-gray-700 text-sm">{comment.body}</p>
    </div>
  );

  return (
    <div className="mt-4">
      {/* Toast untuk error messages */}
      <IonToast
        isOpen={!!errorMessage}
        onDidDismiss={() => setErrorMessage(null)}
        message={errorMessage || ""}
        duration={3000}
        color="danger"
      />

      {/* Daftar komentar */}
      <div className="space-y-2 mb-4">
        {comments.length === 0 ? (
          <p className="text-center text-gray-500 text-sm">
            Belum ada komentar
          </p>
        ) : (
          comments.map(renderComment)
        )}
      </div>

      {/* Form komentar */}
      {currentUser ? (
        <div className="flex space-x-2 items-center">
          <IonInput
            value={newComment}
            onIonChange={(e) => setNewComment(e.detail.value!)}
            placeholder="Tulis komentar..."
            className="flex-grow border rounded px-2"
            disabled={isLoading}
          />
          <IonButton onClick={handleSubmitComment} disabled={isLoading}>
            {isLoading ? <IonSpinner /> : "Kirim"}
          </IonButton>
        </div>
      ) : (
        <div className="text-center text-gray-500">
          <p>Silakan login untuk menambahkan komentar</p>
        </div>
      )}
    </div>
  );
};

export default CommentSection;
