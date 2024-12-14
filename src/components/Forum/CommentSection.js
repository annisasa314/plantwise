import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useEffect } from "react";
import { IonInput, IonButton, IonToast, IonSpinner } from "@ionic/react";
import { addComment } from "../../services/auth";
import { auth } from "../../../firebase";
import { Timestamp } from "firebase/firestore";
const CommentSection = ({ postId, comments, onNewComment, }) => {
    const [newComment, setNewComment] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState(null);
    const [currentUser, setCurrentUser] = useState(null);
    // Effect untuk menghandle autentikasi
    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((user) => {
            if (user) {
                setCurrentUser({
                    id: user.uid,
                    name: user.displayName ?? "",
                    email: user.email ?? "",
                });
            }
            else {
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
            const commentData = {
                body: newComment,
                name: currentUser.name || currentUser.email || "Anonymous",
                email: currentUser.email,
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
        }
        catch (error) {
            console.error("Error adding comment:", error);
            setErrorMessage("Gagal menambahkan komentar. Silakan coba lagi.");
        }
        finally {
            setIsLoading(false);
        }
    };
    // Render komentar dengan format yang lebih baik
    const renderComment = (comment) => (_jsxs("div", { className: "bg-gray-100 p-3 rounded-lg mb-2 shadow-sm", children: [_jsxs("div", { className: "flex justify-between items-center mb-1", children: [_jsx("span", { className: "font-semibold text-sm text-gray-800", children: comment.name }), _jsx("span", { className: "text-xs text-gray-500", children: comment.createAt instanceof Timestamp
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
                            }) })] }), _jsx("p", { className: "text-gray-700 text-sm", children: comment.body })] }, comment.id));
    return (_jsxs("div", { className: "mt-4", children: [_jsx(IonToast, { isOpen: !!errorMessage, onDidDismiss: () => setErrorMessage(null), message: errorMessage || "", duration: 3000, color: "danger" }), _jsx("div", { className: "space-y-2 mb-4", children: comments.length === 0 ? (_jsx("p", { className: "text-center text-gray-500 text-sm", children: "Belum ada komentar" })) : (comments.map(renderComment)) }), currentUser ? (_jsxs("div", { className: "flex space-x-2 items-center", children: [_jsx(IonInput, { value: newComment, onIonChange: (e) => setNewComment(e.detail.value), placeholder: "Tulis komentar...", className: "flex-grow border rounded px-2", disabled: isLoading }), _jsx(IonButton, { onClick: handleSubmitComment, disabled: isLoading, children: isLoading ? _jsx(IonSpinner, {}) : "Kirim" })] })) : (_jsx("div", { className: "text-center text-gray-500", children: _jsx("p", { children: "Silakan login untuk menambahkan komentar" }) }))] }));
};
export default CommentSection;
