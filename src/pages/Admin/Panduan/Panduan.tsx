import React, { useState, useEffect } from "react";
import { collection, onSnapshot, deleteDoc, doc } from "firebase/firestore";
import { db } from "../../../../firebase";
import {
  IonContent,
  IonButton,
  IonSearchbar,
  IonModal,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonButtons,
  IonIcon,
} from "@ionic/react";
import {
  pencilOutline,
  trashOutline,
  addOutline,
  searchOutline,
  bookOutline,
} from "ionicons/icons";
import { useHistory } from "react-router-dom";
import AdminLayout from "../../../layouts/AdminLayout";

type TutorialCard = {
  id: string;
  title: string;
  image: string;
  category: string;
  description?: string;
};

const AdminTutorials: React.FC = () => {
  const [tutorialCards, setTutorialCards] = useState<TutorialCard[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [groupedTutorials, setGroupedTutorials] = useState<
    Record<string, TutorialCard[]>
  >({});
  const [selectedTutorial, setSelectedTutorial] = useState<TutorialCard | null>(
    null
  );
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const history = useHistory();

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "tutorials"), (snapshot) => {
      const data: TutorialCard[] = [];
      snapshot.forEach((doc) => {
        data.push({
          id: doc.id,
          title: doc.data().title,
          image: doc.data().image,
          category: doc.data().category,
          description: doc.data().description || "Tidak ada deskripsi",
        });
      });
      setTutorialCards(data);
      groupByCategory(data);
    });

    return unsubscribe;
  }, []);

  // Group tutorials by category
  const groupByCategory = (tutorials: TutorialCard[]) => {
    const grouped = tutorials.reduce((acc, tutorial) => {
      if (!acc[tutorial.category]) {
        acc[tutorial.category] = [];
      }
      acc[tutorial.category].push(tutorial);
      return acc;
    }, {} as Record<string, TutorialCard[]>);

    setGroupedTutorials(grouped);
  };

  // Filter tutorials based on the search query
  const filteredTutorials = Object.keys(groupedTutorials).reduce(
    (acc, category) => {
      const filteredByCategory = groupedTutorials[category].filter((tutorial) =>
        tutorial.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
      if (filteredByCategory.length > 0) {
        acc[category] = filteredByCategory;
      }
      return acc;
    },
    {} as Record<string, TutorialCard[]>
  );

  const navigateToEdit = (id: string) => {
    history.push(`/admin/panduan/edit/${id}`);
  };

  const handleDeleteConfirmation = (tutorial: TutorialCard) => {
    setSelectedTutorial(tutorial);
    setIsDeleteModalOpen(true);
  };

  const handleDelete = async () => {
    if (selectedTutorial) {
      const tutorialRef = doc(db, "tutorials", selectedTutorial.id);
      await deleteDoc(tutorialRef);
      setIsDeleteModalOpen(false);
      setSelectedTutorial(null);
    }
  };

  // Navigate to the PanduanForm for adding a new tutorial
  const navigateToAdd = () => {
    history.push("/admin/panduan/add");
  };

  return (
    <AdminLayout>
      <IonContent className="bg-gray-50 ion-padding">
        <div className="container mx-auto">
          <h1 className="text-3xl font-semibold text-center border-b p-2 text-gray-800 mb-6">
            Panduan Management
          </h1>

          <div className="flex justify-between items-center mb-4 pl-6">
            <IonSearchbar
              value={searchQuery}
              debounce={300}
              onIonInput={(e) => setSearchQuery(e.detail.value!)}
              placeholder="Cari Tutorial..."
              className="flex-1" // Menambahkan class flex-1 agar search bar mengisi ruang yang tersisa
            ></IonSearchbar>

            <IonButton
              color="primary"
              onClick={navigateToAdd}
              className="ml-4 flex items-center" // Memberikan jarak antara tombol dan search bar
            >
              <IonIcon icon={addOutline} className="mr-2" />{" "}
              {/* Menambahkan margin di kanan icon */}
              Tambah
            </IonButton>
          </div>

          {Object.keys(filteredTutorials).length === 0 ? (
            <div className="text-center text-gray-500 p-8">
              Tidak ada tutorial ditemukan
            </div>
          ) : (
            Object.keys(filteredTutorials).map((category) => (
              <div key={category} className="mb-8">
                <h2 className="text-2xl font-semibold text-green-700 mb-4 border-b pb-2 pl-8">
                  Panduan Tanam {category}
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pl-8">
                  {filteredTutorials[category].map((tutorial) => (
                    <div
                      key={tutorial.id}
                      className="bg-white rounded-lg shadow-md overflow-hidden transition-all duration-300 hover:shadow-xl"
                    >
                      <div className="relative">
                        <img
                          src={tutorial.image}
                          alt={tutorial.title}
                          className="w-full h-48 object-cover"
                        />
                        <div className="absolute top-2 right-2 flex space-x-2">
                          <button
                            onClick={() => navigateToEdit(tutorial.id)}
                            className="bg-blue-500 text-white p-2 rounded-full hover:bg-blue-600 transition"
                          >
                            <IonIcon icon={pencilOutline} />
                          </button>
                          <button
                            onClick={() => handleDeleteConfirmation(tutorial)}
                            className="bg-red-500 text-white p-2 rounded-full hover:bg-red-600 transition"
                          >
                            <IonIcon icon={trashOutline} />
                          </button>
                        </div>
                      </div>
                      <div className="p-4">
                        <h3 className="text-xl font-bold text-green-800 mb-2">
                          {tutorial.title}
                        </h3>
                        <p className="text-gray-600 text-sm mb-2">
                          Kategori: {tutorial.category}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))
          )}

          {/* Delete Confirmation Modal */}
          <IonModal
            isOpen={isDeleteModalOpen}
            onDidDismiss={() => setIsDeleteModalOpen(false)}
            className="delete-modal"
          >
            <IonHeader>
              <IonToolbar>
                <IonTitle>Konfirmasi Hapus</IonTitle>
                <IonButtons slot="end">
                  <IonButton onClick={() => setIsDeleteModalOpen(false)}>
                    Batal
                  </IonButton>
                </IonButtons>
              </IonToolbar>
            </IonHeader>
            <div className="p-6 text-center">
              <h2 className="text-xl mb-4">
                Apakah Anda yakin ingin menghapus tutorial?
              </h2>
              <p className="text-gray-600 mb-6">
                Tutorial "{selectedTutorial?.title}" akan dihapus permanen
              </p>
              <div className="flex justify-center space-x-4">
                <IonButton
                  color="light"
                  onClick={() => setIsDeleteModalOpen(false)}
                >
                  Batal
                </IonButton>
                <IonButton color="danger" onClick={handleDelete}>
                  Hapus
                </IonButton>
              </div>
            </div>
          </IonModal>
        </div>
      </IonContent>
    </AdminLayout>
  );
};

export default AdminTutorials;
