import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import './ForumPost.css';
const ForumPost = ({ onUpload }) => {
    const [content, setContent] = useState('');
    const handleUpload = () => {
        if (content.trim()) {
            onUpload(content); // Kirim data ke parent component
            alert('Konten berhasil diupload: ' + content);
            setContent(''); // Reset input
        }
        else {
            alert('Tolong tulis sesuatu terlebih dahulu.');
        }
    };
    return (_jsxs("div", { className: "forum-post", children: [_jsx("nav", { className: "navbar-profil", children: _jsx("span", { children: "Profil" }) }), _jsxs("div", { className: "content", children: [_jsx("h1", { className: "main-title", children: "Siap untuk menggali tips berkebun? Mari tumbuh bersama!" }), _jsxs("div", { className: "input-bubble", children: [_jsx("textarea", { value: content, onChange: (e) => setContent(e.target.value), placeholder: "Tulis sesuatu..." }), _jsx("button", { className: "upload-button", onClick: handleUpload, children: "UNGGAH" })] })] })] }));
};
export default ForumPost;
