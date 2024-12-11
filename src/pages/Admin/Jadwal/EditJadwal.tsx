import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom"; // Import useParams
import {
  IonPage,
  IonContent,
  IonInput,
  IonLabel,
  IonButton,
  IonAlert,
  IonItem,
} from "@ionic/react";
import {
  updateJadwalTanam,
  getJadwalTanam,
} from "../../../services/auth.service";
import Navbar from "../../../components/Navbar/Navbar";
import AdminLayout from "../../../layouts/AdminLayout";

const EditJadwal: React.FC = () => {
  const { id } = useParams<{ id: string }>(); // Ambil ID dari URL
  const [jadwal, setJadwal] = useState<any | null>(null);
  const [newJadwal, setNewJadwal] = useState<any | null>(null);
  const [showAlert, setShowAlert] = useState(false);
  const [showConfirmationDialog, setShowConfirmationDialog] = useState(false);

  useEffect(() => {
    const fetchJadwal = async () => {
      try {
        const data = await getJadwalTanam(); // Ambil semua data
        const selectedJadwal = data.find((item: any) => item.id === id); // Filter berdasarkan ID
        if (selectedJadwal) {
          setJadwal(selectedJadwal);
          setNewJadwal({ ...selectedJadwal }); // Salin data untuk diedit
        }
      } catch (error) {
        console.error("Error fetching jadwal: ", error);
      }
    };
    fetchJadwal();
  }, [id]);

  const handleInputChange = (field: string, value: string) => {
    if (newJadwal) {
      setNewJadwal({
        ...newJadwal,
        [field]: value,
      });
    }
  };

  const handleSaveChanges = async () => {
    if (newJadwal) {
      try {
        await updateJadwalTanam(jadwal!.id, newJadwal); // Perbarui data berdasarkan ID
        setShowAlert(true);
      } catch (error) {
        console.error("Error updating jadwal tanam:", error);
      }
    }
  };

  const handleCancel = () => {
    setNewJadwal({ ...jadwal! });
  };

  return (
    <AdminLayout>
      <h1 className="text-3xl font-semibold text-center border-b p-2 text-gray-800 mb-6">
        Edit Post
      </h1>
      <IonContent className="ion-padding">
        {jadwal && newJadwal ? (
          <>
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

            <IonButton
              expand="full"
              onClick={() => setShowConfirmationDialog(true)}
            >
              Konfirmasi Perubahan
            </IonButton>

            <IonButton expand="full" color="medium" onClick={handleCancel}>
              Batal
            </IonButton>

            {/* Konfirmasi perubahan data */}
            <IonAlert
              isOpen={showConfirmationDialog}
              onDidDismiss={() => setShowConfirmationDialog(false)}
              header="Konfirmasi Perubahan"
              message="Apakah Anda yakin dengan perubahan data?"
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
              message="Data jadwal tanam telah berhasil diperbarui."
              buttons={["OK"]}
            />
          </>
        ) : (
          <p>Loading...</p>
        )}
      </IonContent>
    </AdminLayout>
  );
};

export default EditJadwal;
