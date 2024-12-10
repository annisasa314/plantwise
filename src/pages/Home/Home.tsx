import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonFooter,
  IonText,
  IonImg,
  IonGrid,
  IonRow,
  IonCol,
  IonButton,
  IonCardTitle,
  IonCard,
  IonCardHeader,
  IonCardContent,
} from "@ionic/react";
import Navbar from "../../components/Navbar/Navbar";
import "./Home.css";
import Footer from "../../components/Footer/Footer";
import HeroSection from "../../components/Hero/Hero";
import { MainLayout } from "../../layouts/MainLayout";
import About from "../../components/About/About";
import VisionMission from "../../components/Misi/Misi";
import CardFitur from "../../components/Fitur/CardFitur";
import TutorialCard from "../../components/Fitur/CardFitur";
import TutorialGrid from "../../components/Fitur/Fitur";
import { ChatbotProvider } from "../../components/Bot/ChatbotProvider";
import Chatbot from "../../components/Bot/Chatbot";
import ChatbotFloatingIcon from "../../components/Bot/ChatbotIcon";

const Home: React.FC = () => {
  return (
    <MainLayout>
      <IonContent>
        <section>
          <HeroSection />
          <IonGrid className="focus-content">
            <section>
              <About />

              <section style={{ marginTop: "40px" }}>
                <VisionMission />
              </section>

              <section style={{ marginTop: "80px", marginBottom: "10px" }}>
                <TutorialGrid />
              </section>
            </section>
          </IonGrid>
          {/* Chatbot components */}
          <ChatbotProvider>
            <Chatbot />
            <ChatbotFloatingIcon />
          </ChatbotProvider>
          <Footer />
        </section>
      </IonContent>
    </MainLayout>
  );
};

export default Home;
