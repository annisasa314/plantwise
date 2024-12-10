import React, { useEffect, useState } from 'react';
import { MaterialReactTable } from 'material-react-table';
import {
  IconButton,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  Snackbar,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { IonPage, IonContent } from '@ionic/react';
import Navbar from '../../../components/Navbar/Navbar';
import { getComments, deleteComment } from '../../../services/auth.service';

const CommentPage: React.FC = () => {
  const [comments, setComments] = useState<any[]>([]);
  const [openDeleteDialog, setOpenDeleteDialog] = useState<boolean>(false);
  const [selectedCommentId, setSelectedCommentId] = useState<string | null>(null);
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

  return (
    <IonPage>
      <Navbar />
      <IonContent className="ion-padding">
        <MaterialReactTable
          columns={[
            {
              accessorKey: 'name',
              header: 'Nama',
            },
            {
              accessorKey: 'judul',
              header: 'Judul Postingan',
            },
            {
              accessorKey: 'body',
              header: 'Komentar',
            },
            {
              accessorKey: 'createAt',
              header: 'Tanggal Dibuat',
              Cell: ({ cell }) => {
                const timestamp = cell.getValue() as { seconds: number; nanoseconds: number };
                const date = new Date(timestamp.seconds * 1000);
                return date.toLocaleString();
              },
            },
            {
              id: 'delete',
              header: 'Aksi',
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
    </IonPage>
  );
};

export default CommentPage;
