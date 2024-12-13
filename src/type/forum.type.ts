import { Timestamp } from "firebase/firestore";

export interface Post {
  id: string;
  judul: string;
  body: string;
  name: string;
  email: string;
  pertanyaan: string;
  createAt: Timestamp;
  view: number;
}

export interface Comment {
  id: string;
  body: string;
  name: string;
  email: string;
  createAt: Timestamp;
  postId: string;
}
