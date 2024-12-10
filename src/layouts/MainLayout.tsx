import { IonContent, IonPage, IonToolbar } from "@ionic/react";
import { Navbar } from "../components/Navbar/Navbar";
import { Sidebar } from "../components/Sidebar/Sidebar";
import Footer from "../components/Footer/Footer";

interface MainLayoutProps {
  children: React.ReactNode;
}

export const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  return (
    <>
      <IonPage>
        <IonToolbar className="shadow-lg">
          <Navbar />
        </IonToolbar>
        <IonContent id="main-content" fullscreen>
          {children}
        </IonContent>
      </IonPage>
    </>
  );
};
