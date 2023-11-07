import React from 'react'
import ParticlesBackground from '../components/ParticlesBackground';
import Logo from "../assets/images/Logo.png";
import { useNavigate } from 'react-router-dom';

export default function GameNotStart() {
  const navigation = useNavigate();
  return (
    <div className="bg-black w-full h-full relative">
      <ParticlesBackground>
        <div className="flex w-full items-center justify-center">
          <div className="bg-white rounded-3xl p-12 flex flex-col items-center space-y-4 w-full sm:w-4/6 md:w-4/6 lg:w-4/6 h-auto md:h-4/4">
            
            <div className="h-full flex items-center justify-center">
              <div className="flex flex-col items-center space-y-6">
                <div className="flex items-center justify-center">
                  <img
                    className="w-auto h-36 object-contain"
                    src={Logo}
                    alt="logo"
                  />
                </div>
                <p className='font-bold text-xl text-center'>¡La partida aún no ha comenzado!</p>
               
                <button
                  onClick={() => navigation('/PinGame')}
                  className="text-white bg-black rounded-full w-full font-bold p-4 text-xl"
                >
                  Regresar a PinGame
                </button>
              </div>
            </div>
          </div>
        </div>
      </ParticlesBackground>
    </div>
  )
}
