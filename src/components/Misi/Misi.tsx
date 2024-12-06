import React from "react";
import { IonRow, IonCol, IonText } from "@ionic/react";
import { FaBullhorn } from "react-icons/fa"; // Menggunakan ikon bullhorn sebagai contoh

const VisionMission: React.FC = () => {
  return (
    <section className="p-6 mt-8">
      <IonRow className="text-white p-6">
        <IonCol size="6" className="flex flex-col justify-start pr-16">
          <div className="flex items-center mb-4">
            <FaBullhorn className="text-2xl mr-2 text-[#2f4b26]" />
            <IonText className="font-semibold text-xl text-[#2f4b26]">
              Visi Kami
            </IonText>
          </div>
          <IonText className="text-base text-[#2f4b26] leading-relaxed">
            <p>
              Pellentesque aliquam eget odio non efficitur. Morbi porta, mi eget
              vulputate efficitur, enim dui eleifend ex, in malesuada mauris
              elit et turpis. Ut a velit augue. Praesent ut nunc id nisi
              scelerisque pretium vel dapibus ligula. Aliquam eget accumsan sem,
              vel viverra magna. Duis ornare enim at sagittis efficitur. Ut
              semper ut nisi hendrerit porttitor. Integer at maximus enim.
            </p>
            <p>
              Aliquam orci neque, facilisis non faucibus ut, commodo vitae
              nulla. Etiam accumsan, odio ut euismod porta, lacus mi semper
              velit, non scelerisque magna elit non nibh.
            </p>
            <br />
          </IonText>
        </IonCol>

        <IonCol size="6" className="pr-16">
          <div className="flex items-center mb-4">
            <FaBullhorn className="text-2xl mr-2 text-[#2f4b26]" />
            <IonText className="font-semibold text-xl text-[#2f4b26]">
              Misi Kami
            </IonText>
          </div>
          <IonText className="text-base text-[#2f4b26] leading-relaxed">
            <p>
              Pellentesque aliquam eget odio non efficitur. Morbi porta, mi eget
              vulputate efficitur, enim dui eleifend ex, in malesuada mauris
              elit et turpis. Ut a velit augue. Praesent ut nunc id nisi
              scelerisque pretium vel dapibus ligula. Aliquam eget accumsan sem,
              vel viverra magna. Duis ornare enim at sagittis efficitur. Ut
              semper ut nisi hendrerit porttitor. Integer at maximus enim.
              <ul>
                <li>
                  Nullam suscipit justo sit amet augue placerat imperdiet.
                </li>
                <li>Mauris a risus vel lectus viverra ornare eget quis ex.</li>
                <li>Nullam eleifend tellus in ultricies ultrices.</li>
                <li>Vivamus eget urna non est convallis laoreet.</li>
              </ul>
            </p>
          </IonText>
        </IonCol>
      </IonRow>
    </section>
  );
};

export default VisionMission;
