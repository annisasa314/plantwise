import React, { useState } from 'react';
import './ForumPost.css';

interface ForumPostProps {
    onUpload: (title: string) => void;
}

const ForumPost: React.FC<ForumPostProps> = ({ onUpload }) => {
    const [content, setContent] = useState<string>('');

    const handleUpload = () => {
        if (content.trim()) {
            onUpload(content); // Kirim data ke parent component
            alert('Konten berhasil diupload: ' + content);
            setContent(''); // Reset input
        } else {
            alert('Tolong tulis sesuatu terlebih dahulu.');
        }
    };

    return (
        <div className="forum-post">
            <nav className="navbar-profil">
                <span>Profil</span>
            </nav>
            <div className="content">
                <h1 className="main-title">
                    Siap untuk menggali tips berkebun? Mari tumbuh bersama!
                </h1>
                <div className="input-bubble">
                    <textarea
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        placeholder="Tulis sesuatu..."
                    ></textarea>
                    <button className="upload-button" onClick={handleUpload}>
                        UNGGAH
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ForumPost;

