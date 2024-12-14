import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useEffect } from "react";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../../../../firebase";
import { IonContent, IonButton, IonInput, IonTextarea } from "@ionic/react";
import { useParams, useHistory } from "react-router-dom";
import AdminLayout from "../../../layouts/AdminLayout";
const EditTutorial = () => {
    const [tutorial, setTutorial] = useState(null);
    const [title, setTitle] = useState("");
    const [image, setImage] = useState("");
    const [category, setCategory] = useState("");
    const [sections, setSections] = useState([
        { heading: "", content: "" },
    ]);
    const { id } = useParams();
    const history = useHistory();
    // Fetch tutorial data from Firestore
    useEffect(() => {
        const fetchTutorial = async () => {
            const docRef = doc(db, "tutorials", id);
            const docSnap = await getDoc(docRef);
            if (docSnap.exists()) {
                const data = docSnap.data();
                setTutorial(data);
                setTitle(data.title);
                setImage(data.image);
                setCategory(data.category);
                setSections(data.sections);
            }
        };
        fetchTutorial();
    }, [id]);
    // Handle updates to tutorial fields
    const handleUpdate = async () => {
        if (!title || !image || !category || sections.length === 0) {
            alert("Semua field harus diisi!");
            return;
        }
        try {
            const tutorialRef = doc(db, "tutorials", id);
            await updateDoc(tutorialRef, {
                title,
                image,
                category,
                sections,
            });
            alert("Tutorial berhasil diperbarui!");
            history.push("/admin/panduan");
        }
        catch (error) {
            console.error("Error updating document: ", error);
        }
    };
    // Handle changes to section fields
    const handleSectionChange = (index, field, value) => {
        const updatedSections = sections.map((section, i) => i === index ? { ...section, [field]: value } : section);
        setSections(updatedSections);
    };
    // Add new section to the tutorial
    const handleAddSection = () => {
        setSections([...sections, { heading: "", content: "" }]);
    };
    // Remove a section from the tutorial
    const handleRemoveSection = (index) => {
        setSections(sections.filter((_, i) => i !== index));
    };
    return tutorial ? (_jsx(AdminLayout, { children: _jsx(IonContent, { className: "bg-gray-100 p-6", children: _jsxs("form", { className: "bg-white shadow-lg rounded-md p-6 space-y-6 max-w-lg mx-auto", children: [_jsx("div", { children: _jsx(IonInput, { value: title, onIonChange: (e) => setTitle(e.detail.value), placeholder: "Judul Tutorial", className: "w-full p-3 border-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500", required: true }) }), _jsx("div", { children: _jsx(IonInput, { value: image, onIonChange: (e) => setImage(e.detail.value), placeholder: "URL Gambar", className: "w-full p-3 border-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500", required: true }) }), _jsx("div", { children: _jsx(IonInput, { value: category, onIonChange: (e) => setCategory(e.detail.value), placeholder: "Kategori", className: "w-full p-3 border-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500", required: true }) }), sections.map((section, index) => (_jsxs("div", { className: "mb-4", children: [_jsx(IonInput, { value: section.heading, onIonChange: (e) => handleSectionChange(index, "heading", e.detail.value), placeholder: `Heading ${index + 1}`, className: "w-full p-3 border-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 mb-2", required: true }), _jsx(IonTextarea, { value: Array.isArray(section.content)
                                    ? section.content.join("\n")
                                    : section.content, onIonChange: (e) => handleSectionChange(index, "content", e.detail.value.split("\n")), placeholder: `Konten ${index + 1}`, className: "w-full p-3 border-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500", rows: 3, required: true }), _jsx(IonButton, { color: "danger", onClick: () => handleRemoveSection(index), className: "mt-2", children: "Hapus Bagian" })] }, index))), _jsx(IonButton, { onClick: handleAddSection, expand: "block", className: "w-full bg-blue-500 text-white mt-2", children: "Tambah Bagian" }), _jsxs("div", { className: "flex justify-between gap-4 mt-4", children: [_jsx(IonButton, { color: "light", expand: "block", className: "w-full", onClick: () => history.push("/admin/panduan"), children: "Batal" }), _jsx(IonButton, { expand: "block", className: "w-full", onClick: handleUpdate, children: "Perbarui Tutorial" })] })] }) }) })) : (_jsx("div", { children: "Loading..." }));
};
export default EditTutorial;
