import ParticlesBackground from "../components/ParticlesBackground";
import Logo from "../assets/images/Logo.png";

export default function StudyGuide() {
  return (
    <div className="bg-black w-full h-full relative py-12">
      <ParticlesBackground />
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="bg-white rounded-3xl p-12 flex flex-col items-start space-y-12 w-full sm:w-4/6 md:w-4/6 lg:w-4/6 h-auto ">
          <div className="w-full flex items-center space-x-4">
            <div className="flex justify-center space-x-2">
              <a
                href="/"
                className="rounded-full h-8 w-8 bg-black text-white font-bold flex items-center justify-center"
              >
                ←
              </a>
              <p className="font-bold text-xl">Regresar</p>
            </div>
          </div>
          <div className="space-y-8">      
            <div>
              <p className="font-extrabold text-3xl">Guía de Estudio para Juego</p>
              <p className="text-xl text-gray-500">Crea o modifica una nueva nota de apoyo</p>
            </div>
            <div>
              <p className="font-bold text-lg">Anotación 1</p>
              <p className="text-gray-500 text-base">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed nec nisi auctor, malesuada nisl sit amet, ultrices odio.
              </p>
            </div>
            <div>
              <p className="font-bold text-lg">Anotación 2</p>
              <p className="text-gray-500 text-base">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed nec nisi auctor, malesuada nisl sit amet, ultrices odio.
              </p>
            </div>
            <div>
              <p className="font-bold text-lg">Anotación 3</p>
              <p className="text-gray-500 text-base">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed nec nisi auctor, malesuada nisl sit amet, ultrices odio.
              </p>
            </div>
            <div>
              <p className="font-bold text-lg">Anotación 4</p>
              <p className="text-gray-500 text-base">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed nec nisi auctor, malesuada nisl sit amet, ultrices odio.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
