import { useMutation } from "@tanstack/react-query";
import { loginWithEmailAndPassword } from "../services/auth.service";
import { TLoginForm } from "../type/form.type";
import { TUser } from "../type/user.type";
import Cookies from "js-cookie";

export const useAdminLogin = () => {
  return useMutation<TUser, Error, TLoginForm>({
    mutationFn: async (formData: TLoginForm) => {
      const userCredential = await loginWithEmailAndPassword(
        formData.email,
        formData.password
      );

      const user = {
        id: userCredential.user.uid,
        email: userCredential.user.email,
        name: userCredential.user.displayName || "Admin",
        role: "admin", // Ensure you handle role-specific data here
      } as TUser;

      return user;
    },
    onSuccess: (data) => {
      Cookies.set("user", JSON.stringify(data)); // Store admin in cookies
      window.location.href = "/admin/dashboard"; // Redirect to admin dashboard
    },
    onError: (error) => {
      console.error("Admin login failed", error);
      // Optionally, show error message or toast
    },
  });
};
