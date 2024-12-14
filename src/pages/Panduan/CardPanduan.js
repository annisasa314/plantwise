import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useState, useEffect } from "react";
import { IonContent, IonHeader, IonToolbar, IonTitle, IonGrid, IonRow, IonCol, IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonImg, } from "@ionic/react";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../../../firebase";
import { useHistory } from "react-router-dom"; // Untuk navigasi ke detail tutorial
const ListCard = () => {
    const [tutorialCards, setTutorialCards] = useState([]);
    const history = useHistory(); // Menggunakan history untuk navigasi
    useEffect(() => {
        const unsubscribe = onSnapshot(collection(db, "tutorials"), (snapshot) => {
            const data = [];
            snapshot.forEach((doc) => {
                data.push({
                    id: doc.id,
                    title: doc.data().title,
                    image: doc.data().image,
                    category: doc.data().category,
                });
            });
            setTutorialCards(data);
        });
        return unsubscribe;
    }, []);
    // Fungsi untuk mengarahkan ke halaman tutorial
    const navigateToTutorial = (id) => {
        history.push(`/panduan/${id}`);
    };
    return (_jsxs(_Fragment, { children: [_jsx(IonHeader, { children: _jsx(IonToolbar, { children: _jsx(IonTitle, { className: "text-center text-2xl font-bold text-[#2f4b26]", children: "Daftar Tutorial" }) }) }), _jsx(IonContent, { children: _jsx(IonGrid, { className: "p-4", children: _jsx(IonRow, { children: tutorialCards.map((tutorial) => (_jsx(IonCol, { size: "12", sizeMd: "6", className: "mb-4", children: _jsxs(IonCard, { button: true, onClick: () => navigateToTutorial(tutorial.id), className: "shadow-md border border-gray-300 transform transition-all duration-300 hover:scale-105", children: [_jsx(IonCardHeader, { children: _jsx(IonCardTitle, { className: "font-bold text-lg text-[#2f4b26]", children: tutorial.title }) }), _jsxs(IonCardContent, { children: [_jsx(IonImg, { src: tutorial.image, alt: tutorial.title, className: "w-full h-56 object-cover mb-4 rounded-md" }), _jsx("p", { className: "text-sm text-gray-600", children: tutorial.category })] })] }) }, tutorial.id))) }) }) })] }));
};
export default ListCard;
