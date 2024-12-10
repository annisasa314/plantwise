import React from "react";
import "./ForumCard.css";

type ForumPost = {
  id: number;
  title: string;
  category: string;
  description: string;
  views: number;
  comments: number;
  image: string;
};

type ForumCardProps = {
  post: ForumPost;
};

const ForumCard: React.FC<ForumCardProps> = ({ post }) => {
  return (
    <div className="forum-card">
      <img src={post.image} alt={post.title} className="forum-card-image" />
      <div className="forum-card-body">
        <h3 className="forum-card-title">{post.title}</h3>
        <p className="forum-card-description">{post.description}</p>
        <div className="forum-card-footer">
          <span className="forum-card-views">{post.views} views</span>
          <span className="forum-card-comments">{post.comments} comments</span>
        </div>
      </div>
    </div>
  );
};

export default ForumCard;
