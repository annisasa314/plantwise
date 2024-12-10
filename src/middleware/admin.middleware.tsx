import { useToast } from "../hooks/useToast";
import { Redirect } from "react-router";
import { TUser } from "../types/user.type";
import Cookies from "js-cookie";

interface AdminOnly {
  children: React.ReactNode;
}

export const AdminOnly: React.FC<AdminOnly> = ({ children }) => {
  const { errorToast } = useToast();

  const userCookies = Cookies.get("user");
  const user: TUser = userCookies ? JSON.parse(userCookies) : undefined;

  if (!user) {
    errorToast("You have to login first");
    return <Redirect to="/admin" />;
  }

  if (user?.role !== "admin") {
    errorToast("You're not authorized to access this page");
    return <Redirect to="/" />;
  }

  return children;
};
