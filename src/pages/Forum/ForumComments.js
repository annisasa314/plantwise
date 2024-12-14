import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useEffect } from "react";
import { IonPage, IonContent, IonButton, IonTextarea } from "@ionic/react";
import { useParams } from "react-router-dom";
import "./ForumComments.css";
const mockData = {
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
const ForumComments = () => {
    const { postId } = useParams();
    const [post, setPost] = useState(null);
    const [newComment, setNewComment] = useState("");
    const username = "Anda"; // Nama pengguna aktif
    const saveToLocalStorage = (data) => {
        localStorage.setItem(`post-${data.id}`, JSON.stringify(data));
    };
    useEffect(() => {
        const id = Number(postId);
        const savedData = localStorage.getItem(`post-${id}`);
        if (savedData) {
            setPost(JSON.parse(savedData));
        }
        else if (mockData[id]) {
            const initialData = mockData[id];
            saveToLocalStorage(initialData);
            setPost(initialData);
        }
    }, [postId]);
    const handleAddComment = () => {
        if (newComment.trim()) {
            const newCommentObj = {
                id: Date.now(),
                username: username,
                text: newComment,
                date: new Date().toLocaleString(),
            };
            setPost((prevPost) => {
                if (prevPost) {
                    const updatedPost = {
                        ...prevPost,
                        comments: [...prevPost.comments, newCommentObj],
                    };
                    saveToLocalStorage(updatedPost);
                    return updatedPost;
                }
                return prevPost;
            });
            setNewComment(""); // Reset input komentar
        }
    };
    return (_jsx(IonPage, { children: _jsx(IonContent, { children: _jsxs("div", { className: "comments-container", children: [_jsx("h1", { className: "comments-title", children: post?.title }), _jsx("div", { className: "comments-list", children: post?.comments.map((comment) => (_jsxs("div", { className: "comment-item", children: [_jsxs("div", { className: "comment-header", children: [_jsx("div", { className: "comment-profile-pic" }), _jsxs("div", { className: "comment-details", children: [_jsx("p", { className: "comment-username", children: comment.username }), _jsx("p", { className: "comment-date", children: comment.date })] })] }), _jsx("p", { className: "comment-text", children: comment.text })] }, comment.id))) }), _jsxs("div", { className: "active-user", children: [_jsxs("div", { className: "comment-header", children: [_jsx("div", { className: "comment-profile-pic" }), _jsxs("div", { className: "comment-details", children: [_jsx("p", { className: "comment-username", children: username }), _jsx("p", { className: "comment-date", children: new Date().toLocaleString() })] })] }), _jsx(IonTextarea, { value: newComment, onIonInput: (e) => setNewComment(e.detail.value), placeholder: "Tambah komentar...", className: "textarea-input" })] }), _jsx("div", { className: "button-container", children: _jsx(IonButton, { onClick: handleAddComment, className: "submit-button", children: "Kirim" }) })] }) }) }));
};
export default ForumComments;
