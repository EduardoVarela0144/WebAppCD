import GamesRepository from "../../repositories/GamesRepository";
import { useState } from "react";
import { useMutation } from "react-query";
import { useNavigate } from "react-router-dom";

function useGetGameByIdMutation() {
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const gameIdMutation = useMutation(GamesRepository.getGameMutation);
  const getGame = async (pinGame) => {
    try {
       await gameIdMutation.mutateAsync(pinGame);
      navigate("/Game?id="+pinGame);
    } catch (error) {
      console.log(error?.response.data?.message);
      setError(error?.response.data?.message);
      return false;
    }
  };

  return {
    getGame,
    error,
    isLoading: gameIdMutation.isLoading,
    isError : gameIdMutation.isError
  };
}

export { useGetGameByIdMutation };
