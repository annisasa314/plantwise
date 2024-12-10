import React, { useState } from "react";
import {
  IonPage,
  IonContent,
  IonInput,
  IonButton,
  IonItem,
  IonIcon,
  IonCard,
  IonCardContent,
  IonGrid,
  IonRow,
  IonCol,
  IonImg,
  IonText,
  IonToast,
  IonSpinner,
} from "@ionic/react";
import { logoGoogle, mailOutline, lockClosedOutline } from "ionicons/icons";
import { Controller, useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import Cookies from "js-cookie";
import { Redirect } from "react-router";

import {
  loginWithEmailAndPassword,
  loginWithGoogle,
} from "../../services/auth.service";
import { TUser } from "../../type/user.type";
import { TLoginForm } from "../../type/form.type";
import { eye, eyeOff } from "ionicons/icons";
import "./Login.css";

import { useLogin } from "../../hooks/useLogin";

export const Login: React.FC = () => {
  const LoginMutation = useLogin();
  const queryClient = useQueryClient();
  const [showToast, setShowToast] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<string>("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const { mutateAsync } = useMutation<TUser, Error, TLoginForm>({
    mutationFn: async (formData: TLoginForm) => {
      const userCredential = await loginWithEmailAndPassword(
        formData.email,
        formData.password
      );
      // Assuming you need to transform the userCredential to TUser
      // Modify this based on your actual auth service implementation
      return {
        id: userCredential.user.uid,
        email: userCredential.user.email,
        // Add other user properties as needed
      } as TUser;
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

  const { control, handleSubmit } = useForm<TLoginForm>();

  const userCookies = Cookies.get("user");
  const user = userCookies ? (JSON.parse(userCookies) as TUser) : undefined;

  const handleGoogleSignIn = async () => {
    try {
      const userCredential = await loginWithGoogle();
      const userData = {
        id: userCredential.user.uid,
        email: userCredential.user.email,
        // Add other user properties as needed
      } as TUser;

      queryClient.setQueryData(["user"], userData);
      Cookies.set("user", JSON.stringify(userData));
      setToastMessage("Signed in with Google successfully!");
      setShowToast(true);
      window.location.href = "/home";
    } catch (err: any) {
      setToastMessage("Error: " + err.message);
      setShowToast(true);
    }
  };

  if (user) {
    return <Redirect to="/" />;
  }

  return (
    <IonPage>
      <IonContent className="ion-padding login-content">
        <IonGrid className="login-grid">
          <IonRow>
            <IonCol size="12" sizeMd="6">
              <div className="header-container">
                <h2 className="ion-no-margin title">Login</h2>
                <p className="subtitle">Login to Your Account</p>
              </div>

              <IonCard className="login-card">
                <IonCardContent>
                  <form onSubmit={handleSubmit((data) => mutateAsync(data))}>
                    <Controller
                      control={control}
                      name="email"
                      rules={{
                        required: "Please enter email address",
                        pattern: {
                          value: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/,
                          message: "Please enter valid email address",
                        },
                      }}
                      render={({ field: { onChange, value }, fieldState }) => (
                        <IonItem lines="none" className="input-container">
                          <IonIcon icon={mailOutline} slot="start" />
                          <IonInput
                            type="email"
                            placeholder="Enter your email"
                            value={value}
                            onIonChange={onChange}
                            errorText={fieldState.error?.message}
                            required
                          />
                        </IonItem>
                      )}
                    />

                    <Controller
                      control={control}
                      name="password"
                      rules={{
                        required: "Please enter password",
                        minLength: {
                          value: 6,
                          message: "Password must be at least 6 characters",
                        },
                      }}
                      render={({ field: { onChange, value }, fieldState }) => (
                        <IonItem lines="none" className="input-container">
                          <IonIcon icon={lockClosedOutline} slot="start" />
                          <IonInput
                            type={showPassword ? "text" : "password"}
                            placeholder="Enter your password"
                            value={value}
                            onIonChange={onChange}
                            errorText={fieldState.error?.message}
                            required
                          >
                            <IonIcon
                              icon={showPassword ? eye : eyeOff}
                              className="password-toggle-icon"
                              onClick={() => setShowPassword(!showPassword)}
                            />
                          </IonInput>
                        </IonItem>
                      )}
                    />

                    <IonButton
                      expand="block"
                      type="submit"
                      color="primary"
                      className="button-container"
                      disabled={isLoading}
                    >
                      {isLoading ? <IonSpinner name="circles" /> : "Login"}
                    </IonButton>
                  </form>

                  <div className="ion-text-center">
                    <IonText color="medium">or login with</IonText>
                  </div>

                  <IonButton
                    expand="block"
                    onClick={handleGoogleSignIn}
                    color="secondary"
                    className="google-button"
                    disabled={isLoading}
                  >
                    <IonIcon slot="start" icon={logoGoogle} />
                    Login with Google
                  </IonButton>
                </IonCardContent>
              </IonCard>

              <div className="login-link">
                <p>Don't have an account?</p>
                <IonButton
                  fill="clear"
                  size="small"
                  color="primary"
                  onClick={() => (window.location.href = "/signup")}
                >
                  Sign Up
                </IonButton>
              </div>
            </IonCol>

            <IonCol size="20" sizeMd="6" className="image-column">
              <IonImg
                src="https://images.unsplash.com/photo-1472653525502-fc569e405a74?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt="LoginImage"
                className="login-image"
              />
            </IonCol>
          </IonRow>
        </IonGrid>

        <IonToast
          isOpen={showToast}
          onDidDismiss={() => setShowToast(false)}
          message={toastMessage}
          duration={1500}
          color="success"
          position="top"
        />
      </IonContent>
    </IonPage>
  );
};

export default Login;
