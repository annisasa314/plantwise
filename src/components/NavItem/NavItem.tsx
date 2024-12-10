import {
  IonButton,
  IonButtons,
  IonIcon,
  IonItem,
  IonText,
  IonToolbar,
  useIonRouter,
} from "@ionic/react";
import { useState } from "react";
import Cookies from "js-cookie";
import { CustomAvatar } from "../CustomAvatar/CustomAvatar";
import { TUser } from "../../types/user.type";

export const Navitems: React.FC = () => {
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

  return (
    <IonToolbar className="navbar pl-16 pr-16">
      <IonButtons slot="start" className="navbar__logo p-1">
        <img src="/logo.png" alt="Plantwise Logo" className="logo-img" />
      </IonButtons>

      <IonButtons slot="end" className="navbar__menu">
        {menuItems.map((item, index) => (
          <IonButton
            key={index}
            fill="clear"
            className={`navbar__menu-item ${
              activeMenu === item.label ? "active" : ""
            }`}
            onClick={() => {
              setActiveMenu(item.label);
              router.push(item.href, "forward", "push");
            }}
          >
            {item.label}
          </IonButton>
        ))}
      </IonButtons>

      <IonButtons slot="end" className="navbar__actions">
        {!user ? (
          <>
            <IonButton
              href="/login"
              className="navbar__button"
              color="light"
              fill="solid"
              shape="round"
            >
              Masuk
            </IonButton>
            <IonButton
              href="/signup"
              className="navbar__button"
              color="primary"
              fill="solid"
              shape="round"
            >
              Daftar
            </IonButton>
          </>
        ) : (
          <IonItem slot="end" lines="none" className="navbar__user">
            {/* <IonText className="navbar__greeting">Hi, {user.name}!</IonText> */}
            <IonButton
              className="navbar__avatar"
              shape="round"
              fill="clear"
              routerLink="/profile"
            >
              <CustomAvatar src={user.photoURL ?? ""} name={user.name} />
            </IonButton>
          </IonItem>
        )}
      </IonButtons>
    </IonToolbar>
  );
};
