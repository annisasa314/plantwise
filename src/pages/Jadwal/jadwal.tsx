import React, { useEffect, useState } from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonCard, IonCardContent, IonLabel, IonItem, IonSelect, IonSelectOption, IonSearchbar } from '@ionic/react';
import { getTanamanData } from '../../services/auth.service';

const Jadwal: React.FC = () => {
  const [tanamanList, setTanamanList] = useState<any[]>([]);
  const [jenisFilter, setJenisFilter] = useState<string>('');
  const [musimFilter, setMusimFilter] = useState<string>('');
  const [searchQuery, setSearchQuery] = useState<string>(''); // New state for search query

  useEffect(() => {
    const fetchTanamanData = async () => {
      const data = await getTanamanData(jenisFilter, musimFilter, searchQuery); // Pass the search query to the service function
      setTanamanList(data);
    };

    fetchTanamanData();
  }, [jenisFilter, musimFilter, searchQuery]); // Re-fetch when search query changes

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Jadwal Tanam Ideal</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        {/* Search Bar */}
        <IonSearchbar 
          value={searchQuery}
          debounce={500} // Optional: Adjust debounce time for better user experience
          onIonInput={(e) => setSearchQuery(e.detail.value!)} 
          placeholder="Cari Tanaman..." 
        />

        {/* Filter Components */}
        <IonItem>
          <IonLabel>Jenis Tanaman</IonLabel>
          <IonSelect value={jenisFilter} placeholder="Pilih Jenis Tanaman" onIonChange={(e) => setJenisFilter(e.detail.value)}>
            <IonSelectOption value="Sayuran">Sayuran</IonSelectOption>
            <IonSelectOption value="Buah">Buah</IonSelectOption>
            <IonSelectOption value="Tanaman Obat">Tanaman Obat</IonSelectOption>
          </IonSelect>
        </IonItem>
        <IonItem>
          <IonLabel>Musim</IonLabel>
          <IonSelect value={musimFilter} placeholder="Pilih Musim" onIonChange={(e) => setMusimFilter(e.detail.value)}>
            <IonSelectOption value="Hujan">Hujan</IonSelectOption>
            <IonSelectOption value="Peralihan">Peralihan</IonSelectOption>
            <IonSelectOption value="Kemarau">Kemarau</IonSelectOption>
          </IonSelect>
        </IonItem>

        {/* Display Card */}
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
