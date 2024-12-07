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
import { useMediaQuery } from "../../hooks/useMediaQuery";
import { Navitems } from "../NavItem/NavItem";

export const Navbar: React.FC = () => {
  const isDesktop = useMediaQuery("(min-width: 1024px)");

  return (
    <IonHeader>

      {!isDesktop ? (
        <IonToolbar className="navbar-toolbar">
          <IonButtons slot="start">
            <img src="/logo.png" alt="Plantwise Logo" className="logo-img" />

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
          <IonButton fill="clear" routerLink="/jadwal">
            Jadwal
          </IonButton>
          <IonButton fill="clear" routerLink="/Kalkulator">
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
        </IonToolbar>
      ) : (
        <Navitems />
      )}
    </IonHeader>
  );
};

export default Navbar;
