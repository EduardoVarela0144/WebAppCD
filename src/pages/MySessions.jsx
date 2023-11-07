import React from "react";
import HeaderNav from "../components/HeaderNav";
import SetCarrousel from "../components/SetCarrouselSessions";
import SetMock from "../mocks/SetSession.json";

export default function MySessions() {
  return (
    <div className="min-h-screen flex flex-col overflow-hidden bg-slate-100">
      <HeaderNav SignIn />
      <div className="flex-grow flex flex-col items-center justify-center space-y-4 md:space-y-8 px-2 md:px-24">
        <div className="bg-white w-full h-auto rounded-full flex items-center px-8 font-bold text-lg md:text-2xl text-center py-2 mt-4">
          <p>Mis sesiones</p>
        </div>
        <div className="bg-white w-full h-auto rounded-2xl flex flex-col p-4 md:p-8 space-y-2">
          <SetCarrousel data={SetMock} type={"details"} />
          <br />
          <div className="w-full h-4 items-center justify-center flex flex-row">
            <div className="bg-slate-600 w-full h-0.5" />
            <p className="px-4 font-bold text-slate-600 text-xl">o</p>
            <div className="bg-slate-600 w-full h-0.5" />
          </div>
          <br />
          <div className="flex w-full space-x-2">
            <div className="flex flex-1 justify-center">
              <button className="bg-black rounded-full md:text-xl text-white w-auto py-3 px-12">
                Crear una sesión
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
