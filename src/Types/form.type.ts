import { TUser } from "./user.type";

export type TSignupForm = {
  name: string;
  email: string;
  password: string;
};

export type TLoginForm = {
  email: string;
  password: string;
};

export type TUpdateProfileForm = Omit<
  Partial<TUser>,
  "email" | "password" | "photoURL"
> & {
  photoURL?: File;
};