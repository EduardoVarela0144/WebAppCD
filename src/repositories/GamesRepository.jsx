import api from "../services/api"

class GamesRepository {
  async getGame(game) {
    const response = await api.get(`/game/getGame/${game}`);
    return response.data;
  }
  async getGameMutation(game) {
    const response = await api.get(`/game/getGame/${game}`);
    return response.data;
  }
}

export default new GamesRepository();
