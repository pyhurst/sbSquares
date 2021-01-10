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
    return axios.post("/api/game/", game);
  },
  updateGame: function(id){
    return axios.put("/api/game/" + id);
  },
  getUser: function(id) {
    return axios.get("/api/user/" + id)
  },
  getUserGames: function(userId) {
    return axios.get("/api/games/" + userId);
  }

};