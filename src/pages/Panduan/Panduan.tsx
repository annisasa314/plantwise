import React, { useState, useEffect } from "react";
import {
  IonContent,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonList,
  IonItem,
  IonLabel,
  IonGrid,
  IonRow,
  IonCol,
  IonText,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
} from "@ionic/react";
import { collection, onSnapshot, DocumentData } from "firebase/firestore";
import { db } from "../../../firebase";

type Section = {
  heading: string;
  content: string | string[];
};

type Tutorial = {
  id: string;
  title: string;
  image: string;
  category: string;
  sections: Section[];
};

const TutorialsList: React.FC = () => {
  const [tutorials, setTutorials] = useState<Tutorial[]>([]);

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "tutorials"), (snapshot) => {
      const data: Tutorial[] = [];
      snapshot.forEach((doc) => {
        data.push({ id: doc.id, ...doc.data() } as Tutorial);
      });
      setTutorials(data);
    });

    return unsubscribe;
  }, []);

  return (
    <>
      <IonContent>
        <IonList className="p-4">
          {tutorials.map((tutorial) => (
            <IonCard
              key={tutorial.id}
              className="mb-6 shadow-md border border-gray-300"
            >
              <IonCardHeader>
                <IonCardTitle className="font-bold text-lg text-[#2f4b26]">
                  {tutorial.title}
                </IonCardTitle>
              </IonCardHeader>
              <IonCardContent>
                <img
                  src={tutorial.image}
                  alt={tutorial.title}
                  className="w-full h-56 object-cover mb-4 rounded-md"
                />
                {tutorial.sections.map((section, index) => (
                  <div key={index} className="mb-4">
                    <h3 className="text-xl font-semibold text-[#2f4b26]">
                      {section.heading}
                    </h3>
                    {Array.isArray(section.content) ? (
                      <IonGrid className="mt-2">
                        {section.content.map((line, lineIndex) => (
                          <IonRow key={lineIndex}>
                            <IonCol>
                              <IonText>{line}</IonText>
                            </IonCol>
                          </IonRow>
                        ))}
                      </IonGrid>
                    ) : (
                      <p className="text-base text-gray-700 mt-2">
                        {section.content}
                      </p>
                    )}
                  </div>
                ))}
              </IonCardContent>
            </IonCard>
          ))}
        </IonList>
      </IonContent>
    </>
  );
};

export default TutorialsList;
