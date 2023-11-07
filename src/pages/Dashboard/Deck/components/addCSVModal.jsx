import { data } from 'jquery'
import React, { useRef, useState } from 'react';
import Papa from 'papaparse';
import api from "../../../../services/api";

function AddCSVModal({ isOpen, onClose }) {
  if (!isOpen) {
    return null; // No renderizar nada si el modal está cerrado
  }

  const fileInputRef = useRef(null);
  const [csvData, setCSVData] = useState(null);
  const [jsonData, setJSONData] = useState(null);

  const handleOnFileLoad = (data) => {
    Papa.parse(data, {
        header: true,
        skipEmptyLines: true,
        complete: function (results) {
            const firstRow = results.data[0];
      
            const setInfo = {
                owner: "65271ded1b74b55d239c01eb",
                status: "inactive",
                name: firstRow.Nombre,
                description: firstRow.Descripcion,
            };
      
            const questions = results.data.map((row) => {
                let options = [];

                if (row.Opciones) {
                    options = row.Opciones.split(',').map(optionString => {
                        const trimmedOption = optionString.trim();
                        const isAnswer = trimmedOption.endsWith('(true)');
                        const optionText = trimmedOption.slice(0, -7);
              
                        return {
                            option: optionText,
                            answer: isAnswer,
                        };
                    });
                }
          
                return {
                    question: row.Pregunta,
                    options: options,
                    hint: row.Pista,
                };
            });
      
            const set = {
                ...setInfo,
                questions: questions,
            };
      
            setCSVData(set);
            console.log('CSV EN JSON ANTES DE IR A LA BD:', set);
        },
    });
};

  const handleConvertToJSON = async () => {
    if (csvData) {
      try {
        const response = await api.post('/set', csvData);
        console.log('Conjunto creado con éxito:', response.data);
      } catch (error) {
        console.error('Error al crear el conjunto:', error);
      }
    } else {
      console.error('NO EXISTE CSV.');
    }
  };

  const handleFileInputChange = (event) => {
    const file = event.target.files[0];
    if (file && file.type === 'text/csv') {
      const reader = new FileReader();
      reader.onload = function (e) {
        const csvText = e.target.result;
        handleOnFileLoad(csvText);  // Pasar csvText directamente
      };
            
      reader.readAsText(file);
    } else {
      console.error('Por favor, seleccione un archivo CSV válido.');
    }
  };
  

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 backdrop-blur-sm top-0 left-0 right-0 bottom-0 flex items-center justify-center">
      <div className="bg-white p-4 rounded-2xl shadow-lg relative w-full max-w-md max-h-full">
        <button onClick={onClose} type="button" className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-hide="crypto-modal">
          <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
          </svg>
          <span className="sr-only">Close modal</span>
        </button>
        <div className="px-6 py-4 border-b rounded-t dark:border-gray-600">
          <h3 className="text-base font-semibold text-gray-900 lg:text-xl dark:text-white">
            Upload or Drag CSV 
          </h3>
        </div>
        <div className="flex items-center justify-center w-full">
          <label htmlFor="dropzone-file" className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover-bg-gray-100 dark-border-gray-600 dark-hover-border-gray-500 dark-hover-bg-gray-600">
            <div className="flex flex-col items-center justify-center pt-5 pb-6">
              <svg className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2" />
              </svg>
              <p className="mb-2 text-sm text-gray-500 dark:text-gray-400"><span className="font-semibold">Click to upload</span></p>
              <p className="text-xs text-gray-500 dark:text-gray-400">CSV</p>
            </div>
            <input id="dropzone-file" type="file" accept=".csv" className="hidden" ref={fileInputRef} onChange={handleFileInputChange} />
          </label>
        </div>
        <div>
          <a className="inline-flex items-center mt-5 text-xs font-normal text-gray-500 hover:underline dark:text-gray-400">
            <svg className="w-3 h-3 mr-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
              <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7.529 7.988a2.502 2.502 0 0 1 5 .191A2.441 2.441 0 0 1 10 10.582V12m-.01 3.008H10M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
            </svg>
            Si esta su archivo cumple con los puntos anteriores para solicitar la creación de preguntas, adjunte su archivo
          </a>
        </div>
        <div className="flex items-center p-5 space-x-2 border-gray-200 rounded-b dark:border-gray-600">
          <button onClick={handleConvertToJSON} type="button" className="text-white bg-gray-800 hover-bg-blue-800 focus-ring-4 focus-outline-none focus-ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark-bg-blue-600 dark-hover-bg-blue-700 dark-focus-ring-blue-800">
            Solicitar
          </button>
          <button onClick={onClose} type="button" className="text-gray-500 bg-white hover-bg-gray-100 focus-ring-4 focus-outline-none focus-ring-gray-200 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover-text-red-900 focus-z-10 dark-bg-gray-700 dark-text-gray-300 dark-border-gray-500 dark-hover-text-white dark-hover-bg-gray-600 dark-focus-ring-gray-600">
            Cancelar
          </button>
        </div>
      </div>
    </div>
  );
}

export default AddCSVModal;
