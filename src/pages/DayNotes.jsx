import React from "react";
import HeaderNav from "../components/HeaderNav";

export default function DayNotes() {
  return (
    <div className="min-h-screen flex flex-col overflow-hidden bg-slate-200">
      <HeaderNav SignIn />
      <div className="flex-grow flex flex-col items-center justify-center space-y-4 md:space-y-8 px-2 md:px-24 py-4">
        <div className="bg-white w-full h-20 rounded-full flex items-center px-8 font-bold text-lg md:text-2xl text-center">
          <p>Envío de "Notas del Día del Juego"</p>
        </div>
        <div className="bg-white w-full h-auto rounded-2xl flex flex-col p-8 md:p-16 space-y-4">
          <p className="font-bold text-xl">
            Para asegurarnos de que todos los invitados al juego estén bien
            preparados y tengan una experiencia enriquecedora, requerimos que
            envíes las "Notas del Día del Juego". Estas notas son apuntes que
            contienen información relevante sobre los temas que se tratarán
            durante el juego. Para hacerlo más sencillo, te explicamos cómo
            proceder:
          </p>
          <p className="font-bold text-2xl">Paso 1: Crear un Archivo CSV</p>
          <p className="font-bold">
            Primero, necesitas crear un archivo en formato CSV (Comma-Separated
            Values). Este archivo servirá como el medio para proporcionar las
            "Notas del Día del Juego". En el archivo CSV, cada fila deberá
            representar un tema o pregunta del juego, y las columnas contendrán
            detalles importantes
          </p>
          <p className="pl-8">
            1. Tema o Pregunta: En esta columna, escribe el tema o la pregunta
            que se abordará durante el juego.
          </p>
          <p className="pl-8">
            2. Información Adicional: Aquí puedes proporcionar detalles, hechos,
            o datos que ayuden a los invitados a entender mejor el tema o
            responder la pregunta.
          </p>
          <p className="font-bold text-2xl">Paso 2: Subir el Archivo </p>

          <p className="font-bold">
            Una vez que hayas completado tu archivo CSV con las "Notas del Día
            del Juego", súbelo a nuestra plataforma. Asegúrate de que el archivo
            esté correctamente formateado y que todas las columnas estén llenas
            con información relevante.
          </p>
          <div className="w-full h-0.5 bg-slate-500 " />
          <div className="flex flex-row  w-full space-x-2">
            <div className="flex flex-1 justify-center">
              <button className="bg-gray-500 rounded-full md:text-xl text-white w-full py-3">
                Descargar plantilla
              </button>
            </div>
            <div className="flex flex-1 justify-center">
              <button className="bg-black rounded-full md:text-xl text-white w-full py-3">
                Cargar archivo
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
