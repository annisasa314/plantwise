import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from "react";
import { MaterialReactTable } from "material-react-table";
import { IconButton, Dialog, DialogActions, DialogContent, DialogTitle, Button, Snackbar, } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { IonContent } from "@ionic/react";
import { getComments, deleteComment } from "../../../services/auth.service";
import AdminLayout from "../../../layouts/AdminLayout";
const CommentPage = () => {
    const [comments, setComments] = useState([]);
    const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
    const [selectedCommentId, setSelectedCommentId] = useState(null);
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState("");
    useEffect(() => {
        const fetchComments = async () => {
            try {
                const commentsData = await getComments();
                setComments(commentsData);
            }
            catch (error) {
                setSnackbarMessage("Gagal memuat komentar");
                setOpenSnackbar(true);
            }
        };
        fetchComments();
    }, []);
    const handleDeleteComment = async () => {
        if (selectedCommentId) {
            try {
                await deleteComment(selectedCommentId);
                setSnackbarMessage("Komentar berhasil dihapus!");
                setOpenSnackbar(true);
                setOpenDeleteDialog(false);
                // Refresh daftar komentar setelah penghapusan
                const commentsData = await getComments();
                setComments(commentsData);
            }
            catch (error) {
                setSnackbarMessage("Gagal menghapus komentar. Silakan coba lagi.");
                setOpenSnackbar(true);
            }
        }
    };
    const handleOpenDeleteDialog = (commentId) => {
        setSelectedCommentId(commentId);
        setOpenDeleteDialog(true);
    };
    const handleCloseDeleteDialog = () => {
        setOpenDeleteDialog(false);
        setSelectedCommentId(null);
    };
    // Helper function to format timestamp
    const formatTimestamp = (timestamp) => {
        if (!timestamp)
            return "-";
        return timestamp.toDate
            ? timestamp.toDate().toLocaleString()
            : new Date(timestamp).toLocaleString();
    };
    return (_jsx(AdminLayout, { children: _jsxs(IonContent, { className: "ion-padding", children: [_jsx("h1", { className: "text-3xl font-semibold text-center border-b p-2 text-gray-800 mb-6", children: "Komentar" }), _jsx(MaterialReactTable, { columns: [
                        {
                            accessorKey: "name",
                            header: "Nama Pengirim",
                        },
                        {
                            accessorKey: "email",
                            header: "Email",
                        },
                        {
                            accessorKey: "body",
                            header: "Isi Komentar",
                        },
                        {
                            accessorKey: "postId",
                            header: "ID Postingan Terkait",
                        },
                        {
                            accessorKey: "createAt",
                            header: "Tanggal Dibuat",
                            Cell: ({ cell }) => formatTimestamp(cell.getValue()),
                        },
                        {
                            id: "delete",
                            header: "Aksi",
                            Cell: ({ row }) => (_jsx(IconButton, { onClick: () => handleOpenDeleteDialog(row.original.id), color: "error", children: _jsx(DeleteIcon, {}) })),
                        },
                    ], data: comments, enableColumnFilters: true, enableSorting: true, enablePagination: true }), _jsxs(Dialog, { open: openDeleteDialog, onClose: handleCloseDeleteDialog, children: [_jsx(DialogTitle, { children: "Konfirmasi Penghapusan" }), _jsx(DialogContent, { children: _jsx("p", { children: "Apakah Anda yakin ingin menghapus komentar ini?" }) }), _jsxs(DialogActions, { children: [_jsx(Button, { onClick: handleCloseDeleteDialog, color: "primary", children: "Batal" }), _jsx(Button, { onClick: handleDeleteComment, color: "error", children: "Hapus" })] })] }), _jsx(Snackbar, { open: openSnackbar, autoHideDuration: 6000, onClose: () => setOpenSnackbar(false), message: snackbarMessage })] }) }));
};
export default CommentPage;
