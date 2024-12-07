import React, { useState } from "react";
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
import { Stage, Layer, Rect, Text, Group } from "react-konva";
import "./Kalkulator.css";
import Navbar from "../../components/Navbar/Navbar";

const Calculator: React.FC = () => {
  const [length, setLength] = useState<number>(0);
  const [width, setWidth] = useState<number>(0);
  const [spacing, setSpacing] = useState<number>(0);
  const [result, setResult] = useState<{
    area: number;
    plantCount: number;
  } | null>(null);
  const [plantLayout, setPlantLayout] = useState<Konva.Vector2d[]>([]);

  const spacingOptions = [
    { value: 40, label: "40 (Jagung)" },
    { value: 50, label: "50 (Semangka)" },
    { value: 30, label: "30 (Kumis Kucing)" },
    { value: 25, label: "25 (Jahe)" },
    { value: 60, label: "60 (Cabai Rawit)" },
  ];

  const calculatePlanting = () => {
    if (length > 0 && width > 0 && spacing > 0) {
      const area = length * width;
      const rowSpacing = spacing / 100;
      const columnSpacing = spacing / 100;

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
    }
  };

  const renderPlantLayout = () => {
    const stageWidth = 300;
    const stageHeight = 200;
    const scaleX = stageWidth / length;
    const scaleY = stageHeight / width;
    const scale = Math.min(scaleX, scaleY);

    return (
      <Stage width={stageWidth} height={stageHeight}>
        <Layer>
          <Rect
            x={0}
            y={0}
            width={length * scale}
            height={width * scale}
            stroke="black"
            strokeWidth={2}
            fill="transparent"
          />
          {plantLayout.map((pos, index) => (
            <Group key={index}>
              <Rect
                x={pos.x * scale}
                y={pos.y * scale}
                width={10}
                height={10}
                fill="green"
                stroke="darkgreen"
              />
            </Group>
          ))}
        </Layer>
      </Stage>
    );
  };

  return (
    <IonPage>
      <IonHeader>
        <Navbar />
        <IonToolbar>
          <IonTitle>Calculator Jarak Tanam</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonCard>
          <IonCardContent>
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
              <label htmlFor="spacingSelect">Pilih Jarak Tanam</label>
              <select
                id="spacingSelect"
                value={spacing}
                onChange={(e) => setSpacing(Number(e.target.value))}
              >
                <option value="" disabled>
                  Pilih Jarak Tanam (cm)
                </option>
                {spacingOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
            <IonButton onClick={calculatePlanting} expand="block">
              Hitung Jarak Tanam
            </IonButton>

            {result && (
              <div>
                <p>Luas Area: {result.area.toFixed(2)} m²</p>
                <p>Jumlah Tanaman: {result.plantCount}</p>
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
