import { useEffect, useState, useContext } from "react";
import { io } from "socket.io-client";
import { ROLES, SOCKET_URL } from "../config";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import UsersListComponent from "../components/UsersListComponent.jsx";
import GameLeader from "../components/GameLeader.jsx";
import { useParams } from "react-router-dom";
import Scores from "../pages/Scores.jsx";

export default function UsersList({ pinGame }) {
  const [playersInLobby, setPlayersInLobby] = useState([]);
  const { Auth } = useContext(AuthContext);
  const [question, setQuestion] = useState(null);
  const [timeRemaining, setTimeRemaining] = useState(0);
  const [answered, setAnswered] = useState(false);
  const [Finish, setFinish] = useState(false);
  const [answerResult, setAnswerResult] = useState(null);
  const [gameSummary, setGameSummary] = useState(null);
  const [total, setTotal] = useState(null);
  const [index, setIndex] = useState(null);

  const navigation = useNavigate();
  useEffect(() => {
    const socket = io.connect(SOCKET_URL);

    socket.on("waitingRoomPlayerList", (players) => {
      const playersInMyGame = players.filter(
        (player) => player.pinGame === pinGame
      );
      setPlayersInLobby(playersInMyGame);
    });

    const userInfo = {
      userId: Auth._id,
      name: Auth.name,
      lastName: Auth.lastName,
      img: Auth.img,
      pinGame: pinGame,
      rol: Auth.rol,
    };

    socket.emit("joinWaitingRoom", userInfo);
  }, []);

  const [gameStarted, setGameStarted] = useState(false);

  const startGame = (gameId) => {
    const socket = io.connect(SOCKET_URL);

    if (!gameStarted) {
      socket.emit("startGame", gameId);
      setGameStarted(true);
    }
  };

  const handleLeaveWaitingRoom = () => {
    const socket = io.connect(SOCKET_URL);
    socket.emit("leaveWaitingRoom", { userId: Auth._id });
    navigation("/PinGame");
  };

  useEffect(() => {
    const socket = io.connect(SOCKET_URL);

    socket.on(
      "gameStarted",
      ({ question, totalTime, gameId, total, index }) => {
        if (gameId === pinGame) {
          setQuestion(question);
          setTimeRemaining(totalTime);
          setAnswered(false);
          setTotal(total);
          setIndex(index);
        }
      }
    );

    socket.on("nextQuestion", ({ question, timeRemaining, total, index }) => {
      setQuestion(question);
      setTimeRemaining(timeRemaining);
      setAnswered(false);
      setAnswerResult(null);
      setTotal(total);
      setIndex(index);
    });

    socket.on("timeRemaining", ({ timeRemaining }) => {
      setTimeRemaining(timeRemaining);
    });

    socket.on("gameFinished", () => {
      console.log("Se terminó el juego");
    });

    socket.on("gameSummary", ({ playerResponses, correctAnswersCount }) => {
      setGameSummary({ playerResponses, correctAnswersCount });
      setFinish(true);

    });

    socket.on("getOut", ({ userId }) => {
      console.log({});
      console.log("¡La partida aún no ha comenzado!");
      if (userId === Auth._id) {
        navigation("/GameNotStart");
      }
    });

    return () => {
      socket.off("joinWaitingRoom");
      socket.off("gameStarted");
      socket.off("nextQuestion");
      socket.off("timeRemaining");
      socket.off("gameFinished");
      socket.off("gameSummary");
      socket.off("getOut");
    };
  }, []);

  return question ? (
    Finish ? (
      <Scores gameSummary={gameSummary} pinGame={pinGame} />
    ) : (
      <GameLeader
        handleLeaveWaitingRoom={handleLeaveWaitingRoom}
        timeRemaining={timeRemaining}
        question={question}
        total={total}
        index={index}
      />
    )
  ) : (
    <UsersListComponent
      startGame={startGame}
      handleLeaveWaitingRoom={handleLeaveWaitingRoom}
      playersInLobby={playersInLobby}
      pinGame={pinGame}
    />
  );
}
