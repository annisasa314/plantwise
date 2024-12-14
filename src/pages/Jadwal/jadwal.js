import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from "react";
import { IonContent, IonTitle, IonToolbar, IonCard, IonCardContent, IonLabel, IonItem, IonSelect, IonSelectOption, IonSearchbar, } from "@ionic/react";
import { getTanamanData } from "../../services/auth.service";
import { MainLayout } from "../../layouts/MainLayout";
import Footer from "../../components/Footer/Footer";
const Jadwal = () => {
    const [tanamanList, setTanamanList] = useState([]);
    const [jenisFilter, setJenisFilter] = useState("");
    const [musimFilter, setMusimFilter] = useState("");
    const [searchQuery, setSearchQuery] = useState("");
    useEffect(() => {
        const fetchTanamanData = async () => {
            const data = await getTanamanData(jenisFilter, musimFilter, searchQuery);
            setTanamanList(data);
        };
        fetchTanamanData();
    }, [jenisFilter, musimFilter, searchQuery]);
    return (_jsx(MainLayout, { children: _jsxs(IonContent, { children: [_jsx(IonToolbar, { color: "primary", className: "text-white pl-2", children: _jsx(IonTitle, { className: "font-bold", children: "Jadwal Tanam Ideal" }) }), _jsxs("div", { className: "p-4 space-y-4", children: [_jsx(IonSearchbar, { value: searchQuery, debounce: 500, onIonInput: (e) => setSearchQuery(e.detail.value), placeholder: "Cari Tanaman...", className: "rounded-lg shadow-sm" }), _jsxs("div", { className: "grid grid-cols-2 gap-4", children: [_jsxs(IonItem, { className: "bg-white rounded-lg shadow-sm", children: [_jsx(IonLabel, { className: "text-gray-600", children: "Jenis Tanaman" }), _jsxs(IonSelect, { value: jenisFilter, placeholder: "Pilih Jenis", onIonChange: (e) => setJenisFilter(e.detail.value), className: "text-green-700", children: [_jsx(IonSelectOption, { value: "Sayuran", children: "Sayuran" }), _jsx(IonSelectOption, { value: "Buah", children: "Buah" }), _jsx(IonSelectOption, { value: "Tanaman Obat", children: "Tanaman Obat" })] })] }), _jsxs(IonItem, { className: "bg-white rounded-lg shadow-sm", children: [_jsx(IonLabel, { className: "text-gray-600", children: "Musim" }), _jsxs(IonSelect, { value: musimFilter, placeholder: "Pilih Musim", onIonChange: (e) => setMusimFilter(e.detail.value), className: "text-green-700", children: [_jsx(IonSelectOption, { value: "Hujan", children: "Hujan" }), _jsx(IonSelectOption, { value: "Peralihan", children: "Peralihan" }), _jsx(IonSelectOption, { value: "Kemarau", children: "Kemarau" })] })] })] }), _jsx("div", { className: "space-y-4", children: tanamanList.map((tanaman) => (_jsx(IonCard, { className: "rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300", children: _jsx(IonCardContent, { className: "p-4", children: _jsxs("div", { className: "flex flex-col space-y-2", children: [_jsx("h2", { className: "text-xl font-bold text-green-800", children: tanaman.nama_tanaman }), _jsxs("div", { className: "text-gray-600 space-y-1", children: [_jsxs("p", { children: [_jsx("span", { className: "font-semibold", children: "Waktu Penanaman:" }), " ", tanaman.waktu_penanaman] }), _jsxs("p", { children: [_jsx("span", { className: "font-semibold", children: "Musim:" }), " ", tanaman.musim] }), _jsxs("p", { children: [_jsx("span", { className: "font-semibold", children: "Jenis:" }), " ", tanaman.jenis_tanaman] })] })] }) }) }, tanaman.id))) }), tanamanList.length === 0 && (_jsx("div", { className: "text-center text-gray-500 py-8", children: _jsx("p", { children: "Tidak ada tanaman ditemukan" }) }))] }), _jsx(Footer, {})] }) }));
};
export default Jadwal;
