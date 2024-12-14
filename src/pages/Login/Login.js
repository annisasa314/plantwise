import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { IonPage, IonContent, IonInput, IonButton, IonItem, IonIcon, IonCard, IonCardContent, IonGrid, IonRow, IonCol, IonImg, IonText, IonToast, IonSpinner, } from "@ionic/react";
import { logoGoogle, mailOutline, lockClosedOutline } from "ionicons/icons";
import { Controller, useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import Cookies from "js-cookie";
import { Redirect } from "react-router";
import { loginWithEmailAndPassword, loginWithGoogle, } from "../../services/auth.service";
import { eye, eyeOff } from "ionicons/icons";
import "./Login.css";
import { useLogin } from "../../hooks/useLogin";
export const Login = () => {
    const LoginMutation = useLogin();
    const queryClient = useQueryClient();
    const [showToast, setShowToast] = useState(false);
    const [toastMessage, setToastMessage] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const { mutateAsync } = useMutation({
        mutationFn: async (formData) => {
            const userCredential = await loginWithEmailAndPassword(formData.email, formData.password);
            // Assuming you need to transform the userCredential to TUser
            // Modify this based on your actual auth service implementation
            return {
                id: userCredential.user.uid,
                email: userCredential.user.email,
                // Add other user properties as needed
            };
        },
        retry: 0,
        onSuccess: (data) => {
            queryClient.setQueryData(["user"], data);
            Cookies.set("user", JSON.stringify(data));
            setToastMessage("Sign in successful!");
            setShowToast(true);
            setTimeout(() => {
                window.location.href = "/home";
            }, 1500);
        },
        onError: (error) => {
            setToastMessage("Error: " + error.message);
            setShowToast(true);
        },
    });
    const { control, handleSubmit } = useForm();
    const userCookies = Cookies.get("user");
    const user = userCookies ? JSON.parse(userCookies) : undefined;
    const handleGoogleSignIn = async () => {
        try {
            const userCredential = await loginWithGoogle();
            const userData = {
                id: userCredential.user.uid,
                email: userCredential.user.email,
                // Add other user properties as needed
            };
            queryClient.setQueryData(["user"], userData);
            Cookies.set("user", JSON.stringify(userData));
            setToastMessage("Signed in with Google successfully!");
            setShowToast(true);
            window.location.href = "/home";
        }
        catch (err) {
            setToastMessage("Error: " + err.message);
            setShowToast(true);
        }
    };
    if (user) {
        return _jsx(Redirect, { to: "/" });
    }
    return (_jsx(IonPage, { children: _jsxs(IonContent, { className: "ion-padding login-content", children: [_jsx(IonGrid, { className: "login-grid", children: _jsxs(IonRow, { children: [_jsxs(IonCol, { size: "12", sizeMd: "6", children: [_jsxs("div", { className: "header-container", children: [_jsx("h2", { className: "ion-no-margin title", children: "Login" }), _jsx("p", { className: "subtitle", children: "Login to Your Account" })] }), _jsx(IonCard, { className: "login-card", children: _jsxs(IonCardContent, { children: [_jsxs("form", { onSubmit: handleSubmit((data) => mutateAsync(data)), children: [_jsx(Controller, { control: control, name: "email", rules: {
                                                                required: "Please enter email address",
                                                                pattern: {
                                                                    value: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/,
                                                                    message: "Please enter valid email address",
                                                                },
                                                            }, render: ({ field: { onChange, value }, fieldState }) => (_jsxs(IonItem, { lines: "none", className: "input-container", children: [_jsx(IonIcon, { icon: mailOutline, slot: "start" }), _jsx(IonInput, { type: "email", placeholder: "Enter your email", value: value, onIonChange: onChange, errorText: fieldState.error?.message, required: true })] })) }), _jsx(Controller, { control: control, name: "password", rules: {
                                                                required: "Please enter password",
                                                                minLength: {
                                                                    value: 6,
                                                                    message: "Password must be at least 6 characters",
                                                                },
                                                            }, render: ({ field: { onChange, value }, fieldState }) => (_jsxs(IonItem, { lines: "none", className: "input-container", children: [_jsx(IonIcon, { icon: lockClosedOutline, slot: "start" }), _jsx(IonInput, { type: showPassword ? "text" : "password", placeholder: "Enter your password", value: value, onIonChange: onChange, errorText: fieldState.error?.message, required: true, children: _jsx(IonIcon, { icon: showPassword ? eye : eyeOff, className: "password-toggle-icon", onClick: () => setShowPassword(!showPassword) }) })] })) }), _jsx(IonButton, { expand: "block", type: "submit", color: "primary", className: "button-container", disabled: isLoading, children: isLoading ? _jsx(IonSpinner, { name: "circles" }) : "Login" })] }), _jsx("div", { className: "ion-text-center", children: _jsx(IonText, { color: "medium", children: "or login with" }) }), _jsxs(IonButton, { expand: "block", onClick: handleGoogleSignIn, color: "secondary", className: "google-button", disabled: isLoading, children: [_jsx(IonIcon, { slot: "start", icon: logoGoogle }), "Login with Google"] })] }) }), _jsxs("div", { className: "login-link", children: [_jsx("p", { children: "Don't have an account?" }), _jsx(IonButton, { fill: "clear", size: "small", color: "primary", onClick: () => (window.location.href = "/signup"), children: "Sign Up" })] })] }), _jsx(IonCol, { size: "20", sizeMd: "6", className: "image-column", children: _jsx(IonImg, { src: "https://images.unsplash.com/photo-1472653525502-fc569e405a74?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", alt: "LoginImage", className: "login-image" }) })] }) }), _jsx(IonToast, { isOpen: showToast, onDidDismiss: () => setShowToast(false), message: toastMessage, duration: 1500, color: "success", position: "top" })] }) }));
};
export default Login;
