import React from "react";
import { IonGrid, IonRow, IonCol } from "@ionic/react";
import TutorialCard from "./CardFitur";

const TutorialGrid: React.FC = () => {
  const tutorialData = [
    {
      title: "Panduan",
      content:
        "Fitur ini menyediakan panduan langkah demi langkah tentang cara bertanam, mulai dari pemilihan benih hingga cara perawatan tanaman yang tepat. Cocok untuk pemula maupun yang sudah berpengalaman.",
      navigateTo: "/panduan",
    },
    {
      title: "Kalender",
      content:
        "Fitur ini membantu pengguna menentukan waktu terbaik untuk menanam berbagai jenis tanaman berdasarkan data cuaca, musim, dan jenis tanaman. Jadwal ini dirancang untuk meningkatkan peluang panen yang sukses.",
      navigateTo: "/calendar",
    },
    {
      title: "Kalkulator",
      content:
        "Fitur ini memungkinkan pengguna menghitung jarak tanam ideal berdasarkan parameter seperti jenis tanaman, panjang, dan lebar lahan. Kalkulator ini juga dapat menghasilkan visualisasi gambar tata letak tanaman untuk mempermudah perencanaan.",
      navigateTo: "/calculator",
    },
    {
      title: "Forum",
      content:
        "Fitur interaktif di mana pengguna dapat mengajukan pertanyaan seputar pertanian atau bertanam. Pertanyaan-pertanyaan ini dapat dijawab oleh sesama pengguna maupun bot AI, menciptakan komunitas berbagi pengetahuan yang aktif.",
      navigateTo: "/forum",
    },
  ];

  return (
    <IonGrid>
      <IonRow>
        {tutorialData.map((item, index) => (
          <IonCol size="6" key={index}>
            <TutorialCard
              title={item.title}
              content={item.content}
              navigateTo={item.navigateTo}
            />
          </IonCol>
        ))}
      </IonRow>
    </IonGrid>
  );
};

export default TutorialGrid;
