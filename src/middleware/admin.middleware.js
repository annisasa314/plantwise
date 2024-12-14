import { jsx as _jsx } from "react/jsx-runtime";
import { useToast } from "../hooks/useToast";
import { Redirect } from "react-router";
import Cookies from "js-cookie";
export const AdminOnly = ({ children }) => {
    const { errorToast } = useToast();
    const userCookies = Cookies.get("user");
    const user = userCookies ? JSON.parse(userCookies) : undefined;
    if (!user) {
        errorToast("You have to login first");
        return _jsx(Redirect, { to: "/admin" });
    }
    if (user?.role !== "admin") {
        errorToast("You're not authorized to access this page");
        return _jsx(Redirect, { to: "/" });
    }
    return children;
};
