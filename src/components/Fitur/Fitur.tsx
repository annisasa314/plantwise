import React from "react";
import { IonGrid, IonRow, IonCol } from "@ionic/react";
import TutorialCard from "./CardFitur";
import { book, calendar, calculator, chatbubbleEllipses } from "ionicons/icons"; // Ikon dari Ionic

const Fitur: React.FC = () => {
  const tutorialData = [
    {
      title: "Panduan",
      content:
        "Fitur ini menyediakan panduan langkah demi langkah tentang cara bertanam, mulai dari pemilihan benih hingga cara perawatan tanaman yang tepat. Cocok untuk pemula maupun yang sudah berpengalaman.",
      navigateTo: "/panduan",
      icon: book,
    },
    {
      title: "Jadwal",
      content:
        "Fitur ini membantu pengguna menentukan waktu terbaik untuk menanam berbagai jenis tanaman berdasarkan data cuaca, musim, dan jenis tanaman. Jadwal ini dirancang untuk meningkatkan peluang panen yang sukses.",
      navigateTo: "/jadwal",
      icon: calendar,
    },
    {
      title: "Kalkulator",
      content:
        "Fitur ini memungkinkan pengguna menghitung jarak tanam ideal berdasarkan parameter seperti jenis tanaman, panjang, dan lebar lahan.",
      navigateTo: "/kalkulator",
      icon: calculator,
    },
    {
      title: "Forum",
      content:
        "Fitur interaktif di mana pengguna dapat mengajukan pertanyaan seputar pertanian atau bertanam. Pertanyaan dapat dijawab oleh sesama pengguna maupun bot AI.",
      navigateTo: "/forum",
      icon: chatbubbleEllipses,
    },
  ];

  return (
    <IonGrid className="pb-24 pt-4 pl-24 pr-24">
      <h1 className="text-3xl font-semibold text-center p-2 text-[#2f4b26] mb-6">
        Fitur
      </h1>
      <p className=" font-normal text-center p-2 text-[#2f4b26] mb-6">
        Jelajahi Berbagai Fitur Kami dan Temukan Cara Baru untuk Membantu Ladang
        Anda
      </p>
      <IonRow>
        {tutorialData.map((item, index) => (
          <IonCol size="6" key={index} className="flex justify-center p-8">
            <TutorialCard
              title={item.title}
              content={item.content}
              navigateTo={item.navigateTo}
              icon={item.icon} // Tambahkan ikon
            />
          </IonCol>
        ))}
      </IonRow>
    </IonGrid>
  );
};

export default Fitur;
