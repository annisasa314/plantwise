import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useEffect } from "react";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../../../firebase";
import { IonContent, IonSearchbar, IonTitle, IonToolbar } from "@ionic/react";
import { MainLayout } from "../../layouts/MainLayout";
const Panduan = () => {
    const [tutorials, setTutorials] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedTutorial, setSelectedTutorial] = useState(null);
    useEffect(() => {
        const unsubscribe = onSnapshot(collection(db, "tutorials"), (snapshot) => {
            const data = [];
            snapshot.forEach((doc) => {
                data.push({ id: doc.id, ...doc.data() });
            });
            setTutorials(data);
        });
        return unsubscribe;
    }, []);
    // Group tutorials by category
    const groupedTutorials = tutorials.reduce((acc, tutorial) => {
        if (!acc[tutorial.category]) {
            acc[tutorial.category] = [];
        }
        acc[tutorial.category].push(tutorial);
        return acc;
    }, {});
    // Filter tutorials based on search query
    const filteredTutorials = Object.keys(groupedTutorials).reduce((acc, category) => {
        const filteredByCategory = groupedTutorials[category].filter((tutorial) => tutorial.title.toLowerCase().includes(searchQuery.toLowerCase()));
        if (filteredByCategory.length > 0) {
            acc[category] = filteredByCategory;
        }
        return acc;
    }, {});
    return (_jsx(MainLayout, { children: _jsxs(IonContent, { children: [_jsx(IonToolbar, { color: "primary", className: "text-white pl-8", children: _jsx(IonTitle, { className: "font-bold", children: "Panduan Tanam" }) }), _jsxs("div", { className: "bg-gray-100 p-4", children: [_jsx(IonSearchbar, { value: searchQuery, debounce: 500, onIonInput: (e) => setSearchQuery(e.detail.value), placeholder: "Cari Tanaman...", className: "rounded-lg shadow-sm pb-8 pr-8 pl-8" }), _jsx("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8", children: selectedTutorial ? (_jsxs("div", { className: "bg-white shadow-lg rounded-lg p-6", children: [_jsx("h2", { className: "text-2xl font-bold mb-4", children: selectedTutorial.title }), _jsx("img", { src: selectedTutorial.image, alt: selectedTutorial.title, className: "mb-4 rounded-lg" }), selectedTutorial.sections.map((section, sectionIndex) => (_jsxs("div", { className: "mb-6", children: [_jsx("h3", { className: "text-lg font-medium mb-2 text-[#2f4b26]", children: section.heading }), Array.isArray(section.content) ? (_jsx("ul", { className: "list-disc pl-6 text-gray-600 space-y-2", children: section.content.map((line, lineIndex) => (_jsx("li", { children: line }, lineIndex))) })) : (_jsx("p", { className: "text-gray-600", children: section.content }))] }, sectionIndex))), _jsx("button", { onClick: () => setSelectedTutorial(null), className: "mt-6 px-4 py-2 bg-[#2f4b26] text-white rounded-md", children: "Kembali ke Daftar" })] })) : (
                            // If no tutorial is selected, show the list of tutorials grouped by category
                            Object.keys(filteredTutorials).map((category) => (_jsxs("div", { className: "mb-12", children: [_jsx("h2", { className: "text-xl font-semibold text-[#2f4b26] mb-4", children: "Panduan Tanam " + category }), _jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4", children: filteredTutorials[category].map((tutorial) => (_jsx("div", { className: "mb-6", children: _jsxs("div", { className: "bg-white shadow-md rounded-md p-4 cursor-pointer", onClick: () => setSelectedTutorial(tutorial), children: [_jsx("img", { src: tutorial.image, alt: tutorial.title, className: "w-full h-56 object-cover mb-4 rounded-md" }), _jsx("h3", { className: "font-normal text-lg text-[#2f4b26]", children: tutorial.title }), _jsx("p", { className: "text-sm text-gray-600", children: "Lihat Panduan" })] }) }, tutorial.id))) })] }, category)))) })] })] }) }));
};
export default Panduan;
