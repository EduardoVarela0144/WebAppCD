import React from "react";
import Logo from "../assets/images/Logo.png";
import { FaPlay } from "react-icons/fa";
import HeaderNav from "../components/HeaderNav";
import Acknowledgments from "../components/Acknowledgments";
import FooterHome from "../components/FooterHome";
import nearshore from "../assets/images/nearshoreLogo.png";
import devmentesLogo from "../assets/images/LogoSmall.png";
import SevenssLogo from "../assets/images/7ssLogo.png";

export default function Home() {
  return (
    <div className="flex flex-col overflow-hidden bg-slate-100">
      <HeaderNav />
      <header>
        <div className="min-h-screen  flex-grow flex flex-col items-center justify-center space-y-10 md:space-y-10 pt-12">
          <div className="flex-col w-full mt-[-120px] space-y-10 justify-center items-center">
            <div className="mb-4 w-full flex flex-col items-center md:flex-row justify-center space-x-1 text-lg md:text-2xl">
              <p>Entrena a tu equipo o estudiantes... </p>
              <p className="font-bold"> ¡Mientras te diviertes!</p>
            </div>
            <img className="h-36 md:h-52 mx-auto" src={Logo} alt="logo" />
            <div className="flex w-full justify-center space-x-3">
              <a
                href="/PinGame"
                className="text-white bg-black rounded-full py-4 px-8 text-lg md:text-2xl"
              >
                Pruébalo ahora
              </a>
              <div className="flex justify-center items-center space-y-2 md:space-y-0 space-x-0 md:space-x-2">
                <a
                  href="/Login"
                  className="rounded-full h-12 w-12 bg-black text-white font-bold flex items-center justify-center"
                >
                  <FaPlay size={16} color="white" />
                </a>
                <a href="/Login" className="ml-2 text-lg md:text-2xl underline">
                  Inicia sesión
                </a>
              </div>
            </div>

            <div className="text-md md:text-2xl text-center">
              <p>
                Este es Code Defenders, un juego de trivia de respuesta a
                gestión de identidades y accesos.
              </p>
            </div>
          </div>
        </div>
      </header>

      <section className="space-y-8">
        <div className="p-8">
          <p className="text-center font-medium md:px-20 text-xl">
            Code Defenders es un emocionante juego creado por estudiantes
            llamados 7ss en colaboración con DevMentes para Nearshore Cyber,
            diseñado para promover la educación sobre ciberseguridad. Sumérgete
            en un mundo virtual donde enfrentarás desafíos cibernéticos reales
            mientras aprendes a proteger sistemas y datos.
          </p>
        </div>

        <div className="space-y-8">
          <div className="w-full flex flex-row justify-center items-center space-x-4 md:space-x-12">
            <a target="_blank" rel="noreferrer" href="https://devmentes.com/">
              <img
                className="h-auto w-12 md:w-24 object-contain"
                src={devmentesLogo}
                alt="DevMentes logo"
              />
            </a>

            <p className="font-bold text-3xl">x</p>
            <img
              className="h-auto w-12 md:w-24 object-contain"
              src={SevenssLogo}
              alt="7ss logo"
            />
          </div>

          <div className="flex items-center justify-center">
            <img
              className="w-auto h-24 md:h-36 object-contain"
              src={nearshore}
              alt="logo"
            />
          </div>
        </div>
      </section>
      <div className="text-center mt-32 pb-32">
        <Acknowledgments />
      </div>
      <FooterHome />
    </div>
  );
}
