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
import { useMutation } from "@tanstack/react-query";
import Cookies from "js-cookie";
import { Redirect } from "react-router";
import { loginWithEmailAndPassword } from "../../../services/auth.service"; // Import login function
import { TUser } from "../../../types/user.type";
import { TLoginForm } from "../../../types/form.type";
import { eye, eyeOff } from "ionicons/icons";
import { useAdminLogin } from "../../../hooks/useAdminLogin"; // Custom hook for admin login

export const AdminLogin: React.FC = () => {
  const { control, handleSubmit } = useForm<TLoginForm>();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showToast, setShowToast] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<string>("");

  const { mutateAsync } = useAdminLogin(); // Custom hook to handle login

  const userCookies = Cookies.get("user");
  const user = userCookies ? (JSON.parse(userCookies) as TUser) : undefined;

  const handleAdminLogin = async (data: TLoginForm) => {
    try {
      await mutateAsync(data);
    } catch (error: any) {
      setToastMessage("Login failed. Please try again.");
      setShowToast(true);
    }
  };

  //   if (user) {
  //     return <Redirect to="/admin/dashboard" />; // Redirect if user is logged in
  //   }

  return (
    <IonPage>
      <IonContent className="ion-padding admin-login-content">
        <div className="p-24">
          {" "}
          <div className="header-container">
            <h2 className="ion-no-margin title">Admin Login</h2>
            <p className="subtitle p-4">Login to Admin Panel</p>
          </div>
          <IonCard className="login-card shadow-5xl">
            <IonCardContent>
              <form onSubmit={handleSubmit(handleAdminLogin)}>
                <Controller
                  control={control}
                  name="email"
                  rules={{
                    required: "Please enter email address",
                    pattern: {
                      value: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/i,
                      message: "Please enter a valid email address",
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
            </IonCardContent>
          </IonCard>
        </div>

        <IonToast
          isOpen={showToast}
          onDidDismiss={() => setShowToast(false)}
          message={toastMessage}
          duration={1500}
          color="danger"
          position="top"
        />
      </IonContent>
    </IonPage>
  );
};

export default AdminLogin;
