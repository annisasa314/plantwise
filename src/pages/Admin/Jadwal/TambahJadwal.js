import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { IonContent, IonInput, IonLabel, IonButton, IonAlert, IonItem, } from "@ionic/react";
import { createJadwalTanam } from "../../../services/auth.service"; // Asumsi Anda memiliki fungsi createJadwalTanam
import AdminLayout from "../../../layouts/AdminLayout";
const AddJadwal = () => {
    const [newJadwal, setNewJadwal] = useState({
        jenis_tanaman: "",
        nama_tanaman: "",
        musim: "",
        waktu_penanaman: "",
    });
    const [showAlert, setShowAlert] = useState(false);
    const [showConfirmationDialog, setShowConfirmationDialog] = useState(false);
    // Handle perubahan input
    const handleInputChange = (field, value) => {
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
        }
        catch (error) {
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
    return (_jsx(AdminLayout, { children: _jsxs(IonContent, { className: "ion-padding", children: [_jsx("h1", { className: "text-3xl font-semibold text-center border-b p-2 text-gray-800 mb-6", children: "Tambah Post" }), _jsxs(IonItem, { children: [_jsx(IonLabel, { position: "stacked", children: "Jenis Tanaman" }), _jsx(IonInput, { value: newJadwal.jenis_tanaman, onIonChange: (e) => handleInputChange("jenis_tanaman", e.detail.value) })] }), _jsxs(IonItem, { children: [_jsx(IonLabel, { position: "stacked", children: "Nama Tanaman" }), _jsx(IonInput, { value: newJadwal.nama_tanaman, onIonChange: (e) => handleInputChange("nama_tanaman", e.detail.value) })] }), _jsxs(IonItem, { children: [_jsx(IonLabel, { position: "stacked", children: "Musim" }), _jsx(IonInput, { value: newJadwal.musim, onIonChange: (e) => handleInputChange("musim", e.detail.value) })] }), _jsxs(IonItem, { children: [_jsx(IonLabel, { position: "stacked", children: "Waktu Tanam" }), _jsx(IonInput, { value: newJadwal.waktu_penanaman, onIonChange: (e) => handleInputChange("waktu_penanaman", e.detail.value) })] }), _jsx(IonButton, { expand: "full", onClick: () => setShowConfirmationDialog(true), children: "Konfirmasi Penambahan" }), _jsx(IonButton, { expand: "full", color: "medium", onClick: handleCancel, children: "Batal" }), _jsx(IonAlert, { isOpen: showConfirmationDialog, onDidDismiss: () => setShowConfirmationDialog(false), header: "Konfirmasi Penambahan", message: "Apakah Anda yakin ingin menambahkan jadwal tanam ini?", buttons: [
                        {
                            text: "Batal",
                            role: "cancel",
                            handler: () => setShowConfirmationDialog(false),
                        },
                        {
                            text: "Ya",
                            handler: () => handleSaveChanges(),
                        },
                    ] }), _jsx(IonAlert, { isOpen: showAlert, onDidDismiss: () => setShowAlert(false), header: "Sukses", message: "Data jadwal tanam telah berhasil ditambahkan.", buttons: ["OK"] })] }) }));
};
export default AddJadwal;
