import React, { useState, useRef, useEffect } from "react";
import {
  IonContent,
  IonHeader,
  IonPage,
  IonToolbar,
  IonTitle,
  IonInput,
  IonButton,
  IonCard,
  IonCardContent,
} from "@ionic/react";
import Konva from "konva";

import { Stage, Layer, Rect, Group, Image as KonvaImage } from "react-konva";
import Navbar from "../../components/Navbar/Navbar";

import "./Kalkulator.css";

const Calculator: React.FC = () => {
  const [length, setLength] = useState<number>(0);
  const [width, setWidth] = useState<number>(0);
  const [spacing, setSpacing] = useState<number | string>("");
  const [customSpacing, setCustomSpacing] = useState<number>(0);
  const [uploadedImage, setUploadedImage] = useState<HTMLImageElement | null>(
    null
  );
  const [uploadedFileName, setUploadedFileName] = useState<string | null>(null);
  const [result, setResult] = useState<{
    area: number;
    plantCount: number;
  } | null>(null);
  const [plantLayout, setPlantLayout] = useState<Konva.Vector2d[]>([]);
  const [editablePlantLayout, setEditablePlantLayout] = useState<
    Konva.Vector2d[]
  >([]);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const stageRef = useRef<any>(null);

  // Pilihan jarak tanam
  const spacingOptions = [
    { value: 40, label: "40 (Jagung)" },
    { value: 50, label: "50 (Semangka)" },
    { value: 30, label: "30 (Kumis Kucing)" },
    { value: 25, label: "25 (Jahe)" },
    { value: 60, label: "60 (Cabai Rawit)" },
  ];

  // Fungsi untuk mengunggah gambar lokasi tanam
  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const img = new Image();
        img.onload = () => {
          setUploadedImage(img);
          setUploadedFileName(file.name);
        };
        img.src = reader.result as string;
      };
      reader.readAsDataURL(file);
    }
  };

  // Fungsi untuk menghitung area dan jumlah tanaman berdasarkan input
  const calculatePlanting = () => {
    const chosenSpacing =
      spacing === "manual" ? customSpacing : Number(spacing);

    if (length > 0 && width > 0 && chosenSpacing > 0) {
      const area = length * width;
      const rowSpacing = chosenSpacing / 100;
      const columnSpacing = chosenSpacing / 100;

      const rows = Math.floor(width / rowSpacing);
      const columns = Math.floor(length / columnSpacing);
      const plantCount = rows * columns;

      const layout: Konva.Vector2d[] = [];
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
  const removePlant = (indexToRemove: number) => {
    const updatedLayout = editablePlantLayout.filter(
      (_, index) => index !== indexToRemove
    );
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

    return (
      <>
        <Stage ref={stageRef} width={stageWidth} height={stageHeight}>
          <Layer>
            {/* Render gambar yang diunggah sebagai latar belakang */}
            {uploadedImage && (
              <KonvaImage
                image={uploadedImage}
                x={0}
                y={0}
                width={stageWidth}
                height={stageHeight}
              />
            )}

            {/* Layout tanaman yang dapat diedit */}
            {editablePlantLayout.map((pos, index) => (
              <Group key={index} onClick={() => removePlant(index)}>
                <Rect
                  x={pos.x * scaleX}
                  y={pos.y * scaleY}
                  width={13} // Ukuran titik tanaman
                  height={13}
                  fill="red"
                  stroke="red"
                  shadowBlur={5}
                  shadowColor="black"
                  shadowOpacity={0.5}
                />
              </Group>
            ))}
          </Layer>
        </Stage>

        {/* Tombol Download */}
        <IonButton onClick={downloadImage} expand="block" className="mt-3">
          Unduh Hasil Layout
        </IonButton>
      </>
    );
  };

  return (
    <IonPage>
      <Navbar />
      <IonToolbar color="primary" className="text-white">
          <IonTitle className="font-bold">Kalkulator Jarak Tanam</IonTitle>
        </IonToolbar>
      <IonContent>
        <IonCard>
          <IonCardContent>
            {/* Bagian Unggah Gambar */}
            <div className="image-upload-container">
              <input
                type="file"
                accept="image/*"
                ref={fileInputRef}
                style={{ display: "none" }}
                onChange={handleImageUpload}
              />
              <IonButton onClick={() => fileInputRef.current?.click()}>
                Unggah Foto Lokasi Tanam
              </IonButton>
              {uploadedFileName && <p>File terunggah: {uploadedFileName}</p>}
            </div>

            <IonInput
              value={length}
              onIonChange={(e) => setLength(Number(e.detail.value!))}
              type="number"
              label="Panjang Lokasi Tanam (m)"
              labelPlacement="floating"
            />
            <IonInput
              value={width}
              onIonChange={(e) => setWidth(Number(e.detail.value!))}
              type="number"
              label="Lebar Lokasi Tanam (m)"
              labelPlacement="floating"
            />
            <div className="custom-dropdown">
              <label htmlFor="spacingSelect">Jarak Tanam (cm)</label>
              <select
                id="spacingSelect"
                value={spacing}
                onChange={(e) => setSpacing(e.target.value)}
              >
                <option value="" disabled>
                  Pilih jarak tanam sesuai
                </option>
                {spacingOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
                <option value="manual">Lainnya</option>
              </select>

              {spacing === "manual" && (
                <IonInput
                  value={customSpacing}
                  onIonChange={(e) => setCustomSpacing(Number(e.detail.value!))}
                  type="number"
                  label="Masukkan Jarak Tanam (cm)"
                  labelPlacement="floating"
                />
              )}
            </div>
            <IonButton onClick={calculatePlanting} expand="block">
              Hitung Jarak Tanam
            </IonButton>

            {result && (
              <div>
                <p>Luas Lokasi Tanam: {result.area.toFixed(2)} m²</p>
                <p>Jumlah Tanaman: {editablePlantLayout.length} batang</p>
                <p>*Klik titik hijau untuk menghapus tanaman</p>
                {renderPlantLayout()}
              </div>
            )}
          </IonCardContent>
        </IonCard>
      </IonContent>
    </IonPage>
  );
};

export default Calculator;
