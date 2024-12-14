import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useEffect } from "react";
import { IonContent, IonButton, IonText, IonToolbar, IonTitle, } from "@ionic/react";
import { auth } from "../../../firebase";
import PostCard from "../../components/Forum/PostCard";
import { fetchPosts, addPost } from "../../services/auth";
import CreatePostModal from "../../components/Forum/CreatePostModal";
import { ERole } from "../../type/user.type"; // Adjust import path
import { MainLayout } from "../../layouts/MainLayout";
import { ChatbotProvider } from "../../components/Bot/ChatbotProvider";
import Chatbot from "../../components/Bot/Chatbot";
import ChatbotFloatingIcon from "../../components/Bot/ChatbotIcon";
const ForumPage = () => {
    const [posts, setPosts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isCreatePostModalOpen, setIsCreatePostModalOpen] = useState(false);
    const [currentUser, setCurrentUser] = useState(null);
    // Authentication Effect
    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((authUser) => {
            if (authUser) {
                const userModel = {
                    ...authUser,
                    id: authUser.uid,
                    name: authUser.displayName ?? "",
                    email: authUser.email ?? "",
                    role: ERole.USER,
                    createdAt: authUser.metadata.creationTime ?? new Date().toISOString(),
                    updatedAt: authUser.metadata.lastSignInTime ?? new Date().toISOString(),
                };
                setCurrentUser(userModel);
            }
            else {
                setCurrentUser(null);
            }
        });
        // Cleanup subscription on unmount
        return () => unsubscribe();
    }, []);
    // Load posts when component mounts
    useEffect(() => {
        const loadPosts = async () => {
            try {
                setIsLoading(true);
                const fetchedPosts = await fetchPosts();
                setPosts(fetchedPosts);
            }
            catch (error) {
                console.error("Error fetching posts:", error);
            }
            finally {
                setIsLoading(false);
            }
        };
        loadPosts();
    }, []);
    // Handler for creating a new post
    const handleCreatePost = async (newPost) => {
        if (!currentUser)
            return;
        try {
            const addedPost = await addPost(newPost);
            setPosts((prevPosts) => [addedPost, ...prevPosts]);
            setIsCreatePostModalOpen(false);
        }
        catch (error) {
            console.error("Error creating post:", error);
            // Optionally show error toast
        }
    };
    return (_jsx(MainLayout, { children: _jsxs(IonContent, { children: [_jsxs("div", { className: "container mx-auto", children: [_jsxs("div", { className: "flex flex-col mb-4", children: [_jsx(IonToolbar, { color: "primary", className: "text-white pl-8", children: _jsx(IonTitle, { className: "font-bold", children: "Forum Diskusi" }) }), _jsx("div", { className: "flex justify-between items-center mt-4 px-8", children: _jsx("div", { className: "ml-auto", children: currentUser ? (_jsx(IonButton, { color: "primary", onClick: () => setIsCreatePostModalOpen(true), children: "Create Post" })) : (_jsx(IonText, { color: "medium", children: "Please log in to create a post" })) }) })] }), isLoading && (_jsx("div", { className: "text-center py-4", children: _jsx(IonText, { children: "Loading posts..." }) })), !isLoading && posts.length === 0 && (_jsx("div", { className: "text-center py-4", children: _jsx(IonText, { color: "medium", children: "No posts yet. Be the first to post!" }) })), _jsx("div", { className: "space-y-4", children: posts.map((post) => (_jsx(PostCard, { post: post, currentUser: currentUser }, post.id))) }), isCreatePostModalOpen && currentUser && (_jsx(CreatePostModal, { isOpen: isCreatePostModalOpen, onClose: () => setIsCreatePostModalOpen(false), onCreatePost: handleCreatePost, currentUser: currentUser }))] }), _jsxs(ChatbotProvider, { children: [_jsx(Chatbot, {}), _jsx(ChatbotFloatingIcon, {})] })] }) }));
};
export default ForumPage;
