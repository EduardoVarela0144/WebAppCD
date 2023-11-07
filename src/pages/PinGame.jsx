import { useEffect, useState, useContext } from "react";
import ParticlesBackground from "../components/ParticlesBackground";
import Logo from "../assets/images/Logo.png";
import { useGetGameByIdMutation } from "../hooks/Games/useGetGameByIdMutation";
export default function PinGame() {
  const [pinGame, setPinGame] = useState("");
  const [error, setError] = useState("");
  const { getGame, isLoading, error: errorMutation } = useGetGameByIdMutation();

  const handlePinChange = (event) => {
    const newPin = event.target.value;
    setPinGame(newPin);
  };

  const navigateToGame = () => {
    if (pinGame) {
      getGame(pinGame);
    } else {
      setError("Debes ingresar un pin de juego válido");
    }
  };

  useEffect(() => {
    if (errorMutation) {
      setError(errorMutation);
    }
  }, [errorMutation]);

  return (
    <div className="bg-black w-full h-full relative">
      <ParticlesBackground>
        <div className="flex w-full items-center justify-center">
          <div className="bg-white rounded-3xl p-12 flex flex-col items-center space-y-4 w-full sm:w-4/6 md:w-4/6 lg:w-4/6 h-auto md:h-4/4">
            <div className="w-full flex items-center space-x-4 justify-between">
              <div className="flex justify-center space-x-2">
                <a
                  href="/"
                  className="rounded-full h-8 w-8 bg-black text-white font-bold flex items-center justify-center"
                >
                  ←
                </a>
                <p className="font-bold text-xl">Regresar</p>
              </div>
              <div>
                <p className="font-bold text-red-500">{error && error}</p>
              </div>
            </div>
            <div className="h-full flex items-center justify-center">
              <div className="flex flex-col items-center space-y-6">
                <div className="flex items-center justify-center">
                  <img
                    className="w-auto h-36 object-contain"
                    src={Logo}
                    alt="logo"
                  />
                </div>
                <input
                  className="w-full rounded-full  bg-slate-200 px-8 py-4 text-2xl italic text-center"
                  type="text"
                  id="PinGame"
                  name="PinGame"
                  placeholder="PIN de juego"
                  value={pinGame}
                  onChange={handlePinChange}
                />
                <button
                  onClick={() => navigateToGame()}
                  className="text-white bg-black rounded-full w-full font-bold p-4 text-xl"
                >
                  {isLoading ? "Ingresando ..." : "Unirse"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </ParticlesBackground>
    </div>
  );
}
