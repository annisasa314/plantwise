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
} from "@ionic/react";
import { logoGoogle, mailOutline, lockClosedOutline } from "ionicons/icons";
import { useHistory } from "react-router-dom";
import { loginWithEmailAndPassword, loginWithGoogle } from "../../services/auth.service";
import "./Login.css";

const Login: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [showToast, setShowToast] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<string>("");
  const history = useHistory();

  const handleLogin = async () => {
    try {
      await loginWithEmailAndPassword(email, password);
      setToastMessage("Sign in successful!");
      setShowToast(true);
      setTimeout(() => {
        history.push("/home");
      }, 1500);
    } catch (err: any) {
      setToastMessage("Error: " + err.message);
      setShowToast(true);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      await loginWithGoogle();
      setToastMessage("Signed in with Google successfully!");
      setShowToast(true);
      history.push("/home");
    } catch (err: any) {
      setToastMessage("Error: " + err.message);
      setShowToast(true);
    }
  };

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
                  <IonItem lines="none" className="input-container">
                    <IonIcon icon={mailOutline} slot="start" />
                    <IonInput
                      type="email"
                      placeholder="Enter your email"
                      value={email}
                      onIonChange={(e) => setEmail(e.detail.value!)}
                    />
                  </IonItem>

                  <IonItem lines="none" className="input-container">
                    <IonIcon icon={lockClosedOutline} slot="start" />
                    <IonInput
                      type="password"
                      placeholder="Enter your password"
                      value={password}
                      onIonChange={(e) => setPassword(e.detail.value!)}
                    />
                  </IonItem>

                  <IonButton
                    expand="block"
                    onClick={handleLogin}
                    color="primary"
                    className="button-container"
                  >
                    Login
                  </IonButton>

                  <div className="ion-text-center">
                    <IonText color="medium">or login with</IonText>
                  </div>

                  <IonButton
                    expand="block"
                    onClick={handleGoogleSignIn}
                    color="secondary"
                    className="google-button"
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
                  onClick={() => history.push("/signup")}
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
