import React, { useState, useEffect } from "react";
import {
  IonContent,
  IonPage,
  IonButton,
  IonText,
  IonToolbar,
  IonTitle,
} from "@ionic/react";
import { auth } from "../../../firebase";
import PostCard from "../../components/Forum/PostCard";
import { Post } from "../../type/forum.type";
import { fetchPosts, addPost } from "../../services/auth";
import CreatePostModal from "../../components/Forum/CreatePostModal";
import { TUser, ERole } from "../../type/user.type"; // Adjust import path
import { MainLayout } from "../../layouts/MainLayout";
import { ChatbotProvider } from "../../components/Bot/ChatbotProvider";
import Chatbot from "../../components/Bot/Chatbot";
import ChatbotFloatingIcon from "../../components/Bot/ChatbotIcon";

const ForumPage: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isCreatePostModalOpen, setIsCreatePostModalOpen] =
    useState<boolean>(false);
  const [currentUser, setCurrentUser] = useState<TUser | null>(null);

  // Authentication Effect
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        const userModel: TUser = {
          ...authUser,
          id: authUser.uid,
          name: authUser.displayName ?? "",
          email: authUser.email ?? "",
          role: ERole.USER,
          createdAt: authUser.metadata.creationTime ?? new Date().toISOString(),
          updatedAt:
            authUser.metadata.lastSignInTime ?? new Date().toISOString(),
        };
        setCurrentUser(userModel);
      } else {
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
      } catch (error) {
        console.error("Error fetching posts:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadPosts();
  }, []);

  // Handler for creating a new post
  const handleCreatePost = async (newPost: Omit<Post, "id">) => {
    if (!currentUser) return;

    try {
      const addedPost = await addPost(newPost);
      setPosts((prevPosts) => [addedPost, ...prevPosts]);
      setIsCreatePostModalOpen(false);
    } catch (error) {
      console.error("Error creating post:", error);
      // Optionally show error toast
    }
  };

  return (
    <MainLayout>
      <IonContent>
        <div className="container mx-auto">
          <div className="flex flex-col mb-4">
            <IonToolbar color="primary" className="text-white pl-8">
              <IonTitle className="font-bold">Forum Diskusi</IonTitle>
            </IonToolbar>

            {/* Create Post Button (aligned to the right) */}
            <div className="flex justify-between items-center mt-4 px-8">
              <div className="ml-auto">
                {currentUser ? (
                  <IonButton
                    color="primary"
                    onClick={() => setIsCreatePostModalOpen(true)}
                  >
                    Create Post
                  </IonButton>
                ) : (
                  <IonText color="medium">
                    Please log in to create a post
                  </IonText>
                )}
              </div>
            </div>
          </div>

          {/* Loading State */}
          {isLoading && (
            <div className="text-center py-4">
              <IonText>Loading posts...</IonText>
            </div>
          )}

          {/* No Posts State */}
          {!isLoading && posts.length === 0 && (
            <div className="text-center py-4">
              <IonText color="medium">
                No posts yet. Be the first to post!
              </IonText>
            </div>
          )}

          {/* Posts List */}
          <div className="space-y-4">
            {posts.map((post) => (
              <PostCard key={post.id} post={post} currentUser={currentUser} />
            ))}
          </div>

          {/* Create Post Modal (only shown when open) */}
          {isCreatePostModalOpen && currentUser && (
            <CreatePostModal
              isOpen={isCreatePostModalOpen}
              onClose={() => setIsCreatePostModalOpen(false)}
              onCreatePost={handleCreatePost}
              currentUser={currentUser}
            />
          )}
        </div>

        {/* Chatbot components */}
        <ChatbotProvider>
          <Chatbot />
          <ChatbotFloatingIcon />
        </ChatbotProvider>
      </IonContent>
    </MainLayout>
  );
};

export default ForumPage;
