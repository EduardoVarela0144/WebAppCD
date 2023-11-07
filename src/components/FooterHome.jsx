import Logo from "../assets/images/Logo.png";
import devmentesLogo from "../assets/images/LogoSmall.png";
import SevenssLogo from "../assets/images/7ssLogo.png";

export default function FooterHome() {
  return (
    <div className="bg-white py-3 flex flex-row items-center justify-center">
      <div className="flex flex-1 h-full justify-center">
        <img
          className="w-auto h-12 object-contain"
          src={devmentesLogo}
          alt="logo"
        />
      </div>
      <div className="flex flex-1 flex-col h-full space-y-2">
        <img
          className="w-auto h-12 object-contain"
          src={Logo}
          alt="logo"
        />
        <p className="text-center text-sm hidden md:flex">
          Este es Code Defenders, un juego de trivia de respuesta a gestión de
          identidades y accesos.
        </p>
      </div>
      <div className="flex flex-1 h-full justify-center">
        <img
          className="w-auto h-12 object-contain"
          src={SevenssLogo}
          alt="logo"
        />
      </div>
    </div>
  );
}
