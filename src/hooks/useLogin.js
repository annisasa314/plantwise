import { useMutation } from "@tanstack/react-query";
import { loginWithEmailAndPassword } from "../services/auth.service";
import Cookies from "js-cookie";
export const useLogin = () => {
    return useMutation({
        mutationFn: async (formData) => {
            const userCredential = await loginWithEmailAndPassword(formData.email, formData.password);
            return {
                id: userCredential.user.uid,
                email: userCredential.user.email,
                name: userCredential.user.displayName || "User",
                // Add other necessary user properties
            };
        },
        onSuccess: (data) => {
            // Store user in cookies
            Cookies.set("user", JSON.stringify(data));
            // Optional: Redirect or show success message
            window.location.href = "/home";
        },
        onError: (error) => {
            console.error("Login failed", error);
            // Handle login error (show toast, etc.)
        },
    });
};
