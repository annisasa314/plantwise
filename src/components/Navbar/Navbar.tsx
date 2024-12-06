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
          </IonButtons>
        </IonToolbar>
      ) : (
        <Navitems />
      )}
    </IonHeader>
  );
};

export default Navbar;
