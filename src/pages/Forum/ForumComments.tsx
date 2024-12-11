import React, { useState, useEffect } from "react";
import { IonPage, IonContent, IonButton, IonTextarea } from "@ionic/react";
import { useParams } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";
import "./ForumComments.css";

type Comment = {
  id: number;
  username: string;
  text: string;
  date: string;
};

type ForumPost = {
  id: number;
  title: string;
  comments: Comment[];
};

const mockData: Record<number, ForumPost> = {
  1: {
    id: 1,
    title: "Seberapa sering harus ganti air hidroponik?",
    comments: [
      {
        id: 1,
        username: "Alice",
        text: "Ganti air setiap dua minggu ya.",
        date: "Dec 8, 2024, 10:00 AM",
      },
    ],
  },
  2: {
    id: 2,
    title: "Hama kebun yang paling menjengkelkan!",
    comments: [
      {
        id: 1,
        username: "Josh Leuschke",
        text: "Bagaimana cara mengatasi ulat putih?",
        date: "Dec 7, 2024, 12:47 AM",
      },
      {
        id: 2,
        username: "Sammie Aufderhar",
        text: "Coba pakai pestisida alami.",
        date: "Dec 7, 2024, 9:50 PM",
      },
    ],
  },
  3: {
    id: 3,
    title: "Kompos bikin tanaman subur banget!",
    comments: [
      {
        id: 1,
        username: "Charlie",
        text: "Saya suka menggunakan limbah dapur.",
        date: "Dec 8, 2024, 7:30 AM",
      },
      {
        id: 2,
        username: "Bella",
        text: "Kompos memang ajaib!",
        date: "Dec 8, 2024, 8:45 AM",
      },
    ],
  },
};

const ForumComments: React.FC = () => {
  const { postId } = useParams<{ postId: string }>();
  const [post, setPost] = useState<ForumPost | null>(null);
  const [newComment, setNewComment] = useState<string>("");

  const username = "Anda"; // Nama pengguna aktif

  const saveToLocalStorage = (data: ForumPost) => {
    localStorage.setItem(`post-${data.id}`, JSON.stringify(data));
  };

  useEffect(() => {
    const id = Number(postId);
    const savedData = localStorage.getItem(`post-${id}`);
    if (savedData) {
      setPost(JSON.parse(savedData));
    } else if (mockData[id]) {
      const initialData = mockData[id];
      saveToLocalStorage(initialData);
      setPost(initialData);
    }
  }, [postId]);

  const handleAddComment = () => {
    if (newComment.trim()) {
      const newCommentObj: Comment = {
        id: Date.now(),
        username: username,
        text: newComment,
        date: new Date().toLocaleString(),
      };

      setPost((prevPost) => {
        if (prevPost) {
          const updatedPost = { ...prevPost, comments: [...prevPost.comments, newCommentObj] };
          saveToLocalStorage(updatedPost);
          return updatedPost;
        }
        return prevPost;
      });

      setNewComment(""); // Reset input komentar
    }
  };

  return (
    <IonPage>
      <Navbar />
      <IonContent>
        <div className="comments-container">
          <h1 className="comments-title">{post?.title}</h1>
          <div className="comments-list">
            {post?.comments.map((comment) => (
              <div key={comment.id} className="comment-item">
                <div className="comment-header">
                  <div className="comment-profile-pic"></div>
                  <div className="comment-details">
                    <p className="comment-username">{comment.username}</p>
                    <p className="comment-date">{comment.date}</p>
                  </div>
                </div>
                <p className="comment-text">{comment.text}</p>
              </div>
            ))}
          </div>
          <div className="active-user">
            <div className="comment-header">
              <div className="comment-profile-pic"></div>
              <div className="comment-details">
                <p className="comment-username">{username}</p>
                <p className="comment-date">{new Date().toLocaleString()}</p>
              </div>
            </div>
            <IonTextarea
              value={newComment}
              onIonInput={(e) => setNewComment(e.detail.value!)}
              placeholder="Tambah komentar..."
              className="textarea-input"
            />
          </div>
          <div className="button-container">
            <IonButton onClick={handleAddComment} className="submit-button">
              Kirim
            </IonButton>
          </div>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default ForumComments;