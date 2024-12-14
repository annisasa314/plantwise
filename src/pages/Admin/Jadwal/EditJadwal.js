import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"; // Import useParams
import { IonContent, IonInput, IonLabel, IonButton, IonAlert, IonItem, } from "@ionic/react";
import { updateJadwalTanam, getJadwalTanam, } from "../../../services/auth.service";
import AdminLayout from "../../../layouts/AdminLayout";
const EditJadwal = () => {
    const { id } = useParams(); // Ambil ID dari URL
    const [jadwal, setJadwal] = useState(null);
    const [newJadwal, setNewJadwal] = useState(null);
    const [showAlert, setShowAlert] = useState(false);
    const [showConfirmationDialog, setShowConfirmationDialog] = useState(false);
    useEffect(() => {
        const fetchJadwal = async () => {
            try {
                const data = await getJadwalTanam(); // Ambil semua data
                const selectedJadwal = data.find((item) => item.id === id); // Filter berdasarkan ID
                if (selectedJadwal) {
                    setJadwal(selectedJadwal);
                    setNewJadwal({ ...selectedJadwal }); // Salin data untuk diedit
                }
            }
            catch (error) {
                console.error("Error fetching jadwal: ", error);
            }
        };
        fetchJadwal();
    }, [id]);
    const handleInputChange = (field, value) => {
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
                await updateJadwalTanam(jadwal.id, newJadwal); // Perbarui data berdasarkan ID
                setShowAlert(true);
            }
            catch (error) {
                console.error("Error updating jadwal tanam:", error);
            }
        }
    };
    const handleCancel = () => {
        setNewJadwal({ ...jadwal });
    };
    return (_jsxs(AdminLayout, { children: [_jsx("h1", { className: "text-3xl font-semibold text-center border-b p-2 text-gray-800 mb-6", children: "Edit Post" }), _jsx(IonContent, { className: "ion-padding", children: jadwal && newJadwal ? (_jsxs(_Fragment, { children: [_jsxs(IonItem, { children: [_jsx(IonLabel, { position: "stacked", children: "Jenis Tanaman" }), _jsx(IonInput, { value: newJadwal.jenis_tanaman, onIonChange: (e) => handleInputChange("jenis_tanaman", e.detail.value) })] }), _jsxs(IonItem, { children: [_jsx(IonLabel, { position: "stacked", children: "Nama Tanaman" }), _jsx(IonInput, { value: newJadwal.nama_tanaman, onIonChange: (e) => handleInputChange("nama_tanaman", e.detail.value) })] }), _jsxs(IonItem, { children: [_jsx(IonLabel, { position: "stacked", children: "Musim" }), _jsx(IonInput, { value: newJadwal.musim, onIonChange: (e) => handleInputChange("musim", e.detail.value) })] }), _jsxs(IonItem, { children: [_jsx(IonLabel, { position: "stacked", children: "Waktu Tanam" }), _jsx(IonInput, { value: newJadwal.waktu_penanaman, onIonChange: (e) => handleInputChange("waktu_penanaman", e.detail.value) })] }), _jsx(IonButton, { expand: "full", onClick: () => setShowConfirmationDialog(true), children: "Konfirmasi Perubahan" }), _jsx(IonButton, { expand: "full", color: "medium", onClick: handleCancel, children: "Batal" }), _jsx(IonAlert, { isOpen: showConfirmationDialog, onDidDismiss: () => setShowConfirmationDialog(false), header: "Konfirmasi Perubahan", message: "Apakah Anda yakin dengan perubahan data?", buttons: [
                                {
                                    text: "Batal",
                                    role: "cancel",
                                    handler: () => setShowConfirmationDialog(false),
                                },
                                {
                                    text: "Ya",
                                    handler: () => handleSaveChanges(),
                                },
                            ] }), _jsx(IonAlert, { isOpen: showAlert, onDidDismiss: () => setShowAlert(false), header: "Sukses", message: "Data jadwal tanam telah berhasil diperbarui.", buttons: ["OK"] })] })) : (_jsx("p", { children: "Loading..." })) })] }));
};
export default EditJadwal;
