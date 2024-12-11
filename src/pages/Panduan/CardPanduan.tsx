import React, { useState, useEffect } from "react";
import {
  IonContent,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonGrid,
  IonRow,
  IonCol,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
  IonImg,
} from "@ionic/react";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../../../firebase";
import { useHistory } from "react-router-dom"; // Untuk navigasi ke detail tutorial

type TutorialCard = {
  id: string;
  title: string;
  image: string;
  category: string;
};

const ListCard: React.FC = () => {
  const [tutorialCards, setTutorialCards] = useState<TutorialCard[]>([]);
  const history = useHistory(); // Menggunakan history untuk navigasi

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "tutorials"), (snapshot) => {
      const data: TutorialCard[] = [];
      snapshot.forEach((doc) => {
        data.push({
          id: doc.id,
          title: doc.data().title,
          image: doc.data().image,
          category: doc.data().category,
        });
      });
      setTutorialCards(data);
    });

    return unsubscribe;
  }, []);

  // Fungsi untuk mengarahkan ke halaman tutorial
  const navigateToTutorial = (id: string) => {
    history.push(`/panduan/${id}`); // Memperbaiki dengan menggunakan backticks
  };

  return (
    <>
      <IonHeader>
        <IonToolbar>
          <IonTitle className="text-center text-2xl font-bold text-[#2f4b26]">
            Daftar Tutorial
          </IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonGrid className="p-4">
          <IonRow>
            {tutorialCards.map((tutorial) => (
              <IonCol key={tutorial.id} size="12" sizeMd="6" className="mb-4">
                <IonCard
                  button
                  onClick={() => navigateToTutorial(tutorial.id)}
                  className="shadow-md border border-gray-300 transform transition-all duration-300 hover:scale-105"
                >
                  <IonCardHeader>
                    <IonCardTitle className="font-bold text-lg text-[#2f4b26]">
                      {tutorial.title}
                    </IonCardTitle>
                  </IonCardHeader>
                  <IonCardContent>
                    <IonImg
                      src={tutorial.image}
                      alt={tutorial.title}
                      className="w-full h-56 object-cover mb-4 rounded-md"
                    />
                    <p className="text-sm text-gray-600">{tutorial.category}</p>
                  </IonCardContent>
                </IonCard>
              </IonCol>
            ))}
          </IonRow>
        </IonGrid>
      </IonContent>
    </>
  );
};

export default ListCard;