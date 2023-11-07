import React from "react";
import HeaderNav from "../components/HeaderNav";
import { useState } from "react";
import "react-tagsinput/react-tagsinput.css";
import $ from "jquery";
import { Alert } from "@material-tailwind/react";
import ErrorGenerator from "../components/ErrorGenerator";

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

export default function InvitePlayers() {
  const [tags, setTags] = useState([]);
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [email, setEmail] = useState([]);
  const [serverResponse, setServerResponse] = useState(null);
  const [inputValue, setInputValue] = useState("");
  const [invitationSuccess, setInvitationSuccess] = useState(false);
  const [invitationError, setInvitationError] = useState(null);

  const handleTagsChange = (tags) => {
    setTags(tags);
  };

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleInputKeyPress = (e) => {
    if (e.key === "Enter" && inputValue) {
      setTags([...tags, inputValue]);
      setInputValue("");
    }
  };

  const handleTagRemove = (tagIndex) => {
    const newTags = [...tags];
    newTags.splice(tagIndex, 1);
    setTags(newTags);
  };

  const sendEmail = () => {
    if (!date || !time || tags.length === 0) {
      setInvitationError("Error al enviar las invitaciones, valide sus datos.");
      return;
    }
    const timeRegex = /^(?:[01]\d|2[0-3]):[0-5]\d:[0-5]\d$/;

    if (!time.match(timeRegex)) {
      setInvitationError("Error al enviar las invitaciones, valide sus datos.");
      return;
    }

    const data = {
      recipients: tags,
      subject: "Invitación al juego",
      date,
      time,
    };

    $.ajax({
      type: "POST",
      url: "http://localhost:3000/api/bab/send-email",
      data: JSON.stringify(data),
      contentType: "application/json",
      success: function (response) {
        setServerResponse(response);
        if (response && response.success) {
          setInvitationSuccess(true);
          setInvitationError(null);
        }
      },
      error: function (error) {
        console.error("Error al enviar el correo:", error);
        setInvitationError(
          "Error al enviar las invitaciones, valide sus datos."
        );
      },
    });
  };

  return (
    <div className="min-h-screen flex flex-col overflow-hidden bg-slate-200">
      <HeaderNav SignIn />
      <div className="flex-grow flex flex-col items-center justify-center space-y-4 md:space-y-8 px-2 md:px-24 py-4">
        <div className="bg-white w-full h-20 rounded-full flex items-center px-8 font-bold text-lg md:text-2xl text-center">
          <p>Invitar jugadores</p>
        </div>
        <div className="bg-white w-full h-auto rounded-2xl flex flex-col p-8 md:p-16 space-y-6">
          <div className="space-y-3">

            {invitationSuccess && (
              <Alert
                icon={<Icon />}
                className="rounded-none border-l-4 border-[#2ec946] bg-[#2ec946]/10 font-medium text-[#2ec946]"
              >
                ¡Invitaciones enviadas con éxito!
              </Alert>
            )}

            {invitationError && (
              <ErrorGenerator
                errorMessage={invitationError}
                onClose={() => setInvitationError(null)}
              />
            )}

            <div className="mb-4">
              <label htmlFor="Fecha" className="font-bold text-lg md:text-xl">
                Fecha
              </label>
              <input
                className="w-full rounded-full bg-slate-200 px-4 py-1 md:px-6 md:py-2  text-lg md:text-xl italic"
                type="date"
                id="Fecha"
                name="fecha"
                placeholder="DD/MM/YYYY"
                value={date}
                onChange={(e) => setDate(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <label htmlFor="Hora" className="font-bold text-lg md:text-xl">
                Hora
              </label>
              <input
                className="w-full rounded-full bg-slate-200 px-4 py-1 md:px-6 md:py-2 text-lg md:text-xl italic"
                type="text"
                id="Hora"
                name="hora"
                placeholder="HH:MM:SS"
                value={time}
                onChange={(e) => setTime(e.target.value)}
              />
            </div>
            <div className="space-y-4">
              <label
                htmlFor="Correo"
                className="font-bold text-lg md:text-xl mr-4"
              >
                Agregar personas
              </label>

              <div className="mb-4 flex items-center">
                <input
                  type="text"
                  placeholder="Ingrese el correo de las personas a invitar"
                  value={inputValue}
                  onChange={handleInputChange}
                  onKeyPress={handleInputKeyPress}
                  className="w-full rounded-full bg-slate-200 px-4 py-1 md:px-6 md:py-2 text-lg md:text-xl italic"
                />
                <button
                  className="bg-black rounded-full md:text-xl text-white py-2 px-4 ml-4 md:ml-0 md:w-1/6"
                  onClick={() => {
                    if (inputValue) {
                      setTags([...tags, inputValue]);
                      setInputValue("");
                    }
                  }}
                >
                  Agregar
                </button>
              </div>
              <div className="mb-4">
                {tags.map((tag, index) => (
                  <span
                    key={index}
                    className="inline-block bg-slate-200 rounded-full px-4 py-1 md:px-6 md:py-2 text-lg md:text-xl italic mx-1 relative items-center justify-between mb-3"
                  >
                    <span className="flex items-center space-x-2">
                      {tag}
                      <button
                        onClick={() => handleTagRemove(index)}
                        className="ml-2 text-red-500 bg-red-500 rounded-full w-5 h-5 flex items-center justify-center"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          x="0px"
                          y="0px"
                          width="100"
                          height="100"
                          viewBox="0 0 48 48"
                        >
                          <path
                            fill="#f44336"
                            d="M44,24c0,11.045-8.955,20-20,20S4,35.045,4,24S12.955,4,24,4S44,12.955,44,24z"
                          ></path>
                          <path
                            fill="#fff"
                            d="M29.656,15.516l2.828,2.828l-14.14,14.14l-2.828-2.828L29.656,15.516z"
                          ></path>
                          <path
                            fill="#fff"
                            d="M32.484,29.656l-2.828,2.828l-14.14-14.14l2.828-2.828L32.484,29.656z"
                          ></path>
                        </svg>
                      </button>
                    </span>
                  </span>
                ))}
              </div>
            </div>
          </div>
          <div className="w-full h-0.5 bg-slate-500 " />
          <div className="flex flex-row  w-full space-x-4">
            <div className="flex flex-1 justify-center">
              <button className="bg-gray-500 rounded-full md:text-xl text-white w-full py-3">
                Regresar
              </button>
            </div>
            <div className="flex flex-1 justify-center">
              <button
                className="bg-black rounded-full md:text-xl text-white w-full py-3"
                onClick={sendEmail}
              >
                Enviar invitaciones
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
