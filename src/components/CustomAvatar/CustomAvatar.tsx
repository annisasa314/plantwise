import { IonAvatar } from "@ionic/react";

interface CustomAvatarProps {
  src?: string;
  name?: string;
  size?: string;
  bordered?: boolean;
}

export const CustomAvatar: React.FC<CustomAvatarProps> = ({
  src,
  size = "32px",
  name,
  bordered,
}) => {
  return (
    <IonAvatar
      style={{
        width: size,
        height: size,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "grey",
        color: "white",
        border: bordered ? "1px solid white" : "none",
      }}
    >
      {src ? <img src={src} /> : !!name && name[0]}
    </IonAvatar>
  );
};
