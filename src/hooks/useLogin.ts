import { useMutation } from '@tanstack/react-query';
import { loginWithEmailAndPassword } from '../services/auth.service';
import { TLoginForm } from '../types/form.type';
import { TUser } from '../types/user.type';
import Cookies from 'js-cookie';

export const useLogin = () => {
  return useMutation<TUser, Error, TLoginForm>({
    mutationFn: async (formData: TLoginForm) => {
      const userCredential = await loginWithEmailAndPassword(
        formData.email, 
        formData.password
      );
      
      return {
        id: userCredential.user.uid,
        email: userCredential.user.email,
        name: userCredential.user.displayName || 'User',
        // Add other necessary user properties
      } as TUser;
    },
    onSuccess: (data) => {
      // Store user in cookies
      Cookies.set('user', JSON.stringify(data));
      
      // Optional: Redirect or show success message
      window.location.href = '/home';
    },
    onError: (error) => {
      console.error('Login failed', error);
      // Handle login error (show toast, etc.)
    },
  });
};