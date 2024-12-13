import React, { useEffect, useState } from "react";
import { MaterialReactTable } from "material-react-table";
import {
  IconButton,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  Snackbar,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { IonPage, IonContent } from "@ionic/react";
import Navbar from "../../../components/Navbar/Navbar";
import { getComments, deleteComment } from "../../../services/auth.service";
import AdminLayout from "../../../layouts/AdminLayout";
import { Comment, Post } from "../../../type/forum.type"; // Adjust import path as needed
import { Timestamp } from "firebase/firestore";

const CommentPage: React.FC = () => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [openDeleteDialog, setOpenDeleteDialog] = useState<boolean>(false);
  const [selectedCommentId, setSelectedCommentId] = useState<string | null>(
    null
  );
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const commentsData = await getComments();
        setComments(commentsData);
      } catch (error) {
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
      } catch (error) {
        setSnackbarMessage("Gagal menghapus komentar. Silakan coba lagi.");
        setOpenSnackbar(true);
      }
    }
  };

  const handleOpenDeleteDialog = (commentId: string) => {
    setSelectedCommentId(commentId);
    setOpenDeleteDialog(true);
  };

  const handleCloseDeleteDialog = () => {
    setOpenDeleteDialog(false);
    setSelectedCommentId(null);
  };

  // Helper function to format timestamp
  const formatTimestamp = (timestamp: Timestamp) => {
    if (!timestamp) return "-";
    return timestamp.toDate
      ? timestamp.toDate().toLocaleString()
      : new Date(timestamp as unknown as number).toLocaleString();
  };

  return (
    <AdminLayout>
      <IonContent className="ion-padding">
        <h1 className="text-3xl font-semibold text-center border-b p-2 text-gray-800 mb-6">
          Komentar
        </h1>
        <MaterialReactTable
          columns={[
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
              Cell: ({ cell }) => formatTimestamp(cell.getValue() as Timestamp),
            },
            {
              id: "delete",
              header: "Aksi",
              Cell: ({ row }) => (
                <IconButton
                  onClick={() => handleOpenDeleteDialog(row.original.id)}
                  color="error"
                >
                  <DeleteIcon />
                </IconButton>
              ),
            },
          ]}
          data={comments}
          enableColumnFilters={true}
          enableSorting={true}
          enablePagination={true}
        />

        {/* Dialog Konfirmasi Hapus */}
        <Dialog open={openDeleteDialog} onClose={handleCloseDeleteDialog}>
          <DialogTitle>Konfirmasi Penghapusan</DialogTitle>
          <DialogContent>
            <p>Apakah Anda yakin ingin menghapus komentar ini?</p>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseDeleteDialog} color="primary">
              Batal
            </Button>
            <Button onClick={handleDeleteComment} color="error">
              Hapus
            </Button>
          </DialogActions>
        </Dialog>

        {/* Snackbar untuk notifikasi */}
        <Snackbar
          open={openSnackbar}
          autoHideDuration={6000}
          onClose={() => setOpenSnackbar(false)}
          message={snackbarMessage}
        />
      </IonContent>
    </AdminLayout>
  );
};

export default CommentPage;
