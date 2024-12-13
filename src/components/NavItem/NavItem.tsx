import React, { useState, useEffect } from "react";
import {
  IonButton,
  IonButtons,
  IonIcon,
  IonToolbar,
  useIonRouter,
} from "@ionic/react";
import { logOutOutline } from "ionicons/icons";
import Cookies from "js-cookie";
import { auth } from "../../../firebase";
import { ERole, TUser } from "../../type/user.type";
import { logout } from "../../services/auth";

export const Navitems: React.FC = () => {
  const router = useIonRouter();
  const [user, setUser] = useState<TUser | null>(null);
  const [activeMenu, setActiveMenu] = useState("Beranda");

  // Menu items configuration
  const menuItems = [
    { label: "Beranda", href: "/" },
    { label: "Panduan", href: "/panduan" },
    { label: "Jadwal", href: "/jadwal" },
    { label: "Kalkulator", href: "/kalkulator" },
    { label: "Forum", href: "/forum" },
  ];

  // Authentication state listener
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
      if (currentUser) {
        const userModel: TUser = {
          ...currentUser,
          id: currentUser.uid,
          name: currentUser.displayName ?? "",
          email: currentUser.email ?? "",
          role: ERole.USER,
          createdAt:
            currentUser.metadata.creationTime ?? new Date().toISOString(),
          updatedAt:
            currentUser.metadata.lastSignInTime ?? new Date().toISOString(),
        };

        setUser(userModel);
      } else {
        setUser(null);
      }
    });

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, []);

  // Logout handler
  const handleLogout = async () => {
    try {
      // Remove all cookies
      Object.keys(Cookies.get()).forEach((cookieName) => {
        Cookies.remove(cookieName, {
          path: "/",
          domain: window.location.hostname,
        });
      });

      // Logout from Firebase
      await logout();

      // Clear local storage
      localStorage.clear();

      // Navigate to home page
      router.push("/", "root");

      // Optional: Force page reload to clear any cached state
      window.location.reload();
    } catch (error) {
      console.error("Logout failed", error);
    }
  };

  // Navigation handler
  const handleNavigation = (href: string, label: string) => {
    setActiveMenu(label);
    router.push(href, "forward", "push");
  };

  return (
    <IonToolbar className="navbar px-16">
      {/* Logo Section */}
      <IonButtons slot="start" className="navbar__logo p-1">
        <img
          src="/logo.png"
          alt="Plantwise Logo"
          className="logo-img w-24 h-auto"
        />
      </IonButtons>

      {/* Navigation Menu */}
      <IonButtons slot="end" className="navbarmenu">
        {menuItems.map((item, index) => (
          <IonButton
            key={index}
            fill="clear"
            className={`navbarmenu-item ${
              activeMenu === item.label ? "active" : ""
            }`}
            onClick={() => handleNavigation(item.href, item.label)}
          >
            {item.label}
          </IonButton>
        ))}
      </IonButtons>
      <IonButtons slot="end" className="navbar__actions">
        {!user ? (
          <>
            <IonButton
              routerLink="/login"
              className="navbar__button mr-2"
              color="light"
              fill="solid"
              shape="round"
            >
              Masuk
            </IonButton>
            <IonButton
              routerLink="/signup"
              className="navbar__button"
              color="primary"
              fill="solid"
              shape="round"
            >
              Daftar
            </IonButton>
          </>
        ) : (
          <IonButton fill="clear" onClick={handleLogout}>
            Logout
            <IonIcon
              slot="end"
              icon={logOutOutline}
              className="w-6 h-6 text-green-900 ml-2"
            />
          </IonButton>
        )}
      </IonButtons>
    </IonToolbar>
  );
};
