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
              Visi Plantwise adalah menjadi platform edukasi terdepan yang
              memberdayakan penanam pemula di Indonesia untuk mengoptimalkan
              potensi pekarangan rumah, meningkatkan ketahanan pangan lokal, dan
              mendukung praktik bercocok tanam yang berkelanjutan dan ramah
              lingkungan
            </p>
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
              Plantwise bertujuan untuk memberdayakan masyarakat dalam bercocok
              tanam secara mandiri di pekarangan rumah, dengan fokus pada
              ketahanan pangan dan keberlanjutan lingkungan. Berikut adalah misi
              kami:
              <ul>
                <li>
                  Menyediakan edukasi praktis dan akses informasi bagi penanam
                  pemula untuk mengembangkan keterampilan bercocok tanam di
                  pekarangan rumah.
                </li>
                <li>
                  Mendukung praktik pertanian berkelanjutan yang ramah
                  lingkungan dan dapat diakses oleh masyarakat luas.
                </li>
                <li>
                  Membangun komunitas yang saling berbagi pengetahuan dan
                  pengalaman dalam bercocok tanam untuk kesejahteraan bersama.
                </li>
              </ul>
            </p>
          </IonText>
        </IonCol>
      </IonRow>
    </section>
  );
};

export default VisionMission;
