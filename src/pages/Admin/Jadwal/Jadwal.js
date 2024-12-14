import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom"; // Import useHistory
import { MaterialReactTable } from "material-react-table";
import { Dialog, DialogActions, DialogContent, DialogTitle, Button, IconButton, } from "@mui/material";
import { Edit, Delete } from "@mui/icons-material";
import { getJadwalTanam, deleteJadwalTanam, } from "../../../services/auth.service";
import { IonContent, IonButton } from "@ionic/react";
import AdminLayout from "../../../layouts/AdminLayout";
const JadwalAdmin = () => {
    const history = useHistory(); // Initialize useHistory hook
    const [jadwalData, setJadwalData] = useState([]);
    const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
    const [selectedJadwal, setSelectedJadwal] = useState(null);
    // Fetch data from Firestore
    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await getJadwalTanam();
                setJadwalData(data);
            }
            catch (error) {
                console.error("Error fetching jadwal tanam: ", error);
            }
        };
        fetchData();
    }, []);
    // Handle delete confirmation
    const handleDelete = async () => {
        if (selectedJadwal) {
            try {
                await deleteJadwalTanam(selectedJadwal.id);
                setJadwalData((prevData) => prevData.filter((jadwal) => jadwal.id !== selectedJadwal.id));
                setOpenDeleteDialog(false);
            }
            catch (error) {
                console.error("Error deleting jadwal tanam: ", error);
            }
        }
    };
    const columns = [
        {
            accessorKey: "jenis_tanaman",
            header: "Kategori",
        },
        {
            accessorKey: "nama_tanaman",
            header: "Nama Tanaman",
        },
        {
            accessorKey: "musim",
            header: "Musim",
        },
        {
            accessorKey: "waktu_penanaman",
            header: "Waktu Tanam",
        },
        {
            id: "actions",
            header: "Actions",
            Cell: ({ row }) => (_jsxs("div", { style: { display: "flex", alignItems: "center", gap: "8px" }, children: [_jsx(IconButton, { onClick: () => handleEdit(row.original), color: "primary", size: "small", children: _jsx(Edit, {}) }), _jsx(IconButton, { onClick: () => handleDeleteDialog(row), color: "error", size: "small", children: _jsx(Delete, {}) })] })),
        },
    ];
    const handleEdit = (jadwal) => {
        history.push(`/edit-jadwal/${jadwal.id}`); // Navigasi dengan ID
    };
    const handleDeleteDialog = (row) => {
        setSelectedJadwal(row.original);
        setOpenDeleteDialog(true);
    };
    const handleCloseDeleteDialog = () => {
        setOpenDeleteDialog(false);
        setSelectedJadwal(null);
    };
    // Navigasi ke halaman tambah jadwal
    const handleAddJadwal = () => {
        history.push("/tambah-jadwal"); // Rute menuju halaman tambah jadwal
    };
    return (_jsx(AdminLayout, { children: _jsxs(IonContent, { className: "ion-padding", children: [_jsx("h1", { className: "text-3xl font-semibold text-center border-b p-2 text-gray-800 mb-6", children: "Jadwal Tanam" }), _jsx("div", { style: {
                        display: "flex",
                        justifyContent: "flex-end",
                        marginBottom: "20px",
                    }, children: _jsx(IonButton, { onClick: handleAddJadwal, children: "Tambah Data" }) }), _jsx(MaterialReactTable, { columns: columns, data: jadwalData }), _jsxs(Dialog, { open: openDeleteDialog, onClose: handleCloseDeleteDialog, children: [_jsx(DialogTitle, { children: "Konfirmasi Penghapusan" }), _jsx(DialogContent, { children: _jsx("p", { children: "Apakah Anda yakin ingin menghapus jadwal tanam ini?" }) }), _jsxs(DialogActions, { children: [_jsx(Button, { onClick: handleCloseDeleteDialog, color: "primary", children: "Batal" }), _jsx(Button, { onClick: handleDelete, color: "error", children: "Hapus" })] })] })] }) }));
};
export default JadwalAdmin;
