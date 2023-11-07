import NavUser from "../components/NavUser";

export default function Scores({ gameSummary, pinGame }) {
  console.log(gameSummary, pinGame);

  const filteredPlayers = Object.keys(gameSummary.playerResponses)
    .filter(
      (playerId) => gameSummary.playerResponses[playerId].pinGame === pinGame
    )
    .map((playerId) => gameSummary.playerResponses[playerId]);

  filteredPlayers.sort((a, b) => b.correctAnswersCount - a.correctAnswersCount);

  console.log(filteredPlayers);

  return (
    <div className="  h-screen">
      <div className="w-full">
        <NavUser />
      </div>
      <div className="bg-gray-200 w-full flex h-full flex-1 flex-col items-center justify-center px-2 md:mt-12">
        <div className="bg-white rounded-3xl justify-center h-auto  sm:h-full w-full p-4">
          <div className="w-full flex flex-row border-b-2 sm:border-b-4 border-black pb-3">
            <div className="flex flex-1 justify-start">
              <button className="bg-black rounded-3xl text-white hidden sm:flex md:text-xl items-center px-3 py-1">
                <a href="/PinGame">Salir</a>
              </button>
              <button className="bg-black rounded-3xl text-white sm:hidden sm:text-3xl px-3">
                Terminar
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
            <p className="font-bold text-4xl sm:text-5xl text-center sm:text-center">
              Puntajes obtenidos
            </p>
            <div className="w-full  flex flex-col justify-start items-center">
              {filteredPlayers.map((player, index) => (
                <div className="flex flex-row w-full  justify-between">
                  <p className="font-semibold text-xl sm:text-3xl" key={index}>
                    {player.user.name} {player.user.lastName} 

                  </p>
                  <p className="font-semibold text-xl sm:text-3xl" key={index}>
                    {player.correctAnswersCount} de {player.total}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
