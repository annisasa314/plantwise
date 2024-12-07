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
      <IonToolbar className="navbar-toolbar">
        {/* Menu untuk mobile dan tablet */}
        {!isDesktop && (
          <IonButtons slot="end">
            <IonButton fill="clear" routerLink="/home">
              Beranda
            </IonButton>
            <IonButton fill="clear" routerLink="/panduan">
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
            <IonButton
              fill="clear"
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
        )}

        {isDesktop && <Navitems />}
      </IonToolbar>
    </IonHeader>
  );
};

export default Navbar;
