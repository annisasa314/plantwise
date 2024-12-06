import React from "react";
import { IonGrid, IonRow, IonCol } from "@ionic/react";
import TutorialCard from "./CardFitur";

const TutorialGrid: React.FC = () => {
  const tutorialData = [
    {
      title: "Tutorial",
      content:
        "Sed malesuada vestibulum malesuada. Aenean utricies mi eu urna finibus, suscipit condimentum lectus finibus.",
      navigateTo: "/tutorial",
    },
    {
      title: "Kalender",
      content:
        "Fusce faucibus nulla id faucibus sodales. Et euismod nibh et purus egestas, eu efficitur lectus varius.",
      navigateTo: "/calendar",
    },
    {
      title: "Kalkulator",
      content:
        "Praesent in erat consectetur, auctor eros sed, tincidunt augue Nullam sollicitudin. Nisi eget elit laoreet malesuada.",
      navigateTo: "/calculator",
    },
    {
      title: "Forum",
      content:
        "Vestibulum pretium scelerisque condominium. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.",
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
