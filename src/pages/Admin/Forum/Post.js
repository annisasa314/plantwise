import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from "react";
import { MaterialReactTable } from "material-react-table";
import { getPosts, deletePost } from "../../../services/auth.service";
import { IconButton, Dialog, DialogActions, DialogContent, DialogTitle, Button, Snackbar, } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { IonContent } from "@ionic/react";
import AdminLayout from "../../../layouts/AdminLayout";
// Helper function to format the Timestamp to Date string
const formatTimestamp = (timestamp) => {
    const date = timestamp.toDate();
    return date.toLocaleString(); // You can format this further as needed
};
const PostPage = () => {
    const [posts, setPosts] = useState([]);
    const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
    const [selectedPostId, setSelectedPostId] = useState(null);
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState("");
    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const postsData = await getPosts();
                setPosts(postsData);
            }
            catch (error) {
                setSnackbarMessage("Gagal memuat postingan");
                setOpenSnackbar(true);
            }
        };
        fetchPosts();
    }, []);
    const handleDeletePost = async () => {
        if (selectedPostId) {
            try {
                await deletePost(selectedPostId);
                setSnackbarMessage("Postingan berhasil dihapus!");
                setOpenSnackbar(true);
                setOpenDeleteDialog(false);
                // Refresh daftar postingan setelah penghapusan
                const postsData = await getPosts();
                setPosts(postsData);
            }
            catch (error) {
                setSnackbarMessage("Gagal menghapus postingan. Silakan coba lagi.");
                setOpenSnackbar(true);
            }
        }
    };
    const handleOpenDeleteDialog = (postId) => {
        setSelectedPostId(postId);
        setOpenDeleteDialog(true);
    };
    const handleCloseDeleteDialog = () => {
        setOpenDeleteDialog(false);
        setSelectedPostId(null);
    };
    return (_jsx(AdminLayout, { children: _jsxs(IonContent, { className: "ion-padding", children: [_jsx("h1", { className: "text-3xl font-semibold text-center border-b p-2 text-gray-800 mb-6", children: "Postingan" }), _jsx(MaterialReactTable, { columns: [
                        {
                            accessorKey: "name",
                            header: "Nama Pengguna",
                        },
                        {
                            accessorKey: "email",
                            header: "Email",
                        },
                        {
                            accessorKey: "judul",
                            header: "Judul Postingan",
                        },
                        {
                            accessorKey: "pertanyaan",
                            header: "Pertanyaan",
                        },
                        {
                            accessorKey: "body",
                            header: "Konten",
                        },
                        {
                            accessorKey: "createAt",
                            header: "Dibuat Pada",
                            Cell: ({ cell }) => formatTimestamp(cell.getValue()),
                        },
                        {
                            accessorKey: "view",
                            header: "Views",
                        },
                        {
                            id: "delete",
                            header: "Aksi",
                            Cell: ({ row }) => (_jsx(IconButton, { onClick: () => handleOpenDeleteDialog(row.original.id), color: "error", children: _jsx(DeleteIcon, {}) })),
                        },
                    ], data: posts, enableColumnFilters: true, enableSorting: true, enablePagination: true }), _jsxs(Dialog, { open: openDeleteDialog, onClose: handleCloseDeleteDialog, children: [_jsx(DialogTitle, { children: "Konfirmasi Penghapusan" }), _jsx(DialogContent, { children: _jsx("p", { children: "Apakah Anda yakin ingin menghapus postingan ini?" }) }), _jsxs(DialogActions, { children: [_jsx(Button, { onClick: handleCloseDeleteDialog, color: "primary", children: "Batal" }), _jsx(Button, { onClick: handleDeletePost, color: "error", children: "Hapus" })] })] }), _jsx(Snackbar, { open: openSnackbar, autoHideDuration: 6000, onClose: () => setOpenSnackbar(false), message: snackbarMessage })] }) }));
};
export default PostPage;
