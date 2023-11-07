export const API_URL = import.meta.env["VITE_API_URL"];

export const SOCKET_URL = import.meta.env["VITE_SOCKET_URL"];

export const ROLES = {
  User: "User",
  Admin: "Admin",
  Leader: "Leader",
  Owner: "Owner",
};

export const ROLES_TRASLATE = {
  User: "Usuario",
  Admin: "Administrador",
  Leader: "Líder",
  Owner: "Propietario",
};


export const PARTICLES_CONFIG = {
  fullScreen: false,
  fpsLimit: 60,
  interactivity: {
    events: {
      onClick: {
        enable: true,
        mode: "push",
      },
      onHover: {
        enable: true,
        mode: "repulse",

        distance: 400,
      },
      resize: true,
    },
    modes: {
      push: {
        quantity: 4,
      },
      repulse: {
        distance: 150,
        duration: 0.4,
      },
    },
  },
  particles: {
    color: {
      value: "#ffffff",
    },
    links: {
      color: "#ffffff",
      distance: 120,
      enable: true,
      opacity: 0.6,
      width: 1,
    },
    collisions: {
      enable: true,
    },
    move: {
      directions: "none",
      enable: true,
      outModes: {
        default: "bounce",
      },
      random: false,
      speed: 3,
      straight: false,
    },
    number: {
      density: {
        enable: true,
        area: 1200,
      },
      value: 80,
    },
    opacity: {
      value: 0.5,
    },
    shape: {
      type: "circle",
    },
    size: {
      value: { min: 1, max: 2 },
    },
  },
  detectRetina: true,
};
