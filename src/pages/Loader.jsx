import React from "react";
import Logo from "../assets/images/Logo.png";


export default function Loader({handleLeaveWaitingRoom}) {
  return (
    <div className="flex w-full items-center justify-center">
      <div className="bg-white rounded-3xl px-8  flex flex-col items-center justify-center w-full sm:w-4/6 md:w-4/6 lg:w-4/6  h-auto sm:h-3/4 ">
        <div className="w-full flex items-center space-x-4 mt-8">
          <button
            onClick={() => handleLeaveWaitingRoom()}
            className="flex justify-center space-x-2"
          >
            <a
              href="/"
              className="rounded-full h-8 w-8 bg-black text-white font-bold flex items-center justify-center"
            >
              ←
            </a>
            <p className="font-bold text-xl">Regresar</p>
          </button>
        </div>
        <div className="flex flex-1  items-center justify-center">
          <div className="flex flex-col items-center space-y-6">
            <div className="flex items-center justify-center">
              <img
                className="w-auto h-36 object-contain"
                src={Logo}
                alt="logo"
              />
            </div>
            <div
              className="inline-block h-12 w-12 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
              role="status"
            >
              <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
                Loading...
              </span>
            </div>
            <p className="text-black font-bold pb-8 sm:pb-0 text-2xl sm:text-3xl text-center italic">
              Esperando al anfitrión
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
