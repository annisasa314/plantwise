import React, { useState } from "react";
import {
  IonButton,
  IonButtons,
  IonCol,
  IonContent,
  IonMenu,
  IonText,
  IonIcon,
} from "@ionic/react";
import Cookies from "js-cookie";
import { CustomAvatar } from "../CustomAvatar/CustomAvatar";
import { TUser } from "../../type/user.type";
import { useIonRouter } from "@ionic/react";
import { menu } from "ionicons/icons"; // Import hamburger icon

interface SidebarProps {
  contentId: string;
}

export const Sidebar: React.FC<SidebarProps> = ({ contentId }) => {
  const router = useIonRouter();
  const userCookies = Cookies.get("user");
  const user: TUser = userCookies ? JSON.parse(userCookies) : undefined;
  const [activeMenu, setActiveMenu] = useState("Beranda");

  const menuItems = [
    { label: "Beranda", href: "/" },
    { label: "Panduan", href: "/panduan" },
    { label: "Jadwal", href: "/jadwal" },
    { label: "Kalkulator", href: "/kalkulator" },
    { label: "Forum", href: "/forum" },
  ];

  const handleMenuItemClick = (label: string, href: string) => {
    setActiveMenu(label);
    router.push(href, "forward", "push");
  };

  return (
    <IonMenu contentId={contentId} side="end">
      <IonContent fullscreen className="ion-padding sidebar">
        <IonCol className="sidebar__container">
          <IonButtons className="w-full">
            <IonCol className="sidebar__btn-container">
              {menuItems.map((item, index) => (
                <IonButton
                  key={index}
                  onClick={() => handleMenuItemClick(item.label, item.href)}
                  color="dark"
                  fill="clear"
                  expand="full"
                  className={`justify-start ${
                    activeMenu === item.label ? "active" : ""
                  }`}
                >
                  <IonText className="text-left w-full">{item.label}</IonText>
                </IonButton>
              ))}
            </IonCol>
          </IonButtons>

          <section className="mt-auto pb-4">
            {!user ? (
              <>
                <IonButton
                  href="/login"
                  color="light"
                  expand="full"
                  fill="solid"
                  shape="round"
                  className="mb-2"
                >
                  Masuk
                </IonButton>
                <IonButton
                  href="/signup"
                  color="dark"
                  expand="full"
                  fill="solid"
                  shape="round"
                >
                  Daftar
                </IonButton>
              </>
            ) : (
              <>
                <IonButton
                  routerLink="/profile"
                  expand="full"
                  fill="clear"
                  className="flex items-center justify-start px-4"
                >
                  <CustomAvatar src={user.photoURL ?? ""} name={user.name} />
                </IonButton>
                <IonButton
                  href="/logout"
                  color="primary"
                  expand="full"
                  fill="solid"
                  shape="round"
                  className="mt-2"
                >
                  Keluar
                </IonButton>
              </>
            )}
          </section>
        </IonCol>
      </IonContent>
    </IonMenu>
  );
};
