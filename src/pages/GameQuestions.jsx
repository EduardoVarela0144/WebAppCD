import React from "react";
import { FaClock } from "react-icons/fa";

export default function GameQuestions({
  handleLeaveWaitingRoom,
  timeRemaining,
  question,
  answerQuestion,
  answered,
  total,
  index,
  selectedOption
}) {
  return (
    <div className="bg-gray-200 w-full h-screen flex items-center justify-center p-4 sm:p-12">
      <div className="bg-white rounded-3xl justify-center h-auto  sm:h-full w-full">
        <div className="w-full flex flex-row  pb-3 p-4">
          <div className="flex flex-1 justify-start items-center">
            <div>
              <button
                onClick={() => handleLeaveWaitingRoom()}
                className="bg-black rounded-3xl text-white hidden sm:flex sm:text-xl px-3 py-1"
              >
                Abandonar partida
              </button>
            </div>
            <button
              onClick={() => handleLeaveWaitingRoom()}
              className="bg-black rounded-3xl text-white sm:hidden sm:text-3xl px-3 mt-8"
            >
              Abandonar
            </button>
          </div>
          <div className="flex flex-1 justify-center items-center">
            <div className="flex-col justify-center items-center">
              <p className="font-semibold sm:text-3xl">Pregunta</p>
              <div className="flex flex-row items-center justify-center space-x-1">
                <p className="font-bold text-4xl">{index + 1}</p>
                <p>/</p>
                <p>{total}</p>
              </div>
            </div>
          </div>
          <div className="flex flex-1 justify-end">
            <div className="flex flex-row justify-end items-end space-x-1 ">
              <p className="font-bold text-xl">{timeRemaining}</p>
              <p className="text-xs mb-1">seg</p>
            </div>
          </div>
        </div>

        <div className="w-full bg-gray-400 h-2">
          <div className="w-2/4 bg-black h-full"></div>
        </div>
        <div className="w-full flex flex-col justify-center items-center space-y-2 mt-4">
          <p className="font-bold text-3xl sm:text-4xl text-center">
            {question.question}
          </p>
          {timeRemaining <= 30 && <p>Pista: {question.hint}</p>}
          <div className="w-full flex h-6 bg-gray-400 items-center jus space-x-1">
            <div className="bg-black w-2/4 h-full" />
            <FaClock size={16} color="white" />
            <p className="font-bold tex-white text-white">{timeRemaining}</p>
          </div>
        </div>

        <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-2  p-8">
          {question?.options.map((item, index) => (
            <button
              key={index}
              className={`${
                answered
                  ? item.answer
                    ? "bg-green-500" // Respuesta correcta
                    : selectedOption === item.option
                    ? "bg-red-500" // Respuesta incorrecta que seleccionaste
                    : "bg-black" // Respuesta incorrecta no seleccionada
                  : "bg-black" // Opción no seleccionada
              } text-white rounded-2xl p-8 flex justify-center items-center`}
              onClick={() => answerQuestion(item.option)}
            >
              <p className="font-bold text-3xl">{item.option}</p>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
