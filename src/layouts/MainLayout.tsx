import React, { useRef } from "react";
import { IonPage, IonContent } from "@ionic/react";
import { Navbar } from "../components/Navbar/Navbar";
import { Sidebar } from "../components/Sidebar/Sidebar";
import { useMediaQuery } from "../hooks/useMediaQuery";

interface MainLayoutProps {
  children: React.ReactNode;
}

export const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  const isDesktop = useMediaQuery("(min-width: 1024px)");
  const sidebarRef = useRef<HTMLIonMenuElement>(null);

  const handleMenuToggle = () => {
    if (sidebarRef.current) {
      sidebarRef.current.toggle();
    }
  };

  return (
    <IonPage>
      {!isDesktop && <Sidebar ref={sidebarRef} isDesktop={false} />}

      <Navbar onMenuToggle={handleMenuToggle} isDesktop={isDesktop} />

      <IonContent id="main-content">{children}</IonContent>
    </IonPage>
  );
};
