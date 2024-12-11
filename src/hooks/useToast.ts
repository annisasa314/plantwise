import { useIonToast } from "@ionic/react";

import { closeCircle, checkmarkCircle } from "ionicons/icons";

export const useToast = () => {
  const [present] = useIonToast();

  return {
    successToast: (message: string) =>
      present({
        message,
        color: "success",
        position: "top",
        duration: 2000,
        icon: checkmarkCircle,
      }),
    errorToast: (message: string) =>
      present({
        message,
        color: "danger",
        position: "top",
        duration: 2000,
        icon: closeCircle,
      }),
    loadingToast: (message: string) =>
      present({
        message,
        color: "primary",
        position: "top",
        duration: 2000,
        animated: true,
      }),
  };
};
