import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useState, useRef } from "react";
import { IonContent, IonToolbar, IonTitle, IonInput, IonButton, IonCard, IonCardContent, } from "@ionic/react";
import { Stage, Layer, Rect, Group, Image as KonvaImage } from "react-konva";
import "./Kalkulator.css";
import { MainLayout } from "../../layouts/MainLayout";
const Calculator = () => {
    const [length, setLength] = useState(0);
    const [width, setWidth] = useState(0);
    const [spacing, setSpacing] = useState("");
    const [customSpacing, setCustomSpacing] = useState(0);
    const [uploadedImage, setUploadedImage] = useState(null);
    const [uploadedFileName, setUploadedFileName] = useState(null);
    const [result, setResult] = useState(null);
    const [plantLayout, setPlantLayout] = useState([]);
    const [editablePlantLayout, setEditablePlantLayout] = useState([]);
    const fileInputRef = useRef(null);
    const stageRef = useRef(null);
    // Pilihan jarak tanam
    const spacingOptions = [
        { value: 40, label: "40 (Jagung)" },
        { value: 50, label: "50 (Semangka)" },
        { value: 30, label: "30 (Kumis Kucing)" },
        { value: 25, label: "25 (Jahe)" },
        { value: 60, label: "60 (Cabai Rawit)" },
    ];
    // Fungsi untuk mengunggah gambar lokasi tanam
    const handleImageUpload = (event) => {
        const file = event.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                const img = new Image();
                img.onload = () => {
                    setUploadedImage(img);
                    setUploadedFileName(file.name);
                };
                img.src = reader.result;
            };
            reader.readAsDataURL(file);
        }
    };
    // Fungsi untuk menghitung area dan jumlah tanaman berdasarkan input
    const calculatePlanting = () => {
        const chosenSpacing = spacing === "manual" ? customSpacing : Number(spacing);
        if (length > 0 && width > 0 && chosenSpacing > 0) {
            const area = length * width;
            const rowSpacing = chosenSpacing / 100;
            const columnSpacing = chosenSpacing / 100;
            const rows = Math.floor(width / rowSpacing);
            const columns = Math.floor(length / columnSpacing);
            const plantCount = rows * columns;
            const layout = [];
            for (let y = 0; y < rows; y++) {
                for (let x = 0; x < columns; x++) {
                    layout.push({
                        x: x * columnSpacing,
                        y: y * rowSpacing,
                    });
                }
            }
            setResult({ area, plantCount });
            setPlantLayout(layout);
            setEditablePlantLayout([...layout]);
        }
    };
    // Fungsi untuk menghapus tanaman dari layout
    const removePlant = (indexToRemove) => {
        const updatedLayout = editablePlantLayout.filter((_, index) => index !== indexToRemove);
        setEditablePlantLayout(updatedLayout);
    };
    // Fungsi untuk mengunduh gambar layout tanaman
    const downloadImage = () => {
        if (stageRef.current) {
            // Konversi stage menjadi data URL
            const dataURL = stageRef.current.toDataURL({
                mimeType: "image/png",
                quality: 1,
                pixelRatio: 2, // Meningkatkan kualitas gambar
            });
            // Buat elemen link untuk download
            const link = document.createElement("a");
            link.download = `Layout_Tanaman_${length}x${width}m.png`;
            link.href = dataURL;
            link.click();
        }
    };
    // Fungsi untuk merender layout tanaman
    const renderPlantLayout = () => {
        // Ukuran stage sesuai dengan dimensi input
        const stageWidth = 800; // Lebar tetap 800px
        const stageHeight = (width / length) * 800; // Tinggi disesuaikan dengan rasio dimensi
        // Hitung skala untuk penyesuaian gambar dan tanaman
        const scaleX = stageWidth / length;
        const scaleY = stageHeight / width;
        return (_jsxs(_Fragment, { children: [_jsx(Stage, { ref: stageRef, width: stageWidth, height: stageHeight, children: _jsxs(Layer, { children: [uploadedImage && (_jsx(KonvaImage, { image: uploadedImage, x: 0, y: 0, width: stageWidth, height: stageHeight })), editablePlantLayout.map((pos, index) => (_jsx(Group, { onClick: () => removePlant(index), children: _jsx(Rect, { x: pos.x * scaleX, y: pos.y * scaleY, width: 13, height: 13, fill: "red", stroke: "red", shadowBlur: 5, shadowColor: "black", shadowOpacity: 0.5 }) }, index)))] }) }), _jsx(IonButton, { onClick: downloadImage, expand: "block", className: "mt-3", children: "Unduh Hasil Layout" })] }));
    };
    return (_jsxs(MainLayout, { children: [_jsx(IonToolbar, { color: "primary", className: "text-white", children: _jsx(IonTitle, { className: "font-bold", children: "Kalkulator Jarak Tanam" }) }), _jsx(IonContent, { children: _jsx(IonCard, { children: _jsxs(IonCardContent, { children: [_jsxs("div", { className: "image-upload-container", children: [_jsx("input", { type: "file", accept: "image/*", ref: fileInputRef, style: { display: "none" }, onChange: handleImageUpload }), _jsx(IonButton, { onClick: () => fileInputRef.current?.click(), children: "Unggah Foto Lokasi Tanam" }), uploadedFileName && _jsxs("p", { children: ["File terunggah: ", uploadedFileName] })] }), _jsx(IonInput, { value: length, onIonChange: (e) => setLength(Number(e.detail.value)), type: "number", label: "Panjang Lokasi Tanam (m)", labelPlacement: "floating" }), _jsx(IonInput, { value: width, onIonChange: (e) => setWidth(Number(e.detail.value)), type: "number", label: "Lebar Lokasi Tanam (m)", labelPlacement: "floating" }), _jsxs("div", { className: "custom-dropdown", children: [_jsx("label", { htmlFor: "spacingSelect", children: "Jarak Tanam (cm)" }), _jsxs("select", { id: "spacingSelect", value: spacing, onChange: (e) => setSpacing(e.target.value), children: [_jsx("option", { value: "", disabled: true, children: "Pilih jarak tanam sesuai" }), spacingOptions.map((option) => (_jsx("option", { value: option.value, children: option.label }, option.value))), _jsx("option", { value: "manual", children: "Lainnya" })] }), spacing === "manual" && (_jsx(IonInput, { value: customSpacing, onIonChange: (e) => setCustomSpacing(Number(e.detail.value)), type: "number", label: "Masukkan Jarak Tanam (cm)", labelPlacement: "floating" }))] }), _jsx(IonButton, { onClick: calculatePlanting, expand: "block", children: "Hitung Jarak Tanam" }), result && (_jsxs("div", { children: [_jsxs("p", { children: ["Luas Lokasi Tanam: ", result.area.toFixed(2), " m\u00B2"] }), _jsxs("p", { children: ["Jumlah Tanaman: ", editablePlantLayout.length, " batang"] }), _jsx("p", { children: "*Klik titik hijau untuk menghapus tanaman" }), renderPlantLayout()] }))] }) }) })] }));
};
export default Calculator;
