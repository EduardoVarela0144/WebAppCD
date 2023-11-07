import React, { useState, useEffect } from "react";
import io from "socket.io-client";
import { SOCKET_URL } from "../config";

export default function GameResultsOwner() {
  const [gameSummary, setGameSummary] = useState(null);

  useEffect(() => {
    const socket = io.connect(SOCKET_URL);

    socket.on("gameSummary", (data) => {
      setGameSummary(data);
    });

    // No olvides quitar el listener cuando el componente se desmonte
    return () => {
      socket.off("gameSummary");
    };
  }, []);

  return (
    <div>
      <h1>Resultados del Juego</h1>
      {gameSummary ? (
        <div>
          <h2>Respuestas Correctas: {gameSummary.correctAnswersCount}</h2>
          <h2>Resultados de los Jugadores:</h2>
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
      ) : (
        <p>Esperando resultados...</p>
      )}
    </div>
  );
}
