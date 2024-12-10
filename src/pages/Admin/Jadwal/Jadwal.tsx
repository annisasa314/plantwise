import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom'; // Import useHistory
import { MaterialReactTable } from 'material-react-table';
import { Dialog, DialogActions, DialogContent, DialogTitle, Button, IconButton } from '@mui/material';
import { Edit, Delete } from '@mui/icons-material';
import { getJadwalTanam, deleteJadwalTanam } from '../../../services/auth.service';
import { IonPage, IonContent, IonButton } from '@ionic/react';
import Navbar from '../../../components/Navbar/Navbar';

const JadwalAdmin = () => {
  const history = useHistory(); // Initialize useHistory hook
  const [jadwalData, setJadwalData] = useState<any[]>([]);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [selectedJadwal, setSelectedJadwal] = useState<any | null>(null);

  // Fetch data from Firestore
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getJadwalTanam();
        setJadwalData(data);
      } catch (error) {
        console.error('Error fetching jadwal tanam: ', error);
      }
    };
    fetchData();
  }, []);

  // Handle delete confirmation
  const handleDelete = async () => {
    if (selectedJadwal) {
      try {
        await deleteJadwalTanam(selectedJadwal.id);
        setJadwalData(prevData => prevData.filter(jadwal => jadwal.id !== selectedJadwal.id));
        setOpenDeleteDialog(false);
      } catch (error) {
        console.error('Error deleting jadwal tanam: ', error);
      }
    }
  };

  const columns = [
    {
      accessorKey: 'jenis_tanaman',
      header: 'Kategori',
    },
    {
      accessorKey: 'nama_tanaman',
      header: 'Nama Tanaman',
    },
    {
      accessorKey: 'musim',
      header: 'Musim',
    },
    {
      accessorKey: 'waktu_penanaman',
      header: 'Waktu Tanam',
    },
    {
      id: 'actions',
      header: 'Actions',
      Cell: ({ row }: any) => (
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <IconButton 
            onClick={() => handleEdit(row.original)} 
            color="primary" 
            size="small"
          >
            <Edit />
          </IconButton>
          <IconButton 
            onClick={() => handleDeleteDialog(row)} 
            color="error" 
            size="small"
          >
            <Delete />
          </IconButton>
        </div>
      ),
    },
  ];

  const handleEdit = (jadwal: any) => {
    history.push(`/edit-jadwal/${jadwal.id}`); // Navigasi dengan ID
  };
  

  const handleDeleteDialog = (row: any) => {
    setSelectedJadwal(row.original);
    setOpenDeleteDialog(true);
  };

  const handleCloseDeleteDialog = () => {
    setOpenDeleteDialog(false);
    setSelectedJadwal(null);
  };

  // Navigasi ke halaman tambah jadwal
  const handleAddJadwal = () => {
    history.push('/tambah-jadwal'); // Rute menuju halaman tambah jadwal
  };

  return (
    <IonPage>
      <Navbar />
      <IonContent className="ion-padding">
        {/* Button "Add" di kanan atas */}
        <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '20px' }}>
          <IonButton onClick={handleAddJadwal}>Tambah Data</IonButton>
        </div>

        {/* Material React Table */}
        <MaterialReactTable columns={columns} data={jadwalData} />
        
        {/* Delete Confirmation Dialog */}
        <Dialog open={openDeleteDialog} onClose={handleCloseDeleteDialog}>
          <DialogTitle>Konfirmasi Penghapusan</DialogTitle>
          <DialogContent>
            <p>Apakah Anda yakin ingin menghapus jadwal tanam ini?</p>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseDeleteDialog} color="primary">Batal</Button>
            <Button onClick={handleDelete} color="error">Hapus</Button>
          </DialogActions>
        </Dialog>
      </IonContent>
    </IonPage>
  );
};

export default JadwalAdmin;
