import React from "react";
import HeaderNav from "../components/HeaderNav";
import { FaCheck } from "react-icons/fa";
import { FaTimes } from "react-icons/fa";

export default function ShowCustomDeck() {
  return (
    <div className="min-h-screen flex flex-col overflow-hidden bg-slate-100">
      <HeaderNav SignIn />
      <div className="flex-grow flex flex-col items-center justify-center space-y-4 md:space-y-8 px-2 md:px-24 py-4">
        <div className="bg-white w-full h-20 rounded-full flex items-center px-8 font-bold text-lg md:text-2xl text-center">
          <p>Solicitar deck personalizado</p>
        </div>
        <div className="bg-white w-full h-auto rounded-2xl flex flex-col p-8 md:p-16 space-y-4">
          <p className="font-bold text-xl">Pregunta 1</p>

          <div className="bg-slate-100 w-full h-auto rounded-full flex items-center sm:px-8 font-bold text-lg md:text-2xl text-center py-2 px-2">
            <p className="text-md sm:text-xl">
              ¿Pregunta hecha por el usuario?
            </p>
          </div>

          <div className="w-full grid grid-cols-1 md:grid-cols-2 px-2 space-y-2 md:space-x-2">
            <div className="flex flex-row items-center space-x-2">
              <div className="bg-black h-8 w-8 items-center flex justify-center rounded-full">
                <FaCheck size={16} color="white" />
              </div>

              <input
                className="w-full rounded-full bg-slate-200 px-4 py-1 md:px-6 md:py-2  text-lg md:text-xl italic"
                type="text"
                id="Name"
                placeholder="Ingresa una opción de respuesta"
              />
            </div>
            <div className="flex flex-row items-center space-x-2">
              <div className="bg-black h-8 w-8 items-center flex justify-center rounded-full">
                <FaTimes size={16} color="white" />
              </div>

              <input
                className="w-full rounded-full bg-slate-200 px-4 py-1 md:px-6 md:py-2  text-lg md:text-xl italic"
                type="text"
                id="Name"
                placeholder="Ingresa una opción de respuesta"
              />
            </div>
            <div className="flex flex-row items-center space-x-2">
              <div className="bg-black h-8 w-8 items-center flex justify-center rounded-full">
                <FaTimes size={16} color="white" />
              </div>

              <input
                className="w-full rounded-full bg-slate-200 px-4 py-1 md:px-6 md:py-2  text-lg md:text-xl italic"
                type="text"
                id="Name"
                placeholder="Ingresa una opción de respuesta"
              />
            </div>
            <div className="flex flex-row items-center space-x-2">
              <div className="bg-black h-8 w-8 items-center flex justify-center rounded-full">
                <FaTimes size={16} color="white" />
              </div>

              <input
                className="w-full rounded-full bg-slate-200 px-4 py-1 md:px-6 md:py-2  text-lg md:text-xl italic"
                type="text"
                id="Name"
                placeholder="Ingresa una opción de respuesta"
              />
            </div>
          </div>

          <div className="w-full h-0.5 bg-slate-500 " />
          <div className="flex flex-row  w-full space-x-2">
            <div className="flex flex-1 justify-center">
              <button className="bg-gray-500 rounded-full md:text-xl text-white w-full py-3">
                Regresar
              </button>
            </div>
            <div className="flex flex-1 justify-center">
              <button className="bg-black rounded-full md:text-xl text-white w-full py-3">
                Continuar
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
