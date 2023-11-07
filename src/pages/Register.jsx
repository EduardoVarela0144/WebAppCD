import ParticlesBackground from "../components/ParticlesBackground";
import Logo from "../assets/images/Logo.png";
import $ from "jquery";
import React, { useState, useContext, useEffect } from "react";
import ErrorGenerator from "../components/ErrorGenerator";
import { Alert } from "@material-tailwind/react";
import { useGetRolByName } from "../hooks/Users/useGetRolByName";
import { ROLES } from "../config";
import { AuthContext } from "../context/AuthContext";
import { useAddUser } from "../hooks/Users/useAddUser";
import { isError } from "react-query";

function Icon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      className="h-6 w-6"
    >
      <path
        fillRule="evenodd"
        d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm13.36-1.814a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z"
        clipRule="evenodd"
      />
    </svg>
  );
}

export default function Register() {
  const [registrationError, setRegistrationError] = useState(null);
  const [registrationSuccess, setRegistrationSuccess] = useState(false);
  const [nameError, setNameError] = useState("");
  const [lastNameError, setLastNameError] = useState("");
  const [linkedinError, setLinkedinError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

  const closeErrorMessage = () => {
    setRegistrationError(null);
  };

  const { data, isLoading } = useGetRolByName(ROLES.User);

  function isValidLinkedInURL(url) {
    const linkedinPattern =
      /^(https:\/\/)?(www\.)?linkedin\.com\/in\/[a-zA-Z0-9-_.]+$/;
    return linkedinPattern.test(url);
  }

  useEffect(()=>{
    if(!isLoading && data){
      setUserData({
        ...userData,
        rol: data.rol._id,
      });
     
    }

  },[isLoading])

  const [userData, setUserData] = useState({
    rol: "",
    name: "",
    lastName: "",
    img: "",
    linkedinURL: "",
    email: "",
    password: "",
    passwordConfirm: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData({
      ...userData,
      [name]: value,
    });

    if (name === "password") {
      if (value === "") {
        setPasswordError("Campo obligatorio.");
      } else {
        setPasswordError("");
      }
    } else if (name === "passwordConfirm") {
      if (value !== userData.password) {
        setPasswordError("Las contraseñas no coinciden.");
      } else {
        setPasswordError("");
      }
    } else if (name === "email") {
      if (value === "") {
        setEmailError("Campo obligatorio.");
      } else if (!emailPattern.test(value)) {
        setEmailError("Ingrese un correo válido.");
      } else {
        setEmailError("");
      }
    } else if (name === "linkedinURL") {
      if (value === "") {
        setLinkedinError("Campo obligatorio.");
      } else if (!isValidLinkedInURL(value)) {
        setLinkedinError("La URL ingresada no es válida.");
      } else {
        setLinkedinError("");
      }
    }
  };

  function validateForm(userData) {
    let isValid = true;

    // if (userData.name === "") {
    //   setNameError("Campo obligatorio.");
    //   isValid = false;
    // } else {
    //   setNameError("");
    // }

    // if (userData.lastName === "") {
    //   setLastNameError("Campo obligatorio.");
    //   isValid = false;
    // } else {
    //   setLastNameError("");
    // }

    // if (
    //   userData.linkedinURL === "" ||
    //   !isValidLinkedInURL(userData.linkedinURL)
    // ) {
    //   setLinkedinError("Campo obligatorio.");
    //   isValid = false;
    // } else {
    //   setLinkedinError("");
    // }

    // if (userData.email === "" || !emailPattern.test(userData.email)) {
    //   setEmailError("Campo obligatorio.");
    //   isValid = false;
    // } else {
    //   setEmailError("");
    // }

    // if (userData.password === "") {
    //   setPasswordError("Campo obligatorio.");
    //   isValid = false;
    // } else {
    //   setPasswordError("");
    // }

    // if (userData.password !== userData.passwordConfirm) {
    //   setPasswordError("Las contraseñas no coinciden.");
    //   isValid = false;
    // } else {
    //   setPasswordError("");
    // }

    return isValid;
  }

  const { postUser, isError, isLoading: loadingPostUser } = useAddUser();

  const handleRegistration = (e) => {
    e.preventDefault();

    const isValid = validateForm(userData);
    if (userData.password === "") {
      setPasswordError("Campo obligatorio.");
    } else {
      setPasswordError("");
    }

    if (userData.password !== userData.passwordConfirm) {
      setPasswordError("Las contraseñas no coinciden.");
    }

    if (isValid) {
      postUser(userData);
    }
  };

  useEffect(() => {
    if (isError && !loadingPostUser) {
      setRegistrationSuccess(false);
      setRegistrationError("Error en el registro, valide sus datos.");
    } else if (!isError && !loadingPostUser && userData.length > 0) {
      setRegistrationError(null);
      setRegistrationSuccess(true);
    }
  }, []);

  return (
    <div className="bg-black w-full h-full relative">
      <ParticlesBackground />
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="bg-white rounded-3xl p-6 sm:p-12 flex flex-col items-center space-y-4 w-full sm:w-5/6 md:w-4/6 lg:w-3/6">
          <div className="w-full flex justify-center items-center space-x-2">
            <div className="flex flex-1 justify-start items-center">
              <a
                href="/Login"
                className="rounded-full h-6 w-6 sm:h-8 sm:w-8 bg-black text-white font-bold flex items-center justify-center"
              >
                ←
              </a>
              <p className="font-bold text-sm md:text-base lg:text-lg xl:text-xl ms-1">
                Regresar
              </p>
            </div>
            <div className="flex flex-1 justify-center">
              <p className="font-extrabold text-center text-xl sm:text-3xl lg:text-3xl xl:text-4xl">
                Registrarse
              </p>
            </div>
            <div className="flex flex-1 justify-end">
              <img
                className="w-3/4 sm:w-3/4 md:w-3/4 object-contain"
                src={Logo}
                alt="logo"
              />
            </div>
          </div>

          {registrationSuccess && (
            <Alert
              icon={<Icon />}
              className="rounded-none border-l-4 border-[#2ec946] bg-[#2ec946]/10 font-medium text-[#2ec946]"
            >
              ¡Registro exitoso! La cuenta se ha registrado con éxito.
            </Alert>
          )}

          <div className="w-full flex justify-end">
            {registrationError && (
              <ErrorGenerator
                errorMessage={registrationError}
                onClose={() => setRegistrationError(null)}
              />
            )}
          </div>
          <div className="space-y-4 w-full">
            <div className="relative">
              <input
                className={`w-full rounded-full bg-slate-200 px-4 py-3 text-lg sm:text-xl ${
                  nameError ? "border-red-500" : ""
                }`}
                type="text"
                id="Name"
                name="name"
                placeholder="Nombre"
                value={userData.name}
                onChange={handleInputChange}
              />
              {nameError && (
                <p className="text-red-500 text-sm mt-0.1 ml-4">{nameError}</p>
              )}
            </div>
            <div className="relative">
              <input
                className={`w-full rounded-full bg-slate-200 px-4 py-3 text-lg sm:text-xl ${
                  lastNameError ? "border-red-500" : ""
                }`}
                type="text"
                id="LastName"
                name="lastName"
                placeholder="Apellido"
                value={userData.lastName}
                onChange={handleInputChange}
              />
              {lastNameError && (
                <p className="text-red-500 text-sm mt-0.1 ml-4">
                  {lastNameError}
                </p>
              )}
            </div>
            <div className="relative">
              <input
                className={`w-full rounded-full bg-slate-200 px-4 py-3 text-lg sm:text-xl ${
                  linkedinError ? "border-red-500" : ""
                }`}
                type="text"
                id="LinkedIn"
                name="linkedinURL"
                placeholder="Link de LinkedIn"
                value={userData.linkedinURL}
                onChange={handleInputChange}
              />
              {linkedinError && (
                <p className="text-red-500 text-sm mt-0.1 ml-4">
                  {linkedinError}
                </p>
              )}
            </div>
            <div className="relative">
              <input
                className={`w-full rounded-full bg-slate-200 px-4 py-3 text-lg sm:text-xl ${
                  emailError ? "border-red-500" : ""
                }`}
                type="text"
                id="Email"
                name="email"
                placeholder="Ingresa tu correo"
                value={userData.email}
                onChange={handleInputChange}
              />
              {emailError && (
                <p className="text-red-500 text-sm mt-0.1 ml-4">{emailError}</p>
              )}
            </div>
            <div className="relative">
              <input
                className={`w-full rounded-full bg-slate-200 px-4 py-3 text-lg sm:text-xl ${
                  passwordError ? "border-red-500" : ""
                }`}
                type="password"
                id="Password"
                name="password"
                placeholder="Ingresa tu contraseña"
                value={userData.password}
                onChange={handleInputChange}
              />
            </div>
            <div className="relative">
              <input
                className={`w-full rounded-full bg-slate-200 px-4 py-3 text-lg sm:text-xl ${
                  passwordError ? "border-red-500" : ""
                }`}
                type="password"
                id="PasswordConfirm"
                name="passwordConfirm"
                placeholder="Confirma tu contraseña"
                value={userData.passwordConfirm}
                onChange={handleInputChange}
              />
              {passwordError && (
                <p className="text-red-500 text-sm mt-0.1 ml-4 ">
                  {passwordError}
                </p>
              )}
            </div>
          </div>
          <div className="w-full flex items-center justify-center">
            <button
              disabled={isLoading ? true : false}
              className="text-white bg-black rounded-full w-10/12 sm:w-6/12 md:w-5/12 lg:w-4/12 justify-center font-bold p-3 text-lg sm:text-xl"
              onClick={handleRegistration}
            >
              Registrarse
            </button>
          </div>
          <div className="w-full flex items-center justify-center">
            <span className="flex items-center text-base sm:text-lg">
              ¿Ya tienes cuenta?&nbsp;
              <a className="font-bold" href="/login">
                Inicia Sesión
              </a>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
