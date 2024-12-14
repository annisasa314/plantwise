import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from "react";
import { IonCard, IonCardContent, IonIcon } from "@ionic/react";
import { chatbubbleEllipsesOutline, eyeOutline } from "ionicons/icons";
import { Link } from "react-router-dom";
import "./ForumCard.css";
const ForumCard = ({ post }) => {
    const [commentCount, setCommentCount] = useState(post.comments.length);
    useEffect(() => {
        const getCommentCountFromStorage = () => {
            const savedPost = localStorage.getItem(`post-${post.id}`);
            if (savedPost) {
                const parsedPost = JSON.parse(savedPost);
                return parsedPost.comments.length;
            }
            return post.comments.length;
        };
        setCommentCount(getCommentCountFromStorage());
        const handleStorageUpdate = () => {
            setCommentCount(getCommentCountFromStorage());
        };
        window.addEventListener("storage", handleStorageUpdate);
        return () => {
            window.removeEventListener("storage", handleStorageUpdate);
        };
    }, [post.id, post.comments.length]);
    return (_jsxs(IonCard, { className: "forum-card", children: [_jsxs("div", { className: "card-header", children: [_jsx("img", { src: post.image, alt: "Avatar", className: "avatar" }), _jsxs("div", { className: "user-date", children: [_jsx("span", { className: "user", children: post.user }), _jsx("span", { className: "date", children: post.date })] })] }), _jsxs("div", { className: "card-body", children: [_jsx("div", { className: "category", children: post.category }), _jsx("h3", { className: "title", children: post.title })] }), _jsx(IonCardContent, { children: _jsxs("div", { className: "footer", children: [_jsxs("div", { className: "views", children: [_jsx(IonIcon, { icon: eyeOutline }), _jsx("span", { children: post.views })] }), _jsx("div", { className: "comments", children: _jsxs(Link, { to: `/comments/${post.id}`, children: [_jsx(IonIcon, { icon: chatbubbleEllipsesOutline }), _jsx("span", { children: commentCount })] }) })] }) })] }));
};
export default ForumCard;
