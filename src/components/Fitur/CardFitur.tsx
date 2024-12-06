import React from "react";
import {
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
  IonButton,
  useIonRouter,
} from "@ionic/react";

interface TutorialCardProps {
  title: string;
  content: string;
  navigateTo: string;
}

const TutorialCard: React.FC<TutorialCardProps> = ({
  title,
  content,
  navigateTo,
}) => {
  const { push } = useIonRouter();

  const handleNavigation = () => {
    push(navigateTo);
  };

  return (
    <IonCard
      onClick={handleNavigation}
      className="cursor-pointer hover:translate-y-2 duration-200"
    >
      <IonCardHeader>
        <IonCardTitle>{title}</IonCardTitle>
      </IonCardHeader>
      <IonCardContent>
        <p>{content}</p>
        <IonButton size="small" className="mt-2">
          Lihat detail
        </IonButton>
      </IonCardContent>
    </IonCard>
  );
};

export default TutorialCard;
