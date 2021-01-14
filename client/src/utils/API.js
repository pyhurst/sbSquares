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
  createGame: function(data){
    return axios.post("/api/game/create", data);
  },
  updateGame: function(id,data){
    return axios.put("/api/game/" + id, data);
  },
  getUserGames: function(userId) {
    return axios.get("/api/games/" + userId);
  }

};