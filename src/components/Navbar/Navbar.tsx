import React, { useState } from "react";
import {
  IonHeader,
  IonToolbar,
  IonButtons,
  IonButton,
  IonIcon,
  IonTitle,
} from "@ionic/react";
import { useMediaQuery } from "../../hooks/useMediaQuery";
import { Navitems } from "../NavItem/NavItem";
import { Sidebar } from "../Sidebar/Sidebar";
import { menu } from "ionicons/icons"; // Import hamburger icon
import { useIonRouter } from "@ionic/react";

export const Navbar: React.FC = () => {
  const isDesktop = useMediaQuery("(min-width: 1024px)");
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleMenuToggle = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const contentId = "main-content"; // contentId untuk mengaitkan sidebar dengan konten utama

  return (
    <IonHeader>
      <IonToolbar className="bg-white shadow-md">
        {/* Sidebar toggle button untuk mobile dan tablet */}
        {!isDesktop && (
          <IonButtons slot="start">
            <IonButton onClick={handleMenuToggle}>
              <IonIcon icon={menu} />
            </IonButton>
          </IonButtons>
        )}

        {/* Sidebar akan dibuka ketika menekan hamburger icon */}
        <Sidebar contentId={contentId} />

        {/* Menu untuk desktop */}
        {isDesktop && <Navitems />}
      </IonToolbar>
    </IonHeader>
  );
};

export default Navbar;
