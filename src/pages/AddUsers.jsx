import React from "react";
import HeaderNav from "../components/HeaderNav";
import { FaCheck } from "react-icons/fa";
import { FaTimes } from "react-icons/fa";

export default function AddUsers() {
  return (
    <div className="min-h-screen flex flex-col overflow-hidden bg-slate-100">
      <HeaderNav SignIn />
      <div className="flex-grow flex flex-col items-center justify-center space-y-4 md:space-y-8 px-2 md:px-24">
        <div className="bg-white w-full h-auto rounded-full flex items-center px-8 font-bold text-lg md:text-2xl text-center py-2 mt-4">
          <p>Invitar jugadores</p>
        </div>
        <div className="bg-white w-full h-auto rounded-2xl flex flex-col p-4 md:p-8 space-y-2">
          <p className="font-bold text-md">Fecha</p>
          <input
            className="w-full rounded-full bg-slate-200 px-4 py-1 md:px-6 md:py-2 text-md italic"
            type="date"
            id="Date"
            placeholder="DD/MM/YYY"
          />
          <p className="font-bold text-md">Hora</p>
          <input
            className="w-full rounded-full bg-slate-200 px-4 py-1 md:px-6 md:py-2 text-md italic"
            type="time"
            id="Date"
            placeholder="DD/MM/YYY"
          />
          <p className="font-bold text-md">Agregar personas</p>

          <div className="flex flex-row w-full space-x-2">
            <input
              className="w-full rounded-full bg-slate-200 px-4 py-1 md:px-6 md:py-2 text-md italic"
              type="text"
              id="Mail"
              placeholder="Ingrese el correo de la persona a invitar"
            />
            <button className="bg-black rounded-full md:text-xl text-white w-auto py-2 px-12">
              Agregar
            </button>
          </div>
          <br />

          <div className="w-full grid grid-cols-1 md:grid-cols-3 md:space-x-2 space-y-3 md:space-y-0">
            <div className="flex flex-row rounded-full bg-slate-200 px-4 py-1 md:px-6 md:py-2 text-md italic items-center justify-between">
              <p>rrquintana7@gmai.com</p>
              <div className="bg-red-500 h-6 w-6 items-center flex justify-center rounded-full">
                <FaTimes size={12} color="white" />
              </div>
            </div>
            <div className="flex flex-row rounded-full bg-slate-200 px-4 py-1 md:px-6 md:py-2 text-md italic items-center justify-between">
              <p>rrquintana7@gmai.com</p>
              <div className="bg-red-500 h-6 w-6 items-center flex justify-center rounded-full">
                <FaTimes size={12} color="white" />
              </div>
            </div>
            <div className="flex flex-row rounded-full bg-slate-200 px-4 py-1 md:px-6 md:py-2 text-md italic items-center justify-between">
              <p>rrquintana7@gmai.com</p>
              <div className="bg-red-500 h-6 w-6 items-center flex justify-center rounded-full">
                <FaTimes size={12} color="white" />
              </div>
            </div>
          </div>
          <br />
          <div className="w-full h-0.5 bg-slate-500" />
          <br />

          <div className="flex flex-row  w-full space-x-2">
            <div className="flex flex-1 justify-center">
              <button className="bg-gray-500 rounded-full md:text-xl text-white w-full py-3">
                Regresar
              </button>
            </div>
            <div className="flex flex-1 justify-center">
              <button className="bg-black rounded-full md:text-xl text-white w-full py-3">
                Enviar invitaciones
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
