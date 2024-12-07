import React, { useEffect, useState } from 'react';
import { IonContent, IonPage, IonCard, IonCardContent, IonLabel, IonItem, IonSelect, IonSelectOption, IonSearchbar } from '@ionic/react';
import { getTanamanData } from '../../services/auth.service';
import Navbar from "../../components/Navbar/Navbar"


const Jadwal: React.FC = () => {
  // State untuk menyimpan daftar tanaman yang akan ditampilkan
  const [tanamanList, setTanamanList] = useState<any[]>([]);
  
  // State untuk filter berdasarkan jenis tanaman
  const [jenisFilter, setJenisFilter] = useState<string>('');
  
  // State untuk filter berdasarkan musim
  const [musimFilter, setMusimFilter] = useState<string>('');
  
  // State untuk pencarian tanaman berdasarkan query
  const [searchQuery, setSearchQuery] = useState<string>(''); 

  // useEffect untuk mengambil data tanaman setiap kali filter atau query pencarian berubah
  useEffect(() => {
    const fetchTanamanData = async () => {
      // Memanggil fungsi untuk mendapatkan data tanaman berdasarkan filter dan pencarian
      const data = await getTanamanData(jenisFilter, musimFilter, searchQuery);
      // Menyimpan data yang didapat ke dalam state tanamanList
      setTanamanList(data);
    };

    // Memanggil fungsi fetchTanamanData saat komponen dimuat atau ketika filter atau query berubah
    fetchTanamanData();
  }, [jenisFilter, musimFilter, searchQuery]); // Mengulang pengambilan data ketika ada perubahan pada jenisFilter, musimFilter, atau searchQuery

  return (
    <IonPage>
      <Navbar />
      <IonContent>
        {/* Search Bar untuk pencarian tanaman */}
        <IonSearchbar 
          value={searchQuery}
          debounce={500} // Menambahkan debounce untuk mengurangi jumlah permintaan pencarian saat mengetik
          onIonInput={(e) => setSearchQuery(e.detail.value!)}  // Mengupdate state searchQuery saat input berubah
          placeholder="Cari Tanaman..."  // Placeholder untuk input pencarian
        />

        {/* Komponen filter berdasarkan jenis tanaman */}
        <IonItem>
          <IonLabel>Jenis Tanaman</IonLabel>
          <IonSelect value={jenisFilter} placeholder="Pilih Jenis Tanaman" onIonChange={(e) => setJenisFilter(e.detail.value)}>
            <IonSelectOption value="Sayuran">Sayuran</IonSelectOption>
            <IonSelectOption value="Buah">Buah</IonSelectOption>
            <IonSelectOption value="Tanaman Obat">Tanaman Obat</IonSelectOption>
          </IonSelect>
        </IonItem>

        {/* Komponen filter berdasarkan musim */}
        <IonItem>
          <IonLabel>Musim</IonLabel>
          <IonSelect value={musimFilter} placeholder="Pilih Musim" onIonChange={(e) => setMusimFilter(e.detail.value)}>
            <IonSelectOption value="Hujan">Hujan</IonSelectOption>
            <IonSelectOption value="Peralihan">Peralihan</IonSelectOption>
            <IonSelectOption value="Kemarau">Kemarau</IonSelectOption>
          </IonSelect>
        </IonItem>

        {/* Menampilkan daftar tanaman dalam bentuk kartu */}
        {tanamanList.map((tanaman) => (
          <IonCard key={tanaman.id}>
            <IonCardContent>
              <h2>{tanaman.nama_tanaman}</h2>
              <h3>{`Waktu Penanaman : ${tanaman.waktu_penanaman}`}</h3>
              <h3>{`Musim : ${tanaman.musim}`}</h3>
              <h3>{`Jenis : ${tanaman.jenis_tanaman}`}</h3>
            </IonCardContent>
          </IonCard>
        ))}
      </IonContent>
    </IonPage>
  );
};

export default Jadwal;
