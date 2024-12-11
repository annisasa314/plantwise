import React, { useState } from "react";
import {
  IonPage,
  IonContent,
  IonInput,
  IonLabel,
  IonButton,
  IonAlert,
  IonItem,
} from "@ionic/react";
import { createJadwalTanam } from "../../../services/auth.service"; // Asumsi Anda memiliki fungsi createJadwalTanam
import Navbar from "../../../components/Navbar/Navbar";
import AdminLayout from "../../../layouts/AdminLayout";

const AddJadwal: React.FC = () => {
  const [newJadwal, setNewJadwal] = useState<any>({
    jenis_tanaman: "",
    nama_tanaman: "",
    musim: "",
    waktu_penanaman: "",
  });
  const [showAlert, setShowAlert] = useState(false);
  const [showConfirmationDialog, setShowConfirmationDialog] = useState(false);

  // Handle perubahan input
  const handleInputChange = (field: string, value: string) => {
    setNewJadwal({
      ...newJadwal,
      [field]: value,
    });
  };

  // Handle penyimpanan data baru
  const handleSaveChanges = async () => {
    try {
      await createJadwalTanam(newJadwal); // Fungsi untuk menambahkan data baru
      setShowAlert(true); // Tampilkan alert sukses
    } catch (error) {
      console.error("Error adding jadwal tanam:", error);
    }
  };

  // Handle batal (reset form)
  const handleCancel = () => {
    setNewJadwal({
      jenis_tanaman: "",
      nama_tanaman: "",
      musim: "",
      waktu_penanaman: "",
    });
  };

  return (
    <AdminLayout>
      <IonContent className="ion-padding">
        <h1 className="text-3xl font-semibold text-center border-b p-2 text-gray-800 mb-6">
          Tambah Post
        </h1>
        <IonItem>
          <IonLabel position="stacked">Jenis Tanaman</IonLabel>
          <IonInput
            value={newJadwal.jenis_tanaman}
            onIonChange={(e) =>
              handleInputChange("jenis_tanaman", e.detail.value!)
            }
          />
        </IonItem>

        <IonItem>
          <IonLabel position="stacked">Nama Tanaman</IonLabel>
          <IonInput
            value={newJadwal.nama_tanaman}
            onIonChange={(e) =>
              handleInputChange("nama_tanaman", e.detail.value!)
            }
          />
        </IonItem>

        <IonItem>
          <IonLabel position="stacked">Musim</IonLabel>
          <IonInput
            value={newJadwal.musim}
            onIonChange={(e) => handleInputChange("musim", e.detail.value!)}
          />
        </IonItem>

        <IonItem>
          <IonLabel position="stacked">Waktu Tanam</IonLabel>
          <IonInput
            value={newJadwal.waktu_penanaman}
            onIonChange={(e) =>
              handleInputChange("waktu_penanaman", e.detail.value!)
            }
          />
        </IonItem>

        {/* Tombol konfirmasi */}
        <IonButton
          expand="full"
          onClick={() => setShowConfirmationDialog(true)}
        >
          Konfirmasi Penambahan
        </IonButton>

        <IonButton expand="full" color="medium" onClick={handleCancel}>
          Batal
        </IonButton>

        {/* Konfirmasi perubahan data */}
        <IonAlert
          isOpen={showConfirmationDialog}
          onDidDismiss={() => setShowConfirmationDialog(false)}
          header="Konfirmasi Penambahan"
          message="Apakah Anda yakin ingin menambahkan jadwal tanam ini?"
          buttons={[
            {
              text: "Batal",
              role: "cancel",
              handler: () => setShowConfirmationDialog(false),
            },
            {
              text: "Ya",
              handler: () => handleSaveChanges(),
            },
          ]}
        />

        {/* Notifikasi berhasil */}
        <IonAlert
          isOpen={showAlert}
          onDidDismiss={() => setShowAlert(false)}
          header="Sukses"
          message="Data jadwal tanam telah berhasil ditambahkan."
          buttons={["OK"]}
        />
      </IonContent>
    </AdminLayout>
  );
};

export default AddJadwal;
