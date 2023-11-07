import ParticlesBackground from "../components/ParticlesBackground";
import { io } from "socket.io-client";
import { SOCKET_URL } from "../config";
import { AuthContext } from "../context/AuthContext";
import { useContext, useEffect, useState } from "react";
import Loader from "./Loader";
import GameQuestions from "./GameQuestions";
import { useNavigate } from "react-router-dom";
import GameOver from "./GameOver";

export default function Loading({ pinGame }) {
  const { Auth } = useContext(AuthContext);
  const [question, setQuestion] = useState(null);
  const [timeRemaining, setTimeRemaining] = useState(0);
  const [answered, setAnswered] = useState(false);
  const [Finish, setFinish] = useState(false);
  const [answerResult, setAnswerResult] = useState(null);
  const [gameSummary, setGameSummary] = useState(null);
  const [total, setTotal] = useState(null);
  const [index, setIndex] = useState(null);
  const navigate = useNavigate();
  const [selectedOption, setSelectedOption] = useState(null);

  useEffect(() => {
    const socket = io.connect(SOCKET_URL);

    const userInfo = {
      userId: Auth._id,
      name: Auth.name,
      lastName: Auth.lastName,
      img: Auth.img,
      pinGame: pinGame,
      rol: Auth.rol,
    };

    socket.emit("joinWaitingRoom", userInfo);

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
      setFinish(true);
    });

    socket.on("answerResult", ({ isCorrect }) => {
      setAnswerResult(isCorrect ? "Correcta" : "Incorrecta");
    });

    socket.on("gameSummary", ({ playerResponses, correctAnswersCount }) => {
      setGameSummary({ playerResponses, correctAnswersCount });
      console.log("se termino");
      console.log(playerResponses);
    });

    socket.on("getOut", ({ userId }) => {
      console.log("¡La partida aún no ha comenzado!");
      if (userId === Auth._id) {
        navigate("/GameNotStart");
      }
    });

    return () => {
      socket.off("joinWaitingRoom");
      socket.off("gameStarted");
      socket.off("nextQuestion");
      socket.off("timeRemaining");
      socket.off("gameFinished");
      socket.off("answerResult");
      socket.off("gameSummary");
      socket.off("getOut");
    };
  }, []);

  const handleLeaveWaitingRoom = () => {
    const socket = io.connect(SOCKET_URL);

    socket.emit("leaveWaitingRoom", { userId: Auth._id });
    navigate("/PinGame");
  };

  const [isAnswerCorrect, setIsAnswerCorrect] = useState(null);

  const answerQuestion = (selectedOption) => {
    const socket = io.connect(SOCKET_URL);

    if (!answered) {
      setSelectedOption(selectedOption);

      socket.emit("answerQuestion", {
        answer: selectedOption,
        user: Auth,
        pinGame: pinGame,
      });

      setAnswered(true);

      const isCorrect =
        question.options.find((option) => option.option === selectedOption)
          ?.answer === true;
      setIsAnswerCorrect(isCorrect);
    }
  };

  return question ? (
    Finish ? (
      <GameOver gameSummary={gameSummary} />
    ) : (
      <GameQuestions
        handleLeaveWaitingRoom={handleLeaveWaitingRoom}
        timeRemaining={timeRemaining}
        question={question}
        answerQuestion={answerQuestion}
        answered={answered}
        isAnswerCorrect={isAnswerCorrect}
        total={total}
        index={index}
        selectedOption={selectedOption}
      />
    )
  ) : (
    <div className="bg-black w-full h-full relative">
      <ParticlesBackground>
        <Loader handleLeaveWaitingRoom={handleLeaveWaitingRoom} />
      </ParticlesBackground>
    </div>
  );
}
