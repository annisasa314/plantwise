import React, { useEffect, useState } from "react";
import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonCard,
  IonCardContent,
  IonLabel,
  IonItem,
  IonSelect,
  IonSelectOption,
  IonSearchbar,
} from "@ionic/react";
import { getTanamanData } from "../../services/auth.service";
import Navbar from "../../components/Navbar/Navbar";

const Jadwal: React.FC = () => {
  // State untuk menyimpan daftar tanaman yang akan ditampilkan
  const [tanamanList, setTanamanList] = useState<any[]>([]);
  const [jenisFilter, setJenisFilter] = useState<string>("");
  const [musimFilter, setMusimFilter] = useState<string>("");
  const [searchQuery, setSearchQuery] = useState<string>("");

  useEffect(() => {
    const fetchTanamanData = async () => {
      const data = await getTanamanData(jenisFilter, musimFilter, searchQuery);
      setTanamanList(data);
    };

    // Memanggil fungsi fetchTanamanData saat komponen dimuat atau ketika filter atau query berubah
    fetchTanamanData();
  }, [jenisFilter, musimFilter, searchQuery]);

  return (
    <IonPage className="bg-gray-50">
      <IonHeader>
        <Navbar />
        <IonToolbar color="primary" className="text-white">
          <IonTitle className="font-bold">Jadwal Tanam Ideal</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <div className="p-4 space-y-4">
          {/* Search Bar */}
          <IonSearchbar
            value={searchQuery}
            debounce={500}
            onIonInput={(e) => setSearchQuery(e.detail.value!)}
            placeholder="Cari Tanaman..."
            className="rounded-lg shadow-sm"
          />

          {/* Filter Components */}
          <div className="grid grid-cols-2 gap-4">
            <IonItem className="bg-white rounded-lg shadow-sm">
              <IonLabel className="text-gray-600">Jenis Tanaman</IonLabel>
              <IonSelect
                value={jenisFilter}
                placeholder="Pilih Jenis"
                onIonChange={(e) => setJenisFilter(e.detail.value)}
                className="text-green-700"
              >
                <IonSelectOption value="Sayuran">Sayuran</IonSelectOption>
                <IonSelectOption value="Buah">Buah</IonSelectOption>
                <IonSelectOption value="Tanaman Obat">
                  Tanaman Obat
                </IonSelectOption>
              </IonSelect>
            </IonItem>

            <IonItem className="bg-white rounded-lg shadow-sm">
              <IonLabel className="text-gray-600">Musim</IonLabel>
              <IonSelect
                value={musimFilter}
                placeholder="Pilih Musim"
                onIonChange={(e) => setMusimFilter(e.detail.value)}
                className="text-blue-700"
              >
                <IonSelectOption value="Hujan">Hujan</IonSelectOption>
                <IonSelectOption value="Peralihan">Peralihan</IonSelectOption>
                <IonSelectOption value="Kemarau">Kemarau</IonSelectOption>
              </IonSelect>
            </IonItem>
          </div>

          {/* Display Cards */}
          <div className="space-y-4">
            {tanamanList.map((tanaman) => (
              <IonCard
                key={tanaman.id}
                className="rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
              >
                <IonCardContent className="p-4">
                  <div className="flex flex-col space-y-2">
                    <h2 className="text-xl font-bold text-green-800">
                      {tanaman.nama_tanaman}
                    </h2>
                    <div className="text-gray-600 space-y-1">
                      <p>
                        <span className="font-semibold">Waktu Penanaman:</span>{" "}
                        {tanaman.waktu_penanaman}
                      </p>
                      <p>
                        <span className="font-semibold">Musim:</span>{" "}
                        {tanaman.musim}
                      </p>
                      <p>
                        <span className="font-semibold">Jenis:</span>{" "}
                        {tanaman.jenis_tanaman}
                      </p>
                    </div>
                  </div>
                </IonCardContent>
              </IonCard>
            ))}
          </div>

          {/* Empty State */}
          {tanamanList.length === 0 && (
            <div className="text-center text-gray-500 py-8">
              <p>Tidak ada tanaman ditemukan</p>
            </div>
          )}
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Jadwal;
