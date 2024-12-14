import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { IonPage, IonContent, IonInput, IonButton, IonItem, IonIcon, IonToast, IonCard, IonCardContent, IonGrid, IonRow, IonCol, IonImg, } from "@ionic/react";
import { mailOutline, lockClosedOutline, personOutline } from "ionicons/icons";
import { useHistory } from "react-router-dom";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../../firebase";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../../../firebase";
import "./SignUp.css";
const SignUp = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState(null);
    const [name, setName] = useState("");
    const [showToast, setShowToast] = useState(false);
    const [toastMessage, setToastMessage] = useState("");
    const history = useHistory();
    const handleSignUp = async () => {
        setError(null);
        if (password !== confirmPassword) {
            setError("Passwords do not match!");
            setToastMessage("Passwords do not match!");
            setShowToast(true);
            return;
        }
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;
            await saveUserData(user.uid, name, email);
            setToastMessage("Account created successfully!");
            setShowToast(true);
            setTimeout(() => {
                history.push("/login");
            }, 1500);
        }
        catch (error) {
            setToastMessage("Error creating account. Please try again.");
            setShowToast(true);
            console.error("Error creating account:", error);
        }
    };
    const saveUserData = async (userId, name, email) => {
        try {
            await setDoc(doc(db, "users", userId), {
                name: name,
                email: email,
                createdAt: new Date(),
            });
        }
        catch (error) {
            console.error("Error saving user data:", error);
        }
    };
    return (_jsx(IonPage, { children: _jsxs(IonContent, { className: "ion-padding sign-up-content", children: [_jsx(IonGrid, { className: "signup-grid", children: _jsxs(IonRow, { children: [_jsx(IonCol, { size: "12", sizeMd: "6", className: "image-column", children: _jsx(IonImg, { src: "https://images.unsplash.com/photo-1464226184884-fa280b87c399?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", alt: "Signup Image", className: "signup-image" }) }), _jsxs(IonCol, { size: "12", sizeMd: "6", children: [_jsxs("div", { className: "header-container", children: [_jsx("h2", { className: "ion-no-margin title", children: "Sign Up" }), _jsx("p", { className: "subtitle", children: "Create an account to get started" })] }), _jsx(IonCard, { className: "signup-card", children: _jsxs(IonCardContent, { children: [_jsxs(IonItem, { lines: "none", className: "input-container", children: [_jsx(IonIcon, { icon: personOutline, slot: "start" }), _jsx(IonInput, { placeholder: "Enter your full name", value: name, onIonChange: (e) => setName(e.detail.value), className: "input-field" })] }), _jsxs(IonItem, { lines: "none", className: "input-container", children: [_jsx(IonIcon, { icon: mailOutline, slot: "start" }), _jsx(IonInput, { type: "email", placeholder: "Enter your email", value: email, onIonChange: (e) => setEmail(e.detail.value), className: "input-field" })] }), _jsxs(IonItem, { lines: "none", className: "input-container", children: [_jsx(IonIcon, { icon: lockClosedOutline, slot: "start" }), _jsx(IonInput, { type: "password", placeholder: "Enter your password", value: password, onIonChange: (e) => setPassword(e.detail.value), className: "input-field" })] }), _jsxs(IonItem, { lines: "none", className: "input-container", children: [_jsx(IonIcon, { icon: lockClosedOutline, slot: "start" }), _jsx(IonInput, { type: "password", placeholder: "Confirm your password", value: confirmPassword, onIonChange: (e) => setConfirmPassword(e.detail.value), className: "input-field" })] }), _jsx(IonButton, { expand: "block", onClick: handleSignUp, color: "primary", children: "Sign Up" })] }) }), _jsxs("div", { className: "login-link", children: [_jsx("p", { children: "Already have an account?" }), _jsx(IonButton, { fill: "clear", size: "small", color: "primary", onClick: () => history.push("/login"), children: "Log In" })] })] })] }) }), _jsx(IonToast, { isOpen: showToast, onDidDismiss: () => setShowToast(false), message: toastMessage, duration: 1500, color: "success", position: "top" })] }) }));
};
export default SignUp;
