import { useCallback } from "react";
import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";
import NavUser from "../components/NavUser";
import { PARTICLES_CONFIG } from "../config";
import React, { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

export default function ParticlesBackground({ children }) {
  const particlesInit = useCallback(async (engine) => {
    await loadFull(engine);
  }, []);

  const particlesLoaded = useCallback(async () => {}, []);

  const { Auth } = useContext(AuthContext);

  return (
    <div className="w-full h-full">
      {Auth && <NavUser />}
      <div
        className="flex flex-col"
        style={{
          minHeight: Auth ?  "calc(100vh - 60px)" : "100vh",
        }}
      >
        <div className="flex flex-1 justify-center">{children}</div>
        <Particles
          className="w-full h-full"
          id="tsparticles"
          init={particlesInit}
          loaded={particlesLoaded}
          options={PARTICLES_CONFIG}
        />
      </div>
    </div>
  );
}
