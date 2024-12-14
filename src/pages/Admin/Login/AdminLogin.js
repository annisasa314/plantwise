import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { IonPage, IonContent, IonInput, IonButton, IonItem, IonIcon, IonCard, IonCardContent, IonToast, IonSpinner, } from "@ionic/react";
import { mailOutline, lockClosedOutline } from "ionicons/icons";
import { Controller, useForm } from "react-hook-form";
import Cookies from "js-cookie";
import { eye, eyeOff } from "ionicons/icons";
import { useAdminLogin } from "../../../hooks/useAdminLogin"; // Custom hook for admin login
export const AdminLogin = () => {
    const { control, handleSubmit } = useForm();
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [showToast, setShowToast] = useState(false);
    const [toastMessage, setToastMessage] = useState("");
    const { mutateAsync } = useAdminLogin(); // Custom hook to handle login
    const userCookies = Cookies.get("user");
    const user = userCookies ? JSON.parse(userCookies) : undefined;
    const handleAdminLogin = async (data) => {
        try {
            await mutateAsync(data);
        }
        catch (error) {
            setToastMessage("Login failed. Please try again.");
            setShowToast(true);
        }
    };
    //   if (user) {
    //     return <Redirect to="/admin/dashboard" />; // Redirect if user is logged in
    //   }
    return (_jsx(IonPage, { children: _jsxs(IonContent, { className: "ion-padding admin-login-content", children: [_jsxs("div", { className: "p-24", children: [" ", _jsxs("div", { className: "header-container", children: [_jsx("h2", { className: "ion-no-margin title", children: "Admin Login" }), _jsx("p", { className: "subtitle p-4", children: "Login to Admin Panel" })] }), _jsx(IonCard, { className: "login-card shadow-5xl", children: _jsx(IonCardContent, { children: _jsxs("form", { onSubmit: handleSubmit(handleAdminLogin), children: [_jsx(Controller, { control: control, name: "email", rules: {
                                                required: "Please enter email address",
                                                pattern: {
                                                    value: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/i,
                                                    message: "Please enter a valid email address",
                                                },
                                            }, render: ({ field: { onChange, value }, fieldState }) => (_jsxs(IonItem, { lines: "none", className: "input-container", children: [_jsx(IonIcon, { icon: mailOutline, slot: "start" }), _jsx(IonInput, { type: "email", placeholder: "Enter your email", value: value, onIonChange: onChange, errorText: fieldState.error?.message, required: true })] })) }), _jsx(Controller, { control: control, name: "password", rules: {
                                                required: "Please enter password",
                                                minLength: {
                                                    value: 6,
                                                    message: "Password must be at least 6 characters",
                                                },
                                            }, render: ({ field: { onChange, value }, fieldState }) => (_jsxs(IonItem, { lines: "none", className: "input-container", children: [_jsx(IonIcon, { icon: lockClosedOutline, slot: "start" }), _jsx(IonInput, { type: showPassword ? "text" : "password", placeholder: "Enter your password", value: value, onIonChange: onChange, errorText: fieldState.error?.message, required: true, children: _jsx(IonIcon, { icon: showPassword ? eye : eyeOff, className: "password-toggle-icon", onClick: () => setShowPassword(!showPassword) }) })] })) }), _jsx(IonButton, { expand: "block", type: "submit", color: "primary", className: "button-container", disabled: isLoading, children: isLoading ? _jsx(IonSpinner, { name: "circles" }) : "Login" })] }) }) })] }), _jsx(IonToast, { isOpen: showToast, onDidDismiss: () => setShowToast(false), message: toastMessage, duration: 1500, color: "danger", position: "top" })] }) }));
};
export default AdminLogin;
