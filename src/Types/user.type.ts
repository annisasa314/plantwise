import { User } from "firebase/auth";

export enum ERole {
  ADMIN = "admin",
  USER = "user",
}

export type TUser = User & {
  id: string;
  name: string;
  email: string;
  role: ERole;
  createdAt: string;
  updatedAt: string;
};
