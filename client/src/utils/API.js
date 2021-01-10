import axios from "axios";

export default {
  getGames: function() {
    return axios.get("/api/games/");
  },
  getGame: function(id) {
    return axios.get("/api/game/" + id);
  }
  ,deleteGame: function(id) {
    return axios.delete("/api/game/" + id);
  },
  saveGame: function(game) {
    return axios.post("/api/game/create/", game);
  },
  updateGame: function(id){
    return axios.put("/api/game/" + id);
  },
  getUserGames: function(userId) {
    return axios.get("/api/games/" + userId);
  }

};