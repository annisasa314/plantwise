import React, { useEffect, useState } from "react";
import { MaterialReactTable } from "material-react-table";
import { getPosts, deletePost } from "../../../services/auth.service";
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
import { IonContent } from "@ionic/react";
import AdminLayout from "../../../layouts/AdminLayout";
import { Post } from "../../../type/forum.type";
import { Timestamp } from "firebase/firestore";

// Helper function to format the Timestamp to Date string
const formatTimestamp = (timestamp: Timestamp): string => {
  const date = timestamp.toDate();
  return date.toLocaleString(); // You can format this further as needed
};

const PostPage: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [openDeleteDialog, setOpenDeleteDialog] = useState<boolean>(false);
  const [selectedPostId, setSelectedPostId] = useState<string | null>(null);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const postsData = await getPosts();
        setPosts(postsData);
      } catch (error) {
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
      } catch (error) {
        setSnackbarMessage("Gagal menghapus postingan. Silakan coba lagi.");
        setOpenSnackbar(true);
      }
    }
  };

  const handleOpenDeleteDialog = (postId: string) => {
    setSelectedPostId(postId);
    setOpenDeleteDialog(true);
  };

  const handleCloseDeleteDialog = () => {
    setOpenDeleteDialog(false);
    setSelectedPostId(null);
  };

  return (
    <AdminLayout>
      <IonContent className="ion-padding">
        <h1 className="text-3xl font-semibold text-center border-b p-2 text-gray-800 mb-6">
          Postingan
        </h1>
        <MaterialReactTable
          columns={[
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
              Cell: ({ cell }) => formatTimestamp(cell.getValue() as Timestamp),
            },
            {
              accessorKey: "view",
              header: "Views",
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
          data={posts}
          enableColumnFilters={true}
          enableSorting={true}
          enablePagination={true}
        />

        {/* Dialog Konfirmasi Hapus */}
        <Dialog open={openDeleteDialog} onClose={handleCloseDeleteDialog}>
          <DialogTitle>Konfirmasi Penghapusan</DialogTitle>
          <DialogContent>
            <p>Apakah Anda yakin ingin menghapus postingan ini?</p>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseDeleteDialog} color="primary">
              Batal
            </Button>
            <Button onClick={handleDeletePost} color="error">
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

export default PostPage;
