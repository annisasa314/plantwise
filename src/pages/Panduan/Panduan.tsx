import React, { useState, useEffect } from "react";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../../../firebase";
import Navbar from "../../components/Navbar/Navbar";
import { IonContent } from "@ionic/react";

type Section = {
  heading: string;
  content: string | string[];
};

type Tutorial = {
  id: string;
  title: string;
  image: string;
  category: string;
  sections: Section[];
};

const Panduan: React.FC = () => {
  const [tutorials, setTutorials] = useState<Tutorial[]>([]);
  const [selectedTutorial, setSelectedTutorial] = useState<Tutorial | null>(
    null
  );

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "tutorials"), (snapshot) => {
      const data: Tutorial[] = [];
      snapshot.forEach((doc) => {
        data.push({ id: doc.id, ...doc.data() } as Tutorial);
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
  }, {} as Record<string, Tutorial[]>);

  return (
    <IonContent>
      <Navbar />{" "}
      <div className="bg-gray-100 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {selectedTutorial ? (
            // If a tutorial is selected, show the tutorial details
            <div className="bg-white shadow-lg rounded-lg p-6">
              <h2 className="text-2xl font-bold mb-4">
                {selectedTutorial.title}
              </h2>
              <img
                src={selectedTutorial.image}
                alt={selectedTutorial.title}
                className="mb-4 rounded-lg"
              />
              {selectedTutorial.sections.map((section, sectionIndex) => (
                <div key={sectionIndex} className="mb-6">
                  <h3 className="text-lg font-medium mb-2 text-[#2f4b26]">
                    {section.heading}
                  </h3>
                  {Array.isArray(section.content) ? (
                    <ul className="list-disc pl-6 text-gray-600 space-y-2">
                      {section.content.map((line, lineIndex) => (
                        <li key={lineIndex}>{line}</li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-gray-600">{section.content}</p>
                  )}
                </div>
              ))}
              <button
                onClick={() => setSelectedTutorial(null)}
                className="mt-6 px-4 py-2 bg-[#2f4b26] text-white rounded-md"
              >
                Kembali ke Daftar
              </button>
            </div>
          ) : (
            // If no tutorial is selected, show the list of tutorials grouped by category
            Object.keys(groupedTutorials).map((category) => (
              <div key={category} className="mb-12">
                <h2 className="text-2xl font-bold mb-4">{category}</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {groupedTutorials[category].map((tutorial) => (
                    <div key={tutorial.id} className="mb-6">
                      <div
                        className="bg-white shadow-md rounded-md p-4 cursor-pointer"
                        onClick={() => setSelectedTutorial(tutorial)}
                      >
                        <img
                          src={tutorial.image}
                          alt={tutorial.title}
                          className="w-full h-56 object-cover mb-4 rounded-md"
                        />
                        <h3 className="font-semibold text-lg text-[#2f4b26]">
                          {tutorial.title}
                        </h3>
                        <p className="text-sm text-gray-600">
                          {tutorial.category}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </IonContent>
  );
};

export default Panduan;
