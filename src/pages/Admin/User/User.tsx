import React, { useEffect, useState } from "react";
import { MaterialReactTable } from "material-react-table";
import { getUsers, deleteUser } from "../../../services/auth.service";
import {
  IconButton,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { Snackbar } from "@mui/material";
import { IonPage, IonContent } from "@ionic/react";
import Navbar from "../../../components/Navbar/Navbar";
import AdminLayout from "../../../layouts/AdminLayout";

const UserPage: React.FC = () => {
  const [users, setUsers] = useState<any[]>([]);
  const [openDeleteDialog, setOpenDeleteDialog] = useState<boolean>(false);
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  useEffect(() => {
    const fetchUsers = async () => {
      const usersData = await getUsers();
      setUsers(usersData);
    };

    fetchUsers();
  }, []);

  const handleDeleteUser = async () => {
    if (selectedUserId) {
      try {
        await deleteUser(selectedUserId);
        setSnackbarMessage("User deleted successfully!");
        setOpenSnackbar(true);
        setOpenDeleteDialog(false);
        // Refresh users list after deletion
        const usersData = await getUsers();
        setUsers(usersData);
      } catch (error) {
        setSnackbarMessage("Failed to delete user. Please try again.");
        setOpenSnackbar(true);
      }
    }
  };

  const handleOpenDeleteDialog = (userId: string) => {
    setSelectedUserId(userId);
    setOpenDeleteDialog(true);
  };

  const handleCloseDeleteDialog = () => {
    setOpenDeleteDialog(false);
    setSelectedUserId(null);
  };

  return (
    <AdminLayout>
      <IonContent className="ion-padding">
        <MaterialReactTable
          columns={[
            {
              accessorKey: "name",
              header: "Name",
            },
            {
              accessorKey: "email",
              header: "Email",
            },
            {
              accessorKey: "createdAt",
              header: "Created At",
            },
            {
              id: "delete",
              header: "Actions",
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
          data={users}
          enableColumnFilters={false}
          enableSorting={false}
          enablePagination={false}
        />

        {/* Delete Confirmation Dialog */}
        <Dialog open={openDeleteDialog} onClose={handleCloseDeleteDialog}>
          <DialogTitle>Confirm Deletion</DialogTitle>
          <DialogContent>
            <p>Are you sure you want to delete this user?</p>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseDeleteDialog} color="primary">
              Cancel
            </Button>
            <Button onClick={handleDeleteUser} color="error">
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
    </AdminLayout>
  );
};

export default UserPage;
