import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonButton, IonText, } from "@ionic/react";
import CommentSection from "../../components/Forum/CommentSection";
import { fetchComments } from "../../services/auth";
import { Timestamp } from "firebase/firestore";
const PostCard = ({ post, currentUser }) => {
    const [comments, setComments] = useState([]);
    const [showComments, setShowComments] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    // Fetch comments when the component is mounted or when view comments is clicked
    const loadComments = async () => {
        if (isLoading)
            return;
        setIsLoading(true);
        try {
            const fetchedComments = await fetchComments(post.id);
            setComments(fetchedComments);
            setShowComments(true);
        }
        catch (error) {
            console.error("Error loading comments:", error);
            // Optionally show a toast or error message to the user
        }
        finally {
            setIsLoading(false);
        }
    };
    // Handle adding a new comment
    const handleNewComment = (newComment) => {
        setComments([newComment, ...comments]);
    };
    // Convert timestamp to readable date
    const formatDate = (timestamp) => {
        if (timestamp instanceof Timestamp) {
            return timestamp.toDate().toLocaleString();
        }
        return new Date(timestamp).toLocaleString();
    };
    return (_jsxs(IonCard, { className: "mb-4 p-4 bg-white shadow-lg rounded-lg hover:translate-y-2 duration-200 ", children: [_jsx(IonCardHeader, { children: _jsx(IonCardTitle, { className: "text-xl font-bold", children: post.judul }) }), _jsxs(IonCardContent, { children: [_jsx("div", { className: "bg-gray-100 pt-3 pb-3 pl-1 rounded-lg mb-3", children: _jsx(IonText, { color: "dark", children: post.pertanyaan }) }), _jsx("p", { className: "text-gray-700 mb-2", children: post.body }), _jsxs("div", { className: "flex justify-between items-center mt-4", children: [_jsxs("div", { children: [_jsxs("span", { className: "text-sm text-gray-500 block", children: ["Posted by ", post.name] }), _jsx("span", { className: "text-sm text-gray-400", children: formatDate(post.createAt) })] }), _jsxs("div", { className: "flex items-center space-x-2", children: [_jsxs("span", { className: "text-sm text-gray-500", children: ["Views: ", post.view] }), _jsx(IonButton, { onClick: loadComments, disabled: isLoading, size: "small", fill: "outline", children: isLoading ? "Loading..." : "View Comments" })] })] }), showComments && (_jsx(CommentSection, { postId: post.id, comments: comments, onNewComment: handleNewComment }))] })] }));
};
export default PostCard;
