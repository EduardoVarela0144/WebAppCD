import React, { useState, useEffect } from "react";
import io from "socket.io-client";
import { SOCKET_URL } from "../config";

export default function GameStartOwner() {
  const socket = io.connect(SOCKET_URL);
  const [question, setQuestion] = useState(null);
  const [timeRemaining, setTimeRemaining] = useState(0);
  const [Finish, setFinish] = useState(false);
  const [answerResult, setAnswerResult] = useState(null);
  const [gameSummary, setGameSummary] = useState(null);
  const [answered, setAnswered] = useState(false);

  useEffect(() => {
    socket.on("gameStarted", ({ question, totalTime, gameId }) => {
      if (gameId === "651fd76d4c1de452ec70ad77") {
        setQuestion(question);
        setTimeRemaining(totalTime);
        setAnswered(false);
      }
    });

    socket.on("nextQuestion", ({ question, timeRemaining }) => {
      console.log("Recibido el evento 'nextQuestion'", question);

      setQuestion(question);
      setTimeRemaining(timeRemaining);
      setAnswered(false);
      setAnswerResult(null);
    });

    socket.on("timeRemaining", ({ timeRemaining }) => {
      setTimeRemaining(timeRemaining);
    });

    socket.on("gameFinished", () => {
      console.log("Se terminó el juego");
      setFinish(true);
    });

    socket.on("answerResult", ({ isCorrect }) => {
      setAnswerResult(isCorrect ? "Correcta" : "Incorrecta");
    });

    socket.on("gameSummary", ({ playerResponses, correctAnswersCount }) => {
      setGameSummary({ playerResponses, correctAnswersCount });
    });

    return () => {
      socket.off("gameStarted");
      socket.off("nextQuestion");
      socket.off("timeRemaining");
      socket.off("gameFinished");
      socket.off("answerResult");
      socket.off("gameSummary");
    };
  }, []);

  const [gameStarted, setGameStarted] = useState(false);

  const startGame = (gameId) => {
    if (!gameStarted) {
      console.log(gameId);
      socket.emit("startGame", gameId);
      setGameStarted(true);
    }
  };

  const [isAnswerCorrect, setIsAnswerCorrect] = useState(null);

  const answerQuestion = (selectedOption) => {
    if (!answered) {
      socket.emit("answerQuestion", { answer: selectedOption });

      setAnswered(true);

      const isCorrect =
        question.options.find((option) => option.option === selectedOption)
          ?.answer === true;
      console.log(isCorrect);
      setIsAnswerCorrect(isCorrect);
    }
  };

  useEffect(() => {
    socket.on("connect", () => {
      console.log("Conexión exitosa con el servidor de Socket.io");
    });
  }, []);

  return (
    <div className="bg-slate-100 flex h-screen items-center justify-center">
      <div className="bg-white h-2/4 w-2/4 rounded-xl flex items-center justify-center shadow-xl">
        {question ? (
          Finish ? (
            <div className="h-full w-full flex flex-col items-center p-4">
              <h2>El juego ya se terminó</h2>
              {gameSummary && (
                <div className="text-left">
                  <h3>Resumen del juego:</h3>
                  <p>Respuestas correctas: {gameSummary.correctAnswersCount}</p>
                  <h3>Respuestas de los jugadores:</h3>
                  <ul>
                    {Object.entries(gameSummary.playerResponses).map(
                      ([playerId, response], index) => (
                        <li key={index}>
                          Jugador {playerId}: Respuesta {response.answer} (
                          {response.isCorrect ? "Correcta" : "Incorrecta"})
                        </li>
                      )
                    )}
                  </ul>
                </div>
              )}
            </div>
          ) : (
            <div className="h-full w-full flex flex-col items-center p-4">
              <div className=" w-full flex items-center px-2 justify-between">
                <p className="font-bold text-3xl">{question.question}</p>
                <div className="flex-col flex justify-center items-center">
                  <h2>Tiempo restante</h2>
                  <p>{timeRemaining} segundos</p>
                </div>
              </div>
              <div className="w-full h-full space-y-4">
                <h2 className="italic flex space-x-2 my-2">
                  Pista: <p>{question.hint}</p>
                </h2>
                <div className="grid grid-cols-2 gap-4">
                  {question?.options.map((item, index) => (
                    <div
                      key={index}
                      className={`${
                        answered
                          ? item.answer
                            ? isAnswerCorrect
                              ? "bg-green-500"
                              : "bg-red-500"
                            : "bg-black"
                          : "bg-black"
                      } text-white h-24 flex items-center justify-end px-3 rounded-md cursor-pointer`}
                      onClick={() => answerQuestion(item.option)}
                    >
                      <ul>
                        <li className="text-2xl font-bold">{item.option}</li>
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
              {answerResult && (
                <p className="mt-2">Tu respuesta: {answerResult}</p>
              )}
            </div>
          )
        ) : (
          <div className="bg-black text-white rounded-xl px-4 py-2 text-3xl">
            <button onClick={() => startGame("651fd76d4c1de452ec70ad77")}>
              Iniciar juego
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
