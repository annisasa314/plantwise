import React from "react";
import { IonFooter, IonGrid, IonRow, IonCol, IonText } from "@ionic/react";

const About: React.FC = () => {
  return (
    <section className="p-5 mt-2">
      <IonRow className="program-objectives text-white p-10">
        <IonCol size="6" className="p-0 h-full flex">
          <img
            alt="Petani bekerja di ladang hijau"
            src="/about.jpg"
            className="w-full h-full object-cover rounded-lg"
          />
        </IonCol>
        <IonCol size="6" className="pt-0 pl-7 flex flex-col justify-center">
          <IonText className="font-semibold text-lg mb-4 tracking-wide text-black">
            SIAPA KAMI?
          </IonText>
          <IonText className="font-light text-2xl mb-1 tracking-wide text-[#2f4b26]">
            plantwise
          </IonText>
          <div className="mb-4 text-[#2f4b26] mr-10 text-base tracking-wide">
            <IonText>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras
                tellus sapien, pulvinar a velit blandit, eleifend egestas justo.
                Maecenas pretium nunc id orci volutpat, consectetur cursus nibh
                mattis.
              </p>
              <br />
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc
                molestie felis a velit pharetra, in vestibulum ante dapibus.
                Aliquam vitae faucibus turpis. Suspendisse pharetra pharetra
                erat, sit amet aliquam lacus feugiat a. Etiam sed urna quis
                dolor faucibus bibendum. Mauris finibus nunc sit amet lacus
                tincidunt, nec aliquam orci suscipit. Nulla facilisi. Sed
                gravida pretium pharetra. Sed a quam a eros fringilla luctus ac
                in odio. Nulla sed purus mi. Mauris id diam cursus, tristique
                sapien iaculis, faucibus nisi. Ut accumsan vitae diam nec
                gravida. Maecenas malesuada, dui sit amet venenatis dictum,
                augue est semper odio, nec commodo ipsum nulla non mi.
              </p>
            </IonText>
          </div>
        </IonCol>
      </IonRow>
    </section>
  );
};

export default About;
