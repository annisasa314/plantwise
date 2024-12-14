import { IonContent, IonGrid } from "@ionic/react";
import "./Home.css";
import Footer from "../../components/Footer/Footer";
import HeroSection from "../../components/Hero/Hero";
import { MainLayout } from "../../layouts/MainLayout";
import About from "../../components/About/About";
import VisionMission from "../../components/Misi/Misi";
import TutorialGrid from "../../components/Fitur/Fitur";

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

              <section
                style={{
                  marginTop: "80px",
                  marginBottom: "10px",
                }}
              >
                <TutorialGrid />
              </section>
            </section>
          </IonGrid>
          <Footer />
        </section>
      </IonContent>
    </MainLayout>
  );
};

export default Home;
