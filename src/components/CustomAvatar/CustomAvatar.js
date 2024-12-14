import { jsx as _jsx } from "react/jsx-runtime";
import { IonAvatar } from "@ionic/react";
export const CustomAvatar = ({ src, size = "32px", name, bordered, }) => {
    return (_jsx(IonAvatar, { style: {
            width: size,
            height: size,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "grey",
            color: "white",
            border: bordered ? "1px solid white" : "none",
        }, children: src ? _jsx("img", { src: src }) : !!name && name[0] }));
};
