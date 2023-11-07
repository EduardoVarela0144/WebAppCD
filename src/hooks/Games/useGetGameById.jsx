import { useQuery } from "react-query";
import GamesRepository from "../../repositories/GamesRepository";

function useGetGameById(gameId) {
  return useQuery(["useGetGameById", gameId], () => {
    if (gameId) {
      return GamesRepository.getGame(gameId);
    }
  });
}

export { useGetGameById };
