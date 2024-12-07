import React, { useState } from "react";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../../../firebase";
import { IonContent } from "@ionic/react";

type Section = {
  heading: string;
  content: string | string[];
};

const PanduanForm: React.FC = () => {
  const [title, setTitle] = useState("");
  const [image, setImage] = useState("");
  const [category, setCategory] = useState("");
  const [sections, setSections] = useState<Section[]>([
    { heading: "", content: "" },
  ]);

  const handleAddSection = () => {
    setSections([...sections, { heading: "", content: "" }]);
  };

  const handleSectionChange = (
    index: number,
    field: string,
    value: string | string[]
  ) => {
    const updatedSections = sections.map((section, i) =>
      i === index ? { ...section, [field]: value } : section
    );
    setSections(updatedSections);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!title || !image || !category || sections.length === 0) {
      alert("Semua field harus diisi!");
      return;
    }

    if (sections.some((section) => !section.heading || !section.content)) {
      alert("Semua bagian harus memiliki heading dan konten!");
      return;
    }
    try {
      await addDoc(collection(db, "tutorials"), {
        title,
        image,
        category,
        sections,
      });
      alert("Tutorial berhasil ditambahkan!");
      setTitle("");
      setImage("");
      setCategory("");
      setSections([{ heading: "", content: "" }]);
    } catch (error) {
      console.error("Error adding document: ", error);
    }
  };

  return (
    <IonContent>
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md rounded-md p-6 space-y-4"
      >
        <div>
          <label className="block mb-2 font-medium">Judul</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Masukkan judul tutorial"
            className="w-full bg-white border-gray-300 rounded-md p-2 focus:border-blue-500 focus:ring-blue-500"
            required
          />
        </div>

        <div>
          <label className="block mb-2 font-medium">URL Gambar</label>
          <input
            type="text"
            value={image}
            onChange={(e) => setImage(e.target.value)}
            placeholder="Masukkan URL gambar"
            className="w-full bg-white border-gray-300 rounded-md p-2 focus:border-blue-500 focus:ring-blue-500"
            required
          />
        </div>

        <div>
          <label className="block mb-2 font-medium">Kategori</label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full bg-white border-gray-300 rounded-md p-2 focus:border-blue-500 focus:ring-blue-500"
            required
          >
            <option value="" disabled>
              Pilih Kategori
            </option>
            <option value="Sayur">Sayur</option>
            <option value="Buah">Buah</option>
            <option value="Tanaman Obat">Tanaman Obat</option>
          </select>
        </div>

        <div>
          <label className="block mb-2 font-medium">Bagian</label>
          {sections.map((section, index) => (
            <div
              key={index}
              className="border-gray-300 bg-white rounded-md p-4 mb-2"
            >
              <input
                type="text"
                value={section.heading}
                onChange={(e) =>
                  handleSectionChange(index, "heading", e.target.value)
                }
                placeholder={`Heading ${index + 1}`}
                className="w-full border-b bg-white border-gray-300 mb-2 p-2 focus:border-blue-500"
                required
              />
              <textarea
                value={
                  Array.isArray(section.content)
                    ? section.content.join("\n")
                    : section.content
                }
                onChange={(e) =>
                  handleSectionChange(
                    index,
                    "content",
                    e.target.value.includes("\n")
                      ? e.target.value.split("\n")
                      : e.target.value
                  )
                }
                placeholder={`Konten ${index + 1}`}
                className="w-full bg-white border-gray-300 p-2 focus:border-blue-500"
                rows={3}
                required
              />
            </div>
          ))}
          <button
            type="button"
            onClick={handleAddSection}
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md"
          >
            Tambah Bagian
          </button>
        </div>

        <button
          type="submit"
          onClick={handleSubmit}
          className="w-full bg-blue-500 hover:bg-blue-600 text-white p-2 rounded-md"
        >
          Simpan Tutorial
        </button>
      </form>
    </IonContent>
  );
};

export default PanduanForm;
