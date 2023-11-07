import Logo from "../assets/images/Logo.png";
import NavUser from "../components/NavUser";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

export default function GameOver({ gameSummary }) {
  const { Auth } = useContext(AuthContext);
  return (
    <div className="h-screen flex  flex-col">
      <div className=" w-full">
        <NavUser />
      </div>
      <div className="bg-slate-200 w-full flex-col flex-1 flex items-center justify-center p-4 sm:p-12">
        <div className="bg-white rounded-3xl justify-center h-auto  sm:h-full w-full p-4">
          <div className="w-full flex flex-row border-b-2 sm:border-b-4 border-black pb-3">
            <div className="flex flex-1 justify-start">
              <button className="bg-black rounded-3xl text-white hidden sm:flex sm:text-xl px-3 py-1">
                <a href="/PinGame"> Abandonar partida </a>
              </button>
              <button className="bg-black rounded-3xl text-white sm:hidden sm:text-3xl px-3">
                <a href="/PinGame"> Abandonar </a>
              </button>
            </div>
            <div className="flex flex-1 justify-center items-center">
              <p className="font-semibold sm:text-3xl">Completado</p>
            </div>
            <div className="flex flex-1 justify-end">
              <div className="flex flex-row justify-end items-end space-x-1 ">
                <p className="font-bold text-xl">0</p>
                <p className="text-xs mb-1">seg</p>
              </div>
            </div>
          </div>
          <div className="w-full flex flex-col justify-center items-center px-6 sm:px-12 md:px-24 lg:px-48 xl:px-72 space-y-12 mt-4">
            <p className="font-bold text-3xl sm:text-4xl">Juego terminado</p>
            <div className="w-full  flex flex-col justify-start items-center">
              <div className=" border-b-2 border-black w-full">
                <p className="font-semibold text-xl sm:text-3xl">
                  Puntaje final
                </p>
              </div>
              <div className="flex flex-row justify-between w-full">
                <p className="font-semibold text-xl sm:text-3xl">
                  {Auth.name} {Auth.lastName}
                </p>
                <p className="font-semibold text-xl sm:text-3xl">{ gameSummary && (gameSummary.playerResponses[Auth._id]?.correctAnswersCount ) + " de " +  ( gameSummary.playerResponses[Auth._id]?.total) }</p>
              </div>
            </div>
            <img
              className="w-auto h-36 sm:h-54 object-contain"
              src={Logo}
              alt="logo"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
