import React from "react";
import { IonFooter, IonGrid, IonRow, IonCol, IonText } from "@ionic/react";

const About: React.FC = () => {
  return (
    <section className="pb-5 pt-16 mt-2 flex">
      <IonRow className="program-objectives text-white p-10 flex justify-center">
        <IonCol size="4" className="p-0 h-full flex">
          <img
            alt="Petani bekerja di ladang hijau"
            src="/about.jpg"
            className="flex object-cover rounded-lg"
          />
        </IonCol>
        <IonCol size="6" className="pt-0 pl-7 flex flex-col justify-center">
          <IonText className="font-semibold text-lg mb-4 tracking-wide text-[#3e885b]">
            SIAPA KAMI?
          </IonText>
          <IonText className="font-light text-3xl mb-1 tracking-wide text-[#2f4b26]">
            plantwise
          </IonText>
          <div className="mb-4 text-[#2f4b26] mr-10 text-base tracking-wide text-justify">
            <IonText>
              <p>
                Plantwise adalah sebuah platform edukasi non-profit dengan misi
                memberdayakan penanam pemula di Indonesia, khususnya dalam
                mengembangkan kemampuan bercocok tanam di pekarangan rumah. Kami
                berkomitmen untuk menciptakan dampak positif bagi sektor
                agrikultur rumahan di Indonesia melalui edukasi dan pemberdayaan
                komunitas.
              </p>
              <br />
              <p>
                Bercocok tanam di pekarangan rumah tidak hanya memberikan
                manfaat kesehatan dengan menyediakan pangan segar, tetapi juga
                berkontribusi pada penguatan ketahanan pangan lokal. Namun,
                banyak penanam pemula menghadapi tantangan, seperti kurangnya
                pengetahuan dasar bercocok tanam, keterbatasan akses ke
                teknologi sederhana, keterampilan dalam mengatasi serangan hama
                dan penyakit, hingga kendala terkait perubahan cuaca dan
                lingkungan.
              </p>
              <br />
              <p>
                Kami percaya bahwa edukasi yang berkelanjutan adalah kunci untuk
                membantu penanam pemula meningkatkan hasil panen mereka. Melalui
                pendekatan praktis, kami menyediakan panduan, pelatihan, dan
                dukungan komunitas yang dapat membantu mereka memanfaatkan
                potensi pekarangan rumah secara maksimal, meningkatkan
                keberlanjutan, dan mendukung gaya hidup yang lebih sehat dan
                ramah lingkungan.
              </p>
            </IonText>
          </div>
        </IonCol>
      </IonRow>
    </section>
  );
};

export default About;
