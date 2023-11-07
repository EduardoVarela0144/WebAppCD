import React, { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { ROLES_TRASLATE } from "../config";
import { Avatar } from "flowbite-react";
import DefaultLogo from "../assets/images/DefaultLogo.png";

export default function HeaderDashboard() {
  const { Auth } = useContext(AuthContext);
  return (
    <div className="flex flex-row space-x-2">
      <div >
        {Auth.img !== "" ? (
          <Avatar img={Auth.img} status="online" rounded />
        ) : (
          <Avatar
            status="online"
            placeholderInitials={Auth.name[0] + Auth.lastName[0]}
            rounded
          />
        )}
      </div>
      <div>
        <p className="font-semibold">
          {Auth?.name} {Auth.lastName}
        </p>
        <p className="text-xs text-gray-500">
          {ROLES_TRASLATE[Auth?.rol?.name]}
        </p>
      </div>
    </div>
  );
}
