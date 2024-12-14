import React from "react";
import {
  IonHeader,
  IonToolbar,
  IonButtons,
  IonButton,
  IonIcon,
} from "@ionic/react";
import { menu } from "ionicons/icons";
import { Navitems } from "../NavItem/NavItem";

interface NavbarProps {
  onMenuToggle: () => void;
  isDesktop: boolean;
}

export const Navbar: React.FC<NavbarProps> = ({ onMenuToggle, isDesktop }) => {
  return (
    <IonHeader>
      <IonToolbar className="bg-white shadow-md">
        {!isDesktop && (
          <IonButtons slot="start">
            <IonButton onClick={onMenuToggle}>
              <IonIcon icon={menu} />
            </IonButton>
          </IonButtons>
        )}

        {isDesktop ? <Navitems /> : null}
      </IonToolbar>
    </IonHeader>
  );
};

export default Navbar;
