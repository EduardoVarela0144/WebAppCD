import Logo from "../assets/images/Logo.png";
import { FaSignOutAlt } from "react-icons/fa";

export default function HeaderNav({ SignIn }) {
  return (
    <div className="w-full flex flex-row border-b-4 border-black items-center p-2 justify-between px-6 sm:px-10 md:px-12">
      <div>
        <img
          className="w-auto h-10 md:h-12 object-contain"
          src={Logo}
          alt="logo"
        />
      </div>
      <div className="flex flex-row items-center space-x-3">
        <a
          href="/PinGame"
          className="ease-in-out duration-300 text-white bg-zinc-900 hover:bg-zinc-800 rounded-full py-2 px-8 font-semibold text-md md:text-xl"
        >
          {SignIn ? "Perfil" : "Juega ahora"}
        </a>
        {SignIn && <FaSignOutAlt size={35} color="black" />}
      </div>
    </div>
  );
}
