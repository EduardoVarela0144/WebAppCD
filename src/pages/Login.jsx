import React from "react";
import { useEffect, useState } from "react";
import ParticlesBackground from "../components/ParticlesBackground";
import Logo from "../assets/images/Logo.png";
import { FaLinkedin } from "react-icons/fa";
import { useLogin } from "../hooks/Users/useLogin";
import { useForm } from "react-hook-form";
import ErrorGenerator from "../components/ErrorGenerator";
import { useGetRolByName } from "../hooks/Users/useGetRolByName";
import { ROLES } from "../config";
import { AuthContext } from "../context/AuthContext";
import { useLoginWithLinkedIn } from "../hooks/Users/useLoginWithLinkedIn";
import { useAddUser } from "../hooks/Users/useAddUser";
import { useLocation } from "react-router-dom";
import { useGetToken } from "../hooks/Users/useGetTokenLindekIn";

const LINKEDIN_CLIENT_SECRET = import.meta.env.VITE_LINKEDIN_CLIENT_SECRET;
const LINKEDIN_CLIENT_ID = import.meta.env.VITE_LINKEDIN_CLIENT_ID;
const LINKEDIN_CALLBACK_URL = import.meta.env.VITE_LINKEDIN_CALLBACK_URL;
const linkedinOAuthURL = `https://www.linkedin.com/oauth/v2/authorization?response_type=code&client_id=${LINKEDIN_CLIENT_ID}&redirect_uri=${encodeURIComponent(
  LINKEDIN_CALLBACK_URL
)}&scope=openid%20profile%20email`;

export default function Login() {
  // Get rol name
  const { data, isLoading } = useGetRolByName(ROLES.User);

  //Login With System
  const { postLogin, error } = useLogin();
  const { register, handleSubmit, reset, formState } = useForm();
  const { isSubmitting } = formState;

  const onSubmit = async (data) => {
    await postLogin(data);
    reset();
  };

  const [registrationError, setRegistrationError] = useState(null);

  useEffect(() => {
    if (error) {
      setRegistrationError(true);
    }
  }, [error]);

  //Login With LinkedIn
  const { postLogin: postLinkedin, isError } = useLoginWithLinkedIn();
  const { postUser } = useAddUser();
  const { token, user } = useGetToken();

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const code = queryParams.get("code");

  useEffect(() => {
    if (code) {
    
      token(code);
    }
  }, []);

  useEffect(()=>{
    if(user){
      postLinkedin(user.email);

    }
  },[user])

  useEffect(() => {
    if (isError) {
      const User = {
        rol: data?.rol?.id,
        name: user?.given_name,
        lastName: user?.family_name,
        img: user?.picture,
        linkedinURL: user?.picture,
        email: user?.email,
        password: "",
        games: [],
      };

      postUser(User);
    }

  }, [isError]);


  return (
    <div className="bg-black w-full h-full relative">
      <ParticlesBackground />
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="bg-white rounded-3xl flex flex-row w-full sm:w-4/6 md:w-4/6 lg:w-4/6 h-auto p-8">
          <div className="hidden md:flex  md:w-2/12 items-start justify-start h-ful">
            <div className="flex items-center space-x-2">
              <a
                href="/"
                className="rounded-full h-6 w-6 bg-black text-white font-bold flex items-center justify-center"
              >
                ←
              </a>
              <p className="font-bold md:text-xs lg:text-lg xl:text-lg">
                Regresar
              </p>
            </div>
          </div>
          <div className="space-y-4 w-full md:w-8/12  xl:px-20">
            <div className="flex items-center justify-center">
              <img
                className="w-auto h-16 md:h-20 object-contain"
                src={Logo}
                alt="logo"
              />
            </div>
            <div>
              <p className="font-extrabold text-center text-3xl md:text-4xl">
                Iniciar sesión
              </p>
            </div>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
              <div className="space-y-3">
                <input
                  className="w-full rounded-full bg-slate-200 px-4 py-1 md:px-6 md:py-2  text-lg md:text-xl italic"
                  type="text"
                  id="email"
                  name="email"
                  {...register("email")}
                  placeholder="Ingresa tu correo"
                />
                <input
                  className="w-full rounded-full bg-slate-200 px-4 py-1 md:px-6 md:py-2 text-lg md:text-xl italic"
                  type="password"
                  id="password"
                  name="Password"
                  {...register("password")}
                  placeholder="Ingresa tu contraseña"
                />
                {registrationError && (
                  <ErrorGenerator
                    errorMessage={error}
                    onClose={() => setRegistrationError(null)}
                  />
                )}
              </div>
              <button
                type="submit"
                disabled={isSubmitting}
                className="text-white bg-black rounded-full w-full font-bold  py-1.5  md:py-2 text-lg md:text-xl"
              >
                Iniciar sesión
              </button>
            </form>

            <div className="w-full h-4 items-center justify-center flex flex-row">
              <div className="bg-slate-600 w-full h-0.5" />
              <p className="px-4 font-bold text-slate-600 text-xl">o</p>
              <div className="bg-slate-600 w-full h-0.5" />
            </div>
            <button className="text-white bg-[#0177B5] rounded-full w-full font-bold text-md md:text-xl py-2 md:py-2 flex justify-center items-center space-x-2">
              <a href={linkedinOAuthURL} >
                <div className="flex place-content-between">
                <FaLinkedin size={26} color="white" />
                <p>Iniciar sesión con LinkedIn</p>
                </div>
              </a>
            </button>
            <div className="w-full flex items-center justify-center">
              <span className="flex items-center text-lg">
                ¿Aún no tienes cuenta?&nbsp;
                <a className="font-bold" href="/register">
                  Regístrate
                </a>
              </span>
            </div>
            <div className="flex md:hidden lg:hidden xl:hidden w-full items-start justify-start py-6">
              <div className="flex items-center space-x-2">
                <a
                  href="/"
                  className="rounded-full h-6 w-6 bg-black text-white font-bold flex items-center justify-center"
                >
                  ←
                </a>
                <p className="font-bold md:text-xs lg:text-lg xl:text-lg">
                  Regresar
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
