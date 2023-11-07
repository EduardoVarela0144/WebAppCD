import React, { useContext } from "react";
import Logo from "../assets/images/Logo.png";
import { AuthContext } from "../context/AuthContext";
import { Dropdown, Navbar, Avatar } from "flowbite-react";
import { io } from "socket.io-client";
import { SOCKET_URL } from "../config";

export default function NavUser() {
  const socket = io.connect(SOCKET_URL);

  const { Auth, setAuth } = useContext(AuthContext);

  return (
    <Navbar fluid rounded>
      <Navbar.Brand href="https://flowbite-react.com">
        <img alt="Flowbite React Logo" className="mr-3 h-6 sm:h-9" src={Logo} />
      </Navbar.Brand>
      <div className="flex md:order-2">
        <Dropdown
          arrowIcon={false}
          inline
          label={
            Auth.img !== "" ? (
              <Avatar img={Auth.img} status="online" rounded />
            ) : (
              <Avatar
                status="online"
                placeholderInitials={Auth.name[0] + Auth.lastName[0]}
                rounded
              />
            )
          }
        >
          <Dropdown.Header>
            <span className="block text-sm">
              {Auth?.name} {Auth.lastName}
            </span>
            <span className="block truncate text-sm font-medium">
              {Auth.email}
            </span>
          </Dropdown.Header>
          <Dropdown.Item
            onClick={() => {
              setAuth(null),
                socket.emit("leaveWaitingRoom", { userId: Auth._id });
            }}
          >
            Cerrar sesión
          </Dropdown.Item>
        </Dropdown>
        <Navbar.Toggle />
      </div>
    </Navbar>
  );
}
