import Logo from "../assets/images/Logo.png";
import {
  FaSignOutAlt,
  FaClipboard,
  FaUsers,
  FaEnvelope,
  FaTable,
} from "react-icons/fa";
import { useContext } from "react";
import HeaderDashboard from "../components/HeaderDashboard";
import { AuthContext } from "../context/AuthContext";

export default function DashboardLayout({ children, title }) {
  const { Auth, setAuth } = useContext(AuthContext);

  return (
    <div className="flex h-screen">
      <aside className="flex w-1/6 justify-between bg-white text-white p-4 flex-col">
        <img
          className="w-auto h-16 md:h-20 object-contain"
          src={Logo}
          alt="logo"
        />
        <ul className="space-y-2 justify-center items-center flex flex-col">
          <li className="w-full">
            <a
              href="/Dashboard"
              className="text-center flex flex-row items-center space-x-2 bg-black rounded-full py-2 px-4 w-full hover:bg-gray-400"
            >
              <FaTable size={20} color="white" />
              <p>Dashboard</p>
            </a>
          </li>
          <li className="w-full">
            <a
              href="/Dashboard/Users"
              className="bg-black  hover:bg-gray-400 rounded-full py-2 px-4  text-center flex flex-row items-center space-x-2"
            >
              <FaUsers size={20} color="white" />
              <p>Usuarios</p>
            </a>
          </li>
          <li className="w-full">
            <a
              href="/Dashboard/Questions"
              className="text-center flex flex-row bg-black rounded-full py-2 px-4  w-full hover:bg-gray-400 items-center space-x-2"
            >
              <FaClipboard size={20} color="white" />
              <p>Preguntas</p>
            </a>
          </li>
          <li className="w-full">
            <a
              href="/Dashboard/Requests"
              className="text-center bg-black rounded-full py-2 px-4  w-full hover:bg-gray-400 flex flex-row items-center space-x-2"
            >
              <FaEnvelope size={20} color="white" />
              <p>Solicitudes</p>
            </a>
          </li>
        </ul>

        <ul className="space-y-8 flex flex-col items-center justify-center p-4">
          <button onClick={()=> setAuth(null)} className="text-red-800 text-center flex flex-row items-center space-x-2">
            <FaSignOutAlt size={20} />
            <p>Cerrar sesión</p>
          </button>
          <li>
            <a
              href="#"
              className="text-zinc-500 text-center flex flex-row items-center space-x-2"
            >
              <FaUsers size={20} />
              <p>{Auth?.email}</p>
            </a>
          </li>
        </ul>
      </aside>

      <main className="flex-grow py-6 px-8  bg-gray-200 overflow-hidden">
        <div className="flex-col">
          <div className="flex w-full justify-end">
            <HeaderDashboard />
          </div>
          <h2 className="text-2xl font-bold my-4">{title}</h2>
        </div>
        <div className="h-full overflow-hidden pb-12">{children}</div>
      </main>
    </div>
  );
}
