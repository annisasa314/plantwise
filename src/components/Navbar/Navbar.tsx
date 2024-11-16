import React from "react";
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonButtons,
  IonButton,
  IonMenuButton,
  IonContent,
  IonImg,
} from "@ionic/react";
import "./Navbar.css";

const Navbar: React.FC = () => {
  return (
    <IonHeader>
      <IonToolbar className="navbar-toolbar">
        <IonButtons slot="start">
          <IonTitle className="navbar-title">plantwise</IonTitle>
        </IonButtons>

        <div className="navbar-links" slot="end">
          <IonButton fill="clear" routerLink="/home">
            Beranda
          </IonButton>
          <IonButton fill="clear" routerLink="/catalog">
            Panduan
          </IonButton>
          <IonButton fill="clear" routerLink="/schedule">
            Jadwal
          </IonButton>
          <IonButton fill="clear" routerLink="/calculator">
            Kalkulator
          </IonButton>
          <IonButton fill="clear" routerLink="/forum">
            Forum
          </IonButton>
          <IonButtons>
            <IonButton
              fill="clear"
              color="dark"
              routerLink="/login"
              className="login-button"
            >
              Masuk
            </IonButton>
            <IonButton
              color="light"
              routerLink="/signup"
              className="signup-button"
            >
              Daftar
            </IonButton>
          </IonButtons>
        </div>
      </IonToolbar>
    </IonHeader>
  );
};

export default Navbar;
