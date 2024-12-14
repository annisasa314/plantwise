import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from "react";
import { MaterialReactTable } from "material-react-table";
import { getUsers, deleteUser } from "../../../services/auth.service";
import { IconButton, Dialog, DialogActions, DialogContent, DialogTitle, Button, } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { Snackbar } from "@mui/material";
import { IonContent } from "@ionic/react";
import AdminLayout from "../../../layouts/AdminLayout";
const UserPage = () => {
    const [users, setUsers] = useState([]);
    const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
    const [selectedUserId, setSelectedUserId] = useState(null);
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
            }
            catch (error) {
                setSnackbarMessage("Failed to delete user. Please try again.");
                setOpenSnackbar(true);
            }
        }
    };
    const handleOpenDeleteDialog = (userId) => {
        setSelectedUserId(userId);
        setOpenDeleteDialog(true);
    };
    const handleCloseDeleteDialog = () => {
        setOpenDeleteDialog(false);
        setSelectedUserId(null);
    };
    return (_jsx(AdminLayout, { children: _jsxs(IonContent, { className: "ion-padding", children: [_jsx(MaterialReactTable, { columns: [
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
                            Cell: ({ row }) => (_jsx(IconButton, { onClick: () => handleOpenDeleteDialog(row.original.id), color: "error", children: _jsx(DeleteIcon, {}) })),
                        },
                    ], data: users, enableColumnFilters: false, enableSorting: false, enablePagination: false }), _jsxs(Dialog, { open: openDeleteDialog, onClose: handleCloseDeleteDialog, children: [_jsx(DialogTitle, { children: "Confirm Deletion" }), _jsx(DialogContent, { children: _jsx("p", { children: "Are you sure you want to delete this user?" }) }), _jsxs(DialogActions, { children: [_jsx(Button, { onClick: handleCloseDeleteDialog, color: "primary", children: "Cancel" }), _jsx(Button, { onClick: handleDeleteUser, color: "error", children: "Delete" })] })] }), _jsx(Snackbar, { open: openSnackbar, autoHideDuration: 6000, onClose: () => setOpenSnackbar(false), message: snackbarMessage })] }) }));
};
export default UserPage;
