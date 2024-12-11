import React from "react";
import {
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
  IonButton,
  IonIcon,
  useIonRouter,
} from "@ionic/react";
import { chevronForward } from "ionicons/icons"; // Import ikon dari Ionic

interface TutorialCardProps {
  title: string;
  content: string;
  navigateTo: string;
  icon: string; // Tambahkan prop untuk ikon
}

const TutorialCard: React.FC<TutorialCardProps> = ({
  title,
  content,
  navigateTo,
  icon,
}) => {
  const { push } = useIonRouter();

  const handleNavigation = () => {
    push(navigateTo);
  };

  return (
    <IonCard
      onClick={handleNavigation}
      className="cursor-pointer hover:translate-y-2 duration-200 bg-white border rounded-lg p-4 max-w-l max-h-80" // Tambahkan max-w-xs dan h-72
    >
      <IonCardHeader className="flex items-center gap-4">
        <IonIcon icon={icon} className="text-4xl text-green-700" />
        <IonCardTitle className="text-xl font-semibold text-green-900">
          {title}
        </IonCardTitle>
      </IonCardHeader>
      <IonCardContent className="text-gray-600 text-justify">
        <p className="leading-relaxed p-2 mb-4">{content}</p>
        <IonButton
          size="small"
          className="flex items-center p-2 gap-2 hover:translate-y-1 duration-200"
        >
          Lihat detail
        </IonButton>
      </IonCardContent>
    </IonCard>
  );
};

export default TutorialCard;
