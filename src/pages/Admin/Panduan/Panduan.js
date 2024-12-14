import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useEffect } from "react";
import { collection, onSnapshot, deleteDoc, doc } from "firebase/firestore";
import { db } from "../../../../firebase";
import { IonContent, IonButton, IonSearchbar, IonModal, IonHeader, IonToolbar, IonTitle, IonButtons, IonIcon, } from "@ionic/react";
import { pencilOutline, trashOutline, addOutline, } from "ionicons/icons";
import { useHistory } from "react-router-dom";
import AdminLayout from "../../../layouts/AdminLayout";
const AdminTutorials = () => {
    const [tutorialCards, setTutorialCards] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [groupedTutorials, setGroupedTutorials] = useState({});
    const [selectedTutorial, setSelectedTutorial] = useState(null);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const history = useHistory();
    useEffect(() => {
        const unsubscribe = onSnapshot(collection(db, "tutorials"), (snapshot) => {
            const data = [];
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
    const groupByCategory = (tutorials) => {
        const grouped = tutorials.reduce((acc, tutorial) => {
            if (!acc[tutorial.category]) {
                acc[tutorial.category] = [];
            }
            acc[tutorial.category].push(tutorial);
            return acc;
        }, {});
        setGroupedTutorials(grouped);
    };
    // Filter tutorials based on the search query
    const filteredTutorials = Object.keys(groupedTutorials).reduce((acc, category) => {
        const filteredByCategory = groupedTutorials[category].filter((tutorial) => tutorial.title.toLowerCase().includes(searchQuery.toLowerCase()));
        if (filteredByCategory.length > 0) {
            acc[category] = filteredByCategory;
        }
        return acc;
    }, {});
    const navigateToEdit = (id) => {
        history.push(`/admin/panduan/edit/${id}`);
    };
    const handleDeleteConfirmation = (tutorial) => {
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
    return (_jsx(AdminLayout, { children: _jsx(IonContent, { className: "bg-gray-50 ion-padding", children: _jsxs("div", { className: "container mx-auto", children: [_jsx("h1", { className: "text-3xl font-semibold text-center border-b p-2 text-gray-800 mb-6", children: "Panduan Management" }), _jsxs("div", { className: "flex justify-between items-center mb-4 pl-6", children: [_jsx(IonSearchbar, { value: searchQuery, debounce: 300, onIonInput: (e) => setSearchQuery(e.detail.value), placeholder: "Cari Tutorial...", className: "flex-1" // Menambahkan class flex-1 agar search bar mengisi ruang yang tersisa
                             }), _jsxs(IonButton, { color: "primary", onClick: navigateToAdd, className: "ml-4 flex items-center" // Memberikan jarak antara tombol dan search bar
                                , children: [_jsx(IonIcon, { icon: addOutline, className: "mr-2" }), " ", "Tambah"] })] }), Object.keys(filteredTutorials).length === 0 ? (_jsx("div", { className: "text-center text-gray-500 p-8", children: "Tidak ada tutorial ditemukan" })) : (Object.keys(filteredTutorials).map((category) => (_jsxs("div", { className: "mb-8", children: [_jsxs("h2", { className: "text-2xl font-semibold text-green-700 mb-4 border-b pb-2 pl-8", children: ["Panduan Tanam ", category] }), _jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pl-8", children: filteredTutorials[category].map((tutorial) => (_jsxs("div", { className: "bg-white rounded-lg shadow-md overflow-hidden transition-all duration-300 hover:shadow-xl", children: [_jsxs("div", { className: "relative", children: [_jsx("img", { src: tutorial.image, alt: tutorial.title, className: "w-full h-48 object-cover" }), _jsxs("div", { className: "absolute top-2 right-2 flex space-x-2", children: [_jsx("button", { onClick: () => navigateToEdit(tutorial.id), className: "bg-blue-500 text-white p-2 rounded-full hover:bg-blue-600 transition", children: _jsx(IonIcon, { icon: pencilOutline }) }), _jsx("button", { onClick: () => handleDeleteConfirmation(tutorial), className: "bg-red-500 text-white p-2 rounded-full hover:bg-red-600 transition", children: _jsx(IonIcon, { icon: trashOutline }) })] })] }), _jsxs("div", { className: "p-4", children: [_jsx("h3", { className: "text-xl font-bold text-green-800 mb-2", children: tutorial.title }), _jsxs("p", { className: "text-gray-600 text-sm mb-2", children: ["Kategori: ", tutorial.category] })] })] }, tutorial.id))) })] }, category)))), _jsxs(IonModal, { isOpen: isDeleteModalOpen, onDidDismiss: () => setIsDeleteModalOpen(false), className: "delete-modal", children: [_jsx(IonHeader, { children: _jsxs(IonToolbar, { children: [_jsx(IonTitle, { children: "Konfirmasi Hapus" }), _jsx(IonButtons, { slot: "end", children: _jsx(IonButton, { onClick: () => setIsDeleteModalOpen(false), children: "Batal" }) })] }) }), _jsxs("div", { className: "p-6 text-center", children: [_jsx("h2", { className: "text-xl mb-4", children: "Apakah Anda yakin ingin menghapus tutorial?" }), _jsxs("p", { className: "text-gray-600 mb-6", children: ["Tutorial \"", selectedTutorial?.title, "\" akan dihapus permanen"] }), _jsxs("div", { className: "flex justify-center space-x-4", children: [_jsx(IonButton, { color: "light", onClick: () => setIsDeleteModalOpen(false), children: "Batal" }), _jsx(IonButton, { color: "danger", onClick: handleDelete, children: "Hapus" })] })] })] })] }) }) }));
};
export default AdminTutorials;
