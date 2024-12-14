import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { IonModal, IonContent, IonInput, IonTextarea, IonButton, IonHeader, IonToolbar, IonTitle, } from "@ionic/react";
import { Timestamp } from "firebase/firestore";
const CreatePostModal = ({ isOpen, onClose, onCreatePost, currentUser, }) => {
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
            setPertanyaan("Apa saja jenis hama yang sering menyerang tanaman di kebun Anda, dan bagaimana cara efektif untuk mengatasinya?");
            onClose();
        }
        catch (error) {
            console.error("Error creating post:", error);
            // TODO: Add error handling (e.g., show error toast)
        }
    };
    return (_jsxs(IonModal, { isOpen: isOpen, onDidDismiss: onClose, children: [_jsx(IonHeader, { children: _jsx(IonToolbar, { children: _jsx(IonTitle, { children: "Create New Post" }) }) }), _jsxs(IonContent, { className: "ion-padding", children: [_jsx(IonInput, { value: title, onIonChange: (e) => setTitle(e.detail.value), placeholder: "Post Title", label: "Title", labelPlacement: "floating" }), _jsx(IonInput, { value: pertanyaan, onIonChange: (e) => setPertanyaan(e.detail.value), placeholder: "Specific Question", label: "Question", labelPlacement: "floating" }), _jsx(IonTextarea, { value: body, onIonChange: (e) => setBody(e.detail.value), placeholder: "Post Content", label: "Content", labelPlacement: "floating" }), _jsxs("div", { className: "ion-padding", children: [_jsx(IonButton, { expand: "block", onClick: handleSubmit, children: "Post" }), _jsx(IonButton, { expand: "block", fill: "outline", onClick: onClose, children: "Cancel" })] })] })] }));
};
export default CreatePostModal;
