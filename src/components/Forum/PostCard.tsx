import React, { useState, useEffect } from "react";
import {
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
  IonButton,
  IonText,
} from "@ionic/react";
import { Post, Comment } from "../../type/forum.type";
import CommentSection from "../../components/Forum/CommentSection";
import { fetchComments } from "../../services/auth";
import { useLogin } from "../../hooks/useLogin";
import { Timestamp } from "firebase/firestore";
import { TUser } from "../../type/user.type";

interface PostCardProps {
  post: Post;
  currentUser?: TUser | null;
}

const PostCard: React.FC<PostCardProps> = ({ post, currentUser }) => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [showComments, setShowComments] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Fetch comments when the component is mounted or when view comments is clicked
  const loadComments = async () => {
    if (isLoading) return;

    setIsLoading(true);
    try {
      const fetchedComments = await fetchComments(post.id);
      setComments(fetchedComments);
      setShowComments(true);
    } catch (error) {
      console.error("Error loading comments:", error);
      // Optionally show a toast or error message to the user
    } finally {
      setIsLoading(false);
    }
  };

  // Handle adding a new comment
  const handleNewComment = (newComment: Comment) => {
    setComments([newComment, ...comments]);
  };

  // Convert timestamp to readable date
  const formatDate = (timestamp: Timestamp | string | Date) => {
    if (timestamp instanceof Timestamp) {
      return timestamp.toDate().toLocaleString();
    }
    return new Date(timestamp).toLocaleString();
  };

  return (
    <IonCard className="mb-4 p-4 bg-white shadow-lg rounded-lg hover:translate-y-2 duration-200 ">
      <IonCardHeader>
        <IonCardTitle className="text-xl font-bold">{post.judul}</IonCardTitle>
      </IonCardHeader>
      <IonCardContent>
        {/* New section for displaying the question */}
        <div className="bg-gray-100 pt-3 pb-3 pl-1 rounded-lg mb-3">
          <IonText color="dark">{post.pertanyaan}</IonText>
        </div>

        <p className="text-gray-700 mb-2">{post.body}</p>

        <div className="flex justify-between items-center mt-4">
          <div>
            <span className="text-sm text-gray-500 block">
              Posted by {post.name}
            </span>
            <span className="text-sm text-gray-400">
              {formatDate(post.createAt)}
            </span>
          </div>

          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-500">Views: {post.view}</span>
            <IonButton
              onClick={loadComments}
              disabled={isLoading}
              size="small"
              fill="outline"
            >
              {isLoading ? "Loading..." : "View Comments"}
            </IonButton>
          </div>
        </div>

        {showComments && (
          <CommentSection
            postId={post.id}
            comments={comments}
            onNewComment={handleNewComment}
          />
        )}
      </IonCardContent>
    </IonCard>
  );
};

export default PostCard;
