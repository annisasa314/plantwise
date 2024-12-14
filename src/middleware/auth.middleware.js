import { jsx as _jsx } from "react/jsx-runtime";
import { useToast } from "../hooks/useToast";
import { Redirect } from "react-router-dom";
import Cookies from "js-cookie";
export const RequireAuth = ({ children }) => {
    const { errorToast } = useToast();
    const userCookies = Cookies.get("user");
    const user = userCookies ? JSON.parse(userCookies) : undefined;
    if (!user) {
        errorToast("You must login first");
        return _jsx(Redirect, { to: "/login" });
    }
    return children;
};
