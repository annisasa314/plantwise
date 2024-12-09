import React, { useEffect, useState } from 'react';
import { MaterialReactTable } from 'material-react-table';
import { getPosts, deletePost } from '../../../services/auth.service';
import { IconButton, Dialog, DialogActions, DialogContent, DialogTitle, Button, Snackbar } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { IonPage, IonContent } from '@ionic/react';
import Navbar from '../../../components/Navbar/Navbar';

const PostPage: React.FC = () => {
  const [posts, setPosts] = useState<any[]>([]);
  const [openDeleteDialog, setOpenDeleteDialog] = useState<boolean>(false);
  const [selectedPostId, setSelectedPostId] = useState<string | null>(null);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  useEffect(() => {
    const fetchPosts = async () => {
      const postsData = await getPosts();
      setPosts(postsData);
    };

    fetchPosts();
  }, []);

  const handleDeletePost = async () => {
    if (selectedPostId) {
      try {
        await deletePost(selectedPostId);
        setSnackbarMessage("Post deleted successfully!");
        setOpenSnackbar(true);
        setOpenDeleteDialog(false);
        // Refresh posts list after deletion
        const postsData = await getPosts();
        setPosts(postsData);
      } catch (error) {
        setSnackbarMessage("Failed to delete post. Please try again.");
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
    <IonPage>
      <Navbar />
      <IonContent className="ion-padding">
        <MaterialReactTable
          columns={[
            {
              accessorKey: 'name',
              header: 'Name',
              // Assuming 'name' is a reference to the user document, you may want to resolve it from the database.
            },
            {
              accessorKey: 'judul',
              header: 'Title',
            },
            {
              accessorKey: 'createAt',
              header: 'Created At',
            },
            {
              accessorKey: 'pertanyaan',
              header: 'Pertanyaan',
            },
            {
              accessorKey: 'view',
              header: 'Views',
            },
            {
              accessorKey: 'body',
              header: 'Comments',
              // This might require resolving the comment reference (komentar) to display text.
            },
            {
              id: 'delete',
              header: 'Actions',
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
          enableColumnFilters={false}
          enableSorting={false}
          enablePagination={false}
        />

        {/* Delete Confirmation Dialog */}
        <Dialog open={openDeleteDialog} onClose={handleCloseDeleteDialog}>
          <DialogTitle>Confirm Deletion</DialogTitle>
          <DialogContent>
            <p>Are you sure you want to delete this post?</p>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseDeleteDialog} color="primary">
              Cancel
            </Button>
            <Button onClick={handleDeletePost} color="error">
              Delete
            </Button>
          </DialogActions>
        </Dialog>

        {/* Snackbar for notification */}
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

export default PostPage;
