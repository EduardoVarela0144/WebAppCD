import HeaderNav from "../components/HeaderNav";
import SetCarrousel from "../components/SetCarrousel";
import setMock from "../mocks/Set.json";

export default function CustomDeck() {
  return (
    <div className="min-h-screen flex flex-col overflow-hidden bg-slate-100">
      <HeaderNav SignIn />
      <div className="flex-grow flex flex-col items-center justify-center space-y-4 px-2 md:px-24">
        <div className="bg-white w-full py-4 rounded-full flex items-center px-8 font-bold text-lg md:text-2xl text-center">
          <p>Selecciona un deck de preguntas</p>
        </div>

        <div className="bg-white w-full h-auto rounded-2xl flex flex-col px-8 md:px-16">
          {/*Carrousel */}
          <div className="py-6 flex flex-1 justify-center items-center border-2 border-transparent border-b-zinc-400">
            <SetCarrousel data={setMock} type={"title"} />
          </div>

          {/* Button */}
          <div className="flex flex-row w-full items-center justify-center py-6">
            <button className="bg-zinc-800 rounded-full text-white py-3 w-full md:w-1/3 md:text-xl">
              Solicitar deck personalizado
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
