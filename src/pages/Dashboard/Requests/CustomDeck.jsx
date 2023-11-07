import HeaderNav from "../../../components/HeaderNav";
import React, { useState } from 'react'; // Import useState
import CSVadd from '../Deck/components/addCSVModal';


export default function CustomDeck() {

  const [selectedFile, setSelectedFile] = useState(null); // State to store the selected file
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleFileSelect = (fileData) => {
    setSelectedFile(fileData);
  };

  const csvFileName = "plantilla.csv";

  const handleDownloadTemplate = () => {
    // Crear un elemento de anclaje temporal
    const anchor = document.createElement('a');
    anchor.href = '/ruta/hacia/plantilla.csv'; // Reemplaza con la ruta correcta
    anchor.download = 'plantilla.csv';

    // Simular un clic en el enlace para iniciar la descarga
    anchor.click();
  };

  return (
    <div
      id="requestSet"
      className="hidden overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full"
      tabIndex="-1"
      aria-hidden="true"
    >
      <div className="relative p-4 w-full max-w-2xl max-h-full">
        <div className="relative p-4 bg-white rounded-lg shadow dark:bg-gray-800 sm:p-5">
          <div className="text-2xl font-bold text-center">
            Solicitar deck personalizado
          </div>
          <div className="p-4 md:p-8">
            <p className="text-3xl font-bold mb-6">
              Cómo Pedir la Creación de un Conjunto de Preguntas:
            </p>
            <p className="text-lg font-semibold mb-4">
              1. Prepara un archivo en formato CSV con las preguntas que deseas
              incluir en el conjunto, junto con cuatro opciones de respuesta para
              cada pregunta.
            </p>
            <p className="text-lg font-semibold mb-4">
              2. Indica cuál de las opciones es la respuesta correcta en el mismo
              archivo CSV.
            </p>
            <p className="text-lg font-semibold mb-4">
              3. Sube este archivo a nuestra plataforma.
            </p>
            <p className="text-lg font-semibold mb-4">
              4. Si lo prefieres, puedes descargar una plantilla de referencia
              desde la plataforma para asegurarte de que el formato sea correcto.
            </p>
            <p className="text-lg font-semibold mb-4">
              5. Nuestro equipo revisará tu archivo y procederá a crear el conjunto
              de preguntas con base en la información proporcionada.
            </p>
            <p className="text-2xl font-bold mt-6">
              Este proceso garantiza que tus preguntas se incorporen de manera
              precisa a nuestro sistema, lo que facilita la creación de conjuntos
              de preguntas personalizados.
            </p>
            <div className="w-full h-0.5 bg-slate-500 my-8" />
            <div className="flex flex-row w-full space-x-2">
              <div className="flex-1">
                <button className="bg-gray-500 rounded-full text-white w-full py-3">
                <a href={csvFile} download>Descargar plantilla</a>

                </button>
              </div>
              <div className="flex-1">
                <button onClick={openModal} className="bg-black rounded-full text-white w-full py-3 cursor-pointer">
                  Cargar Archivo
                </button>
                <CSVadd isOpen={isModalOpen} onClose={closeModal} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

  );
}