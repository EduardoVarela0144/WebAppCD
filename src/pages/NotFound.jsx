import React from "react";
import Logo from "../assets/images/Logo.png";

export default function NotFound() {
  return (
    <div className="bg-slate-100 h-screen flex flex-col items-center justify-center">
      <div className="flex flex-col md:flex-row items-center space-x-4">
        <img
          className="w-auto h-24 md:h-48 object-contain"
          src={Logo}
          alt="logo"
        />
        <h2 className="font-bold text-9xl">404</h2>
        <div className="h-24 w-1 hidden md:flex bg-black" />
        <p className="text">Página no encontrada</p>
      </div>
    </div>
  );
}
